import { Metadata } from 'next'
import ProfileHeader from '@/components/links/ProfileHeader'
import LinkCard from '@/components/links/LinkCard'
import PageViewTracker from '@/components/links/PageViewTracker'

export const metadata: Metadata = {
  title: 'Oladipupo Ishola — Links',
  description: 'Software engineer, product builder, and educator helping developers and founders build, ship, and monetise with AI.',
  openGraph: {
    title: 'Oladipupo Ishola — Links',
    description: 'Software engineer, product builder, and educator helping developers and founders build, ship, and monetise with AI.',
    type: 'website',
    images: [{ url: 'https://avatars.githubusercontent.com/u/45001916?v=4' }]
  }
}

export default function LinksPage() {
  const links = [
    {
      title: 'My Portfolio',
      description: 'Projects, case studies, and what I have built',
      url: 'https://portfolio-phi-seven-88.vercel.app',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect width={20} height={14} x={2} y={7} rx={2} ry={2} />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      title: 'Build Ship Teach — YouTube',
      description: 'Practical tutorials on AI development, product building, and making money with tech',
      url: 'https://youtube.com/@BuildShipTeach',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx={12} cy={12} r={10} />
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
      )
    },
    {
      title: 'Connect on LinkedIn',
      description: 'Thought leadership, career updates, and professional content',
      url: 'https://linkedin.com/in/oladipupoishola',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      title: 'Learn With Me',
      description: 'Mentorship-led coding education for aspiring developers',
      url: '#coming-soon',
      comingSoon: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      )
    },
    {
      title: 'Brand System Builder',
      description: 'Build your complete brand system in 90 minutes with AI',
      url: '#coming-soon',
      comingSoon: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        </svg>
      )
    },
    {
      title: 'GitHub',
      description: 'Open source work and code repositories',
      url: 'https://github.com/olaishola05',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      )
    },
    {
      title: 'Technical Articles on Medium',
      description: 'Deep dives on web development, AI, and software engineering',
      url: 'https://medium.com/@olaishola',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      )
    },
    {
      title: 'Work With Me',
      description: 'Available for freelance projects and collaborations',
      url: 'mailto:olaishola.dev@gmail.com?subject=Freelance%20Project%20Inquiry%20-%20Oladipupo%20Ishola',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect width={20} height={16} x={2} y={4} rx={2} />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans selection:bg-[#392467] selection:text-white flex items-center justify-center p-4 md:p-10">
      <PageViewTracker />
      <main className="w-full max-w-[1024px] mx-auto bg-[#1a2333]/80 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl">
        
        <div className="w-full md:w-[35%] p-8 md:p-10 flex flex-col md:sticky md:top-0 md:h-auto self-start justify-center">
          <ProfileHeader />
        </div>

        <div className="w-full md:w-[65%] p-6 md:p-10 flex flex-col gap-3 h-full overflow-y-auto max-h-[85vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {links.map((link, index) => (
            <LinkCard key={index} {...link} />
          ))}

          <footer className="pt-6 pb-2 flex flex-col items-center justify-center gap-1 w-full">
            <p className="text-[12px] font-medium text-white/50">
              © 2026 Oladipupo Ishola
            </p>
            <p className="text-[10px] text-white/30">
              Built by me, obviously.
            </p>
          </footer>
        </div>

      </main>

    </div>
  )
}
