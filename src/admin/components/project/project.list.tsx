import { useState } from "react";

import {
  deleteProject,
  updateProject,
} from "../../../services";

import { toast } from "sonner";

import type { Project } from "../../../types/project";

import ProjectCard from "./project.card";
import ProjectModalEdit from "./projects.modal.edit";
import Loading from "../../components/ui/loading";

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  onRefresh: () => void;
}

const ProjectList = ({
  projects,
  loading,
  onRefresh,
}: ProjectListProps) => {
  const [editForm, setEditForm] = useState<Project | null>(null);

  const handleDelete = (id: string) => {
    toast(
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-semibold text-slate-900">
            Hapus Project?
          </h3>
          <p className="text-sm text-slate-500">
            Project akan dihapus permanen.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                await deleteProject(id);

                toast.success("Project berhasil dihapus 🚀");

                onRefresh();
                toast.dismiss();
              } catch (error) {
                console.error(error);
                toast.error("Gagal menghapus project");
              }
            }}
            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>

          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-2 bg-slate-200 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const handleSave = async () => {
    if (!editForm) return;

    try {
      await updateProject(editForm.id, editForm);

      toast.success("Project berhasil diupdate ✨");

      setEditForm(null);
      onRefresh();
    } catch (error) {
      console.error(error);
      toast.error("Gagal update project");
    }
  };

  // ✅ LOADING STATE
  if (loading) {
    return <Loading text="Memuat project..." />;
  }

  // ❌ EMPTY STATE
  if (projects.length === 0) {
    return (
      <div className="text-center py-10 text-slate-500">
        Belum ada project 🚀
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={setEditForm}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {editForm && (
        <ProjectModalEdit
          editForm={editForm}
          setEditForm={setEditForm}
          onSave={handleSave}
          onClose={() => setEditForm(null)}
        />
      )}
    </>
  );
};

export default ProjectList;
