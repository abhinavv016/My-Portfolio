import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link, useLocation, useNavigate, NavigateFunction } from "react-router";
import emailjs from "@emailjs/browser";

import Footer from "../components/Footer";
import SearchResult from "../components/SearchResult";
import KnowledgePanel from "../components/KnowledgePanel";
import ResultSkeleton from "../components/ResultSkeleton";
import {
  PROFILE,
  PROJECTS,
  SKILLS,
  SKILL_CATEGORIES,
  EXPERIENCE,
  EDUCATION,
  CODING_PROFILES,
  RELATED_SEARCHES,
  SOCIAL_LINKS,
} from "../mock";
import { motion } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,

  Send,
  GraduationCap,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import { FaPhone, FaTwitter, FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from "../components/NavBar";

/* ---------- Types & Interfaces ---------- */

interface ProfileColors {
  [key: string]: string;
}


const useQuery = (): URLSearchParams => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const PROFILE_COLORS: ProfileColors = {
  leetcode: "#FFA116",
  codechef: "#5B4638",
  codeforces: "#1F8ACB",
};

/* ---------- Section Components ---------- */

const AboutResult: React.FC = () => (
  <SearchResult
    faviconLetter="A"
    faviconColor="#4285F4"
    title="Abhinav Chaurasia – Aspiring Software Developer"
    description="B.Tech student at PSIT specializing in full-stack development with React, Next.js, and Node.js. Strong algorithmic foundation with 1,000+ DSA problems solved in C++, combined with hands-on experience building scalable, real-time systems including Reviewboxd and IntervueX."
    breadcrumb="abhinav.dev › profile"
    sitelinks={[
      {
        label: "Download Resume (PDF)",
        url: "/Abhinav_Chaurasia_Resume.pdf",
        download: true
      },
      {
        label: "GitHub Repositories",
        url: "https://github.com/abhinavv016"
      }
    ]}
  />
);

const ProjectsList: React.FC<{ delayBase?: number }> = ({ delayBase = 0 }) => (
  <>
    {PROJECTS.map((p, i) => (
      <SearchResult
        key={p.id}
        delay={delayBase + 0.05 * (i + 1)}
        faviconLetter={p.title.charAt(0)}
        faviconColor={["#34A853", "#EA4335", "#FBBC04"][i % 3]}
        domain={p.url.split("/")[0]}
        breadcrumb={p.breadcrumb}
        title={p.title}
        description={p.description}
        date={p.date}
        externalUrl={p.fullUrl}
      />
    ))}
  </>
);

const SkillsResult: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <motion.section
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="max-w-[652px]"
  >
    <div className="flex items-center gap-3">
      <div className="shrink-0 w-7 h-7 rounded-full bg-[#34A853] flex items-center justify-center text-white text-[12px] font-semibold">S</div>
      <div className="min-w-0">
        <div className="text-[12px] text-[#4d5156] dark:text-[#bdc1c6]">abhinav.dev</div>
        <div className="text-[12px] text-[#4d5156] dark:text-[#9aa0a6]">abhinav.dev › skills</div>
      </div>
    </div>
    <h3 className="mt-1 text-[20px] leading-[26px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer">
      Abhinav – Skills & Tooling
    </h3>
    <p className="mt-1 text-[14px] text-[#4d5156] dark:text-[#bdc1c6]">
      Languages, frameworks and tooling Abhinav uses day-to-day. Click any tag to refine your search.
    </p>
    <div className="mt-3 flex flex-wrap gap-2">
      {SKILLS.map((s) => (
        <Link
          key={s}
          to={`/search?q=abhinav+${encodeURIComponent(s)}`}
          className="text-[13px] px-3 py-1.5 rounded-full border border-[#dadce0] dark:border-[#5f6368] text-[#3c4043] dark:text-[#e8eaed] hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043] transition"
        >
          {s}
        </Link>
      ))}
    </div>
  </motion.section>
);

