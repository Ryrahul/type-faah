"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Header from "./components/Header";
import TypingArea from "./components/TypingArea";
import Keyboard from "./components/Keyboard";
import Results from "./components/Results";
import { generateWords } from "./lib/words";
import type { WordMode } from "./lib/words";
import { playKeySound, playSpaceSound, playCompleteSound, playMistakeSoundByIndex } from "./lib/sounds";
import type { SoundProfile } from "./lib/sounds";

type GameState = "idle" | "running" | "finished";

interface TypedChar {
  char: string;
  correct: boolean;
}

export default function Home() {
  // Theme & timer & sound
  const [theme, setTheme] = useState("default");
  const [timerDuration, setTimerDuration] = useState(30);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundProfile, setSoundProfile] = useState<SoundProfile>("thock");
  const [mistakeThreshold1, setMistakeThreshold1] = useState(5);
  const [mistakeThreshold2, setMistakeThreshold2] = useState(10);
  const [wordMode, setWordMode] = useState<WordMode>("curse");

  // Game state
  const [gameState, setGameState] = useState<GameState>("idle");
  const [words, setWords] = useState<string[]>(() => generateWords(200, "curse"));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typedChars, setTypedChars] = useState<TypedChar[][]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  // Timer
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stats
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [liveWpm, setLiveWpm] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;
  const soundProfileRef = useRef(soundProfile);
  soundProfileRef.current = soundProfile;
  const correctCharsRef = useRef(correctChars);
  correctCharsRef.current = correctChars;
  const incorrectCharsRef = useRef(incorrectChars);
  incorrectCharsRef.current = incorrectChars;
  const mt1Ref = useRef(mistakeThreshold1);
  mt1Ref.current = mistakeThreshold1;
  const mt2Ref = useRef(mistakeThreshold2);
  mt2Ref.current = mistakeThreshold2;
  const wordModeRef = useRef(wordMode);
  wordModeRef.current = wordMode;

  // Live WPM calculation
  useEffect(() => {
    if (gameState !== "running" || !startTime) {
      setLiveWpm(0);
      return;
    }

    const wpmInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const minutes = elapsed / 60;
      if (minutes > 0) {
        setLiveWpm(Math.round(correctCharsRef.current / 5 / minutes));
      }
    }, 1000);

    return () => clearInterval(wpmInterval);
  }, [gameState, startTime]);

  // Apply theme
  useEffect(() => {
    if (theme === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // Timer logic
  useEffect(() => {
    if (gameState === "running" && timerDuration > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            finishGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, timerDuration]);

  const finishGame = useCallback(() => {
    setGameState("finished");
    setEndTime(Date.now());
    setIsFocused(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (soundEnabledRef.current) playCompleteSound();
  }, []);

  const startGame = useCallback(() => {
    setGameState("running");
    setStartTime(Date.now());
    if (timerDuration > 0) {
      setTimeLeft(timerDuration);
    }
  }, [timerDuration]);

  const restartGame = useCallback(() => {
    setGameState("idle");
    setWords(generateWords(200, wordModeRef.current));
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setTypedChars([]);
    setTimeLeft(null);
    setStartTime(null);
    setEndTime(null);
    setCorrectChars(0);
    setIncorrectChars(0);
    setTotalCharsTyped(0);
    setLiveWpm(0);
    setPressedKeys(new Set());
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimeout(() => {
      inputRef.current?.focus();
      setIsFocused(true);
    }, 50);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    inputRef.current?.focus();
  }, []);

  // Handle keyboard input
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent | KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        restartGame();
        return;
      }

      if (gameState === "finished") return;
      if (!isFocused) {
        setIsFocused(true);
        inputRef.current?.focus();
      }

      setPressedKeys((prev) => new Set(prev).add(e.code));

      const currentWord = words[currentWordIndex];
      if (!currentWord) return;

      if (e.key === "Backspace") {
        e.preventDefault();
        if (currentCharIndex > 0) {
          if (soundEnabledRef.current) playKeySound(soundProfileRef.current, true);
          setCurrentCharIndex((prev) => prev - 1);
          setTypedChars((prev) => {
            const newTyped = [...prev];
            const wordChars = [...(newTyped[currentWordIndex] || [])];
            wordChars.pop();
            newTyped[currentWordIndex] = wordChars;
            return newTyped;
          });
        }
        return;
      }

      if (e.key === " ") {
        e.preventDefault();
        if (currentCharIndex === 0) return;

        if (soundEnabledRef.current) playSpaceSound(soundProfileRef.current);

        setCurrentWordIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
        setTotalCharsTyped((prev) => prev + 1);

        if (currentWordIndex >= words.length - 20) {
          setWords((prev) => [...prev, ...generateWords(100, wordModeRef.current)]);
        }
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();

        if (gameState === "idle") {
          startGame();
        }

        const isCorrect = e.key === currentWord[currentCharIndex];

        if (isCorrect) {
          setCorrectChars((prev) => prev + 1);
        } else {
          setIncorrectChars((prev) => prev + 1);
          // Play mistake sounds cycling through 3 sounds
          // At every interval: sound 0 → sound 1 → sound 2 → sound 0 → ...
          const newCount = incorrectCharsRef.current + 1;
          if (soundEnabledRef.current && mt1Ref.current > 0 && newCount % mt1Ref.current === 0) {
            const cycle = (newCount / mt1Ref.current) - 1; // 0, 1, 2, 3, 4...
            playMistakeSoundByIndex(cycle % 3); // rotates through 3 sounds
          }
        }
        setTotalCharsTyped((prev) => prev + 1);

        if (soundEnabledRef.current) playKeySound(soundProfileRef.current, isCorrect);

        setTypedChars((prev) => {
          const newTyped = [...prev];
          const wordChars = [...(newTyped[currentWordIndex] || [])];
          wordChars.push({ char: e.key, correct: isCorrect });
          newTyped[currentWordIndex] = wordChars;
          return newTyped;
        });

        setCurrentCharIndex((prev) => prev + 1);
      }
    },
    [
      gameState,
      isFocused,
      words,
      currentWordIndex,
      currentCharIndex,
      startGame,
      restartGame,
    ]
  );

  const handleKeyUp = useCallback((e: React.KeyboardEvent | KeyboardEvent) => {
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.delete(e.code);
      return next;
    });
  }, []);

  // Global keyboard listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        e.target !== inputRef.current &&
        e.target.tagName === "INPUT"
      ) {
        return;
      }
      handleKeyDown(e);
    };

    const handleGlobalKeyUp = (e: KeyboardEvent) => {
      handleKeyUp(e);
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    window.addEventListener("keyup", handleGlobalKeyUp);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
      window.removeEventListener("keyup", handleGlobalKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Calculate results
  const getResults = useCallback(() => {
    const elapsed = endTime && startTime ? (endTime - startTime) / 1000 : timerDuration;
    const minutes = elapsed / 60;
    const wpm = minutes > 0 ? Math.round(correctChars / 5 / minutes) : 0;
    const rawWpm =
      minutes > 0 ? Math.round(totalCharsTyped / 5 / minutes) : 0;
    const accuracy =
      totalCharsTyped > 0
        ? Math.round((correctChars / totalCharsTyped) * 100)
        : 100;

    return {
      wpm,
      rawWpm,
      accuracy,
      correctChars,
      incorrectChars,
      totalChars: totalCharsTyped,
      timeElapsed: Math.round(elapsed),
    };
  }, [
    endTime,
    startTime,
    timerDuration,
    correctChars,
    incorrectChars,
    totalCharsTyped,
  ]);

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-400 pt-4"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0 w-0 h-0"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />

      <Header
        currentTheme={theme}
        onThemeChange={setTheme}
        currentTimer={timerDuration}
        onTimerChange={(t) => {
          setTimerDuration(t);
          restartGame();
        }}
        isRunning={gameState === "running"}
        soundEnabled={soundEnabled}
        onSoundToggle={() => setSoundEnabled((prev) => !prev)}
        soundProfile={soundProfile}
        onSoundProfileChange={setSoundProfile}
        mistakeThreshold1={mistakeThreshold1}
        mistakeThreshold2={mistakeThreshold2}
        onMistakeThreshold1Change={setMistakeThreshold1}
        onMistakeThreshold2Change={setMistakeThreshold2}
        wordMode={wordMode}
        onWordModeChange={(mode) => {
          setWordMode(mode);
          wordModeRef.current = mode; // update ref immediately
          restartGame();
        }}
      />

      <main className="flex-1 flex flex-col items-center justify-center px-8">
        {gameState === "finished" ? (
          <Results {...getResults()} onRestart={restartGame} />
        ) : (
          <TypingArea
            words={words}
            currentWordIndex={currentWordIndex}
            currentCharIndex={currentCharIndex}
            typedChars={typedChars}
            isFocused={isFocused}
            onFocus={handleFocus}
            timeLeft={timeLeft}
            timerDuration={timerDuration}
            isRunning={gameState === "running"}
            liveWpm={liveWpm}
          />
        )}
      </main>

      {gameState !== "finished" && (
        <footer className="pb-6 pt-4 flex justify-center overflow-x-auto">
          <Keyboard pressedKeys={pressedKeys} />
        </footer>
      )}
    </div>
  );
}
