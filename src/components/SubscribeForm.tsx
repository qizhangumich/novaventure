import React, { useState } from 'react';

const SubscribeForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch (_) {
        // JSON parse failed
      }

      if (!response.ok) {
        throw new Error(data?.error || `Error ${response.status}`);
      }

      setStatus('success');
      setMessage('✅ Successfully subscribed!');
      setEmail('');
    } catch (err) {
      console.error('Subscription error:', err);
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <input
        type="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="w-full border rounded px-4 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-black text-white px-4 py-2 rounded hover:bg-opacity-80 transition"
      >
        {status === 'loading' ? 'Submitting...' : 'Subscribe'}
      </button>
      {message && (
        <p className={`text-sm ${status === 'error' ? 'text-red-500' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
};

export default SubscribeForm;
