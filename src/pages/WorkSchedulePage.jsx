import { Calendar } from "lucide-react";
import WorkSchedule from "../components/WorkSchedule";
import { useState } from "react";
import { api } from "../api";

const WorkSchedulePage = () => {
  const [status, setStatus] = useState({ type: null, message: null });
  const [loading, setLoading] = useState(false);

  // Funkcja do generowania grafiku
  const handleGenerateSchedule = async () => {
    setLoading(true);
    setStatus({ type: null, message: null });
    try {
      await api.post(`/work-schedule/generate`);
      setStatus({ type: "success", message: "Udało się wygenerować grafik." });
      window.location.reload();
    } catch {
      setStatus({ type: "error", message: "Wystąpił błąd podczas generowania grafiku." });
    } finally {
      setLoading(false);
    }
  };

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
          disabled={loading}
        >
          {loading ? "Generowanie..." : "Wygeneruj nowy grafik"}
        </button>
      </div>
      {status.message && (
        <div
          className={`text-center mb-4 ${
            status.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status.message}
        </div>
      )}
      <WorkSchedule queueName="Kolejka ogólna" queueId={1} />
      <WorkSchedule queueName="Sprzedaż" queueId={2} />
      <WorkSchedule queueName="Do sprzedaż" queueId={3} />
      <WorkSchedule queueName="Wsparcie techniczne" queueId={4} />
    </div>
  );
};

export default WorkSchedulePage;
