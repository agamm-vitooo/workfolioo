
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import type { Project } from "../types/project";
import { getProjects } from "../services";

import ProjectList from "../components/project/project.section.list";
import ProjectModal from "../components/project/project.section.modal";

export default function ProjectSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
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
      className="
        scroll-mt-24 rounded-2xl bg-[#F9FAFB]
        px-4 py-10 text-slate-900
        transition-colors duration-200
        dark:bg-slate-950 dark:text-slate-100
        sm:rounded-3xl sm:px-6 sm:py-12
        lg:px-8 lg:py-16
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">
          <h2
            className="
              min-w-0 text-xl font-bold tracking-tight
              text-slate-900 dark:text-white
              sm:text-2xl md:text-3xl
            "
          >
            Projects
          </h2>

          <button
            type="button"
            onClick={handleSeeAll}
            className="
              group inline-flex min-h-10 shrink-0
              items-center justify-center gap-2
              rounded-full px-3 py-2
              text-sm font-semibold text-slate-600
              transition-colors duration-200
              hover:bg-slate-100 hover:text-slate-900
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-slate-400
              dark:text-slate-400
              dark:hover:bg-slate-800 dark:hover:text-white
              sm:px-4
            "
          >
            <span>See All</span>
            <FaArrowRight
              size={12}
              aria-hidden="true"
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div
            className="
              grid grid-cols-1 gap-4
              sm:grid-cols-2 sm:gap-5
              lg:grid-cols-3 lg:gap-6
            "
            aria-label="Loading projects"
            aria-busy="true"
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  animate-pulse overflow-hidden rounded-2xl
                  border border-slate-200 bg-white
                  dark:border-slate-800 dark:bg-slate-900
                "
              >
                <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-3 p-4 sm:p-5">
                  <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div
            className="
              rounded-2xl border border-dashed
              border-slate-300 px-4 py-12 text-center
              dark:border-slate-700
              sm:px-6 sm:py-16
            "
          >
            <p className="text-sm text-slate-500 dark:text-slate-400 sm:text-base">
              Belum ada project 🚀
            </p>
          </div>
        ) : (
          <ProjectList
            projects={projects.slice(0, 3)}
            onSelect={(project) => setSelectedProject(project)}
          />
        )}

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
