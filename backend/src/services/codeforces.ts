import { CodeforcesStats } from "../types.js";

const DEFAULT_CODEFORCES: CodeforcesStats = {
  handle: "Drreader",
  rating: 919,
  maxRating: 919,
  rank: "Newbie",
  maxRank: "Newbie",
  contests: 5,
  problemsSolved: 83,
};

function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function fetchCodeforcesStats(handle: string = "Drreader"): Promise<CodeforcesStats> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    // 1. Fetch user info
    const infoRes = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    let rating = DEFAULT_CODEFORCES.rating;
    let maxRating = DEFAULT_CODEFORCES.maxRating;
    let rank = DEFAULT_CODEFORCES.rank;
    let maxRank = DEFAULT_CODEFORCES.maxRank;
    let contests = DEFAULT_CODEFORCES.contests;
    let problemsSolved = DEFAULT_CODEFORCES.problemsSolved;

    if (infoRes.ok) {
      const infoData: any = await infoRes.json();
      if (infoData.status === "OK" && infoData.result?.[0]) {
        const u = infoData.result[0];
        rating = u.rating ?? rating;
        maxRating = u.maxRating ?? maxRating;
        rank = u.rank ? capitalize(u.rank) : rank;
        maxRank = u.maxRank ? capitalize(u.maxRank) : maxRank;
      }
    }

    // 2. Fetch rating changes for contest count
    try {
      const ratingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`, {
        signal: controller.signal,
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      if (ratingRes.ok) {
        const ratingData: any = await ratingRes.json();
        if (ratingData.status === "OK" && Array.isArray(ratingData.result)) {
          contests = ratingData.result.length;
        }
      }
    } catch {
      // Keep previous contest count
    }

    // 3. Fetch submissions for unique solved problems count
    try {
      const statusRes = await fetch(
        `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=2000`,
        {
          signal: controller.signal,
          headers: { "User-Agent": "Mozilla/5.0" },
        }
      );
      if (statusRes.ok) {
        const statusData: any = await statusRes.json();
        if (statusData.status === "OK" && Array.isArray(statusData.result)) {
          const solvedSet = new Set<string>();
          for (const sub of statusData.result) {
            if (sub.verdict === "OK" && sub.problem) {
              const pid = `${sub.problem.contestId}-${sub.problem.index}`;
              solvedSet.add(pid);
            }
          }
          if (solvedSet.size > 0) {
            problemsSolved = solvedSet.size;
          }
        }
      }
    } catch {
      // Keep previous problems solved
    }

    clearTimeout(timeout);

    return {
      handle,
      rating,
      maxRating,
      rank,
      maxRank,
      contests,
      problemsSolved,
    };
  } catch (err: any) {
    console.warn(`[Codeforces] Fetch failed: ${err.message}. Using cached/default values.`);
    return DEFAULT_CODEFORCES;
  }
}
