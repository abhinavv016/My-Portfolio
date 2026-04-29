import { Link } from "react-router";

const Footer = ({ minimal = false }) => {
  if (minimal) {
    return (
      <footer className="bg-[#f2f2f2] dark:bg-[#171717] text-[#70757a] dark:text-[#9aa0a6] text-[14px]">
        <div className="px-6 py-3 border-b border-[#dadce0] dark:border-[#3c4043]">India</div>
        <div className="px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/search?q=about+abhinav" className="hover:underline">About</Link>
            <a href="#" className="hover:underline">Advertising</a>
            <a href="#" className="hover:underline">Business</a>
            <a href="#" className="hover:underline">How Search works</a>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Settings</a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#f2f2f2] dark:bg-[#171717] text-[#70757a] dark:text-[#9aa0a6] text-[14px] mt-auto">
      <div className="px-6 py-4 border-b border-[#dadce0] dark:border-[#3c4043]">
        Crafted with React, Tailwind & Framer Motion - Inspired by Google Search.
      </div>
      <div className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/search?q=about+abhinav" className="hover:underline">About</Link>
          <Link to="/profiles/leetcode" className="hover:underline">LeetCode</Link>
          <Link to="/profiles/codechef" className="hover:underline">CodeChef</Link>
          <Link to="/profiles/codeforces" className="hover:underline">Codeforces</Link>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
