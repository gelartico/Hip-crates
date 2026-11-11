import React, { useEffect, useRef, useState } from 'react';
import { ClinicalCase, VitalSigns, ClinicalStage } from '../types/clinical';
import { Heart, Activity, Wind, Thermometer, Volume2, VolumeX, AlertTriangle } from 'lucide-react';
import { medicalAudio } from '../utils/audioSynth';

interface LeftRobotColumnProps {
  clinicalCase: ClinicalCase;
  vitals: VitalSigns;
  stage: ClinicalStage;
  onSelectAction: (query: string) => void;
}

export const LeftRobotColumn: React.FC<LeftRobotColumnProps> = ({
  clinicalCase,
  vitals,
  stage,
  onSelectAction,
}) => {
  const [hoverZone, setHoverZone] = useState<string | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isYellow = clinicalCase.colorTheme === 'yellow';
  const isPink = clinicalCase.colorTheme === 'pink';
  const isBlue = !isYellow && !isPink;

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

    ctx.fillStyle = '#050c14';
    ctx.fillRect(0, 0, width, height);

    let phase = 0;
    const render = () => {
      ctx.fillStyle = '#050c14';
      ctx.fillRect(x, 0, 14, height);

      // Grid line
      ctx.strokeStyle = '#0d2238';
      ctx.lineWidth = 1;
      const nearestGridX = Math.floor(x / 18) * 18;
      if (nearestGridX >= x && nearestGridX <= x + 14) {
        ctx.beginPath();
        ctx.moveTo(nearestGridX, 0);
        ctx.lineTo(nearestGridX, height);
        ctx.stroke();
      }

      const hrSpeed = (vitals.heartRate / 60) * 0.045;
      phase += hrSpeed;
      if (phase >= 1) phase -= 1;

      let yOffset = 0;
      const isCase1 = clinicalCase.id === 'caso-01';

      if (phase < 0.15) {
        const pNorm = phase / 0.15;
        yOffset = -Math.sin(pNorm * Math.PI) * 5;
      } else if (phase >= 0.22 && phase < 0.25) {
        yOffset = 3;
      } else if (phase >= 0.25 && phase < 0.31) {
        const rNorm = (phase - 0.25) / 0.06;
        yOffset = -Math.sin(rNorm * Math.PI) * 38;
      } else if (phase >= 0.31 && phase < 0.35) {
        yOffset = 6;
      } else if (phase >= 0.35 && phase < 0.55) {
        const stNorm = (phase - 0.35) / 0.2;
        if (isCase1 && stage !== 'resolved') {
          // STEMI ST elevation
          yOffset = -(15 + Math.sin(stNorm * Math.PI) * 12);
        } else {
          yOffset = -Math.sin(stNorm * Math.PI) * 8;
        }
      }

      const currentY = baseline + yOffset;

      ctx.strokeStyle =
        stage === 'critical'
          ? '#ef4444'
          : stage === 'resolved'
          ? '#10b981'
          : isYellow
          ? '#eab308'
          : isBlue
          ? '#06b6d4'
          : '#ec4899';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 4;
      ctx.shadowColor = ctx.strokeStyle;

      ctx.beginPath();
      ctx.moveTo(Math.max(0, x - 2), baseline);
      ctx.lineTo(x, currentY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      x += 2;
      if (x >= width) x = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [vitals.heartRate, clinicalCase.id, stage, isBlue]);

  // Eye and LED color based on stage
  let glowColor = isYellow ? '#eab308' : isPink ? '#ec4899' : '#06b6d4';
  let chassisAccent = isYellow
    ? 'border-amber-500/40 shadow-amber-950/30'
    : isPink
    ? 'border-pink-500/40'
    : 'border-cyan-500/40';

  if (stage === 'critical' || stage === 'worsened') {
    glowColor = '#ef4444';
    chassisAccent = 'border-red-500/60 shadow-red-950/50';
  } else if (stage === 'resolved') {
    glowColor = '#10b981';
    chassisAccent = 'border-emerald-500/50 shadow-emerald-950/40';
  }

  const modelLabel = isYellow
    ? 'AMARILLO (M)'
    : isPink
    ? 'ROSA (F)'
    : 'AZUL (M)';

  const heartBeatSec = (60 / vitals.heartRate).toFixed(2);
  const map = Math.round(vitals.bpDiastolic + (vitals.bpSystolic - vitals.bpDiastolic) / 3);

  // Pathological thresholds
  const isPaPathological = vitals.bpSystolic < 90 || vitals.bpSystolic >= 140 || vitals.bpDiastolic < 60 || vitals.bpDiastolic >= 90;
  const isFcPathological = vitals.heartRate > 100 || vitals.heartRate < 60;
  const isSatPathological = vitals.oxygenSat < 92;
  const isTempPathological = vitals.temperature >= 37.8 || vitals.temperature < 35.8;
  const hasStElevation = (clinicalCase.id === 'caso_car_001' || clinicalCase.id === 'caso-01') && stage !== 'resolved';

  return (
    <div className="w-full max-w-[260px] mx-auto flex flex-col gap-2.5">
      {/* 1. Robot Avatar Chassis Card (Clean & Compact) */}
      <div
        className={`bg-slate-900/95 border ${chassisAccent} rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-between relative shadow-lg backdrop-blur-xs transition-all duration-300`}
      >
        {/* Header Badge */}
        <div className="w-full flex items-center justify-between mb-1.5 border-b border-slate-800/80 pb-1.5">
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: glowColor }}
            />
            <span className="text-[11px] font-mono font-bold text-slate-200">
              HIPÓCRATES · {modelLabel}
            </span>
          </div>

          <div
            className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
              stage === 'critical'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                : stage === 'worsened'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : stage === 'resolved'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : isYellow
                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                : isPink
                ? 'bg-pink-500/10 text-pink-300 border border-pink-500/30'
                : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
            }`}
          >
            {clinicalCase.age}A · {stage === 'resolved' ? 'ESTABLE' : stage === 'worsened' ? 'DETERIORO' : 'SINTOMÁTICO'}
          </div>
        </div>

        {/* Robot SVG Graphics Container (Centered & Proportionate) */}
        <div className="relative w-full max-w-[210px] aspect-[4/4.8] flex items-center justify-center my-0.5">
          <svg
            viewBox="0 0 400 500"
            className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] select-none"
          >
            <defs>
              <linearGradient id="leftChassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isYellow ? '#2d2514' : isBlue ? '#1e293b' : '#332738'} />
                <stop offset="50%" stopColor={isYellow ? '#19150b' : isBlue ? '#0f172a' : '#1e1b2e'} />
                <stop offset="100%" stopColor={isYellow ? '#0e0b06' : isBlue ? '#090d16' : '#14121f'} />
              </linearGradient>

              <linearGradient id="leftPlateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isYellow ? '#4a3d24' : isBlue ? '#334155' : '#4a384f'} />
                <stop offset="100%" stopColor={isYellow ? '#282113' : isBlue ? '#1e293b' : '#281e2b'} />
              </linearGradient>

              <radialGradient id="leftReactorGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={glowColor} stopOpacity="1" />
                <stop offset="60%" stopColor={glowColor} stopOpacity="0.4" />
                <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Neck */}
            <rect x="175" y="140" width="50" height="35" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <line x1="185" y1="150" x2="215" y2="150" stroke={glowColor} strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="185" y1="160" x2="215" y2="160" stroke={glowColor} strokeWidth="1.5" strokeOpacity="0.6" />

            {/* Shoulders */}
            <circle cx="85" cy="200" r="30" fill="url(#leftPlateGrad)" stroke="#475569" strokeWidth="2" />
            <circle cx="315" cy="200" r="30" fill="url(#leftPlateGrad)" stroke="#475569" strokeWidth="2" />

            {/* Torso */}
            <path
              d="M 110,180 L 290,180 L 275,370 L 200,400 L 125,370 Z"
              fill="url(#leftChassisGrad)"
              stroke={isYellow ? '#eab308' : isBlue ? '#38bdf8' : '#f472b6'}
              strokeWidth="2.5"
              strokeOpacity="0.7"
            />

            {/* Rib Lines */}
            <path d="M 130,210 L 200,230 L 270,210" fill="none" stroke="#475569" strokeWidth="2" />
            <path d="M 135,270 L 175,285" fill="none" stroke="#334155" strokeWidth="1.5" />
            <path d="M 265,270 L 225,285" fill="none" stroke="#334155" strokeWidth="1.5" />
            <path d="M 140,310 L 175,325" fill="none" stroke="#334155" strokeWidth="1.5" />
            <path d="M 260,310 L 225,325" fill="none" stroke="#334155" strokeWidth="1.5" />

            {/* Heart Reactor */}
            <g
              className="cursor-pointer"
              onClick={() => onSelectAction('Ausculto el tórax y corazón')}
              onMouseEnter={() => setHoverZone('cardiac')}
              onMouseLeave={() => setHoverZone(null)}
            >
              <circle cx="180" cy="255" r="40" fill="url(#leftReactorGlow)" opacity="0.35" />
              <circle
                cx="180"
                cy="255"
                r="24"
                fill="#090d16"
                stroke={glowColor}
                strokeWidth="2.5"
              />
              <path
                d="M 180,268 C 170,256 164,248 164,242 C 164,236 169,232 175,232 C 178,232 180,234 180,236 C 180,234 182,232 185,232 C 191,232 196,236 196,242 C 196,248 190,256 180,268 Z"
                fill={glowColor}
                style={{
                  transformOrigin: '180px 250px',
                  animation: `pulse ${heartBeatSec}s infinite`,
                }}
              />
            </g>

            {/* Left Arm (Cuff) */}
            <g
              className="cursor-pointer"
              onClick={() => onSelectAction('Tomo la presión en el brazo')}
              onMouseEnter={() => setHoverZone('arm_left')}
              onMouseLeave={() => setHoverZone(null)}
            >
              <rect x="55" y="225" width="30" height="90" rx="12" fill="url(#leftChassisGrad)" stroke="#475569" strokeWidth="2" />
              <rect x="53" y="245" width="34" height="40" rx="4" fill="#0f172a" stroke={isYellow ? '#eab308' : isBlue ? '#38bdf8' : '#f472b6'} strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="70" y="268" textAnchor="middle" fill={glowColor} fontSize="9" fontFamily="monospace">PA</text>
            </g>

            {/* Right Arm (Irradiation) */}
            <g
              className="cursor-pointer"
              onClick={() => onSelectAction('¿El dolor se irradia hacia el brazo izquierdo?')}
              onMouseEnter={() => setHoverZone('arm_right')}
              onMouseLeave={() => setHoverZone(null)}
            >
              <rect x="315" y="225" width="30" height="90" rx="12" fill="url(#leftChassisGrad)" stroke="#475569" strokeWidth="2" />
              {hasStElevation && (
                <line x1="330" y1="230" x2="330" y2="305" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.8" />
              )}
            </g>

            {/* Abdomen */}
            <g
              className="cursor-pointer"
              onClick={() => onSelectAction('Palpo el abdomen')}
              onMouseEnter={() => setHoverZone('abdomen')}
              onMouseLeave={() => setHoverZone(null)}
            >
              <path
                d="M 155,340 L 245,340 L 235,385 L 165,385 Z"
                fill={hoverZone === 'abdomen' ? (isYellow ? 'rgba(234, 179, 8, 0.2)' : 'rgba(56, 189, 248, 0.15)') : '#0f172a'}
                stroke={isYellow ? '#ca8a04' : '#334155'}
                strokeWidth="1.5"
              />
              <circle cx="200" cy="362" r="4" fill="#475569" />
            </g>

            {/* Robot Head */}
            <g
              className="cursor-pointer"
              onClick={() => onSelectAction('¿Siente dolor en el cuello o mandíbula?')}
              onMouseEnter={() => setHoverZone('head')}
              onMouseLeave={() => setHoverZone(null)}
            >
              <rect
                x="125"
                y="35"
                width="150"
                height="115"
                rx="28"
                fill="url(#leftChassisGrad)"
                stroke={isYellow ? '#eab308' : isBlue ? '#38bdf8' : '#f472b6'}
                strokeWidth="2.5"
              />
              <rect x="110" y="70" width="15" height="40" rx="5" fill="#334155" stroke="#475569" strokeWidth="1.5" />
              <rect x="275" y="70" width="15" height="40" rx="5" fill="#334155" stroke="#475569" strokeWidth="1.5" />
              <circle cx="117" cy="65" r="4" fill={glowColor} />
              <circle cx="283" cy="65" r="4" fill={glowColor} />

              <rect x="142" y="55" width="116" height="65" rx="16" fill="#050a12" stroke="#1e293b" strokeWidth="2" />

              {/* Eyes */}
              {stage === 'critical' ? (
                <g stroke="#ef4444" strokeWidth="3" strokeLinecap="round">
                  <line x1="165" y1="75" x2="185" y2="95" />
                  <line x1="185" y1="75" x2="165" y2="95" />
                  <line x1="215" y1="75" x2="235" y2="95" />
                  <line x1="235" y1="75" x2="215" y2="95" />
                </g>
              ) : vitals.painScore >= 6 ? (
                <g>
                  <path d="M 162,88 L 188,80" stroke={glowColor} strokeWidth="4" strokeLinecap="round" />
                  <path d="M 238,88 L 212,80" stroke={glowColor} strokeWidth="4" strokeLinecap="round" />
                  <circle cx="175" cy="88" r="3.5" fill={glowColor} />
                  <circle cx="225" cy="88" r="3.5" fill={glowColor} />
                </g>
              ) : (
                <g>
                  <ellipse cx="175" cy="85" rx="10" ry="7" fill={glowColor} />
                  <ellipse cx="225" cy="85" rx="10" ry="7" fill={glowColor} />
                  <ellipse cx="177" cy="83" rx="3" ry="2" fill="#ffffff" />
                  <ellipse cx="227" cy="83" rx="3" ry="2" fill="#ffffff" />
                </g>
              )}

              <g stroke="#334155" strokeWidth="1.5">
                <line x1="180" y1="105" x2="220" y2="105" />
                <line x1="185" y1="109" x2="215" y2="109" />
              </g>

              {vitals.painScore >= 7 && (
                <path
                  d="M 252,65 C 252,61 247,56 247,56 C 247,56 242,61 242,65 C 242,68 244,70 247,70 C 250,70 252,68 252,65 Z"
                  fill="#38bdf8"
                  opacity="0.9"
                  className="animate-bounce"
                />
              )}
            </g>
          </svg>

          {hoverZone && (
            <div className="absolute top-1 bg-slate-950/95 text-cyan-300 border border-cyan-500/50 px-2 py-0.5 rounded-full text-[10px] font-mono shadow-lg pointer-events-none">
              {hoverZone === 'cardiac' && 'Auscultar corazón'}
              {hoverZone === 'head' && 'Explorar cuello'}
              {hoverZone === 'arm_left' && 'Medir PA'}
              {hoverZone === 'arm_right' && 'Explorar brazo'}
              {hoverZone === 'abdomen' && 'Palpar abdomen'}
            </div>
          )}
        </div>
      </div>

      {/* 2. Vital Signs Monitors: 4 Mini-Cards Grid (PA, FC, SatO2, Temp) */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-lg text-white space-y-2">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  stage === 'critical' || stage === 'worsened' ? 'bg-rose-400' : 'bg-emerald-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  stage === 'critical' || stage === 'worsened' ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
              />
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-200 uppercase tracking-wider">
              SIGNOS VITALES
            </span>
          </div>

          <button
            onClick={toggleMute}
            className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-colors"
            title={isAudioMuted ? 'Activar sonido' : 'Silenciar sonido'}
          >
            {isAudioMuted ? <VolumeX className="w-2.5 h-2.5 text-rose-400" /> : <Volume2 className="w-2.5 h-2.5 text-emerald-400" />}
            <span>{isAudioMuted ? 'Mute' : 'Beep'}</span>
          </button>
        </div>

        {/* Mini Oscilloscope ECG Strip */}
        <div className="bg-[#050c14] border border-cyan-950/80 rounded-lg p-1 shadow-inner">
          <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400/80 mb-0.5 px-0.5">
            <span>ECG Derivación II</span>
            {hasStElevation && (
              <span className="text-amber-400 font-bold flex items-center gap-0.5">
                <AlertTriangle className="w-2.5 h-2.5" /> ST ↑ +3mm
              </span>
            )}
          </div>
          <canvas ref={canvasRef} width={240} height={36} className="w-full h-8 rounded block" />
        </div>

        {/* 4 Mini-Cards Grid: PA, FC, SatO2, Temp */}
        <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
          {/* 1. PA (Presión Arterial) */}
          <div
            className={`p-2 rounded-xl border transition-colors ${
              isPaPathological
                ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                : 'bg-slate-950/90 border-slate-800/90 text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Activity className={`w-3 h-3 ${isPaPathological ? 'text-rose-400' : 'text-cyan-400'}`} /> PA
              </span>
              <span className="text-[9px]">mmHg</span>
            </div>
            <div className={`text-base font-bold mt-0.5 ${isPaPathological ? 'text-rose-400' : 'text-cyan-400'}`}>
              {vitals.bpSystolic}/{vitals.bpDiastolic}
            </div>
            <div className={`text-[9px] truncate ${isPaPathological ? 'text-rose-400/80' : 'text-slate-500'}`}>
              PAM {map} · {vitals.bpSystolic < 90 ? 'Hipotenso' : vitals.bpSystolic >= 140 ? 'Hipertenso' : 'Normal'}
            </div>
          </div>

          {/* 2. FC (Frecuencia Cardíaca) */}
          <div
            className={`p-2 rounded-xl border transition-colors ${
              isFcPathological
                ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                : 'bg-slate-950/90 border-slate-800/90 text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Heart className={`w-3 h-3 ${isFcPathological ? 'text-rose-400 animate-pulse' : 'text-rose-500'}`} /> FC
              </span>
              <span className="text-[9px]">lpm</span>
            </div>
            <div className={`text-base font-bold mt-0.5 ${isFcPathological ? 'text-rose-400' : 'text-rose-400'}`}>
              {vitals.heartRate}
            </div>
            <div className={`text-[9px] truncate ${isFcPathological ? 'text-rose-400/80' : 'text-slate-500'}`}>
              {vitals.heartRate > 100 ? 'Taquicardia' : vitals.heartRate < 60 ? 'Bradicardia' : 'Normal'}
            </div>
          </div>

          {/* 3. SatO2 (Saturación de Oxígeno) */}
          <div
            className={`p-2 rounded-xl border transition-colors ${
              isSatPathological
                ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                : 'bg-slate-950/90 border-slate-800/90 text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Wind className={`w-3 h-3 ${isSatPathological ? 'text-amber-400' : 'text-emerald-400'}`} /> SatO2
              </span>
              <span className="text-[9px]">%</span>
            </div>
            <div
              className={`text-base font-bold mt-0.5 ${
                isSatPathological ? 'text-amber-400 animate-pulse' : 'text-emerald-400'
              }`}
            >
              {vitals.oxygenSat}%
            </div>
            <div className={`text-[9px] truncate ${isSatPathological ? 'text-amber-400/80' : 'text-slate-500'}`}>
              {vitals.oxygenSat < 90 ? 'Hipoxemia severa' : vitals.oxygenSat < 95 ? 'Hipoxemia leve' : 'Aire amb.'}
            </div>
          </div>

          {/* 4. Temp (Temperatura) */}
          <div
            className={`p-2 rounded-xl border transition-colors ${
              isTempPathological
                ? 'bg-orange-950/30 border-orange-500/50 text-orange-200'
                : 'bg-slate-950/90 border-slate-800/90 text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Thermometer className={`w-3 h-3 ${isTempPathological ? 'text-orange-400' : 'text-orange-300'}`} /> Temp
              </span>
              <span className="text-[9px]">°C</span>
            </div>
            <div className={`text-base font-bold mt-0.5 ${isTempPathological ? 'text-orange-400' : 'text-orange-300'}`}>
              {vitals.temperature.toFixed(1)}°
            </div>
            <div className={`text-[9px] truncate ${isTempPathological ? 'text-orange-400/80' : 'text-slate-500'}`}>
              {vitals.temperature >= 38 ? 'Fiebre' : vitals.temperature >= 37.5 ? 'Febrícula' : 'Normotermia'}
            </div>
          </div>
        </div>

        {/* Secondary: FR & EVA Dolor */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1 pt-1 border-t border-slate-800/80">
          <span>FR: <strong className="text-sky-300">{vitals.respRate} rpm</strong></span>
          <span>EVA: <strong className={vitals.painScore >= 7 ? 'text-rose-400' : vitals.painScore >= 4 ? 'text-amber-400' : 'text-emerald-400'}>{vitals.painScore}/10</strong></span>
          <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${stage === 'resolved' ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-300'}`}>
            {stage === 'resolved' ? 'ESTABLE' : 'ALERTA'}
          </span>
        </div>
      </div>
    </div>
  );
};
