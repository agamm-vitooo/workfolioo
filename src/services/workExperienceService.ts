import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import type { DocumentData, QueryDocumentSnapshot, SnapshotOptions, FirestoreDataConverter } from "firebase/firestore";
import type { WorkExperience } from "../types/workExperience";

const COLLECTION = "work_experience";

const converter = {
  toFirestore: (data: WorkExperience) => {
    const { id, ...rest } = data;
    return rest;
  },
  fromFirestore: (snapshot: any, options: any): WorkExperience => {
    const data = snapshot.data(options) as Omit<WorkExperience, "id">;
    return { id: snapshot.id, ...data } as WorkExperience;
  },
};

const col = collection(db, COLLECTION).withConverter(converter);

export const getWorkExperiences = async (): Promise<WorkExperience[]> => {
  const snapshot = await getDocs(col);
  return snapshot.docs.map((doc) => doc.data());
};

export const createWorkExperience = async (data: Omit<WorkExperience, "id">): Promise<string> => {
  const docRef = await addDoc(col, data);
  return docRef.id;
};

export const updateWorkExperience = async (id: string, data: Partial<WorkExperience>) => {
  const { id: _ignoredId, ...cleanData } = data;
  await updateDoc(doc(db, COLLECTION, id), cleanData);
};

export const deleteWorkExperience = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};
