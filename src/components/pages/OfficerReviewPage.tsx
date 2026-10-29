import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle, 
  History, 
  ShieldCheck,
  Scale
} from 'lucide-react';
import type { OfficerDecisionType } from '../../types';

export const OfficerReviewPage: React.FC = () => {
  const { 
    application, 
    findings, 
    rules, 
    recordOfficerDecision, 
    setActiveTab,
    openEvidenceForFinding
  } = useApp();

  const [commentText, setCommentText] = useState<string>(
    application.officerDecision?.comments || ''
  );
  const [selectedDecision, setSelectedDecision] = useState<OfficerDecisionType | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [decisionSuccessMsg, setDecisionSuccessMsg] = useState<string | null>(null);

  // Group findings by severity
  const criticalFindings = findings.filter(f => f.severity === 'CRITICAL');
  const warningFindings = findings.filter(f => f.severity === 'WARNING');

  const handleConfirmDecision = () => {
    if (!selectedDecision) return;
    
    recordOfficerDecision(selectedDecision, commentText);
    setShowConfirmModal(false);
    
    const actionLabel = selectedDecision === 'REQUEST_CORRECTION' 
      ? 'Formal Correction Requisition Dispatched' 
      : selectedDecision === 'ESCALATE_REVIEW' 
      ? 'Application Escalated to Appellate Committee' 
      : 'Provisionally Recommended for Approval Clearance';

    setDecisionSuccessMsg(`Decision Recorded in Local Demo: "${actionLabel}". Audit log generated.`);
    setTimeout(() => setDecisionSuccessMsg(null), 5000);
  };

  const applyTemplateComment = (template: string) => {
    setCommentText(template);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Screen 8 • Decision Command</span>
            <span className="px-2 py-0.2 text-[10px] bg-amber-100 text-amber-800 rounded font-semibold">
              Officer Discretion Reserved
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Authorized Officer Review & Decision Determination
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Synthesizes historical baselines, statutory checklist, and regulatory rules into an authoritative officer decision.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('audit-report')}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
        >
          <History className="w-4 h-4" />
          <span>View Audit Trail & Report</span>
        </button>
      </div>

      {/* Success alert when decision recorded */}
      {decisionSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">{decisionSuccessMsg}</span>
          </div>
          <button
            onClick={() => setActiveTab('audit-report')}
            className="text-emerald-800 underline font-bold hover:text-emerald-950"
          >
            Inspect Audit Trail ›
          </button>
        </div>
      )}

      {/* Officer Responsibility & Discretion Banner */}
      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex items-start gap-3 text-xs">
        <ShieldCheck className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="font-bold text-white text-sm">
            Statutory Responsibility Disclaimer: Human-in-the-Loop Validation
          </h3>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            PRAMAAN is an assistive verification system. Automated checks highlight discrepancies and calculate rule statuses, but never finalize approvals autonomously. The authorized scrutiny officer holds full statutory authority and legal accountability for all recorded outcomes.
          </p>
          <p className="text-amber-300 text-[10px] font-medium pt-0.5">
            * All decisions recorded here are stored within the client-side demonstration state and do not invoke external AICTE production databases.
          </p>
        </div>
      </div>

      {/* Application Snapshot & Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Application Summary */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Application Under Review
          </span>
          <div className="font-bold text-slate-900 text-sm">{application.institutionName}</div>
          <div className="space-y-1 text-slate-600 text-[11px] pt-1">
            <div>Ref Code: <span className="font-mono font-medium text-slate-900">{application.id}</span></div>
            <div>Academic Year: <span className="font-medium text-slate-900">{application.academicYear}</span></div>
            <div>Category: <span className="text-slate-900">{application.applicationType}</span></div>
          </div>
        </div>

        {/* Card 2: Historical Comparison Highlights */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Historical Comparison Summary
          </span>
          <div className="space-y-1 text-slate-700 text-[11px]">
            <div className="flex justify-between">
              <span>Baseline Intake:</span>
              <span className="font-mono font-bold text-slate-900">{application.previousRecord.approvedIntake} seats</span>
            </div>
            <div className="flex justify-between">
              <span>Applied Intake:</span>
              <span className={`font-mono font-bold ${application.currentRecord.approvedIntake !== application.previousRecord.approvedIntake ? 'text-red-600 bg-red-50 px-1 rounded' : 'text-slate-900'}`}>
                {application.currentRecord.approvedIntake} seats
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-100">
              <span>Delta Status:</span>
              <span className="font-bold text-slate-800">
                {application.currentRecord.approvedIntake !== application.previousRecord.approvedIntake 
                  ? `+${application.currentRecord.approvedIntake - application.previousRecord.approvedIntake} seats variance` 
                  : '0 Seats (Baseline Match)'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Regulatory Rules Summary */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Regulatory Rule Engine Results
          </span>
          <div className="space-y-1 text-slate-700 text-[11px]">
            <div className="flex justify-between">
              <span>Pass Status:</span>
              <span className="font-bold text-emerald-700">{rules.filter(r => r.status === 'PASS').length} Rules</span>
            </div>
            <div className="flex justify-between">
              <span>Manual Review:</span>
              <span className="font-bold text-purple-700">{rules.filter(r => r.status === 'MANUAL_REVIEW').length} Rules</span>
            </div>
            <div className="flex justify-between">
              <span>Rule Failures:</span>
              <span className="font-bold text-red-700">{rules.filter(r => r.status === 'FAIL').length} Rules</span>
            </div>
          </div>
        </div>

      </div>

      {/* Findings Breakdown by Severity */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Detected Findings Summary for Officer Scrutiny
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">
            {findings.length} findings categorized
          </span>
        </div>

        {/* Critical Issues List */}
        {criticalFindings.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-red-700 uppercase flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              Critical Actionable Discrepancies ({criticalFindings.length})
            </span>
            {criticalFindings.map((f) => (
              <div 
                key={f.id} 
                onClick={() => openEvidenceForFinding(f.id)}
                className="p-3 bg-red-50/70 border border-red-200 rounded-lg text-xs flex items-center justify-between cursor-pointer hover:bg-red-50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-red-900">{f.id}</span>
                    <span className="font-semibold text-slate-900">{f.category}: {f.fieldName}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5">{f.summary}</p>
                </div>
                <button className="text-red-700 font-semibold text-[11px] underline flex-shrink-0">
                  Inspect Proof ›
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Warning Issues List */}
        {warningFindings.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold text-amber-700 uppercase flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Warnings & Ratio Reviews ({warningFindings.length})
            </span>
            {warningFindings.map((f) => (
              <div 
                key={f.id}
                onClick={() => openEvidenceForFinding(f.id)}
                className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs flex items-center justify-between cursor-pointer hover:bg-amber-50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-900">{f.id}</span>
                    <span className="font-semibold text-slate-900">{f.category}: {f.fieldName}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5">{f.summary}</p>
                </div>
                <button className="text-amber-800 font-semibold text-[11px] underline flex-shrink-0">
                  Inspect Proof ›
                </button>
              </div>
            ))}
          </div>
        )}

        {criticalFindings.length === 0 && warningFindings.length === 0 && (
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>No critical issues detected in configured demo checks. Ready for routine clearance.</span>
          </div>
        )}
      </div>

      {/* Decision Recording Workspace */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-pramaan-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Record Authorized Scrutiny Decision
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Reviewing Officer: <strong>Shri A. K. Verma</strong> (OFF-8821)
          </span>
        </div>

        {/* Current State if already decided */}
        {application.officerDecision && (
          <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">
                Current Recorded Decision: <span className="font-mono text-pramaan-800">{application.officerDecision.status}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">{application.officerDecision.timestamp}</span>
            </div>
            <p className="text-slate-600 italic">"{application.officerDecision.comments}"</p>
          </div>
        )}

        {/* Comment field with quick templates */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">
              Official Determination & Justification Note:
            </label>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-slate-400">Quick Note:</span>
              <button
                onClick={() => applyTemplateComment('Discrepancy in intake capacity from 120 to 180 seats lacks supporting University Expansion NOC. Issue deficiency notice.')}
                className="text-pramaan-700 hover:underline"
              >
                Intake Variance Requisition
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => applyTemplateComment('All baseline statutory requirements and certificates verified. Recommended for provisional EoA clearance.')}
                className="text-pramaan-700 hover:underline"
              >
                Standard Clearance
              </button>
            </div>
          </div>

          <textarea
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Enter officer notes, grounds for deficiency notice, or conditions for sanction..."
            className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 leading-relaxed font-sans"
          />
        </div>

        {/* Decision Buttons Row */}
        <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
          
          {/* Button 1: Request Correction */}
          <button
            onClick={() => {
              setSelectedDecision('REQUEST_CORRECTION');
              setShowConfirmModal(true);
            }}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Request Correction / Issue Notice</span>
          </button>

          {/* Button 2: Escalate for Review */}
          <button
            onClick={() => {
              setSelectedDecision('ESCALATE_REVIEW');
              setShowConfirmModal(true);
            }}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Scale className="w-4 h-4" />
            <span>Escalate to Appellate Committee</span>
          </button>

          {/* Button 3: Approve Provisionally */}
          <button
            onClick={() => {
              setSelectedDecision('PROVISIONALLY_APPROVE');
              setShowConfirmModal(true);
            }}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Provisionally Approve</span>
          </button>
        </div>
      </div>

      {/* Confirmation Dialog Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2.5 text-slate-900">
              <div className="p-2 rounded-lg bg-pramaan-100 text-pramaan-800">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Confirm Official Determination</h4>
                <p className="text-xs text-slate-500">Record in local PRAMAAN demonstration audit trail</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Application:</span>
                <span className="font-semibold text-slate-900">{application.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Action:</span>
                <span className="font-bold text-pramaan-900">{selectedDecision?.replace('_', ' ')}</span>
              </div>
              <div className="pt-1 border-t border-slate-200 text-slate-600">
                <span className="font-medium text-slate-700 block mb-0.5">Note:</span>
                "{commentText || 'Officer review completed.'}"
              </div>
            </div>

            <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
              * Note: This action immediately generates an immutable demonstration audit record and updates the status across all screens.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDecision}
                className="px-4 py-1.5 text-xs font-bold bg-pramaan-800 hover:bg-pramaan-900 text-white rounded-lg shadow transition-colors"
              >
                Confirm & Record Decision
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
