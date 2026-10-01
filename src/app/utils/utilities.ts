'use client';

import { About, NavItems, Project, SocialLinks, TabArray } from "@/app/types";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { FaMediumM } from "react-icons/fa";
import { FaHashnode, FaThreads } from "react-icons/fa6";
import axios from "axios";
// import { animateScroll as scroll, scroller } from 'react-scroll';
const readingTime = require("reading-time/lib/reading-time");
export const greetings = ["Hello", "Hola", "Bonjour", "Hallo", "Ciao"];

export const getFormattedDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getFormattedDateFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return getFormattedDate(date);
};

export const getFormattedDateFromISO = (iso: string) => {
  const date = new Date(iso);
  return getFormattedDate(date);
};

export const getFormattedDateFromISOWithTime = (iso: string) => {
  const date = new Date(iso);
  return `${getFormattedDate(date)} ${date.getHours()}:${date.getMinutes()}`;
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
}

export const randomItemFromArray = (arr: any[], n: number) => {
  return arr[Math.floor(Math.random() * n)];
};

export const navItems: NavItems = [
  {
    id: 1,
    title: "home",
    path: "/",
  },
  { id: 3, title: "work", path: "#selected-work" },
  { id: 6, title: "capabilities", path: "#what-i-do" },
  { id: 2, title: "about", path: "#about" },
  { id: 4, title: "writing", path: "/blog" },
  { id: 5, title: "contact", path: "#contact" },
];

const blogNavItems: NavItems = [
  { id: 1, title: "home", path: "/" },
  { id: 4, title: "blog", path: "/blog" },
  { id: 2, title: "about me", path: "/about" },
  { id: 3, title: "contact", path: "#contact" },
];

// navItems.filter((item) => item.title !== "my works");

export function removeMyWorksWhenNotOnHome(pathname: string) {
  return pathname === "/" ? navItems : blogNavItems;
}

export const socialLinks: SocialLinks = [
  {
    id: 1,
    title: "github",
    path: "https://github.com/olaishola05",
    icon: Github,
  },
  {
    id: 2,
    title: "linkedin",
    path: "https://www.linkedin.com/in/olaishola05",
    icon: Linkedin,
  },

  {
    id: 3,
    title: "twitter",
    path: "https://twitter.com/olaishola05",
    icon: Twitter,
  },
  {
    id: 4,
    title: "Medium",
    path: "https://medium.com/@olaishola",
    icon: FaMediumM,
  },

  {
    id: 6,
    title: "Instagram",
    path: "https://www.instagram.com/olaishola05/",
    icon: Instagram,
  },
  // {
  //   id: 7,
  //   title: "Hashnode",
  //   path: "https://olaishola.hashnode.dev/",
  //   icon: FaHashnode,
  // },
  // {
  //   id: 8,
  //   title: "Threads",
  //   path: "https://www.threads.net/@olaishola05",
  //   icon: FaThreads,
  // },
];

export const blogLinks: NavItems = [
  { id: 1, title: "home", path: "/" },
  { id: 4, title: "blog", path: "/blog" },
  { id: 2, title: "about me", path: "/about" },
];

export const tabs: TabArray = [
  {
    label: "All Projects",
    value: "all",
  },
  {
    label: "Frontend",
    value: "frontend",
  },

  {
    label: "Backend",
    value: "backend",
  },

  {
    label: "Fullstack",
    value: "fullstack",
  },
];

