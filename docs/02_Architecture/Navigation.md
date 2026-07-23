# Module Specification Document
## Navigation & User Flow Specification
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Senior UX Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Role-Based Access Control (RBAC), Task-Driven UX

---

## 1. Objective & Scope
This document outlines the official Information Architecture (IA) and User Flow Specification for the KIYAN Factory ERP. As a massive, multi-domain enterprise system, navigation must be strictly governed by Role-Based Access Control (RBAC) and Progressive Disclosure. The goal is to ensure that users are never overwhelmed by the sheer scale of the ERP, but instead are guided linearly through their specific operational tasks with minimal cognitive load and zero dead-ends.

---

## 2. Global Navigation & UX Principles

### 2.1 Navigation Principles
*   **Progressive Disclosure:** Users only see the modules, sub-menus, and actions explicitly mapped to their RBAC profile. The interface remains decluttered.
*   **The "Three-Click" Rule:** No primary operational task should require more than three clicks from the user's landing page.
*   **Contextual Immutability:** When a user is inside a specific document (e.g., a Sales Order), the global navigation recedes, and contextual sub-navigation (e.g., Order Lines, Shipping, Billing, Audit Log) takes precedence to maintain focus.

### 2.2 Menu Structure
*   **Primary Navigation (Left Sidebar):** A persistent, collapsible sidebar housing the core Domain Modules (e.g., Sales, Production, Finance). Modules expand via accordion to reveal sub-entities.
*   **Global Utility Bar (Top Navbar):** Houses ubiquitous tools: Global Search, Notification Center, User Profile/Settings, and the "Quick Create" global action button (+).
*   **Contextual Action Bar (Page Header):** Sits below the top navbar, specific to the current page. Contains document-specific actions (e.g., `Save`, `Submit for Approval`, `Print PDF`).

### 2.3 Breadcrumb Strategy
*   **Hierarchical & Clickable:** Breadcrumbs are ubiquitous and always reflect the strict data hierarchy, not the user's click history. (e.g., `Modules > Sales > Customer Profiles > KIYAN B2B > Sales Order #1045`).
*   Every node in the breadcrumb is a clickable link, allowing rapid upward traversal.

### 2.4 Global Search Flow
*   **Omnisearch (`Cmd/Ctrl + K`):** A universally accessible overlay search bar.
*   **Smart Parsing:** Supports natural language and direct IDs (e.g., typing "PO-5099" brings up the Purchase Order, typing "Sesame" brings up the RM Master Profile and current stock levels).
*   **Categorized Output:** Search results are grouped by domain (e.g., *Customers*, *Lots*, *Orders*) and feature immediate quick-action deep links.

### 2.5 Notification Flow
*   **Triage Center:** Accessed via the top-right bell icon. Notifications are strictly categorized:
    *   *Critical (Red):* Requires immediate action (e.g., System failure, Machine breakdown). Modal interrupt if urgent.
    *   *Action Required (Yellow):* Approvals, pending QC results.
    *   *Informational (Blue):* Batch complete, PO received.
*   **Deep-Linking:** Clicking a notification instantly routes the user to the exact transactional document requiring action, bypassing the standard navigation tree.

### 2.6 Personalization (Recent, Favorites, Shortcuts)
*   **Recent Activity:** A "Recently Viewed" history stack accessible from the Global Search modal, allowing users to jump back to the last 5 records they were editing.
*   **Favorites:** Users can "Star" any module, specific report, or specific document. These populate a dedicated "Favorites" section at the top of the Left Sidebar.
*   **Keyboard Shortcuts:** Global hotkeys for power users (e.g., `Alt+N` for New Document, `Alt+S` for Save).

---

## 3. Role-Based User Flows

