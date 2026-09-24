# Portfolio Stats Backend Service

A Node.js & Express service in TypeScript that automatically fetches, aggregates, and caches live competitive programming profile statistics for **LeetCode**, **CodeChef**, and **Codeforces**.

---

## Features
- **Auto-Sync Scheduler**: Uses `node-cron` to automatically refresh stats in the background every 15 minutes.
- **Fail-Safe Caching**: Cached in memory and persisted to `data/cache.json`. If external servers rate-limit or fail, it gracefully continues serving the latest valid stats without downtime.
- **On-Demand Refresh**: Supports immediate updates via `POST /api/stats/refresh` or `GET /api/stats?refresh=true`.
- **Full TypeScript Type Safety**: Typed response models for all three platforms.

---

## Supported Platforms
| Platform | Target Handle | Fetch Strategy |
|---|---|---|
| **LeetCode** | `Drreader` | Official GraphQL API with mirror fallback (Solved count, Difficulty breakdown, Contest rating, Global rank, Badges) |
| **Codeforces** | `Drreader` | Official Codeforces REST API (Rating, Max rating, Rank, Contests count, Problems solved) |
| **CodeChef** | `Drreader` | Public API mirror with profile fallback (Current rating, Stars, Division, Global & Country rank) |

---

## API Endpoints

### 1. Health Check
`GET /api/health`
```json
{
  "status": "ok",
  "service": "portfolio-stats-api",
  "timestamp": "2026-09-24T08:17:49.961Z"
}
```

### 2. Get All Stats
`GET /api/stats`  
Optional query param: `?refresh=true` to force an immediate re-fetch.
```json
{
  "leetcode": {
    "solved": 599,
    "easy": 292,
    "medium": 277,
    "hard": 30,
    "contestRating": 1783,
    "globalRank": "143,344",
    "maxStreak": 31,
    "badges": [...]
  },
  "codechef": {
    "rating": 1403,
    "stars": 2,
    "division": "Div 3",
    "globalRank": "54,486",
    "countryRank": "51,131",
    "contests": 18
  },
  "codeforces": {
    "handle": "Drreader",
    "rating": 919,
    "maxRating": 919,
    "rank": "Newbie",
    "maxRank": "Newbie",
    "contests": 5,
    "problemsSolved": 83
  },
  "lastUpdated": "2026-09-24T08:17:49.961Z",
  "isLive": true
}
```

### 3. Get Platform-Specific Stats
- `GET /api/stats/leetcode`
- `GET /api/stats/codechef`
- `GET /api/stats/codeforces`

### 4. Trigger Manual Refresh
`POST /api/stats/refresh`

---

## Local Development
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start development server with live reload (runs on http://localhost:5001)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```
