export const PROFILE = {
    name: "Abhinav Chaurasia",
    role: "Full Stack Developer",
    tagline: "Crafting end-to-end web experiences with React, Node.js & cloud-native tooling.",
    location: "Uttar Pradesh, India",
    email: "abhichaurasia016@gmail.com",
    phone: "+91 82994 23424",
    about:
        "Full-stack developer building scalable, real-time applications with React, Next.js, Node.js, and PostgreSQL. I solve problems with strong algorithmic thinking-600+ LeetCode problems-and ship products that perform at scale across web and browser extensions (Reviewboxd, IntervueX). I obsess over clean architectures, type-safe APIs, and UI that feels effortless.",
    shortBio:
        "Full Stack Developer · React · Next.js · Node.js · TypeScript · PostgreSQL · Prisma · Tailwind CSS · Real-time systems · Building impactful products since 2024.",
    Id: "@abhinavv016"
};

export const SOCIAL_LINKS = {
    github: "https://github.com/abhinavv016",
    linkedin: "https://linkedin.com/in/abhinavv016",
    twitter: "https://twitter.com/abhinavv016",
    email: "mailto: abhichaurasia016@gmail.com",
};

export const SKILLS = [
    "C",
    "C++",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "REST APIs",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "Tailwind CSS",
    "Framer Motion",
    "Docker",
    "AWS",
    "Git",
    "GitHub",
    "Postman",
    "OAuth",
    "NextAuth",
    "Clerk",
    "GetStream",
    "Inngest",
];

export const SKILL_CATEGORIES = [
    {
        name: "Programming Language",
        color: "#4285F4",
        skills: ["C", "C++", "JavaScript", "TypeScript"],
    },
    {
        name: "Frontend",
        color: "#5B9DF9",
        skills: ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
    },
    {
        name: "Backend",
        color: "#34A853",
        skills: ["Node.js", "Express.js", "REST APIs"],
    },
    {
        name: "Databases & ORMs",
        color: "#F9AB00",
        skills: ["MongoDB", "PostgreSQL", "Prisma"],
    },
    {
        name: "DevOps & Cloud",
        color: "#EA4335",
        skills: ["Docker", "AWS", "GitHub Actions", "Vercel"],
    },
    {
        name: "Authentication & Realtime",
        color: "#A142F4",
        skills: ["OAuth", "NextAuth", "Clerk", "GetStream", "Inngest"]
    },
    {
        name: "Tools",
        color: "#24C1E0",
        skills: ["Git", "GitHub", "Postman"],
    },
];

export const EXPERIENCE = [
    {
        role: "Full Stack Developer",
        company: "Independent / Freelance",
        period: "2023 - Present",
        bullets: [
            "Shipping production web apps for early-stage startups across Next.js + FastAPI stacks.",
            "Designed and deployed real-time interview platform IntervueX serving 5k+ users.",
        ],
    },
];

export const EDUCATION = [
    {
        school: "Pranveer Singh Institute Of Technology",
        degree: "Bachelor Of Technology, Computer Science & Engineering",
        period: "2023 - 2027",
        percent: "7.38",
        detail: "Coursework: DSA, OS, DBMS, System Design.",
    },
    {
        school: "Radha Krishna Memorial Education Center",
        degree: "Senior Secondary Education",
        percent: "74.4%",
        period: "2022",
    },
    {
        school: "Radha Krishna Memorial Education Center",
        degree: "Secondary Education",
        percent: "85%",
        period: "2020",
    },
];

