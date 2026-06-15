import { useState } from "react";
import { createCertificate, uploadImage } from "../../../services";
import { toast } from "sonner";
import type { Certificate } from "../../../types/certificate";

interface Props {
  onSuccess: () => void;
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 " +
  "placeholder:text-slate-400 outline-none " +
  "focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition";

const CertificateForm = ({ onSuccess }: Props) => {
  const [form, setForm] = useState<Certificate>({
    id: "",
    name: "",
    issuer: "",
    year: "",
    image: "",
    link: "",
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

      let imageUrl = "";
      if (file) {
        toast.loading("Uploading certificate image...");
        imageUrl = await uploadImage(file);
        toast.dismiss();
      }

      await createCertificate({
        ...form,
        image: imageUrl || undefined,
        link: form.link || undefined,
      });

      toast.success("Certificate added 🚀");

      setForm({
        id: "",
        name: "",
        issuer: "",
        year: "",
        image: "",
        link: "",
      });
      setFile(null);
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add certificate");
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
        Add New Certificate
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Certificate Name"
          value={form.name}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          name="issuer"
          placeholder="Issuer"
          value={form.issuer}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          name="year"
          placeholder="Year (e.g. 2022)"
          value={form.year}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          name="link"
          placeholder="Link (optional)"
          value={form.link || ""}
          onChange={handleChange}
          className={inputClass}
        />

        <div className="md:col-span-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Save Certificate"}
      </button>
    </form>
  );
};

export default CertificateForm;

