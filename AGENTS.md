# AI Engineering Constitution
## Mandatory Implementation Rules for KIYAN Factory ERP
**Role:** AI Technical Lead
**Target Audience:** All AI Coding Assistants & Human Engineers
**Status:** **ACTIVE / HIGHEST PRIORITY**

> **CRITICAL DIRECTIVE:** This document is the supreme technical law for the KIYAN Factory ERP implementation. All AI coding assistants MUST parse, acknowledge, and strictly adhere to these rules before generating any code or proposing any system modifications. 

---

## ARTICLE I: Absolute Directives

### 1.1 The "NEVER" Directives
AI assistants must **NEVER**:
1. **Rewrite Architecture:** The Modular Monolith architecture, offline-first strategy, and database paradigms are finalized. Do not pivot to microservices, NoSQL, or alternative architectural patterns.
2. **Break Previous Modules:** Backward compatibility is non-negotiable. 
3. **Rename Public Interfaces:** API endpoints, database schemas, and shared interfaces must not be renamed without a multi-phase deprecation and migration plan.
4. **Duplicate Logic:** (DRY Principle) Never copy-paste business logic. If logic is needed across modules, abstract it into a shared domain service.
5. **Ignore Validation:** Never bypass schema validations, DTO constraints, or RBAC security checks.
6. **Skip Testing:** No feature is complete without accompanying unit and integration tests.
7. **Introduce Circular Dependencies:** Two modules must never depend on each other synchronously. 

### 1.2 The "MUST" Directives
AI assistants **MUST**:
1. **Reuse Shared Components:** Utilize established UI components, database adapters, and event buses.
2. **Respect Module Boundaries:** Modules must remain highly cohesive and loosely coupled.
3. **Follow SOLID:** Apply Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles universally.
4. **Write Production-Ready Code:** Code must be secure, performant, and resilient to failure.
5. **Write Maintainable Code:** Prioritize readability over cleverness. 
6. **Keep Backward Compatibility:** Database migrations and API changes must never break existing clients.
7. **Document Every Important Decision:** Use inline comments for complex algorithmic choices and update Wiki/Markdown docs for systemic changes.

---

## ARTICLE II: Structural & Architectural Rules

### 2.1 Folder Rules (Modular Monolith)
* Code must be organized by **Domain Feature**, not by technical type. 
* *Correct:* `/src/modules/inventory/`, `/src/modules/sales/`
* *Incorrect:* `/src/controllers/`, `/src/services/` (dumping all domains into technical folders).
* Shared utilities go into `/src/shared/` or `/src/core/`.

### 2.2 Naming Rules
* **Files/Classes/Interfaces:** `PascalCase` (e.g., `PurchaseOrderService.ts`, `IInventoryLedger`).
* **Functions/Variables:** `camelCase` (e.g., `calculateTotalYield`, `activeItemCount`).
* **Constants/Environment Variables:** `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_ATTEMPTS`, `DATABASE_URL`).
* **Database Tables:** `snake_case`, pluralized (e.g., `purchase_orders`, `stock_movements`).
* **Naming Intent:** Names must clearly describe the business behavior (e.g., `QuarantineLotService`, not `LotManager`).

### 2.3 Dependency Rules
* **Unidirectional Flow:** Higher-level modules (e.g., Accounting) may observe lower-level modules (e.g., Inventory), but never the reverse.
* **Event-Driven Communication:** Cross-module write operations MUST use the internal Event Bus (Pub/Sub). (e.g., Sales emits `OrderPlaced`; Inventory listens and reserves stock asynchronously).
* **Dependency Injection (DI):** All external services, repositories, and cross-cutting concerns must be injected. No hardcoded instantiations of dependencies inside business logic.

---

## ARTICLE III: Code Quality & Maintenance

### 3.1 Refactoring Rules
* **Boy Scout Rule:** Leave the code better than you found it. 
* **Safe Refactoring:** Refactor internals freely, but **never** change the signature of a public method or API endpoint being consumed by another module without explicit authorization.

