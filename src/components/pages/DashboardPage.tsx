import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  AlertTriangle, 
  FileX, 
  GitCompare, 
  ArrowRight, 
  Clock
} from 'lucide-react';
import type { ScenarioId } from '../../types';

export const DashboardPage: React.FC = () => {
  const { 
    metrics, 
    application, 
    currentScenarioId, 
    switchScenario, 
    setActiveTab,
    auditEvents,
    findings,
    openEvidenceForFinding
  } = useApp();

  const demoApplicationsList = [
    {
      id: 'PRM-2026-014',
      name: 'ABC Institute of Technology — Demo',
      scenarioKey: 'scenario-b' as ScenarioId,
      status: 'Historical Intake Discrepancy',
      statusColor: 'bg-red-100 text-red-800 border-red-300',
      type: 'Intake Variation (120→180)',
      year: 'AY 2026-27',
      isCurrent: currentScenarioId === 'scenario-b'
    },
    {
      id: 'PRM-2026-008',
      name: 'Vidyapeeth Inst. of Engineering — Demo',
      scenarioKey: 'scenario-a' as ScenarioId,
      status: 'Ready for Review (Clean)',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      type: 'Extension of Approval',
      year: 'AY 2026-27',
      isCurrent: currentScenarioId === 'scenario-a'
    },
    {
      id: 'PRM-2026-031',
      name: 'Apex Global Polytechnic — Demo',
      scenarioKey: 'scenario-c' as ScenarioId,
      status: 'Missing Statutory Document',
      statusColor: 'bg-red-100 text-red-800 border-red-300',
      type: 'Extension of Approval',
      year: 'AY 2026-27',
      isCurrent: currentScenarioId === 'scenario-c'
    },
    {
      id: 'PRM-2026-052',
      name: 'National Inst. of Science — Demo',
      scenarioKey: 'scenario-d' as ScenarioId,
      status: 'Expired Fire Certificate',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
      type: 'Routine EoA Renewal',
      year: 'AY 2026-27',
      isCurrent: currentScenarioId === 'scenario-d'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner: SIH Mission & Active Record */}
      <div className="bg-gradient-to-r from-pramaan-900 via-pramaan-800 to-slate-900 rounded-xl p-5 text-white shadow-sm border border-pramaan-700/60 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-teal-500/20 text-teal-300 border border-teal-400/30 rounded">
                Smart India Hackathon 2026 • SIH26261
              </span>
              <span className="text-xs text-slate-300">
                AICTE Regulatory Compliance & Institutional Verification
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Institutional Application Validation Command Center
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Evaluating current application <strong className="text-white">{application.id}</strong> ({application.institutionName}) against sanctioned baselines and 5 deterministic regulatory rules.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => setActiveTab('intake')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-600 transition-colors"
            >
              Application Intake
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-pramaan-950 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <span>Start Validation Flow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid - All dynamically calculated from current data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Cohort Applications */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Cohort Demo Applications</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{metrics.totalApplications}</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Illustrative sample records</p>
          </div>
          <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Applications Requiring Review */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Requires Officer Review</p>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">{metrics.requireReviewCount}</h3>
            <p className="text-[11px] text-amber-700 mt-0.5">Discrepancies / pending sign-off</p>
          </div>
          <div className="w-11 h-11 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Detected Baseline Discrepancies */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Baseline Discrepancies</p>
            <h3 className="text-2xl font-bold text-red-600 mt-1">{metrics.discrepancyCount}</h3>
            <p className="text-[11px] text-red-600 mt-0.5">Intake delta vs historical sanction</p>
          </div>
          <div className="w-11 h-11 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
            <GitCompare className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Missing or Expired Documents */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Missing / Expired Docs</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{metrics.missingOrExpiredDocsCount}</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Statutory checklist alerts</p>
          </div>
          <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
            <FileX className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column (Cohort & Scenarios) + Right Column (Status Chart & Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 spans): Interactive Cohort Scenarios Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Select Demonstration Cohort Application
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any scenario to immediately update the full pipeline, comparison table, rules, and findings.
                </p>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                4 Scenarios
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {demoApplicationsList.map((app) => (
                <div
                  key={app.id}
                  onClick={() => switchScenario(app.scenarioKey)}
                  className={`p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors ${
                    app.isCurrent ? 'bg-pramaan-50/70 border-l-4 border-teal-600' : ''
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{app.name}</span>
                      {app.isCurrent && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-teal-600 text-white uppercase tracking-wide">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="font-mono">{app.id}</span>
                      <span>•</span>
                      <span>{app.type}</span>
                      <span>•</span>
                      <span>{app.year}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-semibold px-2 py-1 rounded border ${app.statusColor}`}>
                      {app.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        switchScenario(app.scenarioKey);
                        setActiveTab('comparison');
                      }}
                      className="px-2.5 py-1 text-xs font-medium text-pramaan-700 hover:text-pramaan-900 hover:bg-pramaan-100/60 rounded flex items-center gap-1 transition-colors"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <span>* Fictional institutions designed to demonstrate specific regulatory edge-cases.</span>
              <button
                onClick={() => setActiveTab('intake')}
                className="text-pramaan-700 font-semibold hover:underline"
              >
                Upload Custom Application PDF ›
              </button>
            </div>
          </div>

          {/* Quick Discrepancy Spotlight Card */}
          <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200 text-xs text-amber-900">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-800 flex-shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-amber-950">
                  Current Spotlight Finding: {findings[0]?.category || 'Application Verification'}
                </h4>
                <p className="text-amber-800 leading-relaxed">
                  {findings[0]?.summary || 'Review baseline comparison to identify discrepancies.'}
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => openEvidenceForFinding(findings[0]?.id)}
                    className="font-bold text-amber-950 underline hover:text-amber-800 flex items-center gap-1"
                  >
                    <span>Inspect Supporting Evidence Drawer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-amber-600">|</span>
                  <button
                    onClick={() => setActiveTab('comparison')}
                    className="font-medium text-amber-900 hover:underline"
                  >
                    Open Side-by-Side Comparison
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 span): Validation Status Chart & Recent Audit Events */}
        <div className="space-y-4">
          
          {/* Validation Status Breakdown */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Regulatory Rules Breakdown
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">5 Rules</span>
            </div>

            {/* Visual Bar representation */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span>
                  Passed Rules
                </span>
                <span className="font-semibold text-slate-900">{metrics.passedRulesCount}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-2 rounded-full" 
                  style={{ width: `${(metrics.passedRulesCount / 5) * 100}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs pt-1">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block"></span>
                  Manual Review / Warnings
                </span>
                <span className="font-semibold text-amber-700">{metrics.warningRulesCount}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-amber-500 h-2 rounded-full" 
                  style={{ width: `${(metrics.warningRulesCount / 5) * 100}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs pt-1">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block"></span>
                  Statutory Rule Failures
                </span>
                <span className="font-semibold text-red-700">{metrics.failedRulesCount}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${(metrics.failedRulesCount / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('rules')}
              className="w-full mt-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium text-center transition-colors"
            >
              Open Regulatory Rules Engine ›
            </button>
          </div>

          {/* Recent Audit Activity Panel */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Audit Trail Feed
              </h3>
              <span className="text-[10px] text-slate-400">Demo Log</span>
            </div>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {auditEvents.slice(0, 4).map((event) => (
                <div key={event.id} className="text-xs border-l-2 border-slate-300 pl-2.5 py-0.5 space-y-0.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono">{event.timestamp}</span>
                    <span className="font-medium text-slate-600 truncate max-w-[100px]">{event.actor}</span>
                  </div>
                  <p className="font-medium text-slate-800 text-[11px] leading-tight">
                    {event.action}
                  </p>
                  {event.officerComment && (
                    <p className="text-[10px] text-slate-500 italic truncate">
                      "{event.officerComment}"
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('audit-report')}
              className="w-full py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded text-xs font-medium text-center transition-colors"
            >
              View Full Audit Trail & PDF Report ›
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
