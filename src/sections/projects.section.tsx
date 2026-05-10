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

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-16">
      <h2 className="mb-8 text-2xl font-bold text-slate-800">
        Projects
      </h2>

      {loading ? (
        <p>Loading...</p>
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