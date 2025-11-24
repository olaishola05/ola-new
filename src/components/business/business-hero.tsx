import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronRight, GitBranch, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function BusinessHero() {
  const meetingLink = process.env.NEXT_PUBLIC_CALENDLY_URL!;
  return (
    <section className="relative overflow-hidden py-20 md:py-32 px-4 md:px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#392467]/5 via-transparent to-[#392467]/10 pointer-events-none" />
      <div className="container bg-inherit mx-auto max-w-7xl relative z-10 pt-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge className="bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 border-[var(--primary)]/20 px-4 py-2 text-sm font-medium">
            Full-Stack Engineer & Technical Partner
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl">
            Turn Your Ideas into{" "}
            <span className="bg-gradient-to-r from-[#392467] to-[#5a3a8f] bg-clip-text text-transparent">
              Scalable, Production-Ready
            </span>{" "}
            Web Applications
          </h1>
          <p className="text-lg md:text-xl text-[var(--softTextColor)] max-w-3xl leading-relaxed">
            I help founders and small businesses build end-to-end web solutions that combine solid
            backend engineering with intuitive, responsive frontends—from MVP development to DevOps
            automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="bg-[var(--cta)] text-[var(--ctaText)] hover:bg-[var(--cta)]/90 text-base px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <Link href={meetingLink} target="_blank" rel="noopener noreferrer">
                Book a Strategy Call
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/5 text-base px-8 py-6 rounded-lg"
              asChild
            >
              <Link href="https://github.com/olaishola05" target="_blank" rel="noopener noreferrer">
                <GitBranch className="mr-2 h-5 w-5" />
                View My GitHub
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
