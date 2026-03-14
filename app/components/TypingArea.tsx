"use client";

import React, { useEffect, useRef, useMemo } from "react";

interface TypingAreaProps {
  words: string[];
  currentWordIndex: number;
  currentCharIndex: number;
  typedChars: { char: string; correct: boolean }[][];
  isFocused: boolean;
  onFocus: () => void;
  timeLeft: number | null;
  timerDuration: number;
  isRunning: boolean;
  liveWpm: number;
}

export default function TypingArea({
  words,
  currentWordIndex,
  currentCharIndex,
  typedChars,
  isFocused,
  onFocus,
  timeLeft,
  timerDuration,
  isRunning,
  liveWpm,
}: TypingAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);

  // Scroll to keep active word visible
  useEffect(() => {
    if (activeWordRef.current && containerRef.current) {
      const wordEl = activeWordRef.current;
      const containerEl = containerRef.current;
      const wordTop = wordEl.offsetTop;
      const containerScroll = containerEl.scrollTop;
      const containerHeight = containerEl.clientHeight;

      if (wordTop > containerScroll + containerHeight - 50) {
        containerEl.scrollTo({
          top: wordTop - 20,
          behavior: "smooth",
        });
      }
    }
  }, [currentWordIndex]);

  const visibleRange = useMemo(() => {
    const start = Math.max(0, currentWordIndex - 40);
    const end = Math.min(words.length, currentWordIndex + 80);
    return { start, end };
  }, [currentWordIndex, words.length]);

  return (
    <div className="relative w-full max-w-[860px] mx-auto">
      {/* Timer + Live WPM display */}
      <div className="flex items-baseline gap-5 mb-8 min-h-[60px]">
        {timerDuration > 0 && (
          <div
            className="text-5xl font-extralight tracking-tight tabular-nums min-w-[80px]"
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-geist-mono)",
              opacity: isRunning ? 1 : 0.4,
              transition: "opacity 0.3s ease",
            }}
          >
            {timeLeft !== null ? timeLeft : timerDuration}
          </div>
        )}
        {/* Always reserve space for WPM to avoid layout shift */}
        <div
          className="flex items-baseline gap-1.5 min-w-[70px]"
          style={{
            opacity: isRunning && liveWpm > 0 ? 0.45 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <span
            className="text-2xl font-extralight tabular-nums"
            style={{
              color: "var(--text)",
              fontFamily: "var(--font-geist-mono)",
              minWidth: "40px",
              display: "inline-block",
            }}
          >
            {liveWpm}
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.15em]"
            style={{ color: "var(--text-dim)" }}
          >
            wpm
          </span>
        </div>
      </div>

      {/* Typing area - no top fade, only bottom fade */}
      <div
        ref={containerRef}
        onClick={onFocus}
        className="relative h-[140px] overflow-hidden cursor-text select-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        }}
      >
        <div
          className="flex flex-wrap gap-x-[10px] gap-y-[8px] leading-[1.7]"
          style={{
            fontSize: "22px",
            fontFamily: "var(--font-geist-mono)",
            letterSpacing: "0.02em",
          }}
        >
          {words.slice(visibleRange.start, visibleRange.end).map((word, idx) => {
            const actualIdx = visibleRange.start + idx;
            const isCurrentWord = actualIdx === currentWordIndex;
            const isTypedWord = actualIdx < currentWordIndex;
            const wordTyped = typedChars[actualIdx] || [];

            return (
              <span
                key={actualIdx}
                ref={isCurrentWord ? activeWordRef : null}
                className="relative inline-block"
              >
                {word.split("").map((char, charIdx) => {
                  let color = "var(--text-dim)";
                  let textDecoration = "none";

                  if (isTypedWord || (isCurrentWord && charIdx < currentCharIndex)) {
                    const typedChar = wordTyped[charIdx];
                    if (typedChar) {
                      color = typedChar.correct
                        ? "var(--text-correct)"
                        : "var(--text-error)";
                      if (!typedChar.correct) {
                        textDecoration = "underline";
                      }
                    }
                  }

                  const showCursor =
                    isFocused &&
                    isCurrentWord &&
                    charIdx === currentCharIndex &&
                    !isTypedWord;

                  return (
                    <span key={charIdx} className="relative inline-block">
                      {showCursor && (
                        <span
                          className="absolute left-0 top-[2px] bottom-[2px] w-[2.5px] cursor-blink rounded-full -translate-x-[1px]"
                          style={{ backgroundColor: "var(--cursor)" }}
                        />
                      )}
                      <span
                        style={{
                          color,
                          textDecoration,
                          textDecorationColor: "var(--text-error)",
                          textUnderlineOffset: "5px",
                          textDecorationThickness: "2px",
                          transition: "color 0.15s ease",
                        }}
                      >
                        {char}
                      </span>
                    </span>
                  );
                })}
                {/* Extra typed characters beyond word length */}
                {wordTyped.slice(word.length).map((typed, extraIdx) => (
                  <span
                    key={`extra-${extraIdx}`}
                    style={{
                      color: "var(--text-error)",
                      textDecoration: "underline",
                      textDecorationColor: "var(--text-error)",
                      textUnderlineOffset: "5px",
                      textDecorationThickness: "2px",
                      opacity: 0.8,
                    }}
                  >
                    {typed.char}
                  </span>
                ))}
                {/* Cursor at end of current word */}
                {isFocused &&
                  isCurrentWord &&
                  currentCharIndex >= word.length &&
                  currentCharIndex === wordTyped.length && (
                    <span
                      className="absolute top-[2px] bottom-[2px] w-[2.5px] cursor-blink rounded-full"
                      style={{
                        backgroundColor: "var(--cursor)",
                        right: "-2px",
                      }}
                    />
                  )}
              </span>
            );
          })}
        </div>
      </div>

      {/* Focus overlay */}
      {!isFocused && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl cursor-pointer"
          onClick={onFocus}
          style={{
            backgroundColor: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
          }}
        >
          <div
            className="px-6 py-3 rounded-xl text-sm font-medium focus-pulse"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-dim)",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            click or press any key to focus
          </div>
        </div>
      )}

      {/* Restart hint */}
      <div
        className="flex items-center justify-center gap-2 mt-8 text-sm transition-opacity duration-300"
        style={{
          color: "var(--text-dim)",
          opacity: isRunning ? 0.5 : 0,
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
        >
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
        <span className="tracking-wide">tab+enter or cmd+enter to restart</span>
      </div>
    </div>
  );
}
