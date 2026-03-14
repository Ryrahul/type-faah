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
  totalChars,
  timeElapsed,
  onRestart,
}: ResultsProps) {
  return (
    <div className="w-full flex flex-col items-center fade-in-up">
      {/* Big WPM number */}
      <div
        className="text-[140px] font-extralight tabular-nums leading-none"
        style={{
          color: "var(--accent)",
          fontFamily: "var(--font-geist-mono)",
          textShadow:
            "0 0 80px color-mix(in srgb, var(--accent) 20%, transparent)",
        }}
      >
        {wpm}
      </div>
      <div
        className="text-[11px] uppercase tracking-[0.5em] font-medium mt-2 mb-12"
        style={{ color: "var(--text-dim)" }}
      >
        words per minute
      </div>

      {/* Stats row - inline, compact */}
      <div
        className="flex items-center gap-0 rounded-2xl overflow-hidden mb-12"
        style={{ border: "1px solid var(--border)" }}
      >
        <Stat label="raw" value={rawWpm.toString()} />
        <Divider />
        <Stat
          label="accuracy"
          value={`${accuracy}%`}
          highlight={accuracy >= 95}
        />
        <Divider />
        <Stat
          label="correct"
          value={correctChars.toString()}
          sub={`/ ${incorrectChars} err`}
        />
        <Divider />
        <Stat label="time" value={`${timeElapsed}s`} />
      </div>

      {/* Restart */}
      <button
        onClick={onRestart}
        className="group flex items-center gap-2.5 px-7 py-3 rounded-full text-[13px] font-medium tracking-wider transition-all duration-300 hover:scale-[1.05] active:scale-[0.96]"
        style={{
          color: "var(--accent)",
          border: "1px solid var(--border)",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-500 group-hover:rotate-[-180deg]"
        >
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
        restart
      </button>
      <div
        className="mt-3 text-[10px] uppercase tracking-[0.25em]"
        style={{ color: "var(--text-dim)", opacity: 0.35 }}
      >
        tab + enter
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="px-7 py-5 text-center"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div
        className="text-[9px] uppercase tracking-[0.3em] mb-2 font-medium"
        style={{ color: "var(--text-dim)" }}
      >
        {label}
      </div>
      <div className="flex items-baseline justify-center gap-1.5">
        <span
          className="text-[28px] font-bold tabular-nums leading-none"
          style={{
            color: highlight ? "var(--text-correct)" : "var(--accent)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          {value}
        </span>
        {sub && (
          <span
            className="text-[12px] tabular-nums font-normal"
            style={{
              color: "var(--text-dim)",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div
      className="w-px self-stretch"
      style={{ backgroundColor: "var(--border)" }}
    />
  );
}
