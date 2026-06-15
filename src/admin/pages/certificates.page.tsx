import { useState } from "react";

import SidebarComponent from "../components/sidebar.component";
import CertificatesSection from "../components/certificates/certificates.section";

const CertificatesPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100">
      <SidebarComponent isOpen={isOpen} setIsOpen={setIsOpen} />

      <main
        className={`
          min-h-screen
          p-10
          text-black
          transition-all duration-300 ease-in-out
          ${isOpen ? "ml-56" : "ml-16"}
        `}
      >
        <h1 className="text-3xl font-bold mb-4">Admin Certificates</h1>
        <p className="text-slate-600 mb-8">
          Manage your certificates (add / edit / delete) 🚀
        </p>

        <CertificatesSection />
      </main>
    </div>
  );
};

export default CertificatesPage;

