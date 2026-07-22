# Engineering Standards Document
## KIYAN Factory ERP

**Prepared by:** Lead Software Engineer
**Date:** July 2026
**Architecture Environment:** TypeScript, NestJS (Backend), React/Electron (Frontend), Clean Architecture

---

## 1. Core Engineering Principles

All code contributed to the KIYAN Factory ERP must adhere strictly to the following design principles. Violations of these principles will result in rejected Pull Requests.

*   **SOLID Principles:**
    *   *Single Responsibility:* A class or function must have one and only one reason to change.
    *   *Open/Closed:* Software entities should be open for extension but closed for modification (e.g., use Domain Events instead of modifying existing core services to add side-effects).
    *   *Liskov Substitution:* Derived classes must be perfectly substitutable for their base classes.
    *   *Interface Segregation:* Client-specific, fine-grained interfaces are better than general-purpose, bulky interfaces.
    *   *Dependency Inversion:* High-level modules (Domain) must not depend on low-level modules (Infrastructure). Both should depend on abstractions (Interfaces/Ports).
*   **DRY (Don't Repeat Yourself):** Abstract duplicated business logic into shared services or base classes. However, do not abstract purely coincidental duplication across distinct Bounded Contexts if it couples modules that should remain independent.
*   **KISS (Keep It Simple, Stupid):** Prioritize readability and simplicity over cleverness. Factory code must be easily debugged at 3 AM during a production incident.
*   **YAGNI (You Aren't Gonna Need It):** Do not build abstractions, features, or database columns for speculative future requirements. Build exactly what is required for the current phase.

---

## 2. Naming Conventions

Strict naming conventions ensure the codebase reads predictably across all modules and teams.

### 2.1 File & Directory Naming
*   **Folder Naming:** `kebab-case` (e.g., `purchase-orders`, `quality-control`).
*   **File Naming:** `kebab-case` with a dot-separated type suffix (e.g., `user.entity.ts`, `production.controller.ts`).

### 2.2 TypeScript Type & Class Naming
*   **Class Naming:** `PascalCase`. Nouns for entities, verb phrases for services (e.g., `PurchaseOrder`, `CalculateYieldUseCase`).
*   **Interface Naming:** `PascalCase`. Do NOT prefix interfaces with "I" (e.g., `UserRepository`, not `IUserRepository`).
*   **Enum Naming:** `PascalCase` for the Enum name. `UPPER_SNAKE_CASE` for the Enum members (e.g., `LotStatus.QUARANTINED`).
*   **DTO Naming:** `PascalCase` with a `Dto` suffix (e.g., `CreateSalesOrderDto`).
*   **Repository Naming:** Entity name in `PascalCase` with a `Repository` suffix (e.g., `LotRepository`).
*   **Service Naming:** `PascalCase` with a `Service` suffix (for external integrations) or `UseCase` suffix (for Application layer orchestration).

### 2.3 React & Frontend Naming
*   **Component Naming:** `PascalCase` matching the file name, with a `.component.tsx` suffix (e.g., `QuarantineModal.component.tsx`).
*   **Hook Naming:** `camelCase`, strictly starting with the word `use` (e.g., `useBarcodeScanner`).

### 2.4 Variables & Methods
*   **Variable Naming:** `camelCase`. Must be highly descriptive. Avoid single-letter variables except in simple loops.
*   **Boolean Naming:** Must be prefixed with `is`, `has`, `should`, or `can` (e.g., `isQuarantined`, `hasPassedInspection`).
*   **Method Naming:** `camelCase`. Must start with an action verb describing what it does (e.g., `calculateTotalYield`, `validateBarcode`).
*   **Constants:** `UPPER_SNAKE_CASE` for global, immutable magic values or configuration keys (e.g., `MAX_MOISTURE_TOLERANCE`).

---

## 3. Development Practices

### 3.1 Error Handling
*   **Domain Exceptions:** Use custom, strongly-typed exceptions in the Domain layer (e.g., `InsufficientStockException`). Never throw generic `Error` objects for business rule violations.
*   **Catch-and-Wrap:** Infrastructure errors (e.g., database timeouts, hardware failures) must be caught at the Infrastructure layer and wrapped in application-specific exceptions before propagating upward.
*   **Global Filters:** The Presentation layer must use global exception filters to catch all unhandled errors, log them, and return a sanitized, localized error message to the client. Never leak stack traces to the end-user.

### 3.2 Logging
*   **Structured Logs:** All logs must be structured JSON format containing context (User ID, Module, Request ID) to enable future centralized searching.
*   **Levels:** Use strict log levels:
    *   `Error`: System failures requiring immediate attention (e.g., database connection lost).
    *   `Warn`: Recoverable issues or potential anomalies (e.g., 3 failed login attempts).
    *   `Info`: Key business milestones (e.g., "Production Order Released", "Sync Completed").
    *   `Debug`: Developer troubleshooting details (disabled in production).

### 3.3 Validation
*   **Fail Fast:** Validation must occur at the absolute boundaries of the system (Presentation Layer APIs) using schema validation (Zod). Invalid requests must be rejected before reaching the Application layer.
*   **Domain Validation:** Entities must self-validate upon instantiation. A Domain Entity should never exist in an invalid state (e.g., a `Lot` cannot be created with a negative quantity).

### 3.4 Comments Policy
*   **"Why", Not "What":** Code should be self-documenting through expressive naming. Comments must explain *why* a particular technical decision was made, business logic edge-cases, or external constraints, not *what* the code is doing.
*   **JSDoc/TSDoc:** Required for all public-facing Application Services, Interfaces, and complex Domain Entities to power IDE IntelliSense.

---

## 4. Source Control & Workflow

### 4.1 Git Branching Strategy
We utilize a structured Feature Branch workflow customized for Edge deployment:
*   `main`: The definitive production-ready state. Always deployable.
*   `develop`: The active integration branch for the next release.
*   `feature/feature-name`: Branched from `develop`. For new capabilities.
*   `hotfix/issue-description`: Branched from `main`. For emergency production bug fixes.

### 4.2 Git Commit Convention
Commits must follow the Conventional Commits specification. This enables automated changelog generation and semantic versioning.
*   Format: `type(scope): description`
*   Types: `feat` (new feature), `fix` (bug fix), `chore` (maintenance), `refactor` (code restructuring), `test` (adding tests), `docs` (documentation).
*   Example: `feat(inventory): implement strict FIFO picking enforcement`

### 4.3 Code Review Rules
*   **Automated First:** Pull Requests (PRs) will not be reviewed until the CI pipeline (Linting, Formatting, Type Checking, Unit Tests) passes.
*   **Approvals:** All PRs require at least one approval from a Senior Engineer or Architect.
*   **Scope:** PRs must be kept small and focused on a single logical change. Massive, monolithic PRs will be rejected.
*   **Checklist:** Reviewers must verify Architecture Rule compliance, test coverage, and documentation updates.

---

## 5. Architecture Rules (Enforced)

*   **The Dependency Rule:** Dependencies can only point INWARD. Infrastructure cannot dictate Domain logic.
*   **Strict Isolation:** Cross-module communication must happen via the Application Layer Interfaces or Asynchronous Domain Events. Direct database-level joins or cross-module repository imports are forbidden.
*   **Stateless Application:** The backend application layer must hold no state. All state must be pushed to the database or Redis (sessions) to allow horizontal scaling of the Edge Server.

---

## 6. Quality Assurance & Testing

### 6.1 Testing Standards
*   **Coverage Minimum:** A minimum of 80% line and branch coverage is required for all new code. The Domain layer must target 100% coverage.
*   **Unit Tests:** Focus on the Domain and Application layers. Mock all external dependencies. Fast, deterministic, and isolated.
*   **Integration Tests:** Focus on the Infrastructure layer (Repositories, External APIs). Test against a real, localized test database container.
*   **E2E Tests:** Focus on the Presentation layer and complete workflows. Must simulate real user actions (e.g., clicking, scanning) and verify database state changes.

### 6.2 Documentation Standards
*   **Architecture Decision Records (ADRs):** Any significant change to the technology stack, architecture pattern, or third-party dependency must be documented as an ADR in the `/docs` folder before implementation.
*   **Module READMEs:** Every Bounded Context (module) must have a `README.md` defining its responsibility, aggregate roots, and primary domain events.
*   **Swagger/OpenAPI:** All REST APIs must be decorated for auto-generation of API documentation.
