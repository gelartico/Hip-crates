import React from 'react';
import { MessageSquare, Activity, Syringe } from 'lucide-react';

export type MobileTab = 'chat' | 'vitals' | 'orders';

export interface BottomTabsProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  logsCount?: number;
  hasAbnormalVitals?: boolean;
}

export const BottomTabs: React.FC<BottomTabsProps> = ({
  activeTab,
  onTabChange,
  logsCount = 0,
  hasAbnormalVitals = false,
}) => {
  const tabs = [
    {
      id: 'chat' as MobileTab,
      label: 'Chat',
      sublabel: 'Anamnesis',
      icon: MessageSquare,
      hasDot: false,
      badgeCount: null,
    },
    {
      id: 'vitals' as MobileTab,
      label: 'Vitales',
      sublabel: 'Constantes',
      icon: Activity,
      hasDot: hasAbnormalVitals,
      badgeCount: null,
    },
    {
      id: 'orders' as MobileTab,
      label: 'Órdenes',
      sublabel: 'Sin teclado',
      icon: Syringe,
      hasDot: false,
      badgeCount: logsCount > 0 ? logsCount : null,
    },
  ];

  return (
    <nav
      aria-label="Barra de navegación táctil inferior"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#090d16]/95 backdrop-blur-2xl border-t border-white/10 pb-safe pt-1.5 px-3 shadow-[0_-10px_35px_rgba(0,0,0,0.7)] select-none"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative min-h-[48px] py-1 px-2 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 active:scale-95 touch-manipulation cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-b from-cyan-500/20 to-cyan-500/5 text-cyan-300 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'
              }`}
            >
              {/* Pulsing Alert Dot for Abnormal Vitals */}
              {tab.hasDot && (
                <span className="absolute top-1.5 right-4 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                </span>
              )}

              {/* Counter Badge for Hospital Orders / Labs */}
              {tab.badgeCount !== null && (
                <span className="absolute top-1 right-3 px-1.5 py-0.2 rounded-full bg-cyan-950 text-[10px] font-mono font-bold text-cyan-300 border border-cyan-700/60 shadow-xs">
                  {tab.badgeCount}
                </span>
              )}

              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110 text-cyan-400' : 'text-slate-400'
                }`}
              />

              <div className="flex items-center gap-1 mt-0.5">
                <span
                  className={`text-[11px] font-mono tracking-tight leading-none ${
                    isActive ? 'text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  {tab.label}
                </span>
              </div>

              {/* Active Bottom Glow Pill Indicator */}
              {isActive && (
                <span className="absolute bottom-1 w-7 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.9)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
