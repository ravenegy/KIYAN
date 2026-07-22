# Module Specification Document
## Application Route Map Specification
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Single Page Application (SPA), Role-Based Routing

---

## 1. Objective & Scope
This document outlines the official Route Map Specification for the KIYAN Factory ERP frontend application. It defines the URL structure, access controls, navigational flow, and error handling for every major user interface view. This specification guarantees a secure, predictable, and scalable routing architecture that seamlessly enforces Role-Based Access Control (RBAC).

---

## 2. Global Routing Principles

### 2.1 Unauthorized Behaviour (System-Wide)
*   **Unauthenticated (401):** Any attempt to access a protected route without a valid session token instantly redirects the user to `/auth/login` with a `?returnUrl=` parameter to restore their intended destination after successful authentication.
*   **Unauthorized (403):** If an authenticated user attempts to access a route they lack permissions for (e.g., a Warehouse Worker navigating directly to `/finance/payroll`), the system intercepts the route transition and renders a standard `403 Forbidden` component. This component displays "Access Denied" and provides a "Request Access" button that triggers a notification to the System Administrator.

### 2.2 Error Pages (System-Wide)
*   **404 Not Found:** Rendered when a route does not match any defined pattern, or when a parameterized route (e.g., `/sales/orders/99999`) fails to find the requested entity in the database. Provides a "Return to Dashboard" button.
*   **500 Internal Server Error:** Rendered if the route successfully loads but the underlying API call fails catastrophically. Displays a generic apology and a unique Error Trace ID for IT support.
*   **503 Maintenance:** Rendered globally if the API triggers a maintenance flag.

---

## 3. Module Routes

### 3.1 Authentication & Profile Module
**Routes:** `/auth/login`, `/auth/forgot-password`, `/profile/settings`
*   **Purpose:** To manage user identity, secure entry, and individual user preferences.
*   **Required Permissions:** `PUBLIC` (for `/auth`), `AUTHENTICATED_USER` (for `/profile`).
*   **Dependencies:** Core Authentication Service.
*   **Possible Navigation:** Login ➔ Redirects to the user's role-specific default Dashboard.
*   **Error Pages:** Generic 500 if Auth Service is down.
*   **Unauthorized Behaviour:** N/A (Login is public).
*   **Future Expansion:** Support for `/auth/sso/saml` for enterprise Single Sign-On integrations (Azure AD, Okta).

### 3.2 Customer Relationship Management (CRM) Module
**Routes:** `/crm/customers`, `/crm/customers/new`, `/crm/customers/:id`
*   **Purpose:** To view, create, and manage customer master data, financial health, and communication logs.
*   **Required Permissions:** `CUSTOMER_VIEW`, `CUSTOMER_CREATE`, `CUSTOMER_EDIT`.
*   **Dependencies:** Sales (for order history), Accounting (for credit limit/balance).
*   **Possible Navigation:** `List View` ➔ click row ➔ `Detail View`. From Detail View ➔ "New Quote", "View Invoices", "Edit Credit Limit".
*   **Error Pages:** 404 if `:id` does not exist.
*   **Unauthorized Behaviour:** Reverts to 403 Forbidden.
*   **Future Expansion:** `/crm/portal-users` to manage external access for the future B2B self-service portal.

### 3.3 Sales & Invoicing Module
**Routes:** `/sales/quotations`, `/sales/orders`, `/sales/orders/:id`, `/sales/invoices`, `/sales/returns`
*   **Purpose:** To manage the Order-to-Cash lifecycle, from initial quoting to final invoicing and RMAs.
*   **Required Permissions:** `SO_VIEW`, `SO_CREATE`, `INVOICE_GENERATE`.
*   **Dependencies:** CRM, Inventory (ATP), Pricing Engine, Tax Engine.
*   **Possible Navigation:** `Order Detail` ➔ "Generate Delivery Note", "Apply Discount", "Cancel Order". Breadcrumb links back to Customer Profile.
*   **Error Pages:** 404 if Order ID invalid; 500 if pricing engine fails to compute taxes.
*   **Unauthorized Behaviour:** Read-only view provided if user lacks edit permissions; 403 if user lacks view permissions entirely.
*   **Future Expansion:** `/sales/ecommerce-sync` to monitor web order ingestion logs.

### 3.4 Purchasing & Supplier Management Module
**Routes:** `/procurement/suppliers`, `/procurement/suppliers/:id`, `/procurement/requisitions`, `/procurement/rfqs`, `/procurement/orders`, `/procurement/orders/:id`
*   **Purpose:** To manage vendor relationships, negotiate quotes, and issue legally binding Purchase Orders.
*   **Required Permissions:** `PO_VIEW`, `PO_CREATE`, `SUPPLIER_MANAGE`.
*   **Dependencies:** Accounting (Budget/AP), Inventory, Quality (AVL).
*   **Possible Navigation:** `PR List` ➔ "Convert to RFQ". `Supplier Detail` ➔ "View Open POs", "Upload ISO Certificate".
*   **Error Pages:** 404 for invalid PO or Supplier IDs.
*   **Unauthorized Behaviour:** Users without PO approval rights will see the "Approve" button disabled or hidden.
*   **Future Expansion:** `/procurement/contracts` for managing long-term Master Service Agreements and dynamic discounting.

