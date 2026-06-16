import { useEffect, useState } from "react";

import type { Certificate } from "../types/certificate";
import { getCertificates } from "../services";

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
    <section id="certificates" className="py-16">
      <h2 className="mb-8 text-2xl font-bold text-slate-800">
        Certificates
      </h2>

      {loading ? (
        <p className="text-slate-500">Loading certificates...</p>
      ) : certificates.length === 0 ? (
        <p className="text-slate-500">Belum ada certificate 🚀</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shrink-0">
                  {c.image ? (
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {c.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {c.issuer} • {c.year}
                  </p>

                  {c.link ? (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex text-sm text-blue-700 hover:underline"
                    >
                      View link
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CertificatesSection;


