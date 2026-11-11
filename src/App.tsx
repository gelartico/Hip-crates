import React, { useState } from 'react';
import { CLINICAL_CASES } from './data/cases';
import { VitalSigns, ClinicalStage, ChatMessage, NursingLogEntry, ClinicalCase } from './types/clinical';
import { Header } from './components/Navigation/Header';
import { BottomTabs, MobileTab } from './components/Navigation/BottomTabs';
import { LeftRobotColumn } from './components/LeftRobotColumn';
import { ChatTerminal } from './components/ChatTerminal';
import { HospitalOrderTerminal } from './components/HospitalOrderTerminal';
import { EcgViewer } from './components/EcgViewer';
import { RadiologyViewerModal } from './components/RadiologyViewerModal';
import { ClinicalDebrief } from './components/ClinicalDebrief';
import { CaseCreatorModal } from './components/CaseCreatorModal';
import { WelcomeStageModal } from './components/WelcomeStageModal';
import { OrderResolution } from './utils/orderSystem';
import { processStudentInteraction } from './utils/clinicalEngine';
import { medicalAudio } from './utils/audioSynth';
import { getClientGeminiApiKey } from './utils/geminiClient';
import { X, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

const WELCOME_STAGE_0_MESSAGE = `¡Bienvenidos a Hipócrates, el mejor simulador de casos clínicos! 🩺🤖

Por favor, selecciona el módulo o especialidad que deseas practicar hoy:

1️⃣ 🫁 **Respiratorio**
2️⃣ 🫀 **Cardio**
3️⃣ 🧠 **Neuro**
4️⃣ 🫄 **Digestivo**
5️⃣ 🎲 **Hipócrates elige el módulo** (Caso aleatorio sorpresa)

*Escribe el número o el nombre del módulo para comenzar el caso.*`;

export default function App() {
  const [casesList, setCasesList] = useState<ClinicalCase[]>(CLINICAL_CASES);
  const [currentCaseId, setCurrentCaseId] = useState<string>('caso_resp_001');
  const activeCase = casesList.find((c) => c.id === currentCaseId) || casesList[0];

  const [vitals, setVitals] = useState<VitalSigns>(activeCase.initialVitals);
  const [stage, setStage] = useState<ClinicalStage>('initial');
  const [administeredActions, setAdministeredActions] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(true);
  const [activeMobileTab, setActiveMobileTab] = useState<MobileTab>('chat');

  // Efficiency budget & Hospital timer
  const [efficiencyPoints, setEfficiencyPoints] = useState<number>(100);
  const [elapsedMinutes, setElapsedMinutes] = useState<number>(0);

  // Modals state
  const [isEcgModalOpen, setIsEcgModalOpen] = useState<boolean>(false);
  const [isRadiologyModalOpen, setIsRadiologyModalOpen] = useState<boolean>(false);
  const [isDebriefModalOpen, setIsDebriefModalOpen] = useState<boolean>(false);
  const [isCaseCreatorModalOpen, setIsCaseCreatorModalOpen] = useState<boolean>(false);

  // Initial patient greeting per case
  const getInitialMessage = (c: typeof activeCase): ChatMessage => {
    if (c.id === 'caso_resp_001') {
      return {
        id: `init-${Date.now()}`,
        sender: 'robodoc',
        text: `Doctora... (toso con dificultad, me sujeto el costado derecho del tórax con dolor pleurítico y respiro agitada)... me falta el aire... cada vez que toso o respiro hondo siento una cuchillada en el costado derecho... además tengo más de 38°C de fiebre y lo que escupo sale de un color marrón herrumbroso... por favor, ayúdeme...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    if (c.id === 'caso_neu_001') {
      return {
        id: `init-${Date.now()}`,
        sender: 'robodoc',
        text: `Doc... tor... (hablo con mucho esfuerzo, arrastrando las palabras, con asimetría facial y caída labial derecha)... no... brazo... no puedo... mover... el brazo... ni la pierna... derecha... se me durmió... de golpe... hace... una hora...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    if (c.id === 'caso_car_001') {
      return {
        id: `init-${Date.now()}`,
        sender: 'robodoc',
        text: `Ufff... doctor... (me llevo la mano al centro del pecho con dolor opresivo angustiante)... me aprieta horrible desde hace dos horas... siento como si una losa enorme me estuviera aplastando el pecho... me entra un sudor muy frío y náuseas... y se me sube a la mandíbula y al brazo izquierdo... por favor, ayúdeme...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    if (c.id === 'caso_dig_001' || c.id === 'caso_001') {
      return {
        id: `init-${Date.now()}`,
        sender: 'robodoc',
        text: `Ufff... doctor/a... (me llevo la mano al abdomen superior con molestia sorda y pesadez)... qué bueno que me atiende... vengo porque desde hace tres meses tengo un dolor sordo y pesado aquí en la boca del estómago que empeora mucho cada vez que como... además me lleno apenas con dos bocados y ya he perdido 8 kilos... me noto muy cansado y débil... por favor, ayúdeme...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    if (c.id === 'caso_004') {
      return {
        id: `init-${Date.now()}`,
        sender: 'robodoc',
        text: `Doctor... (con voz apagada, débil y con temblor)... me siento muy débil, mareado y con mucho frío... cada vez que intento sentarme o pararme se me nubla la vista por completo y siento que me desmayo... además tengo la boca muy seca y en las últimas 24 horas fui dos veces de cuerpo y salió todo negro, negro como alquitrán y con un olor espantoso... ayúdeme por favor...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    const isMale = c.gender === 'masculino';
    return {
      id: `init-${Date.now()}`,
      sender: 'robodoc',
      text: isMale
        ? `Ufff... doctor... (me llevo la mano al centro del pecho con dolor opresivo)... me aprieta horrible desde hace dos horas... siento como si una losa enorme me estuviera aplastando... me entra un sudor muy frío y muchas náuseas... por favor, ayúdeme...`
        : `Ay doctor... (respiro agitada y con dificultad)... casi no puedo hablar... siento una punzada intensa en el pecho cada vez que tomo aire y un ahogo tremendo...`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const [patientMessages, setPatientMessages] = useState<ChatMessage[]>([
    {
      id: 'init-welcome',
      sender: 'robodoc',
      text: WELCOME_STAGE_0_MESSAGE,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Initial Nursing/System Log
  const getInitialNursingLogs = (): NursingLogEntry[] => [
    {
      id: 'log-init-1',
      timestamp: '08:00',
      department: 'Enfermería de Urgencias',
      orderText: 'Ingreso en Box 1 de Urgencias',
      responseText: 'Paciente monitorizado. Vía venosa periférica permeable. Monitor activo.',
      cost: 0,
      waitTimeMin: 0,
      tipo: 'tratamiento',
    },
  ];

  const [nursingLogs, setNursingLogs] = useState<NursingLogEntry[]>(getInitialNursingLogs());

  // ETAPA 1: Select module from modal or command
  const handleSelectModule = (choice: 1 | 2 | 3 | 4 | 5) => {
    let targetCaseId = 'caso_resp_001';
    if (choice === 1) targetCaseId = 'caso_resp_001';
    else if (choice === 2) targetCaseId = 'caso_car_001';
    else if (choice === 3) targetCaseId = 'caso_neu_001';
    else if (choice === 4) targetCaseId = 'caso_dig_001';
    else if (choice === 5) {
      const pool = ['caso_resp_001', 'caso_car_001', 'caso_neu_001', 'caso_dig_001'];
      targetCaseId = pool[Math.floor(Math.random() * pool.length)];
    }

    const selectedCase = casesList.find((c) => c.id === targetCaseId) || casesList[0];
    setCurrentCaseId(selectedCase.id);
    setVitals({ ...selectedCase.initialVitals });
    setStage('initial');
    setAdministeredActions([]);
    setEfficiencyPoints(100);
    setElapsedMinutes(0);
    setPatientMessages([getInitialMessage(selectedCase)]);
    setNursingLogs(getInitialNursingLogs());
    setIsWelcomeModalOpen(false);

    medicalAudio.speakText(getInitialMessage(selectedCase).text, selectedCase.gender === 'femenino');
  };

  // Reset case
  const handleResetCase = () => {
    setVitals({ ...activeCase.initialVitals });
    setStage('initial');
    setAdministeredActions([]);
    setEfficiencyPoints(100);
    setElapsedMinutes(0);
    setPatientMessages([getInitialMessage(activeCase)]);
    setNursingLogs(getInitialNursingLogs());
  };

  // Switch case
  const handleSelectCase = (caseId: string) => {
    const newCase = casesList.find((c) => c.id === caseId) || casesList[0];
    setCurrentCaseId(caseId);
    setVitals({ ...newCase.initialVitals });
    setStage('initial');
    setAdministeredActions([]);
    setEfficiencyPoints(100);
    setElapsedMinutes(0);
    setPatientMessages([getInitialMessage(newCase)]);
    setNursingLogs(getInitialNursingLogs());
  };

  // Load new case from CaseCreatorModal
  const handleLoadCaseToSimulator = (newCase: ClinicalCase) => {
    setCasesList((prev) => [newCase, ...prev.filter((c) => c.id !== newCase.id)]);
    setCurrentCaseId(newCase.id);
    setVitals({ ...newCase.initialVitals });
    setStage('initial');
    setAdministeredActions([]);
    setEfficiencyPoints(100);
    setElapsedMinutes(0);
    setPatientMessages([getInitialMessage(newCase)]);
    setNursingLogs(getInitialNursingLogs());
  };

  // ========================================================
  // CENTRAL COLUMN: Anamnesis / Chat with Gemini (First person)
  // ========================================================
  const handleSendPatientMessage = async (text: string) => {
    if (!text.trim() || isSimulating) return;

    const studentMessage: ChatMessage = {
      id: `msg-${Date.now()}-student`,
      sender: 'student',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setPatientMessages((prev) => [...prev, studentMessage]);
    setIsSimulating(true);

    try {
      let result;

      // Server proxy call to /api/chat
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text.trim(),
            caseId: activeCase.id,
            currentVitals: vitals,
            currentStage: stage,
            history: patientMessages.slice(-5),
            administeredActions,
          }),
        });

        if (response.ok) {
          result = await response.json();
        }
      } catch (networkError) {
        console.warn('Network API not available, using clinical engine:', networkError);
      }

      if (!result || !result.reply) {
        result = processStudentInteraction(
          text.trim(),
          activeCase,
          vitals,
          stage,
          administeredActions
        );
      }

      if (result.isWelcomeStage) {
        setIsWelcomeModalOpen(true);
      }

      if (result.selectedCaseId) {
        const nextCase = casesList.find((c) => c.id === result.selectedCaseId);
        if (nextCase) {
          setCurrentCaseId(nextCase.id);
          setVitals({ ...nextCase.initialVitals });
          setStage('initial');
          setAdministeredActions([]);
          setEfficiencyPoints(100);
          setElapsedMinutes(0);
          setNursingLogs(getInitialNursingLogs());
          setIsWelcomeModalOpen(false);
        }
      }

      if (result.vitalUpdates) {
        setVitals((prev) => ({
          ...prev,
          ...result.vitalUpdates,
        }));
      }

      if (result.stageUpdate) {
        setStage(result.stageUpdate);
      }

      if (result.actionDetected && !administeredActions.includes(result.actionDetected)) {
        setAdministeredActions((prev) => [...prev, result.actionDetected]);
      }

      const robodocMessage: ChatMessage = {
        id: `msg-${Date.now()}-robodoc`,
        sender: 'robodoc',
        text: result.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setPatientMessages((prev) => [...prev, robodocMessage]);

      // Voice synthesis
      medicalAudio.speakText(result.reply, activeCase.gender === 'femenino');
    } catch (err) {
      console.error('Error handling student query:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  // ========================================================
  // RIGHT COLUMN: Terminal de Órdenes y Enfermería
  // Validates order against JSON, updates cost and wait time
  // ========================================================
  const handleOrderProcessed = (resolution: OrderResolution, orderText: string) => {
    // 1. Deduct efficiency points
    setEfficiencyPoints((pts) => Math.max(0, pts - resolution.cost));

    // 2. Advance simulated hospital time
    setElapsedMinutes((prevMins) => prevMins + resolution.waitTimeMin);

    // Compute formatted time (starting at 08:00)
    const newTotalMins = 8 * 60 + elapsedMinutes + resolution.waitTimeMin;
    const hrs = Math.floor(newTotalMins / 60) % 24;
    const mins = newTotalMins % 60;
    const timeFormatted = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;

    // 3. Create and append nursing log entry
    const newLog: NursingLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: timeFormatted,
      department: resolution.department,
      orderText,
      responseText: resolution.responseText,
      cost: resolution.cost,
      waitTimeMin: resolution.waitTimeMin,
      tipo: resolution.tipo,
      valores: resolution.valores,
      imageType: resolution.imageType,
    };

    setNursingLogs((prev) => [...prev, newLog]);

    // 4. If order is an image, open modal immediately or alert
    if (resolution.tipo === 'imagen') {
      if (resolution.imageType === 'ecg') {
        setIsEcgModalOpen(true);
      } else if (resolution.imageType === 'xray' || resolution.imageType === 'angiotac') {
        setIsRadiologyModalOpen(true);
      }
    }

    // 5. If order triggers clinical treatment or penalty
    if (resolution.actionId) {
      if (!administeredActions.includes(resolution.actionId)) {
        setAdministeredActions((prev) => [...prev, resolution.actionId!]);
      }

      if (
        resolution.actionId === 'urgent_reperfusion' ||
        resolution.actionId === 'oncology_consult' ||
        (resolution.actionId === 'order_endoscopy' && activeCase.id === 'caso_004')
      ) {
        setStage('resolved');
        setVitals((v) => ({
          ...v,
          painScore: 1,
          heartRate: 80,
          bpSystolic: Math.max(115, v.bpSystolic),
          bpDiastolic: Math.max(72, v.bpDiastolic),
        }));
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch {}
      } else if (
        resolution.actionId === 'give_nsaids' ||
        resolution.actionId === 'give_nsaids_gastric' ||
        resolution.actionId === 'reinit_nsaid_error'
      ) {
        setStage('worsened');
        setVitals((v) => ({
          ...v,
          bpSystolic: Math.max(75, v.bpSystolic - 15),
          heartRate: Math.min(135, v.heartRate + 15),
          painScore: Math.min(10, v.painScore + 4),
        }));
      } else if (resolution.actionId === 'fluid_resuscitation') {
        setStage((s) => (s === 'initial' ? 'improving' : s));
        setVitals((v) => ({
          ...v,
          bpSystolic: 105,
          bpDiastolic: 68,
          heartRate: 94,
        }));
      } else if (resolution.actionId === 'blood_transfusion') {
        setStage((s) => (s === 'initial' ? 'improving' : s));
        setVitals((v) => ({
          ...v,
          bpSystolic: 115,
          bpDiastolic: 72,
          heartRate: 84,
        }));
      } else if (resolution.actionId === 'high_dose_ppi' || resolution.actionId === 'give_ppi') {
        setStage((s) => (s === 'initial' ? 'improving' : s));
        setVitals((v) => ({
          ...v,
          painScore: Math.max(1, v.painScore - 2),
        }));
      } else if (resolution.actionId === 'iron_replacement') {
        setStage((s) => (s === 'initial' ? 'improving' : s));
      } else if (
        resolution.actionId === 'premature_discharge_gastric' ||
        resolution.actionId === 'discharge_error'
      ) {
        setStage('critical');
        setVitals((v) => ({
          ...v,
          bpSystolic: 65,
          bpDiastolic: 40,
          heartRate: 135,
          painScore: 7,
        }));
      } else if (resolution.actionId === 'sengstaken_error') {
        setStage('worsened');
        setVitals((v) => ({
          ...v,
          bpSystolic: 80,
          bpDiastolic: 50,
          heartRate: 120,
        }));
      } else if (resolution.actionId === 'nitrates_sublingual') {
        setStage((s) => (s === 'initial' ? 'improving' : s));
        setVitals((v) => ({
          ...v,
          bpSystolic: 135,
          bpDiastolic: 85,
          painScore: Math.max(3, v.painScore - 3),
        }));
      } else if (resolution.actionId === 'morphine_analgesia') {
        setStage((s) => (s === 'initial' ? 'improving' : s));
        setVitals((v) => ({
          ...v,
          painScore: Math.max(2, v.painScore - 4),
          heartRate: Math.max(78, v.heartRate - 12),
        }));
      } else if (resolution.actionId === 'aspirin_loading') {
        setStage((s) => (s === 'initial' ? 'improving' : s));
        setVitals((v) => ({
          ...v,
          painScore: Math.max(6, v.painScore - 1),
        }));
      }
    }
  };

  const hasAbnormalVitals =
    vitals.bpSystolic < 90 ||
    vitals.bpSystolic >= 140 ||
    vitals.heartRate > 100 ||
    vitals.heartRate < 60 ||
    vitals.oxygenSat < 92 ||
    vitals.temperature >= 37.8 ||
    stage === 'critical' ||
    stage === 'worsened';

  return (
    <div className="h-[100dvh] min-h-[100dvh] bg-[#090d16] text-slate-100 flex flex-col overflow-hidden font-sans select-none selection:bg-cyan-500 selection:text-white">
      {/* Sticky Header */}
      <Header
        currentCase={activeCase}
        cases={casesList}
        stage={stage}
        onSelectCase={handleSelectCase}
        onResetCase={handleResetCase}
        onOpenCaseCreator={() => setIsCaseCreatorModalOpen(true)}
        onGoToWelcome={() => setIsWelcomeModalOpen(true)}
        efficiencyPoints={efficiencyPoints}
        elapsedMinutes={elapsedMinutes}
      />

      {/* Main Diagnostic Area: Mobile-First Single View (< 768px) & 3-Column Desktop (>= 768px) */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative max-w-[1750px] w-full mx-auto p-2 sm:p-3 pb-20 md:pb-4">
        {/* VISTA MÓVIL (< 768px): Solo una vista a la vez (Chat, Signos Vitales u Órdenes) */}
        <div className="block md:hidden w-full">
          {activeMobileTab === 'chat' && (
            <div className="w-full">
              <ChatTerminal
                messages={patientMessages}
                clinicalCase={activeCase}
                isSimulating={isSimulating}
                onSendMessage={handleSendPatientMessage}
              />
            </div>
          )}

          {activeMobileTab === 'vitals' && (
            <div className="w-full max-w-md mx-auto space-y-3">
              <LeftRobotColumn
                clinicalCase={activeCase}
                vitals={vitals}
                stage={stage}
                onSelectAction={(query) => {
                  handleSendPatientMessage(query);
                  setActiveMobileTab('chat');
                }}
              />

              <button
                type="button"
                onClick={() => setIsDebriefModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-mono font-medium flex items-center justify-between transition-colors shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" /> Evaluación & Guías Clínicas
                </span>
                <span className="text-xs text-cyan-400">Ver Debrief →</span>
              </button>
            </div>
          )}

          {activeMobileTab === 'orders' && (
            <div className="w-full max-w-md mx-auto">
              <HospitalOrderTerminal
                clinicalCase={activeCase}
                efficiencyPoints={efficiencyPoints}
                elapsedMinutes={elapsedMinutes}
                logs={nursingLogs}
                onOrderProcessed={handleOrderProcessed}
                onOpenEcg={() => setIsEcgModalOpen(true)}
                onOpenRadiology={() => setIsRadiologyModalOpen(true)}
              />
            </div>
          )}
        </div>

        {/* VISTA ESCRITORIO (>= 768px): Las 3 columnas lado a lado centradas limpiamente */}
        <div className="hidden md:flex flex-row items-start justify-center gap-4 w-full">
          {/* 1. Columna Izquierda: Robot y Constantes (máx 260px) */}
          <div className="w-[260px] shrink-0 space-y-2.5">
            <LeftRobotColumn
              clinicalCase={activeCase}
              vitals={vitals}
              stage={stage}
              onSelectAction={handleSendPatientMessage}
            />

            <button
              type="button"
              onClick={() => setIsDebriefModalOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono font-medium flex items-center justify-between transition-colors shadow-xs"
            >
              <span className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-cyan-400" /> Evaluación Clínica
              </span>
              <span className="text-[10px] text-slate-500">Debrief</span>
            </button>
          </div>

          {/* 2. Columna Central: Chat Interrogatorio */}
          <div className="flex-1 min-w-0 max-w-[780px]">
            <ChatTerminal
              messages={patientMessages}
              clinicalCase={activeCase}
              isSimulating={isSimulating}
              onSendMessage={handleSendPatientMessage}
            />
          </div>

          {/* 3. Columna Derecha: Órdenes y Paraclínicos */}
          <div className="w-[420px] lg:w-[460px] xl:w-[480px] shrink-0">
            <HospitalOrderTerminal
              clinicalCase={activeCase}
              efficiencyPoints={efficiencyPoints}
              elapsedMinutes={elapsedMinutes}
              logs={nursingLogs}
              onOrderProcessed={handleOrderProcessed}
              onOpenEcg={() => setIsEcgModalOpen(true)}
              onOpenRadiology={() => setIsRadiologyModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Barra de Navegación Inferior Móvil (Fase 1: BottomTabs fija con pb-safe) */}
      <div className="block md:hidden">
        <BottomTabs
          activeTab={activeMobileTab}
          onTabChange={setActiveMobileTab}
          logsCount={nursingLogs.length}
          hasAbnormalVitals={hasAbnormalVitals}
        />
      </div>

      {/* Modal Visor Radiológico [Pedir Rx / Placa] */}
      {isRadiologyModalOpen && (
        <RadiologyViewerModal
          clinicalCase={activeCase}
          onClose={() => setIsRadiologyModalOpen(false)}
        />
      )}

      {/* Modal ECG de 12 Derivaciones [Pedir ECG] */}
      {isEcgModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-2xl relative">
            <button
              onClick={() => setIsEcgModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors z-10"
              title="Cerrar ECG"
            >
              <X className="w-5 h-5" />
            </button>
            <EcgViewer clinicalCase={activeCase} />
          </div>
        </div>
      )}

      {/* Modal Debrief de Competencias y Guías Clínicas */}
      {isDebriefModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-2xl relative">
            <button
              onClick={() => setIsDebriefModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <ClinicalDebrief
              clinicalCase={activeCase}
              administeredActions={administeredActions}
              stage={stage}
            />
          </div>
        </div>
      )}

      {/* Modal Creador y Organizador de Casos (Modo 2: Panel Docente) */}
      <CaseCreatorModal
        isOpen={isCaseCreatorModalOpen}
        onClose={() => setIsCaseCreatorModalOpen(false)}
        onLoadCaseToSimulator={handleLoadCaseToSimulator}
      />

      {/* Modal Etapa 0: Pantalla de Bienvenida y Selección de Módulo */}
      <WelcomeStageModal
        isOpen={isWelcomeModalOpen}
        onSelectModule={handleSelectModule}
        onClose={() => setIsWelcomeModalOpen(false)}
      />

      {/* Quiet Footer (solo visible en pantallas grandes para no estorbar en móviles) */}
      <footer className="hidden md:block border-t border-slate-900 py-2.5 px-4 text-center text-[11px] font-mono text-slate-500">
        Hipócrates · Simulador Interactivo de Casos Clínicos de Medicina Interna · Modo Paciente & Creador de Casos (Docente)
      </footer>
    </div>
  );
}
