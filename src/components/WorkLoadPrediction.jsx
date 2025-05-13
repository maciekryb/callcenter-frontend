import { useEffect, useState } from "react";
import { api } from "../api";

const WorkLoadPrediction = ({ queueName, queueId }) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({ type: null, message: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/queue/${queueId}/work-load`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setStatus({ type: "error", message: "Nie udało się pobrać kolejek." });
        setLoading(false);
      });
  }, []);

  const hours = Array.from({ length: 24 }, (_, i) => i); // Generate hours 0-23

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
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="sticky left-0 bg-gray-100 px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                    Godzina
                  </th>
                  {Object.keys(data).map((date) => (
                    <th key={date} className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                      {date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hours.map((hour, idx) => (
                  <tr key={hour} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
                    <td className="sticky left-0 px-4 py-3 whitespace-nowrap font-medium text-gray-900 bg-inherit">
                      {hour}
                    </td>
                    {Object.keys(data).map((date) => {
                      const hourData = data[date].find((entry) => entry.hour === hour);
                      const count = hourData ? hourData.count : 0;
                      return (
                        <td
                          key={`${date}-${hour}`}
                          className={`px-4 py-3 whitespace-nowrap text-center "text-gray-500"
                    }`}
                        >
                          {count}
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

export default WorkLoadPrediction;
