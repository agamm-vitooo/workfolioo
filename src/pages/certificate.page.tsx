
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { gsap } from "gsap";

import type { Certificate } from "../types/certificate";
import { getCertificates } from "../services";

import CertificateModal from "../components/certificate/certificate.modal";

export default function CertificatePage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  const pageRef = useRef<HTMLElement>(null);

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

  // GSAP: animate once when page content appears.
  useEffect(() => {
    if (loading || !pageRef.current) return;

    const page = pageRef.current;

    const ctx = gsap.context(() => {
      const elements = page.querySelectorAll("[data-animate]");

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(elements, { clearProps: "all" });
        return;
      }

      gsap.from(elements, {
        opacity: 0,
        y: 12,
        duration: 0.45,
        stagger: 0.07,
        ease: "power2.out",
        clearProps: "all",
      });
    }, page);

    return () => ctx.revert();
  }, [loading]);

  return (
    <main
      ref={pageRef}
      className="
        min-h-screen bg-slate-50 px-4 py-10
        text-slate-900 transition-colors duration-200
        dark:bg-slate-950 dark:text-slate-100
        sm:px-6 lg:px-8
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <Link
            to="/"
            className="
              mb-6 inline-flex items-center gap-2
              text-sm font-medium text-slate-600
              transition-colors hover:text-slate-950
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-slate-400
              dark:text-slate-400 dark:hover:text-white
            "
          >
            <FaArrowLeft size={12} aria-hidden="true" />
            Back to Home
          </Link>

          <h1
            data-animate
            className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
          >
            All Certificates
          </h1>

          <p
            data-animate
            className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base"
          >
            Explore my certificates, professional training, and achievements.
          </p>

          {!loading && (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {certificates.length}{" "}
              {certificates.length === 1 ? "certificate" : "certificates"}
            </p>
          )}
        </header>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  animate-pulse overflow-hidden rounded-2xl
                  border border-slate-200 bg-white
                  transition-colors duration-200
                  dark:border-slate-800 dark:bg-slate-900
                "
              >
                <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : certificates.length === 0 ? (
          /* Empty State */
          <div
            data-animate
            className="
              rounded-2xl border border-dashed
              border-slate-300 bg-white px-6 py-16 text-center
              transition-colors duration-200
              dark:border-slate-700 dark:bg-slate-900
            "
          >
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Belum ada sertifikat
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Sertifikat akan ditampilkan di sini setelah tersedia.
            </p>
          </div>
        ) : (
          /* Certificate Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <article
                key={certificate.id}
                data-animate
                className="
                  flex flex-col overflow-hidden rounded-2xl
                  border border-slate-200 bg-white
                  transition-all duration-200 hover:shadow-lg
                  dark:border-slate-800 dark:bg-slate-900
                  dark:hover:border-slate-700
                  dark:hover:shadow-black/20
                "
              >
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(certificate)}
                  aria-label={`View details for ${certificate.name}`}
                  className="
                    block w-full text-left
                    focus:outline-none focus-visible:ring-2
                    focus-visible:ring-inset focus-visible:ring-slate-500
                  "
                >
                  {/* Certificate Image */}
                  <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {certificate.image ? (
                      <img
                        src={certificate.image}
                        alt={certificate.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-slate-400 dark:text-slate-500">
                        No image available
                      </span>
                    )}
                  </div>

                  {/* Certificate Details */}
                  <div className="p-5">
                    <h2 className="line-clamp-2 text-lg font-bold text-slate-900 dark:text-white">
                      {certificate.name}
                    </h2>

                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-medium text-slate-800 dark:text-slate-100">
                        Issuer:
                      </span>{" "}
                      {certificate.issuer}
                    </p>

                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-medium text-slate-800 dark:text-slate-100">
                        Year:
                      </span>{" "}
                      {certificate.year}
                    </p>

                    <span className="mt-4 inline-block text-xs font-semibold text-slate-500 dark:text-slate-400">
                      View details
                    </span>
                  </div>
                </button>

                {/* Certificate Link */}
                {certificate.link && (
                  <div className="mt-auto px-5 pb-5">
                    <a
                      href={certificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-2 rounded-lg
                        bg-slate-900 px-3 py-2 text-xs font-semibold
                        text-white transition-colors hover:bg-slate-700
                        focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-slate-400
                        dark:bg-white dark:text-slate-900
                        dark:hover:bg-slate-200
                      "
                    >
                      View Certificate
                      <FaExternalLinkAlt
                        size={10}
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Detail Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </main>
  );
}
