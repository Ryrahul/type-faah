"use client";

import React from "react";

interface KeyboardProps {
  pressedKeys: Set<string>;
}

interface KeyConfig {
  key: string;
  label?: string;
  subLabel?: string;
  subIcon?: string;
  width?: number;
}

const keyboardRows: KeyConfig[][] = [
  // Function row
  [
    { key: "Escape", label: "esc", width: 1.1 },
    { key: "F1", subIcon: "\u2600", label: "F1" },
    { key: "F2", subIcon: "\u2600", label: "F2" },
    { key: "F3", subIcon: "\u2395", label: "F3" },
    { key: "F4", subIcon: "\u2315", label: "F4" },
    { key: "F5", subIcon: "\u266A", label: "F5" },
    { key: "F6", subIcon: "\u263D", label: "F6" },
    { key: "F7", subIcon: "\u23EA", label: "F7" },
    { key: "F8", subIcon: "\u23EF", label: "F8" },
    { key: "F9", subIcon: "\u23E9", label: "F9" },
    { key: "F10", subIcon: "\u266A", label: "F10" },
    { key: "F11", subIcon: "\u266A", label: "F11" },
    { key: "F12", subIcon: "\u266B", label: "F12" },
    { key: "Delete", label: "del" },
  ],
  // Number row
  [
    { key: "Backquote", label: "~", subLabel: "`" },
    { key: "Digit1", label: "!", subLabel: "1" },
    { key: "Digit2", label: "@", subLabel: "2" },
    { key: "Digit3", label: "#", subLabel: "3" },
    { key: "Digit4", label: "$", subLabel: "4" },
    { key: "Digit5", label: "%", subLabel: "5" },
    { key: "Digit6", label: "^", subLabel: "6" },
    { key: "Digit7", label: "&", subLabel: "7" },
    { key: "Digit8", label: "*", subLabel: "8" },
    { key: "Digit9", label: "(", subLabel: "9" },
    { key: "Digit0", label: ")", subLabel: "0" },
    { key: "Minus", label: "\u2014", subLabel: "-" },
    { key: "Equal", label: "+", subLabel: "=" },
    { key: "Backspace", label: "\u2190", width: 1.5 },
  ],
  // QWERTY row
  [
    { key: "Tab", label: "tab", width: 1.5 },
    { key: "KeyQ", label: "Q" },
    { key: "KeyW", label: "W" },
    { key: "KeyE", label: "E" },
    { key: "KeyR", label: "R" },
    { key: "KeyT", label: "T" },
    { key: "KeyY", label: "Y" },
    { key: "KeyU", label: "U" },
    { key: "KeyI", label: "I" },
    { key: "KeyO", label: "O" },
    { key: "KeyP", label: "P" },
    { key: "BracketLeft", label: "{", subLabel: "[" },
    { key: "BracketRight", label: "}", subLabel: "]" },
    { key: "Backslash", label: "|", subLabel: "\\" },
  ],
  // Home row
  [
    { key: "CapsLock", label: "caps lock", width: 1.8 },
    { key: "KeyA", label: "A" },
    { key: "KeyS", label: "S" },
    { key: "KeyD", label: "D" },
    { key: "KeyF", label: "F" },
    { key: "KeyG", label: "G" },
    { key: "KeyH", label: "H" },
    { key: "KeyJ", label: "J" },
    { key: "KeyK", label: "K" },
    { key: "KeyL", label: "L" },
    { key: "Semicolon", label: ":", subLabel: ";" },
    { key: "Quote", label: '"', subLabel: "'" },
    { key: "Enter", label: "return", width: 1.7 },
  ],
  // Bottom row
  [
    { key: "ShiftLeft", label: "shift", width: 2.25 },
    { key: "KeyZ", label: "Z" },
    { key: "KeyX", label: "X" },
    { key: "KeyC", label: "C" },
    { key: "KeyV", label: "V" },
    { key: "KeyB", label: "B" },
    { key: "KeyN", label: "N" },
    { key: "KeyM", label: "M" },
    { key: "Comma", label: "<", subLabel: "," },
    { key: "Period", label: ">", subLabel: "." },
    { key: "Slash", label: "?", subLabel: "/" },
    { key: "ShiftRight", label: "shift", width: 2.25 },
  ],
  // Space row
  [
    { key: "Fn", label: "fn", width: 1 },
    { key: "ControlLeft", label: "ctrl", width: 1.25 },
    { key: "AltLeft", label: "opt", width: 1.25 },
    { key: "MetaLeft", label: "cmd", width: 1.5 },
    { key: "Space", label: "", width: 5.5 },
    { key: "MetaRight", label: "cmd", width: 1.5 },
    { key: "AltRight", label: "opt", width: 1.25 },
  ],
];

// Side labels
const sideLabelsMap: Record<number, string> = {
  2: "pgup",
  3: "pgdn",
  5: "home",
  6: "end",
};

