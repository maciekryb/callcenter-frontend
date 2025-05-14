import { Link } from "react-router-dom"
import { Calendar, Users, ClipboardList } from "lucide-react"

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel główny</h1>
        <p className="text-gray-500 mt-2">Zarządzaj pracownikami i grafikami w jednym miejscu.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Dodaj Pracownika</h3>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-2 text-sm text-gray-500 min-h-[60px]">
              Dodaj nowych pracowników do systemu i zarządzaj ich danymi kontaktowymi.
            </p>
          </div>
          <div className="px-5 py-4 bg-gray-50 border-t">
            <Link
              to="/add-agent"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Przejdź
            </Link>
          </div>
        </div>

        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Grafik dostępności</h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-2 text-sm text-gray-500 min-h-[60px]">
              Przeglądaj i zarządzaj dostępnością pracowników w różnych terminach.
            </p>
          </div>
          <div className="px-5 py-4 bg-gray-50 border-t">
            <Link
              to="/agents-availability-schedule"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Przejdź
            </Link>
          </div>
        </div>

        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Przeglądaj Grafik</h3>
              <ClipboardList className="h-5 w-5 text-gray-400" />
            </div>
            <p className="mt-2 text-sm text-gray-500 min-h-[60px]">
              Twórz i zarządzaj grafikami pracy dla zespołu na podstawie dostępności.
            </p>
          </div>
          <div className="px-5 py-4 bg-gray-50 border-t">
            <Link
              to="/work-schedule"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Przejdź
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
