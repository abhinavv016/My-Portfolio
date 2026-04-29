import { useEffect, useRef, useState } from "react";
import { Search, Mic, Camera, X } from "lucide-react";
import { useNavigate } from "react-router";
import { SEARCH_SUGGESTIONS } from "../mock";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  initialValue?: string;
  size?: "lg" | "md";
  showButtons?: boolean;
  autoFocus?: boolean;
}

const SearchBar = ({
  initialValue = "",
  size = "lg",
  showButtons = false,
  autoFocus = false,
}: SearchBarProps) => {
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();


  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => setValue(initialValue), [initialValue]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const submit = (q?: string) => {
    const query = (q ?? value).trim() || "abhinav";
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setFocused(false);
  };

  const filtered = value
    ? SEARCH_SUGGESTIONS.filter((s) => s.toLowerCase().includes(value.toLowerCase())).slice(0, 8)
    : SEARCH_SUGGESTIONS.slice(0, 8);

  const heightCls = size === "lg" ? "h-12 md:h-14" : "h-11";

  return (
    <div className="w-full relative" ref={wrapRef}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className={`flex items-center w-full ${heightCls} px-4 gap-3 border bg-white dark:bg-[#303134] border-[#dfe1e5] dark:border-transparent rounded-full transition-shadow ${focused
            ? "shadow-[0_1px_6px_rgba(32,33,36,0.28)] dark:shadow-[0_1px_6px_rgba(0,0,0,0.6)] border-transparent"
            : "hover:shadow-[0_1px_6px_rgba(32,33,36,0.18)] dark:hover:bg-[#3a3b3d]"
          }`}
        onClick={() => setFocused(true)}
      >
        <Search className="w-5 h-5 text-[#9aa0a6] shrink-0" />
        <input
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search Abhinav..."
          className="flex-1 bg-transparent outline-none text-[16px] text-[#202124] dark:text-[#e8eaed] placeholder:text-[#80868b]"
        />

        {value && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setValue("");
            }}
            className="text-[#70757a] hover:text-[#202124] dark:hover:text-white"
            aria-label="Clear"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {value && <span className="w-px h-6 bg-[#dfe1e5] dark:bg-[#5f6368]" />}
        <button type="button" aria-label="Voice search" className="text-[#4285F4]">
          <Mic className="w-5 h-5" />
        </button>
        <button type="button" aria-label="Image search" className="text-[#4285F4]">
          <Camera className="w-5 h-5" />
        </button>
      </form>

      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 left-0 right-0 mt-1 bg-white dark:bg-[#303134] border border-transparent rounded-2xl shadow-[0_4px_6px_rgba(32,33,36,0.28)] overflow-hidden"
          >
            <ul className="py-2">
              {filtered.map((s) => (
                <li
                  key={s}
                  onClick={() => submit(s)}
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043] text-[#202124] dark:text-[#e8eaed] text-[15px]"
                >
                  <Search className="w-4 h-4 text-[#9aa0a6]" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            {showButtons && (
              <div className="flex justify-center gap-3 py-3 border-t border-[#ecedef] dark:border-[#3c4043]">
                <button
                  type="button"
                  onClick={() => submit()}
                  className="text-[14px] bg-[#f8f9fa] dark:bg-[#303134] hover:border-[#dadce0] dark:hover:border-[#5f6368] border border-transparent text-[#3c4043] dark:text-[#e8eaed] px-4 py-2 rounded"
                >
                  Abhinav Search
                </button>
                <button
                  type="button"
                  onClick={() => submit("i'm feeling curious")}
                  className="text-[14px] bg-[#f8f9fa] dark:bg-[#303134] hover:border-[#dadce0] dark:hover:border-[#5f6368] border border-transparent text-[#3c4043] dark:text-[#e8eaed] px-4 py-2 rounded"
                >
                  I'm Feeling Curious
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;