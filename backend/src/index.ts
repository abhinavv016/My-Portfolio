import express from "express";
import cors from "cors";
import cron from "node-cron";
import dotenv from "dotenv";
import { getStats, refreshAllStats } from "./services/cache.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "portfolio-stats-api",
    timestamp: new Date().toISOString(),
  });
});

// All stats endpoint
app.get("/api/stats", async (req, res) => {
  try {
    const shouldRefresh = req.query.refresh === "true";
    if (shouldRefresh) {
      const freshStats = await refreshAllStats();
      return res.json(freshStats);
    }
    const stats = getStats();
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to retrieve stats", message: err.message });
  }
});

// Single platform stats endpoint
app.get("/api/stats/:platform", (req, res) => {
  const platform = req.params.platform.toLowerCase();
  const stats = getStats();

  if (platform === "leetcode") {
    return res.json(stats.leetcode);
  }
  if (platform === "codechef") {
    return res.json(stats.codechef);
  }
  if (platform === "codeforces") {
    return res.json(stats.codeforces);
  }

  res.status(404).json({ error: `Platform '${platform}' not found. Supported: leetcode, codechef, codeforces.` });
});

// Manual refresh trigger
app.post("/api/stats/refresh", async (_req, res) => {
  try {
    const updated = await refreshAllStats();
    res.json({ success: true, stats: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Background cron scheduler: runs every 15 minutes
cron.schedule("*/15 * * * *", () => {
  console.log("[Scheduler] ⏰ Cron triggered: Updating coding profile stats...");
  refreshAllStats().catch((err) => {
    console.error("[Scheduler] Error during scheduled refresh:", err.message);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend server running at http://localhost:${PORT}`);
  console.log(`📊 Live stats endpoint: http://localhost:${PORT}/api/stats`);

  // Initial fetch on server start (non-blocking)
  refreshAllStats().catch((err) => {
    console.error("[Startup] Initial stats fetch error:", err.message);
  });
});
