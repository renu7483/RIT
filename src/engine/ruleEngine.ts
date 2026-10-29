import { ValidationRule, ApplicationRecord, ComparisonField, ValidationResult } from '../types';

export const DEMO_RULES: ValidationRule[] = [
  {
    id: 'DEMO-R001',
    title: 'Mandatory Supporting Document Presence',
    description: 'Statutory supporting documents marked as mandatory for Extension of Approval (EoA) or intake variation must be attached and present.',
    applicableAcademicYear: '2026-27',
    ruleVersion: 'v2026.1-demo',
    effectiveDate: '2026-01-01',
    ruleClassification: 'Illustrative Demo Rule — Not an Official Regulatory Provision',
    sourceLabel: 'Illustrative demo rule — Official source mapping pending',
    conditionDescription: 'Verify that every statutory document with isRequired=true is present in the application bundle.',
    fieldsEvaluated: ['documents.isRequired', 'documents.isPresent'],
    recommendedOfficerAction: 'Issue formal discrepancy notice requiring submission of missing statutory document before scrutiny finalization.'
  },
  {
    id: 'DEMO-R002',
    title: 'Statutory Safety & Approval Temporal Validity',
    description: 'Certificates subject to fixed expiry (e.g., Fire Safety NOC, Structural Stability) must remain valid across the academic approval cycle.',
    applicableAcademicYear: '2026-27',
    ruleVersion: 'v2026.1-demo',
    effectiveDate: '2026-01-01',
    ruleClassification: 'Illustrative Demo Rule — Not an Official Regulatory Provision',
    sourceLabel: 'Illustrative demo rule — Infrastructure Safety Compliance Framework (Demo Clause §6.1)',
    conditionDescription: 'Verify expiryDate >= current review cutoff date (2026-06-30 for AY 2026-27).',
    fieldsEvaluated: ['documents.expiryDate', 'fireSafetyCertValidity'],
    recommendedOfficerAction: 'Flag document as expired. Require updated renewal certificate endorsed by competent municipal/state authority.'
  },
  {
    id: 'DEMO-R003',
    title: 'Historical Baseline Intake Variation Threshold',
    description: 'Any variance between current applied intake and the previously sanctioned institutional record requires supporting government and university approval orders.',
    applicableAcademicYear: '2026-27',
    ruleVersion: 'v2026.2-demo',
    effectiveDate: '2026-01-01',
    ruleClassification: 'Illustrative Demo Rule — Not an Official Regulatory Provision',
    sourceLabel: 'Illustrative demo rule — Institutional Baseline Continuity Standard (Demo Clause §3.4)',
    conditionDescription: 'Evaluate approvedIntake in current application vs approvedIntake in previous official record. If delta != 0, flag as Significant variance — manual review required.',
    fieldsEvaluated: ['currentRecord.approvedIntake', 'previousRecord.approvedIntake'],
    recommendedOfficerAction: 'Cross-verify against physical State Government NOC and University Affiliation Expansion Order in demo evidence drawer.'
  },
  {
    id: 'DEMO-R004',
    title: 'Mandatory Institutional Identity Completeness',
    description: 'Core institutional identifiers including Institute Name, Permanent Reference Code, Official Physical Address, and Head of Institution must not be null or blank.',
    applicableAcademicYear: '2026-27',
    ruleVersion: 'v2026.1-demo',
    effectiveDate: '2026-01-01',
    ruleClassification: 'Illustrative Demo Rule — Not an Official Regulatory Provision',
    sourceLabel: 'Official source mapping pending',
    conditionDescription: 'Ensure institutionName, address, and principalName are populated, non-empty strings.',
    fieldsEvaluated: ['institutionName', 'address', 'principalName'],
    recommendedOfficerAction: 'Request immediate clerical rectification before processing application.'
  },
  {
    id: 'DEMO-R005',
    title: 'Faculty-to-Intake Expansion Consistency Check',
    description: 'Where student intake is expanded significantly over baseline, reported teaching faculty strength should be scrutinized for proportional expansion.',
    applicableAcademicYear: '2026-27',
    ruleVersion: 'v2026.1-demo',
    effectiveDate: '2026-01-01',
    ruleClassification: 'Illustrative Demo Rule — Not an Official Regulatory Provision',
    sourceLabel: 'Illustrative demo rule — Official source mapping pending',
    conditionDescription: 'If intake increases by >=30% and faculty growth is <15%, flag warning for manual review of faculty rolls and recruitment orders.',
    fieldsEvaluated: ['approvedIntake', 'totalFacultyCount'],
    recommendedOfficerAction: 'Examine faculty recruitment notifications, selection committee minutes, and payroll roster to corroborate staff adequacy.'
  }
];

