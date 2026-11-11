import React from 'react';
import { ClinicalCase, ClinicalStage } from '../types/clinical';
import { Award, BookOpen, AlertCircle, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

interface ClinicalDebriefProps {
  clinicalCase: ClinicalCase;
  administeredActions: string[];
  stage?: ClinicalStage;
}

export const ClinicalDebrief: React.FC<ClinicalDebriefProps> = ({
  clinicalCase,
  administeredActions,
  stage: _stage,
}) => {
  // Calculate competency checklist score
  const isEcgDone = true; // In complementary studies
  const isAspirinDone = administeredActions.includes('aspirin_loading');
  const isSecondAntiplatelet = administeredActions.includes('second_antiplatelet');
  const isReperfusionDone = administeredActions.includes('urgent_reperfusion');
  const isPainAddressed = administeredActions.includes('nitrates_sublingual') || administeredActions.includes('morphine_analgesia');

  const criteria = [
    { label: 'Reconocimiento precoz de dolor torácico isquémico típico (Alicia)', passed: true },
    { label: 'Obtención e interpretación del ECG 12D en < 10 minutos', passed: isEcgDone },
    { label: 'Antiagregación plaquetaria con Ácido Acetilsalicílico (AAS)', passed: isAspirinDone },
    { label: 'Segundo antiagregante plaquetario (Ticagrelor / Clopidogrel)', passed: isSecondAntiplatelet },
    { label: 'Alivio antiisquémico del dolor (Nitratos o Morfina IV)', passed: isPainAddressed },
    { label: 'Activación urgente de Código Infarto / Angioplastia Primaria (ICP)', passed: isReperfusionDone },
  ];

  const passedCount = criteria.filter((c) => c.passed).length;
  const scorePercent = Math.round((passedCount / criteria.length) * 100);

  return (
    <div className="space-y-4">
      {/* Debrief Score Summary Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Evaluación de Competencias Clínicas en Medicina Interna
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Caso: {clinicalCase.code} · Diagnóstico: {clinicalCase.targetDiagnosis}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="text-right">
              <div className="text-xs font-mono text-slate-400">Puntaje Clínico:</div>
              <div
                className={`text-2xl font-mono font-bold ${
                  scorePercent >= 80 ? 'text-emerald-400' : scorePercent >= 50 ? 'text-amber-400' : 'text-rose-400'
                }`}
              >
                {scorePercent}%
              </div>
            </div>
            <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  scorePercent >= 80 ? 'bg-emerald-500' : scorePercent >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${scorePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Criteria Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
          {criteria.map((item, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 ${
                item.passed
                  ? 'bg-emerald-950/20 border-emerald-800/60 text-emerald-200'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <span>{item.label}</span>
              {item.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Pearl Box */}
      <div className="bg-gradient-to-r from-cyan-950/30 to-blue-950/20 border border-cyan-800/60 rounded-xl p-4 sm:p-5 text-slate-200 shadow-md">
        <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-xs uppercase mb-2">
          <Lightbulb className="w-4 h-4" /> Perla Clínica Fundamental
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
          "{clinicalCase.debriefNotes.clinicalPearl}"
        </p>
        <div className="mt-3 text-xs font-mono text-cyan-400/80 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" /> Referencia: {clinicalCase.debriefNotes.guidelineReference}
        </div>
      </div>

      {/* Common Pitfalls Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-md">
        <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs uppercase mb-3">
          <AlertCircle className="w-4 h-4" /> Errores Frecuentes a Evitar (Pitfalls de Guardia)
        </div>
        <ul className="space-y-2 text-xs text-slate-300">
          {clinicalCase.debriefNotes.keyPitfalls.map((pitfall, pIdx) => (
            <li key={pIdx} className="flex items-start gap-2">
              <span className="text-amber-500 font-bold shrink-0">•</span>
              <span>{pitfall}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
