
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { gsap } from "gsap";

import type { Project } from "../types/project";
import { getProjects } from "../services";
import ProjectModal from "../components/project/project.section.modal";

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let mounted = true;

    const fetchProjects = async () => {
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

  // GSAP: animate only when the page content first appears.
  useEffect(() => {
    if (loading || !pageRef.current) return;

    const page = pageRef.current;

    const ctx = gsap.context(() => {
      const elements = page.querySelectorAll("[data-animate]");

      // Respect the user's reduced-motion preference.
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(elements, { clearProps: "all" });
        return;
      }

      gsap.from(elements, {
        opacity: 0,
        y: 12,
        duration: 0.45,
        stagger: 0.07,
        ease: "power2.out",
        clearProps: "all",
      });
    }, page);

    return () => ctx.revert();
  }, [loading]);

  return (
    <main
      ref={pageRef}
      className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
          >
            <FaArrowLeft size={12} aria-hidden="true" />
            Back to Home
          </Link>

          <h1
            data-animate
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            All Projects
          </h1>

          <p
            data-animate
            className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base"
          >
            Explore all the projects I have built, including the technologies
            used and the details behind each project.
          </p>

          {!loading && (
            <p className="mt-3 text-sm text-slate-500">
              {projects.length}{" "}
              {projects.length === 1 ? "project" : "projects"}
            </p>
          )}
        </header>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="aspect-[16/10] bg-slate-200" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 rounded bg-slate-200" />
                  <div className="h-3 w-1/2 rounded bg-slate-200" />
                  <div className="h-3 w-full rounded bg-slate-200" />
                  <div className="h-3 w-5/6 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div
            data-animate
            className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"
          >
            <h2 className="text-lg font-semibold text-slate-800">
              Belum ada project
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Project akan ditampilkan di sini setelah tersedia.
            </p>
          </div>
        ) : (
          /* Project Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                data-animate
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow duration-200 hover:shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-500"
                  aria-label={`View details for ${project.name}`}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5 pb-2">
                    <h2 className="text-lg font-bold text-slate-900">
                      {project.name}
                    </h2>

                    <p className="mt-2 text-xs font-medium leading-relaxed text-slate-500">
                      {project.stack}
                    </p>

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                      {project.description}
                    </p>

                    <span className="mt-3 inline-block text-xs font-semibold text-slate-500">
                      View details
                    </span>
                  </div>
                </button>

                {/* External Links */}
                {(project.link || project.github) && (
                  <div className="mt-auto flex flex-wrap gap-3 px-5 pb-5 pt-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-700"
                      >
                        Live Demo
                        <FaExternalLinkAlt
                          size={10}
                          aria-hidden="true"
                        />
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        <FaGithub size={14} aria-hidden="true" />
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
