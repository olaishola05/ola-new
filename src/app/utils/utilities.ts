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
  { id: 2, title: "about", path: "/about" },
  { id: 5, title: "contact", path: "/contact" },
];

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
  { id: 2, title: "about", path: "/about" },
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