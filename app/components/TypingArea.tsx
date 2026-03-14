"use client";

import React, { useEffect, useRef, useMemo, useCallback, memo } from "react";

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

// Memoized word component - only re-renders when its own data changes
const Word = memo(function Word({
  word,
  wordTyped,
  isCurrentWord,
  isTypedWord,
  currentCharIndex,
  wordRef,
}: {
  word: string;
  wordTyped: { char: string; correct: boolean }[];
  isCurrentWord: boolean;
  isTypedWord: boolean;
  currentCharIndex: number;
  wordRef: React.Ref<HTMLSpanElement> | null;
}) {
  return (
    <span ref={wordRef} className="relative inline-block">
      {word.split("").map((char, charIdx) => {
        let color = "var(--text-dim)";
        let textDecoration = "none";

        if (isTypedWord || (isCurrentWord && charIdx < currentCharIndex)) {
          const typedChar = wordTyped[charIdx];
          if (typedChar) {
            color = typedChar.correct ? "var(--text-correct)" : "var(--text-error)";
            if (!typedChar.correct) textDecoration = "underline";
          }
        }

        return (
          <span
            key={charIdx}
            data-char-idx={charIdx}
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
    </span>
  );
});

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
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const scrollOffsetRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Position cursor using offsetLeft/offsetTop (layout-based, not paint-based)
  // This gives us the FINAL position regardless of CSS transitions in progress
  const updateCursor = useCallback((instant?: boolean) => {
    if (!cursorRef.current || !activeWordRef.current || !wordsWrapperRef.current) return;

    const cursor = cursorRef.current;
    const wordEl = activeWordRef.current;
    const wrapperEl = wordsWrapperRef.current;

    const charSpans = wordEl.querySelectorAll<HTMLSpanElement>("[data-char-idx]");
    const totalChars = charSpans.length;

    let left: number;
    let top: number;
    let height: number;

    if (currentCharIndex < totalChars) {
      const charEl = charSpans[currentCharIndex];
      left = wordEl.offsetLeft + charEl.offsetLeft - 1;
      top = wordEl.offsetTop + charEl.offsetTop - scrollOffsetRef.current + 4;
      height = charEl.offsetHeight - 8;
    } else {
      const lastChild = wordEl.lastElementChild as HTMLElement;
      if (lastChild) {
        left = wordEl.offsetLeft + lastChild.offsetLeft + lastChild.offsetWidth + 1;
        top = wordEl.offsetTop + lastChild.offsetTop - scrollOffsetRef.current + 4;
        height = lastChild.offsetHeight - 8;
      } else {
        left = wordEl.offsetLeft - 1;
        top = wordEl.offsetTop - scrollOffsetRef.current + 4;
        height = wordEl.offsetHeight - 8;
      }
    }

    // On line change, skip the cursor transition so it doesn't animate
    // from the old line position to the new one
    if (instant) {
      cursor.style.transition = "none";
      cursor.style.transform = `translate(${left}px, ${top}px)`;
      cursor.style.height = `${height}px`;
      // Force reflow then re-enable transition
      cursor.offsetHeight;
      cursor.style.transition = "";
    } else {
      cursor.style.transform = `translate(${left}px, ${top}px)`;
      cursor.style.height = `${height}px`;
    }

    cursor.style.opacity = isFocused ? "1" : "0";
  }, [currentCharIndex, isFocused]);

  // On character change within same word - smooth cursor slide
  useEffect(() => {
    requestAnimationFrame(() => updateCursor(false));
  }, [currentCharIndex, updateCursor]);

  // Smooth scroll + cursor jump on word change
  const updateScroll = useCallback(() => {
    if (!activeWordRef.current || !wordsWrapperRef.current) return;

    const wordEl = activeWordRef.current;
    const wrapperEl = wordsWrapperRef.current;
    const wordTop = wordEl.offsetTop - wrapperEl.offsetTop;
    const lineH = wordEl.offsetHeight + 12;

    if (lineH <= 0) return;

    const targetScroll = Math.max(0, Math.floor(wordTop / lineH) * lineH);
    const scrollChanged = targetScroll !== scrollOffsetRef.current;

    if (scrollChanged) {
      scrollOffsetRef.current = targetScroll;
      wrapperEl.style.transform = `translateY(-${targetScroll}px)`;
    }

    // If scroll changed, jump cursor instantly (no slide from old line)
    // Otherwise smooth slide to new word position
    updateCursor(scrollChanged);
  }, [updateCursor]);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateScroll);
  }, [currentWordIndex, updateScroll]);

  useEffect(() => {
    if (wordsWrapperRef.current) {
      scrollOffsetRef.current = 0;
      wordsWrapperRef.current.style.transform = "translateY(0px)";
    }
  }, [words]);

  // Don't slice from the start - removing DOM nodes shifts offsetTop
  // and breaks scroll calculation. Only cap how far ahead we render.
  const visibleEnd = useMemo(() => {
    return Math.min(words.length, currentWordIndex + 80);
  }, [currentWordIndex, words.length]);

  return (
    <div className="relative w-full max-w-[920px] mx-auto">
      {/* Timer + Live WPM */}
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
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium" style={{ color: "var(--text-dim)" }}>
            wpm
          </span>
        </div>
      </div>

      {/* Typing area */}
      <div
        ref={containerRef}
        onClick={onFocus}
        className="relative overflow-hidden cursor-text select-none"
        style={{
          height: "190px",
          maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      >
        {/* Floating cursor - positioned via JS, animated via CSS */}
        <div
          ref={cursorRef}
          className="absolute left-0 top-0 w-[3px] rounded-full cursor-blink pointer-events-none z-10"
          style={{
            backgroundColor: "var(--cursor)",
            willChange: "transform, opacity",
            transition: "transform 0.1s cubic-bezier(0.22, 0.68, 0, 1), opacity 0.15s ease",
          }}
        />

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
          {words.slice(0, visibleEnd).map((word, idx) => {
            const actualIdx = idx;
            const isCurrentWord = actualIdx === currentWordIndex;
            const isTypedWord = actualIdx < currentWordIndex;
            const wordTyped = typedChars[actualIdx] || [];

            return (
              <Word
                key={actualIdx}
                word={word}
                wordTyped={wordTyped}
                isCurrentWord={isCurrentWord}
                isTypedWord={isTypedWord}
                currentCharIndex={currentCharIndex}
                wordRef={isCurrentWord ? activeWordRef : null}
              />
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
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
        style={{ color: "var(--text-dim)", opacity: isRunning ? 0.4 : 0 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
        </svg>
        <span className="tracking-wider">tab+enter or cmd+enter to restart</span>
      </div>
    </div>
  );
}
