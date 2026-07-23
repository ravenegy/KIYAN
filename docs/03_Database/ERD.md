# Entity Relationship Model (ERD) Planning Document
## KIYAN Factory ERP

**Prepared by:** Enterprise Data Architect
**Date:** July 2026
**Industry:** Food Manufacturing (Sesame & Tahini)
**Context:** Domain-Driven Design (DDD), Modular Monolith, Offline-First

---

## 1. Executive Summary
This document outlines the conceptual Entity Relationship Model (ERD) for the KIYAN Factory ERP. Aligned with Domain-Driven Design (DDD) principles, the data model is divided into distinct **Bounded Contexts** (Modules). Each context defines its own **Aggregate Roots** (the primary entities that control access to their child entities), ensuring data integrity, defining clear ownership boundaries, and preventing tangled, monolithic database schemas.

---

## 2. Domain Models by Module

### 2.1 Authentication & Authorization
*   **Purpose:** Manages system access, security credentials, and permissions.
*   **Aggregate Roots:** `User`, `Role`
*   **Main Entities:** 
    *   `User`: Represents an individual with system access.
    *   `Role`: Defines a job function (e.g., QC Analyst, Warehouse Operator).
    *   `Permission`: A specific granular access right (e.g., `APPROVE_PO`).
    *   `UserSession`: Tracks active logins and refresh tokens.
*   **Relationships & Cardinality:**
    *   `User` (M:1) `Role`: Many users can share one role.
    *   `Role` (1:M) `Permission`: A role encapsulates multiple permissions.
    *   `User` (1:M) `UserSession`: A user can have multiple active sessions (e.g., tablet and desktop).
*   **Lifecycle:** Users are created during onboarding, deactivated (Soft Deleted) upon termination. Sessions are transient and ephemeral.

### 2.2 Human Resources (HR)
*   **Purpose:** Manages employee records, scheduling, and labor compliance.
*   **Aggregate Roots:** `Employee`, `Department`
*   **Main Entities:**
    *   `Employee`: Detailed worker profile (linked 1:1 to `User` if they have system access).
    *   `Shift`: Defined working hours.
    *   `AttendanceRecord`: Clock-in/clock-out events.
    *   `Certification`: Health and safety clearances (vital for food manufacturing).
*   **Relationships & Cardinality:**
    *   `Department` (1:M) `Employee`
    *   `Employee` (1:M) `AttendanceRecord`
    *   `Employee` (1:M) `Certification`
*   **Lifecycle:** Certifications have expiration dates and drive proactive renewal notifications.

### 2.3 Warehouse
*   **Purpose:** Models the physical topology of the KIYAN facility.
*   **Aggregate Roots:** `Warehouse`
*   **Main Entities:**
    *   `Warehouse`: A distinct physical building or large area (e.g., RM Warehouse, FG Warehouse).
    *   `Zone`: A logical grouping within a warehouse (e.g., Cold Storage, Ambient).
    *   `Location` (Bin): The exact physical shelf or floor space containing goods.
*   **Relationships & Cardinality:**
    *   `Warehouse` (1:M) `Zone`
    *   `Zone` (1:M) `Location`
*   **Dependencies:** Serves as the spatial foundation for the Inventory module.

### 2.4 Inventory
*   **Purpose:** Tracks what exists, where it is, and its exact batch lineage.
*   **Aggregate Roots:** `ItemMaster`, `Lot`, `InventoryMovement`
*   **Main Entities:**
    *   `ItemCategory`: Groupings like Raw Sesame, Packaging, Finished Paste.
    *   `ItemMaster`: The master catalog definition of a product or material.
    *   `Lot`: A uniquely identified batch of an ItemMaster, tracking expiration and origin.
    *   `StockLevel`: A materialized view/entity representing current quantities per Lot per Location.
    *   `InventoryMovement`: An immutable record of stock shifting between locations or changing status.
*   **Relationships & Cardinality:**
    *   `ItemCategory` (1:M) `ItemMaster`
    *   `ItemMaster` (1:M) `Lot`
    *   `Lot` (1:M) `InventoryMovement`
    *   `Location` (1:M) `StockLevel`
