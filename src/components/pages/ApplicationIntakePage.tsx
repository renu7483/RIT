import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileUp, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Play, 
  RefreshCw, 
  FileCheck, 
  Info,
  Building,
  UploadCloud,
  FileX
} from 'lucide-react';

export const ApplicationIntakePage: React.FC = () => {
  const { 
    application, 
    uploadedFiles, 
    addUploadedFile, 
    removeUploadedFile, 
    runValidationSimulation, 
    isValidating,
    setActiveTab
  } = useApp();

  const [uploadError, setUploadError] = useState<string | null>(null);
  const [lastUploadedName, setLastUploadedName] = useState<string | null>(null);

  // File selection validation handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    // Validate file type
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setUploadError(`Invalid file format: "${file.name}". PRAMAAN statutory intake strictly accepts Adobe PDF documents.`);
      return;
    }

    // Validate size (limit 25MB)
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > 25) {
      setUploadError(`File too large: (${sizeInMB.toFixed(1)} MB). Statutory bundle limit is 25 MB per PDF.`);
      return;
    }

    const formattedSize = sizeInMB >= 1 ? `${sizeInMB.toFixed(1)} MB` : `${Math.round(file.size / 1024)} KB`;
    
    addUploadedFile({
      name: file.name,
      size: formattedSize,
      type: file.type
    });
    setLastUploadedName(file.name);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Screen 2 • Verification Pipeline</span>
            <span className="px-2 py-0.2 text-[10px] bg-slate-200 text-slate-700 rounded font-mono">Offline / Local Standalone</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Application Intake & Document Ingestion
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pre-loaded with institutional baseline data. Ingest statutory PDF schedules for historical baseline comparison.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              await runValidationSimulation();
              setActiveTab('comparison');
            }}
            disabled={isValidating}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isValidating ? 'animate-spin' : ''}`} />
            <span>{isValidating ? 'Running Verification Pipeline...' : 'Run Full Validation'}</span>
          </button>
        </div>
      </div>

      {/* Grid: Left Column (Application Metadata & Preloaded Records) | Right Column (File Ingestion) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Institutional Application Metadata */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Institution Header Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pramaan-100 text-pramaan-800 flex items-center justify-center font-bold text-xs">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{application.institutionName}</h3>
                  <p className="text-xs text-slate-500">AICTE Permanent Institute ID: {application.institutionCode}</p>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-pramaan-50 border border-pramaan-200 text-pramaan-800 rounded font-semibold">
                Ref: {application.id}
              </span>
            </div>

            {/* Application Data Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Target Academic Year</span>
                <span className="font-semibold text-slate-800">{application.academicYear}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Application Category</span>
                <span className="font-semibold text-slate-800">{application.applicationType}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Submission Date</span>
                <span className="font-mono text-slate-700">{application.submissionDate}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Historical Baseline Reference</span>
                <span className="font-mono text-slate-700">{application.previousRecord.applicationRef} (Sanction FY25)</span>
              </div>
            </div>
          </div>

          {/* Parallel Document Record Comparison Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Statutory Bundles Attached to Record
            </h3>
            
            <div className="space-y-2">
              {application.documents.map((doc) => (
                <div 
                  key={doc.id}
                  className={`p-3 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                    doc.isPresent 
                      ? 'bg-slate-50 border-slate-200 text-slate-800' 
                      : 'bg-red-50/80 border-red-200 text-red-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded ${doc.isPresent ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {doc.isPresent ? <FileCheck className="w-4 h-4" /> : <FileX className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-semibold">{doc.name}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>Category: {doc.category}</span>
                        {doc.fileName && (
                          <>
                            <span>•</span>
                            <span className="font-mono">{doc.fileName}</span>
                            <span>({doc.fileSize})</span>
                          </>
                        )}
                        {doc.expiryDate && (
                          <>
                            <span>•</span>
                            <span className={`font-mono ${doc.isExpired ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
                              Expiry: {doc.expiryDate} {doc.isExpired ? '(EXPIRED)' : ''}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    doc.isPresent ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {doc.isPresent ? 'Present' : 'Missing'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Integrity Disclosure Notice */}
          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/80 text-xs text-blue-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="font-semibold text-blue-950">
                Evaluation Transparency & OCR Demarcation:
              </strong>
              <p className="text-blue-800 leading-relaxed text-[11px]">
                Selecting or uploading local PDF files demonstrates client-side file intake and file-type validation. The comparative evaluations and rule validations are powered by PRAMAAN’s deterministic demonstration engine rather than live external portal queries or uncertified OCR claims.
              </p>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Browser PDF Upload Dropzone & Uploaded List */}
        <div className="space-y-4">
          
          {/* Upload Dropzone */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <UploadCloud className="w-4 h-4 text-teal-600" />
              Browser PDF Intake
            </h3>
            <p className="text-xs text-slate-500">
              Select any local PDF document from your filesystem to test browser upload validation.
            </p>

            <label className="border-2 border-dashed border-slate-300 hover:border-teal-500 bg-slate-50 hover:bg-teal-50/30 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors block">
              <FileUp className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-xs font-semibold text-slate-700">Choose PDF Document</span>
              <span className="text-[11px] text-slate-400 mt-1">Accepts standard .pdf up to 25 MB</span>
              <input 
                type="file" 
                accept=".pdf,application/pdf" 
                onChange={handleFileChange}
                className="hidden" 
              />
            </label>

            {uploadError && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{uploadError}</span>
              </div>
            )}

            {lastUploadedName && !uploadError && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate">Ingested: <strong>{lastUploadedName}</strong></span>
              </div>
            )}
          </div>

          {/* Active Uploaded Files List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900">
                Uploaded Ingestion Queue
              </h4>
              <span className="text-[10px] font-mono text-slate-500">
                {uploadedFiles.length} files
              </span>
            </div>

            <div className="space-y-2">
              {uploadedFiles.map((file, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <FileText className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <div className="truncate">
                      <div className="font-medium text-slate-800 truncate">{file.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{file.size}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeUploadedFile(idx)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                    title="Remove file"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={async () => {
                await runValidationSimulation();
                setActiveTab('comparison');
              }}
              className="w-full mt-2 py-2 bg-pramaan-800 hover:bg-pramaan-900 text-white rounded-lg text-xs font-semibold shadow transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Validate Attached Documents</span>
              <Play className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
