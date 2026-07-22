# KIYAN Factory ERP: Master Implementation Roadmap

**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Chief Software Architect & Technical Project Manager
**Date:** July 2026
**Document Purpose:** Strategic Development Plan & Delivery Execution Strategy

---

## Executive Summary
This roadmap transforms the KIYAN ERP architectural specifications into a rigorous, phased execution plan. Development follows a strictly deterministic sequence: **Foundation ➔ Logistics ➔ Manufacturing ➔ Back-Office**. This prevents "dependency deadlocks" where developers are blocked waiting for upstream data models.

---

## Phase 1: Foundation & Core Master Data
**Goals:** Establish the secure perimeter, tenant configurations, and foundational data structures. This phase acts as the bedrock for all future transactions.
**Deliverables:** Authentication, RBAC Governance, Settings, Item Master, and Data Migration Engine.
**Risks:** Flawed RBAC implementation here will require catastrophic refactoring later. Incorrect Unit of Measure (UoM) configurations will corrupt future inventory ledgers.
**Validation Checklist:**
- [ ] Users can authenticate securely via JWT.
- [ ] Default-Deny RBAC blocks unauthorized route/API access.
- [ ] Base UoMs, Tax Codes, and Currencies are locked in.
- [ ] 10,000 mock items can be imported via CSV without memory leaks.

### 1.1 Authentication & Profile Module
*   **Suggested Development Order:** 1
*   **Priority:** Critical
*   **Required Previous Modules:** None
*   **Dependencies:** Core Infrastructure
*   **Estimated Complexity:** Low / Medium
*   **Risk Level:** High (Security)
*   **Testing Requirements:** 100% Unit coverage on token signing/verification. E2E tests for login, lockout, and session expiration.
*   **Definition of Done (DoD):** Secure JWT issuance, password hashing enforced, brute-force protection active, and user profile UI complete.

### 1.2 System Governance & Admin (Users)
*   **Suggested Development Order:** 2
*   **Priority:** Critical
*   **Required Previous Modules:** 1.1 Authentication
*   **Dependencies:** Authentication
*   **Estimated Complexity:** Medium
*   **Risk Level:** High (Security)
*   **Testing Requirements:** Security/Penetration testing to verify horizontal/vertical privilege escalation blocks.
*   **Definition of Done (DoD):** RBAC matrix fully implemented. Super Admin can provision roles and assign users. Audit logger active for security events.

### 1.3 Settings & Config Module
*   **Suggested Development Order:** 3
*   **Priority:** Critical
*   **Required Previous Modules:** 1.2 Governance
*   **Dependencies:** Authentication
*   **Estimated Complexity:** Low
*   **Risk Level:** Medium
*   **Testing Requirements:** Integration tests verifying cascading updates (e.g., updating a Tax rate correctly propagates to the active cache).
*   **Definition of Done (DoD):** Company profile, Factory branches, Currencies, UoMs, Taxes, and Document Numbering sequences are fully configurable and cached in memory.

### 1.4 Products (Item Master)
*   **Suggested Development Order:** 4
*   **Priority:** Critical
*   **Required Previous Modules:** 1.3 Settings
*   **Dependencies:** Settings (UoM, Taxes)
*   **Estimated Complexity:** Medium
*   **Risk Level:** Medium
*   **Testing Requirements:** E2E testing for complex nested item categories and SKU generation.
*   **Definition of Done (DoD):** CRUD operations for Raw Materials, Finished Goods, and Assets. Items can be linked to primary Suppliers.

### 1.5 Import & Export Module
*   **Suggested Development Order:** 5
*   **Priority:** High
*   **Required Previous Modules:** 1.4 Products
*   **Dependencies:** Products, Settings, Governance
*   **Estimated Complexity:** High (Stream Processing)
*   **Risk Level:** High (Data Corruption)
*   **Testing Requirements:** Stress tests importing 100,000 row CSVs. Integration tests verifying atomic rollbacks on malformed rows.
*   **Definition of Done (DoD):** Wizard UI complete. Dry-Run validation works. Background worker successfully imports Item Master data from legacy CSV templates.

---

## Phase 2: Supply Chain & Core Logistics
**Goals:** Enable the flow of physical goods into, through, and out of the factory. Establish the Procure-to-Pay and Order-to-Cash pipelines.
**Deliverables:** Inventory Ledger, WMS, Purchasing, Sales/CRM, Barcode/QR System.
**Risks:** High concurrency during warehouse scanning could cause negative inventory if database row-locking is not perfectly implemented.
**Validation Checklist:**
- [ ] Purchase Order converts to Goods Receipt Note (GRN) without data loss.
- [ ] Inventory Ledger perfectly matches physical warehouse locations.
- [ ] Sales Order successfully decrements ATP (Available-to-Promise) stock.
- [ ] Barcodes scan correctly via mobile PWA keyboard-wedge.

