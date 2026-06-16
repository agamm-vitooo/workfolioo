import { useEffect, useState } from "react";

import type { WorkExperience } from "../types/workExperience";
import { getWorkExperiences } from "../services";

import WorkList from "../components/work/work.section.list";
import WorkModal from "../components/work/work.section.modal";

export default function WorkSection() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [selectedExp, setSelectedExp] =
    useState<WorkExperience | null>(null);

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
        console.error(error);
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
    <section id="work" className="py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-900 lg:text-left">
          Work Experience
        </h2>

        {loading ? (
          <p className="text-slate-500">
            Loading work experiences...
          </p>
        ) : experiences.length === 0 ? (
          <p className="text-slate-500">
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