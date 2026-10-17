
import { useEffect, useState } from "react";

import type { WorkExperience } from "../types/workExperience";
import { getWorkExperiences } from "../services";

import WorkList from "../components/work/work.section.list";
import WorkModal from "../components/work/work.section.modal";

export default function WorkSection() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [selectedExp, setSelectedExp] = useState<WorkExperience | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getWorkExperiences();

        if (mounted) {
          setExperiences(data);
        }
      } catch (error) {
        console.error("Gagal mengambil work experiences:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="work"
      className="bg-[#F9FAFB] py-16 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-900 transition-colors dark:text-white lg:text-left">
          Work Experience
        </h2>

        {loading ? (
          <p className="text-slate-500 dark:text-slate-400">
            Loading work experiences...
          </p>
        ) : experiences.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            Belum ada work experience 🚀
          </p>
        ) : (
          <WorkList
            experiences={experiences}
            onSelect={setSelectedExp}
          />
        )}
      </div>

      <WorkModal
        experience={selectedExp}
        onClose={() => setSelectedExp(null)}
      />
    </section>
  );
}
