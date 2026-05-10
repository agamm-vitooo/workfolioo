import { useState } from "react"

import { createProject, uploadImage } from "../../../services"
import type { Project } from "../../../types/project"

interface ProjectFormProps {
  onSuccess: () => void
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 " +
  "placeholder:text-slate-400 outline-none " +
  "focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition"

const ProjectForm = ({ onSuccess }: ProjectFormProps) => {
  const [form, setForm] = useState<Project>({
    id: 0,
    name: "",
    image: "",
    stack: "",
    description: "",
    link: "",
    github: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      let imageUrl = ""

      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      await createProject({
        ...form,
        image: imageUrl,
      })

      setForm({
        id: 0,
        name: "",
        image: "",
        stack: "",
        description: "",
        link: "",
        github: "",
      })

      setImageFile(null)
      onSuccess()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-10"
    >
      <h2 className="text-xl font-semibold text-slate-900 mb-6">
        Add New Project
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition"
          required
        />

        <input
          type="text"
          name="stack"
          placeholder="Tech Stack"
          value={form.stack}
          onChange={handleChange}
          className={inputClass}
          required
        />

        <input
          type="text"
          name="link"
          placeholder="Project Link"
          value={form.link}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub Link"
          value={form.github}
          onChange={handleChange}
          className={inputClass}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className={
            inputClass +
            " md:col-span-2 min-h-[120px] resize-none"
          }
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Save Project"}
      </button>
    </form>
  )
}

export default ProjectForm