const ProfilesList: React.FC<{ navigate: NavigateFunction; delayBase?: number }> = ({ navigate, delayBase = 0 }) => (
  <>
    {CODING_PROFILES.map((cp, i) => (
      <SearchResult
        key={cp.id}
        delay={delayBase + i * 0.05}
        faviconLetter={cp.name.charAt(0)}
        faviconColor={PROFILE_COLORS[cp.id]}
        domain={cp.url.split("/")[0]}
        breadcrumb={cp.breadcrumb}
        title={cp.title}
        description={cp.description}
        onTitleClick={() => navigate(cp.internalRoute)}
      />
    ))}
  </>
);

/* ---------- Tab-specific richer panels ---------- */

const AboutPanel: React.FC = () => (
  <div className="space-y-7">
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[652px] border border-[#dadce0] dark:border-[#3c4043] rounded-xl p-6"
    >
      <div className="text-[12px] text-[#4d5156] dark:text-[#9aa0a6]">abhinav.dev › about</div>
      <h1 className="text-[26px] leading-8 font-medium mt-1">About {PROFILE.name}</h1>
      <p className="mt-3 text-[15px] leading-[24px] text-[#3c4043] dark:text-[#e8eaed]">
        {PROFILE.about}
      </p>
      <p className="mt-3 text-[15px] leading-[24px] text-[#3c4043] dark:text-[#e8eaed]">
        When I'm not coding, you'll find me lost in sci-fi novels, rewatching Nolan films, or debating why Interstellar's ending actually makes sense. Self-proclaimed nerd who appreciates elegant systems both in code and storytelling.
      </p>
    </motion.section>

    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="max-w-[652px]"
    >
      <h2 className="text-[18px] font-medium mb-3 flex items-center gap-2">
        <Briefcase className="w-4 h-4 text-[#1a73e8] dark:text-[#8ab4f8]" /> Experience
      </h2>
      <div className="space-y-4">
        {EXPERIENCE.map((e) => (
          <div
            key={e.role + e.company}
            className="border border-[#dadce0] dark:border-[#3c4043] rounded-xl p-4"
          >
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <div className="text-[16px] font-medium">{e.role}</div>
              <div className="text-[12px] text-[#5f6368] dark:text-[#9aa0a6]">{e.period}</div>
            </div>
            <div className="text-[13px] text-[#1a73e8] dark:text-[#8ab4f8]">{e.company}</div>
            <ul className="mt-2 space-y-1 list-disc list-inside text-[14px] text-[#3c4043] dark:text-[#e8eaed]">
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.section>

    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="max-w-[652px]"
    >
      <h2 className="text-[18px] font-medium mb-3 flex items-center gap-2">
        <GraduationCap className="w-4 h-4 text-[#34A853]" /> Education
      </h2>
      <div className="space-y-4">
        {EDUCATION.map((ed) => (
          <div
            key={ed.school}
            className="border border-[#dadce0] dark:border-[#3c4043] rounded-xl p-4"
          >
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <div className="text-[16px] font-medium">{ed.school}</div>
              <div className="text-[12px] text-[#5f6368] dark:text-[#9aa0a6]">{ed.period}</div>
            </div>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <div className="text-[13px] text-[#1a73e8] dark:text-[#8ab4f8]">{ed.degree}</div>
              <div className="text-[12px] text-[#5f6368] dark:text-[#9aa0a6]">{ed.percent}</div>
            </div>
            <p className="mt-1 text-[14px] text-[#3c4043] dark:text-[#e8eaed]">{ed.detail}</p>
          </div>
        ))}
      </div>
    </motion.section>
  </div>
);

const SkillsPanel: React.FC = () => (
  <div className="space-y-7">
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[652px]"
    >
      <div className="text-[12px] text-[#4d5156] dark:text-[#9aa0a6]">abhinav.dev › skills</div>
      <h1 className="text-[26px] leading-8 font-medium mt-1">Abhinav - Skills & Stack</h1>
      <p className="mt-2 text-[14px] text-[#4d5156] dark:text-[#bdc1c6]">
        A snapshot of the tools and technologies I reach for, grouped by where they fit in the stack.
      </p>
    </motion.section>

    {SKILL_CATEGORIES.map((cat, i) => (
      <motion.section
        key={cat.name}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 * (i + 1) }}
        className="max-w-[652px] border border-[#dadce0] dark:border-[#3c4043] rounded-xl p-4"
      >
        <div className="flex items-center gap-3">
          <span
            className="w-7 h-7 rounded-full text-white text-[12px] font-semibold flex items-center justify-center"
            style={{ backgroundColor: cat.color }}
          >
            {cat.name.charAt(0)}
          </span>
          <h3 className="text-[16px] font-medium">{cat.name}</h3>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {cat.skills.map((s) => (
            <Link
              key={s}
              to={`/search?q=abhinav+${encodeURIComponent(s)}`}
              className="text-[13px] px-3 py-1.5 rounded-full border border-[#dadce0] dark:border-[#5f6368] text-[#3c4043] dark:text-[#e8eaed] hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043] transition"
            >
              {s}
            </Link>
          ))}
        </div>
      </motion.section>
    ))}

    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="max-w-163 border border-[#dadce0] dark:border-[#3c4043] rounded-xl p-5 bg-[#f8f9fa] dark:bg-[#2a2b2d]"
    >
      <h3 className="text-[16px] font-medium">Currently learning</h3>
      <p className="text-[14px] text-[#4d5156] dark:text-[#bdc1c6] mt-1">
        OOPs · System Design · Devops
      </p>
    </motion.section>
  </div>
);

const ContactPanel: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState<boolean>(false);

  const handleSendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    setIsSending(true);

    emailjs
      .sendForm(
        'service_6pbu2xj',
        'template_4punbzv',
        formRef.current,
        '4DbCMRlZFV2DMDOU0'
      )
      .then(
        () => {
          setIsSending(false);
          setSent(true);
          formRef.current?.reset();
          setTimeout(() => setSent(false), 5000);
        },
        (error) => {
          setIsSending(false);
          console.error("FAILED...", error.text);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  const items = [
    { icon: FaEnvelope, label: "Email", value: "abhichaurasia016@gmail.com", href: `mailto: abhichaurasia016@gmail.com`, color: "#EA4335" },
    { icon: FaPhone, label: "Phone", value: "+91 82994 23424", href: `tel:+918299423424`, color: "#34A853" },
    { icon: FaLinkedin, label: "LinkedIn", value: "linkedin.com/in/abhinavv016", href: "https://linkedin.com/in/abhinavv016", color: "#0A66C2" },
    { icon: FaGithub, label: "GitHub", value: "github.com/abhinavv016", href: "https://github.com/abhinavv016", color: "#24292F" },
    { icon: FaTwitter, label: "Twitter/X", value: "@abhinavv016", href: "https://twitter.com/abhinavv016", color: "#1DA1F2" },
    { icon: FaMapMarkerAlt, label: "Location", value: "Kanpur, India", color: "#FBBC04" },
  ];

  return (
    <div className="space-y-7">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[652px]"
      >
        <div className="text-[12px] text-[#4d5156] dark:text-[#9aa0a6]">abhinav.dev › contact</div>
        <h1 className="text-[26px] leading-8 font-medium mt-1 text-[#202124] dark:text-white">Get in touch with Abhinav</h1>
        <p className="mt-2 text-[14px] text-[#4d5156] dark:text-[#bdc1c6]">
          Have a project in mind, or just want to say hello? Reach out via any of the channels below.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-[652px] grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {items.map((it) => {
          const Icon = it.icon;
          const isLink = !!it.href;
          const commonClasses = "flex items-center gap-3 border border-[#dadce0] dark:border-[#3c4043] rounded-xl p-4 hover:bg-[#f8f9fa] dark:hover:bg-[#2a2b2d] transition-colors duration-300";

          const content = (
            <>
              <span className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: it.color }}>
                <Icon className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <div className="text-[12px] text-[#5f6368] dark:text-[#9aa0a6]">{it.label}</div>
                <div className="text-[14px] font-medium truncate text-[#202124] dark:text-[#e8eaed]">{it.value}</div>
              </div>
            </>
          );

          return isLink ? (
            <a key={it.label} href={it.href} target="_blank" rel="noreferrer" className={commonClasses}>
              {content}
            </a>
          ) : (
            <div key={it.label} className={commonClasses}>
              {content}
            </div>
          );
        })}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-[652px] border border-[#dadce0] dark:border-[#3c4043] rounded-xl p-5 bg-white dark:bg-[#202124] transition-colors duration-300"
      >
        <h3 className="text-[16px] font-medium text-[#202124] dark:text-white">Send a message</h3>
        <form ref={formRef} onSubmit={handleSendEmail} className="mt-3 grid gap-3">
          {/* Match your template variable: {{name}} */}
          <input
            required
            name="name"
            type="text"
            placeholder="Your name"
            className="w-full px-4 h-11 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-transparent outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] text-[14px] text-[#202124] dark:text-[#e8eaed]"
          />

          {/* Match your template variable: {{email}} */}
          <input
            required
            name="email"
            type="email"
            placeholder="Your email"
            className="w-full px-4 h-11 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-transparent outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] text-[14px] text-[#202124] dark:text-[#e8eaed]"
          />

          {/* Match your template variable: {{message}} */}
          <textarea
            required
            name="message"
            placeholder="Tell Abhinav what you're working on..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-[#dadce0] dark:border-[#3c4043] bg-transparent outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] text-[14px] text-[#202124] dark:text-[#e8eaed] resize-none"
          />

          <button
            type="submit"
            disabled={isSending}
            className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-[#1a73e8] hover:bg-[#1664c7] text-white text-[14px] font-medium transition disabled:bg-gray-400 w-full sm:w-auto"
          >
            {isSending ? "Sending..." : <><Send className="w-4 h-4" /> Send message</>}
          </button>

          {sent && (
            <div className="flex items-center gap-2 text-[13px] text-[#137333] dark:text-[#81c995] font-medium mt-1">
              <CheckCircle className="w-4 h-4" />
              Your message has been sent to Abhinav's inbox!
            </div>
          )}
        </form>
      </motion.section>
    </div>
  );
};


/* ---------- Page ---------- */

const SearchResults: React.FC = () => {
  const params = useQuery();
  const q = params.get("q") || "abhinav";
  const tab = params.get("tab") || "all";
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, [q, tab]);

  const showCorrection = q.trim().toLowerCase() !== "abhinav" && tab === "all";
  const tabLabelMap: Record<string, string> = {
    all: "All",
    projects: "Projects",
    profiles: "Profiles",
    skills: "Skills",
    about: "About",
    contact: "Contact"
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#202124] text-[#202124] dark:text-[#e8eaed]">
      <Navbar query={q} activeTab={tab} />

      <main className="flex-1 px-4 md:px-[88px] py-6">
        <div className="text-[12px] text-[#70757a] dark:text-[#9aa0a6] mb-3">
          About 1{Math.floor(Math.random() * 90) + 10},{Math.floor(Math.random() * 900) + 100},000 results (0.{Math.floor(Math.random() * 60) + 18} seconds) - {tabLabelMap[tab]} tab
        </div>

        {showCorrection && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 max-w-[652px]"
          >
            <div className="text-[16px]">
              Showing results for{" "}
              <button
                onClick={() => navigate("/search?q=abhinav")}
                className="italic text-[#c5221f] dark:text-[#f28b82] hover:underline font-medium"
              >
                Abhinav
              </button>
            </div>
            <div className="text-[14px] text-[#4d5156] dark:text-[#bdc1c6] mt-1 inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Search instead for{" "}
              <button
                onClick={() => navigate(`/search?q=${encodeURIComponent(q)}&literal=1`)}
                className="text-[#1a0dab] dark:text-[#8ab4f8] hover:underline ml-1"
              >
                {q}
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,652px)_minmax(0,372px)] gap-12">
          {/* Left column - content */}
          <div className="min-w-0">
            {loading ? (
              <ResultSkeleton />
            ) : (
              <>
                {tab === "all" && (
                  <div className="space-y-7">
                    <AboutResult />
                    <ProjectsList />
                    <SkillsResult delay={0.25} />
                    <ProfilesList navigate={navigate} delayBase={0.3} />

                    {/* People also ask */}
                    <section className="max-w-[652px] mt-2 border border-[#dadce0] dark:border-[#3c4043] rounded-xl overflow-hidden">
                      <div className="px-4 py-3 text-[18px] font-medium">People also ask</div>
                      {[
                        "What does Abhinav do?",
                        "What is Abhinav's tech stack?",
                        "How can I contact Abhinav?",
                        "What are Abhinav's best projects?",
                      ].map((q2, idx) => (
                        <details key={q2} className="group border-t border-[#ecedef] dark:border-[#3c4043]">
                          <summary className="px-4 py-3 flex items-center justify-between cursor-pointer text-[14px] hover:bg-[#f8f9fa] dark:hover:bg-[#2a2b2d]">
                            {q2}
                            <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                          </summary>
                          <div className="px-4 pb-4 text-[14px] text-[#4d5156] dark:text-[#bdc1c6]">
                            {idx === 0 && PROFILE.about}
                            {idx === 1 && `${SKILLS.slice(0, 8).join(", ")}, and more.`}
                            {idx === 2 && `Reach out at ${PROFILE.email} or call ${PROFILE.phone}.`}
                            {idx === 3 && PROJECTS.map((p) => p.title.split(" – ")[0]).join(", ")}
                          </div>
                        </details>
                      ))}
                    </section>

                    {/* Related searches */}
                    <section className="max-w-[652px]">
                      <h4 className="text-[18px] font-medium mb-3">Related searches</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {RELATED_SEARCHES.map((r) => (
                          <Link
                            key={r}
                            to={`/search?q=${encodeURIComponent(r)}`}
                            className="flex items-center gap-3 px-4 py-2.5 border border-[#dadce0] dark:border-[#3c4043] rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043] transition text-[14px]"
                          >
                            <Search className="w-4 h-4 text-[#9aa0a6]" />
                            <span>{r}</span>
                          </Link>
                        ))}
                      </div>
                    </section>

                    {/* Pagination */}
                    <div className="max-w-[652px] flex items-center justify-center gap-2 pt-6 pb-2 text-[14px]">
                      <button className="p-1 disabled:opacity-40" disabled>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          className={`w-7 h-7 rounded-full ${n === 1 ? "bg-[#1a73e8] text-white" : "hover:bg-[#f1f3f4] dark:hover:bg-[#3c4043]"}`}
                        >
                          {n}
                        </button>
                      ))}
                      <button className="p-1">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {tab === "projects" && (
                  <div className="space-y-7">
                    <h1 className="text-[22px] font-medium">Projects by Abhinav</h1>
                    <ProjectsList />
                  </div>
                )}

                {tab === "profiles" && (
                  <div className="space-y-7">
                    <h1 className="text-[22px] font-medium">Coding Profiles - Abhinav</h1>
                    <ProfilesList navigate={navigate} />
                  </div>
                )}

                {tab === "skills" && <SkillsPanel />}
                {tab === "about" && <AboutPanel />}
                {tab === "contact" && <ContactPanel />}
              </>
            )}
          </div>

          {/* Right column - Knowledge Panel */}
          {!loading && (
            <div className="hidden lg:block">
              <KnowledgePanel
                title={PROFILE.name}
                subtitle={`${PROFILE.role} · ${PROFILE.location}`}
                description={PROFILE.shortBio}
                accent="#4285F4"
                initials="AC"
                facts={[
                  { label: "Role", value: PROFILE.role },
                  { label: "Based in", value: PROFILE.location },
                  { label: "Email", value: PROFILE.email },
                  { label: "Phone", value: PROFILE.phone },
                  {
                    label: "GitHub",
                    value: (
                      <a
                        href={SOCIAL_LINKS.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline"
                      >
                        @abhinavv016
                      </a>
                    )
                  },
                  {
                    label: "LinkedIn",
                    value: (
                      <a
                        href={SOCIAL_LINKS.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#1a73e8] dark:text-[#8ab4f8] hover:underline"
                      >
                        @abhinavv016
                      </a>
                    )
                  },
                ]}
                link={SOCIAL_LINKS.github}
              />
            </div>
          )}
        </div>
      </main>

      <Footer minimal />
    </div>
  );
};

export default SearchResults;
