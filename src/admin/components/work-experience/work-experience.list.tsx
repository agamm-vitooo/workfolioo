import WorkExperienceCard from "./work-experience.card";
import type { WorkExperience } from "../../../types/workExperience";
import Loading from "../../components/ui/loading";
import { toast } from "sonner";

interface Props {
  data: WorkExperience[];
  loading: boolean;
  onEdit: (data: WorkExperience) => void;
  onDelete: (id: string) => void;
}

const WorkExperienceList = ({
  data,
  loading,
  onEdit,
  onDelete,
}: Props) => {
  // LOADING
  if (loading) {
    return <Loading text="Memuat work experience..." />;
  }

  // EMPTY STATE
  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-slate-500">
        Belum ada work experience 🚀
      </div>
    );
  }

  // DELETE CONFIRM
  const handleDelete = (id: string) => {
    toast(
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-semibold text-slate-900">
            Hapus Work Experience?
          </h3>

          <p className="text-sm text-slate-500">
            Data akan dihapus permanen.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              onDelete(id);
              toast.success("Work experience berhasil dihapus 🚀");
              toast.dismiss();
            }}
            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>

          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-2 bg-slate-200 rounded-lg hover:bg-slate-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {data.map((item) => (
        <WorkExperienceCard
          key={item.id}
          data={item}
          onEdit={onEdit}
          onDelete={handleDelete} // 👈 pakai confirm dulu
        />
      ))}
    </div>
  );
};

export default WorkExperienceList;
