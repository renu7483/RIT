import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  FileText, 
  HelpCircle, 
  Layers, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { DEMO_RULES } from '../../engine/ruleEngine';
import type { RuleStatus } from '../../types';

export const RuleValidationPage: React.FC = () => {
  const { 
    rules, 
    openEvidenceForFinding, 
    setActiveTab, 
    findings 
  } = useApp();

  const [expandedRuleId, setExpandedRuleId] = useState<string | null>('DEMO-R003');

  const getStatusBadge = (status: RuleStatus) => {
    switch (status) {
      case 'PASS':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> PASS
          </span>
        );
      case 'FAIL':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            <XCircle className="w-3.5 h-3.5 text-red-600" /> FAIL / DEFICIENCY
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> WARNING
          </span>
        );
      case 'MANUAL_REVIEW':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            <HelpCircle className="w-3.5 h-3.5 text-purple-600" /> MANUAL REVIEW
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Screen 4 • Deterministic Compliance</span>
            <span className="px-2 py-0.2 text-[10px] bg-slate-200 text-slate-700 rounded font-mono">5 Active Rules</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Versioned Regulatory Rule Engine
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Rules are versioned, documented, and deterministically executed against the active application record.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('findings')}
          className="px-3.5 py-2 bg-pramaan-800 hover:bg-pramaan-900 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
        >
          <span>View Resulting Findings</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Connected 4-Step Chain Banner (Required by Section 8) */}
      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
            <Layers className="w-4 h-4 text-teal-400" />
            <span>Connected Explainability Chain: Historical Comparison ➔ Rule Engine ➔ Evidence</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">AY 2026-27 Rulepack</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          
          <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-1">
            <span className="text-[10px] font-bold text-teal-300 font-mono">1. Historical Detection</span>
            <p className="font-semibold text-slate-100 text-xs">
              Intake Shift: 120 ➔ 180 seats
            </p>
            <p className="text-[11px] text-slate-400">
              Historical baseline engine flagged +60 seat delta against baseline sanction PRM-2025.
            </p>
          </div>

          <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-1">
            <span className="text-[10px] font-bold text-amber-300 font-mono">2. Rule DEMO-R003 Triggered</span>
            <p className="font-semibold text-slate-100 text-xs">
              Threshold Requires Review
            </p>
            <p className="text-[11px] text-slate-400">
              Evaluated rule condition: intake delta != 0 triggers mandatory manual review.
            </p>
          </div>

          <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-1">
            <span className="text-[10px] font-bold text-blue-300 font-mono">3. Evidence Drawer Linked</span>
            <p className="font-semibold text-slate-100 text-xs">
              Page 3 & Sanction Order
            </p>
            <p className="text-[11px] text-slate-400">
              Extracts self-declaration excerpt and highlights lack of state expansion NOC.
            </p>
          </div>

          <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700 space-y-1">
            <span className="text-[10px] font-bold text-emerald-300 font-mono">4. Officer Action Ready</span>
            <p className="font-semibold text-slate-100 text-xs">
              Demand Certified Order
            </p>
            <p className="text-[11px] text-slate-400">
              Officer records correction requisition on the audit trail with 1 click.
            </p>
          </div>

        </div>
      </div>

      {/* Rules Accordion / Cards List */}
      <div className="space-y-4">
        {DEMO_RULES.map((rule) => {
          const evalResult = rules.find(r => r.ruleId === rule.id);
          const isExpanded = expandedRuleId === rule.id;

          return (
            <div 
              key={rule.id}
              className={`bg-white rounded-xl border transition-all ${
                evalResult?.status === 'FAIL' ? 'border-red-300 shadow-sm' :
                evalResult?.status === 'MANUAL_REVIEW' ? 'border-amber-300 shadow-sm' :
                evalResult?.status === 'WARNING' ? 'border-amber-300 shadow-sm' :
                'border-slate-200'
              }`}
            >
              {/* Header Bar */}
              <div 
                onClick={() => setExpandedRuleId(isExpanded ? null : rule.id)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pramaan-100 text-pramaan-900 flex items-center justify-center font-mono font-bold text-xs">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">{rule.id}</span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                        {rule.ruleVersion}
                      </span>
                      <span className="text-[10px] text-slate-400 hidden sm:inline">
                        AY {rule.applicableAcademicYear}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 mt-0.5">
                      {rule.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {evalResult && getStatusBadge(evalResult.status)}
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {/* Expanded Details Body */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 text-xs space-y-4">
                  
                  {/* Evaluation Result Banner */}
                  {evalResult && (
                    <div className={`p-3.5 rounded-lg border ${
                      evalResult.status === 'FAIL' ? 'bg-red-50 border-red-200 text-red-950' :
                      evalResult.status === 'MANUAL_REVIEW' ? 'bg-amber-50 border-amber-200 text-amber-950' :
                      evalResult.status === 'WARNING' ? 'bg-amber-50 border-amber-200 text-amber-950' :
                      'bg-emerald-50 border-emerald-200 text-emerald-950'
                    }`}>
                      <div className="font-bold mb-1 flex items-center gap-1.5">
                        <span>Evaluation Result:</span>
                        <span className="font-mono">{evalResult.status}</span>
                      </div>
                      <p className="leading-relaxed">
                        {evalResult.explanation}
                      </p>
                      <div className="mt-2 text-[11px] flex items-center gap-2 font-mono">
                        <span className="font-sans font-medium">Fields Evaluated:</span>
                        {evalResult.fieldsUsed.map((f, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-white/80 rounded border text-slate-800">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rule Specifications Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Rule Description & Scope
                      </span>
                      <p className="mt-1 text-slate-700 leading-relaxed">
                        {rule.description}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Evaluation Logic / Condition
                      </span>
                      <p className="mt-1 font-mono text-[11px] text-slate-800 bg-white p-2 rounded border border-slate-200">
                        {rule.conditionDescription}
                      </p>
                    </div>
                  </div>

                  {/* Source Label / Legal Reference */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <div>
                      <span className="font-medium text-slate-700">Source Mapping: </span>
                      <span className="italic">{rule.sourceLabel}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {evalResult?.status !== 'PASS' && (
                        <button
                          onClick={() => {
                            const matchFinding = findings.find(f => f.relatedRuleId === rule.id);
                            if (matchFinding) openEvidenceForFinding(matchFinding.id);
                          }}
                          className="text-pramaan-700 font-semibold hover:underline flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Inspect Evidence For This Rule</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
