import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      tl.fromTo(
        paragraphRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      tl.fromTo(
        emailRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      tl.fromTo(
        iconsRef.current!.children,
        { scale: 0, opacity: 0, rotation: -180 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );

      tl.fromTo(
        cardRef.current,
        { x: 50, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="max-w-7xl mx-auto px-6 py-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* KIRI - TEXT */}
        <div>
          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-8"
          >
            Let’s build <br />
            something <span className="text-slate-500">great</span> together
          </h2>

          <p
            ref={paragraphRef}
            className="text-slate-600 max-w-lg mb-10 text-lg"
          >
            Have a project idea, freelance work, or just want to say hi?  
            I'm always open to discuss new opportunities and collaborations.
          </p>

          <div ref={emailRef} className="space-y-3 mb-10">
            <p className="text-slate-700">
              <span className="font-semibold">Email</span><br />
              agamvito7@gmail.com
            </p>
            <p className="text-sm text-slate-500">
              Available Monday – Friday, 9 AM – 6 PM (GMT+7)
            </p>
          </div>

          {/* ICONS */}
          <div ref={iconsRef} className="flex gap-5 mb-6">
            <SocialIcon href="https://www.instagram.com/agamm.i/" color="hover:bg-pink-500" title="Instagram">
              <FaInstagram />
            </SocialIcon>

            <SocialIcon href="https://twitter.com/USERNAME" color="hover:bg-sky-500" title="Twitter">
              <FaTwitter />
            </SocialIcon>

            <SocialIcon href="https://www.linkedin.com/in/agam-vito-7b4982205/" color="hover:bg-[#0A66C2]" title="LinkedIn">
              <FaLinkedin />
            </SocialIcon>

            <SocialIcon href="https://github.com/agamm-vitooo" color="hover:bg-black" title="GitHub">
              <FaGithub />
            </SocialIcon>
          </div>
        </div>

        {/* KANAN - CARD */}
        <div className="block">
          <div
            ref={cardRef}
            className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200"
          >
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              Ready to start a project?
            </h3>

            <p className="text-slate-600 mb-8">
              Click the button below or connect with me through social media.  
              I usually reply within 24 hours.
            </p>

            {/* GMAIL BUTTON */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=agamvito7@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-black text-white hover:bg-slate-800 transition shadow-lg"
            >
              <SiGmail className="text-xl" />
              Send me an email
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

/* ICON COMPONENT */
interface SocialIconProps {
  href: string;
  children: React.ReactNode;
  color?: string;
  title?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, children, color = "", title = "" }) => {
  const iconRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    gsap.to(iconRef.current, {
      scale: 1.15,
      rotation: 5,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(iconRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <a
      ref={iconRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        w-14 h-14 flex items-center justify-center rounded-full
        bg-slate-100 text-slate-700 text-2xl
        transition-all duration-300
        hover:text-white hover:-translate-y-1 hover:shadow-lg
        ${color}
      `}
    >
      {children}
    </a>
  );
};

export default ContactSection;
