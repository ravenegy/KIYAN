# Module Specification Document
## Warehouse Management System (WMS) Module
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Multi-Branch Ready

---

## 1. Objective & Scope
This document outlines the official specification for the Warehouse Management System (WMS) Module. Designed to support manufacturing facilities scaling from single-site operations to global, multi-branch enterprises, this module governs the physical and logical topology of all storage facilities. It orchestrates the movement, placement, and auditing of inventory, ensuring strict adherence to FEFO/FIFO routing, capacity constraints, and seamless barcode/QR-driven workflows.

---

## 2. Warehouse Structure & Supported Types

The WMS supports a strict spatial hierarchy to map the physical reality of the factory to the digital system:
**Facility (Branch) ➔ Warehouse ➔ Zone ➔ Aisle ➔ Shelf ➔ Bin (Location)**

The system explicitly supports and segregates the following Warehouse Types:
*   **Raw Material Warehouse:** Temperature/humidity-controlled environments for agricultural inputs.
*   **Packaging Warehouse:** Ambient storage for jars, labels, and boxes.
*   **Finished Goods Warehouse:** Final dispatch locations for palletized, ready-to-sell products.
*   **Damaged Goods Warehouse:** Logical or physical isolation for scrapped, expired, or destroyed inventory.
*   **Returns Warehouse:** Segregated intake for customer RMAs, heavily restricted pending QC disposition.
*   **Temporary Warehouse (Staging):** Inbound receiving docks or outbound dispatch bays where goods sit transiently before put-away or loading.

---

## 3. Feature Specifications

### 3.1 Warehouse Topology & Capacity Management
*   **Purpose:** To define the physical layout of the facility, including zones, bins, and their maximum volume/weight capacities, as well as operational status.
*   **Workflow:** An administrator defines a new Warehouse, sections it into Zones (e.g., Allergen, Cold-Storage), and generates Bins. Each Bin is assigned a volumetric limit and a printable Barcode/QR code.
*   **Business Rules:** A Bin can have a status of `ACTIVE`, `FULL`, `MAINTENANCE`, or `LOCKED`.
*   **Validation Rules:** Total Bin capacity cannot be exceeded by incoming stock volume. Bin names/barcodes must be globally unique across the enterprise.
*   **Dependencies:** Shared Kernel (for UOM volumetric calculations).
*   **Security:** Only administrative roles can alter physical topology.
*   **Permissions:** `WMS_MANAGE_TOPOLOGY`
*   **Edge Cases:** Structural changes (e.g., knocking down a rack) while stock currently exists in the system's version of that rack. Stock must be moved before the bin can be deleted.
*   **Audit Requirements:** All structural additions, modifications, or capacity overrides must be logged.
*   **Reporting:** Warehouse Utilization % Report, Empty Bin Map.

### 3.2 Receiving (Inbound Operations)
*   **Purpose:** To ingest incoming deliveries into a Temporary/Staging warehouse before final put-away.
*   **Workflow:** Truck arrives ➔ Receiving Clerk scans PO ➔ Goods unloaded to Staging Zone ➔ System generates internal put-away tasks directing forklift drivers to optimal RM/PM bins.
*   **Business Rules:** Incoming food-grade goods default to a `QUARANTINED` status upon receiving until QC clearance. Put-away algorithms suggest bins based on Zone rules (e.g., Allergen items must go to the Allergen Zone).
*   **Validation Rules:** Received quantities cannot exceed PO limits without authorized tolerance overrides.
*   **Dependencies:** Purchasing Module (POs), Quality Module (for intake protocols).
*   **Security:** Prevents receiving stock against unapproved or closed POs.
*   **Permissions:** `WMS_RECEIVE_GOODS`
*   **Edge Cases:** Arriving goods have unreadable or missing supplier barcodes, requiring emergency in-house QR generation at the dock.
*   **Audit Requirements:** Intake timestamp, receiving user ID, and assigned Staging Bin are logged immutably.
*   **Reporting:** Dock-to-Stock Cycle Time, Inbound Discrepancy Report.

### 3.3 Dispatching (Outbound Operations)
*   **Purpose:** To accurately pick, stage, and load Finished Goods onto outbound transport.
*   **Workflow:** Sales Order released ➔ System generates Pick List routed by optimal walking path ➔ Operator scans bins and items to pick ➔ Items moved to Outbound Staging ➔ Final scan onto truck.
*   **Business Rules:** Picking MUST follow strict FIFO/FEFO algorithms.
*   **Validation Rules:** Dispatch cannot complete if picked quantities do not perfectly match the Sales Order line items.
*   **Dependencies:** Sales Module (Sales Orders), Inventory Module (Stock Availability).
*   **Security:** Pickers cannot arbitrarily substitute lots without Manager override.
*   **Permissions:** `WMS_DISPATCH_GOODS`, `WMS_OVERRIDE_LOT`
*   **Edge Cases:** Last-minute order cancellation while the pallet is sitting in the outbound staging lane.
*   **Audit Requirements:** Log of who picked the item, who loaded the item, and override justifications.
*   **Reporting:** Order Fill Rate, On-Time Dispatch Rate.

