import { DemoScenario, DocumentRecord } from '../types';

const BASE_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'DOC-01',
    name: 'Institutional Master Application Form',
    category: 'Institutional Application',
    isRequired: true,
    isPresent: true,
    fileName: 'PRM-APP-2026-MASTER.pdf',
    fileSize: '4.8 MB',
    uploadDate: '2026-02-14',
    extractedSampleFields: {
      'Institution Name': 'ABC Institute of Technology',
      'Applied Academic Year': '2026-27',
      'Principal In-Charge': 'Dr. K. R. Ramanathan',
      'Permanent Institute Code': '1-1402931'
    },
    simulatedOcrStatus: 'Verified (High Quality)',
    simulatedQrStatus: 'Present - Valid Format',
    pdfSignatureStatus: 'Digital Certificate Embedded',
    externalVerificationStatus: 'Not Externally Verified',
    metadataWarnings: [],
    recommendedAction: 'Internal checksum validated. Ready for comparative audit.',
    checkStages: {
      present: true,
      extracted: true,
      consistencyChecked: true,
      signatureChecked: true,
      issuerVerified: 'Not Externally Verified',
      manualReviewRequired: false
    },
    ocrConfidence: 98.4,
    lowConfidenceFlag: false
  },
  {
    id: 'DOC-02',
    name: 'University Affiliation Continuation Order',
    category: 'Affiliation Document',
    isRequired: true,
    isPresent: true,
    fileName: 'UNIV-AFFIL-2026-CONT.pdf',
    fileSize: '2.1 MB',
    uploadDate: '2026-02-18',
    extractedSampleFields: {
      'Affiliating University': 'State Technological University',
      'Granted Tenure': 'Academic Year 2026-27',
      'Sanctioned Branches': 'CSE (120), ECE (60), MECH (60)'
    },
    simulatedOcrStatus: 'Verified (High Quality)',
    simulatedQrStatus: 'Present - Valid Format',
    pdfSignatureStatus: 'Self-Signed Demo Token',
    externalVerificationStatus: 'Not Externally Verified',
    metadataWarnings: ['Self-signed university token requires physical registrar cross-verification'],
    recommendedAction: 'Verify against University Senate Gazette list.',
    checkStages: {
      present: true,
      extracted: true,
      consistencyChecked: true,
      signatureChecked: false,
      issuerVerified: 'Not Externally Verified',
      manualReviewRequired: true
    },
    ocrConfidence: 96.8,
    lowConfidenceFlag: false
  },
  {
    id: 'DOC-03',
    name: 'Fire Safety & Structural Stability Certificate',
    category: 'Supporting Approval Document',
    isRequired: true,
    isPresent: true,
    fileName: 'FIRE-SAFETY-NOC-2027.pdf',
    fileSize: '1.4 MB',
    uploadDate: '2026-01-10',
    expiryDate: '2027-04-30', // Future date for valid cases
    extractedSampleFields: {
      'Issuing Authority': 'Metropolitan Fire Directorate',
      'Certificate No.': 'FS/NOC/2026/0942',
      'Expiry Date': '2027-04-30'
    },
    simulatedOcrStatus: 'Verified (High Quality)',
    simulatedQrStatus: 'No QR Detected',
    pdfSignatureStatus: 'No Signature',
    externalVerificationStatus: 'Not Externally Verified',
    metadataWarnings: ['Scanned physical certificate; cryptographic signature absent'],
    recommendedAction: 'Standard field inspector verification.',
    checkStages: {
      present: true,
      extracted: true,
      consistencyChecked: true,
      signatureChecked: false,
      issuerVerified: 'Not Externally Verified',
      manualReviewRequired: false
    },
    ocrConfidence: 94.2,
    lowConfidenceFlag: false
  },
  {
    id: 'DOC-04',
    name: 'Registered Land & Infrastructure Deed',
    category: 'Land & Infrastructure Deed',
    isRequired: true,
    isPresent: true,
    fileName: 'LAND-REG-DEED-DEAL.pdf',
    fileSize: '8.2 MB',
    uploadDate: '2026-02-01',
    extractedSampleFields: {
      'Total Campus Acreage': '12.5 Acres Contiguous',
      'Sub-Registrar Office': 'Sector 4 District Registry',
      'Deed Deed Number': 'REG-8829-1998'
    },
    simulatedOcrStatus: 'Verified (High Quality)',
    simulatedQrStatus: 'Present - Valid Format',
    pdfSignatureStatus: 'Digital Certificate Embedded',
    externalVerificationStatus: 'Not Externally Verified',
    metadataWarnings: [],
    recommendedAction: 'Land deed registration confirmed on record.',
    checkStages: {
      present: true,
      extracted: true,
      consistencyChecked: true,
      signatureChecked: true,
      issuerVerified: 'Not Externally Verified',
      manualReviewRequired: false
    },
    ocrConfidence: 97.9,
    lowConfidenceFlag: false
  },
  {
    id: 'DOC-05',
    name: 'Faculty Cadre & Salary Roll Affidavit',
    category: 'Faculty Affidavit & Cadre',
    isRequired: true,
    isPresent: true,
    fileName: 'FACULTY-CADRE-ROLL-2026.pdf',
    fileSize: '3.6 MB',
    uploadDate: '2026-02-20',
    extractedSampleFields: {
      'Total Teaching Faculty': '48 Members',
      'Professor Cadre': '6 Members',
      'Associate Professor Cadre': '12 Members',
      'Assistant Professor Cadre': '30 Members'
    },
    simulatedOcrStatus: 'Verified (High Quality)',
    simulatedQrStatus: 'No QR Detected',
    pdfSignatureStatus: 'Digital Certificate Embedded',
    externalVerificationStatus: 'Not Externally Verified',
    metadataWarnings: [],
    recommendedAction: 'Cross-check against faculty Aadhaar-seeded biometric records.',
    checkStages: {
      present: true,
      extracted: true,
      consistencyChecked: true,
      signatureChecked: true,
      issuerVerified: 'Not Externally Verified',
      manualReviewRequired: false
    },
    ocrConfidence: 95.5,
    lowConfidenceFlag: false
  }
];

