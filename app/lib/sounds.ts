export type SoundProfile = "lubed" | "blue";

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

let noiseBuffer: AudioBuffer | null = null;

function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (!noiseBuffer || noiseBuffer.sampleRate !== ctx.sampleRate) {
    const length = ctx.sampleRate * 0.15;
    noiseBuffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return noiseBuffer;
}

// ─────────────────────────────────────────────
// LUBED LINEARS - soft, muted, buttery, dampened
// ─────────────────────────────────────────────

function playLubedKey(ctx: AudioContext, isCorrect: boolean) {
  const now = ctx.currentTime;
  const pitch = 0.92 + Math.random() * 0.16;
  const vol = 0.88 + Math.random() * 0.12;

  // Soft "pop" - muted bottom-out
  const popSource = ctx.createBufferSource();
  popSource.buffer = getNoiseBuffer(ctx);
  const popLP = ctx.createBiquadFilter();
  popLP.type = "lowpass";
  popLP.frequency.setValueAtTime(600 * pitch, now);
  popLP.Q.setValueAtTime(0.8, now);
  popLP.frequency.exponentialRampToValueAtTime(200, now + 0.04);
  const popGain = ctx.createGain();
  popGain.gain.setValueAtTime(0.09 * vol, now);
  popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
  popSource.connect(popLP);
  popLP.connect(popGain);
  popGain.connect(ctx.destination);
  popSource.start(now);
  popSource.stop(now + 0.05);

  // Tiny "tik" - stem hitting housing
  const tikSource = ctx.createBufferSource();
  tikSource.buffer = getNoiseBuffer(ctx);
  const tikBP = ctx.createBiquadFilter();
  tikBP.type = "bandpass";
  tikBP.frequency.setValueAtTime(1200 * pitch, now);
  tikBP.Q.setValueAtTime(2, now);
  const tikLP = ctx.createBiquadFilter();
  tikLP.type = "lowpass";
  tikLP.frequency.setValueAtTime(2000, now);
  const tikGain = ctx.createGain();
  tikGain.gain.setValueAtTime(0.035 * vol, now);
  tikGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
  tikSource.connect(tikBP);
  tikBP.connect(tikLP);
  tikLP.connect(tikGain);
  tikGain.connect(ctx.destination);
  tikSource.start(now);
  tikSource.stop(now + 0.02);

  // Sub-bass body - case resonance
  const subSource = ctx.createBufferSource();
  subSource.buffer = getNoiseBuffer(ctx);
  const subLP = ctx.createBiquadFilter();
  subLP.type = "lowpass";
  subLP.frequency.setValueAtTime(180 * pitch, now);
  subLP.Q.setValueAtTime(1.5, now);
  const subGain = ctx.createGain();
  subGain.gain.setValueAtTime(0.07 * vol, now);
  subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
  subSource.connect(subLP);
  subLP.connect(subGain);
  subGain.connect(ctx.destination);
  subSource.start(now);
  subSource.stop(now + 0.06);

  if (!isCorrect) {
    const errOsc = ctx.createOscillator();
    const errGain = ctx.createGain();
    const errLP = ctx.createBiquadFilter();
    errOsc.type = "sine";
    errOsc.frequency.setValueAtTime(180, now);
    errLP.type = "lowpass";
    errLP.frequency.setValueAtTime(300, now);
    errGain.gain.setValueAtTime(0.04, now);
    errGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    errOsc.connect(errLP);
    errLP.connect(errGain);
    errGain.connect(ctx.destination);
    errOsc.start(now);
    errOsc.stop(now + 0.08);
  }
}

