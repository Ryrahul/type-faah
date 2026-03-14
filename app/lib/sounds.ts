export type SoundProfile =
  | "thock" | "clack" | "creamy" | "marbly" | "poppy"
  | "rainy" | "muted" | "typewriter" | "asmr" | "bubble";

let audioContext: AudioContext | null = null;
let masterGain: GainNode | null = null;

function ctx(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
    // Master volume boost - all sounds route through this
    masterGain = audioContext.createGain();
    masterGain.gain.value = 2.0;
    masterGain.connect(audioContext.destination);
  }
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function dest(c: AudioContext): AudioNode {
  return masterGain || c.destination;
}

let _noise: AudioBuffer | null = null;
function noise(c: AudioContext): AudioBuffer {
  if (!_noise || _noise.sampleRate !== c.sampleRate) {
    const len = c.sampleRate * 0.15;
    _noise = c.createBuffer(1, len, c.sampleRate);
    const d = _noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }
  return _noise;
}

// Helper: noise burst through filters
function burst(
  c: AudioContext, now: number,
  freq: number, q: number, type: BiquadFilterType,
  vol: number, dur: number, freqEnd?: number
) {
  const s = c.createBufferSource(); s.buffer = noise(c);
  const f = c.createBiquadFilter(); f.type = type;
  f.frequency.setValueAtTime(freq, now); f.Q.setValueAtTime(q, now);
  if (freqEnd) f.frequency.exponentialRampToValueAtTime(freqEnd, now + dur);
  const g = c.createGain(); g.gain.setValueAtTime(vol, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + dur);
  s.connect(f); f.connect(g); g.connect(dest(c));
  s.start(now); s.stop(now + dur + 0.01);
}

// Helper: sine blip
function blip(c: AudioContext, now: number, freq: number, vol: number, dur: number, freqEnd?: number) {
  const o = c.createOscillator(); o.type = "sine";
  o.frequency.setValueAtTime(freq, now);
  if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, now + dur);
  const g = c.createGain(); g.gain.setValueAtTime(vol, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + dur);
  o.connect(g); g.connect(dest(c)); o.start(now); o.stop(now + dur + 0.01);
}

const R = () => 0.92 + Math.random() * 0.16; // pitch variation
const V = () => 0.88 + Math.random() * 0.12; // volume variation

// ════════════════════════════════════════════
// 1. THOCK - Deep, bassy, satisfying
// ════════════════════════════════════════════
function thockKey(c: AudioContext) {
  const now = c.currentTime; const p = R(); const v = V();
  burst(c, now, 500 * p, 1.2, "lowpass", 0.14 * v, 0.065, 140);
  burst(c, now, 200 * p, 2, "lowpass", 0.1 * v, 0.07);
  burst(c, now, 1000 * p, 1.5, "bandpass", 0.04 * v, 0.02);
}
function thockSpace(c: AudioContext) {
  const now = c.currentTime; const v = V();
  burst(c, now, 350, 1.5, "lowpass", 0.16 * v, 0.08, 100);
  burst(c, now, 140, 2.5, "lowpass", 0.12 * v, 0.09);
}

