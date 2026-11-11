import React, { useState } from 'react';
import { ClinicalCase, VitalSigns } from '../types/clinical';
import { Stethoscope, Activity, Eye, HandMetal, AlertCircle, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { medicalAudio } from '../utils/audioSynth';

interface PhysicalExamPanelProps {
  clinicalCase: ClinicalCase;
  vitals: VitalSigns;
  onPerformExam: (examName: string) => void;
}

export const PhysicalExamPanel: React.FC<PhysicalExamPanelProps> = ({
  clinicalCase,
  vitals,
  onPerformExam,
}) => {
  const [isPlayingHeartSound, setIsPlayingHeartSound] = useState(false);
  const [activeExamKey, setActiveExamKey] = useState<string>('cardiac');

  // Trigger heart sound audio playback
  const playStethoscopeAudio = () => {
    setIsPlayingHeartSound(true);
    medicalAudio.playHeartSound(vitals.heartRate > 100);
    setTimeout(() => {
      medicalAudio.playHeartSound(vitals.heartRate > 100);
    }, 600);
    setTimeout(() => {
      setIsPlayingHeartSound(false);
    }, 1300);
  };

  const exams = [
    {
      id: 'cardiac',
      title: 'Auscultación Cardíaca',
      subtitle: 'Focos aórtico, pulmonar, mitral y tricuspídeo',
      icon: Stethoscope,
      color: 'text-rose-400',
      findings: clinicalCase.physicalExam.cardiac,
      actionQuery: 'Ausculto el tórax y corazón con estetoscopio',
      hasAudio: true,
    },
    {
      id: 'pulmonary',
      title: 'Auscultación Pulmonar',
      subtitle: 'Murmullo vesicular y campos pulmonares',
      icon: Activity,
      color: 'text-cyan-400',
      findings: clinicalCase.physicalExam.pulmonary,
      actionQuery: 'Ausculto ambos hemitórax y campos pulmonares',
    },
    {
      id: 'skin',
      title: 'Piel, Diaforesis y Temperatura',
      subtitle: 'Inspección cutánea, coloración y sudoración',
      icon: Eye,
      color: 'text-amber-400',
      findings: clinicalCase.physicalExam.skin,
      actionQuery: 'Inspecciono la piel, diaforesis y turgencia',
    },
    {
      id: 'vascular',
      title: 'Pulsos y Vasos de Cuello',
      subtitle: 'Pulsos periféricos, yugulares y relleno capilar',
      icon: HandMetal,
      color: 'text-emerald-400',
      findings: `${clinicalCase.physicalExam.extremities}\n\n${clinicalCase.physicalExam.neckVessels}`,
      actionQuery: 'Exploro pulsos periféricos y vasos del cuello',
    },
    {
      id: 'abdomen',
      title: 'Exploración Abdominal',
      subtitle: 'Palpación, ruidos y visceromegalias',
      icon: Activity,
      color: 'text-indigo-400',
      findings: clinicalCase.physicalExam.abdomen,
      actionQuery: 'Palpo el abdomen en busca de dolor o masas',
    },
    {
      id: 'general',
      title: 'Estado General & Neurológico',
      subtitle: 'Nivel de consciencia, postura y dolor',
      icon: AlertCircle,
      color: 'text-purple-400',
      findings: `${clinicalCase.physicalExam.general}\n\n${clinicalCase.physicalExam.neurological}`,
      actionQuery: 'Evalúo el estado general y la orientación del paciente',
    },
  ];

  const currentExam = exams.find((e) => e.id === activeExamKey) || exams[0];

  return (
    <div className="space-y-4">
      {/* Top Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {exams.map((exam) => {
          const IconComponent = exam.icon;
          const isSelected = activeExamKey === exam.id;
          return (
            <button
              key={exam.id}
              onClick={() => {
                setActiveExamKey(exam.id);
                onPerformExam(exam.actionQuery);
              }}
              className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                isSelected
                  ? 'bg-slate-800 border-cyan-500 shadow-md'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 ${
                  isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <IconComponent className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {exam.title}
                </div>
                <div className="text-[10px] text-slate-500 truncate">{exam.subtitle}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Exam Detailed Finding Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <currentExam.icon className={`w-5 h-5 ${currentExam.color}`} />
            <div>
              <h4 className="text-sm font-bold text-slate-100">{currentExam.title}</h4>
              <p className="text-xs text-slate-400 font-mono">
                Hallazgo físico exacto provisto en el caso clínico
              </p>
            </div>
          </div>

          {currentExam.hasAudio && (
            <button
              onClick={playStethoscopeAudio}
              disabled={isPlayingHeartSound}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium transition-colors shadow-md disabled:opacity-50"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isPlayingHeartSound ? 'Auscultando...' : 'Escuchar Latido (S1/S2)'}</span>
            </button>
          )}
        </div>

        {/* Findings text display */}
        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-cyan-200 font-mono leading-relaxed space-y-2">
          {currentExam.findings.split('\n\n').map((line, idx) => (
            <p key={idx} className="flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>{line.replace(/\*/g, '')}</span>
            </p>
          ))}
        </div>

        {/* Teaching Note */}
        <div className="mt-3 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Regla 4: Al examinar al paciente se responde en 3ª persona describiendo el hallazgo físico exacto.</span>
        </div>
      </div>
    </div>
  );
};
