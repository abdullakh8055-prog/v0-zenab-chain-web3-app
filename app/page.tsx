'use client';

import { useState } from 'react';
import { EISForm } from '@/components/eis-form';
import { EISResult, EISResultData } from '@/components/eis-result';

export default function Home() {
  const [result, setResult] = useState<EISResultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (co2: number, pm25: number, pm10: number) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ co2, pm25, pm10 }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResult({
          eis: data.eis || 0,
          error: data.error || 'Failed to process verification',
        });
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error('API error:', error);
      setResult({
        eis: 0,
        error: 'An error occurred while processing your request. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-3">
                ZENAB Chain
              </h1>
              <p className="text-lg text-slate-300">
                Environmental Impact Score Verification
              </p>
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Submit air quality measurements and verify your Environmental Impact Score on the Algorand blockchain.
              Scores of 70 and above are recorded permanently.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {result === null ? (
              <div className="rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Air Quality Data</h2>
                  <p className="text-slate-400 text-sm">
                    Enter your air quality measurements to calculate your Environmental Impact Score.
                  </p>
                </div>
                <EISForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              </div>
            ) : (
              <EISResult result={result} onReset={handleReset} />
            )}
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-slate-700 text-center text-sm text-slate-400">
            <p>
              ZENAB Chain v1.0 • Powered by Algorand • Built with Next.js & Web3
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
