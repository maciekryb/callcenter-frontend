import { useEffect, useState } from 'react';
import { api } from './api';

function App() {
  const [queues, setQueues] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    queues: [],
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("Fetching queues...");
    api.get('/queues')
      .then(res => setQueues(res.data))
      .catch(() => alert("Nie udało się pobrać kolejek"));
  }, []);

  const handleQueueChange = (name, efficiency) => {
    setForm(prev => {
      const updatedQueues = prev.queues.filter(q => q.name !== name);
      return {
        ...prev,
        queues: [...updatedQueues, { name, efficiency }],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/agents', form);
      setMessage("Agent zapisany!");
      setForm({ name: '', email: '', queues: [] });
    } catch (err) {
      console.error(err);
      setMessage("Błąd przy zapisie agenta.");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dodaj agenta</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Imię i nazwisko"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <br /><br />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <br /><br />
        <h3>Kolejki:</h3>
        {queues.map(queue => (
          <div key={queue.name}>
            <label>
              {queue.name} – Efektywność:
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                onChange={e => handleQueueChange(queue.name, parseFloat(e.target.value))}
              />
            </label>
          </div>
        ))}
        <br />
        <button type="submit">Zapisz</button>
      </form>
    </div>
  );
}

export default App;
