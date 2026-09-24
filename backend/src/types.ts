export interface LeetCodeStats {
  solved: number;
  easy: number;
  medium: number;
  hard: number;
  contestRating: number;
  globalRank: string;
  maxStreak: number;
  badges: string[];
}

export interface CodeChefStats {
  rating: number;
  stars: number;
  division: string;
  globalRank: string;
  countryRank: string;
  contests: number;
}

export interface CodeforcesStats {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contests: number;
  problemsSolved: number;
}

export interface CodingProfilesStats {
  leetcode: LeetCodeStats;
  codechef: CodeChefStats;
  codeforces: CodeforcesStats;
  lastUpdated: string;
  isLive: boolean;
}
