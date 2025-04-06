import React, { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      console.log('Attempting to subscribe:', {
        email,
        apiUrl: '/api/subscribe',
        isProduction: import.meta.env.PROD,
        origin: window.location.origin
      });

      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      let data;
      const responseText = await response.text();
      try {
        data = JSON.parse(responseText);
        console.log('Response data:', data);
      } catch (parseError) {
        console.error('Failed to parse response:', responseText);
        throw new Error('Invalid response format');
      }

      if (response.ok && data.success) {
        setStatus('success');
        setMessage('✅ Successfully subscribed! Thank you for joining NovaVenture.');
        setEmail('');
      } else {
        setStatus('error');
        const errorMessage = data.error || 'Failed to subscribe. Please try again.';
        console.error('Subscription failed:', { response, data });
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error('Subscription error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        error,
        stack: error instanceof Error ? error.stack : undefined
      });
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-xl bg-[#0A0F24] border border-[#490314] focus:border-[#FF6B35] focus:outline-none text-white placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-[#490314] hover:bg-[#FF6B35] text-white py-3 px-8 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        {message && (
          <p className={`text-center text-sm ${
            status === 'success' ? 'text-green-400' : 'text-red-400'
          }`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
} 