import { motion } from "framer-motion";
import heroImage from "../assets/agam.webp";

const Hero = () => {
  return (
    <section className="min-h-[60vh] flex items-center py-20">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Container utama */}
        <div className="flex flex-col items-center text-center gap-8">
          
          {/* IMAGE */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.34, 1.56, 0.64, 1] // Custom bounce
            }}
          >
            <img
              src={heroImage}
              alt="Agam"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full 
                         object-cover border-2 border-slate-200 
                         shadow-lg hover:shadow-xl transition-shadow"
            />
          </motion.div>

          {/* TEXT CONTENT */}
          <div className="space-y-4 max-w-2xl">
            
            {/* Badge/Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <span className="px-4 py-1.5 text-xs font-medium 
                               bg-slate-100 text-slate-700 
                               rounded-full border border-slate-200">
                Software Engineer
              </span>
            </motion.div>

            {/* HEADING */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl 
                         font-bold text-slate-900 
                         leading-tight tracking-tight"
            >
              Hi, I'm Agam 👋
            </motion.h1>

            {/* SUBTITLE */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-600 
                         leading-relaxed max-w-xl mx-auto"
            >
              Building reliable systems and turning complex problems into simple solutions
            </motion.p>
          </div>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            <a
              href="#contact"
              className="group px-6 py-3 rounded-lg 
                         bg-slate-900 text-white font-medium
                         hover:bg-slate-800 
                         transition-all duration-300
                         shadow-lg hover:shadow-xl
                         hover:-translate-y-0.5"
            >
              Get in Touch
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>

            <a
              href="#projects"
              className="px-6 py-3 rounded-lg 
                         border-2 border-slate-200 
                         text-slate-700 font-medium
                         hover:border-slate-900 hover:text-slate-900
                         transition-all duration-300
                         hover:-translate-y-0.5"
            >
              View Projects
            </a>
          </motion.div>

          {/* Optional: Social Links atau Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-8 flex items-center gap-8 text-sm text-slate-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Available for work</span>
            </div>
            <div>
              <span>Jakarta, Indonesia</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
