
import type { Certificate } from "../../types/certificate";

import CertificateCard from "./certificate.card";

interface Props {
  certificates?: Certificate[];
  loading?: boolean;
  onSelect?: (certificate: Certificate) => void;
}

export default function CertificateList({
  certificates = [],
  loading = false,
  onSelect,
}: Props) {
  if (loading) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-3 sm:gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="
              flex min-w-0 animate-pulse items-center gap-3
              rounded-xl border border-slate-100 bg-white p-3
              dark:border-slate-800 dark:bg-slate-900
              sm:gap-4 sm:rounded-2xl sm:p-4
            "
          >
            <div
              className="
                h-12 w-12 shrink-0 rounded-xl
                bg-slate-100 dark:bg-slate-800
                sm:h-14 sm:w-14 sm:rounded-2xl
              "
            />

            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-2/3 max-w-48 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="h-3 w-1/3 max-w-28 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div
        className="
          rounded-xl border border-dashed border-slate-200
          px-4 py-8 text-center text-sm text-slate-500
          dark:border-slate-800 dark:text-slate-400
          sm:rounded-2xl sm:py-10
        "
      >
        No certificates available yet.
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 sm:gap-4">
      {certificates.map((certificate) => (
        <CertificateCard
          key={certificate.id}
          certificate={certificate}
          onClick={() => onSelect?.(certificate)}
        />
      ))}
    </div>
  );
}
