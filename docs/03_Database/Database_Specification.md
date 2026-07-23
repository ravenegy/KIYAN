# Database Specification Document
## KIYAN Factory ERP

**Prepared by:** Principal Database Engineer
**Date:** July 2026
**Industry:** Food Manufacturing (Sesame & Tahini)
**Context:** Domain-Driven Design (DDD), PostgreSQL, Offline-First Edge Server

---

## Global Database Standards
*   **Primary Keys:** All tables utilize UUIDv7 to ensure collision-free edge-to-cloud synchronization and optimal B-Tree insertion performance.
*   **Soft Deletion:** All master data tables include a `deleted_at` timestamp. Physical deletes are restricted.
*   **Audit Logging:** Core tables utilize a shadow-table audit strategy triggered at the database level to capture `before` and `after` JSONB states for regulatory compliance.
*   **Concurrency:** Optimistic concurrency control is enforced globally via a `version` integer column on all mutable entities.

---

## 1. Authentication & Authorization Module

### Table: `users`
*   **Purpose:** The central identity record for anyone accessing the ERP.
*   **Responsibilities:** Stores credential hashes, profile basics, and active status.
*   **Data Ownership:** Identity & Access Module.
*   **Relationships:** 1:1 with HR `employees` (via UUID reference, decoupled). 1:M with `user_roles`.
*   **Business Rules:** A user must be active to log in. Passwords must be hashed (e.g., Argon2).
*   **Validation Rules:** Email (if provided) must be uniquely formatted. Username must be unique.
*   **Required Indexes:** B-Tree on `username`, `email`, and `is_active`.
*   **Audit/History Requirements:** Strict audit on password changes and status changes.

### Table: `roles`
*   **Purpose:** Defines a specific job function (e.g., "QC Analyst", "Plant Manager").
*   **Responsibilities:** Groups permissions for assignment to users.
*   **Data Ownership:** Identity & Access Module.
*   **Relationships:** 1:M with `user_roles` and `role_permissions`.
*   **Business Rules:** Core system roles cannot be deleted.
*   **Required Indexes:** B-Tree on `name` (Unique).

### Table: `permissions`
*   **Purpose:** Granular access rights (e.g., `APPROVE_PO`, `ADJUST_INVENTORY`).
*   **Data Ownership:** Identity & Access Module.
*   **Relationships:** 1:M with `role_permissions`.
*   **Business Rules:** Seeded directly by the application layer. Read-only for end users.

### Table: `user_sessions`
*   **Purpose:** Tracks active logins, refresh tokens, and device types.
*   **Responsibilities:** Enforces session revocation and tracks concurrent logins.
*   **Data Ownership:** Identity & Access Module.
*   **Business Rules:** Sessions expire after a configurable TTL. Logging out revokes the session.
*   **Required Indexes:** B-Tree on `user_id`, `refresh_token` (Unique), and `expires_at`.

---

## 2. Human Resources (HR) Module

### Table: `employees`
*   **Purpose:** The master record for a worker at KIYAN factory.
*   **Responsibilities:** Stores personal details, department alignment, and hiring dates.
*   **Data Ownership:** HR Module.
*   **Relationships:** 1:1 with `users`. 1:M with `attendance_records` and `certifications`.
*   **Business Rules:** An employee must be assigned to a department.

### Table: `attendance_records`
*   **Purpose:** Logs clock-in and clock-out events for payroll and shift tracking.
*   **Data Ownership:** HR Module.
*   **Relationships:** M:1 with `employees`.
*   **Business Rules:** Clock-out time must be strictly after clock-in time. Overlapping shifts for the same employee are invalid.
*   **Required Indexes:** B-Tree on `employee_id`, `clock_in_time`.

### Table: `certifications`
*   **Purpose:** Tracks health, safety, and operational certifications (e.g., Food Handling License, Forklift Certification).
*   **Business Rules:** Must include an issue date and expiration date. Expired certifications trigger HR alerts and may block operators from certain machines.
*   **Validation Rules:** Expiration date must be in the future upon creation.

---

## 3. Warehouse Module

