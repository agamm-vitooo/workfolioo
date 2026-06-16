import { Award, ChevronRight } from "lucide-react";

import type { Certificate } from "../../types/certificate";
import { withCloudinaryTransformations } from "../../utils/cloudinary";



interface Props {
  certificate: Certificate;
  onClick: () => void;
}

export default function CertificateCard({
  certificate,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group flex w-full items-center gap-4
        rounded-xl border border-slate-200 p-4
        text-left transition-colors
        hover:border-slate-300 hover:bg-slate-50
      "
    >
      {/* IMAGE */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
        {certificate.image ? (
          <img
            src={withCloudinaryTransformations(certificate.image, {
              f: "auto",
              q: "auto",
              w: 120,
              h: 120,
              c: "fill",
            })}
            alt={certificate.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <Award className="h-5 w-5 text-slate-300" />
        )}
      </div>

      {/* CONTENT */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-medium text-slate-800">
          {certificate.name}
        </h3>

        <p className="truncate text-sm text-slate-500">
          {certificate.issuer} · {certificate.year}
        </p>
      </div>

      {/* INDICATOR */}
      <ChevronRight
        className="
          h-4 w-4 shrink-0 text-slate-300
          transition-all duration-300
          group-hover:translate-x-0.5
          group-hover:text-slate-400
        "
      />
    </button>
  );
}