function playLubedSpace(ctx: AudioContext) {
  const now = ctx.currentTime;
  const vol = 0.9 + Math.random() * 0.1;

  const popSource = ctx.createBufferSource();
  popSource.buffer = getNoiseBuffer(ctx);
  const popLP = ctx.createBiquadFilter();
  popLP.type = "lowpass";
  popLP.frequency.setValueAtTime(450, now);
  popLP.Q.setValueAtTime(1, now);
  popLP.frequency.exponentialRampToValueAtTime(120, now + 0.06);
  const popGain = ctx.createGain();
  popGain.gain.setValueAtTime(0.11 * vol, now);
  popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
  popSource.connect(popLP);
  popLP.connect(popGain);
  popGain.connect(ctx.destination);
  popSource.start(now);
  popSource.stop(now + 0.07);

  const subSource = ctx.createBufferSource();
  subSource.buffer = getNoiseBuffer(ctx);
  const subLP = ctx.createBiquadFilter();
  subLP.type = "lowpass";
  subLP.frequency.setValueAtTime(130, now);
  subLP.Q.setValueAtTime(2, now);
  const subGain = ctx.createGain();
  subGain.gain.setValueAtTime(0.09 * vol, now);
  subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  subSource.connect(subLP);
  subLP.connect(subGain);
  subGain.connect(ctx.destination);
  subSource.start(now);
  subSource.stop(now + 0.08);

  const tapSource = ctx.createBufferSource();
  tapSource.buffer = getNoiseBuffer(ctx);
  const tapBP = ctx.createBiquadFilter();
  tapBP.type = "bandpass";
  tapBP.frequency.setValueAtTime(800, now);
  tapBP.Q.setValueAtTime(1.5, now);
  const tapLP = ctx.createBiquadFilter();
  tapLP.type = "lowpass";
  tapLP.frequency.setValueAtTime(1200, now);
  const tapGain = ctx.createGain();
  tapGain.gain.setValueAtTime(0.025 * vol, now);
  tapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
  tapSource.connect(tapBP);
  tapBP.connect(tapLP);
  tapLP.connect(tapGain);
  tapGain.connect(ctx.destination);
  tapSource.start(now);
  tapSource.stop(now + 0.025);
}

// ─────────────────────────────────────────────────────
// STOCK CHERRY MX BLUE
//
// The signature Cherry Blue sound comes from:
// 1. Click jacket: a sharp, bright, crisp "tick" - almost
//    like snapping a thin plastic piece. Very fast (~5ms),
//    concentrated around 2-5kHz.
// 2. Bottom-out: a fuller thud a few ms after the click,
//    as the stem hits the housing floor.
// 3. Housing resonance: the plastic housing rings briefly.
// 4. Spring crunch: very subtle metallic texture.
//
// The click is THE defining sound - it needs to be crisp,
// bright, and have that distinctive "tick" character.
// ─────────────────────────────────────────────────────

// Pre-generate a click impulse buffer for sharper transient
let clickBuffer: AudioBuffer | null = null;

function getClickBuffer(ctx: AudioContext): AudioBuffer {
  if (!clickBuffer || clickBuffer.sampleRate !== ctx.sampleRate) {
    // Very short impulse (~3ms) with shaped envelope
    const len = Math.floor(ctx.sampleRate * 0.004);
    clickBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = clickBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const t = i / len;
      // Sharp attack, fast decay envelope
      const env = t < 0.1 ? t / 0.1 : Math.exp(-12 * (t - 0.1));
      // Mix of noise + high-freq tone for metallic character
      data[i] = env * (
        (Math.random() * 2 - 1) * 0.6 +
        Math.sin(i * 2 * Math.PI * 5500 / ctx.sampleRate) * 0.4
      );
    }
  }
  return clickBuffer;
}

