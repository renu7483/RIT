# PRAMAAN (प्रमाण) — Evidence-Driven Institutional Application Validation

**Smart India Hackathon 2026** • Problem Statement ID: **SIH26261**  
**Category:** AI-Assisted Institutional Application Validation, Document Authentication Support, and Regulatory Compliance Verification

---

## 🏛️ Executive Summary

PRAMAAN is an institutional application scrutiny system designed for authorized technical education officers. Unlike conventional text extraction utilities that simply read raw OCR data, PRAMAAN operationalizes a connected, explainable validation pipeline:

```
Application Intake ➔ Historical Record Comparison ➔ Versioned Regulatory Rule Engine ➔ Document Verification ➔ Evidence-Linked Findings ➔ Authorized Officer Review ➔ Immutable Audit Trail & PDF Dossier
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or later (v24+ recommended)
- **npm**: v9.0.0 or later

### 2. Run the Development Server
```bash
npm run dev
```
Access the application at: `http://localhost:5173/` (or `http://127.0.0.1:5173/`)

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## 🎬 Recommended SIH 2026 Presentation Walkthrough

Follow this 9-step demonstration flow (which can also be triggered directly using **Presentation Mode** via the top bar):

1. **Top Bar — Launch Scenario B (Historical Mismatch)**:
   - Select **Scenario B: ABC Institute of Technology — Demo**.
   - Note the discreet tag: `SIH 2026 DEMO — SAMPLE DATA`.
2. **Screen 1 — Dashboard**:
   - Inspect calculated cohort metrics (4 applications, 1 requiring review, 1 discrepancy).
   - Click **Start Validation Flow** or navigate via sidebar.
3. **Screen 2 — Application Intake**:
   - Observe pre-loaded baseline metadata for `PRM-2026-014`.
   - Test PDF intake with the browser dropzone. Notice clear demarcation between uploaded file verification and simulated OCR analysis.
4. **Screen 3 — Historical Comparison (Flagship Screen)**:
   - View side-by-side panels: Previous Sanction (`PRM-2025-014`) vs Current Application (`PRM-2026-014`).
   - Notice the prominent core principle:
     > *"PRAMAAN does not only read the current application. It identifies how the current record differs from the previous original record and makes those changes reviewable."*
   - See the highlighted delta: **Approved Intake changed from 120 seats to 180 seats (+60 seats)**.
   - Click the changed row to trigger the **Slide-Over Evidence Drawer**.
5. **Slide-Over Evidence Drawer**:
   - Inspect the highlighted excerpt from Page 3 of the application form (`"Proposed Intake for AY 2026-27: 180 seats"`).
   - Observe direct linkage to Regulatory Rule `DEMO-R003`.
6. **Screen 4 — Versioned Regulatory Rule Engine (Flagship Screen)**:
   - Inspect the 4-step explainability chain banner.
   - Expand `DEMO-R003` to view its version (`v2026.2-demo`), source reference (`Handbook Demo Norms §3.4`), evaluated fields, and deterministic status (`MANUAL_REVIEW`).
7. **Screen 5 — Document Verification**:
   - Observe 5 statutory categories with technical check flags (OCR, QR, Digital Signature).
   - Note the prominent disclaimer: `Not Externally Verified` (preserving regulatory integrity).
8. **Screen 6 — Evidence-Linked Findings**:
   - Explore finding `PRM-F-001` with its 98.4% confidence rating and recommended action.
9. **Screen 8 — Authorized Officer Review & Decision**:
   - Select **Request Correction / Issue Notice**.
   - Input/select officer remarks (e.g., *"Intake variance from 120 to 180 seats lacks university expansion NOC"*).
   - Confirm via modal to record decision and generate an audit event.
10. **Screen 9 — Audit Trail & Summary Report**:
    - Switch to **Audit Trail Events** to verify the newly logged entry.
    - Switch to **Printable Report** and click **Print / Save PDF** to trigger browser print styling with official disclaimers.

---

## 🧪 Included Demonstration Scenarios

| Scenario | Institution Name | Key Anomaly | Triggered Rule | Expected Status |
| :--- | :--- | :--- | :--- | :--- |
| **Scenario B (Primary)** | ABC Institute of Technology | Intake Jump: 120 ➔ 180 | `DEMO-R003` | Manual Review Required |
| **Scenario A** | Vidyapeeth Inst. of Engineering | Exact Historical Match | All Pass | Ready for Review (Clean) |
| **Scenario C** | Apex Global Polytechnic | Missing Affiliation Order | `DEMO-R001` | Statutory Deficiency |
| **Scenario D** | National Inst. of Science | Expired Fire Safety Certificate (2025-11-15) | `DEMO-R002` | Expired Certificate Flag |

---

## 🔒 Disclaimers & Integrity Compliance

- **Demo Nature**: All institutions, registration numbers, and documents are fictional demonstration samples.
- **External Authority**: This frontend operates on a client-side deterministic verification engine and makes no unauthorized claims of connection to live AICTE production portals.
- **Officer Primacy**: PRAMAAN assists human officers; final statutory decisions remain strictly with the designated scrutiny committee.
