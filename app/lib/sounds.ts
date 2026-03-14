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
// CHERRY MX BLUE - loud, clicky, sharp tactile snap
//
// Blues have two distinct sound events:
// 1. The "click" - the click jacket snapping past the bump
//    (sharp, high-pitched, metallic)
// 2. The "bottom out" - stem hitting the bottom housing
//    (louder thud than linears, more case ping)
// Plus a subtle "spring ping" resonance on release
// ─────────────────────────────────────────────────────

function playBlueKey(ctx: AudioContext, isCorrect: boolean) {
  const now = ctx.currentTime;
  const pitch = 0.94 + Math.random() * 0.12;
  const vol = 0.9 + Math.random() * 0.1;

  // === Layer 1: THE CLICK - sharp metallic snap ===
  // This is what makes blues "blue" - a sharp high-mid crack
  const clickOsc = ctx.createOscillator();
  clickOsc.type = "square";
  clickOsc.frequency.setValueAtTime(4200 * pitch, now);
  clickOsc.frequency.exponentialRampToValueAtTime(1800, now + 0.008);

  const clickLP = ctx.createBiquadFilter();
  clickLP.type = "lowpass";
  clickLP.frequency.setValueAtTime(6000, now);
  clickLP.frequency.exponentialRampToValueAtTime(2000, now + 0.015);

  const clickGain = ctx.createGain();
  clickGain.gain.setValueAtTime(0.07 * vol, now);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

  clickOsc.connect(clickLP);
  clickLP.connect(clickGain);
  clickGain.connect(ctx.destination);
  clickOsc.start(now);
  clickOsc.stop(now + 0.025);

  // === Layer 2: Click noise burst (the jacket snap) ===
  const snapSource = ctx.createBufferSource();
  snapSource.buffer = getNoiseBuffer(ctx);

  const snapBP = ctx.createBiquadFilter();
  snapBP.type = "bandpass";
  snapBP.frequency.setValueAtTime(3500 * pitch, now);
  snapBP.Q.setValueAtTime(1.5, now);

  const snapGain = ctx.createGain();
  snapGain.gain.setValueAtTime(0.1 * vol, now);
  snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

  snapSource.connect(snapBP);
  snapBP.connect(snapGain);
  snapGain.connect(ctx.destination);
  snapSource.start(now);
  snapSource.stop(now + 0.02);

  // === Layer 3: Bottom-out thud ===
  // Delayed slightly after the click (stem travels past the bump)
  const thudDelay = 0.012;
  const thudSource = ctx.createBufferSource();
  thudSource.buffer = getNoiseBuffer(ctx);

  const thudLP = ctx.createBiquadFilter();
  thudLP.type = "lowpass";
  thudLP.frequency.setValueAtTime(900 * pitch, now + thudDelay);
  thudLP.Q.setValueAtTime(1, now + thudDelay);
  thudLP.frequency.exponentialRampToValueAtTime(300, now + thudDelay + 0.04);

  const thudGain = ctx.createGain();
  thudGain.gain.setValueAtTime(0, now);
  thudGain.gain.linearRampToValueAtTime(0.1 * vol, now + thudDelay);
  thudGain.gain.exponentialRampToValueAtTime(0.001, now + thudDelay + 0.05);

  thudSource.connect(thudLP);
  thudLP.connect(thudGain);
  thudGain.connect(ctx.destination);
  thudSource.start(now);
  thudSource.stop(now + thudDelay + 0.06);

  // === Layer 4: Spring ping resonance ===
  const pingOsc = ctx.createOscillator();
  pingOsc.type = "sine";
  pingOsc.frequency.setValueAtTime(2800 * pitch, now);
  pingOsc.frequency.exponentialRampToValueAtTime(2200, now + 0.06);

  const pingGain = ctx.createGain();
  pingGain.gain.setValueAtTime(0.012 * vol, now);
  pingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  pingOsc.connect(pingGain);
  pingGain.connect(ctx.destination);
  pingOsc.start(now);
  pingOsc.stop(now + 0.065);

  // === Layer 5: Case ping / resonance ===
  const caseSource = ctx.createBufferSource();
  caseSource.buffer = getNoiseBuffer(ctx);

  const caseLP = ctx.createBiquadFilter();
  caseLP.type = "lowpass";
  caseLP.frequency.setValueAtTime(250 * pitch, now);
  caseLP.Q.setValueAtTime(2, now);

  const caseGain = ctx.createGain();
  caseGain.gain.setValueAtTime(0.06 * vol, now);
  caseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

  caseSource.connect(caseLP);
  caseLP.connect(caseGain);
  caseGain.connect(ctx.destination);
  caseSource.start(now);
  caseSource.stop(now + 0.07);

  if (!isCorrect) {
    const errOsc = ctx.createOscillator();
    const errGain = ctx.createGain();
    errOsc.type = "sine";
    errOsc.frequency.setValueAtTime(250, now);
    errGain.gain.setValueAtTime(0.04, now);
    errGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    errOsc.connect(errGain);
    errGain.connect(ctx.destination);
    errOsc.start(now);
    errOsc.stop(now + 0.1);
  }
}