function playBlueKey(ctx: AudioContext, isCorrect: boolean) {
  const now = ctx.currentTime;
  const pitch = 0.95 + Math.random() * 0.1;
  const vol = 0.92 + Math.random() * 0.08;

  // === THE CLICK (the signature Blue sound) ===
  // Short, bright, crisp impulse through a peaky bandpass
  const clickSrc = ctx.createBufferSource();
  clickSrc.buffer = getClickBuffer(ctx);
  clickSrc.playbackRate.value = pitch;

  const clickHP = ctx.createBiquadFilter();
  clickHP.type = "highpass";
  clickHP.frequency.setValueAtTime(1800, now);

  const clickPeak = ctx.createBiquadFilter();
  clickPeak.type = "peaking";
  clickPeak.frequency.setValueAtTime(4000 * pitch, now);
  clickPeak.gain.setValueAtTime(8, now);
  clickPeak.Q.setValueAtTime(2, now);

  const clickGain = ctx.createGain();
  clickGain.gain.setValueAtTime(0.35 * vol, now);

  clickSrc.connect(clickHP);
  clickHP.connect(clickPeak);
  clickPeak.connect(clickGain);
  clickGain.connect(ctx.destination);
  clickSrc.start(now);

  // === BOTTOM-OUT THUD (delayed ~8ms after click) ===
  const thudDelay = 0.008;
  const thudSrc = ctx.createBufferSource();
  thudSrc.buffer = getNoiseBuffer(ctx);

  const thudLP = ctx.createBiquadFilter();
  thudLP.type = "lowpass";
  thudLP.frequency.setValueAtTime(1200 * pitch, now + thudDelay);
  thudLP.Q.setValueAtTime(0.7, now);
  thudLP.frequency.exponentialRampToValueAtTime(350, now + thudDelay + 0.035);

  const thudGain = ctx.createGain();
  thudGain.gain.setValueAtTime(0, now);
  thudGain.gain.linearRampToValueAtTime(0.13 * vol, now + thudDelay);
  thudGain.gain.exponentialRampToValueAtTime(0.001, now + thudDelay + 0.045);

  thudSrc.connect(thudLP);
  thudLP.connect(thudGain);
  thudGain.connect(ctx.destination);
  thudSrc.start(now);
  thudSrc.stop(now + thudDelay + 0.05);

  // === HOUSING RESONANCE (plastic ring) ===
  const resSrc = ctx.createBufferSource();
  resSrc.buffer = getNoiseBuffer(ctx);

  const resBP = ctx.createBiquadFilter();
  resBP.type = "bandpass";
  resBP.frequency.setValueAtTime(2200 * pitch, now);
  resBP.Q.setValueAtTime(5, now);

  const resGain = ctx.createGain();
  resGain.gain.setValueAtTime(0.04 * vol, now);
  resGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  resSrc.connect(resBP);
  resBP.connect(resGain);
  resGain.connect(ctx.destination);
  resSrc.start(now);
  resSrc.stop(now + 0.055);

  // === CASE THUMP (low end body) ===
  const caseSrc = ctx.createBufferSource();
  caseSrc.buffer = getNoiseBuffer(ctx);

  const caseLP = ctx.createBiquadFilter();
  caseLP.type = "lowpass";
  caseLP.frequency.setValueAtTime(300, now);
  caseLP.Q.setValueAtTime(1.5, now);

  const caseGain = ctx.createGain();
  caseGain.gain.setValueAtTime(0.08 * vol, now + 0.005);
  caseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  caseSrc.connect(caseLP);
  caseLP.connect(caseGain);
  caseGain.connect(ctx.destination);
  caseSrc.start(now);
  caseSrc.stop(now + 0.065);

  if (!isCorrect) {
    const errSrc = ctx.createBufferSource();
    errSrc.buffer = getNoiseBuffer(ctx);
    const errBP = ctx.createBiquadFilter();
    errBP.type = "bandpass";
    errBP.frequency.setValueAtTime(300, now);
    errBP.Q.setValueAtTime(2, now);
    const errGain = ctx.createGain();
    errGain.gain.setValueAtTime(0.05, now);
    errGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    errSrc.connect(errBP);
    errBP.connect(errGain);
    errGain.connect(ctx.destination);
    errSrc.start(now);
    errSrc.stop(now + 0.085);
  }
}

