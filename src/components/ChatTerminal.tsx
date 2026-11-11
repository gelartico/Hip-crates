import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ClinicalCase } from '../types/clinical';
import { Send, Mic, MicOff, Volume2, Bot, AlertCircle, Stethoscope } from 'lucide-react';
import { medicalAudio } from '../utils/audioSynth';

interface ChatTerminalProps {
  messages: ChatMessage[];
  clinicalCase: ClinicalCase;
  isSimulating: boolean;
  onSendMessage: (text: string) => void;
}

export const ChatTerminal: React.FC<ChatTerminalProps> = ({
  messages,
  clinicalCase,
  isSimulating,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isYellow = clinicalCase.colorTheme === 'yellow';
  const isPink = clinicalCase.colorTheme === 'pink';
  const isMale = clinicalCase.gender === 'masculino';

  // Quick Anamnesis Clinical Question Suggestions based on active case
  const caseQuestions =
    clinicalCase.id === 'caso_resp_001'
      ? [
          { label: '¿Cómo es la tos y expectoración?', query: '¿Cómo es la tos exactamente y qué color tiene la expectoración?' },
          { label: '¿Desde cuándo tiene la fiebre?', query: '¿Cuándo empezó la fiebre y cuánto marcó el termómetro?' },
          { label: '¿Dónde le clava la puntada?', query: '¿Dónde siente exactamente el dolor en puntada al tomar aire?' },
          { label: '¿Le falta el aire al respirar?', query: '¿Siente ahogo o dificultad para respirar hondo?' },
          { label: '¿Tiene antecedentes pulmonares?', query: '¿Sufre de asma u otra enfermedad respiratoria o fuma?' },
        ]
      : clinicalCase.id === 'caso_neu_001'
      ? [
          { label: '¿A qué hora empezó la debilidad?', query: '¿A qué hora exacta comenzaron la dificultad para hablar y la pérdida de fuerza?' },
          { label: '¿Puede mover el brazo o pierna?', query: '¿Puede intentar levantar el brazo derecho o apretarme la mano?' },
          { label: '¿Le duele la cabeza?', query: '¿Siente dolor de cabeza intenso o náuseas?' },
          { label: '¿Tiene arritmias o toma pastillas?', query: '¿Sufre de arritmias como fibrilación auricular o toma anticoagulantes?' },
          { label: '¿Sufre de presión arterial?', query: '¿Qué medicación toma habitualmente para la tensión?' },
        ]
      : clinicalCase.id === 'caso_dig_001' || clinicalCase.id === 'caso_001'
      ? [
          { label: '¿Cómo es el dolor y pesadez?', query: '¿Cómo es el dolor exactamente en el estómago y a qué se parece?' },
          { label: '¿Cuánto peso ha bajado?', query: '¿Ha notado pérdida involuntaria de peso en estos meses?' },
          { label: '¿Se llena rápido al comer?', query: '¿Siente saciedad precoz o falta de apetito al comer?' },
          { label: '¿Fuma o tiene antecedentes?', query: '¿Fuma o tiene antecedentes médicos como hipertensión o diabetes?' },
          { label: '¿Tiene acidez o gastritis previa?', query: '¿Tiene antecedentes de reflujo, gastritis o infección por Helicobacter?' },
        ]
      : clinicalCase.id === 'caso_004'
      ? [
          { label: '¿Cómo fueron las deposiciones?', query: '¿Cómo fueron exactamente esas idas de cuerpo y qué color tenían?' },
          { label: '¿Qué medicación toma a diario?', query: '¿Toma algún medicamento habitual o calmante para el dolor?' },
          { label: '¿Sentía ardor en el estómago?', query: '¿Sentía antes ardor en la boca del estómago que calmaba al comer?' },
          { label: '¿Tiene mareos al pararse?', query: '¿Siente mareos, visión nublada o desmayo al incorporarse?' },
          { label: '¿Tiene antecedentes médicos?', query: '¿Sufre de hipertensión arterial u otras enfermedades?' },
        ]
      : [
          { label: '¿A qué se parece el dolor?', query: '¿Cómo es el dolor exactamente y a qué se parece?' },
          { label: '¿Hacia dónde se irradia?', query: '¿El dolor se le irradia hacia alguna parte como brazo o cuello?' },
          { label: '¿A qué hora empezó?', query: '¿A qué hora exacta empezó el dolor y qué estaba haciendo?' },
          { label: '¿Tiene náuseas o sudor frío?', query: '¿Siente náuseas, falta de aire o sudoración fría?' },
          { label: '¿Toma medicación habitual?', query: '¿Toma alguna pastilla habitual y tiene alergias?' },
        ];

  const quickQuestions = [
    { label: '🏠 Inicio / Módulos', query: 'Inicio' },
    ...caseQuestions,
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSimulating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSimulating) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  // Web Speech Recognition for voice inquiry
  const toggleSpeechRecognition = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('El reconocimiento por voz no está disponible en este navegador.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col h-[650px] lg:h-[720px] bg-slate-900/95 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* 1. Header Bar: Solo nombre del paciente, edad e insignia con motivo de consulta */}
      <div className="bg-slate-950 px-3.5 py-2.5 border-b border-slate-800/90 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-sm ${
              isYellow
                ? 'bg-amber-950/80 border border-amber-600/60 text-amber-300'
                : isPink
                ? 'bg-pink-950/80 border border-pink-600/60 text-pink-300'
                : 'bg-cyan-950/80 border border-cyan-600/60 text-cyan-300'
            }`}
          >
            <Bot className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-100 truncate">
                {clinicalCase.patientName || 'Hipócrates'}
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {clinicalCase.age}a · {clinicalCase.gender === 'femenino' ? 'F' : 'M'}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono hidden sm:inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                En consulta
              </span>
            </div>
          </div>
        </div>

        {/* Insignia / Badge con el motivo de consulta */}
        <div className="max-w-[240px] sm:max-w-[340px] truncate text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shrink-0">
          <span className="text-slate-500 mr-1.5">Motivo:</span>
          <span className="text-cyan-300 font-medium">
            {clinicalCase.chiefComplaint || 'Consulta médica'}
          </span>
        </div>
      </div>

      {/* 2. Messages Scroll Area (WhatsApp / Telegram style) */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2.5 bg-slate-900/60">
        {messages.map((msg) => {
          const isStudent = msg.sender === 'student';
          const isSystem = msg.sender === 'system';

          if (isSystem) {
            return (
              <div
                key={msg.id}
                className="py-1 px-3 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 font-mono text-center mx-auto max-w-md flex items-center justify-center gap-2 shadow-xs"
              >
                <AlertCircle className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>{msg.text}</span>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex w-full ${isStudent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[78%] px-3.5 py-2.5 rounded-2xl shadow-sm text-xs sm:text-sm leading-relaxed ${
                  isStudent
                    ? 'bg-cyan-600 text-white rounded-tr-xs'
                    : 'bg-slate-800/95 text-slate-100 border border-slate-700/60 rounded-tl-xs'
                }`}
              >
                {/* Formatter for JSON code blocks, physical findings with asterisks, and text */}
                {msg.text.includes('```') ? (
                  <div className="space-y-2">
                    {msg.text.split(/(```[\s\S]*?```)/g).map((part, pIdx) => {
                      if (part.startsWith('```')) {
                        const cleanCode = part.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/, '');
                        return (
                          <div key={pIdx} className="my-2 p-2.5 rounded-xl bg-slate-950 border border-amber-500/40 font-mono text-xs overflow-x-auto relative">
                            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-[10px] text-amber-300">
                              <span>CÓDIGO JSON GENERADO</span>
                              <button
                                type="button"
                                onClick={() => navigator.clipboard.writeText(cleanCode)}
                                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-200 transition-colors"
                              >
                                Copiar
                              </button>
                            </div>
                            <pre className="text-cyan-300 whitespace-pre">
                              <code>{cleanCode}</code>
                            </pre>
                          </div>
                        );
                      }
                      return <p key={pIdx} className="whitespace-pre-wrap">{part}</p>;
                    })}
                  </div>
                ) : (
                  msg.text.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                      return (
                        <div
                          key={pIdx}
                          className="my-1.5 p-2 rounded-lg bg-slate-950/80 border border-cyan-900/50 text-cyan-200 text-xs font-mono flex items-start gap-1.5"
                        >
                          <Stethoscope className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <div>{paragraph.replace(/\*/g, '')}</div>
                        </div>
                      );
                    }
                    return <p key={pIdx} className="whitespace-pre-wrap">{paragraph}</p>;
                  })
                )}

                {/* Subtitle footer inside bubble: Voice speaker & timestamp */}
                <div
                  className={`flex items-center justify-end gap-1.5 mt-1 pt-0.5 text-[10px] font-mono ${
                    isStudent ? 'text-cyan-100/70' : 'text-slate-400'
                  }`}
                >
                  {!isStudent && (
                    <button
                      type="button"
                      onClick={() => medicalAudio.speakText(msg.text, !isMale)}
                      className="text-slate-400 hover:text-cyan-400 transition-colors mr-auto flex items-center gap-1"
                      title="Escuchar audio"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span className="text-[9px]">Voz</span>
                    </button>
                  )}
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}

        {isSimulating && (
          <div className="flex justify-start">
            <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-xs bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full animate-ping ${isYellow ? 'bg-amber-400' : 'bg-cyan-400'}`} />
              <span>Hipócrates está respondiendo...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Sugerencias en barra horizontal flotante muy fina justo arriba del input */}
      <div className="px-2.5 py-1.5 bg-slate-950/90 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-mono text-slate-500 shrink-0 pl-1">
          Sugerencias:
        </span>
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSendMessage(q.query)}
            disabled={isSimulating}
            className="px-2.5 py-0.5 text-[11px] font-mono whitespace-nowrap rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors disabled:opacity-40"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* 4. Modern Input Form */}
      <form
        onSubmit={handleSubmit}
        className="p-2.5 sm:p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={toggleSpeechRecognition}
          className={`p-2 rounded-xl border transition-colors ${
            isListening
              ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
          title="Hablar por micrófono"
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu pregunta o anamnesis al paciente..."
          disabled={isSimulating}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isSimulating}
          className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:pointer-events-none shadow"
        >
          <span>Preguntar</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