### 2.1 Inventory & Stock Ledger
*   **Suggested Development Order:** 6
*   **Priority:** Critical
*   **Required Previous Modules:** 1.4 Products
*   **Dependencies:** Products, Settings
*   **Estimated Complexity:** Very High
*   **Risk Level:** Critical (Data Integrity)
*   **Testing Requirements:** Concurrency/Race-condition tests simulating simultaneous stock deductions. 100% Unit coverage on ledger arithmetic.
*   **Definition of Done (DoD):** Immutable append-only ledger created. Real-time stock valuation available. Negative stock prevented by strict constraints.

### 2.2 Purchasing & Supplier Management
*   **Suggested Development Order:** 7
*   **Priority:** High
*   **Required Previous Modules:** 2.1 Inventory
*   **Dependencies:** Inventory, Settings
*   **Estimated Complexity:** Medium
*   **Risk Level:** Medium
*   **Testing Requirements:** E2E testing for the PR ➔ RFQ ➔ PO ➔ Approval workflow.
*   **Definition of Done (DoD):** Supplier CRM active. Draft POs can be created, routed for financial approval based on value, and finalized.

### 2.3 Warehouse Management (WMS)
*   **Suggested Development Order:** 8
*   **Priority:** High
*   **Required Previous Modules:** 2.2 Purchasing
*   **Dependencies:** Inventory, Purchasing
*   **Estimated Complexity:** High
*   **Risk Level:** High
*   **Testing Requirements:** E2E testing for GRN put-away tasks and Sales picking tasks.
*   **Definition of Done (DoD):** Bin location mapping active. WMS operators can execute Goods Receipts (GRN) against open POs, updating the Stock Ledger.

### 2.4 Sales & CRM
*   **Suggested Development Order:** 9
*   **Priority:** High
*   **Required Previous Modules:** 2.1 Inventory
*   **Dependencies:** Inventory, Settings
*   **Estimated Complexity:** Medium
*   **Risk Level:** Medium
*   **Testing Requirements:** Integration tests verifying credit limit blocks and discount engine logic.
*   **Definition of Done (DoD):** Customer CRM active. Quotes convert to Sales Orders. Dispatch tasks generate in WMS.

### 2.5 Barcode & QR System
*   **Suggested Development Order:** 10
*   **Priority:** High
*   **Required Previous Modules:** 2.3 WMS
*   **Dependencies:** WMS, Products
*   **Estimated Complexity:** Medium
*   **Risk Level:** Low
*   **Testing Requirements:** Unit tests validating JSON payload minification and HMAC signature generation for secure QR codes.
*   **Definition of Done (DoD):** System dynamically generates 1D/2D symbols for Items, Lots, and Bins. UI auto-focuses scanner inputs and parses payloads.

---

## Phase 3: Manufacturing Execution & Quality
**Goals:** Transform raw materials into finished goods under strict engineering and quality controls.
**Deliverables:** Recipes/BOM, Production Orders (MES), Planning, QC, Traceability, Printing.
**Risks:** Complex, multi-level BOM recursive queries can cause database timeouts. Offline MES syncing conflicts could lose production yield data.
**Validation Checklist:**
- [ ] Multi-level BOM explodes perfectly for a 100-component product.
- [ ] MES terminal successfully logs yield while physically offline.
- [ ] QA rejecting an inspection automatically quarantines the associated Lot.
- [ ] Thermal labels print ZPL commands successfully to network printers.

### 3.1 Recipes & BOM (Engineering)
*   **Suggested Development Order:** 11
*   **Priority:** Critical
*   **Required Previous Modules:** 1.4 Products
*   **Dependencies:** Products, Settings
*   **Estimated Complexity:** High (Recursive Logic)
*   **Risk Level:** High
*   **Testing Requirements:** Stress tests for 5-level deep BOM explosions. Unit tests for yield and scrap calculations.
*   **Definition of Done (DoD):** Version-controlled BOMs and routing steps are active. Draft/Active approval workflows are enforced.

### 3.2 Production Orders (MES)
*   **Suggested Development Order:** 12
*   **Priority:** Critical
*   **Required Previous Modules:** 3.1 Recipes, 2.3 WMS
*   **Dependencies:** Recipes, Inventory, WMS
*   **Estimated Complexity:** Very High
*   **Risk Level:** Critical
*   **Testing Requirements:** Offline E2E tests simulating network drops during material consumption.
*   **Definition of Done (DoD):** Shop-floor tablet UI active. Operators can start orders, consume raw material lots, log WIP/Finished yield, and sync offline outboxes.

### 3.3 Quality Control (QMS)
*   **Suggested Development Order:** 13
*   **Priority:** High
*   **Required Previous Modules:** 3.2 MES, 2.3 WMS
*   **Dependencies:** MES, WMS
*   **Estimated Complexity:** Medium
*   **Risk Level:** High (Compliance)
*   **Testing Requirements:** Integration tests verifying that a "Fail" disposition hard-blocks downstream shipping modules.
*   **Definition of Done (DoD):** Inspection protocols attached to GRNs and Production stages. QA can log metrics and generate CAPA reports.

