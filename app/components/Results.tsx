"use client";

import React from "react";

interface ResultsProps {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  timeElapsed: number;
  onRestart: () => void;
}

export default function Results({
  wpm,
  rawWpm,
  accuracy,
  correctChars,
  incorrectChars,
  timeElapsed,
  onRestart,
}: ResultsProps) {
  return (
    <div className="w-full flex flex-col items-center fade-in-up px-4">
      {/* Big WPM */}
      <div
        className="text-[120px] font-extralight tabular-nums leading-none"
        style={{
          color: "var(--accent)",
          fontFamily: "var(--font-geist-mono)",
        }}
      >
        {wpm}
      </div>
      <div
        className="text-[11px] uppercase tracking-[0.45em] font-medium mt-3 mb-14"
        style={{ color: "var(--text-dim)" }}
      >
        words per minute
      </div>

      {/* Stats grid - 4 columns, fixed widths */}
      <div
        className="grid grid-cols-4 w-full mb-14"
        style={{ maxWidth: "560px" }}
      >
        <div className="text-center py-1">
          <div className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2" style={{ color: "var(--text-dim)" }}>raw</div>
          <div className="text-[26px] font-bold tabular-nums" style={{ color: "var(--accent)", fontFamily: "var(--font-geist-mono)" }}>{rawWpm}</div>
        </div>
        <div className="text-center py-1" style={{ borderLeft: "1px solid var(--border)" }}>
          <div className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2" style={{ color: "var(--text-dim)" }}>accuracy</div>
          <div className="text-[26px] font-bold tabular-nums" style={{ color: accuracy >= 90 ? "var(--text-correct)" : "var(--accent)", fontFamily: "var(--font-geist-mono)" }}>{accuracy}%</div>
        </div>
        <div className="text-center py-1" style={{ borderLeft: "1px solid var(--border)" }}>
          <div className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2" style={{ color: "var(--text-dim)" }}>correct/err</div>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-[26px] font-bold tabular-nums" style={{ color: "var(--accent)", fontFamily: "var(--font-geist-mono)" }}>{correctChars}</span>
            <span className="text-[14px] tabular-nums" style={{ color: "var(--text-dim)", fontFamily: "var(--font-geist-mono)" }}>/{incorrectChars}</span>
          </div>
        </div>
        <div className="text-center py-1" style={{ borderLeft: "1px solid var(--border)" }}>
          <div className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2" style={{ color: "var(--text-dim)" }}>time</div>
          <div className="text-[26px] font-bold tabular-nums" style={{ color: "var(--accent)", fontFamily: "var(--font-geist-mono)" }}>{timeElapsed}s</div>
        </div>
      </div>

      {/* Restart */}
      <button
        onClick={onRestart}
        className="group flex items-center gap-2.5 px-7 py-3 rounded-full text-[13px] font-medium tracking-wider transition-all duration-300 hover:scale-[1.05] active:scale-[0.96]"
        style={{ color: "var(--accent)", border: "1px solid var(--border)" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:rotate-[-180deg]">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
        restart
      </button>
      <div className="mt-3 text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--text-dim)", opacity: 0.35 }}>
        tab + enter
      </div>
    </div>
  );
}
