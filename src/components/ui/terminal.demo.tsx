"use client";

import { Terminal } from "@/components/ui/terminal";

export function TerminalDemo() {
  return (
    <section className="w-full py-10 md:py-20">
      <Terminal
        commands={[
          "whoami",
          "cat education.json",
          "cat experience.json",
          "npm run skills",
          "npm run certificates",
          "./launch-career.sh",
        ]}
        outputs={{
          0: [
            "Agam Vito",
            "Frontend Developer",
            "Bekasi, Indonesia",
          ],

          1: [
            "✔ Institut Teknologi PLN",
            "✔ Bachelor of Informatics Engineering",
          ],

          2: [
            "✔ Internship at CIMB Niaga",
            "✔ Developed responsive web applications",
            "✔ Built internal dashboard systems",
            "✔ Collaborated with cross-functional teams",
          ],

          3: [
            "→ React",
            "→ TypeScript",
            "→ Tailwind CSS",
            "→ Vite",
            "→ React Native",
            "→ Prisma",
            "→ Framer Motion",
            "→ MapLibre",
          ],

          4: [
            "✔ Microsoft Certified: Azure AI Fundamentals",
            "✔ Additional professional certifications loaded",
          ],

          5: [
            "🚀 Building modern and user-focused applications",
            "🚀 Open for collaboration and new opportunities",
          ],
        }}
        typingSpeed={45}
        delayBetweenCommands={1000}
      />
    </section>
  );
}