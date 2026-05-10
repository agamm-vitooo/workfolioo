import type { Certificate } from "../types/certificate";

const API_URL = import.meta.env.VITE_APP_SCRIPT_URL;

const SHEET = "certificates";

export const getCertificates = async () => {
  const res = await fetch(
    `${API_URL}?sheet=${SHEET}`
  );

  return res.json();
};

export const createCertificate = async (
  data: Certificate
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

export const updateCertificate = async (
  id: number,
  data: Partial<Certificate>
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

export const deleteCertificate = async (
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