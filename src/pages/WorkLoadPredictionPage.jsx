import { BarChart2 } from "lucide-react";
import WorkLoadPrediction from "../components/WorkLoadPrediction";

const WorkLoadPredictionPage = () => {
  return (
    <div className=" mx-auto py-8 px-4 sm:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
        <BarChart2 className="h-6 w-6 text-emerald-600" />
        Przewidywane obciążenia dla poszczególnych kolejek
      </h2>

      <WorkLoadPrediction queueName="Kolejka ogólna" queueId={1} />
      <WorkLoadPrediction queueName="Sprzedaż" queueId={2} />
      <WorkLoadPrediction queueName="Do sprzedaż" queueId={3} />
      <WorkLoadPrediction queueName="Wsparcie techniczne" queueId={4} />
    </div>
  );
};

export default WorkLoadPredictionPage;
