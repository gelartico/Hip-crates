import React from 'react';
import { Bot, Brain, Heart, Wind, Stethoscope, X } from 'lucide-react';

interface WelcomeStageModalProps {
  isOpen: boolean;
  onSelectModule: (moduleChoice: 1 | 2 | 3 | 4 | 5) => void;
  onClose?: () => void;
}

export const WelcomeStageModal: React.FC<WelcomeStageModalProps> = ({
  isOpen,
  onSelectModule,
  onClose,
}) => {
  if (!isOpen) return null;

  const modules = [
    {
      num: 1,
      icon: Wind,
      title: 'Respiratorio',
      badgeColor: 'border-pink-500/40 text-pink-300 bg-pink-950/40 hover:bg-pink-900/40 hover:border-pink-500',
      tagColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      desc: 'Fiebre, tos herrumbrosa y dolor pleurítico derecho. Sospecha de Neumonía (NAC).',
      patientInfo: '34a · Femenino · Robot Rosa',
      avatarEmoji: '🫁',
    },
    {
      num: 2,
      icon: Heart,
      title: 'Cardio',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/40 hover:border-cyan-500',
      tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      desc: 'Dolor retroesternal opresivo irradiado a brazo izquierdo y diaforesis 2h. Código Infarto.',
      patientInfo: '58a · Masculino · Robot Azul',
      avatarEmoji: '🫀',
    },
    {
      num: 3,
      icon: Brain,
      title: 'Neuro',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/40 hover:bg-purple-900/40 hover:border-purple-500',
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      desc: 'Déficit motor súbito en hemicuerpo derecho y afasia de Broca de 1h. Código Ictus.',
      patientInfo: '67a · Femenino · Robot Rosa',
      avatarEmoji: '🧠',
    },
    {
      num: 4,
      icon: Stethoscope,
      title: 'Digestivo',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/40 hover:bg-amber-900/40 hover:border-amber-500',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      desc: 'Dolor epigástrico sordo, saciedad precoz y pérdida de 8 kg. Esófago de Barrett / VEDA.',
      patientInfo: '64a · Masculino · Robot Amarillo',
      avatarEmoji: '🫄',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl space-y-6 text-white max-h-[92vh] overflow-y-auto relative">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {/* Header Banner */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>ETAPA 0 · PANTALLA DE BIENVENIDA</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
            ¡Bienvenidos a Hipócrates, el mejor simulador de casos clínicos! 🩺🤖
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Por favor, selecciona el módulo o especialidad que deseas practicar hoy:
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.num}
                onClick={() => onSelectModule(m.num as 1 | 2 | 3 | 4)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 shadow-md group ${m.badgeColor}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{m.avatarEmoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                          {m.num}️⃣
                        </span>
                        <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                          {m.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono opacity-80">{m.patientInfo}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {m.desc}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] font-mono">
                  <span className="text-slate-400">Iniciar anamnesis</span>
                  <span className="font-semibold text-white group-hover:translate-x-1 transition-transform">
                    Comenzar &rarr;
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Option 5: Random Surprise Case */}
        <button
          onClick={() => onSelectModule(5)}
          className="w-full p-4 rounded-xl border border-indigo-500/50 hover:border-indigo-400 bg-gradient-to-r from-indigo-950/60 via-purple-950/50 to-slate-900 text-left transition-all shadow-lg flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎲</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 text-indigo-300">
                  5️⃣
                </span>
                <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                  Hipócrates elige el módulo (Caso aleatorio sorpresa)
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 font-sans">
                Pon a prueba tus habilidades diagnósticas en guardia sin conocer la especialidad de antemano.
              </p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-indigo-600/30 group-hover:bg-indigo-600 border border-indigo-400 text-xs font-semibold text-white transition-all shrink-0">
            Elegir al Azar &rarr;
          </span>
        </button>

        {/* Footer info note */}
        <div className="text-center pt-1 border-t border-slate-800 text-xs font-mono text-slate-400">
          *Escribe el número (1-5) o el nombre del módulo en el chat en cualquier momento para comenzar o cambiar de caso.*
        </div>
      </div>
    </div>
  );
};
