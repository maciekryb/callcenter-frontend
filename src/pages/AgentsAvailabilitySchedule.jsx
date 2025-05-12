"use client"
import { useEffect, useState } from "react"
import { api } from "../api"
import { Calendar, Clock, Info } from "lucide-react"

const AVAILABILITY_FULL_DAY = "full_day";
const AVAILABILITY_PARTIAL_DAY = "partial_day";
const AVAILABILITY_NOT_AVAILABLE = "not_available";

const AgentsAvailabilitySchedule = () => {
  const [data, setData] = useState([])
  const [status, setStatus] = useState({ type: null, message: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get("/agent/schedule")
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch(() => {
        setStatus({ type: "error", message: "Nie udało się pobrać kolejek." })
        setLoading(false)
      })
  }, [])

  // Grupowanie danych według agenta
  const groupedByAgent = data.reduce((acc, item) => {
    if (!acc[item.agent_id]) {
      acc[item.agent_id] = []
    }
    acc[item.agent_id].push(item)
    return acc
  }, {})

  // Formatowanie czasu
  const formatTime = (time) => {
    if (!time) return ""
    return time.substring(0, 5) // Usuwa sekundy
  }

  // Lista unikalnych dat
  const dates = [...new Set(data.map((item) => item.date))].sort()

  // Formatowanie daty
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const weekday = date.toLocaleDateString("pl-PL", { weekday: "short" })
    const day = date.getDate()
    const month = date.toLocaleDateString("pl-PL", { month: "short" })

    return (
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium text-gray-600">{weekday}</span>
        <span className="text-lg font-bold">{day}</span>
        <span className="text-xs text-gray-500">{month}</span>
      </div>
    )
  }

  return (
     <div className=" mx-auto py-8 px-4 sm:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
        <Calendar className="h-6 w-6 text-emerald-600" />
        Grafik dostępności pracowników
      </h2>

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
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50 sticky left-0 z-10"
                >
                  <div className="flex items-center space-x-1">
                    <span>Pracownik</span>
                  </div>
                </th>
                {dates.map((date) => (
                  <th key={date} className="px-4 py-3 text-center font-medium text-gray-500 border-b border-gray-200">
                    {formatDate(date)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(groupedByAgent).map(([agentId, schedules], index) => (
                <tr key={agentId} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200 sticky left-0 z-10 bg-inherit">
                    {agentId}
                  </td>
                  {dates.map((date) => {
                    const schedule = schedules.find((s) => s.date === date)
                       console.log(schedule) 
                    return (
                      <td key={`${agentId}-${date}`} className="px-4 py-4 whitespace-nowrap text-sm text-center">
                        {schedule ? (
                          <div className="relative group">
                            {schedule.availability_status === AVAILABILITY_FULL_DAY ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                                <Clock className="mr-1 h-3 w-3" />
                                Cały dzień
                              </span>
                            ) : schedule.availability_status === AVAILABILITY_PARTIAL_DAY ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-800">
                                <Clock className="mr-1 h-3 w-3" />
                                {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
                              </span>
                            ) : (
                              <span className="text-gray-300 inline-block w-full text-center">—</span>
                            )}
                            {schedule.notes && (
                              <div className="group relative inline-block ml-1">
                                <Info className="h-4 w-4 text-gray-400 cursor-help" />
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute z-20 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                                  {schedule.notes}
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-300 inline-block w-full text-center">—</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AgentsAvailabilitySchedule
