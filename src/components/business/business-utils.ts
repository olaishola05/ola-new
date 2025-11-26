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
