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

// Pre-generate noise buffer once
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

/**
 * Lubed linear switch sound.
 *
 * Lubed switches are characterized by:
 * - Almost zero high-frequency content (no scratch, no click)
 * - Very short, soft, muted "pop" on bottom-out
 * - Warm low-mid frequency character
 * - Extremely fast decay (dampened by lube)
 * - Quiet overall volume
 *
 * Think: a soft finger tap on a padded desk.
 */
export function playKeySound(isCorrect: boolean = true) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Subtle random variation so each key sounds slightly different
    const pitch = 0.92 + Math.random() * 0.16;
    const vol = 0.88 + Math.random() * 0.12;

    // === The soft "pop" - muted bottom-out ===
    // Very low-passed noise, short duration = dampened thock
    const popSource = ctx.createBufferSource();
    popSource.buffer = getNoiseBuffer(ctx);

    const popLP = ctx.createBiquadFilter();
    popLP.type = "lowpass";
    popLP.frequency.setValueAtTime(600 * pitch, now);
    popLP.Q.setValueAtTime(0.8, now);
    // Frequency drops quickly = sound dies fast like lube dampening
    popLP.frequency.exponentialRampToValueAtTime(200, now + 0.04);

    const popGain = ctx.createGain();
    popGain.gain.setValueAtTime(0.09 * vol, now);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    popSource.connect(popLP);
    popLP.connect(popGain);
    popGain.connect(ctx.destination);

    popSource.start(now);
    popSource.stop(now + 0.05);

    // === Tiny "tik" at attack - the stem hitting housing ===
    // Very quiet, very short, slightly higher than the pop
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

    // === Sub-bass body - the case resonance ===
    // Very low rumble that gives it "depth" without being loud
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

    // Error: slightly longer, very subtle dull tone underneath
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
  } catch {
    // Audio not available
  }
}

/**
 * Lubed spacebar - deeper, slightly longer, stabilizers are also lubed
 * so no rattle, just a smooth deeper version of the key sound.
 */
export function playSpaceSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const vol = 0.9 + Math.random() * 0.1;

    // === Deep muted pop ===
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

    // === Sub thud - larger keycap = more low end ===
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

    // === Gentle muted tap ===
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
  } catch {
    // Audio not available
  }
}

/**
 * Completion - soft warm tone
 */
export function playCompleteSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const notes = [392, 493.88, 587.33]; // G4, B4, D5 (G major - warmer)
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
