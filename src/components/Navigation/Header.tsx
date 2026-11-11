import React, { useState } from 'react';
import { ClinicalCase, ClinicalStage } from '../../types/clinical';
import {
  Bot,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  Home,
  Coins,
  Clock,
  AlertCircle,
  Check,
  FileText,
} from 'lucide-react';

export interface HeaderProps {
  currentCase: ClinicalCase;
  cases: ClinicalCase[];
  stage: ClinicalStage;
  efficiencyPoints: number;
  elapsedMinutes: number;
  onSelectCase: (caseId: string) => void;
  onResetCase: () => void;
  onOpenCaseCreator?: () => void;
  onGoToWelcome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCase,
  cases,
  stage,
  efficiencyPoints,
  elapsedMinutes,
  onSelectCase,
  onResetCase,
  onOpenCaseCreator,
  onGoToWelcome,
}) => {
  const [isChiefComplaintExpanded, setIsChiefComplaintExpanded] = useState(false);
  const [isCaseMenuOpen, setIsCaseMenuOpen] = useState(false);

  const isYellow = currentCase.colorTheme === 'yellow';
  const isPink = currentCase.colorTheme === 'pink';

  // Subtle iOS Avatar Badge
  const avatarGlow = isYellow
    ? 'border-amber-500/40 bg-amber-500/10 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
    : isPink
    ? 'border-pink-500/40 bg-pink-500/10 text-pink-300 shadow-[0_0_12px_rgba(236,72,153,0.25)]'
    : 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]';

  const avatarDot = isYellow ? 'bg-amber-400' : isPink ? 'bg-pink-400' : 'bg-cyan-400';

  // Formatted Specialty Name
  const specialtyName = currentCase.clinicalModule
    ? currentCase.clinicalModule.charAt(0).toUpperCase() + currentCase.clinicalModule.slice(1)
    : currentCase.code.includes('Módulo')
    ? currentCase.code.split('·')[0]?.replace('Módulo', '').trim() || 'Medicina Interna'
    : 'Medicina Interna';

  // Patient Stage Chip
  const stageChip =
    stage === 'resolved'
      ? { text: 'Estable', color: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' }
      : stage === 'worsened' || stage === 'critical'
      ? { text: 'Deterioro', color: 'bg-rose-500/15 border-rose-500/30 text-rose-300 animate-pulse' }
      : { text: 'Sintomático', color: 'bg-amber-500/15 border-amber-500/30 text-amber-300' };

  // Format hospital elapsed time starting at 08:00
  const formatHospitalTime = (extraMins: number = 0) => {
    const totalMins = 8 * 60 + extraMins;
    const hrs = Math.floor(totalMins / 60) % 24;
    const mins = totalMins % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#090d16]/95 backdrop-blur-xl border-b border-white/10 shadow-lg select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-2">
        {/* Left: Compact Hipócrates Avatar + Title + Specialty/Status */}
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform active:scale-95 ${avatarGlow}`}
            title={`Modelo ${isYellow ? 'Amarillo' : isPink ? 'Rosa' : 'Azul'} (${currentCase.gender}, ${currentCase.age}a)`}
          >
            <Bot className="w-5 h-5" />
          </div>

          <div className="min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1">
                Hipócrates
              </span>
              <span className={`w-1.5 h-1.5 rounded-full ${avatarDot}`} />
              <span className="text-[10px] font-mono text-cyan-300/90 font-semibold bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-800/40">
                {specialtyName}
              </span>
              <span
                className={`px-1.5 py-0.2 rounded-full border text-[9px] font-mono font-bold uppercase tracking-wider ${stageChip.color}`}
              >
                {stageChip.text}
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate">
              {currentCase.patientName || 'Paciente'} · {currentCase.age}a ({currentCase.gender === 'femenino' ? 'F' : 'M'})
            </div>
          </div>
        </div>

        {/* Center/Right: Expandable Motivo de Consulta Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Desplegable de Motivo de Consulta (Estilo iOS) */}
          <button
            type="button"
            onClick={() => setIsChiefComplaintExpanded(!isChiefComplaintExpanded)}
            className={`px-2.5 py-1.5 rounded-xl border transition-all text-xs font-mono flex items-center gap-1.5 max-w-[140px] sm:max-w-[280px] lg:max-w-[360px] ${
              isChiefComplaintExpanded
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900/80 border-white/10 text-slate-300 hover:text-white hover:border-white/20'
            }`}
            title="Ver o colapsar el motivo de consulta completo"
          >
            <AlertCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="font-semibold text-slate-200 shrink-0">Motivo:</span>
            <span className="truncate text-slate-300 hidden sm:inline">
              {currentCase.chiefComplaint}
            </span>
            {isChiefComplaintExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-cyan-300 shrink-0 ml-auto" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-auto" />
            )}
          </button>

          {/* Efficiency Points Badge */}
          <div
            className={`hidden xs:flex items-center gap-1 px-2 py-1 rounded-lg border font-mono text-[11px] font-bold ${
              efficiencyPoints >= 80
                ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
                : efficiencyPoints >= 50
                ? 'bg-amber-950/60 border-amber-500/30 text-amber-300'
                : 'bg-rose-950/60 border-rose-500/30 text-rose-300 animate-pulse'
            }`}
            title="Puntos de Eficiencia Hospitalaria"
          >
            <Coins className="w-3 h-3 text-amber-400" />
            <span>{efficiencyPoints}p</span>
          </div>

          {/* Hospital Clock Badge */}
          <div
            className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900/80 border border-white/10 font-mono text-[11px] text-cyan-300"
            title="Reloj simulado del hospital"
          >
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>{formatHospitalTime(elapsedMinutes)}</span>
          </div>

          {/* Quick Home / Modules Stage 0 */}
          {onGoToWelcome && (
            <button
              type="button"
              onClick={onGoToWelcome}
              className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-indigo-300 hover:text-indigo-200 transition-colors"
              title="Volver a Inicio / Módulos"
            >
              <Home className="w-4 h-4" />
            </button>
          )}

          {/* Case Selector Dropdown Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCaseMenuOpen(!isCaseMenuOpen)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-slate-200 text-xs font-mono font-medium hover:border-white/20 transition-colors"
            >
              <span className="truncate max-w-[50px] xs:max-w-[70px] sm:max-w-[95px]">{currentCase.code}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isCaseMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-64 sm:w-72 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-1.5 z-50 divide-y divide-white/5 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Cambiar Caso Clínico
                </div>
                <div className="py-1 max-h-60 overflow-y-auto">
                  {cases.map((c) => {
                    const isCaseYellow = c.colorTheme === 'yellow';
                    const isCasePink = c.colorTheme === 'pink';
                    const isCurrent = c.id === currentCase.id;
                    const cDot = isCaseYellow ? 'bg-amber-400' : isCasePink ? 'bg-pink-400' : 'bg-cyan-400';

                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          onSelectCase(c.id);
                          setIsCaseMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                          isCurrent
                            ? 'bg-slate-800/90 text-cyan-300 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${cDot}`} />
                            <span className="font-mono">{c.code}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate mt-0.5">{c.title}</div>
                        </div>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {onOpenCaseCreator && (
                  <div className="p-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCaseMenuOpen(false);
                        onOpenCaseCreator();
                      }}
                      className="w-full py-1.5 px-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Modo Docente (Crear Caso)</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Reset Case */}
          <button
            type="button"
            onClick={onResetCase}
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-400 hover:text-slate-200 transition-colors"
            title="Reiniciar simulación"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Accordion Expandable Chief Complaint Dropdown (iOS Frosted Sheet) */}
      {isChiefComplaintExpanded && (
        <div className="border-t border-white/10 bg-slate-900/95 backdrop-blur-2xl px-3.5 py-3 text-xs leading-relaxed animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="max-w-4xl mx-auto space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Ficha de Ingreso en Guardia
              </span>
              <button
                type="button"
                onClick={() => setIsChiefComplaintExpanded(false)}
                className="text-slate-400 hover:text-slate-200 text-xs"
              >
                Cerrar ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/90 border border-white/10 space-y-2">
              <div className="text-slate-200">
                <strong className="text-slate-400 font-mono text-[10px] block uppercase mb-0.5">
                  Motivo de Consulta Principal:
                </strong>
                <span className="text-cyan-200 font-medium text-xs sm:text-sm">
                  {currentCase.chiefComplaint}
                </span>
              </div>

              {currentCase.currentSymptoms && (
                <div className="pt-2 border-t border-white/5 text-[11px] text-slate-300 font-mono flex flex-wrap gap-x-4 gap-y-1">
                  {currentCase.currentSymptoms.onset && (
                    <span><strong>Inicio:</strong> {currentCase.currentSymptoms.onset}</span>
                  )}
                  {currentCase.currentSymptoms.painLocation && (
                    <span><strong>Localización:</strong> {currentCase.currentSymptoms.painLocation}</span>
                  )}
                  {currentCase.currentSymptoms.painQuality && (
                    <span><strong>Carácter:</strong> {currentCase.currentSymptoms.painQuality}</span>
                  )}
                  {currentCase.currentSymptoms.painIntensity !== undefined && (
                    <span><strong>EVA:</strong> {currentCase.currentSymptoms.painIntensity}/10</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
