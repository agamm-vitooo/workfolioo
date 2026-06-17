import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
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
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      tl.fromTo(
        paragraphRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );

      tl.fromTo(
        emailRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
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
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="max-w-6xl mx-auto px-6 py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        {/* LEFT */}
        <div className="space-y-8">

          {/* HEADER */}
          <div className="space-y-3">
            <p className="text-xs font-medium tracking-widest text-slate-400 uppercase">
              Contact
            </p>

            <h2
              ref={headingRef}
              className="text-3xl md:text-4xl font-semibold text-slate-900 leading-snug"
            >
              Let's build something<br />meaningful together.
            </h2>

            <p
              ref={paragraphRef}
              className="text-slate-500 text-base leading-relaxed max-w-sm pt-1"
            >
              Open to freelance, collaborations, or interesting ideas.
              Reach out — I'd love to hear from you.
            </p>
          </div>

          {/* EMAIL */}
          <div ref={emailRef} className="space-y-0.5">
            <a
              href="mailto:agamvito7@gmail.com"
              className="text-slate-900 font-medium text-sm hover:text-slate-500 transition-colors"
            >
              agamvito7@gmail.com
            </a>
            <p className="text-xs text-slate-400">
              Usually replies within 24 hours
            </p>
          </div>

          {/* SOCIALS */}
          <div ref={iconsRef} className="flex gap-3">
            <SocialIcon href="https://instagram.com" color="hover:bg-pink-500">
              <FaInstagram />
            </SocialIcon>

            <SocialIcon href="https://twitter.com" color="hover:bg-sky-500">
              <FaTwitter />
            </SocialIcon>

            <SocialIcon href="https://linkedin.com" color="hover:bg-[#0A66C2]">
              <FaLinkedin />
            </SocialIcon>

            <SocialIcon href="https://github.com" color="hover:bg-black">
              <FaGithub />
            </SocialIcon>
          </div>

        </div>

        {/* RIGHT */}
        <div className="rounded-2xl overflow-hidden">
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
}

const SocialIcon = ({ href, children, color = "" }: SocialIconProps) => {
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        w-10 h-10 flex items-center justify-center rounded-full
        bg-slate-100 text-slate-600 text-base
        hover:text-white transition
        ${color}
      `}
    >
      {children}
    </a>
  );
};

export default ContactSection;