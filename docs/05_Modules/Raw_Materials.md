# Module Specification Document
## Raw Material Management Module
**System:** Generic Manufacturing ERP (KIYAN Factory Profile)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Multi-Industry Ready

---

## 1. Objective & Scope
This document outlines the official specification for the Raw Material (RM) Management Module. Designed to be universally applicable across discrete, process, and hybrid manufacturing industries (from food and beverage to automotive and electronics), this module orchestrates the complete lifecycle of base inputs. It guarantees material traceability, optimizes stock levels, ensures quality compliance before consumption, and establishes the data foundation for future predictive forecasting.

---

## 2. Core Inventory Strategies & Logistics

### 2.1 Routing & Traceability
*   **Lot & Batch Tracking:** Every intake of raw material generates a unique, immutable internal Lot/Batch ID, tethered to the supplier's original batch number. This guarantees full backward traceability in the event of a defect or recall.
*   **FIFO (First-In-First-Out):** Used for non-perishable raw materials (e.g., metals, plastics, base packaging) to ensure steady stock rotation and prevent material degradation over long storage periods.
*   **FEFO (First-Expired-First-Out):** Strictly enforced for perishable or chemical raw materials (e.g., agricultural inputs, adhesives). The system overrides FIFO and physically routes operators to the lot with the nearest expiration date.

### 2.2 Stock Control & Forecasting
*   **Material Reservation & Availability:** Raw materials are logically locked (`Reserved`) when a Production Order is released. `Available to Promise (ATP)` dynamically calculates: *(Total On Hand - Quarantined - Reserved)*. 
*   **Threshold Management:** Enforces `Minimum Stock` (reorder trigger), `Maximum Stock` (capacity limit), and `Safety Stock` (absolute baseline buffer).
*   **Forecasting Ready:** All historical consumption data is logged with strict time-series integrity (timestamp, quantity, environmental conditions, product variant). This ensures seamless future integration with AI/ML predictive forecasting engines (e.g., predicting seasonal sesame demand based on historical peaks).

---

## 3. Feature Specifications

### 3.1 Raw Material Catalog
*   **Purpose:** Defines the master data specific to raw inputs (e.g., physical state, storage prerequisites, handling hazards).
*   **Workflow:** R&D or Procurement creates a new RM profile ➔ Approves parameters ➔ Becomes available for BOMs and POs.
*   **Business Rules:** Inherits base properties from the global Product Management Module but adds RM-specific attributes (e.g., expected yield %, hazardous material flags).
*   **Validation:** Must possess a valid Base Unit of Measure (UOM).
*   **Dependencies:** Product Management Module.
*   **Notifications:** Alert to QC and Warehouse Managers when a new RM is approved for use.
*   **Reports:** Master RM List, RM Where-Used (BOM mapping) Report.
*   **Audit Logs:** Records all changes to RM specifications, UOMs, or handling parameters.

### 3.2 Suppliers & Approved Vendor List (AVL)
*   **Purpose:** Manages the authorized sources of raw materials.
*   **Workflow:** Procurement adds a supplier ➔ QC evaluates sample ➔ Supplier marked as `APPROVED` for specific RM items.
*   **Business Rules:** An RM cannot be purchased from a supplier unless they are on the AVL for that specific material.
*   **Validation:** Supplier Tax ID / Registration must be unique.
*   **Dependencies:** Purchasing Module.
*   **Notifications:** Alert Procurement if a supplier's certification expires.
*   **Reports:** Supplier Quality Scorecard, RM Pricing History per Supplier.
*   **Audit Logs:** Track who approved or revoked a supplier's AVL status.

### 3.3 Receiving (Inbound Intake)
*   **Purpose:** Ingesting physical raw materials from suppliers against a Purchase Order.
*   **Workflow:** Delivery arrives ➔ Clerk scans PO ➔ Weighs/counts goods ➔ Generates Goods Receipt Note (GRN) ➔ System generates internal Lot IDs and barcode labels.
*   **Business Rules:** Received quantities exceeding the PO tolerance limit are automatically rejected or require executive override. All received food/chemical RM defaults to `QUARANTINED` status.
*   **Validation:** Mandatory entry of the Supplier's Batch Number during receipt.
*   **Dependencies:** Purchasing Module (POs), Warehouse Module (Staging Bins).
*   **Notifications:** Notify QC that new RM is awaiting intake inspection.
*   **Reports:** Daily Receiving Log, Supplier Delivery Accuracy Report.
*   **Audit Logs:** Immutable record of receipt time, user, and PO variance overrides.

