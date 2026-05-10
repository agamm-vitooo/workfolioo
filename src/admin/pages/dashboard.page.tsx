import { useState, useEffect } from "react"
import SidebarComponent from "../components/sidebar.component"
import ProjectChart from "../components/project/chart/project.chart"

import { getProjects } from "../../services"
import type { Project } from "../../types/project"

const DashboardPage = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])

  const fetchProjects = async () => {
    try {
      const res = await getProjects()
      setProjects(res?? [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-slate-100">
      <SidebarComponent isOpen={isOpen} setIsOpen={setIsOpen} />

      <main
        className={`
          min-h-screen p-10 text-black transition-all duration-300
          ${isOpen ? "ml-56" : "ml-16"}
        `}
      >
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>

        <p className="text-slate-600 mb-8">
          Welcome to Workfolio Admin 🚀
        </p>

        {/* CARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm">Total Projects</p>
            <h2 className="text-3xl font-bold">
              {projects.length}
            </h2>
          </div>
        </div>

        {/* CHART */}
        <ProjectChart projects={projects} />
      </main>
    </div>
  )
}

export default DashboardPage