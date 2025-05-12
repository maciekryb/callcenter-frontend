"use client";

import { useEffect, useState } from "react";
import { api } from "../api";
import { CheckCircle, AlertCircle } from "lucide-react";

function AddAgent() {
  const [queues, setQueues] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    queues: [],
  });
  const [status, setStatus] = useState({ type: null, message: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api
      .get("/queues")
      .then((res) => setQueues(res.data))
      .catch(() => setStatus({ type: "error", message: "Nie udało się pobrać kolejek." }));
  }, []);

  const handleQueueChange = (name, efficiency) => {
    setForm((prev) => {
      const updated = prev.queues.filter((q) => q.name !== name);
      return {
        ...prev,
        queues: [...updated, { name, efficiency }],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: null });
    setIsSubmitting(true);

    try {
      await api.post("/agents", form);
      setStatus({ type: "success", message: "Agent został pomyślnie zapisany!" });
      setForm({ name: "", email: "", queues: [] });
      // Reset queue inputs
      const inputs = document.querySelectorAll('input[type="number"]');
      inputs.forEach((input) => (input.value = ""));
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Wystąpił błąd podczas zapisywania agenta.";
      setStatus({ type: "error", message: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dodaj pracownika</h1>
        <p className="text-gray-500">Wypełnij formularz, aby dodać nowego pracownika do systemu</p>
      </div>

      {status.message && (
        <div
          className={`mb-6 rounded-lg p-4 flex items-start ${
            status.type === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          {status.type === "error" ? (
            <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
          ) : (
            <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg border">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Imię i nazwisko
              </label>
              <input
                id="name"
                type="text"
                placeholder="Wprowadź imię i nazwisko"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Wprowadź adres email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Efektywność w obsłudze kolejek</h3>
            <p className="text-sm text-gray-500 mb-4">
              Proszę podać efektywność (0-1) przy kolejkach, które będą obsługiwane przez daną osobę
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {queues.map((queue) => (
                <div key={queue.name} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                  <label className="text-sm font-medium text-gray-700 flex-grow">{queue.name}</label>
                  <div className="relative w-24">
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.01"
                      placeholder="0.00"
                      onChange={(e) => {
                        let value = Number.parseFloat(e.target.value);
                        if (value < 0) value = 0;
                        if (value > 1) value = 1;
                        handleQueueChange(queue.name, value);
                        e.target.value = value; // Ensure the input reflects the corrected value
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-right"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Zapisywanie..." : "Zapisz agenta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAgent;