### Table: `warehouses`
*   **Purpose:** Defines discrete physical buildings or major structural areas.
*   **Relationships:** 1:M with `zones`.
*   **Business Rules:** Must have a unique code (e.g., `WH-RM-01`).

### Table: `zones`
*   **Purpose:** Logical areas within a warehouse (e.g., "Cold Storage", "Aisle A").
*   **Relationships:** M:1 with `warehouses`. 1:M with `locations`.
*   **Business Rules:** Zones can restrict the types of items stored within them (e.g., allergens zone).

### Table: `locations`
*   **Purpose:** The granular storage bin, rack, or floor spot.
*   **Relationships:** M:1 with `zones`. Referenced by Inventory `movements`.
*   **Business Rules:** Must have a printable barcode identifier.
*   **Required Indexes:** B-Tree on `barcode` (Unique).

---

## 4. Inventory Module

### Table: `item_masters`
*   **Purpose:** The global catalog definition of any physical good (Raw Sesame, Jars, Finished Tahini).
*   **Data Ownership:** Inventory Module (Shared Kernel reference).
*   **Relationships:** 1:M with `lots`.
*   **Business Rules:** Must specify Base Unit of Measure (UOM), whether it is lot-tracked, and if it is perishable.
*   **Validation Rules:** SKU must be strictly unique.
*   **Required Indexes:** B-Tree on `sku` (Unique). Full-Text Search vector on `name` and `description`.

### Table: `lots`
*   **Purpose:** A specific, traceable batch of an `item_master`.
*   **Data Ownership:** Inventory Module.
*   **Relationships:** M:1 with `item_masters`. Referenced heavily by Production and Quality.
*   **Business Rules:** If the item is perishable, the lot MUST have an expiration date. Must inherit the UOM of the Item Master.
*   **Required Indexes:** B-Tree on `lot_number` and `item_master_id`.
*   **Constraints:** Unique constraint on `(item_master_id, lot_number)`.

### Table: `inventory_movements`
*   **Purpose:** The immutable ledger of all stock changing locations or quantities.
*   **Responsibilities:** Acts as the single source of truth for stock calculations.
*   **Data Ownership:** Inventory Module.
*   **Relationships:** M:1 with `lots` and `locations`.
*   **Business Rules:** Append-only. Updates/Deletes are strictly forbidden at the database level. To correct an error, a compensating movement (reversal) must be logged.
*   **Required Indexes:** B-Tree on `lot_id`, `location_id`, and `created_at`.
*   **History Requirements:** Never deleted; eligible for cold-storage archiving after 5 years.

---

## 5. Recipes (BOM) Module

### Table: `recipes`
*   **Purpose:** The master formulation for a manufactured product.
*   **Data Ownership:** Recipes Module.
*   **Relationships:** 1:M with `recipe_ingredients` and `routing_steps`.
*   **Business Rules:** Recipes are immutable once published. Any alteration requires a version bump (e.g., v1 -> v2). Only one active version is permitted per target output product.
*   **Validation Rules:** Target output quantity must be greater than zero.

### Table: `recipe_ingredients`
*   **Purpose:** The exact inputs required for the recipe (Bill of Materials).
*   **Business Rules:** Quantities are exact and must match the UOM of the target `item_master`.
*   **Constraints:** Unique constraint on `(recipe_id, item_master_id)`.

### Table: `routing_steps`
*   **Purpose:** The sequence of operations (e.g., 10: Cleaning, 20: Roasting, 30: Milling).
*   **Business Rules:** Sequence numbers must be strictly ordered. Defines the machine type required.

---

## 6. Production (MES) Module

### Table: `production_orders`
*   **Purpose:** The high-level mandate to produce goods.
*   **Data Ownership:** Production Module.
*   **Relationships:** M:1 with `recipes` (via UUID). 1:M with `work_orders`.
*   **Business Rules:** Status flows strictly: Planned -> Released -> In Progress -> Completed -> Closed.

### Table: `work_orders`
*   **Purpose:** The executable unit of work on the shop floor, derived from `routing_steps`.
*   **Business Rules:** Must be assigned to a specific machine. Operators interact directly with this record to log time and materials.

