# KIYAN Factory ERP: Enterprise Dependency Graph & Architecture Strategy

**Prepared by:** Senior Software Architect
**Date:** July 2026
**Scope:** Modular Monolith Dependency Mapping & Decoupling Strategy

---

## Executive Summary
In an enterprise ERP, haphazardly referencing modules creates a "Big Ball of Mud" architecture characterized by lethal circular dependencies. This document maps the strict, unidirectional dependency graph for the KIYAN Factory ERP. By enforcing an Event-Driven Architecture (EDA) for transactional workflows and strictly separating Master Data from Transaction Data, we prevent tight coupling, allowing independent module scaling and testing.

---

## 1. The Global Dependency Tree (Hierarchical)

The system is structured in strict architectural layers. A layer may only depend on the layers *below* it. Upward dependencies are strictly forbidden and must be handled via asynchronous events.

*   **Layer 0: Core Infrastructure & Cross-Cutting Concerns**
    *   Authentication & RBAC
    *   Audit Logging & Telemetry
*   **Layer 1: Foundational Master Data**
    *   Settings (Currencies, UoMs, Taxes, Factory Branches)
    *   Products (Item Master Data)
*   **Layer 2: Core Logistics (The Ledger)**
    *   Inventory (Stock Ledger - The source of truth for physical reality)
*   **Layer 3: Supply Chain & CRM (External Interactions)**
    *   Purchasing (Suppliers, POs)
    *   Sales & CRM (Customers, SOs)
*   **Layer 4: Execution & Manufacturing (Internal Operations)**
    *   Warehouse Management (WMS)
    *   Recipes (BOM)
    *   Production (MES)
    *   Quality Control (QC)
    *   Maintenance (EAM)
*   **Layer 5: Back-Office & Aggregation (The Observers)**
    *   Accounting & Finance (General Ledger)
    *   Traceability & Lineage
    *   Reports & Business Intelligence (BI)

---

## 2. Module Dependency Analysis

### 2.1 Settings & Configuration (Foundation)
*   **Depends On:** Authentication, RBAC.
*   **Depended On By:** Every module in the system.
*   **Shared Models:** `Currency`, `UnitOfMeasure`, `TaxCode`, `FactoryBranch`.
*   **Circular Dependency Risk:** None (Root node).
*   **How to Avoid Coupling:** Expose configuration data via highly cached, read-only internal APIs or memory-resident state.

### 2.2 Products (Item Master)
*   **Depends On:** Settings (UoM, Taxes).
*   **Depended On By:** Inventory, Purchasing, Sales, Recipes, WMS, Production.
*   **Shared Models:** `Item`, `ItemCategory`.
*   **Circular Dependency Risk:** Low.
*   **How to Avoid Coupling:** Products should never know about their stock levels. The `Item` model must be entirely decoupled from the `StockLedger` model.

### 2.3 Inventory (Stock Ledger)
*   **Depends On:** Products, Settings, Auth.
*   **Depended On By:** WMS, Purchasing, Sales, Production, Traceability, Accounting.
*   **Shared Models:** `Lot`, `StockMovement`, `BinBalance`.
*   **Circular Dependency Risk:** **HIGH.** Production needs Inventory to consume stock; Inventory needs Production to know when yield occurs.
*   **How to Avoid Coupling:** Make Inventory a **Passive Sink**. Inventory never calls other modules. WMS, Production, and Sales emit domain events (`YieldLogged`, `OrderPicked`). The Inventory module listens to these events and updates the ledger asynchronously.

### 2.4 Purchasing & Sales (Supply Chain)
*   **Depends On:** Products, Settings.
*   **Depended On By:** WMS, Accounting.
*   **Shared Models:** `PurchaseOrder`, `SalesOrder`, `BusinessPartner`.
*   **Circular Dependency Risk:** **HIGH.** Purchasing creates POs for WMS. WMS receives goods (GRN). Purchasing needs to know the GRN to close the PO.
*   **How to Avoid Coupling:** Event-Driven flow. WMS publishes `GoodsReceivedEvent`. Purchasing subscribes to update PO status. Accounting subscribes to accrue Accounts Payable.

### 2.5 Warehouse Management (WMS)
*   **Depends On:** Inventory, Purchasing, Sales.
*   **Depended On By:** Production, Quality Control.
*   **Shared Models:** `WarehouseTask`, `BinLocation`, `GRN`, `DispatchNote`.
*   **Circular Dependency Risk:** Medium.
*   **How to Avoid Coupling:** WMS relies on interfaces, not concrete implementations of POs/SOs. It receives an `ExpectedReceipt` interface from Purchasing, entirely decoupling it from the purchasing business logic.

