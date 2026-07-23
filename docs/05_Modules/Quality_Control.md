# Module Specification Document
## Quality Control (QC) & Quality Management System (QMS) Module
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Food Safety Compliant (HACCP, ISO 22000, FDA/FSMA)

---

## 1. Objective & Scope
This document outlines the official specification for the Quality Control (QC) Module. In food manufacturing, quality control is the critical barrier protecting public health and brand reputation. This module governs the end-to-end Quality Management System (QMS), enforcing rigorous testing protocols at every phase of the supply chain—from raw material intake to final product dispatch. It ensures absolute compliance, manages non-conformances, and orchestrates continuous improvement via Corrective Actions (CAPA).

---

## 2. Feature Specifications

### 2.1 Quality Standards & Test Protocols
*   **Purpose:** To define the exact parameters, acceptable tolerances, and testing methodologies for any given product or process.
*   **Workflow:** QC Manager creates a Protocol ➔ Defines Parameters (e.g., Moisture %, Aflatoxin ppb, Viscosity, Salmonella presence) ➔ Assigns to a specific `ItemMaster` or `Routing Step`.
*   **Business Rules:** Protocols are version-controlled. Parameters can be Numeric (Min/Max/Target), Boolean (Pass/Fail), or Qualitative (e.g., Color, Odor).
*   **Validation:** Target values must fall strictly between defined Min and Max boundaries.
*   **Dependencies:** Product Management Module.
*   **Notifications:** Alert QC Analysts when a standard is updated.
*   **Reports:** Master Test Protocol Catalog.
*   **KPIs:** Protocol Adherence Rate.
*   **Audit Logs:** Logs who changed a parameter's tolerance limit and why.

### 2.2 Incoming Material Inspection (GRN QC)
*   **Purpose:** To prevent sub-standard, contaminated, or out-of-spec raw materials from entering the factory ecosystem.
*   **Workflow:** Goods Receipt Note (GRN) generated ➔ Lot automatically placed in `QUARANTINE` ➔ QC Analyst pulls sample ➔ Executes tests against RM Protocol ➔ Logs Results ➔ System calculates Disposition.
*   **Business Rules:** Food-grade raw materials cannot bypass incoming inspection. The Lot remains physically locked in a Staging/Quarantine zone until explicit QC release.
*   **Validation:** Scanned Lot ID must match the pending inspection queue.
*   **Dependencies:** Purchasing (GRN), Inventory (Lot Status), Warehouse (Quarantine Zones).
*   **Notifications:** Alert Warehouse to put-away goods if `Passed`; Alert Procurement if `Rejected`.
*   **Reports:** Supplier Quality Scorecard, Incoming Defect Rate.
*   **KPIs:** Supplier Quality Index (SQI), Inspection Turnaround Time.
*   **Audit Logs:** Records test values, inspecting analyst UUID, and exact timestamp.

### 2.3 In-Process Inspection (WIP QC & CCP Monitoring)
*   **Purpose:** To continuously monitor production lines, verifying Critical Control Points (CCPs) as mandated by HACCP plans (e.g., verifying roasting temperatures).
*   **Workflow:** System triggers scheduled inspection (e.g., "Every 2 hours") OR Operator requests manual check ➔ QC Analyst visits the line ➔ Takes sample ➔ Logs results against the WIP Protocol.
*   **Business Rules:** If an In-Process test fails a Critical Control Point (CCP), the linked Production Order must be immediately and automatically `PAUSED`.
*   **Validation:** Results must be linked to a specific, active `Production Order` and `Machine`.
*   **Dependencies:** Production Order Module (MES).
*   **Notifications:** High-priority (siren) alert to Production Manager if a CCP fails.
*   **Reports:** CCP Monitoring Log (HACCP compliance report), In-Process Variance Trend.
*   **KPIs:** First Pass Yield (FPY), Process Capability Index (Cpk).
*   **Audit Logs:** Exact timestamps proving CCP checks were performed on schedule for regulatory compliance.

### 2.4 Finished Goods Inspection
*   **Purpose:** Final verification that the manufactured product meets all legal and customer-specific standards before dispatch.
*   **Workflow:** Production Yields FG Lot ➔ Lot automatically `QUARANTINED` ➔ Lab tests performed (e.g., microbiological hold for 48 hours) ➔ Results logged ➔ Final Disposition applied.
*   **Business Rules:** Finished Goods CANNOT be allocated to Sales Orders or physically dispatched until this inspection evaluates to `Passed`.
*   **Validation:** All mandatory parameters in the FG Protocol must have recorded results before a Disposition can be saved.
*   **Dependencies:** Production (Yield), Inventory (Traceability), Sales (Dispatch blocking).
*   **Notifications:** Alert Sales when a highly anticipated batch is finally released for shipment.
*   **Reports:** Batch Release Certificate, FG Defect Pareto.
*   **KPIs:** Final Defect Rate (%), Right-First-Time (RFT).
*   **Audit Logs:** Immutably seals the Batch Record for FDA/ISO traceability.