// Accent colored modifier keys
const accentKeys = new Set([
  "Escape", "Tab", "CapsLock", "ShiftLeft", "ShiftRight", "Enter",
  "ControlLeft", "ControlRight", "AltLeft", "AltRight",
  "MetaLeft", "MetaRight", "Fn",
]);

// Muted alt-colored keys
const altKeys = new Set([
  "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
  "Delete", "Backspace",
  "Backquote", "BracketLeft", "BracketRight", "Backslash",
  "Semicolon", "Quote", "Comma", "Period", "Slash",
  "Minus", "Equal",
]);

function getKeyStyle(keyCode: string, isPressed: boolean) {
  const isAccent = accentKeys.has(keyCode);
  const isAlt = altKeys.has(keyCode);

  let bg = "var(--key-bg)";
  if (isAccent) bg = "var(--key-bg-accent)";
  else if (isAlt) bg = "var(--key-bg-alt)";
  if (isPressed) bg = "var(--key-active)";

  return {
    backgroundColor: bg,
    color: "var(--key-text)",
    boxShadow: isPressed
      ? `0 1px 0 0 var(--key-shadow),
         inset 0 1px 2px rgba(0,0,0,0.1)`
      : `0 4px 0 0 var(--key-shadow),
         0 6px 10px rgba(0,0,0,0.15),
         inset 0 1px 0 rgba(255,255,255,0.5),
         inset 0 -1px 0 rgba(0,0,0,0.08)`,
    transform: isPressed ? "translateY(3px)" : "translateY(0)",
    transition: "transform 0.05s ease-out, box-shadow 0.05s ease-out, background-color 0.05s ease-out",
  };
}

// Key size constants
const GAP = 5;
const BASE = 70;

export default function Keyboard({ pressedKeys }: KeyboardProps) {
  return (
    <div
      className="mx-auto"
      style={{
        width: "fit-content",
        padding: "18px 24px 24px 24px",
        borderRadius: "18px",
        background:
          "linear-gradient(170deg, color-mix(in srgb, var(--bg-secondary) 90%, white 10%) 0%, var(--bg-secondary) 40%, color-mix(in srgb, var(--bg-secondary) 85%, black 15%) 100%)",
        boxShadow:
          `0 20px 60px rgba(0,0,0,0.4),
           0 4px 12px rgba(0,0,0,0.25),
           inset 0 1px 0 rgba(255,255,255,0.08),
           inset 0 -1px 0 rgba(0,0,0,0.2)`,
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {keyboardRows.map((row, rowIdx) => {
        const isFnRow = rowIdx === 0;
        const sideLabel = sideLabelsMap[rowIdx];

        return (
          <div
            key={rowIdx}
            className={`flex items-center ${isFnRow ? "mb-[8px]" : rowIdx < keyboardRows.length - 1 ? "mb-[5px]" : ""}`}
          >
            {/* Keys */}
            <div className="flex" style={{ gap: `${GAP}px` }}>
              {row.map((keyConfig) => {
                const isPressed = pressedKeys.has(keyConfig.key);
                const w = keyConfig.width || 1;
                const keyWidth = BASE * w + GAP * (w - 1);
                const keyHeight = isFnRow ? 38 : 52;

                return (
                  <div
                    key={keyConfig.key}
                    className="flex flex-col items-center justify-center font-medium select-none cursor-default"
                    style={{
                      ...getKeyStyle(keyConfig.key, isPressed),
                      width: `${keyWidth}px`,
                      height: `${keyHeight}px`,
                      borderRadius: "10px",
                      flexShrink: 0,
                    }}
                  >
                    {keyConfig.subLabel ? (
                      <div className="flex flex-col items-center gap-[2px]">
                        <span className="text-[9px] opacity-45 leading-none">
                          {keyConfig.label}
                        </span>
                        <span className="text-[14px] font-semibold leading-none">
                          {keyConfig.subLabel}
                        </span>
                      </div>
                    ) : isFnRow && keyConfig.subIcon ? (
                      <div className="flex flex-col items-center gap-[3px]">
                        <span className="text-[10px] opacity-40 leading-none">
                          {keyConfig.subIcon}
                        </span>
                        <span className="text-[10px] font-medium leading-none opacity-70">
                          {keyConfig.label}
                        </span>
                      </div>
                    ) : (
                      <span
                        className={`${
                          w > 1.3
                            ? "text-[11px] tracking-wide"
                            : isFnRow
                            ? "text-[10px]"
                            : "text-[15px] font-semibold"
                        }`}
                      >
                        {keyConfig.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Side label column */}
            {rowIdx > 0 && (
              <div
                className="text-[9px] font-medium tracking-[0.15em] text-center select-none flex-shrink-0"
                style={{
                  color: "var(--text-dim)",
                  opacity: sideLabel ? 0.35 : 0,
                  width: "52px",
                  marginLeft: "10px",
                }}
              >
                {sideLabel || "\u00A0"}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
