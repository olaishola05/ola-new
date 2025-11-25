import {
  Rocket,
  Zap,
  Users,
  Layout,
  Globe,
  Terminal,
  CheckCircle2,
  FileText,
  Cloud,
  Code2,
  Database,
  LucideIcon,
} from "lucide-react";

export const clients: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Rocket,
    title: "SaaS Founders",
    desc: "Building subscription-based platforms that need to scale from day one",
  },
  {
    icon: Zap,
    title: "AI Tool Creators",
    desc: "Developing intelligent applications with modern AI integrations",
  },
  {
    icon: Users,
    title: "Productivity Product Teams",
    desc: "Creating tools that help teamwork smarter and faster",
  },
  {
    icon: Layout,
    title: "Dashboard Builders",
    desc: "Building data-driven dashboards and analytics platforms",
  },
  {
    icon: Globe,
    title: "Edtech & Fintech Startups",
    desc: "Launching secure, compliant platforms in regulated industries",
  },
  {
    icon: Terminal,
    title: "Internal Tool Developers",
    desc: "Streamlining operations withcustom business applications",
  },
];

export const solutions: { icon: LucideIcon; text: string }[] = [
  { icon: CheckCircle2, text: "Technical roadmaps that align with business goals" },
  { icon: CheckCircle2, text: "Architecture designed for scale from the start" },
  {
    icon: CheckCircle2,
    text: "Clean, maintainable code with comprehensive documentation",
  },
  { icon: CheckCircle2, text: "Seamless API integrations and reliable backends" },
  { icon: CheckCircle2, text: "DevOps automation for faster, safer deployments" },
  { icon: CheckCircle2, text: "Responsive, intuitive frontends users love" },
];

export const services: { icon: LucideIcon; title: string; desc: string; tags: string[] }[] = [
  {
    icon: Database,
    title: "Backend Engineering",
    desc: "Robust APIs and backend systems built with Node.js, Python, NestJS, and Django. Complete with CI / CD pipelines and Docker containerization.",
    tags: ["Node.js", "Python", "NestJS", "Django", "REST APIs", "GraphQL"],
  },
  {
    icon: Layout,
    title: "Frontend Development",
    desc: "Modern, responsive user interfaces using React, Next.js, and Tailwind CSS that provide exceptional user experiences.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: Code2,
    title: "Full-Stack Web Apps",
    desc: "End-to-end application development for SaaS platforms, dashboards, and MVPs with scalable architecture.",
    tags: ["SaaS", "Dashboards", "MVPs", "Admin Panels"],
  },
  {
    icon: Cloud,
    title: "DevOps & Automation",
    desc: "Streamlined deployment pipelines, CI/CD automation, and infrastructure as code for reliable, scalable systems.",
    tags: ["Docker", "CI/CD", "AWS", "Deployment Automation"],
  },
  {
    icon: Globe,
    title: "API Integration",
    desc: "Seamless third-party API integrations, webhook implementations, and custom API development.",
    tags: ["REST APIs", "Webhooks", "OAuth", "Payment Gateways"],
  },
  {
    icon: FileText,
    title: "Technical Writing",
    desc: "Clear, comprehensive documentation for your codebase, APIs, and internal processes.",
    tags: ["API Docs", "Code Documentation", "Technical Guides"],
  },
];

export const caseStudies = [
  {
    title: "AI-Powered Analytics Dashboard",
    problem:
      "Fintech startup needed real-time analytics dashboard to process millions of transactions with sub-second latency",
    solution:
      "Built scalable microservices architecture with React dashboard, Node.js backend, and Redis caching",
    outcome:
      "Reduced query time by 85%, handled 10M+ daily transactions, and improved user retention by 40%",
    stack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
    metric: "85% faster queries",
  },
  {
    title: "EdTech Learning Platform",
    problem:
      "Education company struggled with slow course delivery and poor mobile experience affecting student engagement",
    solution:
      "Redesigned frontend with Next.js, optimized API endpoints, and implemented progressive web app features",
    outcome:
      "Achieved 95+ Lighthouse score, 3x faster load times, and 60% increase in mobile engagement",
    stack: ["Next.js", "TypeScript", "Tailwind", "PWA", "Vercel"],
    metric: "3x faster performance",
  },
  {
    title: "SaaS Productivity Platform",
    problem:
      "Startup needed MVP built in 6 weeks to secure Series A funding with limited technical resources",
    solution:
      "Delivered full-stack SaaS platform with authentication, payment integration, and admin dashboard",
    outcome: "Launched on time, secured $2M Series A, and onboarded 500+ users in first month",
    stack: ["Next.js", "NestJS", "Stripe", "PostgreSQL", "AWS"],
    metric: "6 weeks to Series A",
  },
];

export const stacks: { category: string; tools: string[] }[] = [
  {
    category: "Frontend",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    category: "Backend",
    tools: ["Node.js", "NestJS", "Python", "Django", "Express.js", "FastAPI"],
  },
  {
    category: "Database",
    tools: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "TypeORM"],
  },
  {
    category: "DevOps",
    tools: [
      "Docker",
      "AWS",
      "CI/CD",
      "GitHub Actions",
      "Vercel",
      "DigitalOcean",
      "Netlify",
      "Render",
    ],
  },
];

export const workflow = [
  {
    step: "01",
    title: "Discovery Call",
    desc: "We discuss your vision, goals, and technical requirements. I'll ask questions to understand your business context and success metrics.",
  },
  {
    step: "02",
    title: "Technical Roadmap",
    desc: "I create a detailed project roadmap with milestones, tech stack recommendations, and timeline estimates aligned with your goals.",
  },
  {
    step: "03",
    title: "Agile Development",
    desc: "I work in sprints with regular check-ins, code reviews, and demos. You'll have full visibility into progress via GitHub and project boards.",
  },
  {
    step: "04",
    title: "Launch & Support",
    desc: "Smooth deployment with comprehensive documentation, testing, and post-launch support to ensure everything runs perfectly.",
  },
];

export const socialProofs: { quote: string; author: string; role: string; rating: number }[] = [
  {
    quote:
      "The technical roadmap alone was worth the investment. We finally had clarity on how to turn our idea into a real product.The execution was flawless.",
    author: "Sarah Chen",
    role: "Founder, TechFlow SaaS",
    rating: 5,
  },
  {
    quote:
      "Best engineering partner we've worked with. Fast, reliable, and always thinking ahead.Our platform scaled effortlessly from 100 to 10,000 users.",
    author: "Marcus Williams",
    role: "CTO, DataHub Analytics",
    rating: 5,
  },
  {
    quote:
      "From messy prototype to production-ready app in 8 weeks. The documentation and code quality made it easy for our team to take over and iterate.",
    author: "Priya Sharma",
    role: "Product Lead, EduConnect",
    rating: 5,
  },
];
