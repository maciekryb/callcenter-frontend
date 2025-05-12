import React from "react";
import { useEffect, useState } from 'react';
import { api } from "../api";


const AgentsAvailabilitySchedule = () => {
      const [data, setData] = useState([]);

  const [status, setStatus] = useState({ type: null, message: null });
  useEffect(() => {
    api
      .get("/agent/schedule")
      .then((res) => setData(res.data))
      .catch(() => setStatus({ type: "error", message: "Nie udało się pobrać kolejek." }));
  }, []);

  return (
    <div>
      <h2>Grafik dostępności pracowników</h2>
    </div>
  );
};

export default AgentsAvailabilitySchedule;
