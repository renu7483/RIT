export type ChangeType = 'MATCH' | 'CHANGED' | 'MISSING' | 'NEWLY_ADDED' | 'REQUIRES_REVIEW';
export type Severity = 'CRITICAL' | 'WARNING' | 'INFO' | 'NORMAL';
export type RuleStatus = 'PASS' | 'FAIL' | 'WARNING' | 'MANUAL_REVIEW';
export type FindingCategory = 
  | 'Historical Record Mismatch' 
  | 'Missing Required Document' 
  | 'Document Expiry / Validity' 
  | 'Field Inconsistency' 
  | 'Compliance Check';

export type OfficerDecisionType = 'PENDING_REVIEW' | 'REQUEST_CORRECTION' | 'ESCALATE_REVIEW' | 'PROVISIONALLY_APPROVE';

export interface DocumentRecord {
  id: string;
  name: string;
  category: 
    | 'Institutional Application' 
    | 'Affiliation Document' 
    | 'Supporting Approval Document' 
    | 'Land & Infrastructure Deed' 
    | 'Faculty Affidavit & Cadre';
  isRequired: boolean;
  isPresent: boolean;
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
  expiryDate?: string; // YYYY-MM-DD
  isExpired?: boolean;
  extractedSampleFields: Record<string, string>;
  simulatedOcrStatus: 'Verified (High Quality)' | 'Partial Low Resolution' | 'Not Processed' | 'Missing File';
  simulatedQrStatus: 'Present - Valid Format' | 'No QR Detected' | 'Unsigned Payload' | 'Not Applicable';
  pdfSignatureStatus: 'Digital Certificate Embedded' | 'Self-Signed Demo Token' | 'No Signature' | 'Not Applicable';
  externalVerificationStatus: 'Not Externally Verified'; // Strictly disclaimed
  metadataWarnings: string[];
  recommendedAction: string;
  // Specific document check statuses required by prompt:
  checkStages: {
    present: boolean;
    extracted: boolean;
    consistencyChecked: boolean;
    signatureChecked: boolean;
    issuerVerified: 'Not Externally Verified' | 'Verified';
    manualReviewRequired: boolean;
  };
  ocrConfidence?: number; // e.g. 98.4
  lowConfidenceFlag?: boolean;
}

export interface ComparisonField {
  key: string;
  label: string;
  category: 'Identity & Legal' | 'Academic & Intake' | 'Infrastructure & Facilities' | 'Faculty & Cadre' | 'Regulatory Documentation';
  previousValue: string | number;
  currentValue: string | number;
  differenceCalc?: string; // e.g. "+60 seats (+50.0%)"
  changeType: ChangeType;
  severity: Severity;
  evidenceRef: string;
  explanation: string;
  reasonForReview: string;
  recommendedAction: string;
  ruleId?: string;
  pageReference?: string;
}

export interface ValidationRule {
  id: string; // e.g. DEMO-R001
  title: string;
  description: string;
  applicableAcademicYear: string;
  ruleVersion: string;
  effectiveDate: string;
  ruleClassification: 'Illustrative Demo Rule — Not an Official Regulatory Provision' | 'Official Provision';
  sourceLabel: string;
  conditionDescription: string;
  fieldsEvaluated: string[];
  recommendedOfficerAction: string;
}

export interface ValidationResult {
  ruleId: string;
  title: string;
  ruleVersion: string;
  effectiveDate: string;
  academicYear: string;
  ruleClassification: 'Illustrative Demo Rule — Not an Official Regulatory Provision' | 'Official Provision';
  sourceLabel: string;
  status: RuleStatus;
  severity: Severity;
  explanation: string;
  fieldsUsed: string[];
  evidenceReference: string;
  recommendedAction: string;
}

export interface Finding {
  id: string; // e.g. PRM-F-001
  category: FindingCategory;
  severity: Severity;
  summary: string;
  sourceDocument: string;
  pageNumber?: string | number;
  fieldName: string;
  previousValue?: string | number;
  currentValue?: string | number;
  relatedRuleId?: string;
  ruleVersion?: string;
  explanation: string;
  confidenceScore?: string; // Clearly labeled as illustrative
  recommendedAction: string;
  reviewStatus: 'PENDING' | 'ACKNOWLEDGED' | 'RESOLVED';
  evidenceSnippet?: {
    sourceTitle: string;
    pageLabel: string;
    excerpt: string;
    highlightText: string;
    baselineComparison?: string;
  };
}

export interface OfficerDecision {
  status: OfficerDecisionType;
  timestamp: string;
  officerName: string;
  officerRole: string;
  comments: string;
  actionTaken: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  applicationRef: string;
  action: string;
  actor: string;
  relatedFindingId?: string;
  officerComment?: string;
  statusChange?: string;
  isLocalDemo: boolean;
}

export interface ApplicationRecord {
  id: string; // e.g. 'PRM-2026-014'
  institutionName: string;
  institutionCode: string;
  academicYear: string;
  applicationType: string;
  submissionDate: string;
  currentRecord: {
    institutionName: string;
    applicationRef: string;
    approvedIntake: number;
    address: string;
    principalName: string;
    builtUpAreaSqM: number;
    computerLabsCount: number;
    totalFacultyCount: number;
    mandatoryDocumentStatus: string;
    affiliationStatus: string;
    fireSafetyCertValidity: string;
  };
  previousRecord: {
    institutionName: string;
    applicationRef: string;
    approvedIntake: number;
    address: string;
    principalName: string;
    builtUpAreaSqM: number;
    computerLabsCount: number;
    totalFacultyCount: number;
    mandatoryDocumentStatus: string;
    affiliationStatus: string;
    fireSafetyCertValidity: string;
  };
  documents: DocumentRecord[];
  officerDecision?: OfficerDecision;
}

export type ScenarioId = 'scenario-a' | 'scenario-b' | 'scenario-c' | 'scenario-d';

export interface DemoScenario {
  id: ScenarioId;
  name: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  description: string;
  application: ApplicationRecord;
}
