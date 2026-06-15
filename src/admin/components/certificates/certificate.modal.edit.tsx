import { Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { uploadImage, updateCertificate } from "../../../services";
import type { Certificate } from "../../../types/certificate";

interface Props {
  editForm: Certificate;
  setEditForm: React.Dispatch<React.SetStateAction<Certificate | null>>;
  onClose: () => void;
  onSaved: () => void;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 " +
  "text-slate-900 placeholder:text-slate-400 " +
  "focus:outline-none focus:ring-1 focus:ring-slate-300 transition";

const CertificateModalEdit = ({
  editForm,
  setEditForm,
  onClose,
  onSaved,
}: Props) => {
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      toast.loading("Uploading certificate image...");
      const url = await uploadImage(file);
      setEditForm({
        ...editForm,
        image: url,
      });
      toast.success("Image uploaded 🚀");
      toast.dismiss();
    } catch (err) {
      console.error(err);
      toast.error("Upload gagal");
      toast.dismiss();
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      toast.loading("Saving certificate...");
      await updateCertificate(editForm.id, {
        name: editForm.name,
        issuer: editForm.issuer,
        year: editForm.year,
        image: editForm.image,
        link: editForm.link,
      });
      toast.success("Certificate updated ✨");
      toast.dismiss();
      setEditForm(null);
      onClose();
      onSaved();
    } catch (err) {
      console.error(err);
      toast.error("Gagal update certificate");
      toast.dismiss();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white/95 border border-slate-200 shadow-xl rounded-2xl w-full max-w-xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">
            Edit Certificate
          </h2>
          <button
            onClick={() => {
              setEditForm(null);
              onClose();
            }}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <div className="p-5 space-y-3 overflow-y-auto">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={inputClass}
          />

          {uploading && (
            <p className="text-xs text-slate-500">Uploading...</p>
          )}

          {editForm.image && (
            <img
              src={editForm.image}
              alt={editForm.name}
              className="w-full h-36 object-cover rounded-xl border border-slate-200"
            />
          )}

          <input
            type="text"
            value={editForm.name}
            onChange={(e) =>
              setEditForm({ ...editForm, name: e.target.value })
            }
            placeholder="Certificate Name"
            className={inputClass}
          />

          <input
            type="text"
            value={editForm.issuer}
            onChange={(e) =>
              setEditForm({ ...editForm, issuer: e.target.value })
            }
            placeholder="Issuer"
            className={inputClass}
          />

          <input
            type="text"
            value={editForm.year}
            onChange={(e) =>
              setEditForm({ ...editForm, year: e.target.value })
            }
            placeholder="Year"
            className={inputClass}
          />

          <input
            type="text"
            value={editForm.link || ""}
            onChange={(e) =>
              setEditForm({ ...editForm, link: e.target.value || undefined })
            }
            placeholder="Link (optional)"
            className={inputClass}
          />
        </div>

        <div className="flex justify-end gap-3 px-5 py-4 border-t border-slate-100">
          <button
            onClick={() => {
              setEditForm(null);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateModalEdit;

