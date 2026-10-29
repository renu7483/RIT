import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { 
  ApplicationRecord, 
  ComparisonField, 
  ValidationResult, 
  Finding, 
  AuditEvent, 
  ScenarioId, 
  OfficerDecisionType, 
  DemoScenario 
} from '../types';
import { DEMO_SCENARIOS, INITIAL_AUDIT_LOGS } from '../data/scenarios';
import { runHistoricalComparison } from '../engine/comparisonEngine';
import { evaluateRegulatoryRules } from '../engine/ruleEngine';
import { generateEvidenceFindings } from '../engine/findingsEngine';

interface AppContextType {
  currentScenarioId: ScenarioId;
  scenario: DemoScenario;
  application: ApplicationRecord;
  comparisons: ComparisonField[];
  rules: ValidationResult[];
  findings: Finding[];
  auditEvents: AuditEvent[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedFindingId: string | null;
  setSelectedFindingId: (id: string | null) => void;
  selectedComparisonKey: string | null;
  setSelectedComparisonKey: (key: string | null) => void;
  isEvidenceDrawerOpen: boolean;
  setIsEvidenceDrawerOpen: (open: boolean) => void;
  openEvidenceForFinding: (findingId: string) => void;
  openEvidenceForComparison: (comparisonKey: string) => void;
  closeEvidenceDrawer: () => void;
  presentationMode: boolean;
  setPresentationMode: (val: boolean) => void;
  isValidating: boolean;
  switchScenario: (id: ScenarioId) => void;
  resetDemo: () => void;
  runValidationSimulation: () => Promise<void>;
  recordOfficerDecision: (decision: OfficerDecisionType, comments: string) => void;
  uploadedFiles: { name: string; size: string; type: string }[];
  addUploadedFile: (file: { name: string; size: string; type: string }) => void;
  removeUploadedFile: (index: number) => void;
  // Metrics helper
  metrics: {
    totalApplications: number;
    requireReviewCount: number;
    discrepancyCount: number;
    missingOrExpiredDocsCount: number;
    passedRulesCount: number;
    failedRulesCount: number;
    warningRulesCount: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Scenario state
  const [currentScenarioId, setCurrentScenarioId] = useState<ScenarioId>('scenario-b');
  
  // Clone initial scenario application so we can mutate local demo decisions
  const [application, setApplication] = useState<ApplicationRecord>(() => {
    return JSON.parse(JSON.stringify(DEMO_SCENARIOS['scenario-b'].application));
  });

  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(() => {
    return [...INITIAL_AUDIT_LOGS];
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedFindingId, setSelectedFindingId] = useState<string | null>('PRM-F-001');
  const [selectedComparisonKey, setSelectedComparisonKey] = useState<string | null>(null);
  const [isEvidenceDrawerOpen, setIsEvidenceDrawerOpen] = useState<boolean>(false);
  const [presentationMode, setPresentationMode] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; type: string }[]>([
    { name: 'PRM-APP-2026-MASTER.pdf', size: '4.8 MB', type: 'application/pdf' },
    { name: 'UNIV-AFFIL-2026-CONT.pdf', size: '2.1 MB', type: 'application/pdf' },
    { name: 'FIRE-SAFETY-NOC.pdf', size: '1.4 MB', type: 'application/pdf' }
  ]);

  const scenario = DEMO_SCENARIOS[currentScenarioId] || DEMO_SCENARIOS['scenario-b'];

  // Switch scenario handler
  const switchScenario = (id: ScenarioId) => {
    setCurrentScenarioId(id);
    const newApp = JSON.parse(JSON.stringify(DEMO_SCENARIOS[id].application));
    setApplication(newApp);

    // Update initial findings selection
    if (id === 'scenario-b') {
      setSelectedFindingId('PRM-F-001');
    } else if (id === 'scenario-c') {
      setSelectedFindingId('PRM-F-002');
    } else if (id === 'scenario-d') {
      setSelectedFindingId('PRM-F-004');
    } else {
      setSelectedFindingId('PRM-F-000');
    }

    // Add audit log for scenario switch
    const newLog: AuditEvent = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
      applicationRef: newApp.id,
      action: `Loaded Demo Scenario: ${DEMO_SCENARIOS[id].name}`,
      actor: 'Officer Session / Demo Switcher',
      statusChange: 'SCENARIO_SWITCHED',
      officerComment: `Loaded sample baseline for ${newApp.institutionName}.`,
      isLocalDemo: true
    };
    setAuditEvents(prev => [newLog, ...prev]);
  };

  // Reset demo handler
  const resetDemo = () => {
    switchScenario('scenario-b');
    setAuditEvents([...INITIAL_AUDIT_LOGS]);
    setIsEvidenceDrawerOpen(false);
    setSelectedComparisonKey(null);
    setUploadedFiles([
      { name: 'PRM-APP-2026-MASTER.pdf', size: '4.8 MB', type: 'application/pdf' },
      { name: 'UNIV-AFFIL-2026-CONT.pdf', size: '2.1 MB', type: 'application/pdf' },
      { name: 'FIRE-SAFETY-NOC.pdf', size: '1.4 MB', type: 'application/pdf' }
    ]);
  };

  // Dynamic calculations based strictly on current application
  const comparisons = useMemo(() => {
    return runHistoricalComparison(application);
  }, [application]);

  const rules = useMemo(() => {
    return evaluateRegulatoryRules(application, comparisons);
  }, [application, comparisons]);

  const findings = useMemo(() => {
    return generateEvidenceFindings(application, comparisons, rules);
  }, [application, comparisons, rules]);

  // Calculated Metrics for Dashboard and Reports
  const metrics = useMemo(() => {
    const hasDiscrepancy = comparisons.some(c => c.changeType === 'CHANGED' && c.severity === 'CRITICAL');
    const missingOrExpired = application.documents.filter(d => 
      (d.isRequired && !d.isPresent) || 
      (d.expiryDate && new Date(d.expiryDate).getTime() < new Date('2026-06-30').getTime())
    ).length;
    
    const passedRules = rules.filter(r => r.status === 'PASS').length;
    const failedRules = rules.filter(r => r.status === 'FAIL').length;
    const warningRules = rules.filter(r => r.status === 'WARNING' || r.status === 'MANUAL_REVIEW').length;

    const needsReview = findings.some(f => f.severity === 'CRITICAL' || f.severity === 'WARNING') ||
      !application.officerDecision;

    return {
      totalApplications: 4, // 4 demo applications in cohort
      requireReviewCount: needsReview ? 1 : 0,
      discrepancyCount: hasDiscrepancy ? 1 : 0,
      missingOrExpiredDocsCount: missingOrExpired,
      passedRulesCount: passedRules,
      failedRulesCount: failedRules,
      warningRulesCount: warningRules
    };
  }, [comparisons, application, rules, findings]);

  // Open evidence drawer for a specific finding
  const openEvidenceForFinding = (findingId: string) => {
    setSelectedFindingId(findingId);
    const f = findings.find(item => item.id === findingId);
    if (f) {
      const matchComp = comparisons.find(c => c.label.toLowerCase().includes(f.fieldName.toLowerCase()));
      if (matchComp) setSelectedComparisonKey(matchComp.key);
    }
    setIsEvidenceDrawerOpen(true);
  };

  // Open evidence drawer for a specific comparison field
  const openEvidenceForComparison = (comparisonKey: string) => {
    setSelectedComparisonKey(comparisonKey);
    const comp = comparisons.find(c => c.key === comparisonKey);
    if (comp) {
      const matchFinding = findings.find(f => f.fieldName.toLowerCase().includes(comp.label.toLowerCase()) || f.relatedRuleId === comp.ruleId);
      if (matchFinding) setSelectedFindingId(matchFinding.id);
    }
    setIsEvidenceDrawerOpen(true);
  };

  const closeEvidenceDrawer = () => {
    setIsEvidenceDrawerOpen(false);
  };

  // Simulated run validation with realistic progress
  const runValidationSimulation = async () => {
    setIsValidating(true);
    // simulated 1.2s verification time
    await new Promise(res => setTimeout(res, 1200));
    setIsValidating(false);
    
    const newLog: AuditEvent = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
      applicationRef: application.id,
      action: 'Full Regulatory & Historical Validation Re-Executed',
      actor: 'Authorized Officer / Re-run Action',
      statusChange: 'VALIDATION_COMPLETED',
      officerComment: `Re-ran automated pipeline across 5 regulatory rules and ${comparisons.length} baseline comparison fields.`,
      isLocalDemo: true
    };
    setAuditEvents(prev => [newLog, ...prev]);
  };