export const PROJECTS = [
    {
        id: "intervuex",
        title: "IntervueX – Mock Interview Platform",
        url: "IntervueX",
        fullUrl: "https://github.com/abhinavv016/IntervueX",
        breadcrumb: "intervuex.abhinav.dev › projects › intervuex",
        description:
            "IntervueX is a real-time mock-interview platform that simulates technical interviews, evaluates answers, and produces feedback reports. Built with React, TypeScript, getStream and OpenAI.",
        tags: ["Next.js", "FastAPI", "OpenAI", "WebRTC"],
        date: "Mar 29, 2026",
    },
    {
        id: "reviewboxd",
        title: "ReviewBoxd – Social Reviews for Movies & Shows",
        url: "ReviewBoxd",
        fullUrl: "https://github.com/abhinavv016/ReviewBoxd",
        breadcrumb: "reviewboxd.abhinav.dev › projects › reviewboxd",
        description:
            "A Letterboxd-inspired social platform for tracking, reviewing and discussing films and series. Features personalised feeds, watchlists, and friend activity. Built with React, Node.js and PostgreSQL.",
        tags: ["React", "Node.js", "PostgreSQL", "Redis"],
        date: "Feb 04, 2024",
    },
    // {
    //     id: "consoled",
    //     title: "Consoled – A Browser-Based JS Playground",
    //     url: "consoled.abhinav.dev",
    //     fullUrl: "https://consoled.abhinav.dev",
    //     breadcrumb: "consoled.abhinav.dev › projects › consoled",
    //     description:
    //         "Consoled is a fast, in-browser JavaScript & TypeScript playground with multi-file editing, npm imports and live console output. Built with React, esbuild-wasm and Monaco Editor.",
    //     tags: ["React", "TypeScript", "esbuild-wasm", "Monaco"],
    //     date: "Sep 21, 2023",
    // },
];

export const CODING_PROFILES = [
    {
        id: "leetcode",
        name: "LeetCode",
        title: "Abhinav – LeetCode Profile",
        url: "leetcode.com/u/Drreader",
        fullUrl: "https://leetcode.com/u/Drreader",
        breadcrumb: "leetcode.com › u › Drreader",
        description:
            "View Abhinav's problem-solving stats, contest history and submissions on LeetCode. 600+ problems solved across DP, graphs and design.",
        internalRoute: "/profiles/leetcode",
        stats: {
            solved: 527,
            easy: 274,
            medium: 232,
            hard: 21,
            contestRating: 1702,
            globalRank: "168,851",
            maxStreak: 31,
            badges: ["100 Days Badge 2024", "50 Days Badge 2025", "50 Days Badge 2026"],
        },
    },
    {
        id: "codechef",
        name: "CodeChef",
        title: "Abhinav – CodeChef Profile",
        url: "codechef.com/users/Drreader",
        fullUrl: "https://codechef.com/users/Drreader",
        breadcrumb: "codechef.com › users › Drreader ",
        description:
            "Abhinav's CodeChef profile - current rating, division, contests participated and problems solved across long, cookoff and starters.",
        internalRoute: "/profiles/codechef",
        stats: {
            rating: 1353,
            stars: 1,
            division: "Div 4",
            globalRank: "54,486",
            countryRank: "51,131",
            contests: 18,
        },
    },
    {
        id: "codeforces",
        name: "Codeforces",
        title: "Abhinav – Codeforces Profile",
        url: "codeforces.com/profile/Drreader",
        fullUrl: "https://codeforces.com/profile/Drreader",
        breadcrumb: "codeforces.com › profile › Drreader",
        description:
            "Codeforces handle: Drreader. Rank, current and max rating, contributions and recent submissions for Abhinav.",
        internalRoute: "/profiles/codeforces",
        stats: {
            handle: "Drreader",
            rating: 1687,
            maxRating: 1742,
            rank: "Expert",
            maxRank: "Expert",
            contests: 64,
            problemsSolved: 1180,
        },
    },
];

export const SEARCH_SUGGESTIONS = [
    "abhinav full stack developer",
    "abhinav projects",
    "abhinav leetcode",
    "abhinav codechef",
    "abhinav codeforces",
    "abhinav github",
    "abhinav resume",
    "abhinav skills",
    "abhinav contact",
    "abhinav intervuex project",
];

export const RELATED_SEARCHES = [
    "abhinav developer portfolio",
    "abhinav react projects",
    "abhinav full stack resume",
    "abhinav open source contributions",
    "hire abhinav",
    "abhinav blog",
];