import React, { useState } from 'react';
import { ClinicalCase, ClinicalStage, VitalSigns } from '../types/clinical';
import { Pill, Zap, AlertTriangle, ShieldCheck, CheckCircle2, Siren, HeartPulse } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TreatmentOrdersPanelProps {
  clinicalCase: ClinicalCase;
  stage: ClinicalStage;
  vitals: VitalSigns;
  administeredActions: string[];
  onAdminister: (actionQuery: string, actionId: string) => void;
}

export const TreatmentOrdersPanel: React.FC<TreatmentOrdersPanelProps> = ({
  clinicalCase,
  stage,
  vitals,
  administeredActions,
  onAdminister,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleAdministerAction = (action: any) => {
    onAdminister(action.name, action.id);
    if (action.id === 'urgent_reperfusion') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Ignore confetti error
      }
    }
  };

  const isCoronary = /coronari|pecho|torac|infarto/i.test(clinicalCase.title + ' ' + clinicalCase.chiefComplaint);

  const categories = isCoronary
    ? [
        { id: 'all', label: 'Todas las Acciones' },
        { id: 'reperfusion', label: 'Reperfusión / Hemodinámica' },
        { id: 'antiplatelet', label: 'Antiagregantes' },
        { id: 'antiischemic', label: 'Antiisquémicos / Dolor' },
        { id: 'monitoring', label: 'Monitorización & Soporte' },
      ]
    : [
        { id: 'all', label: 'Todas las Acciones' },
        { id: 'monitoring', label: 'Diagnóstico & Monitoreo' },
        { id: 'treatment', label: 'Tratamiento & Interconsultas' },
      ];

  const filteredExpected = clinicalCase.expectedActions.filter((a) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'antiplatelet') return a.category === 'antiplatelet' || a.category === 'anticoagulation';
    if (selectedCategory === 'antiischemic') return a.category === 'antiischemic';
    if (selectedCategory === 'reperfusion') return a.category === 'reperfusion';
    if (selectedCategory === 'monitoring') return a.category === 'monitoring' || a.category === 'oxygen';
    if (selectedCategory === 'treatment') return a.category !== 'monitoring' && a.category !== 'oxygen';
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Top Banner with Resolution Stage Status */}
      <div
        className={`p-3.5 sm:p-4 rounded-xl border flex items-center justify-between gap-3 shadow-md ${
          stage === 'resolved'
            ? 'bg-emerald-950/40 border-emerald-700/80 text-emerald-200'
            : stage === 'worsened' || stage === 'critical'
            ? 'bg-red-950/40 border-red-700/80 text-red-200'
            : stage === 'improving'
            ? 'bg-cyan-950/40 border-cyan-700/80 text-cyan-200'
            : 'bg-slate-900 border-slate-800 text-slate-300'
        }`}
      >
        <div className="flex items-center gap-3">
          {stage === 'resolved' ? (
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          ) : stage === 'worsened' || stage === 'critical' ? (
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 animate-bounce" />
          ) : (
            <HeartPulse className="w-6 h-6 text-cyan-400 shrink-0" />
          )}

          <div>
            <h4 className="text-sm font-semibold">
              {stage === 'resolved'
                ? (isCoronary ? '¡Reperfusión Coronaria Exitosa Lograda!' : '¡Manejo Diagnóstico y Terapéutico Correcto Logrado!')
                : stage === 'worsened' || stage === 'critical'
                ? '¡Deterioro Clínico Agudo por Error Terapéutico!'
                : stage === 'improving'
                ? 'Respuesta Terapéutica en Progreso (Alivio parcial)'
                : (isCoronary ? 'Paciente en Situación Aguda Sin Reperfusión Activa' : 'Evaluación Diagnóstica Inicial en Curso')}
            </h4>
            <p className="text-xs opacity-80 font-mono">
              {stage === 'resolved'
                ? (isCoronary
                    ? 'Arteria descendente anterior reperfundida. Dolor torácico cede a 1/10 y signos vitales normalizados.'
                    : 'Estudios de confirmación e histología tramitados, fármacos de soporte iniciados e interconsulta multidisciplinar cursada.')
                : stage === 'worsened' || stage === 'critical'
                ? 'La indicación de fármacos contraindicados (ej. AINEs) o el alta prematura comprometen gravemente al paciente.'
                : (isCoronary
                    ? 'Indica la farmacoterapia protocolizada y activa el Código Infarto para trasladar a hemodinámica.'
                    : 'Indica los estudios mandatorios (VEDA, TAC de estadiaje) y tratamiento médico protector.')}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0 font-mono text-xs">
          <div className="text-slate-400">EVA Dolor:</div>
          <div className="text-lg font-bold">{vitals.painScore}/10</div>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === c.id
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Recommended Emergency Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredExpected.map((action) => {
          const isGiven = administeredActions.includes(action.id);
          const isVitalReperfusion = action.category === 'reperfusion';

          return (
            <div
              key={action.id}
              className={`p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-all ${
                isGiven
                  ? 'bg-slate-900/60 border-emerald-800/80'
                  : isVitalReperfusion
                  ? 'bg-gradient-to-br from-rose-950/40 to-slate-900 border-rose-700/80 shadow-lg shadow-rose-950/20'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {isVitalReperfusion ? (
                      <Siren className="w-5 h-5 text-rose-400 shrink-0 animate-pulse" />
                    ) : (
                      <Pill className="w-4 h-4 text-cyan-400 shrink-0" />
                    )}
                    <h5 className="text-sm font-semibold text-slate-100">{action.name}</h5>
                  </div>
                  {action.isMandatory && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">
                      MANDATORIO
                    </span>
                  )}
                </div>

                {action.doseDescription && (
                  <p className="text-xs font-mono text-cyan-300/90 mt-1.5 bg-slate-950/60 px-2 py-1 rounded border border-slate-800">
                    Dosis: {action.doseDescription}
                  </p>
                )}

                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{action.rationale}</p>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {isGiven ? 'Administrado previamente' : 'Listo para prescripción'}
                </span>

                <button
                  onClick={() => handleAdministerAction(action)}
                  disabled={isGiven}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all ${
                    isGiven
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60 cursor-default'
                      : isVitalReperfusion
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md font-semibold'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm'
                  }`}
                >
                  {isGiven ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Aplicado</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>{isVitalReperfusion ? '¡ACTIVAR AHORA!' : 'Prescribir'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contraindicated Actions Section (Teaching Simulation) */}
      <div className="mt-6 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            Conductas Peligrosas / Contraindicaciones Absolutas (Para pruebas del estudiante)
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {clinicalCase.contraindicatedActions.map((c) => (
            <div
              key={c.id}
              className="p-3 bg-red-950/20 border border-red-900/50 rounded-xl flex items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="font-semibold text-red-300">{c.name}</div>
                <div className="text-[11px] text-red-400/80 font-mono mt-0.5">{c.harmRationale}</div>
              </div>
              <button
                onClick={() => onAdminister(`Indico ${c.name}`, c.id)}
                className="shrink-0 px-2.5 py-1 rounded bg-red-900/60 hover:bg-red-800 text-red-200 border border-red-700 text-xs font-medium transition-colors"
                title="Pruébalo para ver la reacción de empeoramiento de RoboDoc"
              >
                Probar error
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
