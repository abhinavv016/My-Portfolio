import { Link, useLocation } from "react-router";
import {
  Sun, Moon,
  LayoutGrid, FolderGit2, Code2, Wrench,
  IdCard, Mail, LucideIcon,
  Share2
} from "lucide-react";
import AbhinavLogo from "./AbhinavLogo";
import SearchBar from "./SearchBar";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import MyProfileImage from "/MyProfileImage.png";

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

const TABS: Tab[] = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "profiles", label: "Profiles", icon: Code2 },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "about", label: "About", icon: IdCard },
  { id: "contact", label: "Contact", icon: Mail },
];

interface NavbarProps {
  query?: string;
  activeTab?: string;
}

const Navbar = ({ query = "", activeTab = "all" }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const buildTabHref = (tabId: string) => {
    const params = new URLSearchParams(location.search);

    const currentQ = query || params.get("q") || "abhinav";
    params.set("q", currentQ);

    if (tabId === "all") {
      params.delete("tab");
    } else {
      params.set("tab", tabId);
    }

    return `/search?${params.toString()}`;
  };

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-[#202124] border-b border-[#ebebeb] dark:border-[#3c4043]">
      <div className="mx-auto w-fit mt-2">
        <Link to="/" aria-label="Abhinav Home">
          <div className="flex md:hidden items-center text-2xl font-bold tracking-tighter select-none">
            <span className="text-[#4285F4]">A</span>
            <span className="text-[#EA4335]">b</span>
            <span className="text-[#FBBC05]">h</span>
            <span className="text-[#4285F4]">i</span>
            <span className="text-[#34A853]">n</span>
            <span className="text-[#EA4335]">a</span>
            <span className="text-[#4285F4]">v</span>
          </div>

        </Link>
      </div>
      <div className="flex items-center gap-4 md:gap-8 px-4 md:px-6 pt-4 pb-2">
        <Link to="/" className="shrink-0 hidden md:block">
          <AbhinavLogo size="md" />
        </Link>


        <div className="flex-1 max-w-[692px] mr-4 md:mx-0">
          <SearchBar initialValue={query} size="md" />
        </div>

        <div className="hidden md:flex items-center gap-2 ml-auto text-[#5f6368] dark:text-[#e8eaed]">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043] transition-colors"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <button type="button" aria-label="Settings" className="p-2 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043]">
            <Share2 className="w-5 h-5" />
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

      <nav className="flex items-center gap-1 px-4 md:px-[88px] overflow-x-auto no-scrollbar text-[14px] text-[#5f6368] dark:text-[#bdc1c6]">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = t.id === activeTab;

          return (
            <Link
              key={t.id}
              to={buildTabHref(t.id)}
              className={`relative px-3 py-3 whitespace-nowrap inline-flex items-center gap-1.5 transition-colors ${isActive
                ? "text-[#1a73e8] dark:text-[#8ab4f8]"
                : "hover:text-[#202124] dark:hover:text-white"
                }`}
            >
              <Icon className="w-4 h-4" />
              <span className={isActive ? "font-medium" : ""}>
                {t.label}
              </span>
              {isActive && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute left-0 right-0 -bottom-[1px] h-[3px] bg-[#1a73e8] dark:bg-[#8ab4f8] rounded-t"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;