import { useEffect, useState } from "react";

import SidebarComponent from "../components/sidebar.component";

import {
  getWorkExperiences,
  deleteWorkExperience,
  updateWorkExperience,
} from "../../services";

import WorkExperienceForm from "../components/work-experience/work-experience.form";
import WorkExperienceList from "../components/work-experience/work-experience.list";
import WorkExperienceEditModal from "../components/work-experience/work-experience.modal.edit";

import type { WorkExperience } from "../../types/workExperience";

const WorkPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [data, setData] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<WorkExperience | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const res = await getWorkExperiences();
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        const res = await getWorkExperiences();
        if (!cancelled) setData(res);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id: string) => {
    await deleteWorkExperience(id);
    fetchData();
  };

  const handleSave = async () => {
    if (!edit) return;

    await updateWorkExperience(edit.id, edit);
    setEdit(null);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <SidebarComponent isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* MAIN CONTENT */}
      <main
        className={`
          min-h-screen
          p-8
          transition-all duration-300
          ${isOpen ? "ml-56" : "ml-16"}
        `}
      >

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Work Experience
          </h1>

          <p className="text-slate-500 text-sm">
            Manage your professional experience
          </p>
        </div>

        {/* FORM */}
        <WorkExperienceForm onSuccess={fetchData} />

        {/* LIST */}
        <WorkExperienceList
          data={data}
          loading={loading}
          onEdit={setEdit}
          onDelete={handleDelete}
        />

        {/* EDIT MODAL */}
        {edit && (
          <WorkExperienceEditModal
            data={edit}
            setData={setEdit}
            onSave={handleSave}
            onClose={() => setEdit(null)}
          />
        )}

      </main>

    </div>
  );
};

export default WorkPage;
