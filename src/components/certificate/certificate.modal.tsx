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
  if (!certificate) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
          // Mobile: agar selalu muat di viewport dan bisa discroll
          className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          {/* HEADER IMAGE */}
          <div className="relative flex h-44 sm:h-64 items-center justify-center bg-slate-100">
            {certificate.image ? (
              <img
                src={withCloudinaryTransformations(certificate.image, {
                  f: "auto",
                  q: "auto",
                  w: 900,
                  h: 450,
                  c: "fill",
                })}
                alt={certificate.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <Award className="h-16 w-16 text-slate-300" />
            )}

            <button
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm text-slate-700 shadow"
            >
              ✕
            </button>
          </div>

          {/* CONTENT */}
          <div className="max-h-[calc(90vh-196px)] overflow-y-auto overscroll-contain p-4 sm:p-6">
            {/* TITLE */}
            <h2 className="text-2xl font-bold text-slate-900">
              {certificate.name}
            </h2>


            <p className="mt-1 text-sm text-slate-500">
              {certificate.issuer} · {certificate.year}
            </p>

            {/* ACTION */}
            {certificate.link && (
              <div className="mt-6">
                <a
                  href={certificate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Certificate
                </a>
              </div>
            )}

            {/* EXTRA INFO */}
            <div className="mt-6 grid gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <div>
                <span className="font-medium text-slate-700">
                  Certificate:
                </span>{" "}
                {certificate.name}
              </div>

              <div>
                <span className="font-medium text-slate-700">
                  Issuer:
                </span>{" "}
                {certificate.issuer}
              </div>

              <div>
                <span className="font-medium text-slate-700">
                  Year:
                </span>{" "}
                {certificate.year}
              </div>


            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}