"use client";

import React from "react";
import type { SoundProfile } from "../lib/sounds";

const themes = [
  { id: "default", color: "#a7c4a0", label: "Sage" },
  { id: "ocean", color: "#1a5276", label: "Ocean" },
  { id: "lavender", color: "#9b59b6", label: "Lavender" },
  { id: "rose", color: "#f48fb1", label: "Rose" },
  { id: "coral", color: "#ff7043", label: "Coral" },
  { id: "amber", color: "#ffd54f", label: "Amber" },
];

const timerOptions = [15, 30, 60, 120];

const soundProfiles: { id: SoundProfile; label: string; desc: string }[] = [
  { id: "lubed", label: "Lubed", desc: "Soft, buttery linears" },
  { id: "blue", label: "Blue", desc: "Clicky, tactile switches" },
];

interface HeaderProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  currentTimer: number;
  onTimerChange: (time: number) => void;
  isRunning: boolean;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  soundProfile: SoundProfile;
  onSoundProfileChange: (profile: SoundProfile) => void;
}

export default function Header({
  currentTheme,
  onThemeChange,
  currentTimer,
  onTimerChange,
  isRunning,
  soundEnabled,
  onSoundToggle,
  soundProfile,
  onSoundProfileChange,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-5 max-w-[1400px] mx-auto w-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 select-none">
        <span
          className="text-[22px] font-bold tracking-tight"
          style={{ color: "var(--accent)" }}
        >
          keyb
        </span>
        <span
          className="text-[22px] font-light"
          style={{ color: "var(--text-dim)", opacity: 0.4 }}
        >
          /
        </span>
        <span
          className="text-[22px] font-light tracking-wide"
          style={{ color: "var(--text-dim)" }}
        >
          type
        </span>
      </div>

      {/* Center: Theme dots + Timer */}
      <div className="flex items-center gap-6">
        {/* Theme dots */}
        <div className="flex items-center gap-[6px]">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className="relative w-[18px] h-[18px] rounded-full transition-all duration-300 hover:scale-[1.25] focus:outline-none"
              style={{
                backgroundColor: theme.color,
                boxShadow:
                  currentTheme === theme.id
                    ? `0 0 0 2px var(--bg), 0 0 0 3.5px ${theme.color}`
                    : "none",
                opacity: currentTheme === theme.id ? 1 : 0.7,
              }}
              title={theme.label}
              aria-label={`Switch to ${theme.label} theme`}
            />
          ))}
        </div>

        {/* Divider */}
        <div
          className="w-px h-5"
          style={{ backgroundColor: "var(--border)", opacity: 0.5 }}
        />

        {/* Timer selector */}
        <div
          className="flex items-center rounded-xl px-1 py-1 gap-[2px]"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          {timerOptions.map((time) => (
            <button
              key={time}
              onClick={() => !isRunning && onTimerChange(time)}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                isRunning
                  ? "cursor-default opacity-60"
                  : "cursor-pointer hover:opacity-100"
              }`}
              style={{
                backgroundColor:
                  currentTimer === time ? "var(--bg-card)" : "transparent",
                color:
                  currentTimer === time ? "var(--accent)" : "var(--text-dim)",
                boxShadow:
                  currentTimer === time
                    ? "0 2px 8px rgba(0,0,0,0.2)"
                    : "none",
                opacity: currentTimer === time ? 1 : undefined,
              }}
              disabled={isRunning}
            >
              {time}s
            </button>
          ))}
          <button
            onClick={() => !isRunning && onTimerChange(0)}
            className={`px-3.5 py-1.5 rounded-lg text-[14px] font-medium transition-all duration-200 ${
              isRunning
                ? "cursor-default opacity-60"
                : "cursor-pointer hover:opacity-100"
            }`}
            style={{
              backgroundColor:
                currentTimer === 0 ? "var(--bg-card)" : "transparent",
              color: currentTimer === 0 ? "var(--accent)" : "var(--text-dim)",
              boxShadow:
                currentTimer === 0 ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
              opacity: currentTimer === 0 ? 1 : undefined,
            }}
            disabled={isRunning}
          >
            &infin;
          </button>
        </div>
      </div>

      {/* Right: Sound profile + Sound toggle */}
      <div className="flex items-center gap-3">
        {/* Sound profile selector */}
        <div
          className="flex items-center rounded-lg px-1 py-1 gap-[2px]"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          {soundProfiles.map((p) => (
            <button
              key={p.id}
              onClick={() => onSoundProfileChange(p.id)}
              className="px-3 py-1 rounded-md text-[12px] font-medium transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor:
                  soundProfile === p.id ? "var(--bg-card)" : "transparent",
                color:
                  soundProfile === p.id ? "var(--accent)" : "var(--text-dim)",
                boxShadow:
                  soundProfile === p.id
                    ? "0 2px 6px rgba(0,0,0,0.2)"
                    : "none",
              }}
              title={p.desc}
              aria-label={p.desc}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Sound on/off toggle */}
        <button
          onClick={onSoundToggle}
          className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
          style={{ color: soundEnabled ? "var(--accent)" : "var(--text-dim)" }}
          title={soundEnabled ? "Sound on" : "Sound off"}
          aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
        >
          {soundEnabled ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
