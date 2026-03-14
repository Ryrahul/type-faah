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

// ─── Reusable Key Component ───
function Key({
  code,
  label,
  symbol,
  icon,
  fnIcon,
  w = 1,
  halfH,
  isPressed,
  corner,
  isFn,
}: {
  code: string;
  label?: string;
  symbol?: string;
  icon?: React.ReactNode;
  fnIcon?: React.ReactNode;
  w?: number;
  halfH?: boolean;
  isPressed: boolean;
  corner?: "tl" | "tr" | "bl" | "br";
  isFn?: boolean;
}) {
  const BASE = 64;
  const GAP = 4;
  const width = BASE * w + GAP * Math.max(0, w - 1);
  const height = isFn ? 34 : halfH ? 22 : 48;

  let radius = "8px";
  if (corner === "tl") radius = "14px 8px 8px 8px";
  else if (corner === "tr") radius = "8px 14px 8px 8px";
  else if (corner === "bl") radius = "8px 8px 8px 14px";
  else if (corner === "br") radius = "8px 8px 14px 8px";

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: radius,
        flexShrink: 0,
        backgroundColor: isPressed ? "var(--key-bg-accent)" : "var(--key-bg)",
        color: "var(--key-text)",
        transform: isPressed ? "scale(0.95) translateY(2px)" : "scale(1) translateY(0)",
        transition: "transform 0.04s ease, box-shadow 0.04s ease, background-color 0.04s ease",
        boxShadow: isPressed
          ? `inset 0 2px 6px rgba(0,0,0,0.2),
             0 0 0 0.5px rgba(0,0,0,0.15)`
          : `inset 0 1px 0 0 rgba(255,255,255,0.8),
             0 1px 2px rgba(0,0,0,0.06),
             0 1px 0 rgba(0,0,0,0.04),
             0 0 0 0.5px rgba(0,0,0,0.08)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "default",
        userSelect: "none",
        gap: "1px",
      }}
    >
      {/* Fn row: icon + label */}
      {fnIcon && (
        <>
          <span style={{ opacity: 0.45, lineHeight: 1 }}>{fnIcon}</span>
          {label && <span style={{ fontSize: "9px", opacity: 0.4, lineHeight: 1 }}>{label}</span>}
        </>
      )}

      {/* Number row: symbol above number */}
      {symbol && !fnIcon && (
        <>
          <span style={{ fontSize: "10px", opacity: 0.3, lineHeight: 1, fontWeight: 500 }}>{symbol}</span>
          <span style={{ fontSize: "14px", fontWeight: 600, lineHeight: 1 }}>{label}</span>
        </>
      )}

      {/* Icon key */}
      {icon && !symbol && !fnIcon && (
        <span style={{ opacity: 0.65, lineHeight: 1 }}>{icon}</span>
      )}

      {/* Plain text key */}
      {!symbol && !fnIcon && !icon && label && (
        <span
          style={{
            fontSize: w > 1.3 ? "10px" : isFn ? "10px" : "14px",
            fontWeight: w > 1.3 ? 500 : 600,
            opacity: w > 1.3 ? 0.55 : 1,
            lineHeight: 1,
            letterSpacing: w > 1.3 ? "0.04em" : undefined,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

// ─── Main Keyboard ───
export default function Keyboard({ pressedKeys }: KeyboardProps) {
  const k = (code: string) => pressedKeys.has(code);
  const G = "4px";

  return (
    <div
      className="mx-auto"
      style={{
        width: "fit-content",
        padding: "12px 12px 14px",
        borderRadius: "16px",
        background: "color-mix(in srgb, var(--bg-secondary) 85%, var(--bg) 15%)",
        boxShadow: `0 16px 50px rgba(0,0,0,0.35),
                     0 4px 12px rgba(0,0,0,0.2),
                     inset 0 0.5px 0 rgba(255,255,255,0.06)`,
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Row 0: Function keys */}
      <div style={{ display: "flex", gap: G, marginBottom: "5px" }}>
        <Key code="Escape" label="esc" w={1} isPressed={k("Escape")} corner="tl" isFn />
        <Key code="F1" label="F1" fnIcon={<IconSunLow size={13} />} isPressed={k("F1")} isFn />
        <Key code="F2" label="F2" fnIcon={<IconSun size={13} />} isPressed={k("F2")} isFn />
        <Key code="F3" label="F3" fnIcon={<IconLayoutGrid size={13} />} isPressed={k("F3")} isFn />
        <Key code="F4" label="F4" fnIcon={<IconSearch size={13} />} isPressed={k("F4")} isFn />
        <Key code="F5" label="F5" fnIcon={<IconMicrophone size={13} />} isPressed={k("F5")} isFn />
        <Key code="F6" label="F6" fnIcon={<IconMoon size={13} />} isPressed={k("F6")} isFn />
        <Key code="F7" label="F7" fnIcon={<IconPlayerTrackPrev size={13} />} isPressed={k("F7")} isFn />
        <Key code="F8" label="F8" fnIcon={<IconPlayerPlay size={13} />} isPressed={k("F8")} isFn />
        <Key code="F9" label="F9" fnIcon={<IconPlayerTrackNext size={13} />} isPressed={k("F9")} isFn />
        <Key code="F10" label="F10" fnIcon={<IconVolume3 size={13} />} isPressed={k("F10")} isFn />
        <Key code="F11" label="F11" fnIcon={<IconVolume size={13} />} isPressed={k("F11")} isFn />
        <Key code="F12" label="F12" fnIcon={<IconVolume2 size={13} />} isPressed={k("F12")} isFn />
        <Key code="Delete" fnIcon={<IconBrightnessUp size={14} />} isPressed={k("Delete")} corner="tr" isFn />
      </div>

      {/* Row 1: Numbers */}
      <div style={{ display: "flex", gap: G, marginBottom: G }}>
        <Key code="Backquote" label="`" symbol="~" isPressed={k("Backquote")} />
        <Key code="Digit1" label="1" symbol="!" isPressed={k("Digit1")} />
        <Key code="Digit2" label="2" symbol="@" isPressed={k("Digit2")} />
        <Key code="Digit3" label="3" symbol="#" isPressed={k("Digit3")} />
        <Key code="Digit4" label="4" symbol="$" isPressed={k("Digit4")} />
        <Key code="Digit5" label="5" symbol="%" isPressed={k("Digit5")} />
        <Key code="Digit6" label="6" symbol="^" isPressed={k("Digit6")} />
        <Key code="Digit7" label="7" symbol="&" isPressed={k("Digit7")} />
        <Key code="Digit8" label="8" symbol="*" isPressed={k("Digit8")} />
        <Key code="Digit9" label="9" symbol="(" isPressed={k("Digit9")} />
        <Key code="Digit0" label="0" symbol=")" isPressed={k("Digit0")} />
        <Key code="Minus" label="-" symbol="_" isPressed={k("Minus")} />
        <Key code="Equal" label="=" symbol="+" isPressed={k("Equal")} />
        <Key code="Backspace" icon={<IconBackspace size={18} />} w={1.52} isPressed={k("Backspace")} />
      </div>

      {/* Row 2: QWERTY */}
      <div style={{ display: "flex", gap: G, marginBottom: G }}>
        <Key code="Tab" label="tab" w={1.52} isPressed={k("Tab")} />
        <Key code="KeyQ" label="Q" isPressed={k("KeyQ")} />
        <Key code="KeyW" label="W" isPressed={k("KeyW")} />
        <Key code="KeyE" label="E" isPressed={k("KeyE")} />
        <Key code="KeyR" label="R" isPressed={k("KeyR")} />
        <Key code="KeyT" label="T" isPressed={k("KeyT")} />
        <Key code="KeyY" label="Y" isPressed={k("KeyY")} />
        <Key code="KeyU" label="U" isPressed={k("KeyU")} />
        <Key code="KeyI" label="I" isPressed={k("KeyI")} />
        <Key code="KeyO" label="O" isPressed={k("KeyO")} />
        <Key code="KeyP" label="P" isPressed={k("KeyP")} />
        <Key code="BracketLeft" label="[" symbol="{" isPressed={k("BracketLeft")} />
        <Key code="BracketRight" label="]" symbol="}" isPressed={k("BracketRight")} />
        <Key code="Backslash" label="\\" symbol="|" isPressed={k("Backslash")} />
      </div>

      {/* Row 3: Home row - 13 keys, needs caps+return to fill same width */}
      <div style={{ display: "flex", gap: G, marginBottom: G }}>
        <Key code="CapsLock" label="caps lock" w={1.88} isPressed={k("CapsLock")} />
        <Key code="KeyA" label="A" isPressed={k("KeyA")} />
        <Key code="KeyS" label="S" isPressed={k("KeyS")} />
        <Key code="KeyD" label="D" isPressed={k("KeyD")} />
        <Key code="KeyF" label="F" isPressed={k("KeyF")} />
        <Key code="KeyG" label="G" isPressed={k("KeyG")} />
        <Key code="KeyH" label="H" isPressed={k("KeyH")} />
        <Key code="KeyJ" label="J" isPressed={k("KeyJ")} />
        <Key code="KeyK" label="K" isPressed={k("KeyK")} />
        <Key code="KeyL" label="L" isPressed={k("KeyL")} />
        <Key code="Semicolon" label=";" symbol=":" isPressed={k("Semicolon")} />
        <Key code="Quote" label="'" symbol={'"'} isPressed={k("Quote")} />
        <Key code="Enter" icon={<IconCornerDownLeft size={18} />} w={1.71} isPressed={k("Enter")} />
      </div>

      {/* Row 4: Shift row - 12 keys */}
      <div style={{ display: "flex", gap: G, marginBottom: G }}>
        <Key code="ShiftLeft" icon={<IconArrowBigUp size={18} />} w={2.42} isPressed={k("ShiftLeft")} />
        <Key code="KeyZ" label="Z" isPressed={k("KeyZ")} />
        <Key code="KeyX" label="X" isPressed={k("KeyX")} />
        <Key code="KeyC" label="C" isPressed={k("KeyC")} />
        <Key code="KeyV" label="V" isPressed={k("KeyV")} />
        <Key code="KeyB" label="B" isPressed={k("KeyB")} />
        <Key code="KeyN" label="N" isPressed={k("KeyN")} />
        <Key code="KeyM" label="M" isPressed={k("KeyM")} />
        <Key code="Comma" label="," symbol="<" isPressed={k("Comma")} />
        <Key code="Period" label="." symbol=">" isPressed={k("Period")} />
        <Key code="Slash" label="/" symbol="?" isPressed={k("Slash")} />
        <Key code="ShiftRight" icon={<IconArrowBigUp size={18} />} w={2.42} isPressed={k("ShiftRight")} />
      </div>

      {/* Row 5: Bottom row with arrow cluster */}
      <div style={{ display: "flex", gap: G, alignItems: "flex-end" }}>
        <Key code="Fn" label="fn" isPressed={k("Fn")} corner="bl" />
        <Key code="ControlLeft" label="ctrl" w={1.08} isPressed={k("ControlLeft")} />
        <Key code="AltLeft" label="opt" w={1.08} isPressed={k("AltLeft")} />
        <Key code="MetaLeft" icon={<IconCommand size={15} />} w={1.34} isPressed={k("MetaLeft")} />
        <Key code="Space" label="" w={5.34} isPressed={k("Space")} />
        <Key code="MetaRight" icon={<IconCommand size={15} />} w={1.34} isPressed={k("MetaRight")} />
        <Key code="AltRight" label="opt" w={1.08} isPressed={k("AltRight")} />

        {/* Arrow keys */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Key code="ArrowUp" icon={<IconChevronUp size={13} />} halfH isPressed={k("ArrowUp")} />
          </div>
          <div style={{ display: "flex", gap: "2px" }}>
            <Key code="ArrowLeft" icon={<IconChevronLeft size={13} />} halfH isPressed={k("ArrowLeft")} corner="bl" />
            <Key code="ArrowDown" icon={<IconChevronDown size={13} />} halfH isPressed={k("ArrowDown")} />
            <Key code="ArrowRight" icon={<IconChevronRight size={13} />} halfH isPressed={k("ArrowRight")} corner="br" />
          </div>
        </div>
      </div>
    </div>
  );
}
