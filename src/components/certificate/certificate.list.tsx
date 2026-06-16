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
      <div className="flex w-full flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex animate-pulse items-center gap-5 rounded-2xl p-5"
          >
            <div className="h-14 w-14 shrink-0 rounded-2xl bg-slate-100" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 rounded bg-slate-100" />
              <div className="h-3 w-1/3 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
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