  // Record authorized officer decision
  const recordOfficerDecision = (decision: OfficerDecisionType, comments: string) => {
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST';
    const decisionRecord = {
      status: decision,
      timestamp,
      officerName: 'Shri A. K. Verma',
      officerRole: 'Senior Scrutiny Officer, AICTE Regional Directorate',
      comments: comments || 'Officer review completed based on evidence-linked findings.',
      actionTaken: decision === 'REQUEST_CORRECTION' 
        ? 'Deficiency notice dispatched to institution portal' 
        : decision === 'ESCALATE_REVIEW' 
        ? 'Referred to Standing Appellate Committee (SAC)' 
        : 'Provisionally recommended for scrutiny clearance'
    };

    setApplication(prev => ({
      ...prev,
      officerDecision: decisionRecord
    }));

    // Add audit trail event
    const newLog: AuditEvent = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp,
      applicationRef: application.id,
      action: `Officer Decision Recorded: ${decision.replace('_', ' ')}`,
      actor: 'Shri A. K. Verma (Officer ID: OFF-8821)',
      relatedFindingId: selectedFindingId || 'ALL-FINDINGS',
      statusChange: `REVIEW_STATUS -> ${decision}`,
      officerComment: comments,
      isLocalDemo: true
    };

    setAuditEvents(prev => [newLog, ...prev]);
  };

  // File upload simulation
  const addUploadedFile = (file: { name: string; size: string; type: string }) => {
    setUploadedFiles(prev => [...prev, file]);
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AppContext.Provider
      value={{
        currentScenarioId,
        scenario,
        application,
        comparisons,
        rules,
        findings,
        auditEvents,
        activeTab,
        setActiveTab,
        selectedFindingId,
        setSelectedFindingId,
        selectedComparisonKey,
        setSelectedComparisonKey,
        isEvidenceDrawerOpen,
        setIsEvidenceDrawerOpen,
        openEvidenceForFinding,
        openEvidenceForComparison,
        closeEvidenceDrawer,
        presentationMode,
        setPresentationMode,
        isValidating,
        switchScenario,
        resetDemo,
        runValidationSimulation,
        recordOfficerDecision,
        uploadedFiles,
        addUploadedFile,
        removeUploadedFile,
        metrics
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