### Table: `material_consumptions`
*   **Purpose:** Logs exactly which raw `lots` were poured into the machine for a `work_order`.
*   **Business Rules:** Deducts inventory dynamically. Operators must scan the lot barcode.

### Table: `yield_records`
*   **Purpose:** Logs the WIP or Finished Good `lots` produced from a `work_order`.
*   **Business Rules:** The output quantity triggers the creation of a new `Lot` in the Inventory module.

---

## 7. Quality (QMS) Module

### Table: `test_protocols`
*   **Purpose:** Defines the parameters and acceptable ranges for testing (e.g., "Moisture limit < 2%").
*   **Data Ownership:** Quality Module.
*   **Business Rules:** Target specs are stored as JSONB to allow dynamic schema changes per product type (Tahini vs. Raw Sesame).

### Table: `quality_inspections`
*   **Purpose:** A recorded testing event against a specific `Lot`.
*   **Relationships:** M:1 with `lots` (via UUID) and `test_protocols`.
*   **Business Rules:** Result is strictly Pass, Fail, or Conditional.

### Table: `quarantine_holds`
*   **Purpose:** An explicit lock on a `Lot` preventing its use in Production or Sales.
*   **Business Rules:** Created automatically if an inspection fails. Can only be released by a user with the `QC_MANAGER` permission, requiring a justification note.

---

## 8. Purchasing Module

### Table: `suppliers`
*   **Purpose:** Master record for vendors.
*   **Business Rules:** Must track approval status. Unapproved suppliers cannot be issued POs.

### Table: `purchase_orders`
*   **Purpose:** The legal contract for procurement.
*   **Relationships:** 1:M with `po_line_items`.
*   **Business Rules:** Requires hierarchical approval if total value exceeds configured thresholds.

### Table: `goods_receipts`
*   **Purpose:** The physical intake of items against a PO.
*   **Business Rules:** Generates new `Lots` and triggers `inventory_movements` for the receiving dock. Can support partial receipts against the PO.

---

## 9. Sales Module

### Table: `customers`
*   **Purpose:** Master record for B2B wholesale buyers.
*   **Business Rules:** Tracks credit limits. Orders exceeding the limit are blocked pending Finance approval.

### Table: `sales_orders`
*   **Purpose:** The customer's requested purchase.
*   **Relationships:** 1:M with `so_line_items`.
*   **Business Rules:** Prices are locked at the time of creation based on the customer's active pricing tier.

### Table: `dispatches`
*   **Purpose:** The shipping execution document (Bill of Lading).
*   **Business Rules:** Deducts finished goods inventory. Triggers the Accounting module to generate an Invoice and recognize COGS.

---

## 10. Accounting Module

### Table: `accounts`
*   **Purpose:** The Chart of Accounts (Assets, Liabilities, Equity, Revenue, Expenses).
*   **Business Rules:** Structured hierarchically.

### Table: `journal_entries`
*   **Purpose:** The double-entry bookkeeping master record.
*   **Relationships:** 1:M with `journal_lines`.
*   **Business Rules:** The sum of Debits and Credits across all child `journal_lines` MUST equal absolute zero. If it does not, the database transaction is aborted.

### Table: `invoices`
*   **Purpose:** AP (payable to suppliers) and AR (receivable from customers).
*   **Relationships:** 1:M with `payments`.

---

## 11. Maintenance Module

### Table: `equipment`
*   **Purpose:** The master record of physical factory machinery.
*   **Business Rules:** Tracks cumulative runtime hours and last maintenance date.

### Table: `maintenance_orders`
*   **Purpose:** Work tickets for repairs or preventative maintenance.
*   **Business Rules:** If an equipment is under active maintenance, the Production module cannot dispatch Work Orders to it.

---

## 12. Reporting & Notifications Module

### Table: `system_alerts`
*   **Purpose:** A log of system-generated notifications.
*   **Relationships:** Polymorphic relationship to any entity (e.g., linked to a `quarantine_hold` or a `purchase_order`).
*   **Business Rules:** Tracks whether the alert has been acknowledged, read, or escalated.
*   **Indexes:** B-Tree on `user_id` and `is_read`.
