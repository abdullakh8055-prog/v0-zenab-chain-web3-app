'use client';

import { Button } from '@/components/ui/button';

export interface EISResultData {
  eis: number;
  status?: 'saved' | 'denied';
  message?: string;
  submissionId?: string;
  txId?: string;
  explorerTx?: string;
  explorerApp?: string;
  error?: string;
}

interface EISResultProps {
  result: EISResultData;
  onReset: () => void;
}

export function EISResult({ result, onReset }: EISResultProps) {
  const getStatusBadgeColor = () => {
    if (result.error) return 'bg-red-900 text-red-100';
    if (result.status === 'Below threshold') return 'bg-yellow-900 text-yellow-100';
    return 'bg-green-900 text-green-100';
  };

  const getScoreBadgeColor = () => {
    if (result.eis >= 80) return 'from-green-500 to-emerald-600';
    if (result.eis >= 70) return 'from-blue-500 to-cyan-600';
    if (result.eis >= 50) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="w-full space-y-6 rounded-lg border border-slate-700 bg-slate-800 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Environmental Impact Score</h3>
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeColor()}`}>
            {result.error ? 'Error' : result.status || 'Verified'}
          </span>
        </div>

        <div className={`bg-gradient-to-r ${getScoreBadgeColor()} rounded-lg p-6 text-center`}>
          <p className="text-sm font-medium text-gray-200 mb-2">EIS Score</p>
          <p className="text-5xl font-bold text-white">{result.eis.toFixed(2)}</p>
          <p className="text-xs text-gray-100 mt-2">out of 100</p>
        </div>

        {result.error && (
          <div className="rounded-lg bg-red-900/20 border border-red-700 p-4">
            <p className="text-sm text-red-200">{result.error}</p>
          </div>
        )}

        {result.txId && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Transaction Details</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-slate-700 p-3">
                <span className="text-xs text-slate-300">Transaction ID:</span>
                <code className="text-xs text-cyan-400 font-mono truncate max-w-xs">{result.txId}</code>
              </div>
              {result.explorerTx && (
                <a
                  href={result.explorerTx}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  View Transaction on Explorer →
                </a>
              )}
              {result.explorerApp && (
                <a
                  href={result.explorerApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  View App on Explorer →
                </a>
              )}
            </div>
          </div>
        )}

        {result.status === 'Below threshold' && (
          <div className="rounded-lg bg-yellow-900/20 border border-yellow-700 p-4">
            <p className="text-sm text-yellow-200">
              EIS score is below the verification threshold (70). The data was processed but not recorded on the blockchain.
            </p>
          </div>
        )}
      </div>

      <Button
        onClick={onReset}
        variant="outline"
        className="w-full border-slate-600 hover:bg-slate-700"
      >
        Submit Another Reading
      </Button>
    </div>
  );
}
