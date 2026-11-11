import React, { useState } from 'react';
import { ClinicalCase } from '../types/clinical';
import { Bot, RotateCcw, HelpCircle, ChevronDown, Check, Sparkles, X, Home, Coins, Clock } from 'lucide-react';

interface ClinicalCaseHeaderProps {
  currentCase: ClinicalCase;
  cases: ClinicalCase[];
  onSelectCase: (caseId: string) => void;
  onResetCase: () => void;
  onOpenCaseCreator?: () => void;
  onGoToWelcome?: () => void;
  efficiencyPoints?: number;
  elapsedMinutes?: number;
}

export const ClinicalCaseHeader: React.FC<ClinicalCaseHeaderProps> = ({
  currentCase,
  cases,
  onSelectCase,
  onResetCase,
  onOpenCaseCreator,
  onGoToWelcome,
  efficiencyPoints = 100,
  elapsedMinutes = 0,
}) => {
  const [isCaseMenuOpen, setIsCaseMenuOpen] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);

  const isYellow = currentCase.colorTheme === 'yellow';
  const isPink = currentCase.colorTheme === 'pink';

  const brandGradient = isYellow
    ? 'bg-gradient-to-tr from-amber-600 to-yellow-500 text-white'
    : isPink
    ? 'bg-gradient-to-tr from-pink-600 to-rose-600 text-white'
    : 'bg-gradient-to-tr from-cyan-600 to-blue-600 text-white';

  const dotColor = isYellow ? 'bg-amber-400' : isPink ? 'bg-pink-400' : 'bg-cyan-400';

  const modelBadgeText = isYellow
    ? `Modelo Amarillo (M, ${currentCase.age}a)`
    : isPink
    ? `Modelo Rosa (F, ${currentCase.age}a)`
    : `Modelo Azul (M, ${currentCase.age}a)`;

  return (
    <>
      <header className="bg-slate-950 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Hipócrates Identity */}
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-md ${brandGradient}`}
            >
              <Bot className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  Hipócrates
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-normal">
                    Medicina Interna
                  </span>
                </h1>
              </div>
              <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Simulador Clínico Interactivo de Paciente Robot
              </p>
            </div>
          </div>

          {/* Action Toolbar & Mode Switcher */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Etapa 0: Inicio / Seleccionar Módulo */}
            {onGoToWelcome && (
              <button
                onClick={onGoToWelcome}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/70 hover:bg-indigo-900/80 border border-indigo-600/50 text-indigo-300 text-xs font-semibold transition-all shadow-sm"
                title="Volver a la Pantalla de Inicio / Selección de Especialidades"
              >
                <Home className="w-3.5 h-3.5 text-indigo-400" />
                <span>Inicio / Módulos</span>
              </button>
            )}

            {/* Mode 2: Case Creator button */}
            {onOpenCaseCreator && (
              <button
                onClick={onOpenCaseCreator}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600/30 to-yellow-600/30 hover:from-amber-600/50 hover:to-yellow-600/50 border border-amber-500/50 text-amber-300 text-xs font-semibold transition-all shadow-sm"
                title="Abrir Modo 2: Creador y Organizador de Casos Clínicos"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Creador de Casos (Docente)</span>
              </button>
            )}

            {/* Active Case Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCaseMenuOpen(!isCaseMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-medium transition-colors shadow-sm"
              >
                <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span className="font-semibold">{currentCase.code}:</span>
                <span className="truncate max-w-[140px] sm:max-w-[200px]">
                  {currentCase.title}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isCaseMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-72 sm:w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1.5 z-40">
                  <div className="px-3 py-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    Seleccionar Caso Clínico Activo
                  </div>
                  {cases.map((c) => {
                    const isCaseYellow = c.colorTheme === 'yellow';
                    const isCasePink = c.colorTheme === 'pink';
                    const isCurrent = c.id === currentCase.id;
                    const cDot = isCaseYellow ? 'bg-amber-400' : isCasePink ? 'bg-pink-400' : 'bg-cyan-400';
                    const cModel = isCaseYellow ? 'Modelo Amarillo' : isCasePink ? 'Modelo Rosa' : 'Modelo Azul';

                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          onSelectCase(c.id);
                          setIsCaseMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                          isCurrent
                            ? 'bg-slate-800 text-cyan-300'
                            : 'text-slate-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-semibold flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${cDot}`} />
                            <span>{c.code} · {cModel}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">{c.title}</div>
                        </div>
                        {isCurrent && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Efficiency Points Badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono text-xs font-bold ${
                efficiencyPoints >= 80
                  ? 'bg-emerald-950/70 border-emerald-700/60 text-emerald-300'
                  : efficiencyPoints >= 50
                  ? 'bg-amber-950/70 border-amber-700/60 text-amber-300'
                  : 'bg-rose-950/70 border-rose-700/60 text-rose-300 animate-pulse'
              }`}
              title="Presupuesto de Eficiencia Clínica"
            >
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>{efficiencyPoints} pts</span>
            </div>

            {/* Simulated Time Clock */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-cyan-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {(() => {
                  const totalMins = 8 * 60 + elapsedMinutes;
                  const hrs = Math.floor(totalMins / 60) % 24;
                  const mins = totalMins % 60;
                  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
                })()}{' '}
                (+{elapsedMinutes}m)
              </span>
            </div>

            {/* Rules Modal Button */}
            <button
              onClick={() => setShowRulesModal(true)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
              title="Ver Reglas del Simulador Hipócrates"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Reset Simulation Button */}
            <button
              onClick={onResetCase}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors"
              title="Reiniciar Simulación del Caso"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>
          </div>
        </div>

        {/* Motivo de Consulta Alert Banner */}
        <div className="bg-slate-900/80 border-t border-slate-800/80 px-3 sm:px-6 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 overflow-hidden text-slate-300">
            <span className={`font-mono font-semibold shrink-0 ${isYellow ? 'text-amber-400' : isPink ? 'text-pink-400' : 'text-cyan-400'}`}>
              MOTIVO DE CONSULTA:
            </span>
            <span className="truncate">{currentCase.chiefComplaint}</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400 shrink-0 pl-2">
            {modelBadgeText}
          </div>
        </div>
      </header>

      {/* Rules Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-4 sm:p-6 text-white shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="text-base font-bold flex items-center gap-2 text-amber-400">
                <Sparkles className="w-5 h-5" /> REGLAS DE ACTUACIÓN · SIMULADOR HIPÓCRATES
              </h3>
              <button
                onClick={() => setShowRulesModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-h-[70vh] overflow-y-auto pr-1">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-amber-300">1. Identidad & Colores:</strong> Te llamas Hipócrates. Si el caso especifica sexo masculino usas interfaz azul; si especifica sexo femenino usas interfaz rosa; si especifica otros matices (ej. ictericia o patología digestiva), usas interfaz amarilla.
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-cyan-300">2. Comportamiento en 1ª Persona:</strong> Hablas y piensas como un paciente real en consulta o guardia. Muestra coherencia sintomática: dolor expresado con quejas breves, confusión en hipoglucemia/encefalopatía, calma sin jerga técnica cuando estés estable.
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-rose-300">3. Secretismo Clínico & Terminal de Órdenes:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1 text-xs text-slate-400">
                  <li>NUNCA reveles tu diagnóstico ni entregues estudios de laboratorio por tu cuenta.</li>
                  <li>Revela antecedentes personales, fármacos o hábitos únicamente si se te pregunta directamente.</li>
                  <li>Si el médico pide radiografía, analítica o ECG en el chat, responde amablemente: <em className="text-cyan-300">"Doctor/a, de eso se encarga el equipo de enfermería o laboratorio en la terminal de órdenes."</em></li>
                </ul>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-emerald-300">4. Dinamismo Fisiopatológico:</strong> Mejoría progresiva ante conductas urgentes correctas; empeoramiento y alarmas ante iatrogenias, AINEs indebidos o retrasos críticos.
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-yellow-300">5. Modo 2 (Creador de Casos):</strong> Docentes y estudiantes pueden pulsar el botón "Creador de Casos" o escribir "Crear caso" en el chat para transformar la IA en un Asistente que organiza notas y genera código JSON listo para GitHub.
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-right">
              <button
                onClick={() => setShowRulesModal(false)}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
