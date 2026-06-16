import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import type { Project } from "../types/project";

const COLLECTION = "projects";

const projectConverter = {
  toFirestore: (project: Project) => {
    const { id, ...data } = project;
    return data;
  },
  fromFirestore: (snapshot: any, options: any): Project => {
    const data = snapshot.data(options) as Omit<Project, "id">;
    return { id: snapshot.id, ...data } as Project;
  },
};

const col = collection(db, COLLECTION).withConverter(projectConverter);

export const getProjects = async (): Promise<Project[]> => {
  const snapshot = await getDocs(col);
  return snapshot.docs.map((doc) => doc.data());
};

export const createProject = async (data: Omit<Project, "id">): Promise<string> => {
  const docRef = await addDoc(col, data);
  return docRef.id;
};

export const updateProject = async (id: string, data: Partial<Project>) => {
  const { id: _ignoredId, ...cleanData } = data;
  await updateDoc(doc(db, COLLECTION, id), cleanData);
};

export const deleteProject = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};
