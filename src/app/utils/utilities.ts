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
  { id: 3, title: "my works", path: "#my-works" },
  { id: 4, title: "blog", path: "/blog" },
  { id: 2, title: "about me", path: "/about" },
  { id: 5, title: "contact", path: "/contact" },
];

export function removeMyWorksWhenNotOnHome(pathname: string) {
  return pathname === "/" ? navItems : navItems.filter((item) => item.title !== "my works");
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
  {
    id: 7,
    title: "Hashnode",
    path: "https://olaishola.hashnode.dev/",
    icon: FaHashnode,
  },
  {
    id: 8,
    title: "Threads",
    path: "https://www.threads.net/@olaishola05",
    icon: FaThreads,
  },
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

export async function updateProject(id: string, data: Project, url: string) {
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

export const slugify = (str: string) =>
  str?.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

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

export const languages =
{
  js: 'js',
  jsx: 'jsx',
  css: 'css',
  txt: 'text',
  tsx: 'tsx',
  ts: 'ts',
  python: 'Python',
  html: 'html',
  yaml: 'yaml',
  nginx: 'nginx',
  json: 'json',
  dockerFile: 'docker',
  go: 'go',
  ruby: 'ruby',
  md: 'markdown',
  shell: 'shell',
}

export const codeMap = new Map<string, string>();
for (const [key, value] of Object.entries(languages)) {
  codeMap.set(key, value);
}

export const skillCategories = [
  {
    name: "Frontend",
    skills: [
      {
        name: "React",
        icon: "📱",
        description: "Component-based JavaScript library for building user interfaces, especially single-page applications.",
        experience: "4+ years of experience building complex React applications with Redux, React Query, and various UI libraries."
      },
      {
        name: "Next.js",
        icon: "⚡",
        description: "React framework that enables server-side rendering, static site generation, and other performance optimizations.",
        experience: "3+ years building production-grade applications with Next.js, utilizing both SSR and SSG approaches."
      },
      {
        name: "TypeScript",
        icon: "🔷",
        description: "Strongly typed programming language that builds on JavaScript, adding static type definitions.",
        experience: "Implemented TypeScript in multiple projects, creating robust type definitions and interfaces."
      },
      {
        name: "Tailwind CSS",
        icon: "🎨",
        description: "Utility-first CSS framework for rapidly building custom user interfaces.",
        experience: "Expert in creating responsive, custom designs using Tailwind's utility classes and configuration."
      },
      {
        name: "JavaScript",
        icon: "📜",
        description: "High-level, interpreted programming language that conforms to the ECMAScript specification.",
        experience: "5+ years of writing clean, maintainable JavaScript code using modern ES6+ features."
      }, {
        name: "Material UI",
        icon: "📦",
        description: "React UI framework that implements Google's Material Design.",
        experience: "Built responsive, accessible components using Material UI, ensuring a consistent design language."
      },

      {
        name: "React Email",
        icon: "📧",
        description: "Library for building responsive HTML emails using React components.",
        experience: "Created dynamic, responsive email templates using React Email, ensuring compatibility across email clients."
      },

      {
        name: "Next-Auth",
        icon: "🔐",
        description: "Authentication library for Next.js applications, providing easy integration with various providers.",
        experience: "Implemented secure authentication flows using Next-Auth, integrating with OAuth providers and custom databases."
      },
      {
        name: "React Query",
        icon: "🔄",
        description: "Data-fetching library for React applications, simplifying server state management.",
        experience: "Utilized React Query for efficient data fetching, caching, and synchronization in applications."
      },
      {
        name: "Redux",
        icon: "📦",
        description: "State management library for JavaScript applications, providing a predictable state container.",
        experience: "Managed global application state using Redux, ensuring predictable state transitions and side effects."
      },

      {
        name: "React Hook Form",
        icon: "📋",
        description: "Library for managing form state and validation in React applications.",
        experience: "Implemented complex forms with validation and error handling using React Hook Form."
      },
      {
        name: "Formik",
        icon: "📋",
        description: "Library for building forms in React, providing state management and validation.",
        experience: "Built and managed forms with complex validation logic using Formik."
      },
      {
        name: "Zod",
        icon: "🎞️",
        description: "TypeScript-first schema declaration and validation library.",
        experience: "Used Zod for runtime validation of data structures, ensuring type safety and correctness."
      },
      {
        name: "Yup",
        icon: "🎞️",
        description: "JavaScript schema builder for value parsing and validation.",
        experience: "Implemented Yup for form validation, ensuring data integrity and user feedback."
      },
      {
        name: "React Testing Library",
        icon: "🧪",
        description: "Testing utility for React that encourages good testing practices.",
        experience: "Wrote unit and integration tests for React components using React Testing Library."
      },
      {
        name: "Jest",
        icon: "🧪",
        description: "JavaScript testing framework with a focus on simplicity.",
        experience: "Implemented unit tests and snapshot testing using Jest."
      }
    ]
  },
  {
    name: "Backend",
    skills: [
      {
        name: "Node.js",
        icon: "🟢",
        description: "JavaScript runtime built on Chrome's V8 JavaScript engine for building scalable network applications.",
        experience: "Built and deployed numerous REST APIs and microservices using Express and NestJS frameworks."
      },
      {
        name: "NestJS",
        icon: "🐦",
        description: "Progressive Node.js framework for building efficient, reliable, and scalable server-side applications.",
        experience: "Developed modular and maintainable applications using NestJS with TypeScript."
      },
      {
        name: "Go",
        icon: "🐹",
        description: "Statically typed, compiled programming language designed for simplicity and efficiency.",
        experience: "Built microservices and APIs using Go, focusing on performance and concurrency."
      },
      {
        name: "Python",
        icon: "🐍",
        description: "High-level, interpreted programming language known for its readability and versatility.",
        experience: "Developed backend services and scripts using Python, leveraging frameworks like Flask and FastAPI."
      },
      {
        name: "Express",
        icon: "🚂",
        description: "Fast, unopinionated, minimalist web framework for Node.js.",
        experience: "Created production-ready APIs with middleware, authentication, and database integration."
      },
      {
        name: "MongoDB",
        icon: "🍃",
        description: "Cross-platform document-oriented NoSQL database program using JSON-like documents.",
        experience: "Designed schemas, indexes, and aggregation pipelines for optimal performance."
      },
      {
        name: "PostgreSQL",
        icon: "🐘",
        description: "Powerful, open source object-relational database system with SQL compliance.",
        experience: "Implemented complex data models with relationships, constraints, and optimized queries."
      },
      // {
      //   name: "GraphQL",
      //   icon: "⚛️",
      //   description: "Query language for APIs and a runtime for executing those queries with your existing data.",
      //   experience: "Developed GraphQL APIs with Apollo Server, handling resolvers, mutations, and subscriptions."
      // },
    ]
  },
  {
    name: "ORMs",
    skills: [
      {
        name: "Prisma",
        icon: "🔗",
        description: "Next-generation ORM for Node.js and TypeScript that simplifies database access.",
        experience: "Designed and implemented complex data models with Prisma, ensuring type safety."
      },
      {
        name: "Sequelize",
        icon: "🔗",
        description: "Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.",
        experience: "Built and maintained applications using Sequelize for relational database management."
      },
      {
        name: "Mongoose",
        icon: '🐍',
        description: "MongoDB object modeling tool designed to work in an asynchronous environment.",
        experience: "Created schemas and models for MongoDB collections using Mongoose, implementing validation and middleware."
      },
      {
        name: "Gorm",
        icon: "🐹",
        description: "ORM for Go, providing a simple and powerful way to interact with databases.",
        experience: "Developed applications using Gorm for database interactions, leveraging its features for migrations and associations."
      }
    ]
  },
  {
    name: "DevOps",
    skills: [
      {
        name: "Docker",
        icon: "🐳",
        description: "Platform for developing, shipping, and running applications in containers.",
        experience: "Containerized applications and created multi-stage build pipelines for optimized images."
      },
      // {
      //   name: "AWS",
      //   icon: "☁️",
      //   description: "Comprehensive, evolving cloud computing platform provided by Amazon.",
      //   experience: "Deployed and managed applications using EC2, S3, Lambda, and other AWS services."
      // },
      {
        name: "Git",
        icon: "🔄",
        description: "Distributed version control system for tracking changes in source code during software development.",
        experience: "Expert in Git workflows, branching strategies, and collaborative development."
      },
      {
        name: "CI/CD",
        icon: "🔄",
        description: "Practices of continuous integration and continuous delivery/deployment.",
        experience: "Set up automated testing and deployment pipelines using GitHub Actions and Jenkins."
      },
      // {
      //   name: "Kubernetes",
      //   icon: "⚙️",
      //   description: "Open-source container orchestration system for automating application deployment and scaling.",
      //   experience: "Deployed applications to K8s clusters, configuring services, deployments, and ingress."
      // },
    ]
  },
];

export const extractPublicId = (url: string | undefined): string => {
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