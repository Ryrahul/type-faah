"use client";

import React, { useState } from "react";
import type { SoundProfile } from "../lib/sounds";
import type { WordMode } from "../lib/words";

const themes = [
  { id: "default", color: "#a7c4a0", label: "Sage" },
  { id: "ocean", color: "#1a5276", label: "Ocean" },
  { id: "lavender", color: "#9b59b6", label: "Lavender" },
  { id: "rose", color: "#f48fb1", label: "Rose" },
  { id: "coral", color: "#ff7043", label: "Coral" },
  { id: "amber", color: "#ffd54f", label: "Amber" },
  { id: "midnight", color: "#58a6ff", label: "Midnight" },
  { id: "forest", color: "#6ecf6e", label: "Forest" },
  { id: "copper", color: "#d4915c", label: "Copper" },
  { id: "arctic", color: "#80d8e0", label: "Arctic" },
  { id: "mono", color: "#888888", label: "Mono" },
];

const timerOptions = [15, 30, 60, 120];

const soundProfiles: { id: SoundProfile; label: string }[] = [
  { id: "thock", label: "Thock" },
  { id: "clack", label: "Clack" },
  { id: "creamy", label: "Creamy" },
  { id: "marbly", label: "Marbly" },
  { id: "poppy", label: "Poppy" },
  { id: "rainy", label: "Rainy" },
  { id: "muted", label: "Muted" },
  { id: "typewriter", label: "Typewriter" },
  { id: "asmr", label: "ASMR Typing" },
  { id: "bubble", label: "Bubble" },
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
  mistakeThreshold1: number;
  mistakeThreshold2: number;
  onMistakeThreshold1Change: (v: number) => void;
  onMistakeThreshold2Change: (v: number) => void;
  wordMode: WordMode;
  onWordModeChange: (mode: WordMode) => void;
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
  mistakeThreshold1,
  mistakeThreshold2,
  onMistakeThreshold1Change,
  onMistakeThreshold2Change,
  wordMode,
  onWordModeChange,
}: HeaderProps) {
  const [showSoundMenu, setShowSoundMenu] = useState(false);
  const [showAlertMenu, setShowAlertMenu] = useState(false);

  const currentProfileLabel =
    soundProfiles.find((p) => p.id === soundProfile)?.label ?? soundProfile;

  return (
    <header className="px-10 py-5 w-full relative">
      <div className="flex items-center justify-between max-w-[1300px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2.5 select-none min-w-[140px]">
          <span
            className="text-[22px] font-bold tracking-tight"
            style={{ color: "var(--accent)" }}
          >
            bakchodi
          </span>
          <span
            className="text-[22px] font-light"
            style={{ color: "var(--text-dim)", opacity: 0.35 }}
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
        <div className="flex items-center gap-7">
          {/* Theme dots */}
          <div className="flex items-center gap-[10px]">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onThemeChange(theme.id)}
                className="w-[14px] h-[14px] rounded-full transition-all duration-300 hover:scale-[1.4] focus:outline-none"
                style={{
                  backgroundColor: theme.color,
                  boxShadow:
                    currentTheme === theme.id
                      ? `0 0 0 2px var(--bg), 0 0 0 3.5px ${theme.color}`
                      : "none",
                  opacity: currentTheme === theme.id ? 1 : 0.55,
                }}
                title={theme.label}
              />
            ))}
          </div>

          {/* Word mode pills */}
          <div
            className="flex items-center rounded-full"
            style={{
              backgroundColor: "var(--bg-secondary)",
              padding: "4px 4px",
              gap: "2px",
            }}
          >
            {([
              { id: "normal" as WordMode, label: "Normal" },
              { id: "mixed" as WordMode, label: "18+" },
              { id: "hindi" as WordMode, label: "Hindi" },
              { id: "punjabi" as WordMode, label: "Punjabi" },
              { id: "nepali" as WordMode, label: "Nepali" },
              { id: "english" as WordMode, label: "English" },
            ]).map((m) => (
              <button
                key={m.id}
                onClick={() => !isRunning && onWordModeChange(m.id)}
                className="transition-all duration-200"
                style={{
                  padding: "5px 10px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: 500,
                  backgroundColor:
                    wordMode === m.id ? "var(--bg-card)" : "transparent",
                  color:
                    wordMode === m.id ? "var(--accent)" : "var(--text)",
                  boxShadow:
                    wordMode === m.id ? "0 1px 4px rgba(0,0,0,0.3)" : "none",
                  opacity: wordMode === m.id ? 1 : (isRunning ? 0.3 : 0.5),
                  cursor: isRunning ? "default" : "pointer",
                }}
                disabled={isRunning}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Timer pills */}
          <div
            className="flex items-center rounded-full"
            style={{
              backgroundColor: "var(--bg-secondary)",
              padding: "4px 5px",
              gap: "2px",
            }}
          >
            {timerOptions.map((time) => (
              <button
                key={time}
                onClick={() => !isRunning && onTimerChange(time)}
                className="transition-all duration-200"
                style={{
                  padding: "5px 16px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 500,
                  backgroundColor:
                    currentTimer === time ? "var(--bg-card)" : "transparent",
                  color:
                    currentTimer === time ? "var(--accent)" : "var(--text)",
                  boxShadow:
                    currentTimer === time
                      ? "0 1px 4px rgba(0,0,0,0.3)"
                      : "none",
                  opacity: currentTimer === time ? 1 : (isRunning ? 0.35 : 0.55),
                  cursor: isRunning ? "default" : "pointer",
                }}
                disabled={isRunning}
              >
                {time}s
              </button>
            ))}
            <button
              onClick={() => !isRunning && onTimerChange(0)}
              className="transition-all duration-200"
              style={{
                padding: "5px 14px",
                borderRadius: "20px",
                fontSize: "16px",
                fontWeight: 500,
                backgroundColor:
                  currentTimer === 0 ? "var(--bg-card)" : "transparent",
                color:
                  currentTimer === 0 ? "var(--accent)" : "var(--text)",
                boxShadow:
                  currentTimer === 0
                    ? "0 1px 4px rgba(0,0,0,0.3)"
                    : "none",
                opacity: currentTimer === 0 ? 1 : (isRunning ? 0.35 : 0.55),
                cursor: isRunning ? "default" : "pointer",
              }}
              disabled={isRunning}
            >
              &infin;
            </button>
          </div>
        </div>

        {/* Right: Sound dropdown + mute */}
        <div className="flex items-center gap-2 min-w-[180px] justify-end relative">
          {/* Sound profile dropdown trigger */}
          <button
            onClick={() => setShowSoundMenu((v) => !v)}
            className="flex items-center gap-2 rounded-full transition-all duration-200 cursor-pointer hover:opacity-80"
            style={{
              padding: "6px 14px 6px 12px",
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-dim)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.03em",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.6 }}
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
            {currentProfileLabel}
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{
                opacity: 0.4,
                transform: showSoundMenu ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.2s ease",
              }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* Sound dropdown menu */}
          {showSoundMenu && (
            <>
              {/* Backdrop to close */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowSoundMenu(false)}
              />
              <div
                className="absolute top-full right-0 mt-2 z-50 rounded-xl overflow-hidden"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
                  minWidth: "180px",
                }}
              >
                {soundProfiles.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSoundProfileChange(p.id);
                      setShowSoundMenu(false);
                    }}
                    className="w-full text-left transition-all duration-150 cursor-pointer"
                    style={{
                      padding: "10px 16px",
                      fontSize: "13px",
                      fontWeight: soundProfile === p.id ? 600 : 400,
                      color:
                        soundProfile === p.id
                          ? "var(--accent)"
                          : "var(--text)",
                      backgroundColor:
                        soundProfile === p.id
                          ? "rgba(255,255,255,0.04)"
                          : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor =
                        "rgba(255,255,255,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor =
                        soundProfile === p.id
                          ? "rgba(255,255,255,0.04)"
                          : "transparent";
                    }}
                  >
                    {p.label}
                  </button>
                ))}

              </div>
            </>
          )}

          {/* Mute toggle */}
          <button
            onClick={onSoundToggle}
            className="rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center"
            style={{
              width: "32px",
              height: "32px",
              color: soundEnabled ? "var(--accent)" : "var(--text-dim)",
              backgroundColor: soundEnabled
                ? "transparent"
                : "var(--bg-secondary)",
            }}
            title={soundEnabled ? "Mute" : "Unmute"}
          >
            {soundEnabled ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>

          {/* Mistake alerts button */}
          <div className="relative">
            <button
              onClick={() => setShowAlertMenu((v) => !v)}
              className="rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center"
              style={{
                width: "32px",
                height: "32px",
                color: (mistakeThreshold1 > 0 || mistakeThreshold2 > 0) ? "var(--accent)" : "var(--text-dim)",
                backgroundColor: "transparent",
              }}
              title="Mistake alerts"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>

            {showAlertMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowAlertMenu(false)}
                />
                <div
                  className="absolute top-full right-0 mt-2 z-50 rounded-2xl"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                    padding: "16px 18px",
                    width: "220px",
                  }}
                >
                  <div
                    className="text-[9px] uppercase tracking-[0.3em] font-semibold mb-4"
                    style={{ color: "var(--text-dim)" }}
                  >
                    Mistake Alerts
                  </div>

                  {/* Interval */}
                  <div>
                    <div className="text-[11px] font-medium mb-2.5" style={{ color: "var(--text)" }}>
                      Every {mistakeThreshold1 > 0 ? `${mistakeThreshold1} errors` : ""} {mistakeThreshold1 === 0 && <span style={{ color: "var(--text-dim)" }}>off</span>}
                    </div>
                    <div className="flex flex-wrap gap-[5px]">
                      {[3, 5, 7, 10, 15, 0].map((n) => (
                        <button
                          key={n}
                          onClick={() => onMistakeThreshold1Change(n)}
                          className="rounded-lg text-[11px] font-medium transition-all duration-150 cursor-pointer"
                          style={{
                            padding: "5px 10px",
                            backgroundColor: mistakeThreshold1 === n ? "var(--bg-card)" : "transparent",
                            color: mistakeThreshold1 === n ? "var(--accent)" : "var(--text-dim)",
                            border: mistakeThreshold1 === n ? "1px solid var(--border)" : "1px solid transparent",
                          }}
                        >
                          {n === 0 ? "Off" : n}
                        </button>
                      ))}
                    </div>
                    {mistakeThreshold1 > 0 && (
                      <div className="text-[10px] mt-2.5" style={{ color: "var(--text-dim)", opacity: 0.6 }}>
                        3 sounds cycle every {mistakeThreshold1} errors
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