*   **Lifecycle:** Lots are generated upon Receiving or Production Completion. Movements are append-only.

### 2.5 Recipes (BOM & Routing)
*   **Purpose:** Defines how to make KIYAN products.
*   **Aggregate Roots:** `Recipe`
*   **Main Entities:**
    *   `Recipe`: The master formulation (version-controlled).
    *   `RecipeIngredient`: Required quantities of `ItemMaster` inputs.
    *   `RoutingStep`: The sequence of machines (Cleaning -> Roasting -> Milling).
*   **Relationships & Cardinality:**
    *   `Recipe` (1:M) `RecipeIngredient`
    *   `Recipe` (1:M) `RoutingStep`
*   **Lifecycle:** Recipes are highly controlled. Once a recipe version has been used in production, it is locked. Changes generate a new version.

### 2.6 Production (MES)
*   **Purpose:** Tracks shop-floor execution and yield against recipes.
*   **Aggregate Roots:** `ProductionOrder`
*   **Main Entities:**
    *   `ProductionOrder`: A mandate to produce X quantity of Finished Goods by Y date.
    *   `WorkOrder`: The execution breakdown of a Production Order per Routing Step.
    *   `MaterialConsumption`: Log of exact `Lot`s consumed (scanned by barcode).
    *   `YieldRecord`: Log of WIP or FG output.
    *   `ScrapLog`: Records of wasted material.
*   **Relationships & Cardinality:**
    *   `Recipe` (1:M) `ProductionOrder`
    *   `ProductionOrder` (1:M) `WorkOrder`
    *   `WorkOrder` (1:M) `MaterialConsumption`
    *   `WorkOrder` (1:M) `YieldRecord`
*   **Dependencies:** Relies heavily on Inventory (to consume Lots) and Recipes (for instructions).

### 2.7 Quality (QMS)
*   **Purpose:** Ensures food safety compliance and manages testing.
*   **Aggregate Roots:** `TestProtocol`, `QualityInspection`
*   **Main Entities:**
    *   `TestProtocol`: Definitions for tests (e.g., Moisture %, Viscosity).
    *   `QualityInspection`: An execution of a protocol against a specific `Lot`.
    *   `InspectionResult`: The specific values (JSONB payload) vs target tolerances.
    *   `QuarantineHold`: A lock placed on a `Lot` preventing movement/usage.
*   **Relationships & Cardinality:**
    *   `Lot` (1:M) `QualityInspection`
    *   `TestProtocol` (1:M) `QualityInspection`
    *   `QualityInspection` (1:1) `QuarantineHold` (Optional)
*   **Ownership:** Quality owns the "Status" flag of any Inventory Lot.

### 2.8 Purchasing
*   **Purpose:** Manages raw material acquisition.
*   **Aggregate Roots:** `Supplier`, `PurchaseOrder`, `GoodsReceipt`
*   **Main Entities:**
    *   `Supplier`: Vendor master data and QC ratings.
    *   `PurchaseOrder`: The contract to buy.
    *   `POLineItem`: Specific items and expected costs.
    *   `GoodsReceipt`: The physical intake document matching the PO.
*   **Relationships & Cardinality:**
    *   `Supplier` (1:M) `PurchaseOrder`
    *   `PurchaseOrder` (1:M) `POLineItem`
    *   `PurchaseOrder` (1:M) `GoodsReceipt`
*   **Lifecycle:** POs progress from Draft -> Approved -> Partially Received -> Closed.

### 2.9 Sales
*   **Purpose:** Manages B2B customer orders and dispatch.
*   **Aggregate Roots:** `Customer`, `SalesOrder`, `Dispatch`
*   **Main Entities:**
    *   `Customer`: Client master data, credit limits, pricing tiers.
    *   `SalesOrder`: The customer's request.
    *   `SOLineItem`: Items requested.
    *   `Dispatch`: The outbound shipment record.
*   **Relationships & Cardinality:**
    *   `Customer` (1:M) `SalesOrder`
    *   `SalesOrder` (1:M) `SOLineItem`
    *   `SalesOrder` (1:M) `Dispatch`
