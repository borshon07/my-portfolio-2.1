export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: "github" | "linkedin" | "mail" | "external";
  isPlaceholder?: boolean;
}


export interface SkillCategory {
  category:
    | "Languages"
    | "Frontend"
    | "Frameworks"
    | "Tools"
    | "Frontend Development"
    | "Backend Development"
    | "Database & API Engineering"
    | "Software Engineering"
    | "Tools & Workflow";
  description: string;
  skills: {
    name: string;
    level?: "Active" | "Learning";
  }[];
}


export interface Project {
  id: string;
  title: string;
  eyebrow?: string;
  tagline: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  year: string;
  aspect?: "wide" | "square" | "tall";
  image?: string;
  challenges: string[];
  improvements: string[];
  
}

export interface PersonalInfo {
  name: string;
  title: string;
  eyebrow: string;
  headline: string;
  supportingText: string;
  bioParagraphs: string[];
  email: string;
  location: string;
  isAvailableForWork: boolean;
  resumeUrl?: string;
  phone?: string;
  whatsapp?: string;
}
