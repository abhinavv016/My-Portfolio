import { Link, useNavigate } from "react-router";
import Footer from "../components/Footer";
import KnowledgePanel from "../components/KnowledgePanel";
import { CODING_PROFILES } from "../mock";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/NavBar";
import SearchResult from "../components/SearchResult";

type ProfileId = "leetcode" | "codechef" | "codeforces";

const PROFILE_COLORS: Record<ProfileId, string> = {
    leetcode: "#FFA116",
    codechef: "#5B4638",
    codeforces: "#1F8ACB",
};

interface ProfilePageProps {
    id: ProfileId;
}

const ProfilePage = ({ id }: ProfilePageProps) => {
    const navigate = useNavigate();

    const cp = CODING_PROFILES.find((p) => p.id === id) as any;

    if (!cp) return null;
    const accent = PROFILE_COLORS[id];

    const facts: { label: string; value: string | number }[] = [];
    const s = cp.stats;

    if (id === "leetcode") {
        facts.push(
            { label: "Problems Solved", value: s.solved },
            { label: "Easy / Medium / Hard", value: `${s.easy} / ${s.medium} / ${s.hard}` },
            { label: "Contest Rating", value: s.contestRating },
            { label: "Global Rank", value: s.globalRank },
            { label: "Max Streak", value: `${s.maxStreak} days` },
        );
    } else if (id === "codechef") {
        facts.push(
            { label: "Rating", value: s.rating },
            { label: "Stars", value: "★".repeat(s.stars) },
            { label: "Division", value: s.division },
            { label: "Global Rank", value: s.globalRank },
            { label: "Country Rank", value: s.countryRank },
            { label: "Contests", value: s.contests },
        );
    } else if (id === "codeforces") {
        facts.push(
            { label: "Handle", value: `@${s.handle}` },
            { label: "Current Rating", value: s.rating },
            { label: "Max Rating", value: s.maxRating },
            { label: "Rank", value: s.rank },
            { label: "Max Rank", value: s.maxRank },
            { label: "Contests", value: s.contests },
            { label: "Problems Solved", value: s.problemsSolved }
        );
    }

    const others = CODING_PROFILES.filter((p) => p.id !== id);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#202124] text-[#202124] dark:text-[#e8eaed]">
            <Navbar query={`abhinav ${cp.name.toLowerCase()}`} activeTab="profiles" />

            <main className="flex-1 px-4 md:px-22 py-6">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 inline-flex items-center gap-1 text-[13px] text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-white"
                >
                    <ChevronLeft className="w-4 h-4" /> Back to results
                </button>

                <div className="text-[12px] text-[#70757a] dark:text-[#9aa0a6] mb-3">
                    About 12,400 results (0.27 seconds)
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,652px)_minmax(0,372px)] gap-12">
                    <div className="min-w-0 space-y-7">
                        <motion.section
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-163 border border-[#dadce0] dark:border-[#3c4043] rounded-xl p-5"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold"
                                    style={{ backgroundColor: accent }}
                                >
                                    {cp.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-[12px] text-[#4d5156] dark:text-[#9aa0a6]">
                                        {cp.breadcrumb}
                                    </div>
                                    <h1 className="text-[26px] leading-8 font-medium text-[#202124] dark:text-white">
                                        Abhinav {cp.name}
                                    </h1>
                                </div>
                            </div>
                            <p className="mt-3 text-[14px] text-[#4d5156] dark:text-[#bdc1c6]">
                                {cp.description}
                            </p>
                            <a
                                href={cp.fullUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 inline-flex items-center gap-1.5 text-[14px] text-[#1a73e8] dark:text-[#8ab4f8] hover:underline"
                            >
                                Visit profile on {cp.name} <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {facts.slice(0, 6).map((f) => (
                                    <div
                                        key={f.label}
                                        className="rounded-lg border border-[#ecedef] dark:border-[#3c4043] p-3"
                                    >
                                        <div className="text-[11px] uppercase tracking-wide text-[#5f6368] dark:text-[#9aa0a6]">
                                            {f.label}
                                        </div>
                                        <div className="text-[18px] font-medium text-[#202124] dark:text-white mt-1">
                                            {f.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {id === "leetcode" && cp.stats.badges?.length > 0 && (
                                <div className="mt-4">
                                    <div className="text-[12px] text-[#5f6368] dark:text-[#9aa0a6] mb-2">Badges</div>
                                    <div className="flex flex-wrap gap-2">
                                        {cp.stats.badges.map((b: string) => (
                                            <span
                                                key={b}
                                                className="text-[12px] px-2.5 py-1 rounded-full border border-[#ecedef] dark:border-[#3c4043] text-[#3c4043] dark:text-[#e8eaed]"
                                            >
                                                {b}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.section>

                        <SearchResult
                            breadcrumb={cp.breadcrumb}
                            faviconLetter={cp.name.charAt(0)}
                            faviconColor={accent}
                            domain={cp.url.split("/")[0]}
                            title={cp.title}
                            description={cp.description}
                            externalUrl={cp.fullUrl}
                        />

                        <section className="max-w-163">
                            <h4 className="text-[18px] font-medium mb-3">More profiles by Abhinav</h4>
                            <div className="space-y-6">
                                {others.map((o) => (
                                    <SearchResult
                                        key={o.id}
                                        breadcrumb={o.breadcrumb}
                                        faviconLetter={o.name.charAt(0)}
                                        faviconColor={PROFILE_COLORS[o.id as ProfileId]}
                                        domain={o.url.split("/")[0]}
                                        title={o.title}
                                        description={o.description}
                                        onTitleClick={() => navigate(o.internalRoute)}
                                    />
                                ))}
                            </div>
                        </section>

                        <div className="max-w-163 pt-2">
                            <Link
                                to="/search?q=abhinav"
                                className="text-[14px] text-[#1a73e8] dark:text-[#8ab4f8] hover:underline"
                            >
                                ← Back to all results for “Abhinav”
                            </Link>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <KnowledgePanel
                            title={`Abhinav on ${cp.name}`}
                            subtitle={cp.url}
                            description={cp.description}
                            facts={facts as any}
                            link={cp.fullUrl}
                            accent={accent}
                            initials={cp.name.slice(0, 2).toUpperCase()}
                        />
                    </div>
                </div>
            </main>

            <Footer minimal />
        </div>
    );
};

export default ProfilePage;