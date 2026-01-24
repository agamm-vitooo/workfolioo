import React from "react";
import Hero from "../sections/hero.section";
import Content from "../views/content";
import ContactSection from "../sections/contact.section";

const LandingPage: React.FC = () => {
  return (
    <main className="font-sans">
      {/* Container utama */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <Content />
        <ContactSection />
      </div>
    </main>
  );
};

export default LandingPage;