### 3.2 Technical Debt Strategy
* AI assistants must proactively identify suboptimal code.
* If a shortcut must be taken for a prototype, it MUST be flagged explicitly with a standardized comment: `// TODO: [TECH DEBT] <Reason> - <Planned Fix>`.
* Tech debt cannot be introduced into core financial, security, or traceability modules.

### 3.3 Bug Fix Strategy
* **Root Cause Over Symptom:** Never write "band-aid" code (e.g., `if (value === undefined) return 0;` without understanding *why* the value is undefined). Trace the error to its origin.
* **Test-Driven Fixes:** Before fixing a bug, write a failing unit test that reproduces the bug. Then apply the fix to make the test pass.

---

## ARTICLE IV: Security & Performance

### 4.1 Security Rules
* **Zero-Trust Input:** All inputs (API payloads, CSV uploads, URL parameters) must be aggressively validated using a schema validation library (e.g., Zod/Joi) before processing.
* **RBAC Enforcement:** Every backend route/controller MUST declare its required permissions explicitly.
* **PII Protection:** Never log user passwords, API keys, or raw financial data.

### 4.2 Performance Rules
* **No N+1 Queries:** Database queries must be aggressively optimized using JOINs or DataLoader patterns.
* **Pagination & Virtualization:** Any API returning lists MUST be paginated. Any UI rendering lists $> 100$ items MUST be virtualized.
* **Asynchronous Offloading:** Tasks taking $> 500ms$ (e.g., PDF generation, mass imports, complex BOM explosions) MUST be dispatched to a background worker queue.

---

## ARTICLE V: Testing & Validation

### 5.1 Testing Rules
* **Coverage Mandate:** Business logic (Calculations, State Machines, Financial ledgers) requires **100%** Unit Test coverage.
* **Isolation:** Unit tests must execute entirely in memory. No network or physical database connections are allowed in unit tests.
* **Integration Tests:** Must use ephemeral database containers. Must validate both the HTTP response and the final database state.
* **Mocking:** Mock external boundaries only (e.g., external SMTP servers, 3rd party APIs). Do NOT mock the internal database ORM for integration tests.

---

## ARTICLE VI: Git & Version Control Workflow

### 6.1 Branch Strategy
* **Main Branch:** `main` (Strictly production-ready, immutable history).
* **Feature Branches:** `feat/<module>-<description>` (e.g., `feat/wms-barcode-scanner`).
* **Fix Branches:** `fix/<module>-<description>` (e.g., `fix/finance-rounding-error`).
* **Chore Branches:** `chore/<description>` (e.g., `chore/update-dependencies`).

### 6.2 Commit Strategy
* **Atomic Commits:** Each commit must represent a single, logical change. 
* **Conventional Commits:** Messages must follow standard syntax: `type(scope): description`. 
  * *Example:* `feat(inventory): implement row-level locking for stock allocation`
  * *Example:* `fix(auth): resolve JWT expiration timezone bug`

### 6.3 Review Strategy (Pull Requests)
* Code cannot be merged without passing the CI/CD pipeline (Linting, Tests, Build).
* PR descriptions must include the "Why", not just the "What".
* Every PR must link to its corresponding task/ticket.

---

## ARTICLE VII: Documentation Rules
* **Self-Documenting Code:** Code should be written so clearly that excessive comments are unnecessary.
* **JSDoc / TSDoc:** All public interfaces, shared services, and complex algorithms must have formatted documentation blocks explaining parameters, return types, and business rules.
* **Architecture Decision Records (ADRs):** Any time an AI assistant makes a significant implementation choice (e.g., choosing an indexedDB caching strategy), it must be documented in a central ADR markdown file.

> **Final Acknowledgment:** By generating code within this workspace, the AI agent implicitly agrees to execute its duties strictly within the bounds of this Constitution. Deviation from these rules is a critical system failure.
