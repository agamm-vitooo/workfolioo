import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPDfYLngJK2wW3eumNAV5TAw-N9xIPRzE",
  authDomain: "workfolio-7576f.firebaseapp.com",
  projectId: "workfolio-7576f",
  storageBucket: "workfolio-7576f.firebasestorage.app",
  messagingSenderId: "1065093427705",
  appId: "1:1065093427705:web:87995d56eb521bca634d28",
  measurementId: "G-0VWEFM6R1Q",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const workExperiences = [
  {
    company: "PLN Icon Plus",
    logo: "",
    title: "Technical Support Staff",
    type: "Full-time",
    description:
      "Managed and maintained a technical support ticketing system using PostgreSQL, while adapting to MongoDB to improve data management and system performance.\n\n- Monitored and resolved technical issues submitted by users from UP3, ULP, and manufacturing partners through the ticketing platform.\n- Developed and executed SQL queries using DBeaver with a PostgreSQL database to support troubleshooting and root cause analysis.\n- Gained a strong understanding of business processes related to the Material Inventory Management System (MIMS) and Gudang Online Application (AGO).",
    period: "Jan 2025 – Present",
    location: "Jakarta, Indonesia",
  },
  {
    company: "CIMB Niaga",
    logo: "",
    title: "Testing Management Intern",
    type: "Internship",
    description:
      "As a QA Intern, I supported the Quality Assurance team in ensuring the functionality and reliability of both mobile and web-based applications through structured and comprehensive testing activities.\n\n- Developed and maintained 30+ daily test scripts using Excel and ALM.\n- Executed comprehensive test cycles and logged over 50 defects.\n- Produced testing documentation that reduced bug resolution time by 9%.\n- Collaborated closely with developers and product owners.",
    period: "Aug 2023 – Dec 2023",
    location: "Indonesia",
  },
  {
    company: "Institut Teknologi PLN",
    logo: "",
    title: "Research Assistant (Data Science)",
    type: "Freelance Project",
    description:
      "Conducted a sentiment analysis research project using Twitter and online news data.\n\n- Trained models using SVM, Random Forest, Logistic Regression, Naive Bayes, and Decision Tree.\n- Achieved up to 83% accuracy using Logistic Regression on news portal data.\n- Tools: Python, scikit-learn, pandas, NumPy, Jupyter Notebook, matplotlib.",
    period: "Apr 2025 – Aug 2025",
    location: "Indonesia",
  },
];

const projects = [
  {
    name: "Workfolio",
    image: "",
    stack: "React, TypeScript, Firebase, Tailwind CSS",
    description:
      "A modern portfolio website with an admin panel to manage projects, work experience, and certificates. Built with React 19, TypeScript, Firebase Firestore, Tailwind CSS v4, DaisyUI, Framer Motion, and MapLibre GL.",
    link: "",
    github: "https://github.com/agamm-vitooo/workfolioo",
  },
];

const certificates = [
  {
    name: "TOEFL ITP",
    issuer: "ITP",
    year: "2022",
    image: "",
    link: "",
  },
];

async function seed() {
  console.log("🌱 Seeding Firestore collections...\n");

  // Seed Work Experiences
  console.log("── Work Experiences ──");
  for (const exp of workExperiences) {
    const docRef = await addDoc(collection(db, "work_experience"), exp);
    console.log(`  ✅ ${exp.company} (${docRef.id})`);
  }

  // Seed Projects
  console.log("\n── Projects ──");
  for (const proj of projects) {
    const docRef = await addDoc(collection(db, "projects"), proj);
    console.log(`  ✅ ${proj.name} (${docRef.id})`);
  }

  // Seed Certificates
  console.log("\n── Certificates ──");
  for (const cert of certificates) {
    const docRef = await addDoc(collection(db, "certificates"), cert);
    console.log(`  ✅ ${cert.name} (${docRef.id})`);
  }

  console.log("\n✅ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
