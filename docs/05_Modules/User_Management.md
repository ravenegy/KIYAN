# Module Specification Document
## User Management, Roles & Permissions Module
**System:** KIYAN Factory ERP
**Prepared by:** Enterprise ERP Business Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Enterprise-Grade

---

## 1. Objective & Scope
The User Management, Roles, and Permissions module serves as the central administrative hub for identity governance within the KIYAN Factory ERP. It provisions access, enforces security boundaries, and maps human workers to their digital capabilities. 

This specification dictates a dynamic Role-Based Access Control (RBAC) foundation that dictates exactly who can view, modify, or approve data across all factory departments, while laying the architectural groundwork for future Attribute-Based Access Control (ABAC).

---

## 2. Access Control Architecture

### 2.1 Dynamic RBAC (Current State)
*   Permissions are predefined system constants mapped to specific actions (e.g., `inventory:move`, `po:approve`).
*   Permissions are grouped logically (e.g., "Inventory Management", "Financial Approvals").
*   Roles are collections of Permissions.
*   Users are assigned one or multiple Roles, inheriting the aggregate sum of all granted Permissions.

### 2.2 ABAC Readiness (Future State)
To support future Attribute-Based Access Control, the architecture will support evaluating context during permission checks. While currently implemented as RBAC, the validation layer is designed to eventually accept resource attributes (e.g., "Can the user approve *this specific* PO based on their department budget limit?").

---

## 3. Base System Roles

The system will ship with the following immutable, pre-configured roles. These base roles guarantee the factory can operate immediately upon deployment without complex initial configuration.

1.  **Owner:** Unrestricted access to all modules, including system configuration and financial ledgers.
2.  **Factory Manager:** Full operational oversight; can view all production, quality, and warehouse data, but may have restricted access to underlying accounting/payroll structures.
3.  **Production Manager:** Can create, edit, and release Production Orders, manage routing, and override machine assignments.
4.  **Warehouse Manager:** Can authorize stock adjustments, oversee cycle counts, and manage warehouse zones.
5.  **Warehouse Employee:** Restricted to executing inventory movements, scanning barcodes, and picking orders.
6.  **Sales:** Can create sales orders, view finished goods inventory, and view customer pricing tiers.
7.  **Purchasing:** Can create purchase orders, view supplier lists, and monitor raw material stock levels.
8.  **Accountant:** Full access to general ledgers, AP/AR, invoicing, and COGS reports.
9.  **HR:** Can manage employee records, view attendance, and handle onboarding/termination workflows.
10. **Quality Control:** Can define test protocols, execute inspections, and issue or release Quarantine holds.
11. **Maintenance:** Can view machine telemetry, update maintenance logs, and consume spare parts.
12. **Operator:** Heavily restricted role. Can only interact with the Shop Floor UI to log yields, scrap, and machine time against assigned Work Orders.
13. **Viewer:** Read-only access to specific dashboards. Cannot mutate any state.
14. **Custom Roles:** User-defined roles configured by administrators to fit unique KIYAN operational needs.

---

## 4. Feature Specifications

### 4.1 User Management & Account Status
*   **Purpose:** To provision, modify, and revoke digital access to the ERP system.
*   **Workflow:** HR creates an Employee. An IT Administrator subsequently creates a User account, links it to the Employee, assigns initial Roles, and sets the Account Status to Active.
*   **Business Rules:** 
    *   A User account cannot be physically deleted (Soft Delete only) to preserve historical audit trails (e.g., who approved a PO in 2024).
    *   Account Status must transition between: `Pending`, `Active`, `Locked`, `Suspended`.
    *   Suspending an account immediately terminates all active sessions globally.
*   **Validation:** Username and Email (if applicable) must be globally unique.
*   **Dependencies:** Authentication Module (for session termination), HR Module (for Employee validation).
*   **Security:** Only roles with `USER_MANAGE` permissions can create or modify accounts.
*   **Edge Cases:** Re-hiring a previously terminated employee requires reactivating the old user account rather than creating a duplicate.
*   **Exceptions:** `DuplicateUserException`, `ImmutableUserModificationException`.

### 4.2 Employee Link (HR Integration)
*   **Purpose:** To strictly map a digital identity (User) to a physical human (Employee) for HR, payroll, and compliance purposes.
*   **Workflow:** During User creation, an existing Employee ID is selected from a dropdown. 
*   **Business Rules:** 
    *   Strictly 1:1 relationship. A User can only be mapped to one Employee; an Employee can only have one User account.
    *   If an Employee is terminated in the HR module, the linked User account is automatically Suspended.
