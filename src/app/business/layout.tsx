import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const monserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full-Stack Web Developer | SaaS & MVP Development | Oladipupo Ishola",
  description:
    "I help founders and small businesses turn ideas into scalable, production-ready web applications. Expert in React, Next.js, Node.js, Python, and DevOps. From MVP development to full-stack solutions.",
  keywords: [
    "full-stack developer",
    "web developer",
    "SaaS development",
    "MVP development",
    "React developer",
    "Next.js development",
    "Node.js backend",
    "Python developer",
    "freelance developer",
    "startup developer",
    "technical consultant",
    "DevOps engineer",
    "API development",
    "frontend engineer",
    "backend engineer",
  ],
  authors: [{ name: "Oladipupo Ishola" }],
  creator: "Oladipupo Ishola",
  publisher: "Oladipupo Ishola",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Full-Stack Web Developer | Turn Ideas into Production-Ready Apps",
    description:
      "I help founders and small businesses build scalable web applications combining solid backend engineering with intuitive frontends. From MVP to DevOps automation.",
    url: "https://olaishola.tech/business",
    siteName: "Oladipupo Ishola",
    images: [
      {
        url: "https://olaishola.tech/images/portrait-me.jpeg",
        width: 1200,
        height: 630,
        alt: "Full-Stack Web Development Services by Oladipupo Ishola",
      },
    ],
    locale: "en_IE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Stack Web Developer | SaaS & MVP Development",
    description:
      "Turning complex ideas into simple, scalable, and impactful digital products. Expert in React, Next.js, Node.js, Python, and DevOps.",
    creator: "@_olaishola",
    site: "@_olaishola",
    images: ["https://olaishola.tech/images/portrait-me.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://olaishola.tech/business",
  },
};

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return <div className={monserrat.className}>{children}</div>;
}
