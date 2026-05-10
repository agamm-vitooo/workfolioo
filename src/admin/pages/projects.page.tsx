import { useEffect, useState }
from "react";

import SidebarComponent
from "../components/sidebar.component";

import ProjectForm
from "../components/project/project.form";

import ProjectList
from "../components/project/project.list";

import {
  getProjects,
} from "../../services";

import type {
  Project,
} from "../../types/project";

const ProjectsPage = () => {

  const [isOpen, setIsOpen] =
    useState(true);

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(false);

  const fetchProjects = async () => {

  try {

    setLoading(true);

    const response =
      await getProjects();

    console.log(response);

    setProjects(response || []);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};

  useEffect(() => {
    fetchProjects();
  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      <SidebarComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <main
        className={`
          min-h-screen
          p-10
          text-black
          transition-all duration-300 ease-in-out
          ${isOpen ? "ml-56" : "ml-16"}
        `}
      >

        <h1 className="text-3xl font-bold mb-2">
          Admin Projects
        </h1>

        <p className="text-slate-600 mb-8">
          Manage your projects here
        </p>

        <ProjectForm
          onSuccess={fetchProjects}
        />

        <ProjectList
          projects={projects}
          loading={loading}
          onRefresh={fetchProjects}
        />

      </main>

    </div>
  );
};

export default ProjectsPage;