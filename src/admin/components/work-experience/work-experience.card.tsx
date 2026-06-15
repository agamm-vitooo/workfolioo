import { Pencil, Trash2 } from "lucide-react";
import type { WorkExperience } from "../../../types/workExperience";

interface Props {
  data: WorkExperience;
  onEdit: (data: WorkExperience) => void;
  onDelete: (id: string) => void;
}

const WorkExperienceCard = ({ data, onEdit, onDelete }: Props) => {
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
        <div className="flex gap-3 items-start">
          {data.logo && (
            <img
              src={data.logo}
              alt={data.company}
              className="w-10 h-10 rounded-lg object-cover border border-slate-100"
            />
          )}

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {data.company}
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              {data.title} • {data.type}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              {data.period} • {data.location}
            </p>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(data)}
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
            onClick={() => onDelete(data.id)}
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

      {/* DESCRIPTION */}
      <p className="mt-4 text-sm text-slate-600 leading-relaxed">
        {data.description}
      </p>
    </div>
  );
};

export default WorkExperienceCard;
