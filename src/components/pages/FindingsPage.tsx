import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Scale, 
  Filter, 
  GitCompare, 
  UserCheck, 
  ChevronRight
} from 'lucide-react';
import type { Severity } from '../../types';

export const FindingsPage: React.FC = () => {
  const { 
    findings, 
    selectedFindingId, 
    setSelectedFindingId, 
    rules, 
    setActiveTab,
    openEvidenceForComparison
  } = useApp();

  const [severityFilter, setSeverityFilter] = useState<string>('ALL');

  const filteredFindings = findings.filter(f => {
    if (severityFilter === 'ALL') return true;
    if (severityFilter === 'PENDING') return f.reviewStatus === 'PENDING';
    return f.severity === severityFilter;
  });

  const selectedFinding = findings.find(f => f.id === selectedFindingId) || findings[0];
  const relatedRule = rules.find(r => r.ruleId === selectedFinding?.relatedRuleId);

  const getSeverityBadge = (sev: Severity) => {
    switch (sev) {
      case 'CRITICAL':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-300">CRITICAL</span>;
      case 'WARNING':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">WARNING</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">INFO</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Screen 6 • Core Explainability</span>
            <span className="px-2 py-0.2 text-[10px] bg-slate-200 text-slate-700 rounded font-mono">
              {findings.length} Discrepancy Findings
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Evidence-Linked Findings & Audit Trail Traceability
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Every detected anomaly is connected to historical baseline records, configured regulatory rules, and specific source document passages.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('officer-review')}
          className="px-3.5 py-2 bg-pramaan-700 hover:bg-pramaan-800 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
        >
          <UserCheck className="w-4 h-4" />
          <span>Record Officer Decision</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs border-b border-slate-200 pb-2 overflow-x-auto">
        <span className="text-slate-400 font-medium flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        <button
          onClick={() => setSeverityFilter('ALL')}
          className={`px-3 py-1 rounded-md font-medium transition-colors ${
            severityFilter === 'ALL' ? 'bg-pramaan-800 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          All ({findings.length})
        </button>
        <button
          onClick={() => setSeverityFilter('CRITICAL')}
          className={`px-3 py-1 rounded-md font-medium transition-colors ${
            severityFilter === 'CRITICAL' ? 'bg-red-700 text-white font-bold' : 'bg-red-50 text-red-700 hover:bg-red-100'
          }`}
        >
          Critical ({findings.filter(f => f.severity === 'CRITICAL').length})
        </button>
        <button
          onClick={() => setSeverityFilter('WARNING')}
          className={`px-3 py-1 rounded-md font-medium transition-colors ${
            severityFilter === 'WARNING' ? 'bg-amber-600 text-white font-bold' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
          }`}
        >
          Warnings ({findings.filter(f => f.severity === 'WARNING').length})
        </button>
        <button
          onClick={() => setSeverityFilter('PENDING')}
          className={`px-3 py-1 rounded-md font-medium transition-colors ${
            severityFilter === 'PENDING' ? 'bg-teal-700 text-white font-bold' : 'bg-teal-50 text-teal-800 hover:bg-teal-100'
          }`}
        >
          Pending Review ({findings.filter(f => f.reviewStatus === 'PENDING').length})
        </button>
      </div>

      {/* 2-Column Split Workspace: Findings List Left (40%) | Evidence Detail Right (60%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 spans): Findings List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredFindings.map((f) => {
            const isSelected = f.id === selectedFinding?.id;

            return (
              <div
                key={f.id}
                onClick={() => setSelectedFindingId(f.id)}
                className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-pramaan-600 bg-white ring-2 ring-pramaan-400 shadow-md' 
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-pramaan-800">{f.id}</span>
                    {getSeverityBadge(f.severity)}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {f.relatedRuleId || 'Rule N/A'}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-xs mb-1">
                  {f.category}: {f.fieldName}
                </h4>

                <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                  {f.summary}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="truncate max-w-[180px]">
                    Source: {f.sourceDocument}
                  </span>
                  <div className="flex items-center gap-1 text-teal-700 font-semibold">
                    <span>Inspect</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (7 spans): Rich Interactive Evidence Details Panel */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5 sticky top-24">
          
          {/* Header of Detail View */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-teal-700">{selectedFinding?.id}</span>
                {selectedFinding && getSeverityBadge(selectedFinding.severity)}
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                  Review Status: {selectedFinding?.reviewStatus}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {selectedFinding?.category} — {selectedFinding?.fieldName}
              </h3>
            </div>

            <button
              onClick={() => {
                if (selectedFinding?.fieldName.toLowerCase().includes('intake')) {
                  openEvidenceForComparison('approvedIntake');
                } else {
                  setActiveTab('comparison');
                }
              }}
              className="px-2.5 py-1 text-xs font-medium rounded border border-slate-300 hover:bg-slate-100 text-slate-700 flex items-center gap-1 transition-colors"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Comparison View</span>
            </button>
          </div>

          {/* Finding Summary Banner */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Issue Summary
            </span>
            <p className="font-medium text-slate-900 text-xs leading-relaxed">
              {selectedFinding?.summary}
            </p>
          </div>

          {/* Value Discrepancy Box */}
          {(selectedFinding?.previousValue !== undefined || selectedFinding?.currentValue !== undefined) && (
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Historical Record Value
                </span>
                <span className="text-[11px] text-slate-400 block mb-0.5">Approved Sanction PRM-2025</span>
                <span className="font-mono font-bold text-slate-800 text-sm">
                  {String(selectedFinding?.previousValue ?? 'Not Available')}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                  Current Application Value
                </span>
                <span className="text-[11px] text-amber-600 block mb-0.5">Self-Declared AY 2026-27</span>
                <span className="font-mono font-bold text-amber-900 text-sm bg-amber-100 px-1.5 py-0.5 rounded">
                  {String(selectedFinding?.currentValue ?? 'Not Available')}
                </span>
              </div>
            </div>
          )}

          {/* Evidence Excerpt Preview Window */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-600" />
                Supporting Document & Page Proof
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {selectedFinding?.sourceDocument}
              </span>
            </div>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs border border-slate-800 shadow-inner space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[10px] text-slate-400">
                <span>FILE: {selectedFinding?.evidenceSnippet?.sourceTitle || selectedFinding?.sourceDocument}</span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-teal-300">
                  {selectedFinding?.evidenceSnippet?.pageLabel || `Page ${selectedFinding?.pageNumber || '1'}`}
                </span>
              </div>

              <div className="whitespace-pre-wrap leading-relaxed text-slate-300 text-xs bg-slate-950 p-3 rounded border border-slate-800">
                {selectedFinding?.evidenceSnippet?.excerpt}
              </div>

              {selectedFinding?.evidenceSnippet?.highlightText && (
                <div className="p-2 bg-amber-500/20 border-l-2 border-amber-400 rounded-r text-[11px] text-amber-200">
                  <span className="font-bold text-amber-300">Flagged Passage: </span>
                  "{selectedFinding.evidenceSnippet.highlightText}"
                </div>
              )}

              <div className="text-[10px] text-slate-500 text-right italic pt-1">
                * Illustrative evidence preview — strictly connected to active scenario
              </div>
            </div>
          </div>

          {/* Connected Rule & Explanation */}
          {relatedRule && (
            <div className="p-3.5 bg-teal-50/70 rounded-lg border border-teal-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-teal-950 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-teal-700" />
                  Connected Rule: {relatedRule.ruleId} ({relatedRule.title})
                </span>
                <span className="font-mono text-[10px] text-teal-800 bg-teal-100 px-1.5 py-0.5 rounded">
                  {relatedRule.ruleVersion}
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {selectedFinding?.explanation}
              </p>
              <div className="pt-1 text-[11px] text-slate-500">
                <span className="font-medium">Regulatory Ref:</span> {relatedRule.sourceLabel}
              </div>
            </div>
          )}

          {/* Recommended Officer Action */}
          <div className="p-3.5 bg-blue-50/70 rounded-lg border border-blue-200 text-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
              Recommended Officer Action
            </span>
            <p className="font-medium text-blue-950 leading-relaxed">
              {selectedFinding?.recommendedAction}
            </p>
          </div>

          {/* Extraction Confidence & Disclaimers */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
            <span>
              Extraction Confidence: <strong className="text-slate-800">{selectedFinding?.confidenceScore || 'Illustrative (98%)'}</strong>
            </span>
            <span className="text-amber-700 font-medium">
              External Issuer Verification: Not Connected
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
