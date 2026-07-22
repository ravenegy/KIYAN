# Module Specification Document
## Supplier Management Module (Vendor Relationship Management)
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Master Data Management

---

## 1. Objective & Scope
This document outlines the official specification for the Supplier Management Module. As the central repository for Vendor Master Data, this module governs the entire lifecycle of supplier relationships—from initial onboarding and compliance tracking to ongoing performance evaluation and financial reconciliation. It ensures that the enterprise only procures from qualified, reliable, and compliant sources, mitigating supply chain risk and optimizing procurement spend.

---

## 2. Feature Specifications

### 2.1 Supplier Profiles & Categories
*   **Purpose:** To establish a single source of truth for vendor identities, contact matrices, locations, and categorical classifications.
*   **Workflow:** Procurement initiates "New Supplier Request" ➔ Fills basic details and Category (e.g., `Raw Material - Agricultural`, `Packaging`, `Logistics`) ➔ Finance populates Tax/Bank details ➔ Profile moves to `ACTIVE` status.
*   **Business Rules:** Suppliers must be categorized to enable targeted RFQ routing. A supplier can belong to multiple categories.
*   **Validation Rules:** Tax ID / VAT Number must be globally unique across the system to prevent duplicate vendor creation. Primary email and currency must be defined.
*   **Dependencies:** Core Master Data, Purchasing Module (RFQs, POs).
*   **Reports:** Supplier Master Directory, Supplier Distribution by Category, Vendor Geographic Heatmap.
*   **Notifications:** Alert to Finance and QC when a new Supplier Profile is created and requires their specific data inputs.
*   **Audit Logs:** Strict logging of any changes to Bank Account Details, Tax IDs, or primary contact information.
*   **Future Expansion:** A secure, web-based Supplier Self-Service Portal where vendors can update their own contact information and banking details (subject to internal ERP approval workflows).

### 2.2 Supplier Documents & Compliance
*   **Purpose:** To track, store, and monitor critical legal and quality documentation (e.g., ISO 22000 Certificates, NDAs, Insurance Policies, Halal/Kosher certifications).
*   **Workflow:** User uploads document to the Supplier Profile ➔ Selects Document Type ➔ Sets Expiration Date ➔ System continuously monitors validity.
*   **Business Rules:** If a mandatory compliance document (e.g., Food Safety Certification) expires, the system automatically restricts the issuance of new Purchase Orders for regulated items.
*   **Validation Rules:** File uploads must adhere to allowed formats (PDF, JPEG) and virus-scanning protocols. An Expiry Date is mandatory for all compliance-related document types.
*   **Dependencies:** File Storage Engine, Quality Control (QMS), Purchasing (PO generation blocks).
*   **Reports:** Expiring Vendor Documents Report, Compliance Audit Matrix.
*   **Notifications:** Automated alerts sent to Procurement (and optionally emailed directly to the supplier) at 90, 60, and 15 days prior to document expiration.
*   **Audit Logs:** Logs when a document is uploaded, replaced, or soft-deleted, capturing the user UUID and timestamp.
*   **Future Expansion:** OCR (Optical Character Recognition) integration to automatically extract and validate expiration dates directly from uploaded certificate PDFs.

### 2.3 Contracts & Payment Terms
*   **Purpose:** To formalize the commercial relationship, defining credit limits, agreed pricing schedules, and invoice payment conditions.
*   **Workflow:** Procurement negotiates terms ➔ Enters Payment Terms (e.g., Net 30, 2% 10 Net 45) and Maximum Credit Limit ➔ Uploads signed Master Service Agreement (MSA) ➔ Links contract validity dates.
*   **Business Rules:** Payment terms defined here automatically default onto all Draft POs for this supplier. Contracts dictate the maximum financial exposure the company is willing to risk with the vendor.
*   **Validation Rules:** Contract Start Date must precede the End Date. Active contracts for the same primary material scope cannot overlap temporally.
*   **Dependencies:** Purchasing (POs), Accounting (Accounts Payable, Cash Flow Projections).
*   **Reports:** Active Contracts Register, Vendor Credit Exposure vs. Limit.
*   **Notifications:** Alerts to Procurement Managers 60 days before a Master Agreement expires to initiate renegotiations.
*   **Audit Logs:** Modifications to Payment Terms or Credit Limits require dual-authorization and trigger high-priority audit events.
*   **Future Expansion:** Dynamic Discounting integration, where the system suggests early payment to vendors in exchange for calculated percentage discounts based on current cash-on-hand.

### 2.4 Supplier Evaluation (Performance Analysis)
*   **Purpose:** To provide objective, data-driven analytics on vendor reliability, encompassing On-Time Delivery (OTIF), Quality Pass Rates, and Price Variance.
*   **Workflow:** The system continuously runs background aggregations on GRNs and QC results ➔ Generates a dynamic Scorecard (0-100) ➔ Procurement conducts quarterly subjective reviews ➔ Combined Score dictates vendor standing.
*   **Business Rules:** 
    *   *Delivery Score:* Based on GRN Date vs. PO Promised Date.
    *   *Quality Score:* Based on QC Pass vs. Reject dispositions.
    *   *Price Score:* Based on PO Price vs. Initial RFQ/Contract Price.
