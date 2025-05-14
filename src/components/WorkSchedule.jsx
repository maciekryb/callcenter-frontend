"use client";
import { useEffect, useState } from "react";
import { api } from "../api";
import { Calendar, Clock, Info } from "lucide-react";

const AVAILABILITY_FULL_DAY = "full_day";
const AVAILABILITY_PARTIAL_DAY = "partial_day";

const WorkSchedule = ({ queueName, queueId }) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({ type: null, message: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/work-schedule/queue/${queueId}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setStatus({ type: "error", message: "Nie udało się pobrać kolejek." });
        setLoading(false);
      });
  }, []);

  // Wyciągnij unikalne daty i godziny
  const dates = [...new Set(data.map((item) => item.date))].sort();
  const hours = [...new Set(data.map((item) => item.start_time))].sort();

  // Mapowanie agent_id -> agent.name (jeśli agent jest w danych)
  const agentNames = {};
  data.forEach((item) => {
    if (item.agent && item.agent_id) {
      agentNames[item.agent_id] = item.agent.name;
    }
  });

  // Pomocnicza funkcja do formatowania godziny
  const formatHour = (time) => time?.substring(0, 5);

  // Pomocnicza funkcja do formatowania daty
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const weekday = date.toLocaleDateString("pl-PL", { weekday: "short" });
    const day = date.getDate();
    const month = date.toLocaleDateString("pl-PL", { month: "short" });
    return (
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium text-gray-600">{weekday}</span>
        <span className="text-lg font-bold">{day}</span>
        <span className="text-xs text-gray-500">{month}</span>
      </div>
    );
  };

  return (
    <div className="mx-auto py-8 px-4 sm:px-6">
      {status.type === "error" && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p>{status.message}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50 sticky left-0 z-10">
                  Godzina
                </th>
                {dates.map((date) => (
                  <th key={date} className="px-4 py-3 text-center font-medium text-gray-500 border-b border-gray-200">
                    {formatDate(date)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hours.map((hour, idx) => (
                <tr key={hour} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200 sticky left-0 z-10 bg-inherit">
                    {formatHour(hour)}
                  </td>
                  {dates.map((date) => {
                    // Znajdź wszystkich agentów mających dyżur w tej godzinie i dacie
                    const agentsOnDuty = data
                      .filter((item) => item.date === date && item.start_time === hour)
                      .map((item) => agentNames[item.agent_id] || `Agent ${item.agent_id}`);
                    return (
                      <td key={`${hour}-${date}`} className="px-4 py-3 whitespace-nowrap text-sm text-center">
                        {agentsOnDuty.length > 0 ? (
                          agentsOnDuty.map((name, i) => (
                            <div key={i} className="inline-block bg-emerald-100 text-emerald-800 rounded px-2 py-1 m-0.5 text-xs">
                              {name}
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WorkSchedule;
