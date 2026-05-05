import { Link } from "react-router";
import { Sun, Moon, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import AbhinavLogo from "../components/AbhinavLogo";
import SearchBar from "../components/SearchBar";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "../mock";
import MyProfileImage from "/MyProfileImage.png";

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const feelingCurious = () => {
    const picks = [
      "abhinav projects",
      "abhinav leetcode",
      "abhinav skills",
      "abhinav github",
      "abhinav codeforces",
      "hire abhinav",
    ];
    const q = picks[Math.floor(Math.random() * picks.length)];
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Top right links */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 text-[15px] font-medium">
        <div>
          <Link to="/search?tab=about&q=abhinav" className="hover:underline opacity-90">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <a href={SOCIAL_LINKS.email} target="_blank" rel="noreferrer" className="hover:underline opacity-90">
            Gmail
          </a>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="hover:underline opacity-90">
            GitHub
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043] transition-colors"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button aria-label="Apps" className="p-2 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043] transition-colors">
            <img
              src="/icon.png"
              alt="Apps"
              className="w-6 h-6 object-contain"
            />
          </button>

          <div className="relative p-[2px] rounded-full bg-conic from-[#4285F4] via-[#EA4335] to-[#34A853] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95">
            <div className="bg-background rounded-full p-[3px]">
              <img
                src={MyProfileImage}
                alt="Abhinav's Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Center hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AbhinavLogo size="xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-146 mt-8"
        >
          <SearchBar size="lg" autoFocus showButtons />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center gap-3 mt-7"
        >
          <button
            onClick={() => navigate("/search?q=abhinav")}
            className="text-[14px] bg-[#f8f9fa] dark:bg-[#303134] hover:border-[#dadce0] dark:hover:border-[#5f6368] hover:shadow-sm border border-transparent text-[#3c4043] dark:text-[#e8eaed] px-4 py-2 rounded transition-all"
          >
            Abhinav Search
          </button>
          <button
            onClick={feelingCurious}
            className="text-[14px] bg-[#f8f9fa] dark:bg-[#303134] hover:border-[#dadce0] dark:hover:border-[#5f6368] hover:shadow-sm border border-transparent text-[#3c4043] dark:text-[#e8eaed] px-4 py-2 rounded transition-all"
          >
            I'm Feeling Curious
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-[13px] text-[#4d5156] dark:text-[#9aa0a6]"
        >
          A search engine that only knows one thing - Abhinav. Try searching anything.
        </motion.p>
      </main>

      {/* Footer */}
      <footer className="bg-[#f2f2f2] dark:bg-[#171717] text-[#70757a] dark:text-[#9aa0a6] text-[14px]">
        <div className="px-6 py-3 border-b border-[#dadce0] dark:border-[#3c4043]">
          Uttar Pradesh, India
        </div>
        <div className="px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/search?tab=about&q=abhinav" className="hover:underline">About</Link>
            <Link to="/search?tab=projects&q=projects" className="hover:underline">Projects</Link>
            <Link to="/search?tab=skills&q=skills" className="hover:underline">Skills</Link>
            <Link to="/search?tab=contact&q=abhinav" className="hover:underline">Contact</Link>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-[#202124] dark:hover:text-white transition-colors"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#202124] dark:hover:text-white transition-colors"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              aria-label="Email"
              className="hover:text-[#202124] dark:hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;