### 3.5 Inventory & Warehouse Management (WMS) Module
**Routes:** `/inventory/items`, `/inventory/stock-ledger`, `/warehouse/tasks`, `/warehouse/grn`, `/warehouse/dispatch`
*   **Purpose:** To monitor physical stock, manage lot locations, and execute put-away/picking tasks.
*   **Required Permissions:** `INVENTORY_VIEW`, `WMS_TASK_EXECUTE`, `GRN_CREATE`.
*   **Dependencies:** Purchasing (for GRN), Sales (for Dispatch), QC (for Quarantine states).
*   **Possible Navigation:** `Task List` ➔ click task ➔ `Task Execution (Barcode Scanning Mode)`.
*   **Error Pages:** 400 Bad Request if a scanned barcode doesn't match the expected task context.
*   **Unauthorized Behaviour:** Office staff navigating to `/warehouse/tasks` receive a 403 (restricted to WMS workers).
*   **Future Expansion:** `/warehouse/map` for a 3D digital twin visualization of the factory floor and bin locations.

### 3.6 Recipes & BOM (Engineering) Module
**Routes:** `/engineering/recipes`, `/engineering/recipes/:id`, `/engineering/recipes/:id/version/:version_id`
*   **Purpose:** To manage Master Recipes, BOM components, expected yields, and formula versioning.
*   **Required Permissions:** `RECIPE_VIEW`, `RECIPE_CREATE`, `RECIPE_APPROVE`.
*   **Dependencies:** Inventory (Item Master), Production Planning.
*   **Possible Navigation:** `Recipe Detail` ➔ "View Version History" ➔ `Version Detail` ➔ "Clone as Draft".
*   **Error Pages:** 404 if specific recipe version is not found.
*   **Unauthorized Behaviour:** Users without approval rights cannot transition a version from DRAFT to ACTIVE.
*   **Future Expansion:** `/engineering/simulation` for what-if cost analysis based on commodity market fluctuations.

### 3.7 Production Planning Module
**Routes:** `/production/planning`, `/production/schedule-gantt`, `/production/capacity`
*   **Purpose:** To balance market demand against factory capacity and generate the Master Production Schedule.
*   **Required Permissions:** `PLANNING_VIEW`, `SCHEDULE_MANAGE`.
*   **Dependencies:** Sales (Orders), Inventory (ATP), HR (Shift availability), Maintenance (Machine availability).
*   **Possible Navigation:** `Gantt Chart` ➔ Drag & Drop Order ➔ `Order Detail Modal`.
*   **Error Pages:** 500 if the capacity planning algorithm times out on massive datasets.
*   **Unauthorized Behaviour:** Read-only view for standard users; dragging/dropping disabled.
*   **Future Expansion:** `/production/ai-optimizer` for machine-learning-driven schedule generation.

### 3.8 Production Order (MES) Module
**Routes:** `/production/orders`, `/production/orders/:id`, `/mes/workcenter/:machine_id`
*   **Purpose:** To track the physical manufacturing process, material consumption, and yield recording.
*   **Required Permissions:** `PRODUCTION_ORDER_VIEW`, `MES_OPERATOR`.
*   **Dependencies:** Recipes, Planning, Inventory.
*   **Possible Navigation:** `Production Orders` ➔ "Release". `Workcenter UI` ➔ "Start", "Pause", "Consume Material", "Log Yield".
*   **Error Pages:** 409 Conflict if attempting to start an order that lacks required materials.
*   **Unauthorized Behaviour:** Accessing `/mes/workcenter/:machine_id` without specific machine certification triggers a 403 safety block.
*   **Future Expansion:** `/mes/scada-monitor` for real-time PLC telemetry visualization.

### 3.9 Quality Control (QMS) Module
**Routes:** `/quality/protocols`, `/quality/inspections`, `/quality/inspections/:id`, `/quality/capa`
*   **Purpose:** To enforce testing standards, log inspection results, and manage Corrective Actions.
*   **Required Permissions:** `QC_VIEW`, `QC_INSPECT`, `CAPA_MANAGE`.
*   **Dependencies:** WMS (GRN holds), Production (WIP checks).
*   **Possible Navigation:** `Pending Inspections` ➔ `Execute Inspection Form` ➔ "Pass/Fail". `CAPA List` ➔ `CAPA Detail`.
*   **Error Pages:** 400 Bad Request if numeric test results fall outside strictly validated bounds without a justification.
*   **Unauthorized Behaviour:** Users without QA Manager rights cannot override a "Fail" disposition.
*   **Future Expansion:** `/quality/spc` for Statistical Process Control control-chart plotting.

