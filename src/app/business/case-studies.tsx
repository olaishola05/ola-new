import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { caseStudies } from './business-utils'

export default function CaseStudies() {
  return (
    <section id="projects" className="py-20 px-4 md:px-6" style={{ scrollMarginTop: '80px' }}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-[var(--softTextColor)] max-w-3xl mx-auto">
            Real solutions that delivered measurable business impact
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-stagger">
          {caseStudies.map((study, idx) => (
            <Card key={idx} className="border hover:border-[var(--primary)] transition-all hover:shadow-xl bg-[var(--bg)] flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-[var(--primary)] text-white">
                    {study.metric}
                  </Badge>
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <CardTitle className="text-2xl mb-4">{study.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-[var(--primary)] mb-2">PROBLEM</h4>
                  <p className="text-sm text-[var(--softTextColor)]">{study.problem}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[var(--primary)] mb-2">SOLUTION</h4>
                  <p className="text-sm text-[var(--softTextColor)]">{study.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[var(--primary)] mb-2">OUTCOME</h4>
                  <p className="text-sm text-[var(--softTextColor)]">{study.outcome}</p>
                </div>
                <div className="pt-4 border-t border-[var(--border)]">
                  <h4 className="font-semibold text-xs text-[var(--textColor)] mb-3">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.stack.map((tech, techIdx) => (
                      <Badge
                        key={techIdx}
                        variant="outline"
                        className="text-xs border-[var(--primary)]/30"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
