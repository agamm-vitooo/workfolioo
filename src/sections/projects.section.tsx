import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import SD1 from "../assets/SD1.png";
import ITPLN from "../assets/ITPLN.png";

const projects = [
  {
    id: 1,
    name: "SDN1 Guno",
    image: SD1,
    stack: "React, TypeScript, Supabase",
    description: ".",
    link: "https://sdn1-guno.vercel.app/",
    github: "https://github.com/agamm-vitooo/sdn1-guno",
  },
  {
    id: 2,
    name: "Translate Jawa",
    image: SD1,
    stack: "React, TypeScript, Supabase",
    description: ".",
    link: "https://siboba-esguji.vercel.app/",
    github: "https://github.com/agamm-vitooo/translate-jawa",
  },
  {
    id: 3,
    name: "Sentiment Analysis on the Performance of the Indonesia Election Commission using Ensemble Machine Learning Language Model",
    image: ITPLN,
    stack: "Python, Machine Learning, NLP",
    description: ".",
    link: "https://docs.google.com/document/d/1DcMVUC-zCAcqY_rSO-C74CCr-ro_c33pwljFY0NUFJs/edit?tab=t.xvecl7blvlcz",
  },
];

const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="py-16">
      {/* TITLE */}
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-slate-800 mb-8 text-center lg:text-left"
      >
        Projects
      </motion.h2>

      {/* LIST PROJECT */}
      <div className="space-y-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-6 p-6 rounded-lg border border-slate-200 
                       hover:shadow-md hover:bg-slate-50 transition cursor-pointer"
          >
            {/* Left - Project Logo */}
            <div className="flex-shrink-0">
              <img
                src={project.image}
                alt={project.name}
                className="w-14 h-14 object-contain rounded-md border"
              />
            </div>

            {/* Right - Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800">
                {project.name}
              </h3>

              <p className="text-sm text-slate-500 mt-1">{project.stack}</p>

              <p className="mt-2 text-sm text-slate-600">
                Click to view details →
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL POPUP */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-lg w-full rounded-lg shadow-lg p-6 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 text-xl"
              >
                ✕
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-12 h-12 object-contain rounded-md border"
                />

                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {selectedProject.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {selectedProject.stack}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-700 leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md bg-slate-800 text-white text-sm hover:bg-slate-700 transition"
                  >
                    Open Project →
                  </a>
                )}

                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-md 
                               border border-slate-300 text-slate-700 text-sm 
                               hover:bg-slate-100 transition"
                  >
                    <FaGithub className="text-lg" />
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectSection;
