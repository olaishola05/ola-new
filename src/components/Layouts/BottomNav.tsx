// "use client";

import React from "react";
import { ContactForm, Copyright, Icons } from "@/components";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Quotes from "../Quotes/Quotes";
// import { Testimonials } from "../testimonial/Testimonials";
import { PhoneCallIcon } from "lucide-react";
import { MailIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const BottomNav = () => {
  const pathname = usePathname();
  const excludePaths = ["/admin", "/contact", "/testimonial", "/blog"];
  const isStartsWith = excludePaths.some((path) => pathname.startsWith(path));
  return (
    <React.Fragment>
      {/*{pathname.startsWith('/blog') && (<BlogFooter />)}*/}
      <main data-aos="fade-up" className="w-full h-full">
        {isStartsWith ? (
          ""
        ) : (
          <>
            <Quotes />
          </>
        )}
        {/*{pathname === "/" && <Testimonials />}*/}
        {isStartsWith ? (
          ""
        ) : (
          <>
            <div
              data-aos="fade-up"
              className="w-full h-full my-5 md:w-[85%] md:flex md:flex-col md:items-center md:mx-auto md:my-20 lg:mx-0 lg:w-full"
            >
              <div className="flex flex-col items-center justify-center gap-3 mb-12 text-center px-4">
                <span className="text-xs font-bold uppercase tracking-widest text-cta mb-1">Get In Touch</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--textColor)] tracking-tight">
                  Let&apos;s Work Together
                </h2>
                <p className="text-base md:text-lg text-softText leading-relaxed mt-2 max-w-xl">
                  Have a project in mind, need to outsource your engineering team, or just want to say hello? Shoot me a message below.
                </p>
              </div>

              <div
                id="contact"
                className="w-full max-w-6xl mx-auto flex flex-col-reverse lg:flex-row-reverse p-4 md:p-8 gap-8 justify-between mt-5 shadow-2xl rounded-[2.5rem] bg-[var(--contactBg)] border border-softBg/50 relative overflow-hidden"
              >
                <div className="w-full lg:w-3/5 lg:pl-6 pb-4 md:pb-0 z-10 flex flex-col justify-center">
                  <ContactForm />
                </div>

                <div className="w-full lg:w-2/5 flex flex-col gap-6 p-8 md:p-10 bg-[var(--textColor)] text-[var(--bg)] rounded-3xl relative overflow-hidden shadow-inner">
                  {/* Decorative faint pattern */}
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cta opacity-20 blur-3xl rounded-full pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col h-full gap-8 justify-between">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact Info</h3>
                      <p className="text-base text-[var(--bg)]/80 leading-relaxed font-medium">
                        I am available for collaboration & work. Connect with me on social media or
                        shoot me an email and I will get back to you securely within 24 hours.
                      </p>
                    </div>

                    <div className="flex flex-col gap-6 w-full pt-4">
                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-[#8257e5]/10 flex items-center justify-center text-[#8257e5] shadow-sm group-hover:scale-110 transition-transform">
                          <PhoneCallIcon size={20} />
                        </div>
                        <span className="text-lg font-semibold tracking-wide">(+234) 8110837448</span>
                      </div>

                      <Link
                        href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#8257e5]/10 flex items-center justify-center text-[#8257e5] shadow-sm group-hover:scale-110 transition-transform">
                          <MailIcon size={20} />
                        </div>
                        <span className="text-lg font-semibold tracking-wide hover:underline underline-offset-4 decoration-cta">Email Me</span>
                      </Link>

                      <Link
                        href={`https://wa.me/8110837448`}
                        className="flex items-center gap-4 group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shadow-sm group-hover:scale-110 transition-transform">
                          <FaWhatsapp className="w-6 h-6" />
                        </div>
                        <span className="text-lg font-semibold tracking-wide hover:underline underline-offset-4 decoration-[#25D366]">WhatsApp</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-4">
              <Copyright />
            </div>
          </>
        )}
      </main>
    </React.Fragment>
  );
};

export default BottomNav;
