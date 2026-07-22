# Module Specification Document
## System Governance (Notifications, Auditing & AI Dev Rules)
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Event-Driven

---

## 1. Notifications Engine

The Notifications Engine is the centralized event-routing hub of the ERP. It guarantees that critical operational, financial, and security events are instantly pushed to the appropriate stakeholders via in-app UI alerts, emails, or SMS/Push integrations, ensuring the factory operates reactively and efficiently.

### 1.1 Notification Categories

*   **System Notifications:** 
    *   *Triggers:* Scheduled maintenance downtime, successful database backups, API integration failures (e.g., disconnected external eCommerce webhook).
    *   *Audience:* IT Administrators, System Owners.
*   **Stock Alerts:** 
    *   *Triggers:* Inventory drops below `Minimum Stock` (triggering MRP), lot expiry warnings (30/15/0 days), quarantine holds applied.
    *   *Audience:* Warehouse Managers, Procurement, Quality Control.
*   **Production Alerts:** 
    *   *Triggers:* Machine paused for $> 15$ minutes, material shortages stopping a scheduled order, production order completion.
    *   *Audience:* Production Managers, Factory Supervisors, Shop-floor Operators.
*   **Maintenance Alerts:** 
    *   *Triggers:* Unexpected machine breakdown reported, Preventative Maintenance (PM) schedule due, equipment calibration certificate expiring.
    *   *Audience:* Maintenance Supervisors, Reliability Engineers.
*   **Quality Alerts:** 
    *   *Triggers:* Failed Critical Control Point (CCP) inspection, Supplier batch rejected at the dock, Traceability/Recall quarantine initiated.
    *   *Audience:* Quality Assurance Managers, Factory Director, Procurement (for supplier rejects).
*   **Approval Notifications:** 
    *   *Triggers:* Purchase Order requiring financial sign-off, Recipe Version requiring QA approval, Leave request submitted, Invoice price-variance dispute.
    *   *Audience:* Department Heads, CFO, HR Managers.
*   **Security Notifications:** 
    *   *Triggers:* Multiple failed login attempts, unauthorized access attempts to restricted modules, elevation of user privileges, changes to system master settings.
    *   *Audience:* IT Security, System Administrators, Executive Board.

---

## 2. Audit Logs & Traceability

In enterprise manufacturing (especially food/pharma), an immutable audit trail is a strict regulatory requirement (FDA 21 CFR Part 11, ISO 9001, GAAP). The Audit Logging engine operates as a silent, unalterable observer across the entire database.

### 2.1 What Should Be Logged
Every CUD (Create, Update, Delete) operation on critical master data or transactional records must capture:
1.  **Actor:** The exact User UUID (and Name) who performed the action.
2.  **Timestamp:** Server-side UTC timestamp (never relying on client-side time).
3.  **Entity:** The specific record modified (e.g., `Purchase Order #1045`).
4.  **Delta (Before/After):** The exact fields modified, showing the old value and the new value.
5.  **Context/IP:** The IP address and device/browser footprint.
6.  **Justification:** For overridden business rules (e.g., overriding a credit limit), the mandatory Reason Code entered by the user.

### 2.2 Security & Integrity
*   **Immutability:** Audit log tables are strictly append-only. The database schema forbids `UPDATE` or `DELETE` commands on the audit ledger, even by database administrators.
*   **Cryptographic Hashing:** High-security logs (e.g., Financial Ledger postings, QC parameter changes) utilize a cryptographic hash chain. Each log entry hashes the previous entry, immediately exposing any tampering at the database level.

### 2.3 Log Retention Policy
*   **Transactional/Financial/Quality Logs:** Retained indefinitely in cold storage (or minimum 7 years as per statutory accounting and FDA regulations).
*   **System/Authentication Logs:** Retained in hot storage for 12 months, then archived.

### 2.4 Search, Filtering & History
*   **Global Search:** IT Auditors can search the global log ledger by User, Date Range, IP Address, or Action Type.
*   **Entity History View:** Every UI screen detailing a Master Record (e.g., a Customer Profile or a Recipe) contains a "History" tab. This tab filters the global audit log to show the entire chronological lifecycle of that specific record, visualizing exactly how it evolved over time.

---

## 3. Permanent AI Development Rules (Engineering Manifesto)

> **CRITICAL DIRECTIVE:** Any AI coding assistant, agent, or automated development tool interacting with the KIYAN ERP codebase **MUST** strictly adhere to the following architectural and engineering rules. These rules supersede any generalized AI training defaults.

