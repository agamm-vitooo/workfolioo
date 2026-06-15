import { useState } from "react";
import type { Certificate } from "../../../types/certificate";
import { toast } from "sonner";
import { deleteCertificate } from "../../../services";
import Loading from "../../components/ui/loading";
import CertificateCard from "./certificate.card";
import CertificateModalEdit from "./certificate.modal.edit";


interface Props {
  data: Certificate[];
  loading: boolean;
  onRefresh: () => void;
}

const CertificateList = ({ data, loading, onRefresh }: Props) => {
  const [editForm, setEditForm] =
    useState<Certificate | null>(null);

  const handleDelete = (id: string) => {
    toast(
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-semibold text-slate-900">
            Hapus Certificate?
          </h3>
          <p className="text-sm text-slate-500">
            Data akan dihapus permanen.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                await deleteCertificate(id);
                toast.success("Certificate berhasil dihapus 🚀");
                toast.dismiss();
                onRefresh();
              } catch (err) {
                console.error(err);
                toast.error("Gagal menghapus certificate");
              }
            }}
            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>

          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-2 bg-slate-200 rounded-lg hover:bg-slate-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };



  // LOADING STATE
  if (loading) {
    return <Loading text="Memuat certificates..." />;
  }

  // EMPTY STATE
  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-slate-500">
        Belum ada certificate 🚀
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.map((item) => (
          <CertificateCard
            key={item.id}
            data={item}
            onEdit={setEditForm}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {editForm && (
        <CertificateModalEdit
          editForm={editForm}
          setEditForm={setEditForm}
          onClose={() => setEditForm(null)}
          onSaved={onRefresh}
        />
      )}
    </>
  );
};

export default CertificateList;

