"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

const socialProofs = [
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

export default function SocialProofs() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section id="testimonials" className="py-20 px-4 md:px-6 bg-[var(--softBg)]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What Clients Say</h2>
            <p className="text-base md:text-lg text-[var(--softTextColor)] max-w-3xl mx-auto">
              Trusted by founders who value quality and execution
            </p>
          </div>
          <div className="max-w-5xl mx-auto px-4 min-h-[300px] flex items-center justify-center">
            <p className="text-gray-500">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      className="py-20 px-4 md:px-6 bg-[var(--softBg)]"
      style={{
        scrollMarginTop: "80px",
      }}
    >
      <div className="container mx-auto max-w-7xl rounded-sm pt-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What Clients Say</h2>
          <p className="text-base md:text-lg text-[var(--softTextColor)] max-w-3xl mx-auto">
            Trusted by founders who value quality and execution
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-4">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
            suppressHydrationWarning
          >
            <CarouselContent className="-ml-4">
              {socialProofs.map((testimonial, idx) => (
                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card className="bg-[var(--bg)] border-2 hover:border-[var(--primary)] hover:shadow-lg transition-all h-full">
                    <CardHeader>
                      <div className="flex space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, starIdx) => (
                          <Star key={starIdx} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <CardDescription className="text-base text-[var(--textColor)] leading-relaxed italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-t border-[var(--border)] pt-4">
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-[var(--softTextColor)]">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10" />
            <CarouselNext className="hidden md:flex border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
