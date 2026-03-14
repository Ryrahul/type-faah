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

function getAchievement(wpm: number, accuracy: number) {
  if (wpm > 100 && accuracy >= 95)
    return { title: "TYPING GOD", sub: "Keyboard ka baap hai tu", color: "var(--text-correct)" };
  if (wpm > 80)
    return { title: "EK JHAAT BHAR KA AADMI", sub: "Fingers on fire bhai", color: "var(--text-correct)" };
  if (wpm >= 65)
    return { title: "ALAG HI LEVEL KA BANDA", sub: "Speed thi bhai... respect", color: "var(--accent)" };
  if (wpm >= 45)
    return { title: "THEEK THAAK HAI", sub: "Thoda aur practice kar", color: "var(--text-dim)" };
  if (wpm >= 25)
    return { title: "NIKAL JAO", sub: "Mere samne se nikal jao", color: "var(--text-error)" };
  return { title: "KYA THA YE?", sub: "Keyboard dekh ke type kar", color: "var(--text-error)" };
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
  const achievement = getAchievement(wpm, accuracy);

  return (
    <div className="w-full flex flex-col items-center fade-in-up px-4">
      {/* WPM + Achievement combined */}
      <div
        className="text-[130px] font-extralight tabular-nums leading-none"
        style={{ color: "var(--accent)", fontFamily: "var(--font-geist-mono)" }}
      >
        {wpm}
      </div>
      <div
        className="text-[11px] uppercase tracking-[0.45em] font-medium mt-2"
        style={{ color: "var(--text-dim)" }}
      >
        words per minute
      </div>
      <div
        className="text-[12px] uppercase tracking-[0.25em] font-bold mt-4"
        style={{ color: achievement.color }}
      >
        {achievement.title}
      </div>
      <div
        className="text-[11px] mt-1 mb-14"
        style={{ color: "var(--text-dim)", opacity: 0.7 }}
      >
        {achievement.sub}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 w-full mb-14" style={{ maxWidth: "520px" }}>
        <StatCell label="raw" value={rawWpm.toString()} />
        <StatCell label="accuracy" value={`${accuracy}%`} highlight={accuracy >= 90} border />
        <StatCell label="correct/err" value={correctChars.toString()} sub={`/${incorrectChars}`} border />
        <StatCell label="time" value={`${timeElapsed}s`} border />
      </div>

      {/* Restart */}
      <button
        onClick={onRestart}
        className="group flex items-center gap-3 rounded-xl text-[14px] font-medium tracking-wide transition-all duration-300 hover:scale-[1.04] active:scale-[0.96]"
        style={{
          backgroundColor: "var(--bg-secondary)",
          color: "var(--accent)",
          border: "1px solid var(--border)",
          padding: "12px 28px",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:rotate-[-180deg]">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
        Restart Test
      </button>
      <div className="mt-2.5 text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--text-dim)", opacity: 0.25 }}>
        tab + enter
      </div>
    </div>
  );
}

function StatCell({ label, value, sub, highlight, border }: {
  label: string; value: string; sub?: string; highlight?: boolean; border?: boolean;
}) {
  return (
    <div className="text-center py-1" style={border ? { borderLeft: "1px solid var(--border)" } : undefined}>
      <div className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2" style={{ color: "var(--text-dim)" }}>{label}</div>
      <div className="flex items-baseline justify-center gap-0.5">
        <span className="text-[24px] font-bold tabular-nums" style={{ color: highlight ? "var(--text-correct)" : "var(--accent)", fontFamily: "var(--font-geist-mono)" }}>{value}</span>
        {sub && <span className="text-[13px] tabular-nums" style={{ color: "var(--text-dim)", fontFamily: "var(--font-geist-mono)" }}>{sub}</span>}
      </div>
    </div>
  );
}
