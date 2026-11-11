import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ClinicalCase, NursingLogEntry, AvailableOrder } from '../types/clinical';
import { resolveHospitalOrder, OrderResolution } from '../utils/orderSystem';
import {
  Send,
  FileText,
  XCircle,
  Image as ImageIcon,
  TestTube,
  Stethoscope,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Pill,
  Syringe,
  Check,
} from 'lucide-react';

interface HospitalOrderTerminalProps {
  clinicalCase: ClinicalCase;
  efficiencyPoints: number;
  elapsedMinutes: number;
  logs: NursingLogEntry[];
  onOrderProcessed: (resolution: OrderResolution, orderText: string) => void;
  onOpenEcg: () => void;
  onOpenRadiology: () => void;
}

type TabType = 'estudios' | 'tratamiento' | 'enfermeria';

export const HospitalOrderTerminal: React.FC<HospitalOrderTerminalProps> = ({
  clinicalCase,
  efficiencyPoints,
  elapsedMinutes,
  logs,
  onOrderProcessed,
  onOpenEcg,
  onOpenRadiology,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('estudios');

  // Search input state
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Accordion state for studies
  const [expandedStudies, setExpandedStudies] = useState<string[]>([]);

  const logEndRef = useRef<HTMLDivElement | null>(null);

  const allOrders: AvailableOrder[] = clinicalCase.ordenes_disponibles?.estudios || [];

  const diagnosticStudies = useMemo(() => {
    return allOrders.filter((o) => o.tipo !== 'tratamiento' && o.tipo !== 'rechazado');
  }, [allOrders]);

  const treatmentOrders = useMemo(() => {
    return allOrders.filter((o) => o.tipo === 'tratamiento');
  }, [allOrders]);

  // Suggested dictionary built dynamically from the case JSON
  const orderDictionary = useMemo(() => {
    const list: string[] = [];
    allOrders.forEach((s) => {
      list.push(s.titulo);
      s.keywords.forEach((kw) => {
        if (kw.length > 3 && !list.includes(kw)) {
          list.push(kw.charAt(0).toUpperCase() + kw.slice(1));
        }
      });
    });

    // Medical standard extras
    const commonExtras = [
      'ECG 12 derivaciones',
      'Troponinas I',
      'Radiografía de tórax',
      'Hemograma completo',
      'Bioquímica y función renal',
      'Coagulación e INR',
      'Gasometría arterial',
      'Dímero D',
      'Auscultación cardíaca',
      'Auscultación pulmonar',
      'Toma de presión arterial',
      'Aspirina 300 mg',
      'Ticagrelor 180 mg',
      'Nitroglicerina sublingual',
      'Morfina IV',
      'Código Infarto',
      'rtPA Alteplasa',
      'Código Ictus',
      'TAC de cráneo simple',
      'Ceftriaxona 2g IV',
      'Azitromicina 500mg IV',
      'Omeprazol 80 mg IV',
      'Expansión con Ringer Lactato',
      'Transfusión de concentrado de hematíes',
      'VEDA urgente',
    ];

    commonExtras.forEach((e) => {
      if (!list.includes(e)) list.push(e);
    });

    return list;
  }, [allOrders]);

  // Autocomplete filtering
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputText(val);
    if (val.trim().length >= 2) {
      const filtered = orderDictionary
        .filter((item) => item.toLowerCase().includes(val.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputText(suggestion);
    setShowSuggestions(false);
  };

  const handleExecuteOrder = (orderQuery: string) => {
    if (!orderQuery.trim()) return;
    setInputText('');
    setShowSuggestions(false);

    // Resolve order against JSON keywords
    const resolution = resolveHospitalOrder(orderQuery, clinicalCase);
    onOrderProcessed(resolution, orderQuery);

    // If an action was processed, ensure accordion is expanded if matching study
    if (resolution.department.includes('Laboratorio') || resolution.department.includes('Radiología') || resolution.department.includes('Cardiología')) {
      const match = diagnosticStudies.find((s) =>
        s.keywords.some((kw) => orderQuery.toLowerCase().includes(kw.toLowerCase()))
      );
      if (match && !expandedStudies.includes(match.id)) {
        setExpandedStudies((prev) => [...prev, match.id]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteOrder(inputText.trim());
  };

  // Toggle study accordion
  const toggleStudyExpand = (studyId: string) => {
    setExpandedStudies((prev) =>
      prev.includes(studyId) ? prev.filter((id) => id !== studyId) : [...prev, studyId]
    );
  };

  // Check if study is already requested in logs
  const isStudyRequested = (study: AvailableOrder) => {
    return logs.some((log) =>
      study.keywords.some((kw) => log.orderText.toLowerCase().includes(kw.toLowerCase()))
    );
  };

  // Find result for study in nursing logs
  const getStudyLog = (study: AvailableOrder) => {
    return logs.find((log) =>
      study.keywords.some((kw) => log.orderText.toLowerCase().includes(kw.toLowerCase()))
    );
  };

  useEffect(() => {
    if (activeTab === 'enfermeria') {
      logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, activeTab]);

  return (
    <div className="flex flex-col h-[650px] lg:h-[720px] bg-slate-900/95 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-white">
      {/* 3 TABS HEADER BAR */}
      <div className="bg-slate-950 p-2 border-b border-slate-800">
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          {/* Tab 1: Estudios & Labs */}
          <button
            type="button"
            onClick={() => setActiveTab('estudios')}
            className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'estudios'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <TestTube className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">📋 Estudios & Labs</span>
          </button>

          {/* Tab 2: Tratamiento */}
          <button
            type="button"
            onClick={() => setActiveTab('tratamiento')}
            className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'tratamiento'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Pill className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">💊 Tratamiento</span>
          </button>

          {/* Tab 3: Registro de Enfermería */}
          <button
            type="button"
            onClick={() => setActiveTab('enfermeria')}
            className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all relative ${
              activeTab === 'enfermeria'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">🩺 Enfermería</span>
            {logs.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-slate-950 text-[10px] font-mono font-bold text-cyan-300 border border-slate-800">
                {logs.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* TAB CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-slate-900/60 space-y-3.5">
        {/* ========================================================
            PESTAÑA 1: 📋 ESTUDIOS & LABS
            (Buscador y resultados ordenados por tarjetas desplegables)
           ======================================================== */}
        {activeTab === 'estudios' && (
          <div className="space-y-3">
            {/* Quick Suggestions Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              <span className="text-[10px] font-mono text-slate-500 shrink-0">Frecuentes:</span>
              {['ECG 12 derivaciones', 'Troponinas I', 'Rx Tórax', 'Hemograma', 'TAC cráneo', 'VEDA'].map((sug, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => handleExecuteOrder(sug)}
                  className="px-2 py-0.5 text-[11px] font-mono whitespace-nowrap rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Expandable Case Studies Accordion Cards */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Catálogo de Estudios Complementarios</span>
                <span className="text-slate-500 font-normal">
                  {diagnosticStudies.length} disponibles
                </span>
              </div>

              {diagnosticStudies.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center font-mono text-xs text-slate-400">
                  Usa el buscador para solicitar cualquier análisis o estudio radiológico.
                </div>
              ) : (
                diagnosticStudies.map((study) => {
                  const requested = isStudyRequested(study);
                  const isExpanded = expandedStudies.includes(study.id) || requested;
                  const studyLog = getStudyLog(study);

                  const isImage = study.tipo === 'imagen';
                  const isValues = study.tipo === 'valores';

                  return (
                    <div
                      key={study.id}
                      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                        requested
                          ? 'bg-slate-950/90 border-cyan-500/40 shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {/* Accordion Header */}
                      <div
                        onClick={() => toggleStudyExpand(study.id)}
                        className="p-3 flex items-center justify-between gap-3 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              requested
                                ? 'bg-cyan-950 border border-cyan-600/60 text-cyan-300'
                                : 'bg-slate-900 border border-slate-800 text-slate-400'
                            }`}
                          >
                            {isImage ? (
                              <ImageIcon className="w-3.5 h-3.5" />
                            ) : isValues ? (
                              <TestTube className="w-3.5 h-3.5" />
                            ) : (
                              <FileText className="w-3.5 h-3.5" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-xs font-semibold text-slate-200 truncate">
                              {study.titulo}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                              <span>{study.department}</span>
                              <span>·</span>
                              <span>+{study.tiempo_espera_min}m</span>
                              <span>·</span>
                              <span>-{study.costo_puntos} pts</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {requested ? (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/80 border border-emerald-700/60 text-emerald-300">
                              <Check className="w-3 h-3" /> Entregado
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExecuteOrder(study.titulo);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors shadow-xs"
                            >
                              Solicitar
                            </button>
                          )}
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </div>

                      {/* Accordion Expandable Result Body */}
                      {isExpanded && (
                        <div className="p-3 pt-0 border-t border-slate-800/80 bg-slate-900/40 text-xs font-mono space-y-2.5">
                          <div className="text-slate-300 leading-relaxed pt-2">
                            {studyLog ? (
                              studyLog.responseText.replace(/\*/g, '')
                            ) : study.reporte ? (
                              study.reporte.replace(/\*/g, '')
                            ) : (
                              <span className="text-slate-500 italic">
                                Haga clic en 'Solicitar' para enviar la orden y obtener el informe detallado de este estudio.
                              </span>
                            )}
                          </div>

                          {/* Structured Laboratory Values Table */}
                          {(studyLog?.valores || study.valores) && (
                            <div className="p-2 bg-slate-950/90 border border-slate-800 rounded-lg space-y-1 font-mono text-xs">
                              {Object.entries(studyLog?.valores || study.valores || {}).map(([k, v]) => (
                                <div
                                  key={k}
                                  className="flex justify-between items-center py-0.5 border-b border-slate-800/50 last:border-0"
                                >
                                  <span className="text-slate-400">{k}:</span>
                                  <span className="text-cyan-300 font-semibold">{v}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Direct action viewer button */}
                          {isImage && (
                            <div className="pt-2 flex justify-end">
                              <button
                                type="button"
                                onClick={() => {
                                  if (study.id.includes('ecg')) onOpenEcg();
                                  else onOpenRadiology();
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors shadow"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>
                                  Abrir Visor {study.id.includes('ecg') ? 'ECG 12 Derivaciones' : 'Radiológico'}
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            PESTAÑA 2: 💊 TRATAMIENTO
            (Indicación de fármacos/medidas terapéuticas)
           ======================================================== */}
        {activeTab === 'tratamiento' && (
          <div className="space-y-3">
            {/* Quick Treatment Protocols Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              <span className="text-[10px] font-mono text-slate-500 shrink-0">Protocolos:</span>
              {[
                'Oxigenoterapia',
                'Aspirina 300mg',
                'Ticagrelor 180mg',
                'Morfina IV',
                'Ceftriaxona + Azitromicina',
                'rtPA Alteplasa',
                'Omeprazol 80mg',
                'Expansión Cristaloides',
                'Código Infarto',
                'Código Ictus',
              ].map((treat, tIdx) => (
                <button
                  key={tIdx}
                  type="button"
                  onClick={() => handleExecuteOrder(treat)}
                  className="px-2 py-0.5 text-[11px] font-mono whitespace-nowrap rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                >
                  {treat}
                </button>
              ))}
            </div>

            {/* Prescriptions & Suggested Therapies List */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Indicaciones Terapéuticas y Farmacología</span>
                <span className="text-slate-500 font-normal">
                  {treatmentOrders.length} en guía
                </span>
              </div>

              {treatmentOrders.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center font-mono text-xs text-slate-400 space-y-2">
                  <Pill className="w-6 h-6 text-slate-500 mx-auto" />
                  <p>Escribe en el campo inferior cualquier fármaco, dosis o medida que desees administrar al paciente.</p>
                </div>
              ) : (
                treatmentOrders.map((t) => {
                  const isAdministered = logs.some((l) =>
                    t.keywords.some((kw) => l.orderText.toLowerCase().includes(kw.toLowerCase()))
                  );

                  return (
                    <div
                      key={t.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                        isAdministered
                          ? 'bg-emerald-950/20 border-emerald-800/60'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="min-w-0 flex items-start gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isAdministered
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                              : 'bg-slate-900 text-cyan-400 border border-slate-800'
                          }`}
                        >
                          <Syringe className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-slate-200 truncate">
                            {t.titulo}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                            <span>{t.department}</span>
                            <span>·</span>
                            <span>{t.tiempo_espera_min} min</span>
                            <span>·</span>
                            <span>-{t.costo_puntos} pts</span>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isAdministered ? (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/80 border border-emerald-700/60 text-emerald-300">
                            <Check className="w-3 h-3" /> Aplicado
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleExecuteOrder(t.titulo)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs transition-colors shadow-xs"
                          >
                            Administrar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            PESTAÑA 3: 🩺 REGISTRO DE ENFERMERÍA
            (Historial de eventos y respuestas del sistema)
           ======================================================== */}
        {activeTab === 'enfermeria' && (
          <div className="space-y-3">
            <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Historial Cronológico de Órdenes y Eventos</span>
              <span className="text-slate-500 font-normal">
                {logs.length} eventos registrados
              </span>
            </div>

            {logs.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-mono text-xs space-y-2">
                <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="text-slate-300 font-medium">Registro Vacío</div>
                <p className="max-w-xs mx-auto text-[11px] text-slate-500">
                  Aún no se han emitido órdenes. Solicita estudios en la Pestaña 1 o administra fármacos en la Pestaña 2.
                </p>
              </div>
            ) : (
              logs.map((log) => {
                const isRejected = log.tipo === 'rechazado';
                const isTreatment = log.tipo === 'tratamiento';
                const isImage = log.tipo === 'imagen';
                const isValues = log.tipo === 'valores';

                return (
                  <div key={log.id} className="space-y-1 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span className="text-cyan-400 font-bold">Orden:</span>
                      <span className="text-slate-200 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {log.orderText}
                      </span>
                      <span className="text-slate-500 ml-auto">
                        -{log.cost} pts · +{log.waitTimeMin}m
                      </span>
                    </div>

                    <div
                      className={`p-3 rounded-xl border text-xs leading-relaxed shadow-xs ${
                        isRejected
                          ? 'bg-rose-950/25 border-rose-800/60 text-rose-200'
                          : isTreatment
                          ? 'bg-emerald-950/20 border-emerald-800/60 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono pb-1 mb-1 border-b border-slate-800/80">
                        <span className="font-semibold flex items-center gap-1.5">
                          {isRejected && <XCircle className="w-3 h-3 text-rose-400 shrink-0" />}
                          {isTreatment && <Pill className="w-3 h-3 text-emerald-400 shrink-0" />}
                          {isImage && <ImageIcon className="w-3 h-3 text-purple-400 shrink-0" />}
                          {isValues && <TestTube className="w-3 h-3 text-cyan-400 shrink-0" />}
                          <span>[{log.timestamp}] {log.department}:</span>
                        </span>
                        <span className="text-slate-500">
                          {isRejected ? 'DENEGADO' : 'COMPLETADO'}
                        </span>
                      </div>

                      <div className="font-mono text-xs text-slate-300">
                        {log.responseText.replace(/\*/g, '')}
                      </div>

                      {log.valores && (
                        <div className="mt-2 p-2 bg-slate-900 border border-slate-800 rounded-lg space-y-0.5 font-mono text-xs">
                          {Object.entries(log.valores).map(([k, v]) => (
                            <div key={k} className="flex justify-between py-0.5 border-b border-slate-800/40 last:border-0">
                              <span className="text-slate-400">{k}:</span>
                              <span className="text-cyan-300 font-semibold">{v}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {isImage && (
                        <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              if (log.imageType === 'ecg') onOpenEcg();
                              else onOpenRadiology();
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Abrir Visor</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={logEndRef} />
          </div>
        )}
      </div>

      {/* INPUT FORM WITH AUTOCOMPLETE (BOTTOM OF ACTION PANEL) */}
      <form onSubmit={handleSubmit} className="p-2.5 sm:p-3 bg-slate-950 border-t border-slate-800 relative">
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute bottom-full left-3 right-3 mb-1 bg-slate-900 border border-cyan-500/50 rounded-xl shadow-2xl overflow-hidden z-20 font-mono text-xs divide-y divide-slate-800">
            {suggestions.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(sug)}
                className="w-full px-3 py-2 text-left hover:bg-slate-800 text-slate-200 flex items-center justify-between transition-colors"
              >
                <span>{sug}</span>
                <span className="text-[10px] text-cyan-400">Autocompletar ↵</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onFocus={() => {
                if (inputText.trim().length >= 2 && suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              placeholder={
                activeTab === 'tratamiento'
                  ? 'Indicar fármaco o medida (ej. "Aspirina 300mg", "Oxígeno", "Omeprazol")...'
                  : 'Solicitar estudio o lab (ej. "Troponinas", "ECG", "TAC", "Rx")...'
              }
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-3 pr-7 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
            {inputText && (
              <button
                type="button"
                onClick={() => {
                  setInputText('');
                  setShowSuggestions(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:pointer-events-none shadow"
          >
            <span>{activeTab === 'tratamiento' ? 'Indicar' : 'Solicitar'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
