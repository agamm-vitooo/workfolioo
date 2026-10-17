
import type { Project } from "../../types/project";
import ProjectCard from "./project.section.card";

interface Props {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export default function ProjectList({ projects, onSelect }: Props) {
  return (
    <div className="flex w-full flex-col gap-4 text-slate-900 transition-colors duration-200 dark:text-slate-100">
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
