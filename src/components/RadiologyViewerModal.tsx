import React, { useState } from 'react';
import { ClinicalCase } from '../types/clinical';
import { X, ZoomIn, ZoomOut, RotateCcw, FileText, CheckCircle2, Sliders } from 'lucide-react';

interface RadiologyViewerModalProps {
  clinicalCase: ClinicalCase;
  onClose: () => void;
}

export const RadiologyViewerModal: React.FC<RadiologyViewerModalProps> = ({
  clinicalCase,
  onClose,
}) => {
  const [zoom, setZoom] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(110);
  const [invert, setInvert] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);

  const rad = clinicalCase.complementaryStudies.radiologyImage || {
    type: 'xray',
    title: 'Radiografía de Tórax Portátil AP',
    report: clinicalCase.complementaryStudies.chestXray.replace(/\*/g, ''),
    findingsHighlight: 'Campos pulmonares limpios, silueta cardiovascular normal, sin neumotórax ni derrame.',
    technicalData: 'Proyección Anteroposterior portátil. 75 kV, 4.0 mAs.',
  };

  const resetFilters = () => {
    setZoom(1);
    setBrightness(100);
    setContrast(110);
    setInvert(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-slate-700 rounded-2xl max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Top Bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
              DICOM
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                {rad.title}
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-normal">
                  ID: {clinicalCase.code}
                </span>
              </h3>
              <p className="text-[11px] font-mono text-slate-400 truncate">
                {rad.technicalData} · Paciente: {clinicalCase.gender.toUpperCase()}, {clinicalCase.age}A
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-colors ${
                showAnnotations
                  ? 'bg-cyan-950 border-cyan-700 text-cyan-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {showAnnotations ? 'Ocultar Guías' : 'Ver Guías'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Cerrar Visor Radiológico"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace: Image Viewer & Radiologist Report */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-y-auto">
          {/* Main X-ray Viewport */}
          <div className="lg:col-span-8 bg-[#03070d] p-4 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-slate-800 min-h-[380px] sm:min-h-[440px] overflow-hidden select-none">
            {/* PACS Viewport Watermark & Orientation Marks */}
            <div className="absolute top-4 left-4 text-[10px] font-mono text-slate-500/80 pointer-events-none z-10 leading-tight">
              <div>HOSPITAL CLÍNICO UNIVERSITARIO</div>
              <div>DEPT. RADIODIAGNÓSTICO</div>
              <div className="text-cyan-400/90 font-bold mt-1">AP PORTÁTIL DIGITAL</div>
              <div>WINDOW: LUNG/MEDIASTINUM</div>
            </div>

            <div className="absolute top-4 right-4 text-sm font-mono font-bold text-white/70 pointer-events-none z-10 border border-slate-600 px-2 py-0.5 rounded">
              D (R)
            </div>

            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-500 pointer-events-none z-10">
              ZOOM: {(zoom * 100).toFixed(0)}% · BRIGHT: {brightness}% · CONTRAST: {contrast}%
            </div>

            {/* Simulated Medical Chest X-Ray SVG Viewport */}
            <div
              className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center transition-all"
              style={{
                transform: `scale(${zoom})`,
                filter: `brightness(${brightness}%) contrast(${contrast}%) ${invert ? 'invert(1)' : ''}`,
              }}
            >
              <svg viewBox="0 0 400 500" className="w-full h-full filter drop-shadow-2xl">
                <defs>
                  {/* Lung Field Gradients */}
                  <radialGradient id="lungFieldGrad" cx="50%" cy="45%" r="60%">
                    <stop offset="0%" stopColor="#080e18" />
                    <stop offset="65%" stopColor="#142132" />
                    <stop offset="100%" stopColor="#253549" />
                  </radialGradient>

                  {/* Soft Tissue / Mediastinum Gradient */}
                  <linearGradient id="mediastinumGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2d3748" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#4a5568" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#2d3748" stopOpacity="0.8" />
                  </linearGradient>

                  <radialGradient id="heartSilhouette" cx="42%" cy="58%" r="48%">
                    <stop offset="0%" stopColor="#718096" stopOpacity="0.95" />
                    <stop offset="70%" stopColor="#4a5568" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#2d3748" stopOpacity="0.4" />
                  </radialGradient>

                  {/* Hilum Vascular Glow */}
                  <radialGradient id="hilumGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#a0aec0" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#1a202c" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Dark Radiograph Background */}
                <rect width="400" height="500" rx="8" fill="#060a10" />

                {/* Thoracic Outer Cage Silhouette */}
                <path
                  d="M 60,60 C 130,40 270,40 340,60 C 375,140 380,360 345,430 C 270,470 130,470 55,430 C 20,360 25,140 60,60 Z"
                  fill="url(#lungFieldGrad)"
                  stroke="#334155"
                  strokeWidth="2"
                  opacity="0.85"
                />

                {/* Cervical & Upper Thoracic Spine / Trachea Air Column */}
                <rect x="194" y="30" width="12" height="130" rx="4" fill="#050a12" opacity="0.9" />
                <path d="M 190,160 L 165,195 M 210,160 L 235,195" stroke="#050a12" strokeWidth="6" strokeLinecap="round" opacity="0.8" />

                {/* Clavicles */}
                <path d="M 60,82 C 120,68 180,95 195,95" fill="none" stroke="#cbd5e1" strokeWidth="12" strokeLinecap="round" opacity="0.75" />
                <path d="M 340,82 C 280,68 220,95 205,95" fill="none" stroke="#cbd5e1" strokeWidth="12" strokeLinecap="round" opacity="0.75" />

                {/* Rib Arches (Bilateral Posterior and Anterior Ribs) */}
                <g stroke="#94a3b8" strokeWidth="7" fill="none" opacity="0.55" strokeLinecap="round">
                  {/* Posterior Ribs Left */}
                  <path d="M 195,110 C 150,105 100,120 70,145" />
                  <path d="M 195,135 C 145,130 90,150 65,185" />
                  <path d="M 195,160 C 140,160 85,185 62,225" />
                  <path d="M 195,190 C 140,195 80,225 60,270" />
                  <path d="M 195,225 C 140,235 80,265 60,315" />
                  <path d="M 195,260 C 140,275 80,310 65,360" />
                  <path d="M 195,300 C 145,315 90,355 75,405" />

                  {/* Posterior Ribs Right */}
                  <path d="M 205,110 C 250,105 300,120 330,145" />
                  <path d="M 205,135 C 255,130 310,150 335,185" />
                  <path d="M 205,160 C 260,160 315,185 338,225" />
                  <path d="M 205,190 C 260,195 320,225 340,270" />
                  <path d="M 205,225 C 260,235 320,265 340,315" />
                  <path d="M 205,260 C 260,275 320,310 335,360" />
                  <path d="M 205,300 C 255,315 310,355 325,405" />
                </g>

                {/* Mediastinal Air/Tissue Shadow */}
                <path
                  d="M 180,95 L 220,95 L 225,230 L 260,300 L 255,395 L 145,395 L 150,290 L 175,230 Z"
                  fill="url(#mediastinumGrad)"
                  opacity="0.9"
                />

                {/* Normal Cardiac Silhouette (AP Projection, ICT ~0.45) */}
                <path
                  d="M 185,190 C 175,230 155,270 145,320 C 140,350 155,385 190,395 L 265,395 C 275,370 268,340 250,305 C 240,285 230,250 222,210 C 205,185 195,185 185,190 Z"
                  fill="url(#heartSilhouette)"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  opacity="0.95"
                />

                {/* Aortic Knob */}
                <ellipse cx="218" cy="172" rx="14" ry="10" fill="#a0aec0" opacity="0.8" />

                {/* Pulmonary Hila Vascular Markings */}
                <circle cx="160" cy="225" r="18" fill="url(#hilumGlow)" />
                <circle cx="238" cy="230" r="18" fill="url(#hilumGlow)" />
                {/* Branching pulmonary vessels */}
                <g stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" opacity="0.6">
                  <path d="M 160,225 Q 120,240 100,280" />
                  <path d="M 160,225 Q 130,210 110,180" />
                  <path d="M 238,230 Q 280,240 300,285" />
                  <path d="M 238,230 Q 270,210 290,175" />
                </g>

                {/* Bilateral Hemidiaphragms (Right slightly higher than Left) */}
                {/* Right Diaphragm */}
                <path
                  d="M 50,420 C 90,380 150,375 195,395 L 50,450 Z"
                  fill="#475569"
                  opacity="0.9"
                />
                {/* Left Diaphragm */}
                <path
                  d="M 350,425 C 310,390 250,385 195,395 L 350,450 Z"
                  fill="#475569"
                  opacity="0.9"
                />

                {/* Sharp Costophrenic Angles (Libres de derrame) */}
                <circle cx="58" cy="415" r="6" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.7" />
                <circle cx="342" cy="420" r="6" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.7" />

                {/* Interactive Teaching Annotation Overlays */}
                {showAnnotations && (
                  <g className="font-mono text-[9px] select-none" fill="#38bdf8">
                    {/* Heart Marker */}
                    <line x1="145" y1="360" x2="265" y2="360" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                    <text x="205" y="354" textAnchor="middle" fill="#38bdf8" fontWeight="bold">
                      ICT: 0.46 (Normal)
                    </text>

                    {/* CP Angles */}
                    <line x1="58" y1="415" x2="40" y2="445" stroke="#10b981" strokeWidth="1.5" />
                    <text x="40" y="458" fill="#10b981" fontWeight="bold">Seno Libre</text>

                    <line x1="342" y1="420" x2="360" y2="445" stroke="#10b981" strokeWidth="1.5" />
                    <text x="360" y="458" fill="#10b981" textAnchor="end" fontWeight="bold">Seno Libre</text>

                    {/* Lung Fields */}
                    <text x="110" y="220" fill="#94a3b8">Campo pulmonar claro</text>
                    <text x="290" y="220" fill="#94a3b8">Sin infiltrados</text>

                    {/* Aorta */}
                    <line x1="228" y1="168" x2="260" y2="150" stroke="#94a3b8" strokeWidth="1" />
                    <text x="264" y="152" fill="#cbd5e1">Botón Aórtico</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Right Sidebar: DICOM Radiologic Report & PACS Controls */}
          <div className="lg:col-span-4 p-4 sm:p-5 flex flex-col justify-between bg-slate-900/90 text-xs sm:text-sm space-y-4">
            <div className="space-y-3.5">
              {/* PACS Viewer Controls Toolbar */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Controles PACS
                  </span>
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setZoom((z) => Math.min(2.0, z + 0.2))}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono text-slate-200 transition-colors"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-cyan-400" /> Zoom +
                  </button>
                  <button
                    onClick={() => setZoom((z) => Math.max(0.8, z - 0.2))}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono text-slate-200 transition-colors"
                  >
                    <ZoomOut className="w-3.5 h-3.5 text-cyan-400" /> Zoom -
                  </button>
                </div>

                <div className="space-y-1.5 pt-1 text-[11px] font-mono text-slate-400">
                  <div className="flex justify-between">
                    <span>Brillo:</span>
                    <span>{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="160"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-1 bg-slate-800 rounded"
                  />
                </div>

                <div className="space-y-1.5 text-[11px] font-mono text-slate-400">
                  <div className="flex justify-between">
                    <span>Contraste:</span>
                    <span>{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="180"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-1 bg-slate-800 rounded"
                  />
                </div>

                <button
                  onClick={() => setInvert(!invert)}
                  className={`w-full py-1 rounded text-xs font-mono border transition-colors ${
                    invert ? 'bg-cyan-950 border-cyan-700 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  {invert ? 'Modo Normal (Fondo Negro)' : 'Invertir Negativo (Fondo Blanco)'}
                </button>
              </div>

              {/* Official Radiology Report */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase">
                  <FileText className="w-4 h-4" /> Informe Radiológico Oficial
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {rad.report}
                </p>
              </div>

              {/* Key Clinical Diagnostic Highlight */}
              <div className="p-3 bg-emerald-950/30 border border-emerald-800/60 rounded-xl text-emerald-200 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-emerald-300 font-mono text-[11px]">INTERPRETACIÓN CLÍNICA:</div>
                  <div className="mt-0.5 leading-relaxed text-slate-300">{rad.findingsHighlight}</div>
                </div>
              </div>
            </div>

            {/* Close Button at footer */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={onClose}
                className="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors shadow-md"
              >
                Cerrar Visor Radiológico
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
