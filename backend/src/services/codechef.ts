import { CodeChefStats } from "../types.js";

const DEFAULT_CODECHEF: CodeChefStats = {
  rating: 1403,
  stars: 2,
  division: "Div 3",
  globalRank: "54,486",
  countryRank: "51,131",
  contests: 18,
};

function getDivision(rating: number): string {
  if (rating >= 2000) return "Div 1";
  if (rating >= 1600) return "Div 2";
  if (rating >= 1400) return "Div 3";
  return "Div 4";
}

export async function fetchCodeChefStats(username: string = "Drreader"): Promise<CodeChefStats> {
  // Method 1: Public CodeChef JSON API Mirror
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`https://codechef-api.vercel.app/handle/${username}`, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data: any = await res.json();
      if (data.success !== false && data.currentRating) {
        const rating = Number(data.currentRating) || DEFAULT_CODECHEF.rating;
        const stars = typeof data.stars === "number"
          ? data.stars
          : typeof data.stars === "string"
          ? parseInt(data.stars.replace(/[^0-9]/g, ""), 10) || 2
          : 2;

        return {
          rating,
          stars,
          division: getDivision(rating),
          globalRank: data.globalRank ? Number(data.globalRank).toLocaleString() : DEFAULT_CODECHEF.globalRank,
          countryRank: data.countryRank ? Number(data.countryRank).toLocaleString() : DEFAULT_CODECHEF.countryRank,
          contests: DEFAULT_CODECHEF.contests,
        };
      }
    }
  } catch (err: any) {
    console.warn(`[CodeChef] API mirror fetch failed: ${err.message}. Trying direct profile...`);
  }

  // Method 2: Direct CodeChef Profile Scraping via Regex
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`https://www.codechef.com/users/${username}`, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const html = await res.text();
      const ratingMatch = html.match(/class="rating-number">([0-9]+)</);
      const starMatch = html.match(/class="rating-star">([^<]+)</);
      const globalRankMatch = html.match(/<strong>([0-9,]+)<\/strong>\s*<small>Global Rank<\/small>/i);
      const countryRankMatch = html.match(/<strong>([0-9,]+)<\/strong>\s*<small>Country Rank<\/small>/i);

      if (ratingMatch && ratingMatch[1]) {
        const rating = parseInt(ratingMatch[1], 10);
        const stars = starMatch ? (starMatch[1].match(/★/g) || []).length || 2 : 2;

        return {
          rating,
          stars,
          division: getDivision(rating),
          globalRank: globalRankMatch ? globalRankMatch[1] : DEFAULT_CODECHEF.globalRank,
          countryRank: countryRankMatch ? countryRankMatch[1] : DEFAULT_CODECHEF.countryRank,
          contests: DEFAULT_CODECHEF.contests,
        };
      }
    }
  } catch (err: any) {
    console.warn(`[CodeChef] Direct profile fetch failed: ${err.message}. Using default values.`);
  }

  return DEFAULT_CODECHEF;
}
