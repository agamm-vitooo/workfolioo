import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import type { Project } from "../../../types/project";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

const ProjectCard = ({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) => {
  return (
    <div
      className="
        bg-white
        border border-slate-100
        rounded-2xl
        p-5
        shadow-sm
        hover:shadow-md
        transition-all duration-200
      "
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {project.name}
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            {project.stack}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(project)}
            className="
              p-2 rounded-lg
              bg-slate-100
              text-slate-600
              hover:bg-blue-50 hover:text-blue-600
              transition
            "
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(project.id)}
            className="
              p-2 rounded-lg
              bg-slate-100
              text-slate-600
              hover:bg-red-50 hover:text-red-600
              transition
            "
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* IMAGE */}
      {project.image && (
        <img
          src={project.image}
          alt={project.name}
          className="mt-4 w-full h-44 object-cover rounded-xl border border-slate-100"
        />
      )}

      {/* DESCRIPTION */}
      <p className="mt-4 text-sm text-slate-600 leading-relaxed">
        {project.description}
      </p>

      {/* LINKS */}
      <div className="flex items-center gap-5 mt-5">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1
              text-sm text-blue-600 hover:text-blue-700
              transition
            "
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1
              text-sm text-slate-600 hover:text-slate-900
              transition
            "
          >
            <FaGithub className="w-4 h-4" />
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;