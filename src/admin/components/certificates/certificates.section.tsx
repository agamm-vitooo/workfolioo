import { useEffect, useState } from "react";

import type { Certificate } from "../../../types/certificate";
import { getCertificates } from "../../../services";

import CertificateForm from "./certificate.form";
import CertificateList from "./certificate.list";

const CertificatesSection = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <>
      <CertificateForm onSuccess={fetchCertificates} />
      <CertificateList
        data={certificates}
        loading={loading}
        onRefresh={fetchCertificates}
      />
    </>
  );
};

export default CertificatesSection;