*   **Validation Rules:** Scoring weights must always sum to 100% (e.g., Quality 50%, Delivery 30%, Price 20%).
*   **Dependencies:** Purchasing (GRNs, POs), Quality Control (Inspection Dispositions).
*   **Reports:** Supplier Performance Scorecard, Vendor Ranking/Tier List (A/B/C Classification), Cost of Poor Quality (COPQ) per Supplier.
*   **Notifications:** Alert to Purchasing Manager if a Tier-A supplier's rolling 30-day score drops below a critical threshold (e.g., < 80%).
*   **Audit Logs:** Logs any manual qualitative overrides applied to the calculated quantitative score.
*   **Future Expansion:** AI-driven Risk Prediction, crawling global supply chain news and weather patterns to predict geographic risks affecting specific supplier tiers.

### 2.5 Purchase History & Outstanding Balance
*   **Purpose:** To provide a 360-degree real-time financial and transactional snapshot of the supplier relationship.
*   **Workflow:** User opens Supplier Profile ➔ Navigates to Financial Tab ➔ Views read-only aggregated data fetched dynamically from ledgers.
*   **Business Rules:** "Outstanding Balance" strictly represents Approved Invoices minus Processed Payments. "Committed Balance" represents open POs not yet invoiced.
*   **Validation Rules:** N/A (Data is strictly read-only and mathematically derived from downstream ledgers).
*   **Dependencies:** Accounting (AP Ledger), Purchasing (PO/Invoice History).
*   **Reports:** Supplier Spend Analysis (Year-over-Year), AP Aging by Supplier, Volume Discount Tracking.
*   **Notifications:** System UI warning during PO creation if the new PO will push the supplier's "Committed + Outstanding" balance over their defined Credit Limit.
*   **Audit Logs:** N/A (Read-only aggregation).
*   **Future Expansion:** Predictive Spend Forecasting based on historical seasonality and current Production MRP demands.

### 2.6 Communication History
*   **Purpose:** To act as a lightweight CRM for procurement, maintaining a centralized, permanent timeline of all vendor interactions, disputes, and negotiations.
*   **Workflow:** Buyer concludes a call/meeting ➔ Navigates to Supplier Profile ➔ Logs meeting notes, categorizes the interaction (e.g., "Price Negotiation", "Quality Dispute"), and sets follow-up tasks.
*   **Business Rules:** Communications are permanent records. They can be appended to but never deleted. System-generated emails (e.g., sent RFQs, emailed POs) are automatically injected into this timeline.
*   **Validation Rules:** Manual entries must have a valid Interaction Date, Category, and Author (auto-filled).
*   **Dependencies:** Core Application (Email/SMTP service), Notifications.
*   **Reports:** Buyer Activity Log, Vendor Dispute Timeline Analysis.
*   **Notifications:** Reminders triggered for assigned follow-up tasks.
*   **Audit Logs:** Edits to manual log entries (e.g., fixing a typo) are version-tracked in the audit tables.
*   **Future Expansion:** Inbound Email Parsing (e.g., vendor replies to `po1045@kiyan.erp` and the email body is automatically stripped and appended to the Communication timeline).

### 2.7 Supplier Status Management (Blocked vs. Preferred)
*   **Purpose:** To control enterprise purchasing behavior by systematically restricting high-risk vendors or promoting strategic partners.
*   **Workflow:** Buyer initiates Status Change Request ➔ Selects New Status (`PREFERRED`, `ACTIVE`, `PROBATION`, `BLOCKED`) ➔ Provides Reason Code ➔ Procurement Manager approves ➔ Status updates.
*   **Business Rules:**
    *   **PREFERRED:** Supplier is auto-suggested or pinned to the top of the list during RFQ generation.
    *   **BLOCKED:** Hard system stop. The ERP absolutely forbids the creation of any new Draft POs or RFQs for this supplier. Existing open POs trigger an urgent review workflow.
*   **Validation Rules:** Transitioning a supplier to `BLOCKED` requires a mandatory Reason Code (e.g., "Repeated Quality Failures", "Bankruptcy", "Compliance Breach").
*   **Dependencies:** Purchasing (RFQ/PO generation rules), Quality (often the trigger for Probation/Blocks).
*   **Reports:** Blocked Vendor Register, Preferred Vendor Spend % (tracking compliance to strategic sourcing initiatives).
*   **Notifications:** Immediate, high-priority alert to the entire Procurement team when a supplier is transitioned to `BLOCKED`.
*   **Audit Logs:** Highly scrutinized log capturing the requesting user, approving manager, timestamp, and justification code for the status change.
*   **Future Expansion:** Conditional Blocking (e.g., blocking a supplier from providing Raw Material A due to quality issues, but allowing them to continue supplying Packaging Material B).

---
*End of Supplier Management Module Specification. This design ensures absolute vendor accountability, rigorous compliance, and optimized strategic sourcing.*