function playBlueSpace(ctx: AudioContext) {
  const now = ctx.currentTime;
  const vol = 0.9 + Math.random() * 0.1;

  // Louder click for spacebar
  const clickOsc = ctx.createOscillator();
  clickOsc.type = "square";
  clickOsc.frequency.setValueAtTime(3000, now);
  clickOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.01);
  const clickLP = ctx.createBiquadFilter();
  clickLP.type = "lowpass";
  clickLP.frequency.setValueAtTime(5000, now);
  clickLP.frequency.exponentialRampToValueAtTime(1500, now + 0.02);
  const clickGain = ctx.createGain();
  clickGain.gain.setValueAtTime(0.065 * vol, now);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
  clickOsc.connect(clickLP);
  clickLP.connect(clickGain);
  clickGain.connect(ctx.destination);
  clickOsc.start(now);
  clickOsc.stop(now + 0.03);

  // Snap
  const snapSource = ctx.createBufferSource();
  snapSource.buffer = getNoiseBuffer(ctx);
  const snapBP = ctx.createBiquadFilter();
  snapBP.type = "bandpass";
  snapBP.frequency.setValueAtTime(2500, now);
  snapBP.Q.setValueAtTime(1, now);
  const snapGain = ctx.createGain();
  snapGain.gain.setValueAtTime(0.09 * vol, now);
  snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
  snapSource.connect(snapBP);
  snapBP.connect(snapGain);
  snapGain.connect(ctx.destination);
  snapSource.start(now);
  snapSource.stop(now + 0.025);

  // Deep thud + stab rattle
  const thudSource = ctx.createBufferSource();
  thudSource.buffer = getNoiseBuffer(ctx);
  const thudLP = ctx.createBiquadFilter();
  thudLP.type = "lowpass";
  thudLP.frequency.setValueAtTime(600, now);
  thudLP.Q.setValueAtTime(1.5, now);
  thudLP.frequency.exponentialRampToValueAtTime(150, now + 0.06);
  const thudGain = ctx.createGain();
  thudGain.gain.setValueAtTime(0.13 * vol, now);
  thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
  thudSource.connect(thudLP);
  thudLP.connect(thudGain);
  thudGain.connect(ctx.destination);
  thudSource.start(now);
  thudSource.stop(now + 0.09);

  // Stabilizer wire rattle (unlubed stabs on blues)
  const rattleSource = ctx.createBufferSource();
  rattleSource.buffer = getNoiseBuffer(ctx);
  const rattleBP = ctx.createBiquadFilter();
  rattleBP.type = "bandpass";
  rattleBP.frequency.setValueAtTime(1800, now + 0.015);
  rattleBP.Q.setValueAtTime(3, now);
  const rattleGain = ctx.createGain();
  rattleGain.gain.setValueAtTime(0, now);
  rattleGain.gain.linearRampToValueAtTime(0.04 * vol, now + 0.015);
  rattleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
  rattleSource.connect(rattleBP);
  rattleBP.connect(rattleGain);
  rattleGain.connect(ctx.destination);
  rattleSource.start(now);
  rattleSource.stop(now + 0.065);
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
