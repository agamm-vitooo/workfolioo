import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import type { Certificate } from "../types/certificate";

const COLLECTION = "certificates";

const converter = {
  toFirestore: (data: Certificate) => {
    const { id, ...rest } = data;
    return rest;
  },
  fromFirestore: (snapshot: any, options: any): Certificate => {
    const data = snapshot.data(options);
    return { id: snapshot.id, ...data } as Certificate;
  },
};

const col = collection(db, COLLECTION).withConverter(converter);

export const getCertificates = async (): Promise<Certificate[]> => {
  const snapshot = await getDocs(col);
  return snapshot.docs.map((doc) => doc.data());
};

export const createCertificate = async (data: Omit<Certificate, "id">): Promise<string> => {
  const docRef = await addDoc(col, data);
  return docRef.id;
};

export const updateCertificate = async (id: string, data: Partial<Certificate>) => {
  const { id: _, ...cleanData } = data as any;
  await updateDoc(doc(db, COLLECTION, id), cleanData);
};

export const deleteCertificate = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};
