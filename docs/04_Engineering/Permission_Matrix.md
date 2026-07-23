# Module Specification Document
## Permission Matrix & Access Control Specification
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Default-Deny Security Posture, RBAC (Future-Ready for ABAC)

---

## 1. Objective & Scope
This document defines the official Access Control architecture for the KIYAN ERP. It outlines the Role-Based Access Control (RBAC) framework, mapping specific user roles to actionable permissions across all system modules. This matrix ensures that the principle of "Least Privilege" is strictly enforced, preventing unauthorized data exposure or malicious/accidental system mutation. Furthermore, the architecture is designed to support a seamless future transition to Attribute-Based Access Control (ABAC) for highly granular, context-aware security.

---

## 2. Action Definitions (The Verbs)

Every module in the system exposes a combination of the following discrete actions:

*   **View:** Read-only access to records and lists.
*   **Create:** Ability to generate new records or documents.
*   **Update:** Ability to modify existing, un-locked records.
*   **Delete:** Ability to permanently remove (or soft-delete/archive) a record. *Highly restricted.*
*   **Approve:** Ability to execute workflow authorizations (e.g., approving a PO, releasing a Batch, validating a Recipe).
*   **Export:** Ability to extract data from the system in bulk formats (CSV, Excel). *Highly restricted to prevent data exfiltration.*
*   **Print:** Ability to generate physical copies, PDF reports, or barcode labels.
*   **Manage:** Administrative bypass capability within a specific module (e.g., overriding system blocks, configuring module-level settings, reassigning records).

---

## 3. Core Enterprise Roles (The Actors)

For the purpose of this matrix, standard enterprise roles are defined as follows:
*   **ADMIN:** System Administrator / IT superuser.
*   **EXEC:** Executive / Factory Manager / Plant Director.
*   **PROD-MGR:** Production Manager / Shift Supervisor.
*   **PROD-OP:** Shop-floor Operator / Machine Worker.
*   **WMS-MGR:** Warehouse / Inventory Manager.
*   **WMS-OP:** Warehouse Worker / Forklift Operator.
*   **PURCH:** Purchasing Officer / Buyer.
*   **SALES:** Sales Representative / Account Manager.
*   **FINANCE:** Accountant / Financial Controller.
*   **HR:** Human Resources Manager.
*   **QA:** Quality Assurance Manager / Analyst.
*   **MAINT:** Maintenance Supervisor / Technician.

---

## 4. The Permission Matrix

*(Legend: **Y** = Granted, **N** = Denied, **C** = Conditional/Own Records Only)*

### 4.1 Dashboard
*   **View:** All Roles (Customized to role).
*   **Create/Update/Delete:** N/A (Dashboards are pre-configured).
*   **Export/Print:** EXEC, ADMIN, FINANCE.
*   **Manage:** ADMIN.

### 4.2 Inventory (Stock Ledger & Valuations)
*   **View:** EXEC, PROD-MGR, WMS-MGR, WMS-OP, PURCH, SALES, FINANCE.
*   **Create/Update:** WMS-MGR, WMS-OP (via movements).
*   **Delete:** N (Immutable ledger).
*   **Approve:** WMS-MGR (Stock adjustments/write-offs).
*   **Export:** EXEC, WMS-MGR, FINANCE.
*   **Print:** WMS-MGR, WMS-OP.
*   **Manage:** WMS-MGR.

### 4.3 Warehouse (Tasks, Receipts, Dispatch)
*   **View:** EXEC, WMS-MGR, WMS-OP, PROD-MGR, PURCH, SALES.
*   **Create:** WMS-MGR (Create Tasks).
*   **Update:** WMS-OP (Execute Tasks).
*   **Delete:** WMS-MGR (Cancel Tasks).
*   **Approve:** QA (Incoming GRN approval), WMS-MGR.
*   **Export:** WMS-MGR.
*   **Print:** WMS-MGR, WMS-OP (Labels, Picklists).
*   **Manage:** WMS-MGR.

