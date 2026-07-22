# Module Specification Document
## Engineering Task Breakdown (Backlog & Sprint Planning)
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Chief Software Architect & Technical Project Manager
**Date:** July 2026
**Architecture Environment:** Agile/Scrum, Modular Monolith, CI/CD Integrated

---

## 1. Objective & Scope
This document translates the high-level architecture and implementation roadmap into a granular, actionable Engineering Task Breakdown. It is formatted for direct import into issue-tracking systems (e.g., Jira, Linear, Azure DevOps). Every task is scoped to be small enough for an individual engineer to implement independently within a standard 2-week sprint, ensuring measurable velocity and continuous integration.

---

## Epic 1: Foundation & Security (The Perimeter)

### Feature 1.1: Authentication & Identity Management
**Sub-Feature 1.1.1: Core Login Pipeline**
*   **Tasks:**
    *   `[Backend]` Implement JWT generation, signing, and refresh-token rotation logic.
    *   `[Backend]` Implement Bcrypt password hashing and salting for user creation.
    *   `[Backend]` Create brute-force protection middleware (lockout after 5 failed attempts).
    *   `[Frontend]` Build Login UI component with validation and error state handling.
    *   `[Frontend]` Implement HTTP Interceptor to attach Bearer tokens and handle 401 redirects.
*   **Validation:**
    *   *Acceptance Criteria (AC):* User can log in with valid credentials. Invalid attempts show generic errors. Account locks after 5 failures for 30 minutes.
    *   *Testing Tasks:* Unit tests for hashing logic. E2E test simulating successful login and brute-force lockout.
    *   *Documentation:* Document JWT payload structure and token expiration lifecycle in Wiki.

**Sub-Feature 1.1.2: Role-Based Access Control (RBAC)**
*   **Tasks:**
    *   `[Database]` Design and deploy schema for `Roles`, `Permissions`, and `User_Roles` junction tables.
    *   `[Backend]` Develop RBAC Middleware to evaluate JWT claims against required route permissions.
    *   `[Frontend]` Build Super-Admin UI to create custom roles and toggle CRUD permissions.
    *   `[Frontend]` Implement structural directives (e.g., `<RequirePermission>`) to conditionally hide UI elements based on active role.
*   **Validation:**
    *   *Acceptance Criteria (AC):* Middleware rejects unauthorized API requests with 403 Forbidden. UI hides "Delete" buttons for read-only roles.
    *   *Testing Tasks:* Security unit tests verifying 403 responses for mocked lower-tier tokens attempting Admin routes.
    *   *Documentation:* Publish standard matrix of default system roles and their permission mappings.

---

## Epic 2: Core Master Data & Global Configuration

### Feature 2.1: System Settings & Taxonomy
**Sub-Feature 2.1.1: Multi-Branch & Currency Setup**
*   **Tasks:**
    *   `[Database]` Create tables for `Company`, `Branches`, `Currencies`, and `ExchangeRates`.
    *   `[Backend]` Implement CRUD APIs for Branches and Currencies with strict immutability checks on the Base Currency.
    *   `[Frontend]` Build Settings Dashboard for managing corporate hierarchy and localized settings.
    *   `[Backend]` Implement caching layer (Redis/Memory) for high-read settings to prevent DB bottleneck.
*   **Validation:**
    *   *Acceptance Criteria (AC):* Admin can create multiple factory branches. Base currency can be set once and never changed. Exchange rates can be updated with effective dates.
    *   *Testing Tasks:* Integration tests proving Base Currency mutation throws a business logic exception.
    *   *Documentation:* Guide for administrators on configuring new factory branches.

### Feature 2.2: Product Engineering (Item Master)
**Sub-Feature 2.2.1: Item & SKU Management**
*   **Tasks:**
    *   `[Database]` Define schema for `Items`, `ItemCategories`, and `UnitsOfMeasure` (UoM).
    *   `[Backend]` Create validation logic enforcing unique SKUs and preventing deletion of items linked to ledgers.
    *   `[Frontend]` Develop hierarchical Category Tree UI (drag-and-drop).
    *   `[Frontend]` Develop Item Creation Wizard (Basic Info, UoM conversions, Default Supplier).
*   **Validation:**
    *   *Acceptance Criteria (AC):* Users can create Raw Materials and Finished Goods. UoM conversions must be $> 0$. SKUs must be globally unique.
    *   *Testing Tasks:* API tests attempting to create duplicate SKUs (must return 409 Conflict).
    *   *Documentation:* Data dictionary defining required fields for Item Master imports.

---

## Epic 3: Logistics & Supply Chain

### Feature 3.1: Inventory & Stock Ledger
**Sub-Feature 3.1.1: Immutable Ledger Engine**
*   **Tasks:**
    *   `[Database]` Implement append-only `StockLedger` and `LotTracing` tables.
    *   `[Database]` Write transactional stored procedures/triggers to update materialized `BinBalance` views.
    *   `[Backend]` Develop the asynchronous `StockMovementService` (Event Subscriber).
    *   `[Backend]` Implement row-level locking (SELECT FOR UPDATE) to prevent concurrent negative stock allocations.
