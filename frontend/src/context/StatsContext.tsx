import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { CODING_PROFILES } from "../mock";

export type CodingProfile = (typeof CODING_PROFILES)[number];

interface StatsContextType {
  profiles: typeof CODING_PROFILES;
  isLive: boolean;
  lastUpdated: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const StatsContext = createContext<StatsContextType>({
  profiles: CODING_PROFILES,
  isLive: false,
  lastUpdated: null,
  loading: false,
  refresh: async () => {},
});

const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
const API_BASE_URL = rawApiUrl.replace(/\/+$/, "");

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<typeof CODING_PROFILES>(CODING_PROFILES);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLiveStats = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/stats`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();

      setProfiles((prev) =>
        prev.map((p) => {
          if (p.id === "leetcode" && data.leetcode) {
            return {
              ...p,
              stats: {
                ...p.stats,
                ...data.leetcode,
              },
            };
          }
          if (p.id === "codechef" && data.codechef) {
            return {
              ...p,
              stats: {
                ...p.stats,
                ...data.codechef,
              },
            };
          }
          if (p.id === "codeforces" && data.codeforces) {
            return {
              ...p,
              stats: {
                ...p.stats,
                ...data.codeforces,
              },
            };
          }
          return p;
        })
      );

      setIsLive(data.isLive ?? true);
      setLastUpdated(data.lastUpdated ?? new Date().toISOString());
    } catch {
      // Graceful fallback: keep cached/mock profiles if server is not reachable
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveStats();
  }, [fetchLiveStats]);

  return (
    <StatsContext.Provider
      value={{
        profiles,
        isLive,
        lastUpdated,
        loading,
        refresh: fetchLiveStats,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => useContext(StatsContext);
