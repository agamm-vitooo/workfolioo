
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

import MapSection from "./map.section";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
      );

      tl.fromTo(
        paragraphRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4",
      );

      tl.fromTo(
        emailRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        "-=0.3",
      );

      tl.fromTo(
        iconsRef.current?.children || [],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        mx-auto max-w-6xl px-6 py-24
        text-slate-900 transition-colors duration-200
        dark:text-slate-100
      "
    >
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left */}
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Contact
            </p>

            <h2
              ref={headingRef}
              className="text-3xl font-semibold leading-snug text-slate-900 transition-colors duration-200 dark:text-white md:text-4xl"
            >
              Let's build something
              <br />
              meaningful together.
            </h2>

            <p
              ref={paragraphRef}
              className="max-w-sm pt-1 text-base leading-relaxed text-slate-500 dark:text-slate-400"
            >
              Open to freelance, collaborations, or interesting ideas.
              Reach out — I'd love to hear from you.
            </p>
          </div>

          {/* Email */}
          <div ref={emailRef} className="space-y-0.5">
            <a
              href="mailto:agamvito7@gmail.com"
              className="text-sm font-medium text-slate-900 transition-colors hover:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-100 dark:hover:text-white"
            >
              agamvito7@gmail.com
            </a>

            <p className="text-xs text-slate-400 dark:text-slate-500">
              Usually replies within 24 hours
            </p>
          </div>

          {/* Socials */}
          <div ref={iconsRef} className="flex gap-3">
            <SocialIcon
              href="https://instagram.com"
              color="hover:bg-pink-500"
              label="Instagram"
            >
              <FaInstagram />
            </SocialIcon>

            <SocialIcon
              href="https://twitter.com"
              color="hover:bg-sky-500"
              label="Twitter"
            >
              <FaTwitter />
            </SocialIcon>

            <SocialIcon
              href="https://linkedin.com"
              color="hover:bg-[#0A66C2]"
              label="LinkedIn"
            >
              <FaLinkedin />
            </SocialIcon>

            <SocialIcon
              href="https://github.com"
              color="hover:bg-black"
              label="GitHub"
            >
              <FaGithub />
            </SocialIcon>
          </div>
        </div>

        {/* Right */}
        <div className="overflow-hidden rounded-2xl">
          <MapSection />
        </div>
      </div>
    </section>
  );
};

/* ===================== SOCIAL ICON ===================== */

interface SocialIconProps {
  href: string;
  children: React.ReactNode;
  color?: string;
  label: string;
}

const SocialIcon = ({
  href,
  children,
  color = "",
  label,
}: SocialIconProps) => {
  const iconRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    gsap.to(iconRef.current, {
      scale: 1.15,
      rotate: 6,
      duration: 0.25,
      ease: "back.out(1.7)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(iconRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.25,
    });
  };

  return (
    <a
      ref={iconRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        flex h-10 w-10 items-center justify-center
        rounded-full bg-slate-100 text-base text-slate-600
        transition-colors duration-200 hover:text-white
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-slate-400 focus-visible:ring-offset-2
        dark:bg-slate-800 dark:text-slate-300
        dark:focus-visible:ring-offset-slate-950
        ${color}
      `}
    >
      {children}
    </a>
  );
};

export default ContactSection;
