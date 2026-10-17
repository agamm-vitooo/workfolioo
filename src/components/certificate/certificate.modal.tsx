
import { AnimatePresence, motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

import type { Certificate } from "../../types/certificate";
import { withCloudinaryTransformations } from "../../utils/cloudinary";

interface Props {
  certificate: Certificate | null;
  onClose: () => void;
}

export default function CertificateModal({
  certificate,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            className="
              max-h-[90vh] w-full max-w-3xl overflow-hidden
              rounded-2xl bg-white text-slate-900 shadow-2xl
              transition-colors duration-200
              dark:bg-slate-900 dark:text-slate-100
            "
          >
            {/* Header Image */}
            <div className="relative flex h-44 items-center justify-center bg-slate-100 transition-colors dark:bg-slate-800 sm:h-64">
              {certificate.image ? (
                <img
                  src={withCloudinaryTransformations(
                    certificate.image,
                    {
                      f: "auto",
                      q: "auto",
                      w: 900,
                      h: 450,
                      c: "fill",
                    },
                  )}
                  alt={certificate.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Award
                  aria-hidden="true"
                  className="h-16 w-16 text-slate-400 dark:text-slate-500"
                />
              )}

              <button
                type="button"
                onClick={onClose}
                aria-label="Close certificate details"
                className="
                  absolute right-3 top-3 rounded-full
                  bg-white/90 px-3 py-1 text-sm text-slate-700
                  shadow transition-colors hover:bg-white
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-slate-400
                  dark:bg-slate-900/90 dark:text-slate-100
                  dark:hover:bg-slate-800
                "
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[calc(90vh-196px)] overflow-y-auto overscroll-contain p-4 sm:p-6">
              {/* Title */}
              <h2
                id="certificate-modal-title"
                className="text-2xl font-bold text-slate-900 dark:text-white"
              >
                {certificate.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {certificate.issuer} · {certificate.year}
              </p>

              {/* Action */}
              {certificate.link && (
                <div className="mt-6">
                  <a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-2 rounded-lg
                      bg-slate-900 px-5 py-2 text-sm font-medium
                      text-white transition-colors hover:bg-slate-800
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-slate-400 focus-visible:ring-offset-2
                      dark:bg-white dark:text-slate-900
                      dark:hover:bg-slate-200
                      dark:focus-visible:ring-offset-slate-900
                    "
                  >
                    <ExternalLink
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                    View Certificate
                  </a>
                </div>
              )}

              {/* Extra Info */}
              <div
                className="
                  mt-6 grid gap-3 rounded-xl bg-slate-50 p-4
                  text-sm text-slate-600 transition-colors
                  dark:bg-slate-800 dark:text-slate-300
                "
              >
                <div>
                  <span className="font-medium text-slate-700 dark:text-slate-100">
                    Certificate:
                  </span>{" "}
                  {certificate.name}
                </div>

                <div>
                  <span className="font-medium text-slate-700 dark:text-slate-100">
                    Issuer:
                  </span>{" "}
                  {certificate.issuer}
                </div>

                <div>
                  <span className="font-medium text-slate-700 dark:text-slate-100">
                    Year:
                  </span>{" "}
                  {certificate.year}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
