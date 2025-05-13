import { Calendar } from "lucide-react";

const WorkLoadPredictionPage = () => {
  return (
    <div className=" mx-auto py-8 px-4 sm:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
        <Calendar className="h-6 w-6 text-emerald-600" />
       Grafik przewidywanego obciążenia
      </h2>


    </div>
  );
};

export default WorkLoadPredictionPage;
