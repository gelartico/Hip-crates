import React, { useState } from 'react';
import { ClinicalCase } from '../types/clinical';
import { Activity, AlertTriangle, FileText, Info } from 'lucide-react';

interface EcgViewerProps {
  clinicalCase: ClinicalCase;
}

export const EcgViewer: React.FC<EcgViewerProps> = ({ clinicalCase }) => {
  const [paperTheme, setPaperTheme] = useState<'pink' | 'dark'>('pink');
  const [showAnalysis, setShowAnalysis] = useState(true);

  const isCase1 = clinicalCase.id === 'caso-01';

  // SVG representation for each lead's QRS complex
  const renderLeadWave = (leadName: string) => {
    // Normal QRS or Anteroseptal STEMI QRS
    const isElevatedLead = isCase1 && ['V1', 'V2', 'V3', 'V4'].includes(leadName);
    const isReciprocalLead = isCase1 && ['II', 'III', 'aVF'].includes(leadName);

    // Wave color
    const strokeColor = paperTheme === 'pink' ? '#1e293b' : '#38bdf8';

    if (isElevatedLead) {
      // 3mm ST Elevation pattern
      return (
        <svg viewBox="0 0 160 80" className="w-full h-16">
          <path
            d="M 5,45 L 20,45 C 25,41 30,41 35,45 L 45,45 L 48,47 L 54,12 L 60,50 C 65,30 80,24 95,25 C 110,26 125,42 135,45 L 155,45"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Marker label */}
          <line x1="68" y1="28" x2="68" y2="45" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="72" y="38" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">
            ST ↑ 3mm
          </text>
        </svg>
      );
    }

    if (isReciprocalLead) {
      // Reciprocal ST depression
      return (
        <svg viewBox="0 0 160 80" className="w-full h-16">
          <path
            d="M 5,45 L 20,45 C 25,41 30,41 35,45 L 45,45 L 48,47 L 54,16 L 60,55 C 68,55 75,52 85,50 C 95,48 105,43 115,45 L 155,45"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <text x="70" y="62" fill="#3b82f6" fontSize="8" fontFamily="monospace">
            ST ↓ espejo
          </text>
        </svg>
      );
    }

    // Standard Lead QRS
    return (
      <svg viewBox="0 0 160 80" className="w-full h-16">
        <path
          d="M 5,45 L 20,45 C 25,41 30,41 35,45 L 48,45 L 51,48 L 56,15 L 61,50 L 64,45 L 75,45 C 85,38 95,38 105,45 L 155,45"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  const leads = [
    { name: 'I', group: 'Frontal' },
    { name: 'aVR', group: 'Frontal' },
    { name: 'V1', group: 'Precordial' },
    { name: 'V4', group: 'Precordial' },
    { name: 'II', group: 'Frontal' },
    { name: 'aVL', group: 'Frontal' },
    { name: 'V2', group: 'Precordial' },
    { name: 'V5', group: 'Precordial' },
    { name: 'III', group: 'Frontal' },
    { name: 'aVF', group: 'Frontal' },
    { name: 'V3', group: 'Precordial' },
    { name: 'V6', group: 'Precordial' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Top Header */}
      <div className="bg-slate-950 p-3 sm:p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-rose-500" />
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-100 flex items-center gap-2">
              Electrocardiograma de 12 Derivaciones (ECG)
              {isCase1 && (
                <span className="text-xs px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800 text-rose-400 font-mono">
                  HALLAZGO CRÍTICO
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Calibración estándar: 25 mm/s · 10 mm/mV · Filtro 0.05 - 150 Hz
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaperTheme(paperTheme === 'pink' ? 'dark' : 'pink')}
            className="px-2.5 py-1 text-xs font-mono rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {paperTheme === 'pink' ? 'Modo Monitor Oscuro' : 'Modo Papel Milimetrado'}
          </button>

          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded bg-cyan-950/70 border border-cyan-800/80 text-cyan-300 hover:bg-cyan-900/60 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{showAnalysis ? 'Ocultar Informe' : 'Ver Informe'}</span>
          </button>
        </div>
      </div>

      {/* ECG 12-Lead Paper Matrix */}
      <div
        className={`p-3 sm:p-5 relative transition-colors ${
          paperTheme === 'pink'
            ? 'bg-[#fef2f2] text-slate-900 border-y border-rose-200'
            : 'bg-[#050c14] text-slate-100 border-y border-cyan-950'
        }`}
        style={{
          backgroundImage:
            paperTheme === 'pink'
              ? 'linear-gradient(to right, rgba(244, 63, 94, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(244, 63, 94, 0.12) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(6, 182, 212, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.12) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {leads.map((lead) => {
            const isTarget = isCase1 && ['V1', 'V2', 'V3', 'V4'].includes(lead.name);
            return (
              <div
                key={lead.name}
                className={`p-2 rounded border relative flex flex-col justify-between h-24 ${
                  paperTheme === 'pink'
                    ? isTarget
                      ? 'bg-rose-100/60 border-rose-400'
                      : 'bg-white/70 border-rose-200'
                    : isTarget
                    ? 'bg-red-950/20 border-red-800'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span
                    className={
                      isTarget
                        ? 'text-rose-600 font-extrabold text-sm'
                        : paperTheme === 'pink'
                        ? 'text-slate-800'
                        : 'text-cyan-400'
                    }
                  >
                    {lead.name}
                  </span>
                  {isTarget && (
                    <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-0.5">
                      <AlertTriangle className="w-3 h-3" /> Elevación ST
                    </span>
                  )}
                </div>
                {renderLeadWave(lead.name)}
              </div>
            );
          })}
        </div>

        {/* Lead II Continuous Rhythm Strip */}
        <div
          className={`mt-3 p-2.5 rounded border ${
            paperTheme === 'pink'
              ? 'bg-white/80 border-rose-200'
              : 'bg-slate-900/80 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1">
            <span className="font-bold text-slate-700">Tira de Ritmo (Derivación II larga)</span>
            <span>FC: {clinicalCase.initialVitals.heartRate} lpm · Ritmo Sinusal Regular</span>
          </div>
          <svg viewBox="0 0 600 50" className="w-full h-12">
            <path
              d="M 5,28 L 25,28 C 30,24 35,24 40,28 L 52,28 L 55,30 L 60,8 L 65,34 L 68,28 L 80,28 C 90,20 100,20 110,28 L 140,28 C 145,24 150,24 155,28 L 167,28 L 170,30 L 175,8 L 180,34 L 183,28 L 195,28 C 205,20 215,20 225,28 L 255,28 C 260,24 265,24 270,28 L 282,28 L 285,30 L 290,8 L 295,34 L 298,28 L 310,28 C 320,20 330,20 340,28 L 370,28 C 375,24 380,24 385,28 L 397,28 L 400,30 L 405,8 L 410,34 L 413,28 L 425,28 C 435,20 445,20 455,28 L 485,28 C 490,24 495,24 500,28 L 512,28 L 515,30 L 520,8 L 525,34 L 528,28 L 540,28 C 550,20 560,20 570,28 L 595,28"
              fill="none"
              stroke={paperTheme === 'pink' ? '#1e293b' : '#38bdf8'}
              strokeWidth="1.8"
            />
          </svg>
        </div>
      </div>

      {/* Official Cardiology Report Panel */}
      {showAnalysis && (
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs sm:text-sm font-sans space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold font-mono text-xs">
            <FileText className="w-4 h-4" /> INFORME ELECTROCARDIOGRÁFICO FORMAL:
          </div>
          <p className="text-slate-300 leading-relaxed">
            {clinicalCase.complementaryStudies.ecg.detailedDescription}
          </p>

          <div className="p-3 bg-rose-950/30 border border-rose-800/60 rounded-lg text-rose-300 text-xs flex items-start gap-2.5 mt-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-rose-200">Interpretación diagnóstica: </span>
              {clinicalCase.complementaryStudies.ecg.summary}. Requiere activación inmediata de la red de Código Infarto para angioplastia primaria emergente.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
