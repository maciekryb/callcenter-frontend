import { useEffect, useState } from 'react';
import { api } from '../api';

function AddAgent() {
  const [queues, setQueues] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    queues: [],
  });
  const [status, setStatus] = useState({ type: null, message: null });

  useEffect(() => {
    api.get('/queues')
      .then(res => setQueues(res.data))
      .catch(() => setStatus({ type: 'error', message: 'Nie udało się pobrać kolejek.' }));
  }, []);

  const handleQueueChange = (name, efficiency) => {
    setForm(prev => {
      const updated = prev.queues.filter(q => q.name !== name);
      return {
        ...prev,
        queues: [...updated, { name, efficiency }],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: null });

    try {
      await api.post('/agents', form);
      setStatus({ type: 'success', message: 'Agent został zapisany!' });
      setForm({ name: '', email: '', queues: [] });
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Wystąpił błąd.';
      setStatus({ type: 'error', message: msg });
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Dodaj pracownika</h1>

      {status.message && (
        <div style={{
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '5px',
          color: status.type === 'error' ? '#721c24' : '#155724',
          backgroundColor: status.type === 'error' ? '#f8d7da' : '#d4edda',
          border: `1px solid ${status.type === 'error' ? '#f5c6cb' : '#c3e6cb'}`
        }}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Imię i nazwisko"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />

        <h3>Proszę podać efektowność przy kolejkach które będą przez daną osobe obsługiwane</h3>
        {queues.map(queue => (
          <div key={queue.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <label style={{ width: '150px' }}>{queue.name}</label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.01"
              placeholder="Efektywność"
              onChange={e => handleQueueChange(queue.name, parseFloat(e.target.value))}
              style={{ padding: '0.4rem', width: '100px' }}
            />
          </div>
        ))}

        <button type="submit" style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '0.75rem',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Zapisz agenta
        </button>
      </form>
    </div>
  );
}

export default AddAgent;
