import React from "react";
import { motion } from "framer-motion";
import { MoreVertical, ExternalLink } from "lucide-react";

interface Sitelink {
  label: string;
  url: string;
  download?: boolean;
}

interface SearchResultProps {
  breadcrumb: string;
  domain?: string;
  title: string;
  description: string;
  onTitleClick?: () => void;
  externalUrl?: string;
  date?: string;
  faviconLetter?: string;
  faviconColor?: string;
  delay?: number;
  sitelinks?: Sitelink[];
}

const SearchResult: React.FC<SearchResultProps> = ({
  breadcrumb,
  domain = "abhinav.dev",
  title,
  description,
  onTitleClick,
  externalUrl,
  date,
  faviconLetter,
  faviconColor = "#4285F4",
  delay = 0,
  sitelinks = [],
}) => {

  const handleClick = (e: React.MouseEvent) => {
    if (onTitleClick) {
      e.preventDefault();
      onTitleClick();
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="max-w-[652px] group mb-8"
    >
      {/* Top Section: Favicon and Domain Info */}
      <div className="flex items-start gap-3 mb-1">
        <div
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-[12px] font-semibold mt-1"
          style={{ backgroundColor: faviconColor }}
          aria-hidden="true"
        >
          {(faviconLetter || domain.charAt(0)).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[12px] text-[#4d5156] dark:text-[#bdc1c6] leading-tight">
            <span className="truncate">{domain}</span>
          </div>
          <div className="text-[12px] text-[#4d5156] dark:text-[#9aa0a6] truncate">
            {breadcrumb}
          </div>
        </div>

        {/* More Options (Google style) */}
        <button
          type="button"
          aria-label="More"
          className="opacity-0 group-hover:opacity-100 text-[#70757a] hover:text-[#202124] dark:hover:text-white transition p-1"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Title Section */}
      <a
        href={externalUrl || "#"}
        target={onTitleClick ? undefined : "_blank"}
        rel="noreferrer"
        onClick={handleClick}
        className="block"
      >
        <h3 className="text-[20px] leading-[26px] text-[#1a0dab] dark:text-[#8ab4f8] font-normal hover:underline">
          {title}
        </h3>
      </a>

      {/* Description Snippet */}
      <p className="mt-1 text-[14px] leading-[22px] text-[#4d5156] dark:text-[#bdc1c6]">
        {date && (
          <span className="text-[#70757a] dark:text-[#9aa0a6]">{date} - </span>
        )}
        {description}
      </p>

      {/* Sitelinks Section (Ideal for Resume & Projects) */}
      {sitelinks.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
          {sitelinks.map((link) => (
            <div key={link.label} className="flex flex-col">
              <a
                href={link.url}
                download={link.download}
                target={link.download ? undefined : "_blank"}
                rel="noreferrer"
                className="text-[#1a0dab] dark:text-[#8ab4f8] text-[14px] hover:underline flex items-center gap-1.5 w-fit font-medium"
              >
                {link.label}
                {!link.download && <ExternalLink className="w-3 h-3 opacity-50" />}
              </a>
            </div>
          ))}
        </div>
      )}
    </motion.article>
  );
};

export default SearchResult;