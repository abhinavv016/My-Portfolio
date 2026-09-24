import { LeetCodeStats } from "../types.js";

const DEFAULT_LEETCODE: LeetCodeStats = {
  solved: 527,
  easy: 274,
  medium: 232,
  hard: 21,
  contestRating: 1702,
  globalRank: "168,851",
  maxStreak: 31,
  badges: ["100 Days Badge 2024", "50 Days Badge 2025", "50 Days Badge 2026"],
};

export async function fetchLeetCodeStats(username: string = "Drreader"): Promise<LeetCodeStats> {
  // Method 1: Direct LeetCode GraphQL
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
          badges {
            displayName
          }
        }
        userContestRanking(username: $username) {
          rating
          globalRanking
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: `https://leetcode.com/${username}/`,
      },
      body: JSON.stringify({ query, variables: { username } }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (res.ok) {
      const data: any = await res.json();
      const matched = data?.data?.matchedUser;
      if (matched) {
        const counts = matched.submitStats?.acSubmissionNum || [];
        const all = counts.find((c: any) => c.difficulty === "All")?.count;
        const easy = counts.find((c: any) => c.difficulty === "Easy")?.count;
        const medium = counts.find((c: any) => c.difficulty === "Medium")?.count;
        const hard = counts.find((c: any) => c.difficulty === "Hard")?.count;

        const contest = data?.data?.userContestRanking;
        const ranking = matched.profile?.ranking;
        const badges = (matched.badges || []).map((b: any) => b.displayName).filter(Boolean);

        return {
          solved: all ?? DEFAULT_LEETCODE.solved,
          easy: easy ?? DEFAULT_LEETCODE.easy,
          medium: medium ?? DEFAULT_LEETCODE.medium,
          hard: hard ?? DEFAULT_LEETCODE.hard,
          contestRating: contest?.rating ? Math.round(contest.rating) : DEFAULT_LEETCODE.contestRating,
          globalRank: ranking ? ranking.toLocaleString() : DEFAULT_LEETCODE.globalRank,
          maxStreak: DEFAULT_LEETCODE.maxStreak,
          badges: badges.length > 0 ? badges : DEFAULT_LEETCODE.badges,
        };
      }
    }
  } catch (err: any) {
    console.warn(`[LeetCode] Direct GraphQL fetch failed: ${err.message}. Trying mirror...`);
  }

  // Method 2: Public Mirror API Fallback
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data: any = await res.json();
      if (data.status === "success") {
        return {
          solved: data.totalSolved ?? DEFAULT_LEETCODE.solved,
          easy: data.easySolved ?? DEFAULT_LEETCODE.easy,
          medium: data.mediumSolved ?? DEFAULT_LEETCODE.medium,
          hard: data.hardSolved ?? DEFAULT_LEETCODE.hard,
          contestRating: DEFAULT_LEETCODE.contestRating,
          globalRank: data.ranking ? Number(data.ranking).toLocaleString() : DEFAULT_LEETCODE.globalRank,
          maxStreak: DEFAULT_LEETCODE.maxStreak,
          badges: DEFAULT_LEETCODE.badges,
        };
      }
    }
  } catch (err: any) {
    console.warn(`[LeetCode] Mirror fetch failed: ${err.message}. Using cached/default values.`);
  }

  return DEFAULT_LEETCODE;
}
