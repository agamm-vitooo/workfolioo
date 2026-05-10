import type { Project } from "../../types/project";
import ProjectCard from "./project.section.card";

interface Props {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export default function ProjectList({ projects, onSelect }: Props) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onSelect(project)}
        />
      ))}
    </div>
  );
}