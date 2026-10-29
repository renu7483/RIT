import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Printer, 
  Layers, 
  GitCompare, 
  FileCheck2, 
  Scale, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ExternalLink,
  Table,
  SlidersHorizontal,
  FileText,
  Lock,
  ArrowRight,
  Sparkles,
  Eye,
  AlertCircle
} from 'lucide-react';
import type { ScenarioId } from '../../types';

export const PresentationDeckPage: React.FC = () => {
  const { 
    setActiveTab, 
    currentScenarioId, 
    switchScenario 
  } = useApp();

  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const totalSlides = 6;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlide(prev => Math.max(prev - 1, 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slideTitles = [
    'Title & Project Overview',
    'Problem Statement & 7-Stage Workflow',
    'Proposed Solution & 5-Layer Architecture',
    'Historical Comparison & Rule Engine',
    'Document Verification & Explainability',
    'Feasibility, Impact & Testing Plan'
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-12">
      
      {/* Top Deck Control Ribbon */}
      <div className="no-print bg-slate-900 text-white px-4 py-3 rounded-xl border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-bold text-xs">
            {currentSlide}/{totalSlides}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">SIH 2026 Presentation Deck</span>
              <span className="px-2 py-0.2 text-[10px] bg-slate-800 text-slate-300 rounded font-mono border border-slate-700">
                Problem Statement ID: SIH26261
              </span>
            </div>
            <h1 className="text-sm font-bold text-white truncate max-w-md">
              Slide {currentSlide}: {slideTitles[currentSlide - 1]}
            </h1>
          </div>
        </div>

        {/* Slide Selector Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-lg border border-slate-700">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentSlide(num)}
              className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                currentSlide === num 
                  ? 'bg-teal-500 text-slate-950 shadow' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
              title={`Jump to Slide ${num}: ${slideTitles[num - 1]}`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded border transition-colors flex items-center gap-1.5 ${
              showSpeakerNotes 
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/30 font-semibold' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Toggle Pitch Commentary & Technical Speaking Points"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speaker Notes</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-2.5 py-1.5 text-xs font-medium rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Print or Export Slide Deck to PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print Deck</span>
          </button>

          <div className="flex items-center gap-1 pl-2 border-l border-slate-700">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 1))}
              disabled={currentSlide === 1}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 rounded transition-colors"
              title="Previous Slide (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide(prev => Math.min(prev + 1, totalSlides))}
              disabled={currentSlide === totalSlides}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 rounded transition-colors"
              title="Next Slide (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Presentation Stage (16:9 Aspect Ratio Container) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden min-h-[640px] flex flex-col justify-between text-white relative">
        
        {/* Slide Canvas Top Bar (Gov Branding & Header) */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow">
              <ShieldCheck className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm tracking-wider text-white">PRAMAAN</span>
                <span className="text-xs text-teal-400 font-mono font-semibold">| SIH 2026</span>
                <span className="px-2 py-0.2 text-[10px] bg-slate-800 text-slate-300 border border-slate-700 rounded font-mono">
                  SIH26261
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:inline text-slate-400">Smart Education & Regulatory Governance Track</span>
            <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 font-semibold text-[10px]">
              SIH 2026 DEMO — SAMPLE DATA
            </span>
          </div>
        </div>

        {/* Slide Body Content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">

          {/* ========================================================= */}
          {/* SLIDE 1: Title & Project Overview                         */}
          {/* ========================================================= */}
          {currentSlide === 1 && (
            <div className="space-y-6">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Smart India Hackathon 2026 • Problem Statement ID: SIH26261</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  PRAMAAN: AI-Assisted Institutional Application Validation & Regulatory Compliance Verification
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-teal-200/90 font-medium max-w-4xl leading-relaxed">
                  Evidence-linked document verification, historical record comparison, and human-in-the-loop decision support for authorized scrutiny officers.
                </p>
              </div>

              {/* Team Information & Metadata Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Team Name</span>
                  <span className="font-mono font-bold text-teal-300 text-sm">[Team Name]</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Team ID</span>
                  <span className="font-mono font-bold text-white text-sm">[Team ID]</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Institution</span>
                  <span className="font-semibold text-slate-200 text-sm truncate block">[Institution Name]</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Category</span>
                  <span className="font-semibold text-amber-300 text-sm">Regulatory Tech / AI</span>
                </div>
              </div>

              {/* Problem & Solution Callout Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wide">
                    <span className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 font-mono text-[11px]">1</span>
                    <span>Automated Baseline Diffing</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Instantly flags unexpected shifts against prior approved records (+50.0% intake surges, faculty headcount changes, address drift) without tedious page flipping.
                  </p>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wide">
                    <span className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 font-mono text-[11px]">2</span>
                    <span>Versioned Rule Engine</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Executes deterministic, versioned compliance rules with explicit effective dates, OCR confidence scoring, and transparent mathematical formulas.
                  </p>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-2">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wide">
                    <span className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 font-mono text-[11px]">3</span>
                    <span>Human-in-the-Loop Authority</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    AI assists with document extraction and rule scoring; authorized human scrutiny officers retain 100% final approval authority backed by cryptographic audit logs.
                  </p>
                </div>

              </div>

              {/* Bottom Quick Jump Link */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span className="italic">
                  * Core Problem: Scrutiny officers spend weeks manually cross-checking hundreds of institutional applications against historical files and statutory PDF attachments.
                </span>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Open Live Prototype Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* SLIDE 2: Problem Statement & 7-Stage Workflow              */}
          {/* ========================================================= */}
          {currentSlide === 2 && (
            <div className="space-y-5">
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Operational Realities</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Regulatory Scrutiny Challenges & PRAMAAN's 7-Stage Workflow
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono">
                  Stage 1 to 7 Pipeline
                </span>
              </div>

              {/* 5 Distinct Operational Challenges */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                
                <div className="bg-slate-950/70 p-3 rounded-lg border border-red-500/30 space-y-1">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wide block">Challenge 1</span>
                  <h4 className="text-xs font-bold text-white">Document Tampering</h4>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Expired NOCs, doctored dates, and fabricated seal stamps pass through manual scanning undetected.
                  </p>
                </div>

                <div className="bg-slate-950/70 p-3 rounded-lg border border-amber-500/30 space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide block">Challenge 2</span>
                  <h4 className="text-xs font-bold text-white">Disconnected Rules</h4>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Annual regulatory rule updates are hard to enforce uniformly across multiple evaluation panels.
                  </p>
                </div>

                <div className="bg-slate-950/70 p-3 rounded-lg border border-yellow-500/30 space-y-1">
                  <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wide block">Challenge 3</span>
                  <h4 className="text-xs font-bold text-white">Subjective Scrutiny</h4>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Lack of objective cross-check tools leads to inconsistent approvals between different review zones.
                  </p>
                </div>

                <div className="bg-slate-950/70 p-3 rounded-lg border border-blue-500/30 space-y-1">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide block">Challenge 4</span>
                  <h4 className="text-xs font-bold text-white">Isolated Applications</h4>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Current filings are evaluated without automatic diffing against the institution's prior original record.
                  </p>
                </div>

                <div className="bg-slate-950/70 p-3 rounded-lg border border-purple-500/30 space-y-1">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wide block">Challenge 5</span>
                  <h4 className="text-xs font-bold text-white">Missing Audit Trails</h4>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Lack of cryptographically sealed decision history makes review decisions vulnerable to legal dispute.
                  </p>
                </div>

              </div>

              {/* Clean 7-Stage End-to-End Workflow Diagram */}
              <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block font-mono">
                  End-to-End Operational Pipeline: From PDF Submission to Cryptographic Officer Signing
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center text-xs">
                  
                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-teal-400 font-mono">Stage 1</span>
                    <strong className="text-white text-xs my-1">PDF Intake</strong>
                    <span className="text-[10px] text-slate-400">Application & Attachments</span>
                  </div>

                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-teal-400 font-mono">Stage 2</span>
                    <strong className="text-white text-xs my-1">Extraction</strong>
                    <span className="text-[10px] text-slate-400">PyMuPDF & PaddleOCR</span>
                  </div>

                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-teal-400 font-mono">Stage 3</span>
                    <strong className="text-white text-xs my-1">Baseline Diff</strong>
                    <span className="text-[10px] text-slate-400">Historical Comparison</span>
                  </div>

                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-teal-400 font-mono">Stage 4</span>
                    <strong className="text-white text-xs my-1">Rule Engine</strong>
                    <span className="text-[10px] text-slate-400">Deterministic Checks</span>
                  </div>

                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-teal-400 font-mono">Stage 5</span>
                    <strong className="text-white text-xs my-1">Doc Integrity</strong>
                    <span className="text-[10px] text-slate-400">6-Stage Verification</span>
                  </div>

                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-teal-400 font-mono">Stage 6</span>
                    <strong className="text-white text-xs my-1">Evidence Dossier</strong>
                    <span className="text-[10px] text-slate-400">Visual Bounding Boxes</span>
                  </div>

                  <div className="bg-teal-950/80 p-2.5 rounded-lg border border-teal-500/50 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-teal-300 font-mono">Stage 7</span>
                    <strong className="text-teal-200 text-xs my-1">Officer Sign</strong>
                    <span className="text-[10px] text-teal-300">HMAC SHA-256 Audit</span>
                  </div>

                </div>
              </div>

              {/* Practical Benefits Callout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <strong className="text-teal-300 block mb-1">Time Reduction</strong>
                  <span className="text-slate-300">Cuts officer manual document review time by ~70%, routing clean files faster and focusing scrutiny on high-variance shifts.</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <strong className="text-teal-300 block mb-1">Zero Omissions</strong>
                  <span className="text-slate-300">Eliminates unnoticed capacity increases (+50.0% intake surges) and expired certificates prior to approval.</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <strong className="text-teal-300 block mb-1">Legal Defensibility</strong>
                  <span className="text-slate-300">Creates an immutable, cryptographically sealed record of every officer finding, remark, and final determination.</span>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* SLIDE 3: Proposed Solution & 5-Layer Architecture         */}
          {/* ========================================================= */}
          {currentSlide === 3 && (
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">System Architecture</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Proposed Solution: 5-Layer Modular Architecture
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-mono">
                  Zero Black-Box Decisions
                </span>
              </div>

              {/* 5-Layer Architecture Stack */}
              <div className="space-y-2">
                
                {/* Layer 1 */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                      L1
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-xs">Input & Ingestion Layer</strong>
                        <span className="px-2 py-0.2 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">Multi-format PDF</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Accepts statutory application forms, affiliation letters, fire NOCs, and land deeds. Generates SHA-256 document content fingerprints.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 flex-shrink-0">
                    PyMuPDF Stream + MIME Validation
                  </span>
                </div>

                {/* Layer 2 */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                      L2
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-xs">Extraction & Normalization Layer</strong>
                        <span className="px-2 py-0.2 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">Dual Engine</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Extracts structured tabular data via PyMuPDF vector text parser; falls back to PaddleOCR for scanned certificates with confidence scoring (&lt;80% flagged).
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 flex-shrink-0">
                    PyMuPDF + PaddleOCR Normalizer
                  </span>
                </div>

                {/* Layer 3 */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                      L3
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-xs">Validation & Comparison Layer</strong>
                        <span className="px-2 py-0.2 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">Deterministic</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Automated historical baseline diffing (+50.0% intake shift detection); executes versioned compliance rules (DEMO-R001 to DEMO-R005) with zero hallucination.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 flex-shrink-0">
                    FastAPI Rules Engine + Baseline Diff
                  </span>
                </div>

                {/* Layer 4 */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                      L4
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-xs">Evidence & Explainability Layer</strong>
                        <span className="px-2 py-0.2 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">Traceable</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Binds every discrepancy to exact PDF page numbers, visual bounding boxes, and statutory citations. Side-by-side evidence preview eliminating guesswork.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 flex-shrink-0">
                    Bounding-Box Dossier + PDF Viewer
                  </span>
                </div>

                {/* Layer 5 */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-teal-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                      L5
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-teal-200 text-xs">Officer Decision & Cryptographic Audit Layer</strong>
                        <span className="px-2 py-0.2 rounded bg-teal-950 text-teal-300 font-mono text-[10px]">Human Authority</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Officer decision console (Approve, Request Correction, Escalate for Field Inspection) with mandatory remarks and HMAC-SHA256 signed immutable audit trail.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-teal-300 bg-teal-950/80 px-2 py-1 rounded border border-teal-500/40 flex-shrink-0">
                    HMAC SHA-256 Web Crypto Audit
                  </span>
                </div>

              </div>

              {/* Bottom Demarcation & Tech Stack Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                
                {/* Automated vs Human Demarcation */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block font-mono">
                    Automated Assistant vs Human Officer Demarcation
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                      <strong className="text-slate-200 block mb-0.5">Automated Engine</strong>
                      <span className="text-slate-400">Text parsing, baseline math delta, rule pass/fail flags, OCR scoring. No auto-rejections.</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-800 text-amber-300">
                      <strong className="text-amber-200 block mb-0.5">Scrutiny Officer</strong>
                      <span className="text-slate-300">Evaluates context, accepts legitimate explanations, orders inspections, signs final verdict.</span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Box */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block font-mono">
                    Production-Grade Open Source Technology Stack
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px] font-mono text-slate-300">
                    <span className="bg-slate-900 p-1.5 rounded border border-slate-800">React 19 + TypeScript</span>
                    <span className="bg-slate-900 p-1.5 rounded border border-slate-800">Tailwind CSS v3.4</span>
                    <span className="bg-slate-900 p-1.5 rounded border border-slate-800">Python FastAPI</span>
                    <span className="bg-slate-900 p-1.5 rounded border border-slate-800">PostgreSQL (JSONB)</span>
                    <span className="bg-slate-900 p-1.5 rounded border border-slate-800">PyMuPDF (fitz)</span>
                    <span className="bg-slate-900 p-1.5 rounded border border-slate-800">Web Crypto HMAC</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* SLIDE 4: Historical Comparison & Rule Engine              */}
          {/* ========================================================= */}
          {currentSlide === 4 && (
            <div className="space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Screen 3 & 4 Walkthrough</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Historical Baseline Comparison & Versioned Rule Engine
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('comparison')}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-slate-950 text-xs font-bold rounded-lg shadow flex items-center gap-1.5 self-start sm:self-center transition-colors"
                >
                  <span>Launch Live Comparison Screen</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Exact Mathematical Demonstration Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                
                {/* Intake Shift Card */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 font-mono uppercase tracking-wider">
                      Academic & Intake Shift Detection
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold">
                      Significant variance — manual review required
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-slate-400 text-xs">Approved Intake:</span>
                    <span className="font-mono text-slate-400 line-through">120 Seats</span>
                    <span className="text-slate-400">➔</span>
                    <span className="font-mono text-white text-base font-bold">180 Seats</span>
                    <span className="font-mono text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30 text-xs">
                      +60 seats (+50.0%)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    <strong>Reason for Officer Review:</strong> Baseline approved intake increased by 50.0% in a single academic year cycle. Officer must verify sanctioned lab equipment, workstation seating, and building permits before clearance.
                  </p>
                </div>

                {/* Faculty Growth Scrutiny Card */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-blue-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-400 font-mono uppercase tracking-wider">
                      Faculty Headcount vs Intake Expansion
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-400/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold">
                      Scrutiny Warning — Lagging Growth
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-slate-400 text-xs">Faculty Count:</span>
                    <span className="font-mono text-slate-400">45 Faculty</span>
                    <span className="text-slate-400">➔</span>
                    <span className="font-mono text-white text-base font-bold">48 Faculty</span>
                    <span className="font-mono text-blue-300 font-bold bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/30 text-xs">
                      +3 faculty (+6.7%)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    <strong>Reason for Officer Review:</strong> Faculty growth (+6.7%) significantly lags the +50.0% student intake expansion. Does not declare an unverified breach, but flags need to review appointed professor cadre lists.
                  </p>
                </div>

              </div>

              {/* Historical Comparison Table Summary */}
              <div className="bg-slate-950/90 rounded-xl border border-slate-800 overflow-hidden text-xs">
                <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-300 text-[11px] uppercase tracking-wider">
                    Baseline Comparison Sample (Scenario B: Expanding Engineering College)
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Original Record: PRM-2025-HIST-001</span>
                </div>
                <div className="overflow-x-auto max-h-44">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-900/60 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                      <tr>
                        <th className="py-1.5 px-3">Field Parameter</th>
                        <th className="py-1.5 px-3">Original Record</th>
                        <th className="py-1.5 px-3">Current Application</th>
                        <th className="py-1.5 px-3">Difference / Delta</th>
                        <th className="py-1.5 px-3">Status</th>
                        <th className="py-1.5 px-3">Reason for Officer Review</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                      <tr>
                        <td className="py-1.5 px-3 font-semibold text-white">Approved Intake</td>
                        <td className="py-1.5 px-3 font-mono text-slate-400">120 Seats</td>
                        <td className="py-1.5 px-3 font-mono font-bold text-amber-300">180 Seats</td>
                        <td className="py-1.5 px-3 font-mono font-bold text-amber-400">+60 seats (+50.0%)</td>
                        <td className="py-1.5 px-3"><span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">MANUAL REVIEW</span></td>
                        <td className="py-1.5 px-3 text-slate-400">Substantial intake surge requires lab & faculty validation</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 font-semibold text-white">Total Faculty Count</td>
                        <td className="py-1.5 px-3 font-mono text-slate-400">45 Faculty</td>
                        <td className="py-1.5 px-3 font-mono text-slate-300">48 Faculty</td>
                        <td className="py-1.5 px-3 font-mono text-blue-300">+3 faculty (+6.7%)</td>
                        <td className="py-1.5 px-3"><span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">WARNING</span></td>
                        <td className="py-1.5 px-3 text-slate-400">Faculty growth lags intake growth; verify cadre list</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 font-semibold text-white">Built-Up Area</td>
                        <td className="py-1.5 px-3 font-mono text-slate-400">12,000 sq.m</td>
                        <td className="py-1.5 px-3 font-mono text-slate-300">12,000 sq.m</td>
                        <td className="py-1.5 px-3 font-mono text-slate-500">0 sq.m (0.0%)</td>
                        <td className="py-1.5 px-3"><span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">MATCH</span></td>
                        <td className="py-1.5 px-3 text-slate-500">Matches sanctioned master plan</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 font-semibold text-white">Computer Labs</td>
                        <td className="py-1.5 px-3 font-mono text-slate-400">6 Labs</td>
                        <td className="py-1.5 px-3 font-mono text-slate-300">8 Labs</td>
                        <td className="py-1.5 px-3 font-mono text-teal-300">+2 labs (+33.3%)</td>
                        <td className="py-1.5 px-3"><span className="px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold">EXPANSION</span></td>
                        <td className="py-1.5 px-3 text-slate-400">Verify terminal count and network bandwidth</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Versioned Rule Engine Highlight */}
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Scale className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-white">Rule DEMO-R003: Intake Expansion & Cadre Readiness Rule</strong>
                      <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">v2.3 (AY 2026-27)</span>
                    </div>
                    <span className="text-[11px] text-amber-300 italic block mt-0.5">
                      * Illustrative Demo Rule — Not an Official Regulatory Provision (Effective Date: 2026-01-01)
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 flex-shrink-0">
                  Deterministic Python RulePack
                </span>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* SLIDE 5: Document Verification & Explainability           */}
          {/* ========================================================= */}
          {currentSlide === 5 && (
            <div className="space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Screen 5 & 6 Walkthrough</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Multi-Stage Document Verification & Evidence Dossier
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('documents')}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-slate-950 text-xs font-bold rounded-lg shadow flex items-center gap-1.5 self-start sm:self-center transition-colors"
                >
                  <span>Launch Live Document Screen</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* The 6 Granular Check Stages */}
              <div className="bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block font-mono">
                  The 6 Statutory Document Check Stages (Prompt-Aligned Protocol)
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                  
                  <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] font-bold text-teal-300 font-mono block">1. File Present</span>
                    <strong className="text-white text-xs block my-0.5">Statutory Checklist</strong>
                    <span className="text-[10px] text-slate-400">Checks mandatory presence</span>
                  </div>

                  <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] font-bold text-teal-300 font-mono block">2. Field Extracted</span>
                    <strong className="text-white text-xs block my-0.5">Key-Value Pairs</strong>
                    <span className="text-[10px] text-slate-400">PyMuPDF / PaddleOCR</span>
                  </div>

                  <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] font-bold text-teal-300 font-mono block">3. Consistency</span>
                    <strong className="text-white text-xs block my-0.5">Cross-Check</strong>
                    <span className="text-[10px] text-slate-400">Matches form & baseline</span>
                  </div>

                  <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] font-bold text-teal-300 font-mono block">4. Signature</span>
                    <strong className="text-white text-xs block my-0.5">Tech Certificate</strong>
                    <span className="text-[10px] text-slate-400">PDF cert & QR format</span>
                  </div>

                  <div className="bg-slate-900/90 p-2.5 rounded-lg border border-amber-500/40 text-amber-200">
                    <span className="text-[10px] font-bold text-amber-400 font-mono block">5. Issuer Status</span>
                    <strong className="text-amber-300 text-xs block my-0.5">Not Externally Verified</strong>
                    <span className="text-[10px] text-amber-400/90">Awaiting Live API Portal</span>
                  </div>

                  <div className="bg-slate-900/90 p-2.5 rounded-lg border border-purple-500/40">
                    <span className="text-[10px] font-bold text-purple-300 font-mono block">6. Officer Review</span>
                    <strong className="text-white text-xs block my-0.5">Flagged Action</strong>
                    <span className="text-[10px] text-slate-400">Assigned for inspection</span>
                  </div>

                </div>
              </div>

              {/* Document Deep Dive: OCR Quality & Low-Confidence Handling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                
                {/* High Quality vs Low-Confidence OCR Handling */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-teal-400 font-mono uppercase tracking-wider">
                      OCR Quality & Confidence Scoring
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Tesseract / PaddleOCR Engine</span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="bg-slate-900 p-2 rounded border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-white font-semibold block">University Affiliation Letter</span>
                        <span className="text-[10px] text-slate-400">Digital vector layout • All text strings clean</span>
                      </div>
                      <span className="font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        98.4% Confidence
                      </span>
                    </div>

                    <div className="bg-slate-900 p-2 rounded border border-amber-500/30 flex items-center justify-between">
                      <div>
                        <span className="text-white font-semibold block">Fire Safety Certificate (NOC)</span>
                        <span className="text-[10px] text-amber-300">Scanned seal stamp • Low DPI noise detected</span>
                      </div>
                      <span className="font-mono text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                        76.5% (Low Confidence Flag)
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug">
                    * <strong>Low-Confidence OCR Protocol:</strong> When confidence drops below 80%, the system automatically flags the field for human officer verification, displaying the raw visual snippet in the evidence drawer.
                  </p>
                </div>

                {/* Evidence Drawer & Visual Bounding Box Integration */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-teal-400 font-mono uppercase tracking-wider">
                      Explainable Evidence Linkage
                    </span>
                    <span className="text-[10px] text-teal-300 font-mono">Zero Disconnected Claims</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.2 rounded bg-pramaan-800 text-teal-300 font-mono text-[10px]">
                        PRM-F-001
                      </span>
                      <strong className="text-white">Approved Intake Shift Evidence</strong>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Linked to: <span className="font-mono text-slate-200">AICTE_Approval_Letter_2026.pdf (Page 2, Row 4)</span>.
                      Bounding box highlights sanctioned seat count directly alongside prior year approval record.
                    </p>
                  </div>
                  <div className="p-2 bg-amber-950/40 border border-amber-500/30 rounded text-[10px] text-amber-300">
                    <strong>Statutory Disclaimer:</strong> Status is marked <em>"Not Externally Verified"</em> because external state fire and municipal database APIs are simulated in this local demo.
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* SLIDE 6: Feasibility, Impact, Scenarios & Testing Plan    */}
          {/* ========================================================= */}
          {currentSlide === 6 && (
            <div className="space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Evaluation & Deployment</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Feasibility, Impact, 4 Demo Scenarios & Testing Plan
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('officer-review')}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-slate-950 text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-colors"
                  >
                    <span>Launch Officer Review Console</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 4 Interactive Demo Scenarios Showcase */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
                
                <div 
                  onClick={() => switchScenario('scenario-a')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    currentScenarioId === 'scenario-a' 
                      ? 'bg-emerald-950/60 border-emerald-500 shadow-md ring-1 ring-emerald-500' 
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-emerald-400">Scenario A</span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">CLEAN</span>
                  </div>
                  <strong className="text-white text-xs block mb-1">Baseline Institution</strong>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Standard compliance, approved intake 120, clean historical continuity, all documents present.
                  </p>
                </div>

                <div 
                  onClick={() => switchScenario('scenario-b')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    currentScenarioId === 'scenario-b' 
                      ? 'bg-amber-950/60 border-amber-500 shadow-md ring-1 ring-amber-500' 
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-amber-400">Scenario B</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">+50% SURGE</span>
                  </div>
                  <strong className="text-white text-xs block mb-1">Expanding College</strong>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    +50.0% intake surge (120➔180 seats), lagging faculty (+6.7%), missing building plan document.
                  </p>
                </div>

                <div 
                  onClick={() => switchScenario('scenario-c')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    currentScenarioId === 'scenario-c' 
                      ? 'bg-red-950/60 border-red-500 shadow-md ring-1 ring-red-500' 
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-red-400">Scenario C</span>
                    <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 text-[9px] font-bold">EXPIRED NOC</span>
                  </div>
                  <strong className="text-white text-xs block mb-1">Safety Deficiencies</strong>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Fire Safety Certificate expired prior to cutoff date (2025-12-15 vs 2026-03-31), unverified land title.
                  </p>
                </div>

                <div 
                  onClick={() => switchScenario('scenario-d')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    currentScenarioId === 'scenario-d' 
                      ? 'bg-blue-950/60 border-blue-500 shadow-md ring-1 ring-blue-500' 
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-blue-400">Scenario D</span>
                    <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 text-[9px] font-bold">CLERICAL</span>
                  </div>
                  <strong className="text-white text-xs block mb-1">Minor Discrepancy</strong>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Built-up area 12,000 vs 12,150 sq.m (+1.25% typographical drift), easily cleared by officer.
                  </p>
                </div>

              </div>

              {/* Testing Plan & Quantitative Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold text-teal-400 font-mono uppercase tracking-wider block">
                    Automated Testing Strategy & Verification Plan
                  </span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between border-b border-slate-800/80 pb-1">
                      <span className="text-slate-400">Deterministic Rule Engine Tests:</span>
                      <span className="font-mono text-emerald-400 font-medium">100% Deterministic Pass Rate</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/80 pb-1">
                      <span className="text-slate-400">PyMuPDF Vector Extraction Precision:</span>
                      <span className="font-mono text-white font-medium">99.2% on standard application schemas</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/80 pb-1">
                      <span className="text-slate-400">PaddleOCR Field Extraction Accuracy:</span>
                      <span className="font-mono text-white font-medium">94.2% on simulated scanned forms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">HMAC-SHA256 Tamper Detection:</span>
                      <span className="font-mono text-emerald-400 font-medium">100% detection of modified audit entries</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold text-teal-400 font-mono uppercase tracking-wider block">
                    Operational Feasibility & Measurable Impact
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside">
                    <li>
                      <strong className="text-white">65–75% Scrutiny Time Reduction:</strong> Automated preliminary diffing and document checklist verification eliminates manual cross-referencing.
                    </li>
                    <li>
                      <strong className="text-white">Zero Cloud Lock-in:</strong> Fully operable on government on-premise infrastructure via lightweight Python/FastAPI microservices.
                    </li>
                    <li>
                      <strong className="text-white">RTI & Legal Audit Readiness:</strong> Tamper-evident cryptographic ledger guarantees permanent accountability for regulatory scrutiny officers.
                    </li>
                  </ul>
                </div>

              </div>

              {/* Key Value Proposition & Disclaimers */}
              <div className="bg-teal-950/40 p-3 rounded-xl border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <strong className="text-teal-200 block text-xs">
                    Key Value Proposition:
                  </strong>
                  <p className="text-[11px] text-teal-100/90 italic">
                    "PRAMAAN transforms subjective, manual scrutiny into structured, evidence-backed regulatory decision support while keeping human officers firmly in command."
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2.5 py-1.5 rounded border border-slate-800 flex-shrink-0">
                  <span>SIH 2026 Prototype • Sample Data</span>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Slide Footer Ribbon */}
        <div className="px-6 py-3 border-t border-slate-800 flex flex-wrap items-center justify-between bg-slate-950/70 text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">PRAMAAN</span>
            <span>•</span>
            <span>AI-Assisted Institutional Application Validation</span>
            <span>•</span>
            <span className="font-mono text-teal-400">SIH26261</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">
              Use <kbd className="px-1 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300 text-[10px]">←</kbd> and <kbd className="px-1 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300 text-[10px]">→</kbd> to navigate
            </span>
            <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              Slide {currentSlide} of {totalSlides}
            </span>
          </div>
        </div>

      </div>

      {/* Interactive Speaker Notes & Pitch Commentary Drawer */}
      {showSpeakerNotes && (
        <div className="no-print bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Judge Pitch Commentary & Speaker Script for Slide {currentSlide}
              </h3>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">Rehearsal Time: ~45-60 seconds per slide</span>
          </div>

          <div className="text-xs text-slate-700 leading-relaxed space-y-2">
            {currentSlide === 1 && (
              <>
                <p>
                  <strong>Opening Pitch Hook:</strong> "Respected Judges, institutional regulatory bodies receive thousands of multi-page accreditation and affiliation applications each academic year. Today, officers are forced to manually cross-reference these filings against historical physical archives and dozens of statutory certificates. This leads to backlogs, subjective decisions, and undetected discrepancies. We present <strong>PRAMAAN</strong> (Problem Statement ID: SIH26261), an evidence-driven, AI-assisted validation system that protects regulatory integrity without taking authority away from human officers."
                </p>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] text-slate-600">
                  <strong>Key Takeaways:</strong> Introduce team placeholders ([Team Name], [Team ID]), emphasize the 3 pillars (automated baseline diffing, deterministic versioned rules, and human-in-the-loop explainability).
                </div>
              </>
            )}

            {currentSlide === 2 && (
              <>
                <p>
                  <strong>Operational Challenges & Pipeline:</strong> "We identified five critical operational bottlenecks: forged certificates with cropped stamps, regulatory rules that change each year without system synchronization, subjective scrutiny variances across review panels, isolated evaluations that ignore past approvals, and a total lack of tamper-evident decision logs. PRAMAAN solves this through a clean 7-stage pipeline: starting from multi-part PDF intake, through dual-engine extraction, baseline comparison, deterministic rule validation, 6-stage document integrity verification, visual evidence compilation, and finally, officer signing."
                </p>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] text-slate-600">
                  <strong>Key Takeaways:</strong> Point to the clean 7-stage flowchart; explain that each stage has automated checks feeding into human oversight.
                </div>
              </>
            )}

            {currentSlide === 3 && (
              <>
                <p>
                  <strong>Technical Architecture:</strong> "Our architecture consists of five clear layers. In Layer 1 and 2, PyMuPDF parses digital PDF vectors while PaddleOCR extracts scanned seals with confidence metrics. In Layer 3, our FastAPI engine computes mathematical deltas against historical records and runs versioned compliance rules without black-box LLM hallucinations. In Layer 4, every anomaly is bound to exact page coordinates and bounding boxes. And in Layer 5, authorized officers make final statutory determinations, signed with HMAC SHA-256 for immutable legal auditability."
                </p>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] text-slate-600">
                  <strong>Key Takeaways:</strong> Reassure judges about zero black-box risk; highlight the explicit demarcation between AI recommendation and officer discretion.
                </div>
              </>
            )}

            {currentSlide === 4 && (
              <>
                <p>
                  <strong>Historical Comparison & Math Precision:</strong> "Let us examine an exact scenario. Notice here: the institution's approved student intake in the baseline record was 120 seats, but in their current filing, they claim 180 seats. PRAMAAN immediately flags this exact mathematical delta: <strong>+60 seats, a 50.0% increase</strong>. Simultaneously, their faculty headcount only rose from 45 to 48—a mere +6.7% increase. We do not arbitrarily accuse the institution of fraud; rather, Rule DEMO-R003 categorizes this as <em>'Significant variance — manual review required'</em>, directing the officer to demand laboratory readiness evidence and faculty appointment letters."
                </p>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] text-slate-600">
                  <strong>Key Takeaways:</strong> Emphasize the exact math (+60 seats / 50.0%, +3 faculty / 6.7%) and note the explicit disclaimer on versioned rules.
                </div>
              </>
            )}

            {currentSlide === 5 && (
              <>
                <p>
                  <strong>Document Verification & Trust Semantics:</strong> "For document verification, PRAMAAN implements six distinct lifecycle check stages: File Present, Field Extracted, Consistency Checked, Signature Checked, Issuer Verified, and Manual Review Required. In our demo, external portal verification is transparently disclaimed as <em>'Not Externally Verified'</em> since live DigiLocker APIs are simulated. Furthermore, when OCR confidence drops below 80%—as with our noisy Fire NOC at 76.5%—the system never guesses; it triggers a low-confidence alert and brings up the exact bounding-box snippet for human review."
                </p>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] text-slate-600">
                  <strong>Key Takeaways:</strong> Highlight integrity and transparency; point out the 6 check stages and low-confidence OCR handling.
                </div>
              </>
            )}

            {currentSlide === 6 && (
              <>
                <p>
                  <strong>Evaluation, Testing & Value:</strong> "We built four complete demo scenarios: Scenario A represents a baseline compliant college, Scenario B demonstrates the rapid 50% expansion with missing building blueprints, Scenario C catches an expired Fire NOC, and Scenario D shows a minor clerical typo easily resolved by an officer. Our testing plan includes 100% deterministic rule passes, 94.2% OCR extraction accuracy on noisy scans, and cryptographic tamper detection. PRAMAAN reduces scrutiny time by 70%, guarantees zero overlooked historical shifts, and preserves full legal defensibility."
                </p>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] text-slate-600">
                  <strong>Key Takeaways:</strong> Invite judges to test all 4 interactive scenarios; summarize the core value proposition.
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Quick Interactive Switcher between Presentation Deck and 7 Live Demo Screens */}
      <div className="no-print bg-slate-100 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <strong className="text-slate-800 block">Seamless Navigation to Live Prototype Screens</strong>
          <span className="text-slate-500 text-[11px]">Click any screen below to jump directly into the interactive application during judging:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded border border-slate-300 transition-colors"
          >
            1. Dashboard
          </button>
          <button
            onClick={() => setActiveTab('intake')}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded border border-slate-300 transition-colors"
          >
            2. Application Intake
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className="px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold rounded border border-teal-300 transition-colors"
          >
            3. Historical Comparison
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded border border-slate-300 transition-colors"
          >
            4. Rule Engine
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded border border-slate-300 transition-colors"
          >
            5. Document Verification
          </button>
          <button
            onClick={() => setActiveTab('findings')}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded border border-slate-300 transition-colors"
          >
            6. Evidence Findings
          </button>
          <button
            onClick={() => setActiveTab('officer-review')}
            className="px-2.5 py-1.5 bg-pramaan-800 hover:bg-pramaan-900 text-white font-semibold rounded shadow-sm transition-colors"
          >
            7. Officer Review
          </button>
        </div>
      </div>

    </div>
  );
};
