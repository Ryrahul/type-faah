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
    <div className="w-full max-w-[720px] mx-auto fade-in-up">
      {/* Main WPM display */}
      <div className="text-center mb-14">
        <div
          className="text-[100px] font-extralight tabular-nums leading-none mb-3"
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-geist-mono)",
            textShadow: "0 0 60px color-mix(in srgb, var(--accent) 30%, transparent)",
          }}
        >
          {wpm}
        </div>
        <div
          className="text-sm uppercase tracking-[0.4em] font-medium"
          style={{ color: "var(--text-dim)" }}
        >
          words per minute
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-4 mb-14">
        <StatBox label="raw" value={rawWpm.toString()} delay={0} />
        <StatBox label="accuracy" value={`${accuracy}%`} delay={1} />
        <StatBox
          label="characters"
          value={`${correctChars}/${incorrectChars}`}
          subLabel={`of ${totalChars} total`}
          delay={2}
        />
        <StatBox label="time" value={`${timeElapsed}s`} delay={3} />
      </div>

      {/* Restart button */}
      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="group flex items-center gap-3 px-8 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          style={{
            backgroundColor: "var(--bg-secondary)",
            color: "var(--accent)",
            border: "1px solid var(--border)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:rotate-[-45deg]"
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
          </svg>
          <span className="tracking-wider">restart test</span>
        </button>
      </div>

      {/* Keyboard shortcut hint */}
      <div
        className="text-center mt-4 text-xs tracking-wider"
        style={{ color: "var(--text-dim)", opacity: 0.5 }}
      >
        or press cmd+enter
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  subLabel,
  delay,
}: {
  label: string;
  value: string;
  subLabel?: string;
  delay: number;
}) {
  return (
    <div
      className="rounded-xl p-5 text-center fade-in-up"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border)",
        animationDelay: `${delay * 0.1 + 0.2}s`,
        animationFillMode: "both",
      }}
    >
      <div
        className="text-[10px] uppercase tracking-[0.25em] mb-3 font-medium"
        style={{ color: "var(--text-dim)" }}
      >
        {label}
      </div>
      <div
        className="text-2xl font-bold tabular-nums"
        style={{
          color: "var(--accent)",
          fontFamily: "var(--font-geist-mono)",
        }}
      >
        {value}
      </div>
      {subLabel && (
        <div
          className="text-[10px] mt-2 tracking-wide"
          style={{ color: "var(--text-dim)" }}
        >
          {subLabel}
        </div>
      )}
    </div>
  );
}