### 4.4 Products (Item Master Data)
*   **View:** All Roles.
*   **Create/Update:** PROD-MGR, WMS-MGR, FINANCE (Costings).
*   **Delete:** ADMIN (Soft-delete only).
*   **Approve:** EXEC, QA (New product release).
*   **Export:** EXEC, PROD-MGR, SALES.
*   **Print:** Y.
*   **Manage:** ADMIN.

### 4.5 Production (Orders & MES)
*   **View:** EXEC, PROD-MGR, PROD-OP, WMS-MGR, MAINT.
*   **Create:** PROD-MGR (Create Orders).
*   **Update:** PROD-MGR, PROD-OP (Execute/Log Yield).
*   **Delete:** PROD-MGR (Cancel Drafts).
*   **Approve:** PROD-MGR (Release Orders), QA (CCP Approvals).
*   **Export:** EXEC, PROD-MGR.
*   **Print:** PROD-MGR, PROD-OP.
*   **Manage:** PROD-MGR.

### 4.6 Recipes (BOMs & Engineering)
*   **View:** EXEC, PROD-MGR, QA, FINANCE, PURCH.
*   **Create/Update:** PROD-MGR, R&D.
*   **Delete:** N (Versioned).
*   **Approve:** QA, FINANCE, EXEC.
*   **Export:** EXEC, PROD-MGR.
*   **Print:** PROD-MGR.
*   **Manage:** PROD-MGR.

### 4.7 Purchasing (PR, RFQ, PO)
*   **View:** EXEC, PURCH, FINANCE, WMS-MGR.
*   **Create/Update:** PURCH (POs), All Roles (PRs for their dept).
*   **Delete:** PURCH (Cancel Drafts).
*   **Approve:** FINANCE, EXEC (Based on value thresholds).
*   **Export:** EXEC, PURCH.
*   **Print:** PURCH, WMS-MGR.
*   **Manage:** PURCH.

### 4.8 Sales (CRM, Quotes, Orders, Invoicing)
*   **View:** EXEC, SALES, FINANCE, WMS-MGR (Dispatch view).
*   **Create/Update:** SALES (Orders, CRM), FINANCE (Invoices).
*   **Delete:** SALES (Cancel Drafts).
*   **Approve:** FINANCE (Credit Limits), EXEC (Margin overrides).
*   **Export:** EXEC, SALES-MGR.
*   **Print:** SALES, WMS-MGR (Delivery Notes).
*   **Manage:** SALES-MGR.

### 4.9 Accounting (GL, AP/AR, Assets, Cash)
*   **View:** EXEC, FINANCE.
*   **Create/Update:** FINANCE.
*   **Delete:** N (Immutable Ledger. Requires Reversal JE).
*   **Approve:** FINANCE (Controller/CFO).
*   **Export:** EXEC, FINANCE.
*   **Print:** FINANCE.
*   **Manage:** FINANCE (Period Closing).

### 4.10 HR (Payroll, Employees, Attendance)
*   **View:** HR, EXEC, All Roles (Self-view only).
*   **Create/Update:** HR.
*   **Delete:** ADMIN.
*   **Approve:** HR, Dept Managers (Leave Approvals).
*   **Export:** HR, FINANCE.
*   **Print:** HR.
*   **Manage:** HR.

### 4.11 Reports (Business Intelligence)
*   **View:** C (Role-specific viewing limits applied via Row-Level Security).
*   **Create/Update:** EXEC, Dept Managers (Custom Views).
*   **Delete:** C.
*   **Approve:** N/A.
*   **Export:** EXEC, Dept Managers.
*   **Print:** All Viewers.
*   **Manage:** ADMIN, EXEC.