export const DEMO_SCENARIOS: Record<string, DemoScenario> = {
  'scenario-b': {
    id: 'scenario-b',
    name: 'Scenario B: Historical Record Mismatch (Primary Demo)',
    tagline: 'Intake variation from 120 to 180 seats triggers DEMO-R003 and evidence drawer',
    badge: 'Historical Discrepancy',
    badgeColor: 'border-red-300 bg-red-50 text-red-700',
    description: 'ABC Institute of Technology previously had an approved intake of 120 seats. The current application declares 180 seats without approved university expansion order. PRAMAAN detects the variance, triggers rule DEMO-R003, and flags the intake field with supporting evidence for officer review.',
    application: {
      id: 'PRM-2026-014',
      institutionName: 'ABC Institute of Technology — Demo',
      institutionCode: '1-1402931',
      academicYear: '2026-27',
      applicationType: 'Extension of Approval (EoA) & Intake Variation',
      submissionDate: '2026-02-22',
      previousRecord: {
        institutionName: 'ABC Institute of Technology',
        applicationRef: 'PRM-2025-014',
        approvedIntake: 120,
        address: 'Block A, Sample Road, Pune, Maharashtra',
        principalName: 'Dr. K. R. Ramanathan',
        builtUpAreaSqM: 8500,
        computerLabsCount: 8,
        totalFacultyCount: 45,
        mandatoryDocumentStatus: 'All 5 Mandatory Documents Present',
        affiliationStatus: 'Permanent Affiliation Verified',
        fireSafetyCertValidity: 'Valid (2026-12-31)'
      },
      currentRecord: {
        institutionName: 'ABC Institute of Technology',
        applicationRef: 'PRM-2026-014',
        approvedIntake: 180, // Mismatch! 120 -> 180
        address: 'Block A, Sample Road, Pune, Maharashtra',
        principalName: 'Dr. K. R. Ramanathan',
        builtUpAreaSqM: 8500,
        computerLabsCount: 8,
        totalFacultyCount: 48,
        mandatoryDocumentStatus: 'All 5 Mandatory Documents Present',
        affiliationStatus: 'Annual Continuation Filed',
        fireSafetyCertValidity: 'Valid (2027-04-30)'
      },
      documents: [...BASE_DOCUMENTS]
    }
  },
  'scenario-a': {
    id: 'scenario-a',
    name: 'Scenario A: Valid Sample Application',
    tagline: 'All historical values match baseline and statutory documents pass verification',
    badge: 'Fully Compliant Demo',
    badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-700',
    description: 'Vidyapeeth Institute of Engineering & Technology has an exact match with baseline sanction records (120 intake, same campus, unchanged principal, valid fire safety certificates). Ready for officer review with no critical flags.',
    application: {
      id: 'PRM-2026-008',
      institutionName: 'Vidyapeeth Institute of Engineering & Technology — Demo',
      institutionCode: '1-1408842',
      academicYear: '2026-27',
      applicationType: 'Extension of Approval (EoA) Routine Continuation',
      submissionDate: '2026-02-20',
      previousRecord: {
        institutionName: 'Vidyapeeth Institute of Engineering & Technology',
        applicationRef: 'PRM-2025-008',
        approvedIntake: 120,
        address: 'Knowledge Park IV, Greater Noida, Uttar Pradesh',
        principalName: 'Dr. Sunita Deshmukh',
        builtUpAreaSqM: 9200,
        computerLabsCount: 10,
        totalFacultyCount: 52,
        mandatoryDocumentStatus: 'All 5 Mandatory Documents Present',
        affiliationStatus: 'Permanent Affiliation Verified',
        fireSafetyCertValidity: 'Valid (2027-08-31)'
      },
      currentRecord: {
        institutionName: 'Vidyapeeth Institute of Engineering & Technology',
        applicationRef: 'PRM-2026-008',
        approvedIntake: 120, // Match!
        address: 'Knowledge Park IV, Greater Noida, Uttar Pradesh',
        principalName: 'Dr. Sunita Deshmukh',
        builtUpAreaSqM: 9200,
        computerLabsCount: 10,
        totalFacultyCount: 52,
        mandatoryDocumentStatus: 'All 5 Mandatory Documents Present',
        affiliationStatus: 'Permanent Affiliation Verified',
        fireSafetyCertValidity: 'Valid (2027-08-31)'
      },
      documents: [...BASE_DOCUMENTS]
    }
  },
  'scenario-c': {
    id: 'scenario-c',
    name: 'Scenario C: Missing Required Document',
    tagline: 'Statutory University Affiliation document is missing from checklist package',
    badge: 'Missing Document Flag',
    badgeColor: 'border-red-300 bg-red-50 text-red-700',
    description: 'Apex Global Polytechnic submitted an application lacking the mandatory University Affiliation Continuation Order. Rule DEMO-R001 triggers a critical checklist violation and explains why the absence prevents processing.',
    application: {
      id: 'PRM-2026-031',
      institutionName: 'Apex Global Polytechnic — Demo',
      institutionCode: '1-1409953',
      academicYear: '2026-27',
      applicationType: 'Extension of Approval (EoA)',
      submissionDate: '2026-02-23',
      previousRecord: {
        institutionName: 'Apex Global Polytechnic',
        applicationRef: 'PRM-2025-031',
        approvedIntake: 240,
        address: 'Plot 12, Industrial Area Phase II, Bengaluru, Karnataka',
        principalName: 'Prof. Ramesh Rao',
        builtUpAreaSqM: 11500,
        computerLabsCount: 12,
        totalFacultyCount: 65,
        mandatoryDocumentStatus: 'All 5 Mandatory Documents Present',
        affiliationStatus: 'Affiliation Valid FY25',
        fireSafetyCertValidity: 'Valid (2027-01-15)'
      },
      currentRecord: {
        institutionName: 'Apex Global Polytechnic',
        applicationRef: 'PRM-2026-031',
        approvedIntake: 240,
        address: 'Plot 12, Industrial Area Phase II, Bengaluru, Karnataka',
        principalName: 'Prof. Ramesh Rao',
        builtUpAreaSqM: 11500,
        computerLabsCount: 12,
        totalFacultyCount: 65,
        mandatoryDocumentStatus: 'Missing Statutory Document (Item #2)',
        affiliationStatus: 'Missing Continuation Certificate',
        fireSafetyCertValidity: 'Valid (2027-01-15)'
      },
      documents: BASE_DOCUMENTS.map(doc => {
        if (doc.id === 'DOC-02') {
          return {
            ...doc,
            isPresent: false,
            fileName: undefined,
            fileSize: undefined,
            uploadDate: undefined,
            simulatedOcrStatus: 'Missing File' as const,
            simulatedQrStatus: 'Not Applicable' as const,
            pdfSignatureStatus: 'Not Applicable' as const,
            recommendedAction: 'Halt approval workflow. Issue statutory deficiency notice.',
            checkStages: {
              present: false,
              extracted: false,
              consistencyChecked: false,
              signatureChecked: false,
              issuerVerified: 'Not Externally Verified' as const,
              manualReviewRequired: true
            },
            ocrConfidence: 0,
            lowConfidenceFlag: false
          };
        }
        return doc;
      })
    }
  },
  'scenario-d': {
    id: 'scenario-d',
    name: 'Scenario D: Expired Supporting Document',
    tagline: 'Fire Safety Certificate lapsed on 2025-11-15; dynamically evaluated by date engine',
    badge: 'Expired Certificate',
    badgeColor: 'border-amber-300 bg-amber-50 text-amber-700',
    description: 'National Institute of Science & Applied Tech submitted a Fire Safety & Building Occupancy NOC that expired on November 15, 2025 (in the past relative to AY 2026-27). PRAMAAN’s temporal validator calculates the date disparity dynamically and flags rule DEMO-R002.',
    application: {
      id: 'PRM-2026-052',
      institutionName: 'National Institute of Science & Applied Tech — Demo',
      institutionCode: '1-1406612',
      academicYear: '2026-27',
      applicationType: 'Extension of Approval (EoA)',
      submissionDate: '2026-02-19',
      previousRecord: {
        institutionName: 'National Institute of Science & Applied Tech',
        applicationRef: 'PRM-2025-052',
        approvedIntake: 300,
        address: 'NH-48 Bypass Road, Ahmedabad, Gujarat',
        principalName: 'Dr. Arvind Trivedi',
        builtUpAreaSqM: 14000,
        computerLabsCount: 14,
        totalFacultyCount: 82,
        mandatoryDocumentStatus: 'All 5 Mandatory Documents Present',
        affiliationStatus: 'Permanent Affiliation Verified',
        fireSafetyCertValidity: 'Valid (2025-11-15)'
      },
      currentRecord: {
        institutionName: 'National Institute of Science & Applied Tech',
        applicationRef: 'PRM-2026-052',
        approvedIntake: 300,
        address: 'NH-48 Bypass Road, Ahmedabad, Gujarat',
        principalName: 'Dr. Arvind Trivedi',
        builtUpAreaSqM: 14000,
        computerLabsCount: 14,
        totalFacultyCount: 82,
        mandatoryDocumentStatus: 'All 5 Mandatory Documents Present',
        affiliationStatus: 'Permanent Affiliation Verified',
        fireSafetyCertValidity: 'Expired on 2025-11-15'
      },
      documents: BASE_DOCUMENTS.map(doc => {
        if (doc.id === 'DOC-03') {
          return {
            ...doc,
            fileName: 'FIRE-SAFETY-EXPIRED-2025.pdf',
            expiryDate: '2025-11-15', // Past date!
            isExpired: true,
            extractedSampleFields: {
              'Issuing Authority': 'Metropolitan Fire Directorate',
              'Certificate No.': 'FS/NOC/2023/1129',
              'Expiry Date': '2025-11-15 (Lapsed)'
            },
            metadataWarnings: ['Certificate expired prior to regulatory cutoff of 2026-06-30'],
            recommendedAction: 'Mandate immediate resubmission of valid municipal fire safety renewal.',
            checkStages: {
              present: true,
              extracted: true,
              consistencyChecked: false,
              signatureChecked: false,
              issuerVerified: 'Not Externally Verified' as const,
              manualReviewRequired: true
            },
            ocrConfidence: 94.2,
            lowConfidenceFlag: false
          };
        }
        return doc;
      })
    }
  }
};

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'AUD-901',
    timestamp: '2026-02-22 09:15:20 IST',
    applicationRef: 'PRM-2026-014',
    action: 'Application Intake Synchronized',
    actor: 'System / Intake Pipeline',
    statusChange: 'SUBMITTED -> IN_VALIDATION',
    officerComment: 'Initial intake package received via local demo intake processor.',
    isLocalDemo: true
  },
  {
    id: 'AUD-902',
    timestamp: '2026-02-22 09:15:45 IST',
    applicationRef: 'PRM-2026-014',
    action: 'Historical Baseline Cross-Comparison Executed',
    actor: 'PRAMAAN Historical Engine',
    relatedFindingId: 'PRM-F-001',
    statusChange: 'COMPARISON_COMPLETE',
    officerComment: 'Automated delta scan flagged intake jump from 120 to 180 seats against Sanction PRM-2025-014.',
    isLocalDemo: true
  },
  {
    id: 'AUD-903',
    timestamp: '2026-02-22 09:16:02 IST',
    applicationRef: 'PRM-2026-014',
    action: 'Regulatory Rule Verification Run',
    actor: 'PRAMAAN Rule Engine v2026.1',
    relatedFindingId: 'DEMO-R003',
    statusChange: 'MANUAL_REVIEW_TRIGGERED',
    officerComment: 'Rule DEMO-R003 evaluated to MANUAL_REVIEW. Evidence drawer linked to current application page 3.',
    isLocalDemo: true
  }
];
