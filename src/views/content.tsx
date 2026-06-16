import WorkSection from "../sections/work.section";
import ProjectSection from "../sections/projects.section";
import CertificatesSection from "../sections/certificates.section";

import { FaLinkedin } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

const Content = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:py-28">

      {/* WORK EXPERIENCE */}
      <div className="mb-14 sm:mb-20">
        <WorkSection />
      </div>

      {/* PROJECTS & CERTIFICATES */}
      <div className="border-t border-slate-100 pt-10 sm:pt-16">
        <div className="relative grid items-start gap-10 lg:grid-cols-2 lg:gap-20">

          <ProjectSection />
          <CertificatesSection />

          {/* Divider di tengah, posisinya absolute jadi tidak mengurangi lebar kolom manapun */}
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-slate-100 lg:block" />

        </div>
      </div>

      {/* LINKEDIN */}
      <div className="mt-14 flex justify-center sm:mt-20">
        <a
          href="https://www.linkedin.com/in/agam-vito-7b4982205/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group flex items-center gap-2
            rounded-full border border-slate-200
            px-5 py-3 sm:px-6
            text-sm font-medium text-slate-700
            transition-all duration-300
            hover:border-slate-900
            hover:bg-slate-900
            hover:text-white
          "
        >
          <FaLinkedin className="text-lg" />

          <span>Learn more on LinkedIn</span>

          <ArrowUpRight
            className="
              h-4 w-4
              transition-transform duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </a>
      </div>
    </section>
  );
};

export default Content;