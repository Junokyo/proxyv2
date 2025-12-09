import React, { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

interface RewardCardProps {
  currentAmount?: number; // current user balance
  nextLevelAmount?: number; // amount to reach next VIP level
}

export default function MemberShipHeader({
  currentAmount = 0,
  nextLevelAmount = 1000,
}: RewardCardProps): JSX.Element {
  const navigate = useNavigate();

  const progress = Math.min(1, currentAmount / nextLevelAmount);
  const percent = Math.round(progress * 100);

  // Milestones for visual ticks (V1..V4). We'll show them across the bar.
  const milestones = [0, 250, 500, 750, nextLevelAmount];

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg border shadow-sm">
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* LEFT: info card */}
        <div className="flex-1 bg-white p-6 rounded-lg border">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Maximum reward <span className="text-orange-500">20%</span>
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Only available for purchase of Residential and Rotating Proxies.{' '}
                <span className="text-blue-600 underline">
                  Member introduction
                </span>
              </p>
            </div>
            <div className="hidden md:block w-40 h-28 bg-gradient-to-br from-white to-slate-50 rounded" />
          </div>

          <div className="mt-6 bg-slate-50 p-5 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-5xl font-bold text-slate-300">V0</div>
                <div className="mt-2 text-slate-700 font-semibold">
                  ${currentAmount.toFixed(2)}
                </div>
              </div>

              <div className="text-right">
                <div className="text-slate-500 text-sm">
                  🔒 ${nextLevelAmount} to unlock VIP1
                </div>
                <div className="mt-3">
                  <div className="text-lg font-medium">${nextLevelAmount}</div>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2 text-sm text-slate-600">
                <div>Progress to next VIP</div>
                <div className="font-semibold">{percent}%</div>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-4 relative overflow-hidden">
                <div
                  className="h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${percent}%`,
                    background: 'linear-gradient(90deg,#f59e0b,#fb923c)',
                  }}
                />

                {/* Milestone ticks */}
                {milestones.map((m, i) => {
                  const left = (m / nextLevelAmount) * 100;
                  return (
                    <div
                      key={i}
                      className="absolute top-0 h-4 w-0.5 bg-white/60"
                      style={{
                        left: `${left}%`,
                        transform: 'translateX(-50%)',
                      }}
                      title={`V${i}`}
                    />
                  );
                })}
              </div>

              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>V0</span>
                <span>V1</span>
                <span>V2</span>
                <span>V3</span>
                <span>V4</span>
              </div>
            </div>

            <div className="mt-6 border-t pt-4 flex items-center justify-between text-sm text-slate-600">
              <div>
                Gift ratio: <span className="font-semibold">0%</span>
              </div>
              <div>
                Residential Proxies:{' '}
                <span className="font-semibold">0.00 GB</span>
              </div>
              <div>
                Rotating ISP Proxies:{' '}
                <span className="font-semibold">0.00 GB</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => navigate('/residential-proxies')}
                className="px-5 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: chart illustration */}
        <div className="w-full lg:w-1/3 flex items-center justify-center">
          <div className="relative w-full max-w-xs">
            {/* bars */}
            <div className="flex items-end justify-between h-36">
              <div className="w-10 h-12 bg-slate-200 rounded-t shadow-sm flex items-end justify-center">
                V1
              </div>
              <div className="w-10 h-20 bg-slate-200 rounded-t shadow-sm flex items-end justify-center">
                V2
              </div>
              <div className="w-10 h-24 bg-slate-200 rounded-t shadow-sm flex items-end justify-center">
                V3
              </div>
              <div className="w-10 h-32 bg-gradient-to-t from-orange-200 to-orange-50 rounded-t shadow-lg flex items-end justify-center font-bold text-orange-600">
                V4
              </div>
            </div>

            {/* curved arrow (SVG) */}
            <svg
              viewBox="0 0 200 100"
              className="absolute -bottom-2 left-0 right-0 mx-auto w-full h-28 pointer-events-none"
            >
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
              <path
                d="M10 70 C70 10, 130 10, 190 10"
                stroke="url(#g1)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              <polygon points="190,10 182,4 182,16" fill="#fb923c" />
              <text x="172" y="0" fontSize="14" fill="#fb923c">
                20%
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
