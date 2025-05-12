import { Calendar } from "lucide-react";
import QueueSchedule from "../components/QueueSchedule";

const AgentsAvailabilitySchedule = () => {
  return (
    <div className=" mx-auto py-8 px-4 sm:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
        <Calendar className="h-6 w-6 text-emerald-600" />
        Grafik dostępności pracowników
      </h2>

      <QueueSchedule queueName="Kolejka ogólna" queueId={1} />
      <QueueSchedule queueName="Sprzedaż" queueId={2} />
      <QueueSchedule queueName="Do sprzedaż" queueId={3} />
      <QueueSchedule queueName="Wsparcie techniczne" queueId={4} />
    </div>
  );
};

export default AgentsAvailabilitySchedule;
