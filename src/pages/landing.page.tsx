import React from "react";
import Hero from "../sections/hero.section";
import Content from "../views/content";
import ContactSection from "../sections/contact.section";
import MapSection from "../sections/map.section"

const LandingPage: React.FC = () => {
  return (
    <main className="font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <MapSection />
        <Content />
        <ContactSection />
      </div>
    </main>
  );
};

export default LandingPage;

