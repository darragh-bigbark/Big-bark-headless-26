'use client';

import { useState } from 'react';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Something went wrong');
      }

      setStatus('success');
      setMessage("You're subscribed! Welcome to The Big Bark family.");
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-bigbark-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Subscribe to Our Newsletter
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Get the latest episodes, dog news, and exclusive content delivered
            straight to your inbox.
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16">
        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <svg
              className="w-14 h-14 text-green-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              You&apos;re in!
            </h2>
            <p className="text-gray-600">{message}</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Join the pack
            </h2>
            <p className="text-gray-500 mb-6">
              No spam, just dog news and episode updates. Unsubscribe any time.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bigbark-blue focus:border-transparent transition text-gray-900 placeholder-gray-400"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-bigbark-blue text-white font-bold py-3.5 rounded-lg hover:bg-bigbark-blue-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-4 text-center">
              By subscribing you agree to our{' '}
              <a href="/privacy-policy" className="underline hover:text-gray-600">
                privacy policy
              </a>
              .
            </p>
          </div>
        )}

        {/* Podcast platforms */}
        <div className="mt-10 text-center">
          <p className="text-sm font-medium text-gray-500 mb-4">
            Or listen on your favourite platform
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://open.spotify.com/show/thebigbark"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1DB954] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Spotify
            </a>
            <a
              href="https://podcasts.apple.com/ie/podcast/the-big-bark"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#9933CC] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Apple Podcasts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