### 2.5 Test Results & Disposition (Pass, Fail, Rework, Reject)
*   **Purpose:** To formalize the outcome of an inspection and trigger automated downstream logistical actions.
*   **Workflow:** Analyst submits values ➔ System evaluates against Protocol ➔ Proposes Disposition ➔ QC Manager approves (for failures).
*   **Business Rules:**
    *   **Pass:** Changes Lot status to `ACTIVE`. Releases locks.
    *   **Fail:** Lot remains `QUARANTINED`. Mandates a justification note.
    *   **Rework:** Changes Lot status to `REWORK`. Automatically generates a Rework Production Order.
    *   **Reject:** Changes Lot status to `REJECTED`. Automatically generates a movement task to transfer the physical goods to the Damaged/Scrap warehouse.
*   **Validation:** Dispositions of `Rework` or `Reject` require explicit secondary authorization from a QC Manager or Factory Manager.
*   **Dependencies:** Inventory (Status), WMS (Movement tasks).
*   **Notifications:** Automated alerts across departments based on disposition (e.g., alert Finance on `Reject` for write-offs).
*   **Reports:** Disposition Summary Report, Scrap Financial Impact.
*   **KPIs:** Cost of Poor Quality (COPQ).
*   **Audit Logs:** Dual-signature logging (Analyst execution + Manager authorization) for any non-Pass disposition.

### 2.6 Corrective and Preventive Actions (CAPA)
*   **Purpose:** To manage systemic quality issues, identify root causes, and prevent recurrence (ISO 9001/22000 requirement).
*   **Workflow:** Non-Conformance (NCR) identified ➔ CAPA ticket opened ➔ Root Cause Analysis (e.g., 5 Whys, Ishikawa) recorded ➔ Action Plan assigned ➔ Actions executed ➔ CAPA verified and Closed.
*   **Business Rules:** CAPAs can be linked to Suppliers, Internal Machines, or specific Employees. A CAPA must have a designated owner and a due date.
*   **Validation:** A CAPA cannot be closed without a verified effectiveness review sign-off.
*   **Dependencies:** All modules (CAPAs can span HR, Maintenance, Purchasing).
*   **Notifications:** Escalation alerts if a CAPA Action Plan breaches its due date.
*   **Reports:** Open CAPA Aging Report, CAPA Effectiveness Log.
*   **KPIs:** Average Days to Close CAPA, Repeat Non-Conformance Rate.
*   **Audit Logs:** Full lifecycle tracking of the investigation and resolution steps.

### 2.7 Quality Certificates (Certificate of Analysis - COA)
*   **Purpose:** To auto-generate official, customer-facing documentation proving product quality.
*   **Workflow:** Finished Good passes inspection ➔ System compiles test results ➔ Generates PDF COA with authorized digital signatures.
*   **Business Rules:** The COA only displays test parameters flagged as "Customer Facing" in the QC Protocol (hiding internal proprietary metrics).
*   **Validation:** Cannot generate a COA for a Lot that does not possess a `Passed` disposition.
*   **Dependencies:** Sales (attached to Dispatch documents), Document Generation Engine.
*   **Notifications:** Optionally emails the COA automatically to the customer upon dispatch.
*   **Reports:** N/A (The COA *is* the report).
*   **KPIs:** COA Generation Time.
*   **Audit Logs:** Tracks when a COA was generated, who downloaded it, and to whom it was emailed.

### 2.8 Attachments & Visual Evidence
*   **Purpose:** To store unstructured supporting quality data (e.g., photos of shattered glass, PDF lab results from a third-party microbiological lab).
*   **Workflow:** User selects Inspection/CAPA ➔ Uploads File ➔ Adds Description.
*   **Business Rules:** Files are stored immutably. They cannot be deleted once linked to a completed inspection, only marked as superseded.
*   **Validation:** Enforces strict file type restrictions (PDF, JPEG, PNG) and virus scanning.
*   **Dependencies:** Core Application (File Storage Service).
*   **Notifications:** N/A.
*   **Reports:** Image attachments are embeddable directly into NCR and CAPA PDF reports.
*   **KPIs:** N/A.
*   **Audit Logs:** Logs file upload metadata, user ID, and MD5 hash to guarantee file integrity for auditors.

---
*End of Quality Control Module Specification. This design embeds quality directly into the operational workflows, preventing defects by design rather than relying solely on inspection.*
