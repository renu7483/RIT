import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileCheck2, 
  FileX, 
  ShieldAlert, 
  FileText,
  QrCode, 
  KeyRound, 
  ExternalLink,
  Info,
  CalendarX
} from 'lucide-react';

export const DocumentVerificationPage: React.FC = () => {
  const { 
    application, 
    openEvidenceForFinding, 
    findings 
  } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Screen 5 • Document Intelligence</span>
            <span className="px-2 py-0.2 text-[10px] bg-slate-200 text-slate-700 rounded font-mono">
              {application.documents.length} Statutory Categories
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Document Verification & Statutory Intake Checklist
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Technical inspection of attached PDF documents: integrity checklist, temporal expiry checks, and cryptographic signatures.
          </p>
        </div>

        {/* Verification Limitations Badge (Strictly Disclaimed) */}
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 text-amber-900 px-3 py-1.5 rounded-lg text-xs font-medium">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Status: <strong>Not Externally Verified</strong> (Demo Mode)</span>
        </div>
      </div>

      {/* Critical Verification Semantics Notice (Prompt Section 9) */}
      <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
        <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-wider text-[11px]">
          <Info className="w-4 h-4" />
          <span>Audit Trust Distinction & Verification Semantics</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-[11px] pt-1">
          <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
            <strong className="text-white block mb-0.5">1. File Presence:</strong>
            Validates required statutory checklist submission.
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
            <strong className="text-white block mb-0.5">2. Field Extraction:</strong>
            Extracts sample values for historical cross-check.
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700">
            <strong className="text-white block mb-0.5">3. Technical Seals:</strong>
            QR format & embedded PDF digital cert verification.
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700 text-amber-300">
            <strong className="text-amber-200 block mb-0.5">4. External Issuer:</strong>
            "Not Externally Verified" unless live portal connected.
          </div>
        </div>
      </div>

      {/* Documents Grid / Cards */}
      <div className="space-y-4">
        {application.documents.map((doc) => {
          const isMissing = !doc.isPresent;
          const isExpired = doc.isExpired;
          
          return (
            <div 
              key={doc.id}
              className={`bg-white rounded-xl border shadow-sm p-4 text-xs transition-all ${
                isMissing ? 'border-red-300 bg-red-50/10' :
                isExpired ? 'border-amber-300 bg-amber-50/10' :
                'border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    isMissing ? 'bg-red-100 text-red-700' :
                    isExpired ? 'bg-amber-100 text-amber-700' :
                    'bg-teal-100 text-teal-800'
                  }`}>
                    {isMissing ? <FileX className="w-5 h-5" /> :
                     isExpired ? <CalendarX className="w-5 h-5" /> :
                     <FileCheck2 className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{doc.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                        {doc.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                      {doc.fileName && (
                        <span className="font-mono text-slate-700 font-medium">
                          File: {doc.fileName} ({doc.fileSize})
                        </span>
                      )}
                      {doc.uploadDate && <span>Uploaded: {doc.uploadDate}</span>}
                      {doc.expiryDate && (
                        <span className={`font-mono font-medium ${isExpired ? 'text-red-600 font-bold bg-red-100 px-1.5 py-0.5 rounded' : 'text-slate-700'}`}>
                          Expiry: {doc.expiryDate} {isExpired ? '(EXPIRED — Prior to Cutoff)' : '(Valid)'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
                    isMissing ? 'bg-red-100 text-red-800 border border-red-300' :
                    isExpired ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                    'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {isMissing ? 'Missing File' : isExpired ? 'Expired Certificate' : 'Present & Checked'}
                  </span>
                  
                  {(isMissing || isExpired) && (
                    <button
                      onClick={() => {
                        const matchFinding = findings.find(f => 
                          f.fieldName.toLowerCase().includes(doc.name.toLowerCase()) || 
                          (isExpired && f.category === 'Document Expiry / Validity')
                        );
                        if (matchFinding) openEvidenceForFinding(matchFinding.id);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold rounded bg-pramaan-800 hover:bg-pramaan-900 text-white flex items-center gap-1 shadow-sm transition-colors"
                    >
                      <span>Inspect Evidence</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* 6-Stage Statutory Check Status Bar */}
              <div className="bg-slate-100/90 p-2.5 rounded-lg border border-slate-200 mt-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  6-Stage Statutory Check Protocol
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-[10px]">
                  
                  <div className={`p-1.5 rounded border flex items-center justify-between ${
                    doc.checkStages?.present ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'
                  }`}>
                    <span className="font-medium">1. Present:</span>
                    <span className="font-bold font-mono">{doc.checkStages?.present ? 'YES' : 'NO'}</span>
                  </div>

                  <div className={`p-1.5 rounded border flex items-center justify-between ${
                    doc.checkStages?.extracted ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    <span className="font-medium">2. Extracted:</span>
                    <span className="font-bold font-mono">{doc.checkStages?.extracted ? 'YES' : 'NO'}</span>
                  </div>

                  <div className={`p-1.5 rounded border flex items-center justify-between ${
                    doc.checkStages?.consistencyChecked ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    <span className="font-medium">3. Consistency:</span>
                    <span className="font-bold font-mono">{doc.checkStages?.consistencyChecked ? 'PASS' : 'FLAGGED'}</span>
                  </div>

                  <div className={`p-1.5 rounded border flex items-center justify-between ${
                    doc.checkStages?.signatureChecked ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    <span className="font-medium">4. Signature:</span>
                    <span className="font-bold font-mono">{doc.checkStages?.signatureChecked ? 'CHECKED' : 'UNVERIFIED'}</span>
                  </div>

                  <div className="p-1.5 rounded border flex items-center justify-between bg-amber-50/80 border-amber-300 text-amber-950">
                    <span className="font-medium">5. Issuer:</span>
                    <span className="font-bold font-mono text-[9px] text-amber-800">NOT EXT VERIFIED</span>
                  </div>

                  <div className={`p-1.5 rounded border flex items-center justify-between ${
                    doc.checkStages?.manualReviewRequired ? 'bg-purple-50 border-purple-200 text-purple-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <span className="font-medium">6. Review:</span>
                    <span className="font-bold font-mono">{doc.checkStages?.manualReviewRequired ? 'REQUIRED' : 'CLEAR'}</span>
                  </div>

                </div>
              </div>

              {/* Document Deep Dive: Extracted Fields + Technical Inspection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
                
                {/* Extracted Sample Metadata */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Extracted Sample Metadata
                    </span>
                    {doc.ocrConfidence && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                        doc.lowConfidenceFlag ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        OCR: {doc.ocrConfidence}%
                      </span>
                    )}
                  </div>
                  {Object.keys(doc.extractedSampleFields).length > 0 ? (
                    <div className="space-y-1">
                      {Object.entries(doc.extractedSampleFields).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-[11px]">
                          <span className="text-slate-500">{k}:</span>
                          <span className="font-mono text-slate-800 font-medium">{v}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400 italic">No extracted fields available (file missing).</span>
                  )}
                  {doc.lowConfidenceFlag && (
                    <div className="p-1.5 bg-amber-50 rounded border border-amber-200 text-[10px] text-amber-800 font-medium">
                      Notice: Scanned seal resolution caused low-confidence extraction (&lt;80%). Officer manual verification required.
                    </div>
                  )}
                </div>

                {/* Technical Inspection Flags */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Technical Inspection Status
                  </span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-slate-400" />
                        OCR Quality:
                      </span>
                      <span className="font-mono font-medium text-slate-800">{doc.simulatedOcrStatus}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <QrCode className="w-3 h-3 text-slate-400" />
                        QR Inspection:
                      </span>
                      <span className="font-mono font-medium text-slate-800">{doc.simulatedQrStatus}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1">
                        <KeyRound className="w-3 h-3 text-slate-400" />
                        PDF Signature:
                      </span>
                      <span className="font-mono font-medium text-slate-800">{doc.pdfSignatureStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Anomaly & Recommended Action */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Verification Limitation & Action
                  </span>
                  <div className="text-[11px] text-slate-700 leading-snug">
                    <strong>Recommended Officer Action:</strong> {doc.recommendedAction}
                  </div>
                  <div className="text-[10px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200">
                    * {doc.externalVerificationStatus} — Document validity depends on officer review of physical seal.
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
