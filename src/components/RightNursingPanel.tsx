import React, { useState } from 'react';
import { ClinicalCase, VitalSigns, ClinicalStage } from '../types/clinical';
import { Activity, TestTube, Image as ImageIcon, Stethoscope, Pill, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RightNursingPanelProps {
  clinicalCase: ClinicalCase;
  vitals?: VitalSigns;
  stage: ClinicalStage;
  administeredActions: string[];
  onOpenEcg: () => void;
  onOpenRadiology: () => void;
  onOpenPhysicalExamModal: () => void;
  onRequestLab: () => void;
  onAdministerTreatment: (name: string, id: string) => void;
}

export const RightNursingPanel: React.FC<RightNursingPanelProps> = ({
  clinicalCase,
  vitals: _vitals,
  stage,
  administeredActions,
  onOpenEcg,
  onOpenRadiology,
  onOpenPhysicalExamModal,
  onRequestLab,
  onAdministerTreatment,
}) => {
  const [activeCategory, setActiveCategory] = useState<'tests' | 'treatment'>('tests');

  const handleReperfusion = () => {
    onAdministerTreatment('Activación de Código Infarto / Angioplastia Primaria Urgente', 'urgent_reperfusion');
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  const isReperfusionDone = administeredActions.includes('urgent_reperfusion');

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col gap-4 text-white">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div>
          <h3 className="text-xs sm:text-sm font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-cyan-400" /> PANEL DE ENFERMERÍA Y PARACLÍNICOS
          </h3>
          <p className="text-[11px] font-mono text-slate-400">
            Estudios de urgencias y prescripción clínica
          </p>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveCategory('tests')}
            className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
              activeCategory === 'tests'
                ? 'bg-cyan-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Paraclínicos
          </button>
          <button
            onClick={() => setActiveCategory('treatment')}
            className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
              activeCategory === 'treatment'
                ? 'bg-cyan-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Fármacos
          </button>
        </div>
      </div>

      {/* Mode A: Mandatory Action Buttons: [Pedir ECG], [Pedir Laboratorio], [Pedir Rx/Resonancia], [Examen Físico] */}
      {activeCategory === 'tests' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Button 1: [Pedir ECG] */}
            <button
              onClick={onOpenEcg}
              className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/90 border border-rose-900/50 hover:border-rose-500 text-left transition-all group shadow-sm flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-100 flex items-center justify-between">
                  <span>[Pedir ECG]</span>
                  <span className="text-[10px] font-mono text-rose-400">&lt; 10 min</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  12 Derivaciones de alta resolución
                </div>
              </div>
            </button>

            {/* Button 2: [Pedir Laboratorio] */}
            <button
              onClick={onRequestLab}
              className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/90 border border-cyan-900/50 hover:border-cyan-500 text-left transition-all group shadow-sm flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                <TestTube className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-100 flex items-center justify-between">
                  <span>[Pedir Laboratorio]</span>
                  <span className="text-[10px] font-mono text-cyan-400">Urgente</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  Troponinas I, Hemograma, Bioquímica
                </div>
              </div>
            </button>

            {/* Button 3: [Pedir Rx/Resonancia] */}
            <button
              onClick={onOpenRadiology}
              className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/90 border border-purple-900/50 hover:border-purple-500 text-left transition-all group shadow-sm flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform shrink-0">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-100 flex items-center justify-between">
                  <span>[Pedir Rx/Resonancia]</span>
                  <span className="text-[10px] font-mono text-purple-400">DICOM</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  Placa de tórax portátil o imagen real
                </div>
              </div>
            </button>

            {/* Button 4: [Examen Físico] */}
            <button
              onClick={onOpenPhysicalExamModal}
              className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/90 border border-emerald-900/50 hover:border-emerald-500 text-left transition-all group shadow-sm flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-100 flex items-center justify-between">
                  <span>[Examen Físico]</span>
                  <span className="text-[10px] font-mono text-emerald-400">Dirigido</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  Auscultación, piel y exploración
                </div>
              </div>
            </button>
          </div>

          {/* Quick Lab Summary Snapshot */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 text-xs font-mono">
            <div className="text-slate-400 flex items-center justify-between">
              <span className="font-semibold text-slate-200">Resultados Paraclínicos Disponibles:</span>
              <span className="text-[10px] text-cyan-400">Valores exactos del caso</span>
            </div>
            <div className="text-slate-300 leading-relaxed text-[11px] border-l-2 border-cyan-500 pl-2">
              <strong className="text-cyan-300">Troponina I:</strong> 480 ng/L (Elevada) · <strong className="text-cyan-300">ECG:</strong> ST ↑ 3mm V1-V4 anteroseptal · <strong className="text-cyan-300">Rx Tórax:</strong> Sin cardiomegalia ni derrame.
            </div>
          </div>
        </div>
      )}

      {/* Mode B: Emergency Treatment / Pharmacotherapy Orders */}
      {activeCategory === 'treatment' && (
        <div className="space-y-2.5">
          {clinicalCase.id === 'caso_001' ? (
            <>
              {/* Priority Oncologic / Surgical Consultation Button */}
              {(() => {
                const isOncologyDone = administeredActions.includes('oncology_consult');
                return (
                  <button
                    onClick={() => onAdministerTreatment('Derivación Urgente a Comité Multidisciplinar (Cirugía / Gastroenterología / Oncología)', 'oncology_consult')}
                    disabled={isOncologyDone}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                      isOncologyDone
                        ? 'bg-emerald-950/40 border-emerald-700 text-emerald-200'
                        : 'bg-gradient-to-r from-amber-900 to-amber-700 hover:from-amber-800 hover:to-amber-600 border-amber-500 text-white shadow-lg animate-pulse'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Zap className="w-5 h-5 text-amber-300 shrink-0" />
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider">
                          {isOncologyDone ? 'Interconsulta Prioritaria Cursada' : '¡Activar Comité Oncológico / Cirugía!'}
                        </div>
                        <div className="text-[11px] opacity-90">Evaluación urgente para resección y estadiaje formal</div>
                      </div>
                    </div>
                    {isOncologyDone ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <span className="text-xs font-bold font-mono">ACT</span>}
                  </button>
                );
              })()}

              {/* Specific Pharmacologic Grid for Caso 001 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => onAdministerTreatment('Omeprazol 40 mg IV/VO', 'give_ppi')}
                  disabled={administeredActions.includes('give_ppi')}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    administeredActions.includes('give_ppi')
                      ? 'bg-slate-950 text-slate-500 border-slate-800'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="font-semibold">Omeprazol 40 mg IV</div>
                    <div className="text-[10px] text-slate-400">Protección gástrica & IBP</div>
                  </div>
                  <Pill className="w-4 h-4 text-amber-400" />
                </button>

                <button
                  onClick={() => onAdministerTreatment('Hierro Sacarosa IV', 'iron_replacement')}
                  disabled={administeredActions.includes('iron_replacement')}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    administeredActions.includes('iron_replacement')
                      ? 'bg-slate-950 text-slate-500 border-slate-800'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="font-semibold">Hierro Sacarosa IV</div>
                    <div className="text-[10px] text-slate-400">Corrección anemia ferropénica</div>
                  </div>
                  <Pill className="w-4 h-4 text-cyan-400" />
                </button>

                <button
                  onClick={() => onAdministerTreatment('Solicitar VEDA con biopsia urgente', 'order_endoscopy')}
                  disabled={administeredActions.includes('order_endoscopy')}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    administeredActions.includes('order_endoscopy')
                      ? 'bg-slate-950 text-slate-500 border-slate-800'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="font-semibold">Endoscopia VEDA + Biopsia</div>
                    <div className="text-[10px] text-slate-400">Confirmación histológica</div>
                  </div>
                  <Activity className="w-4 h-4 text-emerald-400" />
                </button>

                <button
                  onClick={() => onAdministerTreatment('Solicitar TAC Tóraco-Abdominal con Contraste', 'order_ct_staging')}
                  disabled={administeredActions.includes('order_ct_staging')}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    administeredActions.includes('order_ct_staging')
                      ? 'bg-slate-950 text-slate-500 border-slate-800'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="font-semibold">TAC Estadiaje TNM</div>
                    <div className="text-[10px] text-slate-400">Extensión locorregional</div>
                  </div>
                  <ImageIcon className="w-4 h-4 text-purple-400" />
                </button>
              </div>

              {/* Test Contraindication Error for Gastric / Jaundice case */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-red-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Probar iatrogenia grave:
                </span>
                <button
                  onClick={() => onAdministerTreatment('Ibuprofeno 600 mg oral', 'give_nsaids_gastric')}
                  className="px-2 py-1 rounded bg-red-950/80 hover:bg-red-900 border border-red-700 text-red-300 text-[11px] font-mono transition-colors"
                >
                  Prescribir AINEs (HDA)
                </button>
              </div>
            </>
          ) : clinicalCase.id === 'caso_004' ? (
            <>
              {/* Priority Endoscopy / Resuscitation Button for Caso 004 */}
              {(() => {
                const isEndoscopyDone = administeredActions.includes('order_endoscopy');
                return (
                  <button
                    onClick={() => onAdministerTreatment('Videoendoscopia Digestiva Alta (VEDA) con Terapia Hemostática Dual', 'order_endoscopy')}
                    disabled={isEndoscopyDone}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                      isEndoscopyDone
                        ? 'bg-emerald-950/40 border-emerald-700 text-emerald-200'
                        : 'bg-gradient-to-r from-red-900 to-rose-700 hover:from-red-800 hover:to-rose-600 border-red-500 text-white shadow-lg animate-pulse'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Zap className="w-5 h-5 text-amber-300 shrink-0" />
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider">
                          {isEndoscopyDone ? 'Hemostasia Endoscópica Lograda' : '¡VEDA Urgente + Hemoclips!'}
                        </div>
                        <div className="text-[11px] opacity-90">Inyección de adrenalina + clips en vaso Forrest IIa</div>
                      </div>
                    </div>
                    {isEndoscopyDone ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <span className="text-xs font-bold font-mono">ACT</span>}
                  </button>
                );
              })()}

              {/* Specific Resuscitation & Pharmacotherapy Grid for Caso 004 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => onAdministerTreatment('Fluidoterapia Cristaloides 1000 ml NaCl 0.9%', 'fluid_resuscitation')}
                  disabled={administeredActions.includes('fluid_resuscitation')}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    administeredActions.includes('fluid_resuscitation')
                      ? 'bg-slate-950 text-slate-500 border-slate-800'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="font-semibold">Cristaloides 1000ml</div>
                    <div className="text-[10px] text-slate-400">Reanimación volemia</div>
                  </div>
                  <Activity className="w-4 h-4 text-cyan-400" />
                </button>

                <button
                  onClick={() => onAdministerTreatment('Transfusión de 2 Concentrados de Hematíes', 'blood_transfusion')}
                  disabled={administeredActions.includes('blood_transfusion')}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    administeredActions.includes('blood_transfusion')
                      ? 'bg-slate-950 text-slate-500 border-slate-800'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="font-semibold">Transfusión 2 U CH</div>
                    <div className="text-[10px] text-slate-400">Hb &lt; 8 g/dL + Shock</div>
                  </div>
                  <TestTube className="w-4 h-4 text-red-400" />
                </button>

                <button
                  onClick={() => onAdministerTreatment('Omeprazol 80 mg Bolo EV + Perfusión', 'high_dose_ppi')}
                  disabled={administeredActions.includes('high_dose_ppi')}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    administeredActions.includes('high_dose_ppi')
                      ? 'bg-slate-950 text-slate-500 border-slate-800'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="font-semibold">IBP Bolo EV 80mg</div>
                    <div className="text-[10px] text-slate-400">Estabilizar coágulo</div>
                  </div>
                  <Pill className="w-4 h-4 text-amber-400" />
                </button>

                <button
                  onClick={() => onAdministerTreatment('Suspender Naproxeno y AINEs de inmediato', 'stop_nsaids')}
                  disabled={administeredActions.includes('stop_nsaids')}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    administeredActions.includes('stop_nsaids')
                      ? 'bg-slate-950 text-slate-500 border-slate-800'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="font-semibold">Suspender Naproxeno</div>
                    <div className="text-[10px] text-slate-400">Frenar daño COX-1</div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </button>
              </div>

              {/* Test Contraindication Error for Caso 004 */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-red-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Probar iatrogenia grave:
                </span>
                <button
                  onClick={() => onAdministerTreatment('Reiniciar Naproxeno 500 mg para dolor de rodillas', 'reinit_nsaid_error')}
                  className="px-2 py-1 rounded bg-red-950/80 hover:bg-red-900 border border-red-700 text-red-300 text-[11px] font-mono transition-colors"
                >
                  Reiniciar AINE (Naproxeno)
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Priority Reperfusion Button for Coronary Cases */}
              <button
                onClick={handleReperfusion}
                disabled={isReperfusionDone}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                  isReperfusionDone
                    ? 'bg-emerald-950/40 border-emerald-700 text-emerald-200'
                    : 'bg-gradient-to-r from-rose-900 to-rose-700 hover:from-rose-800 hover:to-rose-600 border-rose-500 text-white shadow-lg animate-pulse'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Zap className="w-5 h-5 text-amber-300 shrink-0" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider">
                      {isReperfusionDone ? 'Código Infarto Activado' : '¡Activar Código Infarto!'}
                    </div>
                    <div className="text-[11px] opacity-90">Angioplastia Primaria Urgente (Puerta-Balón &lt; 90 min)</div>
                  </div>
                </div>
                {isReperfusionDone ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <span className="text-xs font-bold font-mono">ACT</span>}
              </button>

              {/* Pharmacologic Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => onAdministerTreatment('Aspirina 300 mg masticada', 'aspirin_loading')}
                  disabled={administeredActions.includes('aspirin_loading')}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    administeredActions.includes('aspirin_loading')
                      ? 'bg-slate-950 text-slate-500 border-slate-800'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="font-semibold">AAS (Aspirina) 300mg</div>
                    <div className="text-[10px] text-slate-400">Antiagregante inicial</div>
                  </div>
                  <Pill className="w-4 h-4 text-cyan-400" />
                </button>

                <button
                  onClick={() => onAdministerTreatment('Ticagrelor 180 mg carga oral', 'second_antiplatelet')}
                  disabled={administeredActions.includes('second_antiplatelet')}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                    administeredActions.includes('second_antiplatelet')
                      ? 'bg-slate-950 text-slate-500 border-slate-800'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div>
                    <div className="font-semibold">Ticagrelor 180mg</div>
                    <div className="text-[10px] text-slate-400">2º Antiagregante (DAPT)</div>
                  </div>
                  <Pill className="w-4 h-4 text-cyan-400" />
                </button>

                <button
                  onClick={() => onAdministerTreatment('Nitroglicerina sublingual', 'nitrates_sublingual')}
                  className="p-2.5 rounded-lg border bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-200 text-left flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold">Nitroglicerina SL</div>
                    <div className="text-[10px] text-slate-400">Alivio antiisquémico</div>
                  </div>
                  <Pill className="w-4 h-4 text-cyan-400" />
                </button>

                <button
                  onClick={() => onAdministerTreatment('Cloruro Mórfico 3 mg iv', 'morphine_analgesia')}
                  className="p-2.5 rounded-lg border bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-200 text-left flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold">Morfina IV 3mg</div>
                    <div className="text-[10px] text-slate-400">Analgesia mayor</div>
                  </div>
                  <Pill className="w-4 h-4 text-cyan-400" />
                </button>
              </div>

              {/* Test Contraindication Error */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-red-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Probar error grave:
                </span>
                <button
                  onClick={() => onAdministerTreatment('Ibuprofeno 600 mg oral', 'give_nsaids')}
                  className="px-2 py-1 rounded bg-red-950/80 hover:bg-red-900 border border-red-700 text-red-300 text-[11px] font-mono transition-colors"
                >
                  Dar AINEs (Ibuprofeno)
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Nursing Status Footer */}
      <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <span>Vía Venosa: 2x 18G Funcionantes</span>
        <span className={stage === 'resolved' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
          {stage === 'resolved'
            ? (clinicalCase.id === 'caso_001' ? 'Manejo Multidisciplinar' : 'Paciente en Hemodinámica')
            : 'Urgencias Box 1'}
        </span>
      </div>
    </div>
  );
};
