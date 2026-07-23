# Project Folder Structure & Architecture Blueprint
## KIYAN Factory ERP

**Prepared by:** Principal Software Architect
**Date:** July 2026
**Architecture:** Modular Monolith (Backend), Desktop-First PWA (Frontend), Clean Architecture (Hexagonal)

---

## 1. Executive Summary

This document defines the strict directory structure, file organization, and dependency rules for the KIYAN Factory ERP codebase. The project is organized as a monorepo, cleanly separating the local Edge Server (Backend) from the Desktop Client (Frontend), while sharing core types and constants. 

The architecture rigorously enforces **Clean Architecture** (Ports and Adapters) and **Domain-Driven Design (DDD)** principles to guarantee the system remains maintainable, testable, and highly scalable over the next decade of factory operations.

---

## 2. High-Level Root Directory

The root of the repository orchestrates the entire ERP ecosystem.

```text
/kiyan-erp-root
├── /client          # Desktop-First Frontend Application (Electron/React)
├── /server          # Local Edge Server Backend (NestJS Modular Monolith)
├── /shared          # Code shared perfectly between Client and Server
├── /database        # Migrations, Seeds, and Schema definitions
├── /docs            # Project Documentation & Architecture Decision Records
├── /scripts         # CI/CD, Build, and Automation Scripts
└── /testing         # End-to-End (E2E) testing suites spanning full-stack
```

---

## 3. Directory Responsibilities

### 3.1 Root Folder Concepts
*   **`/database`**: Contains raw SQL migration files, database seeding logic for local development, and ORM configuration. It sits outside the application code to treat the database strictly as an external infrastructure detail.
*   **`/docs` (Documentation)**: Contains all official project documentation (including VISION, SRS, ERD, and this document), API specifications (Swagger/OpenAPI), and Architecture Decision Records (ADRs).
*   **`/scripts` (Scripts)**: Bash and Node.js scripts for automating routine tasks such as database resets, environment provisioning, thermal printer test-pings, and packaging the Electron app for production.
*   **`/testing` (Testing)**: Holds Playwright E2E tests that spin up both the client and server to simulate full factory workflows (e.g., simulating a barcode scan causing an inventory deduction). Unit and Integration tests live *inside* the module they test.

### 3.2 Shared & Core Directories
*   **`/shared`**: Code that is universally applicable and imported by both `/server` and `/client`.
    *   **`/shared/types`**: TypeScript interfaces, enums, and Zod schemas (e.g., `LotStatus`, `RecipeDto`).
    *   **`/shared/constants`**: Magic strings, system-wide configuration limits, and fixed reference data.
    *   **`/shared/utilities`**: Pure, side-effect-free helper functions (e.g., date formatters, barcode checksum calculators).
*   **`/core` (Inside `/server/src` and `/client/src`)**: Contains the foundational bootstrapping logic for the application that does not belong to any specific business module. Examples include global error handlers, custom logger instantiations, and base class definitions.
*   **`/config` (Config)**: Centralized environment variable validation and mapping. Ensures the app crashes immediately on startup if missing critical variables (like the edge server database URL).
*   **`/assets` (Assets)**: Resides primarily in the client. Contains static images, custom web fonts, translation JSON files, and CSS resets.

### 3.3 The Clean Architecture Layers (Inside Bounded Modules)
The backend `/server/src/modules` directory is divided into bounded contexts (e.g., `inventory`, `production`, `quality`). Every module MUST follow this exact 4-layer Hexagonal structure:

```text
/server/src/modules/inventory
├── /domain          # Layer 1: Core Business Logic
├── /application     # Layer 2: Use Cases & Orchestration
├── /infrastructure  # Layer 3: External Integrations & Persistence
└── /presentation    # Layer 4: Delivery Mechanism (APIs)
```

*   **`/domain` (Domain Layer)**: The absolute center of the architecture. Contains Enterprise Business Rules (Entities, Value Objects, Domain Events, Domain Exceptions). It handles state mutations and core rules (e.g., `Lot.ts`, `QuarantineRule.ts`). **Zero external dependencies are allowed here.**
*   **`/application` (Application Layer)**: Contains Application Services (Use Cases). It orchestrates the domain objects (e.g., `ConsumeMaterialUseCase`). It defines "Ports" (Interfaces) that the Infrastructure layer must implement.
*   **`/infrastructure` (Infrastructure Layer)**: Contains implementations of the Application ports. This is where the database, third-party APIs, and hardware integrations live.
    *   **`/infrastructure/repositories`**: Classes responsible for fetching and saving Domain Entities to the PostgreSQL database using the ORM.
