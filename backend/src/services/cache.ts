import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CodingProfilesStats } from "../types.js";
import { fetchLeetCodeStats } from "./leetcode.js";
import { fetchCodeforcesStats } from "./codeforces.js";
import { fetchCodeChefStats } from "./codechef.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, "../../data");
const CACHE_FILE = path.join(DATA_DIR, "cache.json");

const INITIAL_STATS: CodingProfilesStats = {
  leetcode: {
    solved: 527,
    easy: 274,
    medium: 232,
    hard: 21,
    contestRating: 1702,
    globalRank: "168,851",
    maxStreak: 31,
    badges: ["100 Days Badge 2024", "50 Days Badge 2025", "50 Days Badge 2026"],
  },
  codechef: {
    rating: 1403,
    stars: 2,
    division: "Div 3",
    globalRank: "54,486",
    countryRank: "51,131",
    contests: 18,
  },
  codeforces: {
    handle: "Drreader",
    rating: 919,
    maxRating: 919,
    rank: "Newbie",
    maxRank: "Newbie",
    contests: 5,
    problemsSolved: 83,
  },
  lastUpdated: new Date().toISOString(),
  isLive: false,
};

let currentStats: CodingProfilesStats = { ...INITIAL_STATS };

// Ensure data dir exists and load cached file if present
function initPersistence() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(CACHE_FILE)) {
      const raw = fs.readFileSync(CACHE_FILE, "utf-8");
      currentStats = { ...INITIAL_STATS, ...JSON.parse(raw) };
    }
  } catch (err: any) {
    console.warn(`[Cache] Could not read cache file: ${err.message}`);
  }
}

function persistCache() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CACHE_FILE, JSON.stringify(currentStats, null, 2), "utf-8");
  } catch (err: any) {
    console.warn(`[Cache] Could not persist cache: ${err.message}`);
  }
}

initPersistence();

export function getStats(): CodingProfilesStats {
  return currentStats;
}

export async function refreshAllStats(): Promise<CodingProfilesStats> {
  console.log(`[Cache] 🔄 Refreshing coding profile stats from servers at ${new Date().toLocaleTimeString()}...`);

  const [lcResult, cfResult, ccResult] = await Promise.allSettled([
    fetchLeetCodeStats("Drreader"),
    fetchCodeforcesStats("Drreader"),
    fetchCodeChefStats("Drreader"),
  ]);

  let anySuccess = false;

  if (lcResult.status === "fulfilled") {
    currentStats.leetcode = lcResult.value;
    anySuccess = true;
  } else {
    console.error("[Cache] LeetCode update error:", lcResult.reason);
  }

  if (cfResult.status === "fulfilled") {
    currentStats.codeforces = cfResult.value;
    anySuccess = true;
  } else {
    console.error("[Cache] Codeforces update error:", cfResult.reason);
  }

  if (ccResult.status === "fulfilled") {
    currentStats.codechef = ccResult.value;
    anySuccess = true;
  } else {
    console.error("[Cache] CodeChef update error:", ccResult.reason);
  }

  currentStats.lastUpdated = new Date().toISOString();
  currentStats.isLive = anySuccess;

  persistCache();

  console.log(`[Cache] ✅ Stats refreshed successfully! LeetCode: ${currentStats.leetcode.solved}, Codeforces: ${currentStats.codeforces.rating} (${currentStats.codeforces.rank}), CodeChef: ${currentStats.codechef.rating}`);

  return currentStats;
}
