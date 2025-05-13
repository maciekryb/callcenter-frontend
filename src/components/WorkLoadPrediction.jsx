"use client";
import { useEffect, useState } from "react";
import { api } from "../api";
import { Calendar, Clock, Info } from "lucide-react";

const AVAILABILITY_FULL_DAY = "full_day";
const AVAILABILITY_PARTIAL_DAY = "partial_day";

const WorkLoadPrediction = ({ queueName, queueId }) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({ type: null, message: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/queue/${queueId}/agents-schedule`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setStatus({ type: "error", message: "Nie udało się pobrać kolejek." });
        setLoading(false);
      });
  }, []);



  return (
    <div className=" mx-auto py-8 px-4 sm:px-6">
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
       <div >
        test
        </div>
      )}
    </div>
  );
};

export default WorkLoadPrediction;