*   **`/presentation` (Presentation Layer)**: The entry point to the module. Contains REST/GraphQL Controllers. It receives HTTP requests, validates the payload using Zod, maps it to a DTO, and passes it to the Application Layer.

### 3.4 Client-Specific Directories (Frontend)
The frontend (`/client/src`) mirrors the backend modules for UI components, but includes React-specific structural folders:
*   **`/hooks`**: Custom React hooks for abstracting component logic, data fetching (SWR/React Query), and hardware interactions (e.g., `useBarcodeScanner()`).
*   **`/layouts`**: UI shell components (e.g., `FactoryFloorLayout` with large touch-targets, `BackOfficeLayout` with dense data tables).
*   **`/providers`**: React Context Providers for global state (e.g., `AuthProvider`, `OfflineSyncProvider`, `ThemeProvider`).
*   **`/services`**: Client-side network agents responsible for making HTTP calls to the Edge Server APIs.

---

## 4. Naming Conventions

Consistency is critical for long-term maintainability in a large team.

### 4.1 Folder Naming
*   **Format:** `kebab-case` (lowercase letters separated by hyphens).
*   **Rule:** Absolutely no CamelCase, PascalCase, or spaces in directory names.
*   **Examples:** `purchase-orders`, `quality-control`, `value-objects`.

### 4.2 File Naming
*   **Format:** `[domain-concept].[type].[extension]`
*   **Rule:** Files must clearly indicate their architectural role via a dot-suffix.
*   **Examples:**
    *   Domain Entity: `lot.entity.ts`
    *   Use Case: `create-purchase-order.use-case.ts`
    *   Repository: `inventory.repository.ts`
    *   Controller: `production.controller.ts`
    *   React Component: `quarantine-modal.component.tsx`
    *   Hook: `use-barcode.hook.ts`
    *   Unit Test: `yield-calculator.spec.ts`

---

## 5. Architectural Rules & Constraints

To prevent the Modular Monolith from degrading into a "Big Ball of Mud", the following rules are enforced at compile-time (via ESLint and dependency cruiser).

### 5.1 Import Rules
*   **Absolute Path Aliases:** Relative imports deeper than one level (`../../`) are forbidden. All cross-folder imports must use TypeScript path aliases defined in `tsconfig.json`.
    *   Backend: `@modules/inventory/...`, `@core/...`, `@shared/...`
    *   Frontend: `@components/...`, `@hooks/...`, `@services/...`
*   **Index Barrels:** Every layer within a module must have an `index.ts` file exporting its public API. Other modules may only import from this barrel file, never deep-linking into internal files.

### 5.2 The Dependency Rule (Clean Architecture)
Dependencies must point **INWARD** toward the Domain Layer.
1.  **Domain** depends on *Nothing*.
2.  **Application** depends on *Domain*.
3.  **Infrastructure** depends on *Application* (to implement its interfaces) and *Domain*.
4.  **Presentation** depends on *Application* (to execute Use Cases).
*   *Violation Example:* The Domain layer importing a database connection or a HTTP library is a critical architectural failure.

### 5.3 Module Isolation Rule (Modular Monolith)
Modules represent Bounded Contexts. They must remain strictly isolated.
1.  Module A (e.g., `Production`) **CANNOT** import from Module B's (e.g., `Inventory`) Infrastructure, Presentation, or Domain layers directly.
2.  **Cross-Module Communication:** If `Production` needs to deduct inventory, it must either:
    *   *Synchronously:* Call a public interface exposed by the `Inventory` Application layer.
    *   *Asynchronously:* Publish a `MaterialConsumedDomainEvent` which the `Inventory` module listens to.
3.  **Database Isolation:** A Repository in the `Production` module is strictly forbidden from querying tables owned by the `Inventory` module. No cross-module SQL JOINs are allowed. If combined data is needed, it must be composed in memory or handled via CQRS read models.

---
*End of Document. This architecture is designed to support the offline KIYAN Factory ERP operations flawlessly.*