### 3.4 Inspection & Quality (QC Intake)
*   **Purpose:** Ensuring incoming RM meets strict safety and manufacturing tolerances before entering general inventory.
*   **Workflow:** QC receives alert ➔ Pulls physical sample from Staging ➔ Executes tests (e.g., moisture %, purity) ➔ Enters results ➔ Conditionally Releases or Rejects the Lot.
*   **Business Rules:** RM in `QUARANTINED` status cannot be moved to active bins, reserved, or consumed. Failed lots trigger a Non-Conformance Report (NCR).
*   **Validation:** Test results must conform to the JSONB schema defined in the active QC Protocol for that RM.
*   **Dependencies:** Quality (QMS) Module.
*   **Notifications:** Alert Warehouse to move approved RM from Staging to Storage; Alert Purchasing if RM is rejected.
*   **Reports:** Supplier Defect Rate, RM Quality Trend Analysis.
*   **Audit Logs:** Capture exact test metrics, the inspecting analyst ID, and timestamp.

### 3.5 Storage & Transfer
*   **Purpose:** Put-away of approved RM and intra-facility movement.
*   **Workflow:** Operator scans Staging Bin ➔ Scans RM Lot ➔ Scans Destination Bin (e.g., Silo 1 or Cold Storage) ➔ Confirms transfer.
*   **Business Rules:** Environmental constraints apply (e.g., frozen RM cannot be transferred to ambient bins).
*   **Validation:** Destination bin must have sufficient capacity and compatible zone restrictions.
*   **Dependencies:** Warehouse (WMS) Module.
*   **Notifications:** Alerts if RM sits in Staging beyond a defined time limit.
*   **Reports:** Current RM Stock Location Map, Transfer Lead Times.
*   **Audit Logs:** Every Bin-to-Bin movement is immutably logged with source, destination, lot, and operator.

### 3.6 Consumption (Production Issue)
*   **Purpose:** The physical and logical deduction of RM as it is used in manufacturing.
*   **Workflow:** Production Order Released ➔ RM Reserved ➔ Operator scans RM Lot barcode at the machine hopper ➔ System deducts inventory and links RM Lot to the Work Order.
*   **Business Rules:** Strictly enforces FIFO/FEFO allocation. Operator scanning a non-allocated or expired Lot receives a hard system error.
*   **Validation:** Scanned RM must match the active BOM/Recipe for the Work Order.
*   **Dependencies:** Production (MES) Module, Recipes (BOM) Module.
*   **Notifications:** Low Stock Alert triggered if consumption pushes ATP below Safety Stock.
*   **Reports:** RM Consumption vs. Standard BOM (Variance Report).
*   **Audit Logs:** Log of exact time, machine, operator, and Lot ID consumed.

### 3.7 Waste & Scrap
*   **Purpose:** Accounting for RM lost due to spillage, spoilage, or manufacturing setup errors.
*   **Workflow:** Operator identifies waste ➔ Selects "Log Scrap" on UI ➔ Scans RM Lot ➔ Enters quantity and Reason Code (e.g., "Dropped", "Machine Jam").
*   **Business Rules:** Scrap deducts from active inventory and writes the financial value directly to a COGS/Expense account.
*   **Validation:** Scrap quantity cannot exceed the Lot's current on-hand amount.
*   **Dependencies:** Accounting Module (for financial write-offs), Inventory Module.
*   **Notifications:** High-priority alert to Factory Manager if scrap exceeds a financial threshold in a single shift.
*   **Reports:** Scrap Pareto Chart (by Reason Code, by Machine, by RM).
*   **Audit Logs:** Mandatory logging of the user reporting scrap and the chosen reason code.

### 3.8 Return to Vendor (RTV)
*   **Purpose:** Managing the logistics and financials of sending defective RM back to the supplier.
*   **Workflow:** QC Rejects Lot ➔ Lot moved to Returns Warehouse ➔ RTV Document Generated ➔ RM physically shipped back ➔ Accounting requests Credit Memo.
*   **Business Rules:** Requires cross-departmental authorization (QC, Procurement, Finance). Lot is permanently marked as `RETURNED`.
*   **Validation:** Returned quantity cannot exceed originally received quantity.
*   **Dependencies:** Purchasing Module, Accounting Module (Debit Memos).
*   **Notifications:** Alert Finance to expect a refund/credit from the supplier.
*   **Reports:** RM Return Volume, Supplier RTV Financial Impact.
*   **Audit Logs:** Full lifecycle log of the RTV authorization and physical dispatch.

### 3.9 Expiry Management
*   **Purpose:** Proactively managing perishable RM to prevent usage of degraded materials.
*   **Workflow:** System cron job continuously evaluates Lot Expiry Dates against current date.
*   **Business Rules:** An expired Lot is automatically status-locked (`EXPIRED`) and blocked from production.
*   **Validation:** Expiry date cannot be empty if the RM is flagged as perishable in the Catalog.
*   **Dependencies:** Inventory Module.
*   **Notifications:** 30-Day, 15-Day, and 24-Hour warnings sent to Warehouse and Production Managers for at-risk Lots.
*   **Reports:** RM Aging Report, Expired Stock Financial Write-off Risk.
*   **Audit Logs:** Log automated status changes (Active ➔ Expired) applied by the system.

---
*End of RM Management Specification. This logic ensures the factory operates with minimal waste, absolute traceability, and uninterrupted material flow.*
