import type { WorkExperience } from "../types/workExperience";

const API_URL = import.meta.env.VITE_APP_SCRIPT_URL;

const SHEET = "work_experience";

export const getWorkExperiences = async (): Promise<
  WorkExperience[]
> => {

  const res = await fetch(
    `${API_URL}?sheet=${SHEET}`
  );

  const result = await res.json();

  return result.data || [];
};

export const createWorkExperience = async (
  data: WorkExperience
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

export const updateWorkExperience = async (
  id: number,
  data: Partial<WorkExperience>
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

export const deleteWorkExperience = async (
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