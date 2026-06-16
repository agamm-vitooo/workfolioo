import type { WorkExperience } from "../../types/workExperience";

import WorkCard from "./work.section.card";

interface Props {
  experiences: WorkExperience[];
  onSelect: (experience: WorkExperience) => void;
}

export default function WorkList({
  experiences,
  onSelect,
}: Props) {
  return (
    <div className="space-y-2">
      {experiences.map((experience, index) => (
        <WorkCard
          key={experience.id}
          experience={experience}
          index={index}
          isLast={index === experiences.length - 1}
          onClick={() => onSelect(experience)}
        />
      ))}
    </div>
  );
}