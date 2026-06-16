import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { WorkExperience } from "../types/workExperience";
import { getWorkExperiences } from "../services";

const WorkSection = () => {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedExp, setSelectedExp] = useState<WorkExperience | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getWorkExperiences();
        if (mounted) setExperiences(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="work" className="py-16">
      <h2 className="mb-8 text-2xl font-bold text-slate-800 text-center lg:text-left">
        Work Experience
      </h2>

      {loading ? (
        <p className="text-slate-500">Loading work experiences...</p>
      ) : experiences.length === 0 ? (
        <p className="text-slate-500">Belum ada work experience 🚀</p>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              onClick={() => setSelectedExp(exp)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 p-6 rounded-lg border border-slate-200 hover:shadow-md hover:bg-slate-50 transition cursor-pointer"
            >
              <img
                src={exp.logo}
                alt={exp.company}
                className="w-14 h-14 object-contain rounded-md"
              />

              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {exp.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {exp.company} · {exp.type}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedExp && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={() => setSelectedExp(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white max-w-lg w-full rounded-lg shadow-lg p-6 relative"
            >
              <button
                onClick={() => setSelectedExp(null)}
                className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 text-xl"
              >
                ✕
              </button>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedExp.logo}
                  alt={selectedExp.company}
                  className="w-12 h-12 object-contain rounded-md"
                />

                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {selectedExp.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {selectedExp.company} · {selectedExp.type}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-3">
                {selectedExp.period} · {selectedExp.location}
              </p>

              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {selectedExp.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkSection;


