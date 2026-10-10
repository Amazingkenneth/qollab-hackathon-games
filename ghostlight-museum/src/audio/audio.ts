import type { GameState } from '../state/game';
import type { Outcome } from '../model/ghostlight';

type AudioState = Pick<GameState, 'soundEnabled' | 'musicVolume' | 'effectsVolume'>;

class GalleryAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private musicFilters: BiquadFilterNode[] = [];
  private musicNodes = new Set<OscillatorNode>();
  private effectVoices = new Set<{ osc: OscillatorNode; filter: BiquadFilterNode; gain: GainNode }>();
  private scheduler: number | null = null;
  private nextNoteTime = 0;
  private noteStep = 0;
  private enabled = false;
  private musicVolume = 0.35;
  private effectsVolume = 0.55;

  sync(state: AudioState): void {
    this.musicVolume = state.musicVolume;
    this.effectsVolume = state.effectsVolume;
    if (!state.soundEnabled) {
      this.enabled = false;
      this.stopMusic();
      this.stopEffects();
      return;
    }
    this.enabled = true;
    if (this.effectsVolume <= 0) this.stopEffects();
    try {
      const Context = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Context) return;
      this.context ||= new Context();
      if (this.context.state === 'suspended') void this.context.resume().catch(() => undefined);
      if (this.musicVolume <= 0) {
        this.stopMusic();
      } else if (this.master) {
        this.master.gain.setTargetAtTime(0.013 * this.musicVolume, this.context.currentTime, 0.08);
      } else {
        this.startMusic();
      }
    } catch {
      // Audio is optional; every story and inference clue is also visible.
    }
  }

  playOutcome(outcome: Outcome): void {
    if (!this.enabled || this.effectsVolume <= 0) return;
    const context = this.getContext();
    if (!context) return;
    try {
      const now = context.currentTime;
      const osc = context.createOscillator();
      const gain = context.createGain();
      const filter = context.createBiquadFilter();
      if (outcome === 'dark') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(784, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.42);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.04 * this.effectsVolume, now + 0.018);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.15);
        filter.type = 'lowpass';
        filter.frequency.value = 1800;
      } else if (outcome === 'bright') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(540, now);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.022 * this.effectsVolume, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
        filter.type = 'lowpass';
        filter.frequency.value = 1100;
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(116, now);
        osc.frequency.exponentialRampToValueAtTime(78, now + 0.22);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.016 * this.effectsVolume, now + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
        filter.type = 'lowpass';
        filter.frequency.value = 280;
      }
      osc.connect(filter).connect(gain).connect(context.destination);
      osc.start(now);
      osc.stop(now + (outcome === 'dark' ? 1.2 : outcome === 'bright' ? 0.2 : 0.42));
      const voice = { osc, filter, gain };
      this.effectVoices.add(voice);
      osc.onended = () => {
        this.effectVoices.delete(voice);
        osc.disconnect(); filter.disconnect(); gain.disconnect();
      };
    } catch {
      // Browser audio may be unavailable or suspended; never block the game.
    }
  }

  playConfirm(): void {
    if (!this.enabled || this.effectsVolume <= 0) return;
    this.playOutcome('dark');
  }

  private getContext(): AudioContext | null {
    try {
      const Context = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Context) return null;
      this.context ||= new Context();
      if (this.context.state === 'suspended') void this.context.resume().catch(() => undefined);
      return this.context;
    } catch { return null; }
  }

  private startMusic(): void {
    const context = this.getContext();
    if (!context || this.scheduler !== null || this.musicVolume <= 0) return;
    const bus = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 620;
    bus.gain.setValueAtTime(0.0001, context.currentTime);
    bus.gain.linearRampToValueAtTime(0.013 * this.musicVolume, context.currentTime + 0.8);
    filter.connect(bus).connect(context.destination);
    this.musicFilters = [filter];
    for (const [frequency, detune] of [[164.81, -3], [246.94, 2]] as const) {
      const osc = context.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = frequency;
      osc.detune.value = detune;
      osc.connect(filter);
      osc.start();
      this.musicNodes.add(osc);
      osc.onended = () => { this.musicNodes.delete(osc); osc.disconnect(); };
    }
    this.master = bus;
    this.noteStep = 0;
    this.nextNoteTime = context.currentTime + 0.12;
    const beat = 60 / 62;
    const motif: Record<number, number> = { 0: 659.25, 2: 783.99, 4: 739.99, 6: 493.88 };
    this.scheduler = window.setInterval(() => {
      if (!this.enabled || !this.context) return;
      while (this.nextNoteTime < this.context.currentTime + 0.18) {
        const beatInLoop = this.noteStep % 16;
        if (motif[beatInLoop]) this.scheduleBell(this.nextNoteTime, motif[beatInLoop]);
        this.noteStep = (this.noteStep + 1) % 16;
        this.nextNoteTime += beat;
      }
    }, 100);
  }

  private scheduleBell(time: number, frequency: number): void {
    const context = this.context;
    const bus = this.master;
    if (!context || !bus || !this.enabled) return;
    const osc = context.createOscillator();
    const envelope = context.createGain();
    const filter = context.createBiquadFilter();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, time);
    filter.type = 'lowpass';
    filter.frequency.value = 2400;
    envelope.gain.setValueAtTime(0.0001, time);
    envelope.gain.linearRampToValueAtTime(0.9, time + 0.015);
    envelope.gain.exponentialRampToValueAtTime(0.0001, time + 1.8);
    osc.connect(filter).connect(envelope).connect(bus);
    osc.start(time);
    osc.stop(time + 1.85);
    this.musicNodes.add(osc);
    osc.onended = () => {
      this.musicNodes.delete(osc);
      osc.disconnect(); filter.disconnect(); envelope.disconnect();
    };
  }

  private stopEffects(): void {
    const context = this.context;
    if (!context) return;
    const voices = [...this.effectVoices];
    this.effectVoices.clear();
    const now = context.currentTime;
    for (const voice of voices) {
      try {
        voice.gain.gain.cancelScheduledValues(now);
        voice.gain.gain.setTargetAtTime(0.0001, now, 0.008);
        voice.osc.stop(now + 0.04);
      } catch { /* The cue may already have ended. */ }
    }
  }

  private stopMusic(): void {
    if (this.scheduler !== null) window.clearInterval(this.scheduler);
    this.scheduler = null;
    const context = this.context;
    const bus = this.master;
    const oldMusicNodes = [...this.musicNodes];
    const oldFilters = this.musicFilters;
    this.musicNodes.clear();
    this.musicFilters = [];
    this.master = null;
    if (!context || !bus) {
      for (const osc of oldMusicNodes) {
        try { osc.stop(); } catch { /* already stopped */ }
      }
      for (const filter of oldFilters) {
        try { filter.disconnect(); } catch { /* already disconnected */ }
      }
      return;
    }
    const now = context.currentTime;
    try {
      bus.gain.cancelScheduledValues(now);
      bus.gain.setTargetAtTime(0.0001, now, 0.04);
      for (const osc of oldMusicNodes) osc.stop(now + 0.12);
    } catch { /* Nodes may already be stopped. */ }
    window.setTimeout(() => {
      for (const osc of oldMusicNodes) osc.disconnect();
      for (const filter of oldFilters) filter.disconnect();
      try { bus.disconnect(); } catch { /* already disconnected */ }
    }, 260);
  }
}

export const galleryAudio = new GalleryAudio();
