import { Calendar } from "lucide-react";
import WorkSchedule from "../components/WorkSchedule";
import { useEffect } from "react";
import { api } from "../api";

const WorkSchedulePage = () => {
  const [status, setStatus] = useState({ type: null, message: null });
  const [loading, setLoading] = useState(true);
    useEffect(() => {
      api
        .get(`/work-schedule/generate`)
        .then((res) => {
           setStatus({ type: "success", message: "Udało się wygenerować grafik." });
          setLoading(false);
        })
        .catch(() => {
          setStatus({ type: "error", message: "Wystąpił błąd podczas generowania grafiku." });
          setLoading(false);
        });
    }, []);

  return (
    <div className=" mx-auto py-8 px-4 sm:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
        <Calendar className="h-6 w-6 text-emerald-600" />
        Grafik pracy
      </h2>
      <div className="flex justify-center mb-6">
        <button
          onClick={handleGenerateSchedule}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded"
        >
          Wygeneruj nowy grafik
        </button>
      </div>
      <WorkSchedule queueName="Kolejka ogólna" queueId={1} />
      <WorkSchedule queueName="Sprzedaż" queueId={2} />
      <WorkSchedule queueName="Do sprzedaż" queueId={3} />
      <WorkSchedule queueName="Wsparcie techniczne" queueId={4} />
    </div>
  );
};

export default WorkSchedulePage;