### 2.6 Recipes (BOM) & Production (MES)
*   **Depends On:** Products, WMS, Inventory, Settings.
*   **Depended On By:** Quality Control, Maintenance, Accounting, Traceability.
*   **Shared Models:** `BillOfMaterial`, `ProductionOrder`, `WorkCenter`.
*   **Circular Dependency Risk:** **HIGH.** Quality Control must inspect Production output, but Production cannot close until QC passes.
*   **How to Avoid Coupling:** State Machines. Production emits `YieldReadyForInspection`. QC executes and emits `InspectionPassed` or `InspectionFailed`. Production transitions state based on the event payload, avoiding direct synchronous calls to the QC module.

### 2.7 Accounting & Finance (The Ultimate Sink)
*   **Depends On:** *All Transactional Modules* (Inventory, Sales, Purchasing, Production, HR).
*   **Depended On By:** Reports & BI.
*   **Shared Models:** `JournalEntry`, `GeneralLedgerAccount`.
*   **Circular Dependency Risk:** **CRITICAL.** If Accounting directly depends on Sales, and Sales directly depends on Accounting (for credit checks), the monolith will lock up.
*   **How to Avoid Coupling:** **Total Event Sourcing.** Accounting must be utterly decoupled from daily operations. It acts purely as a listener. When Sales emits `InvoiceGenerated`, Accounting translates that event into a double-entry `JournalEntry`. For the reverse (Credit Checks), Accounting exposes a fast, read-only `CustomerBalance` view that Sales can query synchronously.

---

## 3. Shared Cross-Cutting Services

To prevent developers from writing redundant code that tightly couples modules together, the following services must be injected globally:

1.  **The Event Bus (Pub/Sub):** The central nervous system. Allows the Sales module to scream "Order Placed!" into the void, letting Inventory, WMS, and Accounting react without the Sales module knowing they exist.
2.  **Audit Logger:** An ambient service that intercepts all database mutations and logs the "Who, What, When" without modules needing to explicitly call it.
3.  **Search Indexer:** Listens to CUD (Create, Update, Delete) events across the Event Bus and updates the global search indices asynchronously.
4.  **Notification Engine:** Handles the routing of emails, SMS, and in-app alerts based on business events, decoupling communication from business logic.

---

## 4. Safest Implementation Order (The Roadmap)

To avoid "Dependency Deadlocks" (where Team A cannot build the Sales module because Team B hasn't built the Tax configuration), development must follow this strict sequence:

*   **Phase 1: The Bedrock (Zero Dependencies)**
    1. Auth, RBAC, & Audit Logger.
    2. Settings (Currencies, Taxes, UoMs).
    3. Products (Item Master Data & BOM).
*   **Phase 2: The Physical Reality (Depends on Phase 1)**
    4. Inventory Ledger (Core arithmetic and constraints).
    5. Purchasing (Inbound supply).
    6. Sales (Outbound demand).
*   **Phase 3: The Factory Floor (Depends on Phase 1 & 2)**
    7. Warehouse Management (Bins, Tasks, GRNs).
    8. Production MES (Work Orders, Yield, Scrap).
    9. Quality Control & Traceability.
*   **Phase 4: The Observers (Depends on ALL)**
    10. Accounting & General Ledger.
    11. BI, Reports & Dashboards.

---

## 5. Highlighted Risky Dependencies & Architecture Warnings

1.  **The "God Object" Item Master:** The `Item` record is utilized by literally every module. *Warning:* Do not bloat the `Item` table with module-specific logic. Sales data (pricing) belongs in a `PriceList` table. Manufacturing data belongs in a `Recipe` table. The `Item` table should only contain identity (SKU, Name, UoM).
2.  **Synchronous API Calls Between Modules:** In a Modular Monolith, it is tempting to directly invoke `AccountingService.createJournalEntry()` from inside the `InventoryService`. *Warning:* This is catastrophic. If the Accounting database transaction fails, it rolls back the Inventory transaction, causing a factory worker's physical scan to fail because of a financial period closing error. **Always use Domain Events.**
3.  **Reporting Overload:** *Warning:* If the BI/Reports module runs complex `JOIN` queries directly against the transactional tables (like `StockLedger`), it will cause table locks and crash the MES terminals on the shop floor. Reporting must depend on Asynchronous Read Replicas or flattened Data Marts.
