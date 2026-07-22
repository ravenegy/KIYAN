# Module Specification Document
## Inventory Management Module
**System:** KIYAN Factory ERP
**Prepared by:** Enterprise ERP Business Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Enterprise-Grade

---

## 1. Objective & Scope
To define the Inventory Management Module for the KIYAN Factory ERP. This module is the physical truth of the factory, tracking every gram of sesame and every glass jar from the moment it enters the facility until it leaves. It enforces strict traceability, ensures material availability for production, and provides the foundational data for financial valuation and Cost of Goods Sold (COGS).

---

## 2. Supported Inventory Types

The system categorizes all physical items into distinct types to drive specific business logic (e.g., expiry tracking is required for food, but not for spare parts).

*   **Raw Materials (RM):** Core agricultural inputs (e.g., Sudanese Sesame Seeds, Salt). Heavily lot-tracked and subject to strict QC intake.
*   **Packaging Materials (PM):** Jars, lids, labels, cardboard boxes, and shrink wrap. Lot tracked for recall purposes (e.g., glass contamination).
*   **Semi-Finished Products (WIP):** Bulk manufactured goods that are not yet packaged for retail (e.g., Bulk Roasted Sesame, 1000L Totes of Tahini Paste). 
*   **Finished Products (FG):** Packaged, labeled, and palletized goods ready for sale (e.g., 500g White Tahini Jar).
*   **Consumables:** Non-BOM items used in factory operations (e.g., hairnets, gloves, food-safe machine grease, cleaning chemicals).
*   **Damaged Items:** Inventory moved to a logical "Scrap/Damaged" state prior to physical disposal.
*   **Returned Items (RMA):** Finished goods returned by customers. Automatically placed in quarantine pending QC review.

---

## 3. Core Traceability & Control

