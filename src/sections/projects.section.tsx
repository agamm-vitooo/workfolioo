
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import type { Project } from "../types/project";
import { getProjects } from "../services";

import ProjectList from "../components/project/project.section.list";
import ProjectModal from "../components/project/project.section.modal";

export default function ProjectSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchProjects = async () => {
      setLoading(true);

      try {
        const data = await getProjects();

        if (mounted) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSeeAll = () => {
    navigate("/projects");
  };

  return (
    <section
      id="projects"
      className="scroll-mt-24 rounded-3xl bg-[#F9FAFB] py-12 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 sm:py-16"
    >
      <div className="mb-6 flex items-center justify-between sm:mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Projects
        </h2>

        <button
          type="button"
          onClick={handleSeeAll}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors duration-300 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          See All
          <FaArrowRight
            size={12}
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500 dark:text-slate-400 sm:text-base">
          Loading projects...
        </p>
      ) : projects.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400 sm:text-base">
          Belum ada project 🚀
        </p>
      ) : (
        <ProjectList
          projects={projects.slice(0, 3)}
          onSelect={(project) => setSelectedProject(project)}
        />
      )}

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
