// Audio Synthesizer for Heartbeats and Medical Monitor Beeps using Web Audio API
class MedicalAudioService {
  private ctx: AudioContext | null = null;
  private isBeeperMuted: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isBeeperMuted = muted;
  }

  public getMuted() {
    return this.isBeeperMuted;
  }

  // Play monitor pulse beep (QRS beep)
  public playQRSBeep(pitch: number = 880) {
    if (this.isBeeperMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Audio not permitted yet
    }
  }

  // Play realistic stethoscope lub-dub (S1 and S2)
  public playHeartSound(isTachycardic: boolean = false) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // S1 (Lub) - Low pitch, slightly longer
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(65, now);
      osc1.frequency.exponentialRampToValueAtTime(45, now + 0.12);
      gain1.gain.setValueAtTime(0.35, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.15);

      // S2 (Dub) - Slightly higher, crisper
      const s2Delay = isTachycardic ? 0.16 : 0.24;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(80, now + s2Delay);
      osc2.frequency.exponentialRampToValueAtTime(55, now + s2Delay + 0.09);
      gain2.gain.setValueAtTime(0.28, now + s2Delay);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + s2Delay + 0.11);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + s2Delay);
      osc2.stop(now + s2Delay + 0.12);
    } catch {
      // Ignore audio error
    }
  }

  // Robot speech synthesis (Spanish modulated)
  public speakText(text: string, isFemale: boolean = false) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Strip asterisks for spoken voice
      const spokenClean = text.replace(/\*.*?\*/g, '').trim();
      if (!spokenClean) return;

      const utterance = new SpeechSynthesisUtterance(spokenClean);
      utterance.lang = 'es-ES';
      utterance.pitch = isFemale ? 1.25 : 0.85;
      utterance.rate = 0.95;

      // Select Spanish voice if available
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech error
    }
  }
}

export const medicalAudio = new MedicalAudioService();
