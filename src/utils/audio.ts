/**
 * Web Audio API synthesizer for retro/school escape room sound effects
 * Zero external audio files required
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Soft click / button tap
  playClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext policy fallback
    }
  }

  // Item pickup sound
  playPickup() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // ignore
    }
  }

  // Puzzle success chime (Major triad)
  playSuccess() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.09);
        osc.stop(ctx.currentTime + idx * 0.09 + 0.35);
      });
    } catch {
      // ignore
    }
  }

  // Error buzzer
  playError() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // ignore
    }
  }

  // Mechanical safe lock unlocking
  playUnlock() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      [0, 0.08, 0.16].forEach((time, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(index === 2 ? 800 : 400, ctx.currentTime + time);

        gain.gain.setValueAtTime(0.08, ctx.currentTime + time);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + time);
        osc.stop(ctx.currentTime + time + 0.05);
      });
    } catch {
      // ignore
    }
  }

  // School bell chime when escaping
  playSchoolBell() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      // Traditional 4-note Westminister quarters: E4, G#4, F#4, B3 / B3, F#4, G#4, E4
      const notes = [659.25, 830.61, 739.99, 493.88, 493.88, 739.99, 830.61, 659.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.35);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.35);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.35 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.35 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.35);
        osc.stop(ctx.currentTime + idx * 0.35 + 0.6);
      });
    } catch {
      // ignore
    }
  }

  // Text-To-Speech for A1-A2 Grade 8 English practice
  speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.88; // Slightly slower, crystal clear for Grade 8 A1-A2 students
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundManager();
