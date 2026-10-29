import { ApplicationRecord, ComparisonField } from '../types';

export function runHistoricalComparison(application: ApplicationRecord): ComparisonField[] {
  const prev = application.previousRecord;
  const curr = application.currentRecord;

  const intakeDelta = curr.approvedIntake - prev.approvedIntake;
  const intakeDeltaPct = prev.approvedIntake > 0 ? ((intakeDelta / prev.approvedIntake) * 100).toFixed(1) : '0';

  const facultyDelta = curr.totalFacultyCount - prev.totalFacultyCount;
  const facultyDeltaPct = prev.totalFacultyCount > 0 ? ((facultyDelta / prev.totalFacultyCount) * 100).toFixed(1) : '0';

  const fields: ComparisonField[] = [
    {
      key: 'institutionName',
      label: 'Institution Name',
      category: 'Identity & Legal',
      previousValue: prev.institutionName,
      currentValue: curr.institutionName,
      differenceCalc: prev.institutionName === curr.institutionName ? 'Exact Match (0% delta)' : 'Title Altered',
      changeType: prev.institutionName === curr.institutionName ? 'MATCH' : 'CHANGED',
      severity: prev.institutionName === curr.institutionName ? 'NORMAL' : 'CRITICAL',
      evidenceRef: 'DOC-REG-MASTER / Clause 1.1',
      explanation: prev.institutionName === curr.institutionName 
        ? 'Legal entity and registered institution title match historical AICTE records exactly.' 
        : 'Entity name has changed without associated Gazette change-of-name order.',
      reasonForReview: prev.institutionName === curr.institutionName
        ? 'Identity confirmed against master baseline.'
        : 'Name variation requires Gazette notification and trust deed amendment.',
      recommendedAction: prev.institutionName === curr.institutionName
        ? 'Baseline verified against official records.'
        : 'Demand certified trust resolution and state government gazette notification.',
      pageReference: 'Current EoA Form, Page 1'
    },
    {
      key: 'approvedIntake',
      label: 'Approved Intake (Total Seats)',
      category: 'Academic & Intake',
      previousValue: `${prev.approvedIntake} seats`,
      currentValue: `${curr.approvedIntake} seats`,
      differenceCalc: intakeDelta !== 0 
        ? `+${intakeDelta} seats (+${intakeDeltaPct}%)` 
        : '0 seats (Exact Match)',
      changeType: prev.approvedIntake === curr.approvedIntake ? 'MATCH' : 'CHANGED',
      severity: prev.approvedIntake === curr.approvedIntake ? 'NORMAL' : 'CRITICAL',
      evidenceRef: 'DOC-SANCTION-FY25 / Page 3 & Current EoA Page 3',
      explanation: prev.approvedIntake === curr.approvedIntake
        ? 'Total student intake matches previously sanctioned baseline.'
        : `Significant variance — manual review required: Current application seeks ${curr.approvedIntake} seats vs previously sanctioned baseline of ${prev.approvedIntake} seats (+${intakeDelta} seats, equivalent to a ${intakeDeltaPct}% increase). This discrepancy requires verification of supporting state NOC and university expansion orders without declaring non-compliance prematurely.`,
      reasonForReview: intakeDelta !== 0
        ? `Intake variance of +${intakeDelta} seats (+${intakeDeltaPct}%) exceeds baseline sanction; requires verification of state government and university expansion approvals.`
        : 'Sanctioned intake capacity preserved.',
      recommendedAction: prev.approvedIntake === curr.approvedIntake
        ? 'Retain sanctioned capacity.'
        : 'Review university affiliation expansion letter and state Directorate of Technical Education clearance.',
      ruleId: 'DEMO-R003',
      pageReference: 'Current EoA Form, Page 3, Table 4.2'
    },
    {
      key: 'applicationRef',
      label: 'Application Reference ID',
      category: 'Identity & Legal',
      previousValue: prev.applicationRef,
      currentValue: curr.applicationRef,
      differenceCalc: 'Annual cycle transition (2025 ➔ 2026)',
      changeType: 'CHANGED',
      severity: 'INFO',
      evidenceRef: 'Portal Tracking Header',
      explanation: 'Application reference differs as expected for a new annual cycle (PRM-2025 cycle vs PRM-2026 cycle). Assessed according to routine field semantics.',
      reasonForReview: 'Routine chronological cycle update; verify sequence tracking.',
      recommendedAction: 'Verify chronological sequence of portal submission tracking.',
      pageReference: 'Header Metadata Block'
    },
    {
      key: 'address',
      label: 'Permanent Campus Physical Address',
      category: 'Identity & Legal',
      previousValue: prev.address,
      currentValue: curr.address,
      differenceCalc: prev.address === curr.address ? 'Exact Match' : 'Address Variance',
      changeType: prev.address === curr.address ? 'MATCH' : 'CHANGED',
      severity: prev.address === curr.address ? 'NORMAL' : 'WARNING',
      evidenceRef: 'Land Deed Registration #4829',
      explanation: prev.address === curr.address
        ? 'Physical geo-location and campus municipal address match official baseline.'
        : 'Campus address change detected. Shifting campus requires formal site relocation approval.',
      reasonForReview: prev.address === curr.address
        ? 'Physical location confirmed on record.'
        : 'Physical relocation requires land conversion and municipal approval scrutiny.',
      recommendedAction: prev.address === curr.address
        ? 'Standard address confirmation.'
        : 'Request survey office certificate and site relocation clearance.',
      pageReference: 'Current EoA Form, Page 2'
    },
    {
      key: 'principalName',
      label: 'Head of Institution / Principal',
      category: 'Faculty & Cadre',
      previousValue: prev.principalName,
      currentValue: curr.principalName,
      differenceCalc: prev.principalName === curr.principalName ? 'Exact Match' : 'Succession / New Appointment',
      changeType: prev.principalName === curr.principalName ? 'MATCH' : 'REQUIRES_REVIEW',
      severity: prev.principalName === curr.principalName ? 'NORMAL' : 'WARNING',
      evidenceRef: 'Faculty Selection Committee Minutes',
      explanation: prev.principalName === curr.principalName
        ? 'Approved principal on record continues tenure.'
        : `Principal changed from "${prev.principalName}" to "${curr.principalName}". Succession requires university endorsement check.`,
      reasonForReview: prev.principalName === curr.principalName
        ? 'Tenure stability documented.'
        : 'New Principal appointment requires University Selection Board ratification.',
      recommendedAction: prev.principalName === curr.principalName
        ? 'Tenure documented.'
        : 'Examine University Selection Board ratification for new Principal appointment.',
      pageReference: 'Faculty Affidavit Schedule, Page 1'
    },
    {
      key: 'builtUpAreaSqM',
      label: 'Instructional & Administrative Built-Up Area',
      category: 'Infrastructure & Facilities',
      previousValue: `${prev.builtUpAreaSqM} sq.m`,
      currentValue: `${curr.builtUpAreaSqM} sq.m`,
      differenceCalc: prev.builtUpAreaSqM === curr.builtUpAreaSqM ? '0 sq.m (Exact Match)' : `${curr.builtUpAreaSqM - prev.builtUpAreaSqM} sq.m variance`,
      changeType: prev.builtUpAreaSqM === curr.builtUpAreaSqM ? 'MATCH' : 'CHANGED',
      severity: prev.builtUpAreaSqM >= curr.builtUpAreaSqM ? 'NORMAL' : 'INFO',
      evidenceRef: 'Architect Plan & Municipal Completion Certificate',
      explanation: prev.builtUpAreaSqM === curr.builtUpAreaSqM
        ? 'Total built-up instructional area matches approved master site plan.'
        : `Total physical built-up space updated from ${prev.builtUpAreaSqM} sq.m to ${curr.builtUpAreaSqM} sq.m.`,
      reasonForReview: 'Verify instructional area against sanctioned floor drawings.',
      recommendedAction: 'Cross-check against registered municipal completion drawing.',
      pageReference: 'Infrastructure Schedule B, Page 5'
    },
    {
      key: 'computerLabsCount',
      label: 'Accredited Computer Laboratories',
      category: 'Infrastructure & Facilities',
      previousValue: `${prev.computerLabsCount} Labs`,
      currentValue: `${curr.computerLabsCount} Labs`,
      differenceCalc: prev.computerLabsCount === curr.computerLabsCount ? '0 Labs (Exact Match)' : `${curr.computerLabsCount - prev.computerLabsCount} Labs`,
      changeType: prev.computerLabsCount === curr.computerLabsCount ? 'MATCH' : 'CHANGED',
      severity: 'NORMAL',
      evidenceRef: 'Facility Audit Report 2025',
      explanation: 'Lab count meets or exceeds minimum regulatory computing facilities prescribed per 100 students.',
      reasonForReview: 'Computing facilities meet baseline quota.',
      recommendedAction: 'Confirm terminal hardware specifications in lab audit sheet.',
      pageReference: 'Infrastructure Schedule C, Page 7'
    },
    {
      key: 'totalFacultyCount',
      label: 'Sanctioned Full-Time Teaching Faculty',
      category: 'Faculty & Cadre',
      previousValue: `${prev.totalFacultyCount} Faculty`,
      currentValue: `${curr.totalFacultyCount} Faculty`,
      differenceCalc: facultyDelta !== 0 
        ? `+${facultyDelta} faculty (+${facultyDeltaPct}%)` 
        : '0 faculty (Exact Match)',
      changeType: prev.totalFacultyCount === curr.totalFacultyCount ? 'MATCH' : 'CHANGED',
      severity: (curr.approvedIntake > prev.approvedIntake && facultyDelta < 6) ? 'WARNING' : 'NORMAL',
      evidenceRef: 'Faculty Biometric Attendance & Payroll Register',
      explanation: prev.totalFacultyCount === curr.totalFacultyCount
        ? 'Faculty strength unchanged.'
        : `Faculty growth scrutiny: Intake increased by ${intakeDeltaPct}% (+${intakeDelta} seats), while teaching faculty increased by approximately ${facultyDeltaPct}% (+${facultyDelta} faculty members, from ${prev.totalFacultyCount} to ${curr.totalFacultyCount}). Flagged as a warning requiring review of faculty appointment ratifications, without asserting an unverified violation.`,
      reasonForReview: (curr.approvedIntake > prev.approvedIntake && facultyDelta < 6)
        ? `Intake grew by ${intakeDeltaPct}% while faculty increased by only ${facultyDeltaPct}%; requires scrutiny of recruitment orders.`
        : 'Faculty staffing count stable.',
      recommendedAction: 'Scrutinize university teacher selection committee notifications and biometric roster.',
      ruleId: 'DEMO-R005',
      pageReference: 'Faculty Roll Schedule, Page 3'
    },
    {
      key: 'mandatoryDocumentStatus',
      label: 'Mandatory Statutory Documents Schedule',
      category: 'Regulatory Documentation',
      previousValue: prev.mandatoryDocumentStatus,
      currentValue: curr.mandatoryDocumentStatus,
      differenceCalc: curr.mandatoryDocumentStatus.includes('Missing') ? 'Checklist Omission' : 'All Attached',
      changeType: curr.mandatoryDocumentStatus.includes('Missing') ? 'MISSING' : 'MATCH',
      severity: curr.mandatoryDocumentStatus.includes('Missing') ? 'CRITICAL' : 'NORMAL',
      evidenceRef: 'Document Repository Checklist Table',
      explanation: curr.mandatoryDocumentStatus.includes('Missing')
        ? 'Missing required statutory documentation detected in submitted application bundle.'
        : 'All baseline required statutory annexures are attached.',
      reasonForReview: curr.mandatoryDocumentStatus.includes('Missing')
        ? 'Core statutory checklist requirement missing from intake packet.'
        : 'Checklist requirements fulfilled.',
      recommendedAction: curr.mandatoryDocumentStatus.includes('Missing')
        ? 'Issue statutory deficiency memo.'
        : 'Check document signatures.',
      ruleId: 'DEMO-R001',
      pageReference: 'Annexure Intake Checklist'
    },
    {
      key: 'fireSafetyCertValidity',
      label: 'Fire Safety & Structural Certificate Validity',
      category: 'Regulatory Documentation',
      previousValue: prev.fireSafetyCertValidity,
      currentValue: curr.fireSafetyCertValidity,
      differenceCalc: curr.fireSafetyCertValidity.includes('Expired') ? 'Validity Lapsed' : 'Valid',
      changeType: curr.fireSafetyCertValidity.includes('Expired') ? 'REQUIRES_REVIEW' : 'MATCH',
      severity: curr.fireSafetyCertValidity.includes('Expired') ? 'CRITICAL' : 'NORMAL',
      evidenceRef: 'State Fire Service Dept NOC Certificate',
      explanation: curr.fireSafetyCertValidity.includes('Expired')
        ? `Certificate is past its statutory validity date (${curr.fireSafetyCertValidity}). Institution cannot operate without active life safety clearance.`
        : 'Fire safety certificate is active and valid through the upcoming academic year.',
      reasonForReview: curr.fireSafetyCertValidity.includes('Expired')
        ? 'Life safety compliance certificate lapsed prior to approval period cutoff.'
        : 'Certificate validity active.',
      recommendedAction: curr.fireSafetyCertValidity.includes('Expired')
        ? 'Reject continuation until current renewed Fire NOC is provided.'
        : 'Confirm issuing fire officer jurisdiction.',
      ruleId: 'DEMO-R002',
      pageReference: 'Statutory Annexure 8'
    }
  ];

  return fields;
}
