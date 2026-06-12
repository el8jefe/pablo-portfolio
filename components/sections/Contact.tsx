"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SOCIALS = [
  { label: "X / Twitter", handle: "@Pablo_r31", href: "https://x.com/Pablo_r31" },
  { label: "Instagram", handle: "@p.rincon31", href: "https://www.instagram.com/p.rincon31/" },
  { label: "Email", handle: "juanparinconr@gmail.com", href: "mailto:juanparinconr@gmail.com" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".contact-link",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contacts-list",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 md:py-48 px-6 text-center relative overflow-hidden"
      aria-label="Contact section"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="contact-heading font-body text-xs tracking-[0.3em] text-accent uppercase mb-6">
          Contact
        </p>
        <h2 className="contact-heading font-display font-extrabold text-5xl md:text-7xl lg:text-8xl text-text leading-none mb-4">
          Let&apos;s talk.
        </h2>
        <p className="contact-heading font-body text-muted text-xl mb-16 max-w-md mx-auto">
          Building something? Need a developer? Or just want to connect — I'm open.
        </p>

        <div className="contacts-list grid gap-4 max-w-sm mx-auto">
          {SOCIALS.map(({ label, handle, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="contact-link flex items-center justify-between border border-border bg-card/50 px-6 py-4 hover:border-accent group transition-all duration-300"
            >
              <span className="font-body text-xs text-muted uppercase tracking-widest">
                {label}
              </span>
              <span className="font-body text-sm text-text group-hover:text-accent transition-colors">
                {handle} ↗
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-10 border-t border-border">
          <p className="font-body text-xs text-muted">
            Built by Pablo Rincon — 🇨🇴 Colombian. Based in the U.S.
          </p>
        </div>
      </div>
    </section>
  );
}
