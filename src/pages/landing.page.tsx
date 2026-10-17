
import React from "react";
import Hero from "../sections/hero.section";
import Content from "../views/content";
import ContactSection from "../sections/contact.section";
import { HeroScrollDemo } from "../sections/container.scroll";
import FloatingNavbar from "../components/ui/floating.navbar";
import { useScrollPosition } from "../hooks/useScrollPosition";

const LandingPage: React.FC = () => {
  const showNavbar = useScrollPosition(500);

  return (
    <main className="min-h-screen bg-[#F9FAFB] font-sans text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      <FloatingNavbar visible={showNavbar} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <Content />
        <HeroScrollDemo />
        <ContactSection />
      </div>
    </main>
  );
};

export default LandingPage;