### 3.10 Batch & Lot Tracking (Traceability) Module
**Routes:** `/traceability/lots`, `/traceability/lots/:id`, `/traceability/recall`
*   **Purpose:** To trace material lineage, monitor expiry, and execute emergency product recalls.
*   **Required Permissions:** `TRACEABILITY_VIEW`, `RECALL_EXECUTE`.
*   **Dependencies:** Inventory, QC, Sales, Purchasing.
*   **Possible Navigation:** `Lot Detail` ➔ "View Lineage Tree" ➔ "View Associated Orders". `Recall Dashboard` ➔ "Initiate Trace Quarantine".
*   **Error Pages:** 404 for invalid Lot ID.
*   **Unauthorized Behaviour:** Only Executive/QA Management roles can access `/traceability/recall` and trigger quarantines.
*   **Future Expansion:** `/traceability/blockchain` for verifying lineage via external distributed ledger networks.

### 3.11 Accounting & Finance Module
**Routes:** `/finance/dashboard`, `/finance/chart-of-accounts`, `/finance/journal-entries`, `/finance/ap`, `/finance/ar`, `/finance/statements`
*   **Purpose:** To manage the General Ledger, Accounts Payable/Receivable, banking, and statutory reporting.
*   **Required Permissions:** `FINANCE_VIEW`, `FINANCE_POST`, `PERIOD_CLOSE`.
*   **Dependencies:** All modules (Every transactional route posts to the GL via backend events).
*   **Possible Navigation:** `AP List` ➔ `Vendor Invoice Detail` ➔ "Approve Payment". `Statements` ➔ "Generate P&L".
*   **Error Pages:** 500 if a Journal Entry submission fails the zero-balance validation check.
*   **Unauthorized Behaviour:** Strict 403 for non-finance staff.
*   **Future Expansion:** `/finance/consolidation` for multi-company/multi-currency financial roll-ups.

### 3.12 Human Resources & Payroll Module
**Routes:** `/hr/employees`, `/hr/employees/:id`, `/hr/attendance`, `/hr/leave-requests`, `/hr/payroll`, `/hr/payroll/:run_id`
*   **Purpose:** To manage employee profiles, track time/attendance, and execute payroll batches.
*   **Required Permissions:** `HR_VIEW`, `HR_MANAGE_SENSITIVE`, `PAYROLL_EXECUTE`.
*   **Dependencies:** Production (Capacity), Accounting (Payroll JEs).
*   **Possible Navigation:** `Employee Detail` ➔ "View Documents", "View Attendance". `Payroll Dashboard` ➔ "Initiate Monthly Run" ➔ "Approve Batch".
*   **Error Pages:** 404 for invalid employee ID.
*   **Unauthorized Behaviour:** Standard users navigating to their own `/hr/employees/me` can only view non-sensitive data, blocking access to other employees' profiles.
*   **Future Expansion:** `/hr/recruitment` for managing Applicant Tracking Systems (ATS).

### 3.13 Reports & Business Intelligence Module
**Routes:** `/bi/dashboards`, `/bi/reports/operational`, `/bi/reports/financial`, `/bi/saved-views`
*   **Purpose:** To provide analytical insights, data visualization, and exportable reports.
*   **Required Permissions:** `BI_VIEW_BASIC`, `BI_VIEW_FINANCIAL`.
*   **Dependencies:** Data Warehouse / OLAP Replicas.
*   **Possible Navigation:** `Dashboard` ➔ Click Chart Widget ➔ `Detailed Report View` ➔ "Export to PDF/Excel".
*   **Error Pages:** 504 Gateway Timeout if a massive unoptimized query runs too long (triggers cancellation).
*   **Unauthorized Behaviour:** Financial reports are filtered from the UI for operational staff.
*   **Future Expansion:** `/bi/ai-query` for Natural Language Processing (NLP) chat-based data querying.

### 3.14 System Governance & Admin Module
**Routes:** `/admin/users`, `/admin/roles`, `/admin/audit-logs`, `/admin/integrations`, `/admin/settings`
*   **Purpose:** To manage IT infrastructure, user access, API keys, and review security audits.
*   **Required Permissions:** `SUPER_ADMIN`.
*   **Dependencies:** All modules.
*   **Possible Navigation:** `User List` ➔ `User Detail` ➔ "Edit Role". `Audit Logs` ➔ "Filter by User".
*   **Error Pages:** Standard 404/500.
*   **Unauthorized Behaviour:** Strict 403 for anyone without SUPER_ADMIN.
*   **Future Expansion:** `/admin/webhooks` to configure outbound event-driven API triggers for external systems.

---
*End of Route Map Specification. This document guarantees predictable, secure navigation pathways across the entire ERP ecosystem.*
