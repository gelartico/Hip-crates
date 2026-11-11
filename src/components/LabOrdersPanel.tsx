import React, { useState } from 'react';
import { ClinicalCase } from '../types/clinical';
import { Activity, TestTube, FileText, Image as ImageIcon, Search, ArrowUpRight } from 'lucide-react';

interface LabOrdersPanelProps {
  clinicalCase: ClinicalCase;
  onRequestTest: (testName: string) => void;
  onOpenEcgModal: () => void;
}

export const LabOrdersPanel: React.FC<LabOrdersPanelProps> = ({
  clinicalCase,
  onRequestTest,
  onOpenEcgModal,
}) => {
  const [customTestQuery, setCustomTestQuery] = useState('');
  const [revealedStudies, setRevealedStudies] = useState<string[]>(['ecg']);

  const toggleStudy = (key: string, name: string) => {
    if (!revealedStudies.includes(key)) {
      setRevealedStudies([...revealedStudies, key]);
      onRequestTest(`Solicito ${name}`);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTestQuery.trim()) return;
    onRequestTest(`Solicito ${customTestQuery.trim()}`);
    setCustomTestQuery('');
  };

  return (
    <div className="space-y-4">
      {/* Search or order custom test input */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 sm:p-4 shadow-md">
        <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-cyan-400" /> Solicitud Abierta de Estudios Complementarios
        </h4>
        <form onSubmit={handleCustomSubmit} className="flex gap-2">
          <input
            type="text"
            value={customTestQuery}
            onChange={(e) => setCustomTestQuery(e.target.value)}
            placeholder="Escribe cualquier estudio (ej. Ecocardiograma, TAC torácico, Sedimento de orina)..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
          />
          <button
            type="submit"
            disabled={!customTestQuery.trim()}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs sm:text-sm transition-colors disabled:opacity-40"
          >
            Solicitar
          </button>
        </form>
        <p className="text-[11px] font-mono text-slate-500 mt-1.5">
          Regla 4: Si pides un estudio contemplado se entrega el resultado exacto; si no, resulta dentro de límites normales.
        </p>
      </div>

      {/* Case-specific orders from clinicalCase.ordenes_disponibles */}
      {clinicalCase.ordenes_disponibles?.estudios && clinicalCase.ordenes_disponibles.estudios.length > 0 && (
        <div className="bg-slate-900 border border-amber-500/20 rounded-xl p-3.5 sm:p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Estudios Específicos Disponibles ({clinicalCase.patientName || 'Hipócrates'})
            </h4>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
              {clinicalCase.ordenes_disponibles.estudios.length} estudios en catálogo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {clinicalCase.ordenes_disponibles.estudios.map((study) => {
              const isRevealed = revealedStudies.includes(study.id);
              return (
                <div
                  key={study.id}
                  className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-lg p-3 flex flex-col justify-between transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="text-xs font-semibold text-slate-200">{study.titulo}</h5>
                      <span className="text-[10px] font-mono text-slate-400">{study.department} · {study.tiempo_espera_min} min</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleStudy(study.id, study.titulo)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors shrink-0 ${
                        isRevealed
                          ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
                          : 'bg-cyan-700/80 hover:bg-cyan-600 text-white shadow-sm'
                      }`}
                    >
                      {isRevealed ? 'Solicitado' : 'Solicitar'}
                    </button>
                  </div>
                  {isRevealed && (
                    <div className="mt-2 pt-2 border-t border-slate-800/70 text-[11px] font-mono text-slate-300 leading-snug">
                      {study.reporte}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid of Standard Emergency Studies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* 1. ECG de 12 Derivaciones */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-sm font-semibold text-slate-200">Electrocardiograma 12D</h5>
                <span className="text-[11px] font-mono text-slate-400">Prioridad máxima en dolor torácico</span>
              </div>
            </div>
            <button
              onClick={onOpenEcgModal}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-700 text-rose-300 text-xs font-medium transition-colors"
            >
              <span>Ver Trazado</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="mt-3 p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-rose-300 leading-relaxed">
            {clinicalCase.complementaryStudies.ecg.summary}
          </div>
        </div>

        {/* 2. Troponinas Ultrasensibles */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <TestTube className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-sm font-semibold text-slate-200">Troponina I Ultrasensible</h5>
                <span className="text-[11px] font-mono text-slate-400">Marcador de necrosis miocárdica</span>
              </div>
            </div>
            <button
              onClick={() => toggleStudy('troponins', 'Troponina I ultrasensible')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                revealedStudies.includes('troponins')
                  ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {revealedStudies.includes('troponins') ? 'Obtenido' : 'Solicitar'}
            </button>
          </div>

          <div className="mt-3 p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
            {revealedStudies.includes('troponins') ? (
              clinicalCase.complementaryStudies.troponins.replace(/\*/g, '')
            ) : (
              <span className="text-slate-500 italic">Haz clic en "Solicitar" para procesar muestra sérica urgente...</span>
            )}
          </div>
        </div>

        {/* 3. CPK y CK-MB */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <TestTube className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-sm font-semibold text-slate-200">Enzimas CPK / CK-MB</h5>
                <span className="text-[11px] font-mono text-slate-400">Cinética enzimática de necrosis</span>
              </div>
            </div>
            <button
              onClick={() => toggleStudy('cpk', 'Enzimas CPK y CK-MB')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                revealedStudies.includes('cpk')
                  ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {revealedStudies.includes('cpk') ? 'Obtenido' : 'Solicitar'}
            </button>
          </div>

          <div className="mt-3 p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
            {revealedStudies.includes('cpk') ? (
              clinicalCase.complementaryStudies.cpkCkmb.replace(/\*/g, '')
            ) : (
              <span className="text-slate-500 italic">Haz clic para solicitar panel enzimático...</span>
            )}
          </div>
        </div>

        {/* 4. Hemograma Completo */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-sm font-semibold text-slate-200">Hemograma de Urgencias</h5>
                <span className="text-[11px] font-mono text-slate-400">Hb, Leucocitos, Plaquetas</span>
              </div>
            </div>
            <button
              onClick={() => toggleStudy('hemogram', 'Hemograma de urgencias')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                revealedStudies.includes('hemogram')
                  ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {revealedStudies.includes('hemogram') ? 'Obtenido' : 'Solicitar'}
            </button>
          </div>

          <div className="mt-3 p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
            {revealedStudies.includes('hemogram') ? (
              clinicalCase.complementaryStudies.hemogram.replace(/\*/g, '')
            ) : (
              <span className="text-slate-500 italic">Haz clic para solicitar hemograma...</span>
            )}
          </div>
        </div>

        {/* 5. Bioquímica e Iones */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <TestTube className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-sm font-semibold text-slate-200">Bioquímica, Glucosa y Función Renal</h5>
                <span className="text-[11px] font-mono text-slate-400">Creatinina, Urea, Na, K</span>
              </div>
            </div>
            <button
              onClick={() => toggleStudy('biochem', 'Bioquímica y función renal')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                revealedStudies.includes('biochem')
                  ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {revealedStudies.includes('biochem') ? 'Obtenido' : 'Solicitar'}
            </button>
          </div>

          <div className="mt-3 p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
            {revealedStudies.includes('biochem') ? (
              clinicalCase.complementaryStudies.biochemistry.replace(/\*/g, '')
            ) : (
              <span className="text-slate-500 italic">Haz clic para solicitar bioquímica...</span>
            )}
          </div>
        </div>

        {/* 6. Radiografía de Tórax Portátil */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-sm font-semibold text-slate-200">Radiografía de Tórax (Rx AP)</h5>
                <span className="text-[11px] font-mono text-slate-400">Descartar congestión o ensanchamiento</span>
              </div>
            </div>
            <button
              onClick={() => toggleStudy('xray', 'Radiografía de tórax')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                revealedStudies.includes('xray')
                  ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {revealedStudies.includes('xray') ? 'Obtenido' : 'Solicitar'}
            </button>
          </div>

          <div className="mt-3 p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
            {revealedStudies.includes('xray') ? (
              clinicalCase.complementaryStudies.chestXray.replace(/\*/g, '')
            ) : (
              <span className="text-slate-500 italic">Haz clic para solicitar placa de tórax portátil...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