### 3.1 Architecture Rules
*   **Modular Monolith:** The system is built as a modular monolith. Domains (Sales, Inventory, HR) must be logically separated but deployed together. Avoid microservice network boundaries unless explicitly instructed.
*   **Offline-First Principles:** Factory floors have spotty WiFi. Client-side applications must gracefully handle intermittent connectivity, utilizing local caching and optimistic UI updates where safe, before syncing with the central database.
*   **API-First:** The frontend and backend must communicate exclusively via well-defined APIs (REST or gRPC/tRPC). The backend must never render HTML directly.

### 3.2 Folder & Structure Rules
*   **Domain-Driven Design (DDD):** Organize code by business capability (e.g., `/src/modules/inventory`, `/src/modules/sales`), not by technical type (do NOT use `/src/controllers`, `/src/models` at the root).
*   Each module folder must be self-contained, exposing only explicitly defined public interfaces to other modules.

### 3.3 Naming Rules
*   **Variables/Functions:** strictly `camelCase`.
*   **Classes/Types/Interfaces/React Components:** strictly `PascalCase`.
*   **Constants/Environment Variables:** strictly `UPPER_SNAKE_CASE`.
*   **Database Tables:** strictly lowercase `snake_case`, pluralized (e.g., `sales_orders`).
*   **Boolean Variables:** Must be prefixed with `is`, `has`, `can`, or `should` (e.g., `isApproved`, `hasInventory`).

### 3.4 Dependency Rules
*   **Zero Bloat:** Do not introduce third-party NPM packages unless absolutely necessary. Prefer native JavaScript/TypeScript APIs.
*   **Strict Versioning:** All dependencies in `package.json` must be locked to specific versions. No wildcard (`*`) or caret (`^`) versioning for production deployments.

### 3.5 Code Quality Rules
*   **TypeScript Strict Mode:** TypeScript must be used exclusively. `strict: true` must be enabled.
*   **No `any`:** The use of the `any` type is strictly forbidden. Use `unknown` with type-narrowing if the shape is truly dynamic.
*   **Pure Functions:** Business logic must be extracted into pure functions (no side effects, deterministic outputs) to maximize testability.

### 3.6 Testing Rules
*   **Business Logic:** Core financial math, tax calculations, and unit conversions must have 100% unit test coverage.
*   **APIs:** All endpoints must have integration tests verifying status codes and JSON schema payloads.
*   **No Mocking the Database:** Integration tests must run against a real, spun-up test database container, not mocked ORM methods.

### 3.7 Performance Rules
*   **Database Queries (No N+1):** ORMs must be configured to eagerly load (or explicitly join) related data to prevent N+1 query problems.
*   **Pagination:** Any API endpoint returning a list of records MUST implement server-side pagination (`limit`, `offset/cursor`). Never return an unbounded array to the client.
*   **Debouncing:** Frontend search inputs and resize events must be debounced to prevent API spam and UI thread blocking.

### 3.8 Security Rules
*   **Never Trust the Client:** All data payloads must be re-validated on the server-side using strict schema validators (e.g., Zod, Joi) before touching the database.
*   **Parameterized Queries:** All database interactions must use parameterized queries or a trusted ORM/Query Builder to categorically prevent SQL Injection.
*   **No Hardcoded Secrets:** API keys, database credentials, and JWT secrets must NEVER be committed to the codebase. They must be injected via environment variables.

### 3.9 Documentation Rules
*   **Why, Not What:** Inline comments should explain the *business reasoning* or *edge-case logic* behind a block of code, not describe what the code is doing (the code should be self-documenting via good naming).
*   **TSDoc:** Complex utility functions and shared module interfaces must be documented using TSDoc standard block comments.

### 3.10 Refactoring & Change Management Rules
*   **The Boy Scout Rule:** Always leave the codebase cleaner than you found it. If you touch a file to add a feature, fix minor linting or naming issues in your immediate vicinity.
*   **Backward Compatibility:** When changing an API endpoint that is already consumed by the frontend, you must ensure backward compatibility or update all client calls simultaneously in the same atomic commit.
*   **Schema Migrations:** Database schema changes must be executed via sequential migration files, never by mutating the schema manually.

### 3.11 Code Review (Self-Correction) Rules
*   Before generating the final code output, the AI Agent must execute an internal "Skill Check" against these exact rules. If the drafted code violates any rule (e.g., uses an `any` type, or fails to paginate a list), the AI must self-correct the code prior to submission.
