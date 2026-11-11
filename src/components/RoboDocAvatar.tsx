import React, { useState } from 'react';
import { ClinicalCase, VitalSigns, ClinicalStage } from '../types/clinical';
import { Stethoscope, Activity, Sparkles, AlertCircle } from 'lucide-react';

interface RoboDocAvatarProps {
  clinicalCase: ClinicalCase;
  vitals: VitalSigns;
  stage: ClinicalStage;
  onSelectAction: (query: string) => void;
}

export const RoboDocAvatar: React.FC<RoboDocAvatarProps> = ({
  clinicalCase,
  vitals,
  stage,
  onSelectAction,
}) => {
  const [hoverZone, setHoverZone] = useState<string | null>(null);

  const isYellow = clinicalCase.colorTheme === 'yellow';
  const isPink = clinicalCase.colorTheme === 'pink';
  const isBlue = !isYellow && !isPink;

  // Eye and LED color based on stage and colorTheme
  let glowColor = isYellow ? '#eab308' : isPink ? '#ec4899' : '#06b6d4';
  let chassisAccent = isYellow
    ? 'border-amber-500/40 shadow-amber-950/30'
    : isPink
    ? 'border-pink-500/40'
    : 'border-cyan-500/40';
  let badgeColor = isYellow
    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
    : isPink
    ? 'bg-pink-500/10 text-pink-400 border-pink-500/30'
    : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';

  if (stage === 'critical' || stage === 'worsened') {
    glowColor = '#ef4444';
    chassisAccent = 'border-red-500/60 shadow-red-950/50';
    badgeColor = 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse';
  } else if (stage === 'resolved') {
    glowColor = '#10b981';
    chassisAccent = 'border-emerald-500/50 shadow-emerald-950/40';
    badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
  }

  const modelLabel = isYellow
    ? 'MODELO AMARILLO (M)'
    : isPink
    ? 'MODELO ROSA (F)'
    : 'MODELO AZUL (M)';

  // Calculate heartbeat duration in seconds for css animation
  const heartBeatSec = (60 / vitals.heartRate).toFixed(2);

  return (
    <div
      className={`bg-slate-900/90 border ${chassisAccent} rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between relative shadow-xl backdrop-blur-sm transition-all duration-300`}
    >
      {/* Robot Chassis Header Badge */}
      <div className="w-full flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full animate-ping"
            style={{ backgroundColor: glowColor }}
          />
          <span className="text-xs font-mono font-bold text-slate-300">
            HIPÓCRATES · {modelLabel}
          </span>
        </div>
        <div className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-medium ${badgeColor}`}>
          {clinicalCase.age} AÑOS · {stage === 'resolved' ? 'ESTABILIZADO' : stage === 'worsened' ? 'DETERIORO' : 'SINTOMÁTICO'}
        </div>
      </div>

      {/* Interactive Avatar SVG Body Container */}
      <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] flex items-center justify-center my-1">
        <svg
          viewBox="0 0 400 500"
          className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] select-none"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isYellow ? '#2d2514' : isBlue ? '#1e293b' : '#332738'} />
              <stop offset="50%" stopColor={isYellow ? '#19150b' : isBlue ? '#0f172a' : '#1e1b2e'} />
              <stop offset="100%" stopColor={isYellow ? '#0e0b06' : isBlue ? '#090d16' : '#14121f'} />
            </linearGradient>

            <linearGradient id="plateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isYellow ? '#4a3d24' : isBlue ? '#334155' : '#4a384f'} />
              <stop offset="100%" stopColor={isYellow ? '#282113' : isBlue ? '#1e293b' : '#281e2b'} />
            </linearGradient>

            <radialGradient id="reactorGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={glowColor} stopOpacity="1" />
              <stop offset="60%" stopColor={glowColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Neck Support */}
          <rect x="175" y="140" width="50" height="35" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <line x1="185" y1="150" x2="215" y2="150" stroke={glowColor} strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="185" y1="160" x2="215" y2="160" stroke={glowColor} strokeWidth="1.5" strokeOpacity="0.6" />

          {/* Left & Right Shoulders */}
          <circle cx="85" cy="200" r="30" fill="url(#plateGrad)" stroke="#475569" strokeWidth="2" />
          <circle cx="315" cy="200" r="30" fill="url(#plateGrad)" stroke="#475569" strokeWidth="2" />

          {/* Torso Shell */}
          <path
            d="M 110,180 L 290,180 L 275,370 L 200,400 L 125,370 Z"
            fill="url(#chassisGrad)"
            stroke={isYellow ? '#eab308' : isBlue ? '#38bdf8' : '#f472b6'}
            strokeWidth="2.5"
            strokeOpacity="0.7"
          />

          {/* Clavicular & Rib Lines */}
          <path d="M 130,210 L 200,230 L 270,210" fill="none" stroke="#475569" strokeWidth="2" />
          <path d="M 135,270 L 175,285" fill="none" stroke="#334155" strokeWidth="1.5" />
          <path d="M 265,270 L 225,285" fill="none" stroke="#334155" strokeWidth="1.5" />
          <path d="M 140,310 L 175,325" fill="none" stroke="#334155" strokeWidth="1.5" />
          <path d="M 260,310 L 225,325" fill="none" stroke="#334155" strokeWidth="1.5" />

          {/* Cardiac Reactor (Pulsing Heart Core) */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectAction('Ausculto el tórax y corazón')}
            onMouseEnter={() => setHoverZone('cardiac')}
            onMouseLeave={() => setHoverZone(null)}
          >
            <circle cx="180" cy="255" r="40" fill="url(#reactorGlow)" opacity="0.35" />
            <circle
              cx="180"
              cy="255"
              r="24"
              fill="#090d16"
              stroke={glowColor}
              strokeWidth="2.5"
            />
            {/* Heart Core Icon */}
            <path
              d="M 180,268 C 170,256 164,248 164,242 C 164,236 169,232 175,232 C 178,232 180,234 180,236 C 180,234 182,232 185,232 C 191,232 196,236 196,242 C 196,248 190,256 180,268 Z"
              fill={glowColor}
              style={{
                transformOrigin: '180px 250px',
                animation: `pulse ${heartBeatSec}s infinite`,
              }}
            />
            {hoverZone === 'cardiac' && (
              <circle cx="180" cy="255" r="28" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 2" />
            )}
          </g>

          {/* Left Arm (Patient Right / Screen Left) */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectAction('Tomo la presión en el brazo')}
            onMouseEnter={() => setHoverZone('arm_left')}
            onMouseLeave={() => setHoverZone(null)}
          >
            <rect x="55" y="225" width="30" height="90" rx="12" fill="url(#chassisGrad)" stroke="#475569" strokeWidth="2" />
            {/* Blood Pressure Cuff indicator */}
            <rect x="53" y="245" width="34" height="40" rx="4" fill="#0f172a" stroke={isYellow ? '#eab308' : isBlue ? '#38bdf8' : '#f472b6'} strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="70" y="268" textAnchor="middle" fill={glowColor} fontSize="9" fontFamily="monospace">PA</text>
          </g>

          {/* Right Arm (Irradiation site - Left Arm of Patient) */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectAction('¿El dolor se irradia hacia el brazo izquierdo?')}
            onMouseEnter={() => setHoverZone('arm_right')}
            onMouseLeave={() => setHoverZone(null)}
          >
            <rect x="315" y="225" width="30" height="90" rx="12" fill="url(#chassisGrad)" stroke="#475569" strokeWidth="2" />
            {clinicalCase.id === 'caso-01' && stage !== 'resolved' && (
              <line x1="330" y1="230" x2="330" y2="305" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.8" />
            )}
          </g>

          {/* Abdomen Zone */}
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
            {/* Outer Head Shell */}
            <rect
              x="125"
              y="35"
              width="150"
              height="115"
              rx="28"
              fill="url(#chassisGrad)"
              stroke={isYellow ? '#eab308' : isBlue ? '#38bdf8' : '#f472b6'}
              strokeWidth="2.5"
            />

            {/* Antennas / Sensor Ears */}
            <rect x="110" y="70" width="15" height="40" rx="5" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            <rect x="275" y="70" width="15" height="40" rx="5" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            <circle cx="117" cy="65" r="4" fill={glowColor} />
            <circle cx="283" cy="65" r="4" fill={glowColor} />

            {/* Faceplate Visor */}
            <rect
              x="142"
              y="55"
              width="116"
              height="65"
              rx="16"
              fill="#050a12"
              stroke="#1e293b"
              strokeWidth="2"
            />

            {/* Glowing LED Eyes based on Pain / Stage */}
            {stage === 'critical' ? (
              // Critical X Eyes
              <g stroke="#ef4444" strokeWidth="3" strokeLinecap="round">
                <line x1="165" y1="75" x2="185" y2="95" />
                <line x1="185" y1="75" x2="165" y2="95" />
                <line x1="215" y1="75" x2="235" y2="95" />
                <line x1="235" y1="75" x2="215" y2="95" />
              </g>
            ) : vitals.painScore >= 6 ? (
              // Anguished / Pain Expression: Inverted brow slits
              <g>
                <path d="M 162,88 L 188,80" stroke={glowColor} strokeWidth="4" strokeLinecap="round" />
                <path d="M 238,88 L 212,80" stroke={glowColor} strokeWidth="4" strokeLinecap="round" />
                <circle cx="175" cy="88" r="3.5" fill={glowColor} />
                <circle cx="225" cy="88" r="3.5" fill={glowColor} />
              </g>
            ) : (
              // Calm / Normal Eyes
              <g>
                <ellipse cx="175" cy="85" rx="10" ry="7" fill={glowColor} />
                <ellipse cx="225" cy="85" rx="10" ry="7" fill={glowColor} />
                <ellipse cx="177" cy="83" rx="3" ry="2" fill="#ffffff" />
                <ellipse cx="227" cy="83" rx="3" ry="2" fill="#ffffff" />
              </g>
            )}

            {/* Speaker / Mouth Grille */}
            <g stroke="#334155" strokeWidth="1.5">
              <line x1="180" y1="105" x2="220" y2="105" />
              <line x1="185" y1="109" x2="215" y2="109" />
            </g>

            {/* Sweat Drop / Diaforesis indicator if in pain */}
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

        {/* Hover / Tooltip Floating Badge */}
        {hoverZone && (
          <div className="absolute top-2 bg-slate-950/90 text-cyan-300 border border-cyan-500/50 px-3 py-1 rounded-full text-xs font-mono shadow-lg pointer-events-none flex items-center gap-1.5 animate-in fade-in zoom-in-95">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            {hoverZone === 'cardiac' && 'Clic para auscultación cardíaca'}
            {hoverZone === 'head' && 'Clic para preguntar irradiación (mandíbula)'}
            {hoverZone === 'arm_left' && 'Clic para tomar presión arterial'}
            {hoverZone === 'arm_right' && 'Clic para explorar brazo izquierdo'}
            {hoverZone === 'abdomen' && 'Clic para palpar abdomen'}
          </div>
        )}
      </div>

      {/* Quick Interactive Examination Dock */}
      <div className="w-full mt-2 pt-3 border-t border-slate-800">
        <div className="text-[11px] font-mono text-slate-400 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Stethoscope className="w-3.5 h-3.5 text-cyan-400" /> ACCIONES FÍSICAS DIRECTAS:
          </span>
          <span className="text-[10px] text-slate-500">Haz clic para interactuar</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => onSelectAction('Ausculto el corazón y foco precordial')}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 text-left transition-colors text-xs font-medium"
          >
            <Stethoscope className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="truncate">Auscultar Corazón</span>
          </button>

          <button
            onClick={() => onSelectAction('Ausculto ambos campos pulmonares')}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 text-left transition-colors text-xs font-medium"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">Auscultar Pulmones</span>
          </button>

          <button
            onClick={() => onSelectAction('Tomo la presión arterial con esfigmomanómetro')}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 text-left transition-colors text-xs font-medium"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">Medir Presión (PA)</span>
          </button>

          <button
            onClick={() => onSelectAction('Reviso la piel, diaforesis y pulsos periféricos')}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 text-left transition-colors text-xs font-medium"
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">Piel & Diaforesis</span>
          </button>
        </div>
      </div>
    </div>
  );
};
