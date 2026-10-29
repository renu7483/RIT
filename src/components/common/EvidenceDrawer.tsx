import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  FileText, 
  AlertTriangle, 
  Scale, 
  GitCompare, 
  UserCheck
} from 'lucide-react';

export const EvidenceDrawer: React.FC = () => {
  const { 
    isEvidenceDrawerOpen, 
    closeEvidenceDrawer, 
    selectedFindingId, 
    findings, 
    rules,
    setActiveTab
  } = useApp();

  if (!isEvidenceDrawerOpen) return null;

  const finding = findings.find(f => f.id === selectedFindingId) || findings[0];
  const relatedRule = rules.find(r => r.ruleId === finding?.relatedRuleId);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end transition-opacity">
      <div 
        className="w-full max-w-2xl bg-white shadow-2xl h-full flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 bg-pramaan-900 text-white flex items-center justify-between border-b border-pramaan-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-teal-300">{finding?.id || 'PRM-F-EVIDENCE'}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                  finding?.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                  finding?.severity === 'WARNING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                }`}>
                  {finding?.severity} SEVERITY
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white mt-0.5">
                {finding?.category} — Evidence Record
              </h3>
            </div>
          </div>

          <button
            onClick={closeEvidenceDrawer}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-pramaan-800 transition-colors"
            title="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm text-slate-700">
          
          {/* Summary Banner */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Summary Finding</span>
            <p className="font-medium text-slate-900 mt-1 text-sm leading-relaxed">
              {finding?.summary}
            </p>
          </div>

          {/* Side-by-Side Comparison Box */}
          <div className="grid grid-cols-2 gap-3 bg-slate-100/70 p-3.5 rounded-lg border border-slate-200">
            <div className="bg-white p-3 rounded border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Previous Sanction Record
              </span>
              <span className="text-xs text-slate-400 block mb-1">Baseline Master Order</span>
              <div className="font-mono text-sm font-semibold text-slate-800">
                {String(finding?.previousValue ?? 'Not Applicable')}
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded border border-amber-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                Current Applied Value
              </span>
              <span className="text-xs text-amber-600/80 block mb-1">EoA 2026-27 Submission</span>
              <div className="font-mono text-sm font-bold text-amber-900">
                {String(finding?.currentValue ?? 'Not Applicable')}
              </div>
            </div>
          </div>

          {/* Primary Evidence Excerpt Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-600" />
                Supporting Document Excerpt
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Source: {finding?.sourceDocument}
              </span>
            </div>

            {/* Simulated Scanned Document Window */}
            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs shadow-inner border border-slate-800 relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-[10px] text-slate-400">
                <span>DOCUMENT PREVIEW: {finding?.evidenceSnippet?.sourceTitle || finding?.sourceDocument}</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                  {finding?.evidenceSnippet?.pageLabel || `Page ${finding?.pageNumber || '1'}`}
                </span>
              </div>

              <div className="whitespace-pre-wrap leading-relaxed text-slate-300 text-xs bg-slate-950 p-3 rounded border border-slate-800">
                {finding?.evidenceSnippet?.excerpt || 'Document verification excerpt transcript loaded.'}
              </div>

              {finding?.evidenceSnippet?.highlightText && (
                <div className="mt-2.5 p-2 bg-amber-500/20 border-l-2 border-amber-400 rounded-r text-[11px] text-amber-200">
                  <span className="font-semibold text-amber-300">Flagged Passages: </span>
                  "{finding.evidenceSnippet.highlightText}"
                </div>
              )}

              <div className="mt-2 text-[10px] text-slate-500 text-right italic">
                * Illustrative evidence preview — strictly extracted from local demonstration scenario
              </div>
            </div>
          </div>

          {/* Connected Regulatory Rule Card */}
          {relatedRule && (
            <div className="p-4 bg-teal-50/60 rounded-lg border border-teal-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-teal-900 font-semibold text-xs">
                  <Scale className="w-4 h-4 text-teal-700" />
                  <span>Connected Rule: {relatedRule.ruleId}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-medium">
                  {relatedRule.ruleVersion}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-800">
                {relatedRule.title}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {relatedRule.explanation}
              </p>
              <div className="text-[11px] text-slate-500 pt-1 border-t border-teal-200/60">
                <span className="font-medium text-slate-700">Source: </span>
                {relatedRule.sourceLabel}
              </div>
            </div>
          )}

          {/* Explanation and Recommended Officer Action */}
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Why was this flagged?
              </span>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
                {finding?.explanation}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Recommended Officer Action
              </span>
              <div className="flex items-start gap-2 p-3 bg-blue-50/60 rounded border border-blue-200 text-xs text-blue-900">
                <AlertTriangle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  {finding?.recommendedAction}
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimers & Confidence */}
          <div className="p-3 bg-slate-50 rounded text-[11px] text-slate-500 border border-slate-200 flex items-center justify-between">
            <span>Illustrative Confidence Score: <strong className="text-slate-700">{finding?.confidenceScore || '98.5%'}</strong></span>
            <span className="text-amber-700 font-medium">External Issuer Verification: Not Connected</span>
          </div>

        </div>

        {/* Drawer Action Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('comparison');
                closeEvidenceDrawer();
              }}
              className="px-3 py-1.5 text-xs font-medium rounded border border-slate-300 hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Inspect in Comparison</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('rules');
                closeEvidenceDrawer();
              }}
              className="px-3 py-1.5 text-xs font-medium rounded border border-slate-300 hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Inspect Rule</span>
            </button>
          </div>

          <button
            onClick={() => {
              setActiveTab('officer-review');
              closeEvidenceDrawer();
            }}
            className="px-3.5 py-1.5 text-xs font-semibold rounded bg-pramaan-700 hover:bg-pramaan-800 text-white flex items-center gap-1.5 shadow transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Proceed to Officer Review</span>
          </button>
        </div>
      </div>
    </div>
  );
};
