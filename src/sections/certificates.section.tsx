
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
    <section id="certificates" className="scroll-mt-24">
      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between sm:mb-8">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Certificates
        </h2>

        <button
          type="button"
          onClick={handleSeeAll}
          disabled={loading || certificates.length === 0}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors duration-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          See All
          <FaArrowRight
            size={12}
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Certificate List */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <div className="aspect-[16/10] bg-slate-200" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-1/2 rounded bg-slate-200" />
                <div className="h-3 w-1/3 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      ) : certificates.length === 0 ? (
        <p className="text-sm text-slate-500">
          Belum ada sertifikat.
        </p>
      ) : (
        <CertificateList
          certificates={certificates.slice(0, 3)}
          onSelect={(certificate) => setSelectedCertificate(certificate)}
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
