'use client';

interface EISGaugeProps {
  score?: number;
  isComplete?: boolean;
}

export function EISGauge({ score, isComplete = false }: EISGaugeProps) {
  const displayScore = score !== undefined ? score.toFixed(2) : '--';
  const rotation = isComplete && score !== undefined ? (score / 100) * 180 : 0;

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-96">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer circle background */}
        <div className="absolute inset-0 rounded-full border-8 border-slate-800 bg-gradient-to-br from-slate-800/50 to-slate-900/50"></div>
        
        {/* Gauge arc (visual progress indicator) */}
        {isComplete && score !== undefined && (
          <svg
            className="absolute inset-0 w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="none"
            />
            <path
              d={`M 50 5 A 45 45 0 0 1 ${50 + 45 * Math.cos((score / 100) * Math.PI - Math.PI / 2)} ${50 + 45 * Math.sin((score / 100) * Math.PI - Math.PI / 2)}`}
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <p className="text-slate-400 text-sm font-medium mb-2">EIS</p>
          <p className="text-5xl font-bold text-cyan-400 font-mono">{displayScore}</p>
        </div>
      </div>

      {!isComplete && (
        <p className="text-slate-400 text-center text-sm mt-8 px-4">
          Enter pollution data and click verify to get your Environmental Impact Score recorded on the Algorand blockchain.
        </p>
      )}
    </div>
  );
}
