import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import iconPlusLogo from "../assets/PLN-Icon-Plus.png";
import CIMB from "../assets/CIMB.svg";
import ITPLN from "../assets/ITPLN.png";

const experiences = [
  {
    id: 1,
    company: "PLN Icon Plus",
    logo: iconPlusLogo,
    title: "Technical Support Staff",
    type: "Full-time",
    description: `Managed and maintained a technical support ticketing system using PostgreSQL, while adapting to MongoDB to improve data management and system performance.

- Monitored and resolved technical issues submitted by users from UP3, ULP, and manufacturing partners through the ticketing platform.
- Developed and executed SQL queries using DBeaver with a PostgreSQL database to support troubleshooting and root cause analysis.
- Gained a strong understanding of business processes related to the Material Inventory Management System (MIMS) and Gudang Online Application (AGO).`,
    period: "Jan 2025 – Present",
    location: "Jakarta, Indonesia",
  },
  {
    id: 2,
    company: "CIMB Niaga",
    logo: CIMB,
    title: "Testing Management Intern",
    type: "Internship",
    description: `As a QA Intern, I supported the Quality Assurance team in ensuring the functionality and reliability of both mobile and web-based applications through structured and comprehensive testing activities.

- Developed and maintained 30+ daily test scripts using Excel and ALM.
- Executed comprehensive test cycles and logged over 50 defects.
- Produced testing documentation that reduced bug resolution time by 9%.
- Collaborated closely with developers and product owners.`,
    period: "Aug 2023 – Dec 2023",
    location: "Indonesia",
  },
  {
    id: 3,
    company: "Institut Teknologi PLN",
    logo: ITPLN,
    title: "Research Assistant (Data Science)",
    type: "Freelance Project",
    description: `Conducted a sentiment analysis research project using Twitter and online news data.

- Trained models using SVM, Random Forest, Logistic Regression, Naive Bayes, and Decision Tree.
- Achieved up to 83% accuracy using Logistic Regression on news portal data.
- Tools: Python, scikit-learn, pandas, NumPy, Jupyter Notebook, matplotlib.`,
    period: "Apr 2025 – Aug 2025",
    location: "Indonesia",
  },
];

const WorkSection = () => {
  const [selectedExp, setSelectedExp] = useState<any>(null);

  return (
    <section id="work" className="py-16">
      <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center lg:text-left">
        Work Experience
      </h2>

      {/* LIST EXPERIENCE */}
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
            {/* Logo */}
            <img
              src={exp.logo}
              alt={exp.company}
              className="w-14 h-14 object-contain rounded-md border"
            />

            {/* Info */}
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

      {/* MODAL */}
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
              {/* Close */}
              <button
                onClick={() => setSelectedExp(null)}
                className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 text-xl"
              >
                ✕
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedExp.logo}
                  alt={selectedExp.company}
                  className="w-12 h-12 object-contain rounded-md border"
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

              {/* Meta */}
              <p className="text-sm text-slate-400 mb-3">
                {selectedExp.period} · {selectedExp.location}
              </p>

              {/* Description */}
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