### 3.4 Stock Movement & Internal Transfers
*   **Purpose:** Relocating inventory intra-warehouse (Bin to Bin) or inter-warehouse (Facility A to Facility B).
*   **Workflow (Intra):** Scan Source Bin ➔ Scan Lot ➔ Scan Destination Bin ➔ Confirm Quantity.
*   **Workflow (Inter):** Generate Transfer Order ➔ Pick to Transit Vehicle ➔ Status changes to `IN_TRANSIT` ➔ Receive at Destination Warehouse.
*   **Business Rules:** Transfers to Damaged or Returns warehouses immediately freeze the lot's availability for production/sales.
*   **Validation Rules:** Destination Bin must have sufficient capacity.
*   **Dependencies:** Inventory Module (Stock Ledger).
*   **Security:** Prevent unauthorized transfers into highly restricted areas (e.g., transferring unchecked goods directly into the active Production Zone).
*   **Permissions:** `WMS_MOVE_STOCK`, `WMS_TRANSFER_INTER_WAREHOUSE`
*   **Edge Cases:** Transfer vehicle breaks down, leaving stock in `IN_TRANSIT` status indefinitely.
*   **Audit Requirements:** Full chain of custody tracking for every physical movement.
*   **Reporting:** Transfer Lead Times, Frequent Movement Heatmaps.

### 3.5 Reservations & FIFO/FEFO Allocation
*   **Purpose:** Soft-locking inventory for upcoming production or sales to prevent double-booking, and directing operators to pick the correct aging lots.
*   **Workflow:** MRP or Sales Module requests stock ➔ WMS calculates FEFO (First-Expired-First-Out for food) or FIFO (First-In-First-Out for packaging) ➔ System places a `RESERVATION` hold on the optimal Lots.
*   **Business Rules:** FEFO overrides FIFO for perishable items. Quarantined or Damaged goods are excluded from reservation algorithms entirely.
*   **Validation Rules:** Total reserved quantity cannot exceed actual available on-hand stock.
*   **Dependencies:** Inventory Module (Availability), Recipes Module (BOM requirements).
*   **Security:** Logic cannot be bypassed by standard operators to pick "easier to reach" pallets.
*   **Permissions:** `WMS_VIEW_RESERVATIONS`, `WMS_OVERRIDE_ALLOCATION` (Manager only)
*   **Edge Cases:** Customer explicitly demands a specific minimum shelf-life (e.g., > 12 months remaining), forcing the WMS to skip the oldest FEFO lot and reserve a newer one.
*   **Audit Requirements:** Log algorithm decisions and manual manager overrides.
*   **Reporting:** Expiring Stock Risk Report, Allocation Failure Log.

### 3.6 Cycle Counting & Physical Inventory
*   **Purpose:** Ensuring logical system stock perfectly matches physical reality without shutting down the entire warehouse.
*   **Workflow:** System generates random or targeted count tasks (e.g., "Count Aisle B") ➔ Operator performs Blind Count via scanner ➔ System identifies variances ➔ Manager approves adjustment.
*   **Business Rules:** Physical Inventory (Full Wall-to-Wall count) freezes all warehouse movements. Cycle Counting (Continuous) only freezes the specific Bin being counted.
*   **Validation Rules:** Count submissions must be numeric and non-negative.
*   **Dependencies:** Inventory Module (Stock Ledger), Accounting Module (for inventory write-offs).
*   **Security:** Operators performing counts cannot see the system's expected quantity (Blind Count) to prevent pencil-whipping.
*   **Permissions:** `WMS_EXECUTE_COUNT`, `WMS_APPROVE_VARIANCE`
*   **Edge Cases:** Finding a pallet of stock in a bin that the system believes is entirely empty.
*   **Audit Requirements:** Variance justification notes, user IDs for both the counter and the approver.
*   **Reporting:** Inventory Accuracy %, Shrinkage Financial Value.

### 3.7 Barcode & QR Code Engine
*   **Purpose:** Facilitating rapid, error-free scanning operations on the shop floor.
*   **Workflow:** WMS generates unique identifiers for Bins, Pallets (License Plate Numbers - LPNs), and Lots ➔ Sends ZPL commands to thermal printers ➔ Devices scan codes to trigger workflows.
*   **Business Rules:** Standard GS1-128 barcode formats are preferred for outgoing Finished Goods. Internal movements can utilize dense QR codes for LPNs (License Plate Numbers) containing Lot ID, Quantity, and Expiry.
*   **Validation Rules:** Scanned payload must perfectly match expected format to prevent accidental scanning of manufacturer UPCA codes during internal transfer tasks.
*   **Dependencies:** Hardware Integration Layer (Thermal Printers, Handheld Scanners).
*   **Security:** QR codes contain signed hashes to prevent operators from printing forged bin labels.
*   **Permissions:** `WMS_PRINT_LABELS`
*   **Edge Cases:** Scanner hardware failure requires manual keyboard entry fallback, which must trigger a specific audit flag.
*   **Audit Requirements:** Log whenever manual entry is used instead of a scanner.
*   **Reporting:** Scanner Utilization Rate, Manual Entry Exception Report.

---
*End of WMS Specification. This document serves as the architectural foundation for subsequent engineering design.*
