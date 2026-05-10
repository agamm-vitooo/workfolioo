import type { Project } from "../types/project";

const API_URL = import.meta.env.VITE_APP_SCRIPT_URL;

const SHEET = "projects";

export const getProjects = async (): Promise<Project[]> => {
  const res = await fetch(
    `${API_URL}?sheet=${SHEET}`
  );

  const result = await res.json();

  return result.data || [];
};

export const createProject = async (
  data: Project
) => {

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "create",
      sheet: SHEET,
      data,
    }),
  });

  return res.json();
};

export const updateProject = async (
  id: number,
  data: Partial<Project>
) => {

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "update",
      sheet: SHEET,
      id,
      data,
    }),
  });

  return res.json();
};

export const deleteProject = async (
  id: number
) => {

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "delete",
      sheet: SHEET,
      id,
    }),
  });

  return res.json();
};