export const sendDataToBackend = async (data: Project, url: string) => {
  try {
    const res = await axios.post(`${url}/projects`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error: any) {
    return error?.response?.data?.message;
  }
};

export async function publishProject(id: string, url: string) {
  try {
    const response = await axios.patch(`${url}/projects/publish/${id}`);
    return response.data;
  } catch (error: any) {
    return error?.response?.data?.message;
  }
}

export async function deleteProject(id: string, url: string) {
  try {
    const response = await axios.delete(`${url}/projects/${id}`);
    return response.data;
  } catch (error: any) {
    return error?.response?.data?.message;
  }
}

export async function updateProject(id: string | undefined, data: Project, url: string) {
  if (!id) return "Project ID is required";
  try {
    const response = await axios.patch(`${url}/projects/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    return error?.response?.data?.message;
  }
}

export const projectsFilter = (projects: any[], tag: string) => {
  return projects?.filter((project) => project.tag === tag);
};

export const resumeTabs: TabArray = [
  {
    label: "Education",
    value: "education",
  },
  {
    label: "Experience",
    value: "experience",
  },

  {
    label: "Skills",
    value: "skills",
  },

  {
    label: "Certifications & Trainings",
    value: "certifications",
  },
];

export const updateAboutInfo = async (id: string, data: About) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/about/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    return error?.response?.data?.message;
  }
};

export const readTimeInfo = (content: any) => {
  const stats = readingTime(content);
  return stats.text;
};

export function slugify(str: string) {
  return str?.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export class Storage {
  static setToStorage(key: string, value: any) {
    localStorage && localStorage.setItem(key as string, JSON.stringify(value));
  }

  static getStorageItem(key: string) {
    return (
      localStorage && JSON?.parse(localStorage.getItem(key as string) as string)
    );
  }

  static clearStorage() {
    localStorage && localStorage.clear();
  }

  static removeFromStorage(key: string) {
    localStorage && localStorage.removeItem(key);
  }
}

export interface PasswordTip {
  text: string;
  key: string;
}

export const passwordTips: PasswordTip[] = [
  { text: "At least 8 characters", key: "length" },
  { text: "At least 1 uppercase letter", key: "uppercase" },
  { text: "At least 1 lowercase letter", key: "lowercase" },
  { text: "At least 1 number", key: "number" },
  { text: "At least 1 special character", key: "specialChar" },
];



export const skillCategories = [
  {
    name: "Core Engineering",
    skills: [
      {
        name: "React & Next.js",
        icon: "⚡",
        description: "Server-side rendering, App Router, responsive component systems, and client performance.",
        experience: "Production applications built with Next.js 14, React 18, and modern state patterns."
      },
      {
        name: "TypeScript",
        icon: "🔷",
        description: "Strict end-to-end typing, interface contracts, and scalable codebase architecture.",
        experience: "Used across all modern frontend and backend codebases for type-safe product engineering."
      },
      {
        name: "Node.js & NestJS",
        icon: "🟢",
        description: "Modular enterprise architecture, dependency injection, and clean controller/service layers.",
        experience: "Designed production APIs with NestJS, Express, and modern Node ecosystems."
      },
      {
        name: "PostgreSQL & MongoDB",
        icon: "🐘",
        description: "Relational database schema modeling, indexing, Prisma ORM, and document databases.",
        experience: "Modeled complex relational tables, transactions, and performant query pipelines."
      },
      {
        name: "Tailwind CSS",
        icon: "🎨",
        description: "Utility-first design systems, responsive layouts, and clean UI engineering.",
        experience: "Implemented responsive web designs and coherent theme designs."
      }
    ]
  },
  {
    name: "Backend & Systems",
    skills: [
      {
        name: "REST APIs & Architecture",
        icon: "🌐",
        description: "RESTful architecture, API documentation with Swagger/OpenAPI, and contract design.",
        experience: "Built and documented 20+ production endpoints with validation and error handling."
      },
      {
        name: "Authentication & Security",
        icon: "🔐",
        description: "JWT, Passport.js, OAuth flows, bcrypt hashing, and role-based access control.",
        experience: "Engineered secure user authentication and session management workflows."
      },
      {
        name: "Docker & CI/CD",
        icon: "🐳",
        description: "Containerization, automated build workflows, GitHub Actions, and deployment pipelines.",
        experience: "Configured automated CI/CD workflows and containerized services for reliable shipping."
      },
      {
        name: "Python (Django & FastAPI)",
        icon: "🐍",
        description: "Production backend APIs and web applications using Django REST Framework and FastAPI. Clean architecture, async endpoints, and ORM-based data modeling.",
        experience: "Built and shipped production backend systems with Django and FastAPI for client and personal projects."
      },
      {
        name: "Prisma ORM",
        icon: "🔗",
        description: "Type-safe database client, schema migrations, and relation queries.",
        experience: "Used extensively for data layer modeling and queries across full-stack applications."
      }
    ]
  },
  {
    name: "AI & Data",
    skills: [
      {
        name: "Python",
        icon: "🐍",
        description: "Data processing, scripting, and foundational algorithmic problem solving applied to AI/ML workflows.",
        experience: "Applied across data transformations, algorithm development, and MSc research workflows."
      },
      {
        name: "AI Systems & Tooling",
        icon: "🤖",
        description: "LLM integration, AI-assisted engineering workflows, prompt systems, and agent tooling.",
        experience: "Built AI-assisted product features including resume builders and developer tools."
      },
      {
        name: "Machine Learning Foundations",
        icon: "📊",
        description: "Supervised and unsupervised learning concepts, model evaluation, and feature pipelines.",
        experience: "Applied in predictive problem solving and postgraduate research workflows."
      }
    ]
  },
  {
    name: "Currently Studying (MSc at Sussex)",
    skills: [
      {
        name: "Adaptive Systems",
        icon: "🧬",
        description: "Biological and computational adaptive models, complex systems, and behavior dynamics.",
        experience: "Active core module in the MSc Artificial Intelligence & Adaptive Systems at University of Sussex."
      },
      {
        name: "Machine Learning (Advanced)",
        icon: "🧠",
        description: "Statistical machine learning, deep representations, and optimization algorithms.",
        experience: "Current postgraduate coursework focusing on machine learning foundations."
      },
      {
        name: "Algorithms & Mathematics",
        icon: "📐",
        description: "Computational mathematics, algorithm design, complexity analysis, and mathematical modeling.",
        experience: "Current core postgraduate module at University of Sussex."
      }
    ]
  }
];

export const extractPublicId = (url: string | null | undefined): string => {
  if (!url) return "";
  const parts = url.split("/upload/");
  if (parts.length < 2) return "";

  const pathAfterUpload = parts[1].replace(/^v\d+\//, "");

  const publicIdWithExt = pathAfterUpload.split("?")[0];
  const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");

  return publicId;
};

export function textToParagraphArray(inputText: string): string[] {
  if (!inputText) return [];
  return inputText
    .split(/\n\s*\n/)
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0);
}