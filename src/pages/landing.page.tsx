import React from "react";
import Hero from "../sections/hero.section";
import Content from "../views/content";
import ContactSection from "../sections/contact.section";
import { HeroScrollDemo } from "../sections/container.scroll";
// import { TerminalDemo } from "../components/ui/terminal.demo";

import FloatingNavbar from "../components/ui/floating.navbar";
import { useScrollPosition } from "../hooks/useScrollPosition";

const LandingPage: React.FC = () => {
  const showNavbar = useScrollPosition(500);
  return (
    <main className="font-sans">
      <FloatingNavbar visible={showNavbar} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        {/* <TerminalDemo /> */}
        <Content />
        <HeroScrollDemo />
        <ContactSection />
      </div>
    </main>
  );
};

export default LandingPage;

