# Workspace Unification Strategy
## Architecture Recovery & Monorepo Migration Plan

**System:** KIYAN Factory ERP
**Role:** Senior Enterprise Software Architect
**Date:** July 2026
**Status:** MANDATORY PRE-REQUISITE FOR SPRINT 7

---

## Section 1: Current Workspace Analysis

The project has inadvertently split into two competing architectural paradigms across two workspaces:

**Workspace A (Original/Legacy Approach):**
*   `client/`: Contains the frontend SPA (React/Vite).
*   `server/`: Contains the backend API layer.
*   `shared/`: Contains types and interfaces shared between client and server.
*   `infra/`: Contains infrastructure, IaC, and deployment configurations.
*   `docs/`: Contains the reorganized enterprise documentation.

**Workspace B (Domain-Driven/Enterprise Approach):**
*   `packages/`: Contains isolated, reusable technical libraries (UI components, config).
*   `modules/`: Contains the business logic for the ERP (Inventory, Sales, etc.).
*   `tsconfig.base.json`: The foundation for strict enterprise TypeScript compilation.

---

## Section 2: Problems Found

1.  **Split-Brain Architecture:** The existence of a generic `server/` folder contradicts the Modular Monolith strategy established in `modules/`.
2.  **Dependency Fragmentation:** Having two distinct roots prevents a unified dependency resolution graph, leading to version conflicts and duplicate `node_modules`.
3.  **Redundant Shared Directories:** `Workspace A: shared/` conceptually overlaps with `Workspace B: packages/`. 
4.  **Integration Blackhole:** There is currently no unified entry point that wires the frontend (`client/`) to the modular backend (`modules/`).
5.  **Build System Complexity:** CI/CD cannot seamlessly build the entire project in its current split state without brittle, custom scripting.

---

## Section 3: Recommended Final Repository Tree

The final architecture will be a strict, unified **Domain-Driven Monorepo**. This structure natively supports the Modular Monolith pattern while cleanly separating technical concerns from business rules.

```text
/ (Unified Root)
├── apps/                          # Executable applications (Deployable units)
│   ├── web/                       # The frontend application
│   └── api/                       # The backend entry point (Express/Fastify)
│
├── modules/                       # Domain Business Logic (The Modular Monolith Core)
│   ├── inventory/                 # e.g., Stock Ledger, Bin Management
│   ├── purchasing/                # e.g., POs, Suppliers
│   └── accounting/                # e.g., GL, AP/AR
│
├── packages/                      # Shared Internal Libraries (Technical/Cross-Cutting)
│   ├── core/                      # Shared DTOs, Enums, Base Interfaces
│   ├── database/                  # Prisma Schema, Migrations, ORM Clients
│   ├── ui/                        # Shared React Components (Design System)
│   └── config/                    # Shared ESLint, TSConfig, Prettier settings
│
├── infra/                         # Infrastructure & Deployment
│   ├── docker/                    # Base Dockerfiles and Compose configurations
│   └── terraform/                 # Cloud resource provisioning
│
├── scripts/                       # Task automation and CI/CD helper scripts
│
├── docs/                          # Enterprise Documentation (Untouched hierarchy)
│
├── package.json                   # Root workspace definition (npm/pnpm workspaces)
└── tsconfig.base.json             # Root TypeScript configuration
```

### Architectural Placement Guidelines:
*   **Future Packages:** `packages/<package-name>/` (Technical, domain-agnostic tools).
*   **Future ERP Modules:** `modules/<domain-name>/` (Strict domain business rules).
*   **Prisma/Database:** `packages/database/` (Isolated to generate clean, reusable typings for both apps and modules).
*   **Infrastructure:** `infra/` (For IaC) and `apps/<app>/Dockerfile` (For specific deployments).
*   **Frontend:** `apps/web/`.
*   **Backend (Entry):** `apps/api/` (This app imports and wires together the `modules/`).
*   **Shared Contracts:** `packages/core/`.
*   **Tests:** Co-located with the source code (e.g., `service.test.ts`), plus `apps/web-e2e/` for end-to-end testing.
*   **CI/CD:** `/.github/workflows/` (or GitLab equivalent) at the root, calling scripts in `scripts/`.
*   **Docker Files:** `infra/docker/` for base images, and `apps/<app-name>/Dockerfile` for the deployables.
*   **Deployment Scripts:** `scripts/deploy/` or `infra/scripts/`.

---

## Section 4: Folder Migration Table

