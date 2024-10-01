import {
  navItems,
  socialLinks,
  randomItemFromArray,
  tabs,
  sendDataToBackend,
  publishProject,
  deleteProject,
  updateProject,
  projectsFilter,
  resumeTabs,
  updateAboutInfo,
  readTimeInfo,
  blogLinks,
} from "./utilities";
import { contactSchema, TestimonialSchema } from "./validations";
import { educationItems, workExpItems } from "./data";
// import tags from "./categories";

export { greetings } from "./utilities";
export { registerSchema, loginSchema } from "./auth.validation"
export {
  navItems,
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
  blogLinks,
};
export { savePostToFile } from './savePostToFile';
export { tags } from './categories';
export type { Tag } from './categories';

