import {
  blogLinks,
  deleteProject,
  formatDate,
  projectsFilter,
  publishProject,
  randomItemFromArray,
  readTimeInfo,
  resumeTabs,
  sendDataToBackend,
  socialLinks,
  tabs,
  updateAboutInfo,
  updateProject
} from "./utilities";
import { contactSchema, TestimonialSchema, RELATIONSHIP_OPTIONS } from "./validations";
export type { RelationshipValue } from "./validations";
import { educationItems, workExpItems } from "./data";

export { greetings } from "./utilities";
export { languages } from "@/lib/mdx-constants";
export { registerSchema, loginSchema } from "./auth.validation"
export {
  socialLinks,
  randomItemFromArray,
  contactSchema,
  tabs,
  sendDataToBackend,
  publishProject,
  deleteProject,
  updateProject,
  projectsFilter,
  resumeTabs,
  updateAboutInfo,
  educationItems,
  workExpItems,
  readTimeInfo,
  TestimonialSchema,
  RELATIONSHIP_OPTIONS,
  blogLinks,
  formatDate
};

export { tags } from './categories';
export type { Tag } from './categories';
export { removeMyWorksWhenNotOnHome, skillCategories, extractPublicId, textToParagraphArray } from './utilities'


