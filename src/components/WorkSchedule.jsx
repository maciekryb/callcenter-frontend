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

  // Wyciągnij unikalne daty
  const dates = [...new Set(data.map((item) => item.date))].sort();

  // Wyciągnij unikalnych agentów z nazwami (teraz z agent_name)
  const agents = [];
  const agentMap = {};
  data.forEach((item) => {
    if (!agentMap[item.agent_id]) {
      agentMap[item.agent_id] = item.agent_name || `Agent ${item.agent_id}`;
      agents.push({ id: item.agent_id, name: agentMap[item.agent_id] });
    }
  });

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

  // Funkcja do scalania sąsiadujących zakresów godzin
  const mergeRanges = (ranges) => {
    if (ranges.length === 0) return [];
    // Zakładamy, że ranges są posortowane po start_time
    const merged = [];
    let [start, end] = [ranges[0].start_time, ranges[0].end_time];
    for (let i = 1; i < ranges.length; i++) {
      if (ranges[i].start_time === end) {
        // Przedziały są ciągłe, wydłuż zakres
        end = ranges[i].end_time;
      } else {
        merged.push({ start, end });
        [start, end] = [ranges[i].start_time, ranges[i].end_time];
      }
    }
    merged.push({ start, end });
    return merged;
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
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">{queueName}</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50 sticky left-0 z-10">
                    Pracownik
                  </th>
                  {dates.map((date) => (
                    <th key={date} className="px-4 py-3 text-center font-medium text-gray-500 border-b border-gray-200">
                      {formatDate(date)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agents.map((agent, idx) => (
                  <tr key={agent.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200 sticky left-0 z-10 bg-inherit">
                      {agent.name}
                    </td>
                    {dates.map((date) => {
                      // Znajdź i scal zakresy godzin tego agenta w danym dniu
                      const ranges = data
                        .filter((item) => item.agent_id === agent.id && item.date === date)
                        .sort((a, b) => a.start_time.localeCompare(b.start_time));
                      const merged = mergeRanges(ranges);
                      return (
                        <td
                          key={`${agent.id}-${date}`}
                          className="px-4 py-3 whitespace-normal break-words text-sm text-center"
                        >
                          {merged.length > 0 ? (
                            merged.map((r, i) => (
                              <div key={i}>
                                {r.start.substring(0, 5)}-{r.end.substring(0, 5)}
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
        </div>
      )}
    </div>
  );
};

export default WorkSchedule;
