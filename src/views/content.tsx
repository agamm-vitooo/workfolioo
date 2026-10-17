
import WorkSection from "../sections/work.section";
import ProjectSection from "../sections/projects.section";
import CertificatesSection from "../sections/certificates.section";

import { FaLinkedin } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

const Content = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 text-slate-900 transition-colors duration-200 dark:text-slate-100 sm:px-6 sm:py-20 lg:py-28">
      {/* Work Experience */}
      <div className="mb-14 sm:mb-20">
        <WorkSection />
      </div>

      {/* Projects & Certificates */}
      <div className="border-t border-slate-100 pt-10 transition-colors duration-200 dark:border-slate-800 sm:pt-16">
        <div className="relative grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
          <ProjectSection />
          <CertificatesSection />

          {/* Center Divider */}
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-slate-100 transition-colors duration-200 dark:bg-slate-800 lg:block" />
        </div>
      </div>

      {/* LinkedIn */}
      <div className="mt-14 flex justify-center sm:mt-20">
        <a
          href="https://www.linkedin.com/in/agam-vito-7b4982205/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group flex items-center gap-2 rounded-full
            border border-slate-200 px-5 py-3
            text-sm font-medium text-slate-700
            transition-all duration-300
            hover:border-slate-900 hover:bg-slate-900
            hover:text-white
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-slate-400 focus-visible:ring-offset-2
            dark:border-slate-700 dark:text-slate-300
            dark:hover:border-white dark:hover:bg-white
            dark:hover:text-slate-900
            dark:focus-visible:ring-offset-slate-950
            sm:px-6
          "
        >
          <FaLinkedin className="text-lg" aria-hidden="true" />

          <span>Learn more on LinkedIn</span>

          <ArrowUpRight
            aria-hidden="true"
            className="
              h-4 w-4 transition-transform duration-300
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
