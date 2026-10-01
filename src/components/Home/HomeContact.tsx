import React from "react";
import Link from "next/link";
import ContactForm from "../Form/ContactForm";
import { Calendar, Mail, ArrowUpRight } from "lucide-react";

export default function HomeContact() {
  const discoveryCallUrl = process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/olaishola";

  return (
    <section id="contact" className="py-16 md:py-24 my-10 max-w-7xl mx-auto px-6 lg:px-8" data-aos="fade-up">
      <div className="flex flex-col items-center justify-center gap-3 mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-cta">Get In Touch</span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight">
          Have a product, engineering problem, or collaboration in mind?
        </h2>
        <p className="text-softText text-base md:text-lg max-w-2xl mt-2">
          Available for freelance projects, contract engineering, product collaborations, and select remote roles.
        </p>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <Link
            href={discoveryCallUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-cta text-ctaText font-bold rounded-2xl shadow-xl shadow-cta/20 hover:scale-105 active:scale-95 transition-all text-sm tracking-wide"
          >
            <Calendar className="w-4 h-4" />
            Book a 15-min discovery call
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href="mailto:olaishola.dev@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-softBg hover:bg-softBg/80 text-[var(--textColor)] font-semibold rounded-2xl border border-softBg/80 hover:scale-105 active:scale-95 transition-all text-sm tracking-wide"
          >
            <Mail className="w-4 h-4 text-cta" />
            olaishola.dev@gmail.com
          </a>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto p-6 md:p-10 rounded-3xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-xl">
        <h3 className="text-xl font-bold text-[var(--textColor)] mb-6 text-center">
          Or Send a Direct Message
        </h3>
        <ContactForm />
      </div>
    </section>
  );
}
