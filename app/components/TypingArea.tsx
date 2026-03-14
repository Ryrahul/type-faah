"use client";

import React, { useEffect, useRef, useMemo, useCallback } from "react";

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
  const activeWordRef = useRef<HTMLSpanElement>(null);
  const wordsWrapperRef = useRef<HTMLDivElement>(null);
  const scrollOffsetRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Smooth scroll: directly mutate the DOM transform via rAF
  // instead of going through React state (avoids re-render on scroll)
  const updateScroll = useCallback(() => {
    if (!activeWordRef.current || !wordsWrapperRef.current) return;

    const wordEl = activeWordRef.current;
    const wrapperEl = wordsWrapperRef.current;
    const wordTop = wordEl.offsetTop - wrapperEl.offsetTop;
    const lineH = wordEl.offsetHeight + 12;

    if (lineH <= 0) return;

    const targetScroll = Math.max(0, Math.floor(wordTop / lineH) * lineH);

    if (targetScroll !== scrollOffsetRef.current) {
      scrollOffsetRef.current = targetScroll;
      // Direct DOM mutation - no React re-render, pure GPU animation
      wrapperEl.style.transform = `translateY(-${targetScroll}px)`;
    }
  }, []);

  // Run scroll check whenever word changes
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateScroll);
  }, [currentWordIndex, updateScroll]);

  // Reset scroll on word list change (restart)
  useEffect(() => {
    if (wordsWrapperRef.current) {
      scrollOffsetRef.current = 0;
      wordsWrapperRef.current.style.transform = "translateY(0px)";
    }
  }, [words]);

  const visibleRange = useMemo(() => {
    const start = Math.max(0, currentWordIndex - 30);
    const end = Math.min(words.length, currentWordIndex + 60);
    return { start, end };
  }, [currentWordIndex, words.length]);

  return (
    <div className="relative w-full max-w-[920px] mx-auto">
      {/* Timer + Live WPM display */}
      <div className="flex items-baseline gap-5 mb-10 min-h-[64px]">
        {timerDuration > 0 && (
          <div
            className="text-6xl font-extralight tracking-tight tabular-nums min-w-[90px]"
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-geist-mono)",
              opacity: isRunning ? 1 : 0.35,
              transition: "opacity 0.5s ease",
            }}
          >
            {timeLeft !== null ? timeLeft : timerDuration}
          </div>
        )}
        <div
          className="flex items-baseline gap-1.5 min-w-[80px]"
          style={{
            opacity: isRunning && liveWpm > 0 ? 0.4 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <span
            className="text-3xl font-extralight tabular-nums"
            style={{
              color: "var(--text)",
              fontFamily: "var(--font-geist-mono)",
              minWidth: "48px",
              display: "inline-block",
            }}
          >
            {liveWpm}
          </span>
          <span
            className="text-[11px] uppercase tracking-[0.2em] font-medium"
            style={{ color: "var(--text-dim)" }}
          >
            wpm
          </span>
        </div>
      </div>

      {/* Typing area */}
      <div
        onClick={onFocus}
        className="relative overflow-hidden cursor-text select-none"
        style={{
          height: "190px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      >
        <div
          ref={wordsWrapperRef}
          className="flex flex-wrap gap-x-[16px] gap-y-[12px]"
          style={{
            fontSize: "32px",
            fontFamily: "var(--font-geist-mono)",
            letterSpacing: "0.01em",
            lineHeight: "1.75",
            willChange: "transform",
            transition: "transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)",
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
                          className="absolute left-0 top-[5px] bottom-[5px] w-[3px] cursor-blink rounded-full -translate-x-[1px]"
                          style={{ backgroundColor: "var(--cursor)" }}
                        />
                      )}
                      <span
                        style={{
                          color,
                          textDecoration,
                          textDecorationColor: "var(--text-error)",
                          textUnderlineOffset: "6px",
                          textDecorationThickness: "2.5px",
                        }}
                      >
                        {char}
                      </span>
                    </span>
                  );
                })}
                {wordTyped.slice(word.length).map((typed, extraIdx) => (
                  <span
                    key={`extra-${extraIdx}`}
                    style={{
                      color: "var(--text-error)",
                      textDecoration: "underline",
                      textDecorationColor: "var(--text-error)",
                      textUnderlineOffset: "6px",
                      textDecorationThickness: "2.5px",
                      opacity: 0.8,
                    }}
                  >
                    {typed.char}
                  </span>
                ))}
                {isFocused &&
                  isCurrentWord &&
                  currentCharIndex >= word.length &&
                  currentCharIndex === wordTyped.length && (
                    <span
                      className="absolute top-[5px] bottom-[5px] w-[3px] cursor-blink rounded-full"
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
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={onFocus}
          style={{
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        >
          <div
            className="flex items-center gap-3 px-8 py-4 rounded-2xl text-[14px] tracking-wider focus-pulse"
            style={{ color: "var(--text-dim)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.5 }}
            >
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            click or press any key to focus
          </div>
        </div>
      )}

      {/* Restart hint */}
      <div
        className="flex items-center justify-center gap-2.5 mt-8 text-[13px] transition-opacity duration-500"
        style={{
          color: "var(--text-dim)",
          opacity: isRunning ? 0.4 : 0,
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
        <span className="tracking-wider">tab+enter or cmd+enter to restart</span>
      </div>
    </div>
  );
}