function playBlueSpace(ctx: AudioContext) {
  const now = ctx.currentTime;
  const vol = 0.9 + Math.random() * 0.1;

  // Click (slightly lower pitch for bigger key)
  const clickSrc = ctx.createBufferSource();
  clickSrc.buffer = getClickBuffer(ctx);
  clickSrc.playbackRate.value = 0.85;

  const clickHP = ctx.createBiquadFilter();
  clickHP.type = "highpass";
  clickHP.frequency.setValueAtTime(1500, now);

  const clickPeak = ctx.createBiquadFilter();
  clickPeak.type = "peaking";
  clickPeak.frequency.setValueAtTime(3200, now);
  clickPeak.gain.setValueAtTime(6, now);
  clickPeak.Q.setValueAtTime(2, now);

  const clickGain = ctx.createGain();
  clickGain.gain.setValueAtTime(0.3 * vol, now);

  clickSrc.connect(clickHP);
  clickHP.connect(clickPeak);
  clickPeak.connect(clickGain);
  clickGain.connect(ctx.destination);
  clickSrc.start(now);

  // Deeper thud
  const thudSrc = ctx.createBufferSource();
  thudSrc.buffer = getNoiseBuffer(ctx);
  const thudLP = ctx.createBiquadFilter();
  thudLP.type = "lowpass";
  thudLP.frequency.setValueAtTime(800, now + 0.01);
  thudLP.Q.setValueAtTime(1, now);
  thudLP.frequency.exponentialRampToValueAtTime(200, now + 0.06);
  const thudGain = ctx.createGain();
  thudGain.gain.setValueAtTime(0, now);
  thudGain.gain.linearRampToValueAtTime(0.15 * vol, now + 0.01);
  thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
  thudSrc.connect(thudLP);
  thudLP.connect(thudGain);
  thudGain.connect(ctx.destination);
  thudSrc.start(now);
  thudSrc.stop(now + 0.075);

  // Low case thump
  const caseSrc = ctx.createBufferSource();
  caseSrc.buffer = getNoiseBuffer(ctx);
  const caseLP = ctx.createBiquadFilter();
  caseLP.type = "lowpass";
  caseLP.frequency.setValueAtTime(200, now);
  caseLP.Q.setValueAtTime(2, now);
  const caseGain = ctx.createGain();
  caseGain.gain.setValueAtTime(0.1 * vol, now + 0.008);
  caseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  caseSrc.connect(caseLP);
  caseLP.connect(caseGain);
  caseGain.connect(ctx.destination);
  caseSrc.start(now);
  caseSrc.stop(now + 0.085);

  // Stab rattle
  const rattleSrc = ctx.createBufferSource();
  rattleSrc.buffer = getNoiseBuffer(ctx);
  const rattleBP = ctx.createBiquadFilter();
  rattleBP.type = "bandpass";
  rattleBP.frequency.setValueAtTime(2000, now + 0.012);
  rattleBP.Q.setValueAtTime(4, now);
  const rattleGain = ctx.createGain();
  rattleGain.gain.setValueAtTime(0, now);
  rattleGain.gain.linearRampToValueAtTime(0.035 * vol, now + 0.012);
  rattleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
  rattleSrc.connect(rattleBP);
  rattleBP.connect(rattleGain);
  rattleGain.connect(ctx.destination);
  rattleSrc.start(now);
  rattleSrc.stop(now + 0.06);
}

// ─────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────

export function playKeySound(profile: SoundProfile, isCorrect: boolean = true) {
  try {
    const ctx = getAudioContext();
    if (profile === "blue") {
      playBlueKey(ctx, isCorrect);
    } else {
      playLubedKey(ctx, isCorrect);
    }
  } catch {
    // Audio not available
  }
}

export function playSpaceSound(profile: SoundProfile) {
  try {
    const ctx = getAudioContext();
    if (profile === "blue") {
      playBlueSpace(ctx);
    } else {
      playLubedSpace(ctx);
    }
  } catch {
    // Audio not available
  }
}

export function playCompleteSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const notes = [392, 493.88, 587.33]; // G major
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1500, now);
      filter.Q.setValueAtTime(0.5, now);

      gain.gain.setValueAtTime(0, now + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.045, now + i * 0.15 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 1.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 1.0);
    });
  } catch {
    // Audio not available
  }
}