*   **Validation:**
    *   *Acceptance Criteria (AC):* Stock additions/deductions are recorded immutably. Negative stock is mathematically impossible at the database constraint level.
    *   *Testing Tasks:* Concurrency stress test: 50 threads attempting to consume the last 10 units of a Lot simultaneously (40 must fail cleanly).
    *   *Documentation:* Architectural diagram of the Stock Movement event flow.

### Feature 3.2: Warehouse Management (WMS)
**Sub-Feature 3.2.1: Goods Receipt Note (GRN) & Barcodes**
*   **Tasks:**
    *   `[Backend]` Create GRN APIs linking received Lots to open Purchase Orders.
    *   `[Backend]` Integrate Barcode/QR generator library to output Lot labels on GRN completion.
    *   `[Frontend]` Build Mobile-optimized PWA view for receiving dock workers to scan and verify inbound shipments.
    *   `[Backend]` Emit `GoodsReceivedEvent` to trigger Inventory and Accounting listeners.
*   **Validation:**
    *   *Acceptance Criteria (AC):* Receiving goods generates traceable Lot IDs. System automatically prints QR labels. Inventory ledger increments automatically.
    *   *Testing Tasks:* E2E test verifying PO status changes to "Partially Received" when a GRN is posted.
    *   *Documentation:* Operator SOP (Standard Operating Procedure) for scanning inbound freight.

---

## Epic 4: Manufacturing Execution System (MES)

### Feature 4.1: Bills of Material (BOM) & Recipes
**Sub-Feature 4.1.1: BOM Explosion Engine**
*   **Tasks:**
    *   `[Database]` Design recursive adjacency list schema for multi-level BOMs.
    *   `[Backend]` Implement recursive CTE (Common Table Expression) SQL queries for deep BOM explosion.
    *   `[Frontend]` Build interactive, nested tree-view UI for engineers to construct recipes.
    *   `[Backend]` Implement version control logic (Draft, Active, Archived) for BOM iterations.
*   **Validation:**
    *   *Acceptance Criteria (AC):* Engineers can define 5-level deep BOMs. System accurately calculates total raw material requirements for 1,000 finished units.
    *   *Testing Tasks:* Unit tests on recursive explosion logic for infinite loop prevention.
    *   *Documentation:* Developer guide on querying the recursive BOM endpoints.

### Feature 4.2: Shop Floor Execution
**Sub-Feature 4.2.1: Offline-First Yield Logging**
*   **Tasks:**
    *   `[Frontend]` Implement IndexedDB schema in the browser to cache active Production Orders.
    *   `[Frontend]` Build the "Outbox" pattern for intercepting failed network requests during yield logging.
    *   `[Frontend]` Develop background Service Worker to sync Outbox payload upon Wi-Fi reconnection.
    *   `[Backend]` Create idempotent endpoints for yield consumption to prevent double-deductions on retries.
*   **Validation:**
    *   *Acceptance Criteria (AC):* Operator can scan consumed materials and log output yield with Wi-Fi disabled. UI shows "Sync Pending". Data successfully hits the server when reconnected.
    *   *Testing Tasks:* E2E Cypress test toggling browser network state to offline, interacting with the form, toggling online, and verifying DB state.
    *   *Documentation:* Architecture spec for PWA offline conflict resolution.

---

## Epic 5: Financial Accounting (Back-Office)

### Feature 5.1: General Ledger (GL)
**Sub-Feature 5.1.1: Automated Double-Entry Engine**
*   **Tasks:**
    *   `[Database]` Create schema for `ChartOfAccounts`, `JournalEntries`, and `JournalLines`.
    *   `[Backend]` Implement the Accounting Event Listener to capture cross-module events (e.g., `GoodsReceivedEvent`, `InvoiceGeneratedEvent`).
    *   `[Backend]` Write the Double-Entry validation engine (sum of Debits MUST equal sum of Credits).
    *   `[Frontend]` Build the GL Dashboard and manual Journal Entry posting UI.
*   **Validation:**
    *   *Acceptance Criteria (AC):* Manual JEs must balance before saving. Automated events from WMS generate balanced JEs mapped to the correct asset/liability accounts.
    *   *Testing Tasks:* Exhaustive Unit testing on the math engine (testing floating-point rounding precision).
    *   *Documentation:* Map of all ERP automated events to their respective default debit/credit account triggers.

---

## Epic 6: Cross-Cutting Utilities

### Feature 6.1: Mass Data Import/Export
**Sub-Feature 6.1.1: CSV Import Pipeline**
*   **Tasks:**
    *   `[Backend]` Develop generic CSV stream-parser (to avoid memory limits on 100MB files).
    *   `[Backend]` Implement Dry-Run validation logic (type checking, foreign key validation).
    *   `[Frontend]` Build 3-step Import Wizard UI (Upload -> Map Columns -> Review Errors).
    *   `[Backend]` Wrap execution in atomic SQL transactions (All-or-Nothing commit).
*   **Validation:**
    *   *Acceptance Criteria (AC):* User can upload 50,000 row CSV. System provides detailed error report for invalid rows without committing partial data.
    *   *Testing Tasks:* Upload malformed CSVs to assert atomic rollback and verify exact error line tracing.
    *   *Documentation:* User guide on downloading and populating Excel import templates.
