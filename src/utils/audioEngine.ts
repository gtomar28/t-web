// Web Audio API Synthesizer Sound Engine for Trevyk Interactive Experience (Delight Item #29)

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private enabled: boolean = false;

  constructor() {
    // Lazy initialized on first user gesture to comply with browser autoplay policies
  }

  public init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.enabled ? 0.25 : 0, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled) {
      this.init();
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 0.05);
      }
      this.playToggle(true);
    } else {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.05);
      }
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  // Subtle hover micro-tone
  public playHover() {
    if (!this.enabled || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.06);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Ignore audio interruptions
    }
  }

  // Refined button click
  public playClick(type: 'soft' | 'sharp' | 'hero' = 'soft') {
    if (!this.enabled || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (type === 'sharp') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(740, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      } else if (type === 'hero') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(280, now + 0.05);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      }

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // Ignore
    }
  }

  // Harmonic chime per 3D Cube index (0: Ingress, 1: Gateway, 2: Services, 3: ERP, 4: DB)
  public playCubeChime(index: number) {
    if (!this.enabled || !this.ctx || !this.masterGain) return;
    try {
      const notes = [523.25, 587.33, 659.25, 783.99, 880.0]; // C5, D5, E5, G5, A5 pentatonic
      const freq = notes[index % notes.length] || 523.25;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(freq * 0.5, now);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      subOsc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + 0.45);
      subOsc.stop(now + 0.45);
    } catch {
      // Ignore
    }
  }

  // Toggle sound when audio is switched on or off
  public playToggle(isOn: boolean) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      if (isOn) {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      } else {
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
      }

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Ignore
    }
  }

  // Disassembly whoosh & crystallization sound
  public playDisassemble(disassembled: boolean) {
    if (!this.enabled || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      if (disassembled) {
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.25);
      } else {
        osc.frequency.setValueAtTime(740, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.25);
      }

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Ignore
    }
  }

  // Easter Egg (Delight Item #28) - Arpeggiated crystalline celebration chime
  public playEasterEgg() {
    if (!this.enabled || !this.ctx || !this.masterGain) return;
    try {
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; // A major arpeggio
      const now = this.ctx.currentTime;

      notes.forEach((freq, i) => {
        if (!this.ctx || !this.masterGain) return;
        const noteTime = now + i * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.08, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(noteTime);
        osc.stop(noteTime + 0.35);
      });
    } catch {
      // Ignore
    }
  }

  // Form submission success chord
  public playSuccessChord() {
    if (!this.enabled || !this.ctx || !this.masterGain) return;
    try {
      const notes = [392.0, 493.88, 587.33, 783.99]; // G Major triad
      const now = this.ctx.currentTime;

      notes.forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.65);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundEngine = new SoundEngine();
