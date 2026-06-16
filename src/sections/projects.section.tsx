import { useEffect, useState } from "react";

import type { Project } from "../types/project";
import { getProjects } from "../services";

import ProjectList from "../components/project/project.section.list";
import ProjectModal from "../components/project/project.section.modal";

export default function ProjectSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [loading, setLoading] = useState(false);

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
        console.error(error);
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

  return (
    <section id="projects">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:mb-8 sm:text-3xl">
        Projects
      </h2>

      {loading ? (
        <p className="text-sm text-slate-500 sm:text-base">
          Loading projects...
        </p>
      ) : projects.length === 0 ? (
        <p className="text-sm text-slate-500 sm:text-base">
          Belum ada project 🚀
        </p>
      ) : (
        <ProjectList
          projects={projects}
          onSelect={setSelectedProject}
        />
      )}

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}