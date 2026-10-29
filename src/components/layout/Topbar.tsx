import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  RefreshCw, 
  SlidersHorizontal, 
  MonitorPlay, 
  RotateCcw,
  Presentation
} from 'lucide-react';
import type { ScenarioId } from '../../types';

export const Topbar: React.FC = () => {
  const { 
    currentScenarioId, 
    switchScenario, 
    resetDemo, 
    runValidationSimulation, 
    isValidating,
    application,
    presentationMode,
    setPresentationMode,
    activeTab,
    setActiveTab
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-pramaan-900 text-white border-b border-pramaan-800 shadow-md">
      <div className="px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4">
        
        {/* Brand mark & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-govTeal-700 flex items-center justify-center text-white shadow-inner flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-base text-white font-mono">PRAMAAN</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded">
                SIH26261
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                SIH 2026 DEMO — SAMPLE DATA
              </span>
            </div>
            <p className="text-[11px] text-slate-300 hidden md:block">
              Evidence-driven institutional application validation
            </p>
          </div>
        </div>

        {/* Current Demo Scenario Selector */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1.5 bg-pramaan-950/80 px-2.5 py-1 rounded-md border border-pramaan-700 text-xs text-slate-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-slate-400">Scenario:</span>
            <select
              value={currentScenarioId}
              onChange={(e) => switchScenario(e.target.value as ScenarioId)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="scenario-b" className="bg-pramaan-900 text-white">
                Scenario B: Historical Mismatch (Intake 120→180)
              </option>
              <option value="scenario-a" className="bg-pramaan-900 text-white">
                Scenario A: Valid Application (Fully Compliant)
              </option>
              <option value="scenario-c" className="bg-pramaan-900 text-white">
                Scenario C: Missing Required Document
              </option>
              <option value="scenario-d" className="bg-pramaan-900 text-white">
                Scenario D: Expired Supporting Document
              </option>
            </select>
          </div>

          {/* Quick Scenario Chips for Mobile/Tablet */}
          <div className="lg:hidden">
            <select
              value={currentScenarioId}
              onChange={(e) => switchScenario(e.target.value as ScenarioId)}
              className="bg-pramaan-950 text-white text-xs py-1.5 px-2 rounded border border-pramaan-700 focus:outline-none"
            >
              <option value="scenario-b">B: Intake Mismatch</option>
              <option value="scenario-a">A: Valid Application</option>
              <option value="scenario-c">C: Missing Doc</option>
              <option value="scenario-d">D: Expired Doc</option>
            </select>
          </div>

          {/* SIH Slides Deck Toggle */}
          <button
            onClick={() => setActiveTab(activeTab === 'presentation-slides' ? 'dashboard' : 'presentation-slides')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded border transition-colors ${
              activeTab === 'presentation-slides'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow'
                : 'bg-pramaan-800 hover:bg-pramaan-700 text-amber-300 border-amber-500/30'
            }`}
            title="Open SIH 2026 Presentation Slides"
          >
            <Presentation className={`w-3.5 h-3.5 ${activeTab === 'presentation-slides' ? 'text-slate-950' : 'text-amber-400'}`} />
            <span className="hidden sm:inline">{activeTab === 'presentation-slides' ? 'Return to Demo' : 'SIH Pitch Slides'}</span>
          </button>

          {/* Run Validation Action */}
          <button
            onClick={runValidationSimulation}
            disabled={isValidating}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-teal-600 hover:bg-teal-500 text-white shadow transition-colors disabled:opacity-50"
            title="Re-run validation pipeline against selected scenario"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isValidating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isValidating ? 'Validating...' : 'Run Validation'}</span>
          </button>

          {/* Presentation Mode Toggle */}
          <button
            onClick={() => setPresentationMode(!presentationMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded border transition-colors ${
              presentationMode 
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-semibold shadow' 
                : 'bg-pramaan-800 hover:bg-pramaan-700 text-slate-200 border-pramaan-700'
            }`}
            title="Toggle presentation-ready mode for 1080p screen recording"
          >
            <MonitorPlay className="w-3.5 h-3.5 text-current" />
            <span className="hidden md:inline">{presentationMode ? 'Exit Presentation' : 'Presentation Mode'}</span>
          </button>

          {/* Reset Demo State */}
          <button
            onClick={resetDemo}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-pramaan-800 rounded border border-transparent hover:border-pramaan-700 transition-colors"
            title="Reset demo data to initial baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sub-header context ribbon showing active institution & status */}
      <div className="bg-pramaan-950 px-4 lg:px-6 py-1.5 text-[11px] text-slate-400 flex flex-wrap items-center justify-between border-t border-pramaan-800/80 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Active Institution:</span>
          <span className="text-white font-medium">{application.institutionName}</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 font-mono">Ref: {application.id}</span>
          <span className="text-slate-500">|</span>
          <span className="text-teal-400 font-medium">AY: {application.academicYear}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Deterministic Local Engine
          </span>
          <span className="text-amber-400 font-medium">
            Status: {application.officerDecision ? application.officerDecision.status.replace('_', ' ') : 'PENDING OFFICER REVIEW'}
          </span>
        </div>
      </div>
    </header>
  );
};