### 3.1 Batch & Lot Tracking
*   **Definition:** Every raw material, WIP, and finished good exists as a distinct `Lot`. A `Lot` represents a specific quantity of an `ItemMaster` received or produced at the same time under the same conditions.
*   **Workflow:** When a supplier delivers 20 tons of sesame, it is assigned an internal KIYAN Lot ID (linked to the supplier's batch code). When production consumes 5 tons from Lot A and 5 tons from Lot B to produce Tahini, the resulting Tahini is assigned a new Finished Good Lot C, which permanently references Lots A and B in its lineage.

### 3.2 Expiry Tracking & FEFO/FIFO
*   **First-Expired-First-Out (FEFO):** Enforced for all perishable food items (Raw Sesame, WIP Tahini, Finished Jars). The system directs warehouse operators to pick the lot expiring soonest.
*   **First-In-First-Out (FIFO):** Enforced for non-perishable materials (Packaging, Consumables) to prevent degradation of packaging materials over years.
*   **Expiry Rules:** The system strictly blocks the allocation or consumption of expired lots in production or sales.

### 3.3 Stock Valuation Strategy
*   **Methodology:** Moving Average Cost (MAC).
*   **Logic:** Every time new inventory is received (e.g., at a different purchase price than existing stock), the system recalculates the average unit cost for that item.
*   **Impact:** When Production consumes a raw material, or Sales dispatches a finished good, the ERP debits/credits the Accounting ledger based on the MAC at that exact moment in time, ensuring highly accurate COGS.

---

## 4. Inventory Workflows & Lifecycle

### 4.1 Stock Movement (Intra-Warehouse)
*   **Purpose:** Tracking the physical relocation of a lot from one bin/zone to another.
*   **Workflow:** Operator scans the Lot barcode, scans the Destination Bin barcode, and confirms the quantity moved.
*   **Business Rules:** Does not impact financial valuation. Generates an immutable `InventoryMovement` record.

### 4.2 Inventory Transfer (Inter-Warehouse)
*   **Purpose:** Moving stock between distinct physical buildings (e.g., Off-site RM Storage to Main Factory).
*   **Workflow:** Requires a formal "Transfer Order." Stock is deducted from Source Warehouse (marked as "In Transit") and added to Destination Warehouse upon physical receipt scan.
*   **Business Rules:** "In Transit" stock is owned financially but is NOT available for production.

### 4.3 Inventory Reservations & Availability
*   **On-Hand Stock:** The absolute physical quantity of an item in the building.
*   **Reserved Stock:** Quantities hard-allocated to a released Production Order or a confirmed Sales Order, but not yet physically picked.
*   **Quarantined Stock:** Lots locked by QC due to failed tests or pending inspection.
*   **Available to Promise (ATP):** `On-Hand` - `Reserved` - `Quarantined`. This is the ONLY number Sales and Production Planning can use to make decisions.

### 4.4 Inventory Counting (Cycle Counts & Physical Inventory)
*   **Purpose:** Reconciling system data with physical reality.
*   **Workflow:** The system generates a "Blind Count" task. The operator scans bins and enters physical quantities without knowing what the system *thinks* is there.
*   **Business Rules:** Discrepancies generate a variance report. Variances must be approved by the Warehouse Manager before stock levels are officially adjusted.

### 4.5 Stock Adjustment
*   **Purpose:** Handling shrinkage, breakage, spillage, or finding lost stock outside of a formal cycle count.
*   **Workflow:** Operator requests an adjustment (e.g., "Dropped glass jar on floor"). 
*   **Business Rules:** Requires a reason code (e.g., Damage, Expiry, Theft). Adjustments that decrease stock trigger an automatic Journal Entry in the Accounting module to write off the asset value as an expense.

---

## 5. Replenishment Strategy (Thresholds)

*   **Minimum Stock (Reorder Point):** The threshold at which the system alerts Purchasing to reorder an item to prevent a stockout.
*   **Maximum Stock:** The physical or financial limit of how much of an item should be kept on hand. Alerts trigger if a PO pushes projected inventory above this line (preventing warehouse overflow).
*   **Safety Stock:** The absolute baseline buffer kept to mitigate supply chain delays or sudden sales spikes. ATP calculations can visually warn if an order dips into safety stock.

---

## 6. Business & Validation Rules

*   **IR-01 (Negative Stock Prevention):** The system absolutely forbids negative stock. A transaction attempting to deduct more stock than physically exists in a specific bin is rejected at the database level.
*   **IR-02 (Quarantine Lock):** Under no circumstances can a lot with a status of `QUARANTINED` be picked for a Sales Order or consumed in a Production Order.
*   **IR-03 (Immutability):** An `InventoryMovement` record cannot be edited or deleted once committed. Mistakes must be corrected with a reversing adjustment movement.
*   **IR-04 (UOM Consistency):** All underlying inventory arithmetic is performed in the item's Base Unit of Measure (e.g., Grams). Conversions to display units (e.g., 20kg Sacks) happen strictly at the Presentation layer.

---

## 7. Dependencies & Integrations

*   **Purchasing Module:** Goods Receipts (GRNs) directly inject new Lots into the Inventory module and trigger MAC recalculations.
*   **Production Module:** Consumes RM and Packaging Lots (decreasing stock); outputs WIP and FG Lots (increasing stock).
*   **Sales Module:** Dispatches Finished Goods (decreasing stock).
*   **Quality Module:** Toggles the `Status` of Lots (Pending, Approved, Quarantined, Rejected).
*   **Accounting Module:** Subscribes to stock movements (Receipts, Dispatches, Adjustments, Scrap) to generate General Ledger entries.

---

## 8. Exceptions & Edge Cases

*   **Exception - Ghost Stock:** A scanner fails, and stock is physically moved but not systematically moved. When an operator tries to pick it from the old bin, the system throws a `BinEmptyException`. Triggers an expedited Cycle Count task.
*   **Exception - Mixed Lots:** Operators accidentally pour two different lots of raw sesame into the same physical hopper. The system must support merging lot lineages or averaging expiry dates for the resulting WIP, though standard operating procedures should forbid this.
*   **Exception - Unit of Measure Rounding:** Floating-point arithmetic errors when converting Tons to Grams. The system must use high-precision decimal types (not floats) to prevent losing fractions of a cent or gram over millions of transactions.

---

## 9. Reporting, Audit, and Notifications

### 9.1 Reporting
*   **Inventory Aging Report:** Highlights lots approaching expiration.
*   **Stock Valuation Report:** A snapshot of the total financial worth of the warehouse at midnight on the last day of the month.
*   **Traceability / Recall Report:** (Forward) Enter a Raw Material Lot -> See all finished goods that contain it and which customers received them. (Backward) Enter a Finished Good Lot -> See every raw material lot used to make it.

### 9.2 Audit Logging
*   Every manual Stock Adjustment, Cycle Count variance approval, and Quarantine override is logged with the User UUID, Timestamp, and Reason Code.

### 9.3 Notifications
*   **Low Stock Alert:** Dispatched to Purchasing when ATP drops below Minimum Stock.
*   **Expiry Warning:** Dispatched to Warehouse Manager and QC 30 days before a Lot expires.
*   **Significant Variance Alert:** Dispatched to Factory Manager if a Cycle Count reveals a discrepancy exceeding a configured financial threshold (e.g., missing stock > $1,000).
