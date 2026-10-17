
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import type { Certificate } from "../types/certificate";
import { getCertificates } from "../services";

import CertificateList from "../components/certificate/certificate.list";
import CertificateModal from "../components/certificate/certificate.modal";

export default function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchCertificates = async () => {
      try {
        const data = await getCertificates();

        if (mounted) {
          setCertificates(data);
        }
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCertificates();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSeeAll = () => {
    navigate("/certificates");
  };

  return (
    <section
      id="certificates"
      className="
        w-full min-w-0 scroll-mt-24
        rounded-2xl bg-[#F9FAFB]
        px-4 py-8 text-slate-900
        transition-colors duration-200
        dark:bg-slate-950 dark:text-slate-100
        sm:rounded-3xl sm:px-5 sm:py-10
        md:px-6 md:py-12
        lg:px-0 lg:py-12
        xl:py-16
      "
    >
      {/* Section Header */}
      <div className="mb-5 flex min-w-0 items-center justify-between gap-3 sm:mb-8">
        <h2
          className="
            min-w-0 text-xl font-bold text-slate-900
            dark:text-white sm:text-2xl lg:text-3xl
          "
        >
          Certificates
        </h2>

        <button
          type="button"
          onClick={handleSeeAll}
          disabled={loading || certificates.length === 0}
          className="
            group inline-flex min-h-10 shrink-0 items-center
            gap-1.5 rounded-lg text-xs font-semibold
            text-slate-600 transition-colors duration-200
            hover:text-slate-900
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-slate-400 focus-visible:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-40
            dark:text-slate-400 dark:hover:text-white
            dark:focus-visible:ring-offset-slate-950
            sm:gap-2 sm:text-sm
          "
        >
          <span>See All</span>
          <FaArrowRight
            size={12}
            aria-hidden="true"
            className="
              transition-transform duration-200
              group-hover:translate-x-1
            "
          />
        </button>
      </div>

      {/* Certificate List */}
      {loading ? (
        <div className="flex w-full min-w-0 flex-col gap-3 sm:gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                flex min-w-0 animate-pulse items-center gap-3
                rounded-xl border border-slate-200
                bg-white p-3
                dark:border-slate-800 dark:bg-slate-900
                sm:gap-4 sm:rounded-2xl sm:p-4
              "
            >
              <div
                className="
                  h-12 w-12 shrink-0 rounded-xl
                  bg-slate-100 dark:bg-slate-800
                  sm:h-14 sm:w-14
                "
              />

              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-3/4 max-w-48 rounded bg-slate-100 dark:bg-slate-800" />
                <div className="h-3 w-1/2 max-w-32 rounded bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      ) : certificates.length === 0 ? (
        <p
          className="
            rounded-xl border border-dashed border-slate-200
            px-4 py-6 text-center text-sm text-slate-500
            dark:border-slate-800 dark:text-slate-400
            sm:py-8
          "
        >
          Belum ada sertifikat.
        </p>
      ) : (
        <CertificateList
          certificates={certificates.slice(0, 3)}
          onSelect={setSelectedCertificate}
        />
      )}

      {/* Certificate Detail Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
}
