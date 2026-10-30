import {
  NavItem,
  PersonalInfo,
  Project,
  SkillCategory,
  SocialLink,
} from "@/types/portfolio";

export const personalInfo: PersonalInfo = {
  name: "Borshon Roy",
  title: "Full-Stack Web Developer",
  eyebrow: "FULL-STACK DEVELOPER",
  headline: "Turning ideas into digital experiences.",
  supportingText:
    "I'm a full-stack web developer building modern, scalable, and user-focused web applications, from intuitive interfaces to reliable backends.",
  bioParagraphs: [
    "I am an emerging web developer driven by the craft of turning concepts into intuitive digital interfaces. With a strong commitment to clean code, semantic structure, and accessible user experiences, I focus on building responsive web applications that feel natural to use.",
    "My current focus is on deepening my modern frontend and full-stack capabilities with TypeScript, Next.js (App Router), and Tailwind CSS. I prioritize thoughtful problem-solving, continuous learning, and crafting details that bridge visual design with robust code.",
  ],
  email: "borshonroy73@gmail.com",
  location: "Bangladesh",
  isAvailableForWork: true,
  resumeUrl: "/resume/Borshon_Roy_Web_Developer_Intern_Resume.pdf",
  phone: "+880 1540-600072",
  whatsapp: "+880 1311-950753",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/borshon07",
    iconName: "github",
    isPlaceholder: false,
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/borshon-roy09/",
    iconName: "linkedin",
    isPlaceholder: false,
  },
  {
    platform: "Email",
    url: "mailto:borshonroy73@gmail.com",
    iconName: "mail",
    isPlaceholder: false,
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend Development",
    description:
      "Creating responsive, modern, and user-focused web experiences.",
    skills: [
      { name: "React", level: "Active" },
      { name: "Next.js", level: "Active" },
      { name: "JavaScript (ES6+)", level: "Active" },
      { name: "TypeScript", level: "Active" },
      { name: "Tailwind CSS", level: "Active" },
      { name: "Responsive Web Development", level: "Active" },
    ],
  },
  {
    category: "Backend Development",
    description:
      "Building server-side applications, backend logic, and secure authentication systems.",
    skills: [
      { name: "Node.js", level: "Active" },
      { name: "Express.js", level: "Active" },
      { name: "Better Auth", level: "Active" },
      { name: "REST API Integration", level: "Active" },
    ],
  },
  {
    category: "Database & API Engineering",
    description:
      "Designing structured data models and reliable communication between application layers.",
    skills: [
      { name: "MongoDB", level: "Active" },
      { name: "Mongoose", level: "Active" },
      { name: "API Design", level: "Active" },
      { name: "Database Design", level: "Active" },
      { name: "Client-Server Architecture", level: "Active" },
    ],
  },
  {
    category: "Software Engineering",
    description:
      "Applying problem-solving skills and modern development practices to build practical applications.",
    skills: [
      { name: "Full-Stack Application Development", level: "Active" },
      { name: "AI Mindset & Engineering", level: "Active" },
      { name: "Product Development", level: "Active" },
      { name: "Problem Solving", level: "Active" },
    ],
  },
  {
    category: "Tools & Workflow",
    description:
      "Using development tools to manage code and maintain efficient workflows.",
    skills: [
      { name: "Git", level: "Active" },
      { name: "GitHub", level: "Active" },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "bazardor-market-tracker",
    title: "বাজার দর (BazarDor)",
    eyebrow: "Full-Stack Next.js 16 App",
    tagline:
      "Today's grocery market prices in Bangladesh at a glance with daily change tickers.",
    description:
      "A Bangla grocery market tracker built with Next.js 16 App Router, TypeScript, and Better Auth. Features an infinite scrolling price ticker, top price risers and fallers, category browsing, and bazar-wise price comparisons connected to MongoDB.",
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "HeroUI",
      "Better Auth",
      "MongoDB",
    ],
    githubUrl: "https://github.com/borshon07/BazarDor-web-B14-Ass-07",
    liveUrl: "https://bazar-dor-web-b14-ass-07.vercel.app/",
    image: "/projects/bazardor.png", // screenshot rakhar por uncomment koro
    challenges: [
      "Setting up authentication with Better Auth in the Next.js App Router and keeping server and client session handling clear.",
      "Designing MongoDB data for products, categories and bazar-wise prices so daily changes could be compared quickly.",
      "Building a smooth infinite price ticker and risers/fallers lists without hurting performance.",
    ],
    improvements: [
      "Add price history charts for each product.",
      "Let users set price alerts for the items they follow.",
      "Add an admin dashboard for managing prices and categories.",
    ],
    featured: true,
    year: "2026",
    aspect: "wide",
  },
  {
    id: "fitlog-workout-tracker",
    title: "FitLog Workout Companion",
    eyebrow: "Fitness Web Application",
    tagline:
      "Dark-themed workout tracking app with exercise library and personalized workout plans.",
    description:
      "A distraction-free training companion featuring a categorized workout directory with muscle groups, equipment requirements, difficulty filters, and saved exercises built with Next.js and Tailwind CSS.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "next-themes",
      "Sonner",
    ],
    githubUrl: "https://github.com/borshon07/B-14-A06--FitLog-by-Borshon",
    liveUrl: "https://fitlog.vercel.app/",
    image: "/projects/fitlog.png",
    challenges: [
      "Building filters for muscle group, equipment and difficulty that work together without confusing results.",
      "Keeping saved exercises and the theme preference consistent across pages.",
      "Designing a dark interface that stays readable with enough contrast.",
    ],
    improvements: [
      "Add workout logging with sets, reps and weight.",
      "Add progress charts over time.",
      "Add user accounts so plans sync across devices.",
    ],
    featured: true,
    year: "2026",
    aspect: "square",
  },
  {
    id: "devstack-builder",
    title: "DevStack Builder",
    eyebrow: "Interactive Developer Utility",
    tagline:
      "Modern developer stack builder for discovering technologies and saving custom stacks.",
    description:
      "An interactive web application enabling developers to explore frontend, backend, database, and dev tool catalogs. Features real-time stack assembly, duplicate-selection prevention, and dynamic toast feedback.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "React-Toastify",
    ],
    githubUrl: "https://github.com/borshon07/B-14-A05--DevStack-",
    liveUrl: "https://devstack-builder.vercel.app/",
    image: "/projects/devstack.png",
    challenges: [
      "Managing the selected-technology state and preventing duplicates while keeping the UI responsive.",
      "Giving clear toast feedback for add, remove and duplicate actions.",
      "Organizing a large catalog of technologies into categories that are easy to browse.",
    ],
    improvements: [
      "Let users save and share their stacks with a link.",
      "Add search and more technology categories.",
      "Suggest compatible technologies based on the current stack.",
    ],
    featured: false,
    year: "2026",
    aspect: "tall",
  },
];