// ════════════════════════════════════════════
// 2. CLACK - Sharp, high-pitched, clicky
//    (the old Blue sound people liked)
// ════════════════════════════════════════════
function clackKey(c: AudioContext) {
  const now = c.currentTime; const p = R(); const v = V();
  // Sharp click - square wave snap
  const o = c.createOscillator(); o.type = "square";
  o.frequency.setValueAtTime(4200 * p, now);
  o.frequency.exponentialRampToValueAtTime(1800, now + 0.008);
  const lp = c.createBiquadFilter(); lp.type = "lowpass";
  lp.frequency.setValueAtTime(6000, now);
  lp.frequency.exponentialRampToValueAtTime(2000, now + 0.015);
  const g = c.createGain(); g.gain.setValueAtTime(0.07 * v, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
  o.connect(lp); lp.connect(g); g.connect(dest(c));
  o.start(now); o.stop(now + 0.025);
  // Snap noise
  burst(c, now, 3500 * p, 1.5, "bandpass", 0.1 * v, 0.018);
  // Delayed thud
  burst(c, now + 0.012, 900 * p, 1, "lowpass", 0.1 * v, 0.05, 300);
  // Spring ping
  blip(c, now, 2800 * p, 0.012 * v, 0.06, 2200);
  // Case
  burst(c, now, 250 * p, 2, "lowpass", 0.06 * v, 0.07);
}
function clackSpace(c: AudioContext) {
  const now = c.currentTime; const v = V();
  const o = c.createOscillator(); o.type = "square";
  o.frequency.setValueAtTime(3000, now); o.frequency.exponentialRampToValueAtTime(1200, now + 0.01);
  const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.setValueAtTime(5000, now);
  lp.frequency.exponentialRampToValueAtTime(1500, now + 0.02);
  const g = c.createGain(); g.gain.setValueAtTime(0.065 * v, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
  o.connect(lp); lp.connect(g); g.connect(dest(c)); o.start(now); o.stop(now + 0.03);
  burst(c, now, 2500, 1, "bandpass", 0.09 * v, 0.02);
  burst(c, now, 600, 1.5, "lowpass", 0.13 * v, 0.09, 150);
  burst(c, now + 0.015, 1800, 3, "bandpass", 0.04 * v, 0.04);
}

// ════════════════════════════════════════════
// 3. CREAMY - Smooth, soft, buttery, no harshness
// ════════════════════════════════════════════
function creamyKey(c: AudioContext) {
  const now = c.currentTime; const p = R(); const v = V();
  burst(c, now, 600 * p, 0.8, "lowpass", 0.09 * v, 0.045, 200);
  burst(c, now, 1200 * p, 2, "bandpass", 0.035 * v, 0.015);
  burst(c, now, 180 * p, 1.5, "lowpass", 0.07 * v, 0.055);
}
function creamySpace(c: AudioContext) {
  const now = c.currentTime; const v = V();
  burst(c, now, 450, 1, "lowpass", 0.11 * v, 0.07, 120);
  burst(c, now, 130, 2, "lowpass", 0.09 * v, 0.08);
  burst(c, now, 800, 1.5, "bandpass", 0.025 * v, 0.02);
}

// ════════════════════════════════════════════
// 4. MARBLY - Dense, rounded, like tapping marble
// ════════════════════════════════════════════
function marblyKey(c: AudioContext) {
  const now = c.currentTime; const p = R(); const v = V();
  // Dense resonant tap
  blip(c, now, 1200 * p, 0.06 * v, 0.025, 400);
  burst(c, now, 700 * p, 3, "bandpass", 0.1 * v, 0.035);
  burst(c, now, 350 * p, 2, "lowpass", 0.09 * v, 0.05, 150);
  // Stone-like ring
  blip(c, now, 2400 * p, 0.02 * v, 0.04, 1800);
}
function marblySpace(c: AudioContext) {
  const now = c.currentTime; const v = V();
  blip(c, now, 800, 0.05 * v, 0.03, 300);
  burst(c, now, 500, 3.5, "bandpass", 0.11 * v, 0.04);
  burst(c, now, 250, 2.5, "lowpass", 0.12 * v, 0.07, 100);
}

// ════════════════════════════════════════════
// 5. POPPY - Light, bouncy, each key pops
// ════════════════════════════════════════════
function poppyKey(c: AudioContext) {
  const now = c.currentTime; const p = R(); const v = V();
  // Quick pop - sine that drops fast
  blip(c, now, 900 * p, 0.08 * v, 0.025, 300);
  burst(c, now, 1500 * p, 2, "bandpass", 0.07 * v, 0.02);
  burst(c, now, 400 * p, 1, "lowpass", 0.06 * v, 0.035, 150);
}
function poppySpace(c: AudioContext) {
  const now = c.currentTime; const v = V();
  blip(c, now, 600, 0.07 * v, 0.03, 200);
  burst(c, now, 1000, 1.5, "bandpass", 0.06 * v, 0.025);
  burst(c, now, 300, 1.2, "lowpass", 0.09 * v, 0.05, 100);
}

// ════════════════════════════════════════════
// 6. RAINY - Soft rhythmic, like light rain
// ════════════════════════════════════════════
function rainyKey(c: AudioContext) {
  const now = c.currentTime; const p = R(); const v = V();
  // Soft patter
  burst(c, now, 3000 * p, 0.8, "highpass", 0.04 * v, 0.012);
  burst(c, now, 500 * p, 0.6, "lowpass", 0.06 * v, 0.04, 150);
  burst(c, now, 1200 * p, 1.2, "bandpass", 0.03 * v, 0.025);
}
function rainySpace(c: AudioContext) {
  const now = c.currentTime; const v = V();
  burst(c, now, 2000, 0.7, "highpass", 0.035 * v, 0.015);
  burst(c, now, 350, 0.8, "lowpass", 0.08 * v, 0.06, 100);
}

// ════════════════════════════════════════════
// 7. MUTED - Very quiet, dampened, silent switches
// ════════════════════════════════════════════
function mutedKey(c: AudioContext) {
  const now = c.currentTime; const p = R(); const v = V();
  burst(c, now, 350 * p, 0.7, "lowpass", 0.06 * v, 0.035, 120);
  burst(c, now, 150 * p, 1.2, "lowpass", 0.04 * v, 0.04);
}
function mutedSpace(c: AudioContext) {
  const now = c.currentTime; const v = V();
  burst(c, now, 250, 0.8, "lowpass", 0.07 * v, 0.05, 80);
  burst(c, now, 100, 1.5, "lowpass", 0.05 * v, 0.06);
}

// ════════════════════════════════════════════
// 8. TYPEWRITER - Old-school mechanical
// ════════════════════════════════════════════
function typewriterKey(c: AudioContext) {
  const now = c.currentTime; const p = R(); const v = V();
  // Lever strike - sharp metallic
  const o = c.createOscillator(); o.type = "sawtooth";
  o.frequency.setValueAtTime(3000 * p, now);
  o.frequency.exponentialRampToValueAtTime(800, now + 0.01);
  const lp = c.createBiquadFilter(); lp.type = "lowpass";
  lp.frequency.setValueAtTime(4000, now); lp.frequency.exponentialRampToValueAtTime(1000, now + 0.02);
  const g = c.createGain(); g.gain.setValueAtTime(0.06 * v, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
  o.connect(lp); lp.connect(g); g.connect(dest(c)); o.start(now); o.stop(now + 0.03);
  // Metal hit
  burst(c, now, 2000 * p, 2.5, "bandpass", 0.09 * v, 0.02);
  // Paper/platen thud
  burst(c, now + 0.008, 600 * p, 1, "lowpass", 0.1 * v, 0.04, 200);
  // Bell-like ring
  blip(c, now, 4500 * p, 0.008 * v, 0.05, 3500);
}
function typewriterSpace(c: AudioContext) {
  const now = c.currentTime; const v = V();
  // Carriage return clunk
  burst(c, now, 1500, 2, "bandpass", 0.08 * v, 0.025);
  burst(c, now, 400, 1.2, "lowpass", 0.13 * v, 0.06, 120);
  blip(c, now, 2500, 0.015 * v, 0.04, 1500);
  // Ratchet
  burst(c, now + 0.02, 1800, 3, "bandpass", 0.04 * v, 0.03);
}

// ════════════════════════════════════════════
// 9. ASMR - Very clean, crisp, relaxing
// ════════════════════════════════════════════
function asmrKey(c: AudioContext) {
  const now = c.currentTime; const p = R(); const v = V();
  // Clean crisp tap
  burst(c, now, 1800 * p, 2.5, "bandpass", 0.06 * v, 0.015);
  // Soft body
  burst(c, now, 500 * p, 1, "lowpass", 0.08 * v, 0.04, 180);
  // Gentle sub
  burst(c, now, 160 * p, 1.5, "lowpass", 0.05 * v, 0.05);
}
function asmrSpace(c: AudioContext) {
  const now = c.currentTime; const v = V();
  burst(c, now, 1400, 2, "bandpass", 0.05 * v, 0.018);
  burst(c, now, 380, 1.2, "lowpass", 0.1 * v, 0.06, 120);
  burst(c, now, 120, 1.8, "lowpass", 0.06 * v, 0.07);
}

// ════════════════════════════════════════════
// 10. BUBBLE - Soft, round, playful pops
// ════════════════════════════════════════════
function bubbleKey(c: AudioContext) {
  const now = c.currentTime; const p = R(); const v = V();
  // Bubble pop - sine sweeping up then dying
  blip(c, now, 400 * p, 0.09 * v, 0.035, 800 * p);
  burst(c, now, 600 * p, 1.5, "bandpass", 0.05 * v, 0.025);
  burst(c, now, 250 * p, 1, "lowpass", 0.06 * v, 0.04, 120);
}
function bubbleSpace(c: AudioContext) {
  const now = c.currentTime; const v = V();
  blip(c, now, 300, 0.08 * v, 0.04, 600);
  burst(c, now, 450, 1.8, "bandpass", 0.06 * v, 0.03);
  burst(c, now, 180, 1.2, "lowpass", 0.08 * v, 0.06, 80);
}

// ════════════════════════════════════════════
// ERROR LAYER (shared)
// ════════════════════════════════════════════
function errSound(c: AudioContext) {
  const now = c.currentTime;
  burst(c, now, 280, 2, "bandpass", 0.04, 0.08);
}

// ════════════════════════════════════════════
// PUBLIC API
// ════════════════════════════════════════════

const keyFns: Record<SoundProfile, (c: AudioContext) => void> = {
  thock: thockKey, clack: clackKey, creamy: creamyKey, marbly: marblyKey,
  poppy: poppyKey, rainy: rainyKey, muted: mutedKey, typewriter: typewriterKey,
  asmr: asmrKey, bubble: bubbleKey,
};
const spaceFns: Record<SoundProfile, (c: AudioContext) => void> = {
  thock: thockSpace, clack: clackSpace, creamy: creamySpace, marbly: marblySpace,
  poppy: poppySpace, rainy: rainySpace, muted: mutedSpace, typewriter: typewriterSpace,
  asmr: asmrSpace, bubble: bubbleSpace,
};

export function playKeySound(profile: SoundProfile, isCorrect: boolean = true) {
  try {
    const c = ctx();
    keyFns[profile](c);
    if (!isCorrect) errSound(c);
  } catch { /* */ }
}

export function playSpaceSound(profile: SoundProfile) {
  try { spaceFns[profile](ctx()); } catch { /* */ }
}

// Preload all 3 mistake sounds
const mistakeSounds: HTMLAudioElement[] = [];

function ensureMistakeSounds() {
  if (mistakeSounds.length === 0) {
    const files = ["/sounds/mistake-5.mp3", "/sounds/mistake-10.mp3", "/sounds/mistake-15.mp3"];
    for (const f of files) {
      const a = new Audio(f);
      a.volume = 0.7;
      mistakeSounds.push(a);
    }
  }
}

// Play mistake sound by index (0, 1, or 2)
export function playMistakeSoundByIndex(index: number) {
  try {
    ensureMistakeSounds();
    const sound = mistakeSounds[index % mistakeSounds.length];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  } catch { /* */ }
}

export function playCompleteSound() {
  try {
    const c = ctx(); const now = c.currentTime;
    [392, 493.88, 587.33].forEach((freq, i) => {
      const o = c.createOscillator(); const g = c.createGain();
      const f = c.createBiquadFilter();
      o.type = "sine"; o.frequency.setValueAtTime(freq, now);
      f.type = "lowpass"; f.frequency.setValueAtTime(1500, now); f.Q.setValueAtTime(0.5, now);
      g.gain.setValueAtTime(0, now + i * 0.15);
      g.gain.linearRampToValueAtTime(0.045, now + i * 0.15 + 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 1.0);
      o.connect(f); f.connect(g); g.connect(dest(c));
      o.start(now + i * 0.15); o.stop(now + i * 0.15 + 1.0);
    });
  } catch { /* */ }
}
