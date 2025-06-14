import { Session } from "next-auth";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type Project = {
  [x: string]: any;
  name: string,
  description: string[] | string | undefined,
  stacks: string[],
  githubUrl: string,
  liveUrl: string,
  images: string[],
  coverImgUrl: string,
  tag: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string,
  published: boolean,
  author?: {
    name: string,
    email: string,
    image: string,
  }
}

export type Projects = Project[]

export type LayoutProps = {
  children: React.ReactNode,
}

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode;
  variant: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  width?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export type NavItem = {
  id: number,
  title: string;
  path: string;
  icon?: any;
  link?: string;
}

export type NavItems = NavItem[]

export type SocialLink = {
  id: number,
  title: string;
  path: string;
  icon?: any;
}

export type SocialLinks = SocialLink[]

export type FormValues = {
  name: string;
  number: string;
  email: string;
  subject: string;
  message: string;
}

export type Tabs = {
  label: string;
  value: string;
  element?: React.FC
}

export type TabArray = Tabs[]

export type TabPanelProps = {
  children: React.ReactNode
  index: number
  value: number
}

export type AdminRoutesProps = {
  session: Session
  isActive: (pathname: string) => boolean
  signOut: () => void
}

export type ProjectProps = {
  projects: {
    id: string;
    name: string;
    description: string[] | null;
    githubUrl: string | null;
    liveUrl: string | null;
    coverImgUrl: string | null;
    stacks: string[];
    images: string[];
    tag: string | null;
    authorId: string | null;
  }[]
  handleOpenModal?: (id: string) => void
}

export type currentWork = {
  name: string,
  role: string,
  description: string,
  imageUrl: string,
  link: string,
  date: string,
}

export type About = {
  profileImgUrl: string,
  title: string,
  intro: string,
  focused: string,
  transitionOne?: string,
  transitionTwo?: string,
  hobbies: string,
  currentWorks: currentWork[],
  author?: {
    name: string,
    email: string,
    image: string,
  }
}

type Data = {
  title: string,
  slug: string,
  postImg: string,
  published: boolean,
  date: string,
  categories: string[],
  author: string,
  description: string
  postId: string
}

export interface Posts {
  body: string
  data: Data
}