*   **Dependencies:** HR Module.
*   **Edge Cases:** External auditors or third-party IT contractors may require User accounts without being formal KIYAN Employees. The system must support "Unlinked" administrative accounts.

### 4.3 User Profile & Profile Photo
*   **Purpose:** To personalize the ERP experience and allow visual identification of operators on shared shop floor screens.
*   **Workflow:** Users navigate to "My Profile" to upload a photo and configure UI preferences (e.g., language, dark mode).
*   **Business Rules:** 
    *   Profile Photos must be strictly resized and compressed by the system before storage to prevent database/storage bloat.
    *   The profile displays read-only data inherited from the Employee Link (e.g., Legal Name, Start Date).
*   **Validation:** Uploaded files must be images (JPEG/PNG) and under a strict file size limit (e.g., 2MB).
*   **Security:** Users can only edit their own profiles.
*   **Exceptions:** `InvalidImageFormatException`, `FileSizeExceededException`.

### 4.4 Department Assignment & Job Titles
*   **Purpose:** To categorize users organizationally and prepare the system for future ABAC (Attribute-Based Access Control) routing.
*   **Workflow:** Populated automatically via the Employee Link from the HR module. 
*   **Business Rules:** 
    *   Job Titles and Departments are Master Data owned by the HR Module, not the User Module.
    *   The User Profile view treats these fields as strictly read-only.
    *   Future ABAC rule: "User can only approve Purchase Orders assigned to their specific Department."
*   **Dependencies:** HR Module (`departments`, `job_titles`).
*   **Edge Cases:** Cross-functional employees working in multiple departments must have a designated "Primary" department for approval routing workflows.

### 4.5 Role Management
*   **Purpose:** To define security profiles (Custom Roles) tailored to KIYAN's evolving organizational structure.
*   **Workflow:** Administrator navigates to Role Management, clicks "Create Custom Role," assigns a Name and Description, checks off desired permissions, and saves.
*   **Business Rules:** 
    *   The core Base System Roles (e.g., Owner, Factory Manager) are System-Locked and cannot be deleted or modified.
    *   Custom roles can be duplicated from base roles to serve as a starting template.
*   **Validation:** Role Name must be unique.
*   **Security:** Requires `ROLE_MANAGE` permission.
*   **Exceptions:** `SystemRoleModificationException`, `DuplicateRoleNameException`.

### 4.6 Permission Management & Permission Groups
*   **Purpose:** To provide a granular, understandable matrix of system capabilities.
*   **Workflow:** Permissions are viewed in a hierarchical matrix grouped by Bounded Context (e.g., Group: `Inventory`, Permissions: `View Stock`, `Adjust Stock`, `Move Stock`).
*   **Business Rules:** 
    *   Permissions are static system constants defined by the developers (e.g., `CREATE_PO`). End-users cannot "create" new permissions.
    *   Permission Groups are purely for UI/UX organization to prevent overwhelming administrators with a flat list of 500+ permissions.
    *   Certain high-risk permissions (e.g., `BYPASS_QUARANTINE`) trigger a secondary confirmation warning when assigned to a Custom Role.
*   **Dependencies:** All other ERP Modules (which define and expose their available permissions to this module).
*   **Edge Cases:** A user is assigned two roles: Role A explicitly grants `MOVE_INVENTORY`, Role B lacks it. The system calculates access additively (User is granted the permission).
*   **Exceptions:** `PermissionNotFoundException`.

---

## 5. Security & Architectural Guidelines

### 5.1 Principle of Least Privilege
The system mandates that all newly created Users and Custom Roles default to zero access. Every permission must be explicitly granted. There are no "implied" accesses outside of the hardcoded `Owner` role.

### 5.2 Token Hydration
To ensure rapid authorization on the Edge Server, a user's calculated flat list of permissions is hydrated into their secure JWT Access Token (or a heavily cached Redis layer) upon login. This ensures the database is not queried for permission checks on every single HTTP request.

### 5.3 Audit & Traceability
Every modification within this module—creating a user, suspending an account, changing a role's permissions—generates a high-priority entry in the Audit Log, capturing the acting administrator's UUID, the target entity, and a JSON payload of the exact changes made.
