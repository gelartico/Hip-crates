import React, { useState } from 'react';
import { ClinicalCase, RobotColor } from '../types/clinical';
import {
  FileCode,
  Sparkles,
  Copy,
  Check,
  Play,
  X,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface CaseCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadCaseToSimulator: (newCase: ClinicalCase) => void;
}

export const CaseCreatorModal: React.FC<CaseCreatorModalProps> = ({
  isOpen,
  onClose,
  onLoadCaseToSimulator,
}) => {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedJson, setGeneratedJson] = useState<string>('');
  const [parsedCase, setParsedCase] = useState<ClinicalCase | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Preset clinical notes examples for teachers/students
  const loadExampleNotes = (type: 'pancreatitis' | 'sepsis') => {
    if (type === 'pancreatitis') {
      setInputText(`PACIENTE: Hipócrates
EDAD: 52 años, Masculino.
MOTIVO DE CONSULTA: Dolor abdominal epigástrico terebrante "en cinturón" de 12 horas tras comida copiosa y consumo de alcohol, acompañado de vómitos alimentarios persistentes y náuseas.
ANTECEDENTES: Litiasis vesicular conocida (cólicos biliares esporádicos sin colecistectomía), bebedor social moderado a alto los fines de semana. Fumador 15 paq/año. Sin alergias. No toma medicación habitual.
EXAMEN FÍSICO: Facies dolorosa, diaforético, quejumbroso. Taquicardia 112 lpm, PA 105/70 mmHg, FR 22 rpm, T 37.8°C, SatO2 95%. Abdomen distendido, doloroso a la palpación difusa con máxima intensidad en epigastrio y ambos hipocondrios, ruidos hidroaéreos disminuidos. Sin signo de Cullen ni Grey Turner.
LABORATORIOS / ESTUDIOS:
- Amilasa sérica: 1,450 U/L (VN < 100 U/L)
- Lipasa sérica: 980 U/L (VN < 60 U/L, >3 veces el valor normal)
- Hemograma: Leucocitos 14,800/uL, Hb 16.2 g/dL (hemoconcentración), Plaquetas 280,000/uL
- Bioquímica: Glucosa 165 mg/dL, Urea 48 mg/dL, Creatinina 1.2 mg/dL, Bilirrubina Total 2.1 mg/dL (Directa 1.4 mg/dL), ALT 180 U/L, AST 160 U/L
- Ecografía abdominal: Litiasis biliar múltiple en vesícula, vía biliar principal dilatada a 8.5 mm, páncreas edematoso hipoecogénico difuso.
DIAGNÓSTICO DIANA: Pancreatitis Aguda Litiásica Grado Moderado-Severo según criterios de Atlanta.
CONDUCTA INDICADA: Fluidoterapia intensiva agresiva con Ringer Lactato / Suero Fisiológico (250-500 ml/h guiada por diuresis), analgesia multimodal con opioides (Tramadol o Fentanilo), dieta absoluta inicial, monitorización de diuresis con sonda Foley y evaluación de colangioresonancia/CPRE si colangitis.`);
    } else {
      setInputText(`PACIENTE: Hipócrates
EDAD: 71 años, Femenino. Color Rosa.
MOTIVO DE CONSULTA: Fiebre alta de 39°C con escalofríos intensos, disuria, dolor en fosa lumbar derecha y somnolencia progresiva en las últimas 24 horas.
ANTECEDENTES: Hipertensión arterial en tratamiento con Amlodipino 5mg/d. ITU recurrente tratada con fosfomicina hace 1 mes. Artrosis.
EXAMEN FÍSICO: Somnolienta, responde lentamente. PA 85/50 mmHg (hipotensión), FC 124 lpm (taquicardia), FR 26 rpm, T 39.1°C, SatO2 93%. Piel pálida, caliente con relleno capilar 3 segundos. Puñopercusión lumbar derecha francamente positiva (+). Abdomen doloroso en hipogastrio.
LABORATORIOS: Leucocitos 21,500/uL con 86% neutrófilos y 8% cayados, Lactato sérico 3.8 mmol/L (hiperlactacidemia crítica), Creatinina 1.9 mg/dL (fracaso renal agudo), Sedimento urinario con piuria masiva, bacteriuria y nitritos (+).
DIAGNÓSTICO DIANA: Sepsis con punto de partida urinario (Pielonefritis Aguda Complicada) con criterio de Shock Séptico inicial.
CONDUCTA: Carga de cristaloides balanceados 30 ml/kg en las primeras 3 horas, toma urgente de urocultivo y 2 hemocultivos previos a antibioterapia empírica iv de amplio espectro (Ceftriaxona o Meropenem), inicio de noradrenalina si PAM < 65 mmHg persistente tras fluidos.`);
    }
  };

  // Convert raw notes to full ClinicalCase JSON
  const handleGenerateCase = async () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      // Call server endpoint or fallback to client-side rule extractor
      let newCase: ClinicalCase | null = null;

      try {
        const response = await fetch('/api/create-case', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rawNotes: inputText.trim() }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.clinicalCase) {
            newCase = data.clinicalCase;
          }
        }
      } catch (netErr) {
        console.warn('API error, falling back to local extractor:', netErr);
      }

      if (!newCase) {
        newCase = generateCaseFromRawText(inputText.trim());
      }

      setParsedCase(newCase);
      setGeneratedJson(JSON.stringify(newCase, null, 2));
    } catch (err: any) {
      console.error('Error generating case JSON:', err);
      setErrorMsg('No se pudo estructurar el caso. Verifica que los apuntes contengan información clínica básica.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyJson = () => {
    if (!generatedJson) return;
    navigator.clipboard.writeText(generatedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLoadToSimulator = () => {
    if (!parsedCase) return;
    onLoadCaseToSimulator(parsedCase);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-slate-700 rounded-2xl max-w-5xl w-full max-h-[95vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Top Header */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  MODO 2: CREADOR Y ORGANIZADOR DE CASOS
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Panel Docente / JSON GitHub
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                Pega tus apuntes o notas clínicas. La IA estructurará el JSON exacto para el simulador Hipócrates.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {/* Left Column: Input Notes & Prompting */}
          <div className="lg:col-span-5 p-4 flex flex-col justify-between bg-slate-900/60 space-y-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" /> APUNTES O NOTAS CLÍNICAS:
                </label>
                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <span>Cargar ejemplo:</span>
                  <button
                    onClick={() => loadExampleNotes('pancreatitis')}
                    className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300"
                  >
                    Pancreatitis
                  </button>
                  <button
                    onClick={() => loadExampleNotes('sepsis')}
                    className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-pink-300"
                  >
                    Sepsis
                  </button>
                </div>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Pega aquí los apuntes del caso clínico: paciente, edad, sexo, motivo de consulta, antecedentes, examen físico, laboratorios, imágenes y diagnóstico..."
                rows={14}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
              />

              {errorMsg && (
                <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={handleGenerateCase}
                disabled={!inputText.trim() || isGenerating}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-40"
              >
                {isGenerating ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Estructurando caso clínico en JSON...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analizar y Estructurar Caso Clínico</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Structured JSON Code Output & Simulation Loader */}
          <div className="lg:col-span-7 p-4 flex flex-col justify-between bg-slate-950 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-slate-200">
                    ESTRUCTURA JSON GENERADA (COMPATIBLE CON GITHUB)
                  </span>
                </div>

                {generatedJson && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyJson}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors"
                      title="Copiar código JSON al portapapeles"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? '¡Copiado!' : 'Copiar JSON'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* JSON Code Viewer */}
              <div className="relative bg-[#050b14] border border-slate-800 rounded-xl p-3 h-[380px] sm:h-[420px] overflow-auto font-mono text-[11px] leading-relaxed text-slate-300">
                {generatedJson ? (
                  <pre className="text-cyan-300/90 whitespace-pre">
                    <code>{generatedJson}</code>
                  </pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
                    <FileCode className="w-10 h-10 text-slate-700" />
                    <p className="font-semibold text-slate-400">Aún no se ha generado ningún caso</p>
                    <p className="max-w-xs text-[11px] text-slate-600">
                      Pega apuntes clínicos a la izquierda o haz clic en "Cargar ejemplo" y presiona "Analizar y Estructurar".
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Live Preview & Simulator Action */}
            {parsedCase && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-3 h-3 rounded-full shrink-0 ${
                      parsedCase.colorTheme === 'yellow'
                        ? 'bg-amber-400'
                        : parsedCase.colorTheme === 'pink'
                        ? 'bg-pink-400'
                        : 'bg-cyan-400'
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      {parsedCase.title}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 truncate">
                      Paciente: {parsedCase.patientName || 'Hipócrates'} ({parsedCase.gender}, {parsedCase.age}a) · Diagnóstico: {parsedCase.targetDiagnosis}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLoadToSimulator}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-md shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Cargar al Simulador Ahora Mismo</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Fallback deterministic extractor for converting unstructured notes into ClinicalCase JSON
function generateCaseFromRawText(text: string): ClinicalCase {
  const norm = text.toLowerCase();
  const isFemale = norm.includes('femenin') || norm.includes('mujer') || norm.includes('señora');
  const isYellow = norm.includes('amarill') || norm.includes('ictericia') || norm.includes('icteric') || norm.includes('epigastr') || norm.includes('gastr');
  const theme: RobotColor = isYellow ? 'yellow' : isFemale ? 'pink' : 'blue';

  // Extract age or default
  const ageMatch = text.match(/(\d{2})\s*años/i);
  const age = ageMatch ? parseInt(ageMatch[1], 10) : 58;

  // Extract chief complaint
  let chiefComplaint = 'Malestar general y sintomatología aguda pendiente de filiación diagnóstica.';
  const ccMatch = text.match(/motivo de consulta[:\s]+([^\n\.]+)/i);
  if (ccMatch && ccMatch[1].trim().length > 5) {
    chiefComplaint = ccMatch[1].trim();
  }

  // Extract diagnosis
  let targetDiagnosis = 'Patología médica de Medicina Interna en estudio';
  const diagMatch = text.match(/diagn[oó]stico[:\s]+([^\n\.]+)/i);
  if (diagMatch && diagMatch[1].trim().length > 5) {
    targetDiagnosis = diagMatch[1].trim();
  }

  const caseId = `caso_custom_${Date.now().toString().slice(-4)}`;

  return {
    id: caseId,
    code: 'Caso Personalizado',
    patientName: 'Hipócrates',
    title: targetDiagnosis.slice(0, 48),
    gender: isFemale ? 'femenino' : 'masculino',
    age,
    colorTheme: theme,
    chiefComplaint,
    history: {
      hypertension: norm.includes('hipertens') ? 'Hipertensión arterial bajo control farmacológico habitual.' : 'Sin hipertensión conocida.',
      smoking: norm.includes('fuma') || norm.includes('tabaco') ? 'Tabaquismo activo con antecedentes tóxicos.' : 'No fumador.',
      allergies: 'No refiere alergias medicamentosas conocidas.',
      medications: 'Medicación crónica especificada en interrogatorio.',
      pastSurgeries: 'Sin cirugías de relevancia inmediata.',
      familyHistory: 'Antecedentes familiares de interés cardiovascular y metabólico.',
      otherAntecedents: 'Enfermedades crónicas en seguimiento ambulatorio.',
    },
    currentSymptoms: {
      painLocation: 'Región según motivo de consulta principal.',
      painQuality: 'Sintomatología aguda y progresiva referida por el paciente.',
      painIrradiation: 'Sin irradiación lejana evidente.',
      painIntensity: 6,
      associatedSymptoms: ['Malestar general', 'Astenia', 'Inquietud'],
      onset: 'Comienzo en las últimas horas antes del ingreso.',
      dyspneaLevel: norm.includes('disnea') ? 'moderate' : 'none',
    },
    initialVitals: {
      bpSystolic: norm.includes('hipotens') ? 95 : 125,
      bpDiastolic: norm.includes('hipotens') ? 60 : 80,
      heartRate: norm.includes('taquicard') ? 112 : 78,
      respRate: norm.includes('taquipn') ? 24 : 16,
      oxygenSat: 96,
      temperature: norm.includes('fiebre') ? 38.6 : 36.7,
      painScore: 6,
    },
    physicalExam: {
      general: '*Paciente consciente, quejumbroso, orientado en las 3 esferas con sintomatología referida.*',
      cardiac: '*Ruidos cardíacos rítmicos, normofonéticos, sin soplos audibles.*',
      pulmonary: '*Campos pulmonares bien ventilados bilateralmente sin estertores sobreañadidos.*',
      skin: '*Piel y mucosas normocoloreadas y normohidratadas sin lesiones evidentes.*',
      abdomen: '*Abdomen blando, depresible, doloroso a la palpación en área afecta sin peritonismo.*',
      extremities: '*Extremidades sin edemas con pulsos periféricos palpables y simétricos.*',
      neckVessels: '*Sin ingurgitación yugular ni adenopatías supraclaviculares.*',
      neurological: '*Glasgow 15/15. Pares craneales y reflejos osteotendinosos conservados.*',
    },
    complementaryStudies: {
      ecg: {
        rhythm: 'Ritmo sinusal regular',
        summary: 'Trazado electrocardiográfico sin alteraciones isquémicas agudas',
        stElevationLeads: [],
        stElevationMm: 0,
        detailedDescription: 'Ritmo sinusal regular, PR y QRS normales, repolarización ventricular sin cambios patológicos.',
      },
      troponins: '*Troponinas: Dentro de rango normal sin necrosis activa.*',
      cpkCkmb: '*CPK y enzimas musculares normales.*',
      hemogram: '*Hemograma completo: Parámetros procesados por laboratorio.*',
      biochemistry: '*Bioquímica sérica y función renal analizada.*',
      coagulation: '*Tiempos de coagulación dentro de límites estándar.*',
      chestXray: '*Radiografía de tórax: Silueta cardiaca y campos pulmonares normales.*',
      arterialBloodGas: '*Gasometría: Equilibrio ácido-base compensado.*',
      otherDefault: '*Estudios complementarios procesados según orden médica.*',
    },
    ordenes_disponibles: {
      estudios: [
        {
          id: 'analitica_urgente',
          keywords: ['hemograma', 'bioquimica', 'analitica', 'perfil renal', 'sangre'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Analítica Sanguínea Urgente (Hemograma y Bioquímica)',
          reporte: 'Muestra sanguínea procesada sin incidencias técnicas.',
          valores: {
            'Estado': 'Valores procesados en laboratorio central'
          },
          costo_puntos: 10,
          tiempo_espera_min: 20,
          es_pertinente: true,
        },
        {
          id: 'ecg_estudio',
          keywords: ['ecg', 'electrocardiograma', 'electro'],
          department: 'Cardiología',
          tipo: 'imagen',
          titulo: 'ECG de 12 Derivaciones',
          reporte: 'Ritmo sinusal sin hallazgos isquémicos agudos.',
          costo_puntos: 5,
          tiempo_espera_min: 1,
          es_pertinente: true,
          imageType: 'ecg',
        },
        {
          id: 'rx_estudio',
          keywords: ['rx', 'radiografia', 'placa de torax'],
          department: 'Radiología & Imagen',
          tipo: 'imagen',
          titulo: 'Radiografía de Tórax Portátil',
          reporte: 'Sin alteraciones pleuropulmonares agudas.',
          costo_puntos: 10,
          tiempo_espera_min: 10,
          es_pertinente: true,
          imageType: 'xray',
        },
        {
          id: 'fluidoterapia_tto',
          keywords: ['suero', 'fluidoterapia', 'ringer', 'fisiologico', 'hidratacion'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Fluidoterapia Intravenosa de Reanimación',
          reporte: 'Enfermería infunde cristaloides parenterales. Estabilidad hemodinámica mejorada.',
          costo_puntos: 3,
          tiempo_espera_min: 5,
          es_pertinente: true,
        },
        {
          id: 'analgesia_tto',
          keywords: ['analgesia', 'paracetamol', 'metamizol', 'dolor'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Analgesia Intravenosa Controlada',
          reporte: 'Enfermería administra analgesia pautada. Paciente refiere alivio paulatino del dolor.',
          costo_puntos: 3,
          tiempo_espera_min: 5,
          es_pertinente: true,
        }
      ]
    },
    targetDiagnosis,
    expectedActions: [
      {
        id: 'monitor_vitales',
        name: 'Monitorización de constantes y canalización venosa',
        category: 'monitoring',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Monitorización no invasiva + vía venosa periférica',
        rationale: 'Estabilización básica inicial del paciente en guardia.',
        vitalImpact: {},
      },
      {
        id: 'estudios_filacion',
        name: 'Solicitud de pruebas complementarias específicas para el diagnóstico',
        category: 'monitoring',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Pruebas analíticas y radiológicas dirigidas',
        rationale: 'Permite confirmar la sospecha clínica de forma certera.',
        vitalImpact: {},
      }
    ],
    contraindicatedActions: [
      {
        id: 'alta_inadecuada',
        name: 'Alta prematura sin filiación diagnóstica',
        harmRationale: 'Riesgo crítico de progresión y deterioro clínico no monitorizado.',
        vitalPenalty: { heartRate: 125, painScore: 9 },
      }
    ],
    debriefNotes: {
      clinicalPearl: 'La anamnesis sistemática y el uso racional de pruebas complementarias dirigidas son la base para el diagnóstico certero en Medicina Interna.',
      guidelineReference: 'Guías Clínicas de Medicina Interna y Urgencias.',
      keyPitfalls: [
        'Demorar el diagnóstico por no solicitar los estudios complementarios pertinentes.',
        'Iniciar tratamientos empíricos sin una valoración física exhaustiva.'
      ]
    }
  };
}
