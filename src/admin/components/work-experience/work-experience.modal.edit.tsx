import { Save, X } from "lucide-react";
import { useState } from "react";
import { uploadImage } from "../../../services";
import { toast } from "sonner";
import type { WorkExperience } from "../../../types/workExperience";

interface Props {
  data: WorkExperience;
  setData: React.Dispatch<React.SetStateAction<WorkExperience | null>>;
  onSave: () => Promise<void> | void;
  onClose: () => void;
}

const WorkExperienceEditModal = ({
  data,
  setData,
  onSave,
  onClose,
}: Props) => {
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 " +
    "text-slate-900 placeholder:text-slate-400 " +
    "focus:outline-none focus:ring-1 focus:ring-slate-300 transition";

  // HANDLE UPLOAD LOGO (CLOUDINARY)
  const handleLogoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      toast.loading("Uploading logo...");

      const url = await uploadImage(file);

      setData({
        ...data,
        logo: url,
      });

      toast.success("Logo berhasil diupload 🚀");
    } catch (err) {
      console.error(err);
      toast.error("Upload logo gagal");
    } finally {
      setUploading(false);
      toast.dismiss();
    }
  };

  // HANDLE SAVE
  const handleSave = async () => {
    try {
      setSaving(true);
      toast.loading("Saving work experience...");

      await onSave();

      toast.success("Work experience berhasil diupdate ✨");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Gagal update work experience");
    } finally {
      setSaving(false);
      toast.dismiss();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="bg-white/95 border border-slate-200 shadow-xl rounded-2xl w-full max-w-xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">

          <h2 className="text-lg font-semibold text-slate-900">
            Edit Work Experience
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>

        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-3">

          {/* LOGO */}
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className={inputClass}
          />

          {uploading && (
            <p className="text-xs text-slate-500">
              Uploading logo...
            </p>
          )}

          {data.logo && (
            <img
              src={data.logo}
              className="w-14 h-14 rounded-xl object-cover border border-slate-200"
            />
          )}

          <input
            value={data.company}
            onChange={(e) =>
              setData({ ...data, company: e.target.value })
            }
            placeholder="Company"
            className={inputClass}
          />

          <input
            value={data.title}
            onChange={(e) =>
              setData({ ...data, title: e.target.value })
            }
            placeholder="Job Title"
            className={inputClass}
          />

          <input
            value={data.type}
            onChange={(e) =>
              setData({ ...data, type: e.target.value })
            }
            placeholder="Type (Fulltime / Intern)"
            className={inputClass}
          />

          <input
            value={data.period}
            onChange={(e) =>
              setData({ ...data, period: e.target.value })
            }
            placeholder="Period"
            className={inputClass}
          />

          <input
            value={data.location}
            onChange={(e) =>
              setData({ ...data, location: e.target.value })
            }
            placeholder="Location"
            className={inputClass}
          />

          <textarea
            value={data.description}
            onChange={(e) =>
              setData({ ...data, description: e.target.value })
            }
            placeholder="Description"
            className={inputClass + " min-h-[100px] resize-none"}
          />

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-slate-100">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
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

export default WorkExperienceEditModal;