### 3.4 Traceability (Lot & Batch Tracking)
*   **Suggested Development Order:** 14
*   **Priority:** High
*   **Required Previous Modules:** 3.3 QC
*   **Dependencies:** MES, Inventory, WMS, QC
*   **Estimated Complexity:** High (Graph Traversals)
*   **Risk Level:** Medium
*   **Testing Requirements:** E2E Recall simulation. Ensure query completes in < 2.5 seconds.
*   **Definition of Done (DoD):** Dynamic visual tree maps upstream Raw Materials to downstream Finished Goods, tying Lots to specific Sales Orders.

### 3.5 Printing Engine
*   **Suggested Development Order:** 15
*   **Priority:** Medium
*   **Required Previous Modules:** 2.5 Barcode
*   **Dependencies:** Barcode, Settings
*   **Estimated Complexity:** Medium
*   **Risk Level:** Low
*   **Testing Requirements:** PDF rendering validation across browser types. ZPL raw socket connection tests.
*   **Definition of Done (DoD):** A4 Templates (Invoices, Travelers) export to PDF. Thermal templates generate raw driver images/ZPL for lot labels.

### 3.6 Production Planning
*   **Suggested Development Order:** 16
*   **Priority:** Medium
*   **Required Previous Modules:** 3.2 MES
*   **Dependencies:** MES, Sales, Recipes
*   **Estimated Complexity:** Very High (Scheduling Algorithms)
*   **Risk Level:** Medium
*   **Testing Requirements:** Rendering tests for Gantt charts with 1,000+ DOM nodes.
*   **Definition of Done (DoD):** Visual capacity planner active. Drag-and-drop scheduling recalculates material ATP instantly.

---

## Phase 4: Enterprise Back-Office & Intelligence
**Goals:** Close the loop on financial accounting, employee management, and data observability.
**Deliverables:** Accounting/Finance, HR/Payroll, Maintenance, Reports/BI, Enterprise Search.
**Risks:** Financial rounding errors or un-balanced Journal Entries will fail statutory audits.
**Validation Checklist:**
- [ ] Every transaction from Phase 2 & 3 correctly hits the General Ledger automatically.
- [ ] Payroll runs calculate taxes correctly and generate JEs.
- [ ] Global search finds a deeply nested Lot ID in under 500ms.
- [ ] Dashboards render live metrics without crashing the database.

### 4.1 Accounting & Finance
*   **Suggested Development Order:** 17
*   **Priority:** Critical
*   **Required Previous Modules:** All previous transactional modules.
*   **Dependencies:** *All Modules* (Event-Driven)
*   **Estimated Complexity:** Very High
*   **Risk Level:** Critical (Financial Liability)
*   **Testing Requirements:** 100% Unit coverage on Double-Entry validation. Integration tests intercepting backend events (e.g., GRN ➔ AP Accrual).
*   **Definition of Done (DoD):** Chart of Accounts active. AP/AR ledgers functional. Automated JEs post successfully. Period closing locks historical edits.

### 4.2 Human Resources & Payroll
*   **Suggested Development Order:** 18
*   **Priority:** Medium
*   **Required Previous Modules:** 4.1 Accounting
*   **Dependencies:** Settings, Accounting
*   **Estimated Complexity:** High
*   **Risk Level:** High (PII & Compliance)
*   **Testing Requirements:** Strict security testing on PII obfuscation. E2E tests for time-attendance to payroll batch processing.
*   **Definition of Done (DoD):** Employee master data secured. Time/Leave tracked. Payroll batches generate payable liabilities in the GL.

### 4.3 Maintenance (EAM)
*   **Suggested Development Order:** 19
*   **Priority:** Low
*   **Required Previous Modules:** 3.2 MES
*   **Dependencies:** Inventory, MES
*   **Estimated Complexity:** Medium
*   **Risk Level:** Low
*   **Testing Requirements:** E2E for Work Order lifecycle from breakdown to spare part consumption.
*   **Definition of Done (DoD):** Asset registry active. Preventative maintenance schedules trigger work orders. Spare parts deduct from inventory.

### 4.4 Enterprise Search
*   **Suggested Development Order:** 20
*   **Priority:** Medium
*   **Required Previous Modules:** All Modules
*   **Dependencies:** *All Modules*
*   **Estimated Complexity:** High (Index Management)
*   **Risk Level:** Medium (Data Leaks)
*   **Testing Requirements:** RBAC pre-filter validation (ensuring restricted rows are absent from search). Performance testing for < 500ms response.
*   **Definition of Done (DoD):** Full-Text Search (FTS) indices active. Cmd+K Omnisearch functions globally. Advanced faceted search available in all lists.

### 4.5 Reports & Business Intelligence (BI)
*   **Suggested Development Order:** 21
*   **Priority:** Low (Deferred to end)
*   **Required Previous Modules:** All Modules
*   **Dependencies:** *All Modules*
*   **Estimated Complexity:** Medium
*   **Risk Level:** Low
*   **Testing Requirements:** Query optimization testing (ensuring BI queries do not table-lock the transactional DB).
*   **Definition of Done (DoD):** Dynamic dashboard widgets active (Charts, KPIs). Complex data tables exportable to Excel/PDF. Row-level security enforced on financial reports.
