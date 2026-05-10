import { Save, X } from "lucide-react";
import { useState } from "react";
import { uploadImage } from "../../../services";
import type { Project } from "../../../types/project";

interface ProjectModalEditProps {
  editForm: Project;
  setEditForm: React.Dispatch<React.SetStateAction<Project | null>>;
  onSave: () => void;
  onClose: () => void;
}

const ProjectModalEdit = ({
  editForm,
  setEditForm,
  onSave,
  onClose,
}: ProjectModalEditProps) => {
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const url = await uploadImage(file);

      setEditForm({
        ...editForm,
        image: url,
      });
    } catch (err) {
      console.error(err);
      alert("Upload gagal");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="bg-white/95 border border-slate-200 shadow-xl rounded-2xl w-full max-w-xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">
            Edit Project
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-3 overflow-y-auto">

          <input
            type="text"
            value={editForm.name}
            onChange={(e) =>
              setEditForm({ ...editForm, name: e.target.value })
            }
            placeholder="Project Name"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-300"
          />

          <input
            type="text"
            value={editForm.stack}
            onChange={(e) =>
              setEditForm({ ...editForm, stack: e.target.value })
            }
            placeholder="Tech Stack"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-300"
          />

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 file:mr-4 file:px-3 file:py-1 file:rounded-md file:border-0 file:bg-slate-900 file:text-white"
          />

          {uploading && (
            <p className="text-xs text-slate-500">
              Uploading image...
            </p>
          )}

          {/* LINK */}
          <input
            type="text"
            value={editForm.link}
            onChange={(e) =>
              setEditForm({ ...editForm, link: e.target.value })
            }
            placeholder="Live Demo Link"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200"
          />

          <input
            type="text"
            value={editForm.github}
            onChange={(e) =>
              setEditForm({ ...editForm, github: e.target.value })
            }
            placeholder="GitHub Link"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200"
          />

          <textarea
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
            placeholder="Description"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 min-h-[90px]"
          />

          {/* PREVIEW */}
          {editForm.image && (
            <img
              src={editForm.image}
              className="w-full h-36 object-cover rounded-xl border border-slate-200"
            />
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-slate-100">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
          >
            <Save className="w-4 h-4" />
            Save
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProjectModalEdit;