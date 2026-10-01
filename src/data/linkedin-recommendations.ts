/**
 * LinkedIn Recommendations
 *
 * Add new LinkedIn recommendations here — no component changes needed.
 * Each entry maps to either "peer" (colleague/client/reference/opensource)
 * or "mentee" relationship type, which controls which section it appears in.
 */

export type RecommendationCategory = 'peer' | 'mentee';

export interface LinkedInRecommendation {
  /** Display name */
  name: string;
  /** Job title and company */
  title: string;
  /** Human-readable relationship context shown on card */
  relationship: string;
  /** Controls which section the card appears in */
  category: RecommendationCategory;
  /** Month + Year of the LinkedIn recommendation */
  date: string;
  /** Direct link to their LinkedIn profile for verification */
  linkedIn: string;
  /** Two-letter initials for the avatar fallback */
  avatar: string;
  /** Full recommendation text */
  quote: string;
  /**
   * Optional — provide a shorter excerpt to highlight as the
   * pull-quote on a "featured" card. Leave undefined for compact cards.
   */
  excerpt?: string;
  /** Set true for the primary featured card (only one per section) */
  featured?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// PEER RECOMMENDATIONS  (colleagues, clients, open-source, professional refs)
// ─────────────────────────────────────────────────────────────────────────────

export const PEER_RECOMMENDATIONS: LinkedInRecommendation[] = [
  {
    name: "Bright Atsighi",
    title: "Software Engineer · Founder & CEO, Nexus Infrastructure Ltd.",
    relationship: "Worked on the same team · Ohiole Lagos",
    category: "peer",
    date: "June 2026",
    linkedIn: "https://www.linkedin.com/in/brytebee",
    avatar: "BA",
    featured: true,
    excerpt:
      "What stands out about Ola is that he operates at a level most engineers simply do not reach. He does not just write code — he thinks in systems. On Ohiole Lagos, we collaborated across every layer of the project: system design, ERD, code architecture, and styling guidelines. At every stage, Ola brought clarity, structure, and a builder's instinct that kept the project moving without ever cutting corners.",
    quote:
      "I have worked alongside Oladipupo for over five years, from our training days at Microverse to co-building and launching Ohiole Lagos — a production-grade e-commerce product we designed and shipped together end-to-end. His technical depth is real. He can hold his own on backend performance, database design, and frontend structure simultaneously — and he communicates it in a way that makes collaboration easy. He is direct, accountable, and solutions-first when problems arise. If you are looking for someone who can take a product from idea to launch and be a true partner in the process, Ola is that person.",
  },
  {
    name: "Eyitemi Onorume",
    title: "Product Designer · UX/UI Specialist",
    relationship: "Worked on the same team",
    category: "peer",
    date: "June 2026",
    linkedIn: "https://www.linkedin.com/in/eyitemi-onorume-849a50211/",
    avatar: "EO",
    quote:
      "I'm pleased to recommend Mr. Ishola. I worked with him on two different projects and found him to be extremely dedicated and a strong team player. He approaches his work with passion, consistency and maintains a positive attitude even under tight deadlines. I'm confident he will add great value and contribute meaningfully to any future project given to him or any team he joins.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MENTEE RECOMMENDATIONS  (students, mentees, people Ola coached/guided)
// ─────────────────────────────────────────────────────────────────────────────

export const MENTEE_RECOMMENDATIONS: LinkedInRecommendation[] = [
  // Add mentee recommendations here as they come in, e.g.:
  //
  // {
  //   name: "First Last",
  //   title: "Junior Developer · Company Name",
  //   relationship: "Mentored by Oladipupo",
  //   category: "mentee",
  //   date: "Month Year",
  //   linkedIn: "https://www.linkedin.com/in/their-handle/",
  //   avatar: "FL",
  //   quote: "Paste their recommendation text here.",
  // },
];
