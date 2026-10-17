
import WorkSection from "../sections/work.section";
import ProjectSection from "../sections/projects.section";
import CertificatesSection from "../sections/certificates.section";

import { FaLinkedin } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

const Content = () => {
  return (
    <section
      className="
        mx-auto w-full max-w-6xl min-w-0
        px-4 py-10 text-slate-900
        transition-colors duration-200
        dark:text-slate-100
        sm:px-6 sm:py-14
        md:py-20
        lg:px-8 lg:py-24
      "
    >
      {/* Work Experience */}
      <div className="mb-12 min-w-0 sm:mb-16 lg:mb-20">
        <WorkSection />
      </div>

      {/* Projects & Certificates */}
      <div
        className="
          border-t border-slate-100 pt-8
          transition-colors duration-200
          dark:border-slate-800
          sm:pt-12
          lg:pt-16
        "
      >
        <div
          className="
            relative grid min-w-0
            grid-cols-1 items-start gap-10
            sm:gap-12
            lg:grid-cols-2 lg:gap-12
            xl:gap-20
          "
        >
          {/* Projects */}
          <div className="w-full min-w-0">
            <ProjectSection />
          </div>

          {/* Certificates */}
          <div className="w-full min-w-0">
            <CertificatesSection />
          </div>

          {/* Center Divider: desktop only */}
          <div
            aria-hidden="true"
            className="
              absolute inset-y-0 left-1/2 hidden
              w-px -translate-x-1/2
              bg-slate-100 transition-colors duration-200
              dark:bg-slate-800
              lg:block
            "
          />
        </div>
      </div>

      {/* LinkedIn */}
      <div className="mt-12 flex justify-center sm:mt-16 lg:mt-20">
        <a
          href="https://www.linkedin.com/in/agam-vito-7b4982205/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Learn more about Agam on LinkedIn (opens in a new tab)"
          className="
            group inline-flex max-w-full
            items-center justify-center gap-2
            rounded-full border border-slate-200
            px-4 py-3 text-center
            text-xs font-medium text-slate-700
            transition-all duration-300
            hover:border-slate-900 hover:bg-slate-900
            hover:text-white
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-slate-400 focus-visible:ring-offset-2
            dark:border-slate-700 dark:text-slate-300
            dark:hover:border-white dark:hover:bg-white
            dark:hover:text-slate-900
            dark:focus-visible:ring-offset-slate-950
            sm:gap-2 sm:px-6 sm:text-sm
          "
        >
          <FaLinkedin
            className="shrink-0 text-lg"
            aria-hidden="true"
          />

          <span>Learn more on LinkedIn</span>

          <ArrowUpRight
            aria-hidden="true"
            className="
              h-4 w-4 shrink-0
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