### 4.12 Maintenance (Work Orders, Assets)
*   **View:** EXEC, MAINT, PROD-MGR.
*   **Create/Update:** MAINT, PROD-OP (Submit breakdown tickets).
*   **Delete:** MAINT (Cancel drafts).
*   **Approve:** MAINT (Close work orders), FINANCE (CapEx approvals).
*   **Export:** MAINT.
*   **Print:** MAINT.
*   **Manage:** MAINT.

### 4.13 Settings & Config
*   **View:** ADMIN, EXEC.
*   **Create/Update/Delete:** ADMIN.
*   **Approve/Export/Print:** ADMIN.
*   **Manage:** ADMIN (Global configurations, Webhooks, API Keys).

### 4.14 Users (Identity & Access)
*   **View:** ADMIN, HR.
*   **Create/Update:** ADMIN, HR (Initiate Onboarding).
*   **Delete:** ADMIN (Deactivate only).
*   **Approve:** ADMIN.
*   **Export:** ADMIN.
*   **Print:** ADMIN.
*   **Manage:** ADMIN (Assign Roles, Password Resets).

---

## 5. Inheritance Architecture

### 5.1 Role Hierarchies
The system implements hierarchical RBAC to reduce administrative overhead. Higher-level roles automatically inherit the permissions of their subordinate roles.
*   **Example:** A `SENIOR_ACCOUNTANT` role inherently possesses all permissions assigned to the base `ACCOUNTANT` role, plus additional permissions (e.g., `Approve Journal Entry`).
*   **Structure:** Base Role ➔ Supervisor Role ➔ Department Head Role.

### 5.2 Additive Access
A single user can be assigned multiple roles. Permissions are strictly **additive** (Union).
*   **Example:** If User A is assigned `SALES_REP` and `WMS_OPERATOR`, they possess the combined View/Create capabilities of both roles.

---

## 6. Conflict Resolution & Default-Deny Posture

### 6.1 Default-Deny
The system operates on a "Default-Deny" (Zero Trust) baseline. If a permission rule is not explicitly mapped and granted to a user's role, the system will actively deny the request and return a `403 Forbidden` error.

### 6.2 Explicit Deny Overrides Allow (Conflict Handling)
In complex, multi-role assignments, a conflict may arise if specific security policies are implemented.
*   **Rule:** If a user possesses a role that grants `EXPORT_SALES` but is simultaneously assigned a temporary penalty role (e.g., `RESTRICTED_ACCESS`) that contains an explicit `DENY: EXPORT_SALES` directive, the **Explicit Deny** always wins.
*   **Segregation of Duties (SoD):** The system prevents toxic role combinations. A user cannot simultaneously hold `CREATE_PO` and `APPROVE_PO` unless they are a designated Executive. If an admin attempts to assign conflicting SoD roles, the system rejects the assignment to prevent fraud.

---

## 7. Future Expansion: Attribute-Based Access Control (ABAC)

To future-proof the ERP for enterprise scale, the access control engine is designed to evaluate dynamic **Attributes** in addition to static Roles. Once ABAC is fully activated, permissions will be evaluated against:

*   **User Attributes:** Location, Department, Security Clearance, Shift Status.
*   **Resource Attributes:** Document Value, Factory Branch, Document Status.
*   **Environment Attributes:** Time of day, IP Address location, Active VPN status.

### 7.1 ABAC Implementation Examples:
*   **Value-Based Approval:** "A Purchasing Manager can only `APPROVE` a Purchase Order **IF** the `PO.TotalAmount` is $< $50,000."
*   **Time/Location Based Access:** "A Warehouse Operator can only `VIEW` the Inventory Module **IF** `Environment.Time` is within their scheduled Shift Hours **AND** their `User.IP_Address` matches the internal factory network."
*   **Record Ownership:** "A Sales Representative can only `UPDATE` a Sales Order **IF** `SalesOrder.CreatedBy` == `User.ID`." (Row-Level Security via ABAC).

*End of Permission Matrix Specification. This framework establishes a bulletproof, scalable security perimeter for the manufacturing enterprise.*