export function evaluateRegulatoryRules(
  application: ApplicationRecord,
  _comparisons?: ComparisonField[]
): ValidationResult[] {
  const results: ValidationResult[] = [];

  // DEMO-R001: Required Supporting Document Presence
  const missingDocs = application.documents.filter(d => d.isRequired && !d.isPresent);
  const ruleR001 = DEMO_RULES.find(r => r.id === 'DEMO-R001')!;
  if (missingDocs.length > 0) {
    results.push({
      ruleId: ruleR001.id,
      title: ruleR001.title,
      ruleVersion: ruleR001.ruleVersion,
      effectiveDate: ruleR001.effectiveDate,
      academicYear: ruleR001.applicableAcademicYear,
      ruleClassification: ruleR001.ruleClassification,
      sourceLabel: ruleR001.sourceLabel,
      status: 'FAIL',
      severity: 'CRITICAL',
      explanation: `Missing ${missingDocs.length} mandatory document(s): ${missingDocs.map(d => `"${d.name}"`).join(', ')}. Regulatory rules mandate all core statutory submissions be attached prior to scrutiny.`,
      fieldsUsed: missingDocs.map(d => `documents.${d.id}`),
      evidenceReference: 'Checklist Item: Mandatory Document Schedule A',
      recommendedAction: ruleR001.recommendedOfficerAction
    });
  } else {
    results.push({
      ruleId: ruleR001.id,
      title: ruleR001.title,
      ruleVersion: ruleR001.ruleVersion,
      effectiveDate: ruleR001.effectiveDate,
      academicYear: ruleR001.applicableAcademicYear,
      ruleClassification: ruleR001.ruleClassification,
      sourceLabel: ruleR001.sourceLabel,
      status: 'PASS',
      severity: 'NORMAL',
      explanation: `All ${application.documents.filter(d => d.isRequired).length} mandatory required statutory documents are present and attached.`,
      fieldsUsed: ['documents.isRequired', 'documents.isPresent'],
      evidenceReference: 'Document Intake Repository',
      recommendedAction: 'No action needed. Document availability requirement satisfied.'
    });
  }

  // DEMO-R002: Document Expiry Check (Dynamic date calculation)
  const ruleR002 = DEMO_RULES.find(r => r.id === 'DEMO-R002')!;
  const reviewCutoff = new Date('2026-06-30').getTime();
  const expiredDocs = application.documents.filter(d => {
    if (!d.expiryDate || !d.isPresent) return false;
    const exp = new Date(d.expiryDate).getTime();
    return exp < reviewCutoff;
  });

  if (expiredDocs.length > 0) {
    results.push({
      ruleId: ruleR002.id,
      title: ruleR002.title,
      ruleVersion: ruleR002.ruleVersion,
      effectiveDate: ruleR002.effectiveDate,
      academicYear: ruleR002.applicableAcademicYear,
      ruleClassification: ruleR002.ruleClassification,
      sourceLabel: ruleR002.sourceLabel,
      status: 'FAIL',
      severity: 'CRITICAL',
      explanation: `Identified ${expiredDocs.length} expired statutory certificate(s): ${expiredDocs.map(d => `"${d.name}" (Expired: ${d.expiryDate})`).join(', ')}. Expired prior to the mandatory approval period cutoff (2026-06-30).`,
      fieldsUsed: expiredDocs.map(d => `document.${d.id}.expiryDate`),
      evidenceReference: expiredDocs.map(d => `${d.name} — Validity Clause`).join('; '),
      recommendedAction: ruleR002.recommendedOfficerAction
    });
  } else {
    const datedDocs = application.documents.filter(d => d.expiryDate && d.isPresent);
    results.push({
      ruleId: ruleR002.id,
      title: ruleR002.title,
      ruleVersion: ruleR002.ruleVersion,
      effectiveDate: ruleR002.effectiveDate,
      academicYear: ruleR002.applicableAcademicYear,
      ruleClassification: ruleR002.ruleClassification,
      sourceLabel: ruleR002.sourceLabel,
      status: 'PASS',
      severity: 'NORMAL',
      explanation: `All dated certificates (${datedDocs.length} checked) possess valid future expiration dates extending beyond the review period.`,
      fieldsUsed: ['documents.expiryDate'],
      evidenceReference: 'Statutory Certificates Index',
      recommendedAction: 'No action needed. Temporal validity confirmed.'
    });
  }

  // DEMO-R003: Historical Baseline Intake Variation Threshold
  const ruleR003 = DEMO_RULES.find(r => r.id === 'DEMO-R003')!;
  const prevIntake = application.previousRecord.approvedIntake;
  const currIntake = application.currentRecord.approvedIntake;
  const intakeDelta = currIntake - prevIntake;
  const intakePercent = prevIntake > 0 ? ((intakeDelta / prevIntake) * 100).toFixed(1) : '0';

  if (intakeDelta !== 0) {
    results.push({
      ruleId: ruleR003.id,
      title: ruleR003.title,
      ruleVersion: ruleR003.ruleVersion,
      effectiveDate: ruleR003.effectiveDate,
      academicYear: ruleR003.applicableAcademicYear,
      ruleClassification: ruleR003.ruleClassification,
      sourceLabel: ruleR003.sourceLabel,
      status: 'MANUAL_REVIEW',
      severity: 'WARNING',
      explanation: `Significant variance — manual review required: Previous approved intake is ${prevIntake} seats, but current application requests ${currIntake} seats (+${intakeDelta} seats, equivalent to a ${intakePercent}% increase). This discrepancy requires officer review of supporting university affiliation expansion orders without prematurely declaring non-compliance.`,
      fieldsUsed: ['currentRecord.approvedIntake', 'previousRecord.approvedIntake'],
      evidenceReference: 'Historical Record PRM-2025 vs Current Intake Schedule Page 3',
      recommendedAction: ruleR003.recommendedOfficerAction
    });
  } else {
    results.push({
      ruleId: ruleR003.id,
      title: ruleR003.title,
      ruleVersion: ruleR003.ruleVersion,
      effectiveDate: ruleR003.effectiveDate,
      academicYear: ruleR003.applicableAcademicYear,
      ruleClassification: ruleR003.ruleClassification,
      sourceLabel: ruleR003.sourceLabel,
      status: 'PASS',
      severity: 'NORMAL',
      explanation: `Current applied intake (${currIntake}) matches historical verified sanction (${prevIntake}) exactly with 0% delta.`,
      fieldsUsed: ['currentRecord.approvedIntake', 'previousRecord.approvedIntake'],
      evidenceReference: 'Previous Sanction Master PRM-2025',
      recommendedAction: 'No action needed. Baseline intake consistency confirmed.'
    });
  }

  // DEMO-R004: Mandatory Application Core Fields Completeness
  const ruleR004 = DEMO_RULES.find(r => r.id === 'DEMO-R004')!;
  const missingCoreFields: string[] = [];
  if (!application.currentRecord.institutionName) missingCoreFields.push('Institution Name');
  if (!application.currentRecord.address) missingCoreFields.push('Physical Address');
  if (!application.currentRecord.principalName) missingCoreFields.push('Principal / Director Name');

  if (missingCoreFields.length > 0) {
    results.push({
      ruleId: ruleR004.id,
      title: ruleR004.title,
      ruleVersion: ruleR004.ruleVersion,
      effectiveDate: ruleR004.effectiveDate,
      academicYear: ruleR004.applicableAcademicYear,
      ruleClassification: ruleR004.ruleClassification,
      sourceLabel: ruleR004.sourceLabel,
      status: 'FAIL',
      severity: 'CRITICAL',
      explanation: `Mandatory core fields are blank: ${missingCoreFields.join(', ')}.`,
      fieldsUsed: missingCoreFields,
      evidenceReference: 'Application Header Metadata',
      recommendedAction: ruleR004.recommendedOfficerAction
    });
  } else {
    results.push({
      ruleId: ruleR004.id,
      title: ruleR004.title,
      ruleVersion: ruleR004.ruleVersion,
      effectiveDate: ruleR004.effectiveDate,
      academicYear: ruleR004.applicableAcademicYear,
      ruleClassification: ruleR004.ruleClassification,
      sourceLabel: ruleR004.sourceLabel,
      status: 'PASS',
      severity: 'NORMAL',
      explanation: 'All mandatory identity and location fields are fully populated and non-blank.',
      fieldsUsed: ['institutionName', 'address', 'principalName'],
      evidenceReference: 'Application Master Metadata',
      recommendedAction: 'Pass - Core metadata validated.'
    });
  }

  // DEMO-R005: Faculty-to-Intake Warning (accurate percentages & no fake ratios)
  const ruleR005 = DEMO_RULES.find(r => r.id === 'DEMO-R005')!;
  const prevFac = application.previousRecord.totalFacultyCount;
  const currFac = application.currentRecord.totalFacultyCount;
  const facDelta = currFac - prevFac;
  const intakeGrowthPercent = prevIntake > 0 ? ((intakeDelta / prevIntake) * 100) : 0;
  const facultyGrowthPercent = prevFac > 0 ? ((facDelta / prevFac) * 100) : 0;

  if (intakeGrowthPercent >= 30 && facultyGrowthPercent < 15) {
    results.push({
      ruleId: ruleR005.id,
      title: ruleR005.title,
      ruleVersion: ruleR005.ruleVersion,
      effectiveDate: ruleR005.effectiveDate,
      academicYear: ruleR005.applicableAcademicYear,
      ruleClassification: ruleR005.ruleClassification,
      sourceLabel: ruleR005.sourceLabel,
      status: 'WARNING',
      severity: 'WARNING',
      explanation: `Faculty growth scrutiny warning: Intake increased by ${intakeGrowthPercent.toFixed(1)}% (+${intakeDelta} seats, from ${prevIntake} to ${currIntake}), while reported teaching faculty increased by approximately ${facultyGrowthPercent.toFixed(1)}% (+${facDelta} faculty members, from ${prevFac} to ${currFac}). This is flagged as a warning requiring manual review of faculty rolls and appointment ratifications, without asserting a confirmed regulatory breach.`,
      fieldsUsed: ['currentRecord.approvedIntake', 'currentRecord.totalFacultyCount'],
      evidenceReference: 'Faculty Roll Schedule C vs Intake Expansion Request',
      recommendedAction: ruleR005.recommendedOfficerAction
    });
  } else {
    results.push({
      ruleId: ruleR005.id,
      title: ruleR005.title,
      ruleVersion: ruleR005.ruleVersion,
      effectiveDate: ruleR005.effectiveDate,
      academicYear: ruleR005.applicableAcademicYear,
      ruleClassification: ruleR005.ruleClassification,
      sourceLabel: ruleR005.sourceLabel,
      status: 'PASS',
      severity: 'NORMAL',
      explanation: `Reported faculty strength (${currFac} faculty members for ${currIntake} applied intake) satisfies baseline screening threshold.`,
      fieldsUsed: ['currentRecord.approvedIntake', 'currentRecord.totalFacultyCount'],
      evidenceReference: 'Faculty Affidavit Summary Table',
      recommendedAction: 'No action needed. Staffing roster conforms with baseline screening.'
    });
  }

  return results;
}
