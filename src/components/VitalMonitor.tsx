import React, { useEffect, useRef, useState } from 'react';
import { VitalSigns, ClinicalStage } from '../types/clinical';
import { Heart, Activity, Wind, Thermometer, Volume2, VolumeX, AlertTriangle, ShieldCheck } from 'lucide-react';
import { medicalAudio } from '../utils/audioSynth';

interface VitalMonitorProps {
  vitals: VitalSigns;
  stage: ClinicalStage;
  caseId: string;
}

export const VitalMonitor: React.FC<VitalMonitorProps> = ({ vitals, stage, caseId }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Mean Arterial Pressure (MAP)
  const map = Math.round(vitals.bpDiastolic + (vitals.bpSystolic - vitals.bpDiastolic) / 3);

  // Toggle Audio Beep
  const toggleMute = () => {
    const nextState = !isAudioMuted;
    setIsAudioMuted(nextState);
    medicalAudio.setMuted(nextState);
  };

  // Heartbeat sound interval synced to vitals.heartRate
  useEffect(() => {
    if (isAudioMuted) return;

    const intervalMs = (60 / vitals.heartRate) * 1000;
    const interval = setInterval(() => {
      medicalAudio.playQRSBeep(vitals.heartRate > 110 ? 980 : 880);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [vitals.heartRate, isAudioMuted]);

  // Real-time canvas oscilloscope for ECG lead II / V3
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let x = 0;
    const width = canvas.width;
    const height = canvas.height;
    const baseline = height * 0.55;

    // Clear background once
    ctx.fillStyle = '#050c14';
    ctx.fillRect(0, 0, width, height);

    // Draw ECG grid lines
    ctx.strokeStyle = '#0d2238';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < width; gx += 20) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, height);
      ctx.stroke();
    }
    for (let gy = 0; gy < height; gy += 20) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(width, gy);
      ctx.stroke();
    }

    let phase = 0;
    const render = () => {
      // Sweep eraser ahead of the draw head
      ctx.fillStyle = '#050c14';
      ctx.fillRect(x, 0, 16, height);

      // Re-draw subtle grid in the erased area
      ctx.strokeStyle = '#0d2238';
      ctx.lineWidth = 1;
      const nearestGridX = Math.floor(x / 20) * 20;
      if (nearestGridX >= x && nearestGridX <= x + 16) {
        ctx.beginPath();
        ctx.moveTo(nearestGridX, 0);
        ctx.lineTo(nearestGridX, height);
        ctx.stroke();
      }
      for (let gy = 0; gy < height; gy += 20) {
        ctx.beginPath();
        ctx.moveTo(x, gy);
        ctx.lineTo(x + 16, gy);
        ctx.stroke();
      }

      // ECG wave generation based on cardiac phase
      // Speed proportional to HR
      const hrSpeed = (vitals.heartRate / 60) * 0.045;
      phase += hrSpeed;
      if (phase >= 1) phase -= 1;

      let yOffset = 0;
      const isCase1 = caseId === 'caso-01';

      if (phase < 0.15) {
        // P wave
        const pNorm = phase / 0.15;
        yOffset = -Math.sin(pNorm * Math.PI) * 7;
      } else if (phase >= 0.15 && phase < 0.22) {
        // PR segment
        yOffset = 0;
      } else if (phase >= 0.22 && phase < 0.25) {
        // Q wave
        yOffset = 4;
      } else if (phase >= 0.25 && phase < 0.31) {
        // R wave (tall spike)
        const rNorm = (phase - 0.25) / 0.06;
        yOffset = -Math.sin(rNorm * Math.PI) * 44;
      } else if (phase >= 0.31 && phase < 0.35) {
        // S wave
        yOffset = 8;
      } else if (phase >= 0.35 && phase < 0.55) {
        // ST Segment & T wave
        const stNorm = (phase - 0.35) / 0.20;
        if (isCase1 && stage !== 'resolved') {
          // ELEVATED ST WAVE (STEMI pattern: 3mm elevation = high plateau + hyperacute T wave)
          const stElev = 18; // Elevated baseline
          const tWave = Math.sin(stNorm * Math.PI) * 16;
          yOffset = -(stElev + tWave);
        } else {
          // Normal ST and T wave
          yOffset = -Math.sin(stNorm * Math.PI) * 10;
        }
      } else {
        // Isoelectric baseline
        yOffset = 0;
      }

      const currentY = baseline + yOffset;

      ctx.strokeStyle = stage === 'critical' ? '#ef4444' : stage === 'resolved' ? '#10b981' : '#06b6d4';
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 6;
      ctx.shadowColor = stage === 'critical' ? '#ef4444' : stage === 'resolved' ? '#10b981' : '#06b6d4';

      ctx.beginPath();
      ctx.moveTo(Math.max(0, x - 2), baseline);
      ctx.lineTo(x, currentY);
      ctx.stroke();

      ctx.shadowBlur = 0; // reset

      x += 2;
      if (x >= width) {
        x = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [vitals.heartRate, caseId, stage]);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-4 text-white shadow-2xl relative overflow-hidden">
      {/* Top Monitor Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  stage === 'critical' || stage === 'worsened'
                    ? 'bg-red-400'
                    : stage === 'resolved'
                    ? 'bg-emerald-400'
                    : 'bg-cyan-400'
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${
                  stage === 'critical' || stage === 'worsened'
                    ? 'bg-red-500'
                    : stage === 'resolved'
                    ? 'bg-emerald-500'
                    : 'bg-cyan-500'
                }`}
              ></span>
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-slate-300">
              MONITOR HEMODINÁMICO MULTIPARAMÉTRICO
            </span>
          </div>

          <span className="text-xs font-mono text-slate-500 hidden sm:inline">
            DERIVACIÓN II / V3
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
            title={isAudioMuted ? 'Activar sonido del monitor' : 'Silenciar sonido del monitor'}
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span>Mute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Beep</span>
              </>
            )}
          </button>

          <div
            className={`px-2.5 py-0.5 rounded text-xs font-mono font-semibold uppercase tracking-wider ${
              stage === 'critical'
                ? 'bg-red-950/80 text-red-400 border border-red-800 animate-pulse'
                : stage === 'worsened'
                ? 'bg-amber-950/80 text-amber-400 border border-amber-800'
                : stage === 'resolved'
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                : 'bg-cyan-950/80 text-cyan-400 border border-cyan-800'
            }`}
          >
            {stage === 'critical'
              ? 'ALARMA CRÍTICA'
              : stage === 'worsened'
              ? 'DETERIORO'
              : stage === 'resolved'
              ? 'ESTABLE / TRATADO'
              : 'EN OBSERVACIÓN'}
          </div>
        </div>
      </div>

      {/* Main Grid: ECG Canvas + Digital Numeric Vitals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* ECG Live Canvas Sweep */}
        <div className="lg:col-span-6 xl:col-span-7 bg-[#050c14] border border-cyan-950/80 rounded-lg p-2 relative shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400/80 mb-1 px-1">
            <span>ECG 25 mm/s · 10 mm/mV</span>
            {caseId === 'caso-01' && stage !== 'resolved' && (
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> ST ↑ +3mm V1-V4
              </span>
            )}
            {stage === 'resolved' && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Reperfusión adecuada
              </span>
            )}
          </div>
          <canvas
            ref={canvasRef}
            width={520}
            height={115}
            className="w-full h-[105px] sm:h-[120px] rounded block"
          />
        </div>

        {/* Digital Numerical Vitals Display */}
        <div className="lg:col-span-6 xl:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {/* FC */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" /> FC
              </span>
              <span className="text-[10px]">lpm</span>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-rose-400 tracking-tight">
              {vitals.heartRate}
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              {vitals.heartRate > 100 ? 'Taquicardia' : vitals.heartRate < 60 ? 'Bradicardia' : 'Normal'}
            </div>
          </div>

          {/* PA */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-cyan-400" /> PA
              </span>
              <span className="text-[10px]">mmHg</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-400 tracking-tight">
              {vitals.bpSystolic}/{vitals.bpDiastolic}
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              PAM: {map} mmHg
            </div>
          </div>

          {/* SatO2 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-emerald-400" /> SatO2
              </span>
              <span className="text-[10px]">%</span>
            </div>
            <div
              className={`text-2xl sm:text-3xl font-mono font-bold tracking-tight ${
                vitals.oxygenSat < 90 ? 'text-amber-400 animate-pulse' : 'text-emerald-400'
              }`}
            >
              {vitals.oxygenSat}%
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              {vitals.oxygenSat < 90 ? 'Hipoxemia' : 'Normoxia'}
            </div>
          </div>

          {/* FR */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>FR</span>
              <span className="text-[10px]">rpm</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-sky-300 tracking-tight">
              {vitals.respRate}
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              {vitals.respRate > 20 ? 'Taquipnea' : 'Normal'}
            </div>
          </div>

          {/* Temperatura */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-orange-400" /> Temp
              </span>
              <span className="text-[10px]">°C</span>
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-orange-300 tracking-tight">
              {vitals.temperature.toFixed(1)}°
            </div>
            <div className="text-[10px] font-mono text-slate-500">Afebril</div>
          </div>

          {/* EVA Dolor */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Dolor (EVA)</span>
              <span className="text-[10px]">/10</span>
            </div>
            <div
              className={`text-xl sm:text-2xl font-mono font-bold tracking-tight ${
                vitals.painScore >= 7
                  ? 'text-red-400'
                  : vitals.painScore >= 4
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {vitals.painScore}
              <span className="text-xs font-normal text-slate-500">/10</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 truncate">
              {vitals.painScore >= 7 ? 'Intenso' : vitals.painScore >= 4 ? 'Moderado' : 'Leve/Cede'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
