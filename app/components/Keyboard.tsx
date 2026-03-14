"use client";

import React from "react";
import {
  IconSun,
  IconSunLow,
  IconLayoutGrid,
  IconSearch,
  IconMicrophone,
  IconMoon,
  IconPlayerTrackPrev,
  IconPlayerPlay,
  IconPlayerTrackNext,
  IconVolume3,
  IconVolume,
  IconVolume2,
  IconBrightnessUp,
  IconCommand,
  IconArrowBigUp,
  IconCornerDownLeft,
  IconBackspace,
  IconChevronUp,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

interface KeyboardProps {
  pressedKeys: Set<string>;
}

// ──── Key Component ────
function Key({
  code,
  label,
  subLabel,
  icon,
  subIcon,
  width = 1,
  height = 1,
  isPressed,
  isCorner,
  isFnRow,
}: {
  code: string;
  label?: string;
  subLabel?: string;
  icon?: React.ReactNode;
  subIcon?: React.ReactNode;
  width?: number;
  height?: number;
  isPressed: boolean;
  isCorner?: "tl" | "tr" | "bl" | "br";
  isFnRow?: boolean;
}) {
  const baseW = 56;
  const gap = 3;
  const w = baseW * width + gap * (width - 1);
  const h = isFnRow ? 30 : 44 * height;

  // Corner-specific rounding
  let borderRadius = "7px";
  if (isCorner === "tl") borderRadius = "12px 7px 7px 7px";
  else if (isCorner === "tr") borderRadius = "7px 12px 7px 7px";
  else if (isCorner === "bl") borderRadius = "7px 7px 7px 12px";
  else if (isCorner === "br") borderRadius = "7px 7px 12px 7px";

  return (
    <div
      className="flex flex-col items-center justify-center select-none cursor-default font-medium"
      style={{
        width: `${w}px`,
        height: `${h}px`,
        borderRadius,
        flexShrink: 0,
        backgroundColor: isPressed ? "var(--key-active)" : "var(--key-bg)",
        color: "var(--key-text)",
        transform: isPressed ? "scale(0.98) translateY(1px)" : "scale(1) translateY(0)",
        transition: "transform 0.06s ease, box-shadow 0.06s ease, background-color 0.06s ease",
        boxShadow: isPressed
          ? "inset 0 1px 3px rgba(0,0,0,0.15), 0 0 0 0.5px rgba(0,0,0,0.08)"
          : `inset 0 1px 0 rgba(255,255,255,0.7),
             inset 0 -1px 0 rgba(0,0,0,0.06),
             0 1px 2px rgba(0,0,0,0.08),
             0 0 0 0.5px rgba(0,0,0,0.06)`,
      }}
    >
      {/* Icon-only key (fn row with icons) */}
      {subIcon && !subLabel && (
        <div className="flex flex-col items-center gap-[1px]">
          <span style={{ opacity: 0.5 }}>{subIcon}</span>
          {label && (
            <span className="text-[8px] font-medium leading-none" style={{ opacity: 0.5 }}>
              {label}
            </span>
          )}
        </div>
      )}

      {/* Number key with symbol */}
      {subLabel && !subIcon && (
        <div className="flex flex-col items-center gap-[1px]">
          <span className="text-[9px] leading-none" style={{ opacity: 0.35 }}>
            {label}
          </span>
          <span className="text-[13px] font-semibold leading-none">
            {subLabel}
          </span>
        </div>
      )}

      {/* Icon-only (like backspace, return) */}
      {icon && !subLabel && !subIcon && (
        <span style={{ opacity: 0.8 }}>{icon}</span>
      )}

      {/* Text-only key */}
      {!subLabel && !subIcon && !icon && label && (
        <span
          className={`leading-none ${
            width > 1.3
              ? "text-[9px] tracking-wider"
              : isFnRow
              ? "text-[9px]"
              : "text-[13px] font-semibold"
          }`}
          style={{ opacity: width > 1.3 ? 0.7 : 1 }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

// ──── Keyboard Layout ────
export default function Keyboard({ pressedKeys }: KeyboardProps) {
  const p = (code: string) => pressedKeys.has(code);
  const gap = "3px";

  return (
    <div
      className="mx-auto select-none"
      style={{
        width: "fit-content",
        padding: "10px 10px 12px",
        borderRadius: "14px",
        background: "color-mix(in srgb, var(--bg-secondary) 80%, var(--bg) 20%)",
        boxShadow: `0 12px 40px rgba(0,0,0,0.3),
                     0 2px 8px rgba(0,0,0,0.2),
                     inset 0 0.5px 0 rgba(255,255,255,0.06)`,
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Function Row */}
      <div className="flex mb-[4px]" style={{ gap }}>
        <Key code="Escape" label="esc" isPressed={p("Escape")} isCorner="tl" isFnRow />
        <Key code="F1" label="F1" subIcon={<IconSunLow size={12} />} isPressed={p("F1")} isFnRow />
        <Key code="F2" label="F2" subIcon={<IconSun size={12} />} isPressed={p("F2")} isFnRow />
        <Key code="F3" label="F3" subIcon={<IconLayoutGrid size={12} />} isPressed={p("F3")} isFnRow />
        <Key code="F4" label="F4" subIcon={<IconSearch size={12} />} isPressed={p("F4")} isFnRow />
        <Key code="F5" label="F5" subIcon={<IconMicrophone size={12} />} isPressed={p("F5")} isFnRow />
        <Key code="F6" label="F6" subIcon={<IconMoon size={12} />} isPressed={p("F6")} isFnRow />
        <Key code="F7" label="F7" subIcon={<IconPlayerTrackPrev size={12} />} isPressed={p("F7")} isFnRow />
        <Key code="F8" label="F8" subIcon={<IconPlayerPlay size={12} />} isPressed={p("F8")} isFnRow />
        <Key code="F9" label="F9" subIcon={<IconPlayerTrackNext size={12} />} isPressed={p("F9")} isFnRow />
        <Key code="F10" label="F10" subIcon={<IconVolume3 size={12} />} isPressed={p("F10")} isFnRow />
        <Key code="F11" label="F11" subIcon={<IconVolume size={12} />} isPressed={p("F11")} isFnRow />
        <Key code="F12" label="F12" subIcon={<IconVolume2 size={12} />} isPressed={p("F12")} isFnRow />
        <Key code="Delete" label="" icon={<IconBrightnessUp size={14} />} isPressed={p("Delete")} isCorner="tr" isFnRow />
      </div>

      {/* Number Row */}
      <div className="flex mb-[3px]" style={{ gap }}>
        <Key code="Backquote" label="~" subLabel="`" isPressed={p("Backquote")} />
        <Key code="Digit1" label="!" subLabel="1" isPressed={p("Digit1")} />
        <Key code="Digit2" label="@" subLabel="2" isPressed={p("Digit2")} />
        <Key code="Digit3" label="#" subLabel="3" isPressed={p("Digit3")} />
        <Key code="Digit4" label="$" subLabel="4" isPressed={p("Digit4")} />
        <Key code="Digit5" label="%" subLabel="5" isPressed={p("Digit5")} />
        <Key code="Digit6" label="^" subLabel="6" isPressed={p("Digit6")} />
        <Key code="Digit7" label="&" subLabel="7" isPressed={p("Digit7")} />
        <Key code="Digit8" label="*" subLabel="8" isPressed={p("Digit8")} />
        <Key code="Digit9" label="(" subLabel="9" isPressed={p("Digit9")} />
        <Key code="Digit0" label=")" subLabel="0" isPressed={p("Digit0")} />
        <Key code="Minus" label="_" subLabel="-" isPressed={p("Minus")} />
        <Key code="Equal" label="+" subLabel="=" isPressed={p("Equal")} />
        <Key code="Backspace" icon={<IconBackspace size={16} />} isPressed={p("Backspace")} width={1.52} />
      </div>

      {/* QWERTY Row */}
      <div className="flex mb-[3px]" style={{ gap }}>
        <Key code="Tab" label="tab" isPressed={p("Tab")} width={1.52} />
        <Key code="KeyQ" label="Q" isPressed={p("KeyQ")} />
        <Key code="KeyW" label="W" isPressed={p("KeyW")} />
        <Key code="KeyE" label="E" isPressed={p("KeyE")} />
        <Key code="KeyR" label="R" isPressed={p("KeyR")} />
        <Key code="KeyT" label="T" isPressed={p("KeyT")} />
        <Key code="KeyY" label="Y" isPressed={p("KeyY")} />
        <Key code="KeyU" label="U" isPressed={p("KeyU")} />
        <Key code="KeyI" label="I" isPressed={p("KeyI")} />
        <Key code="KeyO" label="O" isPressed={p("KeyO")} />
        <Key code="KeyP" label="P" isPressed={p("KeyP")} />
        <Key code="BracketLeft" label="{" subLabel="[" isPressed={p("BracketLeft")} />
        <Key code="BracketRight" label="}" subLabel="]" isPressed={p("BracketRight")} />
        <Key code="Backslash" label="|" subLabel="\\" isPressed={p("Backslash")} />
      </div>

      {/* Home Row */}
      <div className="flex mb-[3px]" style={{ gap }}>
        <Key code="CapsLock" label="caps lock" isPressed={p("CapsLock")} width={1.85} />
        <Key code="KeyA" label="A" isPressed={p("KeyA")} />
        <Key code="KeyS" label="S" isPressed={p("KeyS")} />
        <Key code="KeyD" label="D" isPressed={p("KeyD")} />
        <Key code="KeyF" label="F" isPressed={p("KeyF")} />
        <Key code="KeyG" label="G" isPressed={p("KeyG")} />
        <Key code="KeyH" label="H" isPressed={p("KeyH")} />
        <Key code="KeyJ" label="J" isPressed={p("KeyJ")} />
        <Key code="KeyK" label="K" isPressed={p("KeyK")} />
        <Key code="KeyL" label="L" isPressed={p("KeyL")} />
        <Key code="Semicolon" label=":" subLabel=";" isPressed={p("Semicolon")} />
        <Key code="Quote" label={'"'} subLabel="'" isPressed={p("Quote")} />
        <Key code="Enter" label="" icon={<IconCornerDownLeft size={16} />} isPressed={p("Enter")} width={1.68} />
      </div>

      {/* Shift Row */}
      <div className="flex mb-[3px]" style={{ gap }}>
        <Key code="ShiftLeft" label="" icon={<IconArrowBigUp size={16} />} isPressed={p("ShiftLeft")} width={2.35} />
        <Key code="KeyZ" label="Z" isPressed={p("KeyZ")} />
        <Key code="KeyX" label="X" isPressed={p("KeyX")} />
        <Key code="KeyC" label="C" isPressed={p("KeyC")} />
        <Key code="KeyV" label="V" isPressed={p("KeyV")} />
        <Key code="KeyB" label="B" isPressed={p("KeyB")} />
        <Key code="KeyN" label="N" isPressed={p("KeyN")} />
        <Key code="KeyM" label="M" isPressed={p("KeyM")} />
        <Key code="Comma" label="<" subLabel="," isPressed={p("Comma")} />
        <Key code="Period" label=">" subLabel="." isPressed={p("Period")} />
        <Key code="Slash" label="?" subLabel="/" isPressed={p("Slash")} />
        <Key code="ShiftRight" label="" icon={<IconArrowBigUp size={16} />} isPressed={p("ShiftRight")} width={2.35} />
      </div>

      {/* Bottom Row */}
      <div className="flex" style={{ gap }}>
        <Key code="Fn" label="fn" isPressed={p("Fn")} isCorner="bl" />
        <Key code="ControlLeft" label="ctrl" isPressed={p("ControlLeft")} width={1.05} />
        <Key code="AltLeft" label="opt" isPressed={p("AltLeft")} width={1.05} />
        <Key code="MetaLeft" label="" icon={<IconCommand size={14} />} isPressed={p("MetaLeft")} width={1.3} />
        <Key code="Space" label="" isPressed={p("Space")} width={5.65} />
        <Key code="MetaRight" label="" icon={<IconCommand size={14} />} isPressed={p("MetaRight")} width={1.3} />
        <Key code="AltRight" label="opt" isPressed={p("AltRight")} width={1.05} />
        {/* Arrow cluster */}
        <div className="flex flex-col" style={{ gap }}>
          <Key code="ArrowUp" icon={<IconChevronUp size={12} />} isPressed={p("ArrowUp")} height={0.48} />
          <div className="flex" style={{ gap }}>
            <Key code="ArrowLeft" icon={<IconChevronLeft size={12} />} isPressed={p("ArrowLeft")} height={0.48} isCorner="bl" />
            <Key code="ArrowDown" icon={<IconChevronDown size={12} />} isPressed={p("ArrowDown")} height={0.48} />
            <Key code="ArrowRight" icon={<IconChevronRight size={12} />} isPressed={p("ArrowRight")} height={0.48} isCorner="br" />
          </div>
        </div>
      </div>
    </div>
  );
}
