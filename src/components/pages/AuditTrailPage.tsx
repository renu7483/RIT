import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Printer, 
  ShieldCheck, 
  Clock
} from 'lucide-react';

export const AuditTrailPage: React.FC = () => {
  const { 
    auditEvents, 
    application, 
    rules, 
    comparisons, 
    findings
  } = useApp();

  const [viewMode, setViewMode] = useState<'audit' | 'report'>('report');
  const [reportDate] = useState<string>(() => new Date().toLocaleDateString('en-IN'));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header (Hidden in Print) */}
      <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Screen 9 • Accountability</span>
            <span className="px-2 py-0.2 text-[10px] bg-slate-200 text-slate-700 rounded font-mono">
              SIH 2026 Audit Architecture
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Audit Trail & Printable Demonstration Report
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Chronological logging of pipeline evaluations and officer decisions with formal printable dossier.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Switch tabs */}
          <div className="bg-slate-200 p-1 rounded-lg flex items-center gap-1 text-xs font-medium">
            <button
              onClick={() => setViewMode('report')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'report' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Printable Report
            </button>
            <button
              onClick={() => setViewMode('audit')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'audit' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Audit Trail Events ({auditEvents.length})
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-pramaan-800 hover:bg-pramaan-900 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: PRINTABLE FORMAL SUMMARY REPORT */}
      {viewMode === 'report' && (
        <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6 sm:p-8 space-y-6 print-full-width print:border-none print:shadow-none">
          
          {/* Official Demonstration Header */}
          <div className="border-b-2 border-pramaan-900 pb-5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pramaan-900 flex items-center justify-center text-white">
                  <ShieldCheck className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h1 className="text-lg font-black tracking-wider text-pramaan-950 font-mono">
                    PRAMAAN VERIFICATION SUMMARY REPORT
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    Evidence-Driven Institutional Regulatory Compliance Dossier
                  </p>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="font-mono font-bold text-slate-900 block">{application.id}</span>
                <span className="text-[11px] text-slate-400">Date: {reportDate}</span>
              </div>
            </div>

            {/* Crucial Required Disclaimer */}
            <div className="bg-slate-100 p-2 rounded text-center text-xs font-bold tracking-widest text-slate-700 uppercase border border-slate-200">
              PRAMAAN — DEMONSTRATION REPORT — NOT AN OFFICIAL AICTE DOCUMENT
            </div>
          </div>

          {/* Institutional Header Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Institution Title</span>
              <span className="font-bold text-slate-900">{application.institutionName}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">AICTE Institute ID</span>
              <span className="font-mono font-semibold text-slate-800">{application.institutionCode}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Target Academic Cycle</span>
              <span className="font-semibold text-slate-800">{application.academicYear}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Scrutiny Status</span>
              <span className="font-bold text-pramaan-800">
                {application.officerDecision ? application.officerDecision.status.replace('_', ' ') : 'PENDING OFFICER REVIEW'}
              </span>
            </div>
          </div>

          {/* Section 1: Historical Baseline Comparison Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center justify-between">
              <span>1. Historical Baseline Comparison Summary</span>
              <span className="text-[11px] font-mono font-normal text-slate-500">
                Baseline: {application.previousRecord.applicationRef}
              </span>
            </h3>

            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-600 font-semibold text-[11px]">
                <tr>
                  <th className="py-2 px-3 border-b">Field</th>
                  <th className="py-2 px-3 border-b">Previous Baseline Value</th>
                  <th className="py-2 px-3 border-b">Current Applied Value</th>
                  <th className="py-2 px-3 border-b">Delta Type</th>
                  <th className="py-2 px-3 border-b">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {comparisons.map(c => (
                  <tr key={c.key} className={c.changeType !== 'MATCH' ? 'bg-amber-50/40' : ''}>
                    <td className="py-1.5 px-3 font-medium text-slate-800">{c.label}</td>
                    <td className="py-1.5 px-3 font-mono text-slate-600">{String(c.previousValue)}</td>
                    <td className="py-1.5 px-3 font-mono font-semibold text-slate-900">{String(c.currentValue)}</td>
                    <td className="py-1.5 px-3 font-medium">{c.changeType}</td>
                    <td className="py-1.5 px-3 font-semibold">{c.severity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 2: Regulatory Rule Results */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              2. Configured Regulatory Rule Validation Results (v2026.1 Rulepack)
            </h3>

            <div className="space-y-2">
              {rules.map(r => (
                <div key={r.ruleId} className="p-2.5 bg-slate-50 rounded border border-slate-200 text-xs flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-pramaan-800">{r.ruleId}</span>
                      <span className="font-semibold text-slate-900">{r.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({r.ruleVersion})</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{r.explanation}</p>
                    <div className="text-[10px] text-slate-400 italic">Source: {r.sourceLabel}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase flex-shrink-0 ${
                    r.status === 'PASS' ? 'bg-emerald-100 text-emerald-800' :
                    r.status === 'FAIL' ? 'bg-red-100 text-red-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Evidence-Linked Findings */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              3. Evidence-Linked Findings & Recommended Officer Actions
            </h3>

            <div className="space-y-2">
              {findings.map(f => (
                <div key={f.id} className="p-3 border border-slate-200 rounded-lg text-xs space-y-1.5 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-teal-800">{f.id}</span>
                      <span className="font-bold text-slate-800">{f.category}: {f.fieldName}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-slate-200 text-slate-700">
                      {f.severity}
                    </span>
                  </div>

                  <p className="text-slate-700 text-[11px] leading-relaxed">{f.explanation}</p>
                  
                  {f.evidenceSnippet && (
                    <div className="bg-slate-900 text-slate-200 p-2 rounded font-mono text-[10px]">
                      <div className="text-teal-300 font-semibold mb-0.5">Excerpt [{f.sourceDocument}]:</div>
                      <div className="whitespace-pre-wrap">{f.evidenceSnippet.excerpt}</div>
                    </div>
                  )}

                  <div className="text-blue-900 bg-blue-50/60 p-2 rounded text-[11px]">
                    <strong>Recommended Action:</strong> {f.recommendedAction}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Authorized Officer Determination */}
          <div className="p-4 bg-slate-100 rounded-lg border border-slate-300 text-xs space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              4. Authorized Officer Decision Record
            </h3>
            {application.officerDecision ? (
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Recorded Determination: <strong className="text-pramaan-900">{application.officerDecision.status}</strong></span>
                  <span className="font-mono text-slate-500">{application.officerDecision.timestamp}</span>
                </div>
                <div>Reviewing Officer: <strong>{application.officerDecision.officerName}</strong> ({application.officerDecision.officerRole})</div>
                <div className="bg-white p-2.5 rounded border border-slate-200 italic mt-1 text-slate-700">
                  "{application.officerDecision.comments}"
                </div>
              </div>
            ) : (
              <div className="text-amber-800 italic">
                Pending Scrutiny Officer Sign-off. (Proceed to Screen 8 to record decision).
              </div>
            )}
          </div>

          {/* Signatures & Limitations Footer */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <div>
              <p>* Verification Limitation: Documents marked as "Not Externally Verified".</p>
              <p>Generated by PRAMAAN Local Evaluation Suite • Smart India Hackathon 2026</p>
            </div>
            <div className="text-right">
              <div className="h-10 border-b border-dashed border-slate-400 w-48 mb-1"></div>
              <span>Authorized Scrutiny Officer Signature</span>
            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: AUDIT TRAIL LOGS */}
      {viewMode === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-pramaan-700" />
                Chronological Demonstration Audit Events
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Local demonstration state tracking pipeline operations, delta scans, and officer determinations.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-200 text-slate-700 rounded">
              {auditEvents.length} Events
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Event Timestamp</th>
                  <th className="py-2.5 px-3">Application Ref</th>
                  <th className="py-2.5 px-4">Action Executed</th>
                  <th className="py-2.5 px-3">Actor / Engine</th>
                  <th className="py-2.5 px-3">State Change</th>
                  <th className="py-2.5 px-4">Officer Comment / Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {auditEvents.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 text-slate-500 whitespace-nowrap">{e.timestamp}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{e.applicationRef}</td>
                    <td className="py-2.5 px-4 font-sans font-medium text-slate-900">{e.action}</td>
                    <td className="py-2.5 px-3 text-slate-600">{e.actor}</td>
                    <td className="py-2.5 px-3 text-teal-700 font-semibold">{e.statusChange || 'LOGGED'}</td>
                    <td className="py-2.5 px-4 font-sans text-slate-600 text-xs">
                      {e.officerComment || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 text-right">
            * Local demo audit trail stored in browser session memory.
          </div>
        </div>
      )}

    </div>
  );
};
