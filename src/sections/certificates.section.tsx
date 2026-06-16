import { useEffect, useState } from "react";

import type { Certificate } from "../types/certificate";
import { getCertificates } from "../services";

import CertificateList from "../components/certificate/certificate.list";
import CertificateModal from "../components/certificate/certificate.modal";

const CertificatesSection = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchCertificates = async () => {
      setLoading(true);

      try {
        const data = await getCertificates();

        if (mounted) {
          setCertificates(data);
        }
      } catch (error) {
        console.error(error);
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

  return (
    <section id="certificates">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:mb-8 sm:text-3xl">
        Certificates
      </h2>

      {loading ? (
        <CertificateList loading />
      ) : certificates.length === 0 ? (
        <p className="text-sm text-slate-500">
          Belum ada certificate.
        </p>
      ) : (
        <CertificateList
          certificates={certificates}
          onSelect={setSelectedCertificate}
        />
      )}

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
};

export default CertificatesSection;