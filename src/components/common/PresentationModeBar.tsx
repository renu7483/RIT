import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MonitorPlay, 
  X 
} from 'lucide-react';

export const PresentationModeBar: React.FC = () => {
  const { 
    presentationMode, 
    setPresentationMode, 
    currentScenarioId, 
    switchScenario,
    activeTab,
    setActiveTab,
    openEvidenceForFinding,
    openEvidenceForComparison
  } = useApp();

  if (!presentationMode) return null;

  const steps = [
    {
      num: 1,
      title: 'Load Scenario B',
      action: () => {
        switchScenario('scenario-b');
        setActiveTab('comparison');
      },
      isActive: currentScenarioId === 'scenario-b' && activeTab === 'intake'
    },
    {
      num: 2,
      title: 'Compare Intake (120 vs 180)',
      action: () => {
        if (currentScenarioId !== 'scenario-b') switchScenario('scenario-b');
        setActiveTab('comparison');
      },
      isActive: activeTab === 'comparison'
    },
    {
      num: 3,
      title: 'Open Intake Evidence',
      action: () => {
        openEvidenceForComparison('approvedIntake');
      },
      isActive: false
    },
    {
      num: 4,
      title: 'Inspect Rule DEMO-R003',
      action: () => {
        setActiveTab('rules');
      },
      isActive: activeTab === 'rules'
    },
    {
      num: 5,
      title: 'View Evidence Findings',
      action: () => {
        setActiveTab('findings');
        openEvidenceForFinding('PRM-F-001');
      },
      isActive: activeTab === 'findings'
    },
    {
      num: 6,
      title: 'Officer Review & Correction',
      action: () => {
        setActiveTab('officer-review');
      },
      isActive: activeTab === 'officer-review'
    },
    {
      num: 7,
      title: 'Audit Trail & PDF Report',
      action: () => {
        setActiveTab('audit-report');
      },
      isActive: activeTab === 'audit-report'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-pramaan-950 via-slate-900 to-pramaan-950 text-white px-4 py-2 border-b border-amber-500/40 shadow-lg flex flex-wrap items-center justify-between gap-3 text-xs z-40 sticky top-0">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider">
          <MonitorPlay className="w-3.5 h-3.5" />
          Presentation Mode
        </div>
        <span className="text-slate-300 hidden xl:inline text-[11px]">
          SIH 2026 Walkthrough Track:
        </span>
      </div>

      {/* Guided Walkthrough Step Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
        {steps.map((s, idx) => (
          <button
            key={s.num}
            onClick={s.action}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] whitespace-nowrap transition-all ${
              s.isActive 
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
              s.isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-700 text-slate-300'
            }`}>
              {s.num}
            </span>
            <span>{s.title}</span>
            {idx < steps.length - 1 && (
              <span className="text-slate-600 ml-0.5">›</span>
            )}
          </button>
        ))}
      </div>

      {/* Exit Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPresentationMode(false)}
          className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-600 text-xs transition-colors"
          title="Exit presentation mode"
        >
          <X className="w-3.5 h-3.5" />
          <span>Exit</span>
        </button>
      </div>
    </div>
  );
};