*   **Dependencies:** Dispatch directly triggers Inventory Movements (Outbound).

### 2.10 Accounting
*   **Purpose:** Financial tracking and ledger operations.
*   **Aggregate Roots:** `Account` (Chart of Accounts), `JournalEntry`, `Invoice`
*   **Main Entities:**
    *   `Account`: General Ledger categories.
    *   `JournalEntry`: Double-entry accounting master record.
    *   `JournalLine`: Debits and Credits.
    *   `Invoice`: AP (from Purchasing) or AR (from Sales).
    *   `Payment`: Cash receipts or disbursements.
*   **Relationships & Cardinality:**
    *   `JournalEntry` (1:M) `JournalLine`
    *   `Account` (1:M) `JournalLine`
    *   `Invoice` (1:M) `Payment`
*   **Dependencies:** Receives financial trigger events from almost all other modules (e.g., Goods Receipt, Yield Generation, Dispatch).

### 2.11 Maintenance
*   **Purpose:** Manages equipment health.
*   **Aggregate Roots:** `Equipment`, `MaintenanceOrder`
*   **Main Entities:**
    *   `Equipment`: Physical machines (Roasters, Mills).
    *   `MaintenanceOrder`: Scheduled or reactive work.
    *   `SparePartUsage`: Inventory consumed for repairs.
*   **Relationships & Cardinality:**
    *   `Equipment` (1:M) `MaintenanceOrder`
    *   `MaintenanceOrder` (1:M) `SparePartUsage`
*   **Lifecycle:** Preventative maintenance orders are auto-generated based on Equipment runtime hours logged in Production.

### 2.12 Reporting & Notifications
*   **Aggregate Roots:** `ReportTemplate`, `SystemAlert`
*   **Main Entities:**
    *   `NotificationSubscription`: Tracks which users want to receive which alerts.
    *   `GeneratedReport`: Cached outputs of heavy historical queries.
*   **Relationships:** Cross-cutting. SystemAlerts are linked via polymorphic associations to the entities that triggered them (e.g., an alert linked to a `QuarantineHold`).

---

## 3. Cross-Module Relationships & Integration Rules

To maintain the Modular Monolith and avoid a "spaghetti" database, explicit foreign keys across Bounded Context boundaries will be strictly minimized. Instead of direct foreign keys, cross-module relationships are maintained via **Immutable Identifiers (UUIDs)**.

*   **Production -> Inventory:** `MaterialConsumption` holds the `LotId` (UUID), but the Production module does not own the `Lot` table. It communicates via Domain Events to request the Inventory module to deduct stock.
*   **Sales -> Accounting:** When a `SalesOrder` is dispatched, Sales publishes a `GoodsDispatchedEvent`. Accounting listens to this, looks up the associated COGS via the `ItemMasterId`, and generates a `JournalEntry`.
*   **Quality -> Inventory:** Quality inspects a `LotId`. If it fails, Quality publishes a `LotQuarantinedEvent`. Inventory listens and flags the Lot, preventing it from being picked by Warehouse operators.

---

## 4. Future Scalability & Data Archiving

### Eventual Consistency & CQRS
Because modules are decoupled, heavy read operations (like calculating the total yield efficiency of a specific Tahini recipe over a year) won't lock up the tables used for fast barcode scanning. The architecture supports projecting these events into denormalized Read Models specific to the Reporting module.

### Active/Archive Partitioning
Entities like `InventoryMovement`, `JournalLine`, and `QualityInspection` will grow massively.
*   **Current State:** The database will use native PostgreSQL Table Partitioning by Month/Year.
*   **Future Scale:** Older partitions (e.g., beyond 3 years) can be detached and archived to the Cloud Replica, removing the data burden from the KIYAN Edge Server while preserving historical compliance.

### Multi-Facility Expansion
The current model assumes one factory (KIYAN). To support future expansion to a second facility, a `FacilityId` attribute will be appended to the Shared Kernel components, automatically partitioning all transactional data by the physical site while sharing Master Data (Recipes, ItemMasters) globally.
