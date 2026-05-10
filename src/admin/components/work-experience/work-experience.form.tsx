import { useState } from "react";
import { createWorkExperience, uploadImage } from "../../../services";
import { toast } from "sonner";
import type { WorkExperience } from "../../../types/workExperience";

interface Props {
  onSuccess: () => void;
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 " +
  "placeholder:text-slate-400 outline-none " +
  "focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition";

const WorkExperienceForm = ({ onSuccess }: Props) => {
  const [form, setForm] = useState<WorkExperience>({
    id: 0,
    company: "",
    logo: "",
    title: "",
    type: "",
    description: "",
    period: "",
    location: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      let logoUrl = "";

      if (file) {
        toast.loading("Uploading logo...");
        logoUrl = await uploadImage(file);
        toast.dismiss();
      }

      await createWorkExperience({
        ...form,
        logo: logoUrl,
      });

      toast.success("Work experience added 🚀");

      setForm({
        id: 0,
        company: "",
        logo: "",
        title: "",
        type: "",
        description: "",
        period: "",
        location: "",
      });

      setFile(null);
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add work experience");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-10"
    >
      <h2 className="text-xl font-semibold text-slate-900 mb-6">
        Add Work Experience
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          name="type"
          placeholder="Type (Fulltime / Intern)"
          value={form.type}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm
                     file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                     file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition"
        />

        <input
          name="period"
          placeholder="Period (e.g. 2023 - 2024)"
          value={form.period}
          onChange={handleChange}
          className={inputClass + " md:col-span-2"}
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className={inputClass + " md:col-span-2"}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className={inputClass + " md:col-span-2 min-h-[120px] resize-none"}
        />

      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Save Experience"}
      </button>
    </form>
  );
};

export default WorkExperienceForm;