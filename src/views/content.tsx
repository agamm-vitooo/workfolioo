import WorkSection from "../sections/work.section";
import ProjectSection from "../sections/projects.section";
import { FaLinkedin } from "react-icons/fa";

const Content = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* KIRI - WORK */}
        <div>
          <WorkSection />
        </div>

        {/* KANAN - PROJECT */}
        <div>
          <ProjectSection />
        </div>

      </div>

      {/* BAWAH TENGAH - LEARN MORE */}
      <div className="flex justify-center">
        <a
          href="https://www.linkedin.com/in/agam-vito-7b4982205/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 border border-gray-800 rounded-full text-gray-800 font-medium hover:bg-gray-800 hover:text-white transition duration-300"
        >
          <FaLinkedin className="text-xl" />
          <span>Learn more on LinkedIn</span>
        </a>
      </div>
    </section>
  );
};

export default Content;