| Old Path | New Path | Rationale |
| :--- | :--- | :--- |
| `Workspace A: client/` | `/apps/web/` | Standardizes frontend as an executable workspace app. |
| `Workspace A: server/` | `/apps/api/` | Standardizes backend as the deployable entry point. |
| `Workspace A: shared/` | `/packages/core/` | Moves shared contracts into a managed workspace package. |
| `Workspace A: infra/` | `/infra/` | Retains top-level visibility for DevOps. |
| `Workspace A: docs/` | `/docs/` | Retains the newly organized enterprise documentation. |
| `Workspace B: packages/` | `/packages/` | Merges into the unified packages directory. |
| `Workspace B: modules/` | `/modules/` | Retains top-level status to enforce the Modular Monolith pattern. |
| `Workspace B: tsconfig.base.json` | `/tsconfig.base.json` | Becomes the foundational TS config for the entire monorepo. |

---

## Section 5: Migration Order

To ensure zero loss of Git history, the migration MUST follow these exact steps using strict Git commands:

1.  **Initialize Root Workspace:** Create the root `package.json` declaring the workspace directories (`apps/*`, `packages/*`, `modules/*`).
2.  **Establish Tooling:** Move `Workspace B: tsconfig.base.json` to the root. Create `/packages/config/` for shared linting/formatting rules.
3.  **Migrate Docs & Infra:** `git mv Workspace A: docs/ /docs/` and `git mv Workspace A: infra/ /infra/`.
4.  **Create Executables Home:** `mkdir apps/`.
5.  **Migrate Frontend:** `git mv Workspace A: client/ /apps/web/`.
6.  **Migrate Backend:** `git mv Workspace A: server/ /apps/api/`.
7.  **Consolidate Shared Code:** `mkdir -p packages/core` and `git mv Workspace A: shared/* /packages/core/`.
8.  **Migrate Enterprise Structure:** `git mv Workspace B: modules/ /modules/` and `git mv Workspace B: packages/* /packages/`.
9.  **Refactor Imports:** Systematically run search-and-replace to update relative paths (e.g., `../../shared`) to workspace package names (e.g., `@kiyan/core`).
10. **Validate Build:** Run the root installation (e.g., `npm install`) and verify the monorepo graph is linked correctly.

---

## Section 6: Files that must remain untouched

*   **All files inside `/docs/`**: The documentation hierarchy has already been perfected and must not be altered.
*   **Business Logic Source Code**: The contents of `.ts` and `.tsx` files (other than import statements) must remain functionally identical.
*   **Git History**: By exclusively using `git mv`, the commit history for every file is perfectly preserved.

---

## Section 7: Files that should be moved

*   All application code (`client/`, `server/`).
*   All domain logic (`modules/`).
*   All shared types and utilities (`shared/`, `packages/`).
*   Infrastructure configurations (`infra/`).
*   Root configuration files from Workspace B (e.g., `tsconfig.base.json`).

---

## Section 8: Files that should be deleted

*   Redundant or conflicting configuration files (e.g., if both workspaces have different `.eslintrc` files, consolidate into `/packages/config/` and delete the rest).
*   Redundant `package-lock.json` or `yarn.lock` files located inside subdirectories (the monorepo will rely on a single lockfile at the root).
*   The `Workspace A` and `Workspace B` wrapper directories once they are completely empty.

---

## Section 9: Risk Assessment

*   **Risk:** Import Resolution Breakage.
    *   *Impact:* High. Moving folders will break relative imports across the codebase.
    *   *Mitigation:* Use TypeScript path aliases (`paths` in `tsconfig.json`) and Monorepo package linking (`@kiyan/core`) to map imports robustly.
*   **Risk:** Loss of Git History.
    *   *Impact:* Critical. Destroying history violates compliance and auditing.
    *   *Mitigation:* STRICT enforcement of using `git mv` instead of standard file system move commands.
*   **Risk:** CI/CD Pipeline Failure.
    *   *Impact:* Medium. The pipeline will fail initially due to changed paths.
    *   *Mitigation:* Update the `.github/workflows/` (or equivalent) YAML files concurrently in the same Pull Request as the structural migration.

---

## Section 10: Final Recommendation

**HALT ALL FEATURE DEVELOPMENT.** 

Do not begin Sprint 7. Do not write any new business logic, APIs, or database schemas. 

The immediate and mandatory next step is to execute this Unification Strategy. Adopt a standard Monorepo tool (like npm workspaces, pnpm, or Turborepo) to manage the links between `/apps`, `/modules`, and `/packages`. Once the unified repository compiles successfully, tests pass, and the CI/CD pipeline is green, normal feature development under the AI Engineering Constitution may resume.
