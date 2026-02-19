'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';
import { EISForm } from '@/components/eis-form';
import { EISGauge } from '@/components/eis-gauge';
import { StatCards } from '@/components/stat-cards';
import { EISResultData } from '@/components/eis-result';

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
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded border border-cyan-500 flex items-center justify-center">
              <div className="w-6 h-6 border border-cyan-500 rounded" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ZENAB Chain</h1>
              <p className="text-xs text-slate-400">Environmental Impact Verification</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors text-sm font-medium">
            <div className="w-2 h-2 bg-cyan-500 rounded-full" />
            Algorand Testnet
          </button>
        </div>

        {/* Main Title Section */}
        <div className="mb-12 max-w-3xl">
          <h2 className="text-5xl font-bold text-white mb-4 text-balance">
            Decentralized Environmental Verification
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Submit air quality data to compute an Environmental Impact Score. Scores at or above 70 are permanently verified on the Algorand Testnet blockchain using a PyTEAL smart contract.
          </p>
        </div>

        {/* Stats Cards */}
        <StatCards verifiedCount={0} totalRecords={0} avgEIS={0} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 text-cyan-400">
                  <svg
                    className="w-full h-full"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Pollution Data Input</h3>
              </div>
              <p className="text-slate-400 text-sm mb-6">
                Enter air quality measurements to compute your Environmental Impact Score
              </p>
              {result === null ? (
                <EISForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg bg-green-900/20 border border-green-700 p-4">
                    <p className="text-green-200 text-sm font-medium mb-2">Score Verified</p>
                    <p className="text-white text-2xl font-bold">{result.eis.toFixed(2)}</p>
                  </div>
                  {result.error && (
                    <div className="rounded-lg bg-red-900/20 border border-red-700 p-4">
                      <p className="text-red-200 text-sm">{result.error}</p>
                    </div>
                  )}
                  {result.txId && (
                    <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4">
                      <p className="text-slate-400 text-xs mb-2">Transaction ID</p>
                      <code className="text-cyan-400 text-xs font-mono break-all">{result.txId}</code>
                    </div>
                  )}
                  <button
                    onClick={handleReset}
                    className="w-full px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition-colors"
                  >
                    Submit Another
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Gauge */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8 flex flex-col items-center justify-center">
            <EISGauge score={result?.eis} isComplete={result !== null} />
          </div>
        </div>
      </div>
    </main>
  );
}