### 3.1 Administrator
*   **Landing Page:** System Health & IT Operations Dashboard (Server Load, API Status, Security Alerts).
*   **Accessible Modules:** All Modules, System Settings, User Management, Integrations, Audit Logs.
*   **Navigation Hierarchy:** `Settings > User Management > Roles & Permissions`.
*   **Quick Actions:** `Add New User`, `Flush System Cache`, `Export Audit Log`.
*   **Dashboard Flow:** Monitors real-time system metrics ➔ Identifies anomalous API failure ➔ Clicks metric ➔ Routed to Integration Logs for debugging.
*   **Workflow Between Modules:** Primarily cross-module troubleshooting and master data configuration (e.g., mapping a new warehouse bin, then applying it to a user's permissions).

### 3.2 Factory Manager (Plant Director)
*   **Landing Page:** Executive Plant Dashboard (Live OEE, Total Output vs Target, High-Level Financials, Critical Bottlenecks).
*   **Accessible Modules:** Production, Planning, Quality, Warehouse, Maintenance, HR (View Only), Finance (View Only).
*   **Navigation Hierarchy:** `Dashboards > Plant Analytics > Line 1 Performance`.
*   **Quick Actions:** `Approve CAPA`, `Override Production Block`, `Authorize Overtime`.
*   **Dashboard Flow:** Views high Scrap Rate on Dashboard ➔ Clicks widget ➔ Routed to Quality Control COPQ Report ➔ Investigates specific machines.
*   **Workflow Between Modules:** Receives automated alert regarding severe machine downtime ➔ Drills into Maintenance Module to view ETA ➔ Drills into Planning Module to authorize schedule shift.

### 3.3 Warehouse Employee
*   **Landing Page:** Mobile-optimized Task Queue (Put-away, Picking, Cycle Counts).
*   **Accessible Modules:** WMS, Inventory, Receiving, Dispatch (Highly restricted views).
*   **Navigation Hierarchy:** `Tasks > Active Picks > Picklist #402`.
*   **Quick Actions:** `Scan Barcode`, `Confirm Move`, `Log Missing Item`, `Print Lot Label`.
*   **Dashboard Flow:** Extremely linear. User sees a prioritized list of tasks ➔ Clicks top task ➔ UI switches to barcode scanning mode ➔ Confirms action ➔ Returns to Task Queue.
*   **Workflow Between Modules:** Interacts primarily within WMS. Triggers physical states that update Purchasing (GRN) or Sales (Delivery Note) in the background.

### 3.4 Production Manager
*   **Landing Page:** Master Production Schedule (MPS) Gantt Chart.
*   **Accessible Modules:** Planning, Production Orders, Recipes (BOM), Inventory (ATP view), Maintenance (Status view).
*   **Navigation Hierarchy:** `Production > Active Orders > PO-992`.
*   **Quick Actions:** `Release Order to Floor`, `Assign Operator`, `Pause Production Line`, `Request Material Re-stock`.
*   **Dashboard Flow:** Reviews daily MPS ➔ Identifies material shortage warning ➔ Drills down to BOM ➔ Reallocates orders based on current ATP stock.
*   **Workflow Between Modules:** Converts Planned Orders to Released ➔ Pushes tasks to Operator terminals (MES) ➔ Monitors real-time yield against Recipes ➔ Coordinates with Maintenance if OEE drops.

### 3.5 Operator (Shop Floor)
*   **Landing Page:** Work Center Terminal (MES) - Touch-optimized interface locked to their specific machine.
*   **Accessible Modules:** MES Execution strictly limited to the active Production Order.
*   **Navigation Hierarchy:** Flat. `Active Order > Consumption > Yield`.
*   **Quick Actions:** `Clock In`, `Start Machine`, `Stop/Pause`, `Scan Material`, `Log Waste`.
*   **Dashboard Flow:** Operator logs in ➔ Sees only the currently released Production Order for their machine ➔ Follows step-by-step wizard to consume RM Lots ➔ Logs final yield.
*   **Workflow Between Modules:** No cross-module navigation. Their actions seamlessly update Inventory and HR (Time & Attendance) via background APIs.

### 3.6 Purchasing Officer
*   **Landing Page:** Procurement Command Center (Open PRs, RFQs Pending, PO Status, Late Deliveries).
*   **Accessible Modules:** Purchasing, Supplier Management, Inventory (ATP & Reorder points).
*   **Navigation Hierarchy:** `Purchasing > Purchase Orders > Drafts`.
*   **Quick Actions:** `Create PO`, `Convert PR to RFQ`, `Approve Price Variance`, `Evaluate Supplier`.
*   **Dashboard Flow:** Reviews MRP auto-generated Purchase Requisitions ➔ Selects items ➔ Consolidates into a single RFQ ➔ Sends to Suppliers from the CRM list.
*   **Workflow Between Modules:** Monitors Inventory alerts ➔ Issues POs in Purchasing ➔ Tracks GRNs executed by Warehouse ➔ Coordinates with Finance for Accounts Payable.

### 3.7 Sales Employee
*   **Landing Page:** CRM Dashboard (Sales Pipeline, Draft Quotes, Orders to Ship, Customer Credit Holds).
*   **Accessible Modules:** CRM, Sales & Invoicing, Inventory (ATP view only).
*   **Navigation Hierarchy:** `Sales > Quotations > Draft Quotes`.
*   **Quick Actions:** `New Quote`, `Convert Quote to Order`, `Check Customer Credit`, `Apply Discount`.
*   **Dashboard Flow:** Reviews open leads ➔ Generates Quote ➔ Converts to Sales Order ➔ Checks real-time ATP inventory to confirm delivery date.
*   **Workflow Between Modules:** Works heavily between CRM (Profiles/Pricing) and Sales (Orders). Relies on ATP data from Inventory. Hands off fulfillment to Warehouse via `RELEASED` status.

### 3.8 Accountant
*   **Landing Page:** Financial Command Center (Cash Flow, Pending AP Approvals, Unmatched AR, Unreconciled Bank statements).
*   **Accessible Modules:** Accounting & Finance, Purchasing (Invoices), Sales (Invoices), Inventory (Valuation).
*   **Navigation Hierarchy:** `Finance > Accounts Payable > Unpaid Invoices`.
*   **Quick Actions:** `Post Journal Entry`, `Run Depreciation`, `Approve Payment`, `Generate P&L`.
*   **Dashboard Flow:** Identifies unmatched bank transaction ➔ Clicks transaction ➔ Opens AR ledger ➔ Manually allocates payment to specific Customer Invoices.
*   **Workflow Between Modules:** The ultimate downstream recipient. Reviews GRNs from Purchasing, Delivery Notes from Sales, and Scrap logs from Production to finalize Journal Entries and month-end closes.

### 3.9 HR (Human Resources)
*   **Landing Page:** HCM Dashboard (Headcount, Pending Leave Requests, Expiring Documents, Attendance Exceptions).
*   **Accessible Modules:** HR & Payroll.
*   **Navigation Hierarchy:** `HR > Employees > Active Directory`.
*   **Quick Actions:** `Onboard Employee`, `Approve Leave Request`, `Run Monthly Payroll`, `Log Training`.
*   **Dashboard Flow:** Sees "5 Expiring Health Certificates" ➔ Clicks alert ➔ Routed to filtered Employee list ➔ Sends automated email reminders.
*   **Workflow Between Modules:** Manages employee profiles and attendance. At month-end, runs Payroll engine, which pushes a consolidated Journal Entry into the Accounting module.

### 3.10 Quality Control (QC/QA)
*   **Landing Page:** Quality Action Queue (Pending Incoming Inspections, Open CAPAs, In-Process CCP Checks).
*   **Accessible Modules:** Quality Control, WMS (Quarantine zones), Recipes (BOMs), Supplier Management.
*   **Navigation Hierarchy:** `Quality > Inspections > Incoming GRN Queue`.
*   **Quick Actions:** `Log Test Result`, `Initiate Global Quarantine`, `Release Lot`, `Create CAPA`.
*   **Dashboard Flow:** Alert triggers for a new RM delivery ➔ Navigates to GRN Queue ➔ Opens Inspection Form ➔ Logs lab results ➔ Marks Disposition as `Pass`.
*   **Workflow Between Modules:** Acts as the gatekeeper. Blocks WMS put-away until GRN is inspected. Blocks Sales dispatch until FG is inspected. Can trigger Supplier Probation in the Supplier Module.

### 3.11 Maintenance (Reliability Engineer)
*   **Landing Page:** Maintenance Board (Active Breakdowns, Upcoming Preventative Maintenance, Spare Part Inventory).
*   **Accessible Modules:** Maintenance, Purchasing (Spare Parts PRs), Production (Machine schedules).
*   **Navigation Hierarchy:** `Maintenance > Work Orders > Active`.
*   **Quick Actions:** `Create Work Order`, `Log Repair Time`, `Request Spare Part`, `Close Ticket`.
*   **Dashboard Flow:** Receives Operator breakdown alert ➔ Dispatches Technician ➔ Technician logs repair hours and consumed spare parts in the Work Order.
*   **Workflow Between Modules:** Coordinates with Production Planning to schedule Preventative Maintenance during machine idle windows. Pushes Purchase Requisitions for low spare parts directly to the Purchasing Module.

---
*End of Navigation & User Flow Specification. This architecture ensures the system intuitively scales with the user's operational reality, bridging the gap between high-level strategy and shop-floor execution.*
