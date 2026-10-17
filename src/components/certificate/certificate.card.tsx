
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
        rounded-xl border border-slate-200 bg-white p-4
        text-left transition-colors duration-300
        hover:border-slate-300 hover:bg-slate-50
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-slate-400 focus-visible:ring-offset-2
        dark:border-slate-800 dark:bg-slate-900
        dark:hover:border-slate-700 dark:hover:bg-slate-800
        dark:focus-visible:ring-slate-600
        dark:focus-visible:ring-offset-slate-950
      "
    >
      {/* Image */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 transition-colors dark:bg-slate-800">
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
          <Award
            aria-hidden="true"
            className="h-5 w-5 text-slate-400 dark:text-slate-500"
          />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-medium text-slate-800 transition-colors dark:text-slate-100">
          {certificate.name}
        </h3>

        <p className="truncate text-sm text-slate-500 dark:text-slate-400">
          {certificate.issuer} · {certificate.year}
        </p>
      </div>

      {/* Indicator */}
      <ChevronRight
        aria-hidden="true"
        className="
          h-4 w-4 shrink-0 text-slate-300
          transition-all duration-300
          group-hover:translate-x-0.5 group-hover:text-slate-500
          dark:text-slate-600 dark:group-hover:text-slate-300
        "
      />
    </button>
  );
}
