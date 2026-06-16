import { Pencil, Trash2 } from "lucide-react";
import type { Certificate } from "../../../types/certificate";

interface Props {
  data: Certificate;
  onEdit: (data: Certificate) => void;
  onDelete: (id: string) => void;
}

const CertificateCard = ({ data, onEdit, onDelete }: Props) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3 items-start">
          {data.image ? (
            <img
              src={data.image}
              alt={data.name}
              className="w-10 h-10 rounded-lg object-cover border border-slate-100"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50" />
          )}

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {data.name}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {data.issuer} • {data.year}
            </p>
            {data.link ? (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-blue-600 hover:underline mt-2"
              >
                View link
              </a>
            ) : null}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(data)}
            className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <Pencil className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(data.id)}
            className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;

