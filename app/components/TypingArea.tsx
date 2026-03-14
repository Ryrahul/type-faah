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
      {/* Timer display */}
      {timerDuration > 0 && (
        <div
          className="text-5xl font-extralight mb-8 tracking-tight"
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

      {/* Typing area */}
      <div
        ref={containerRef}
        onClick={onFocus}
        className="relative h-[130px] overflow-hidden cursor-text select-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 65%, transparent 100%)",
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
        className="flex items-center justify-center gap-2 mt-10 text-sm transition-opacity duration-300"
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
