# Module Specification Document
## Batch and Lot Tracking Module (Traceability & Compliance)
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Food Safety Compliant (FDA/FSMA/ISO 22000)

---

## 1. Objective & Scope
This document outlines the official specification for the Batch and Lot Tracking Module. In food manufacturing and other regulated industries, flawless traceability is not optional; it is a legal mandate. This module acts as the genealogical ledger of the factory, tracking the complete lineage of every material from the moment it is received from a supplier, through all internal physical transformations, to the final customer delivery. It provides the data infrastructure required to execute surgical product recalls within minutes.

---

## 2. Core Concepts

*   **Lot Number:** A unique identifier assigned to a specific quantity of material that shares identical characteristics, origin, and expiration (e.g., 20 tons of Raw Sesame received on Tuesday).
*   **Batch Number:** A unique identifier assigned to a specific manufacturing run (e.g., the output of Production Order #1045). In KIYAN ERP, a Batch generates one or more Finished Good Lots.
*   **Serial Number:** A unique identifier assigned to a *single individual unit*. While less common for bulk food items like Tahini, it is supported for high-value components, capital equipment tracking (Maintenance), or serialized shipping containers (SSCC/Pallet LPNs) for future logistics integrations.

---

## 3. Complete Lifecycle & Traceability

### 3.1 Raw Material Traceability (Intake)
*   **Lifecycle Event:** A truck arrives from a supplier.
*   **System Action:** Upon Goods Receipt, the ERP generates a highly unique internal KIYAN `Lot ID` and binds it permanently to the Supplier's external batch/lot code.
*   **Data Captured:** Supplier ID, Date of Receipt, Receiving Operator, Intake QC Results, Initial Expiry Date, Environmental Conditions.

### 3.2 Production History (Transformation)
*   **Lifecycle Event:** Raw materials are consumed to manufacture Tahini.
*   **System Action:** As operators scan RM Lots into the machine hopper, the system creates immutable "consumed-by" links. 
*   **Data Captured:** Which exact RM Lots (and what quantities) were used, Machine ID, Operator ID, exact timestamps, and atmospheric conditions (if IIoT connected).

### 3.3 Finished Product Traceability (Yield)
*   **Lifecycle Event:** The production run completes and yields finished jars of Tahini.
*   **System Action:** The system generates a new Finished Good (FG) `Lot ID` (the Batch output). This FG Lot permanently inherits the complete lineage of all RM Lots consumed in the previous step.
*   **Data Captured:** Production Order ID, Yield Quantity, Final QC Results, Expiration Date (calculated from production date + shelf life).

### 3.4 Dispatch Traceability (Fulfillment)
*   **Lifecycle Event:** Finished goods are shipped to a B2B customer.
*   **System Action:** Operators scan the FG Lot barcodes as they are loaded onto the truck.
*   **Data Captured:** Customer ID, Sales Order, Dispatch Document, Logistics Provider, Date of Transfer of Ownership.

---

## 4. The Recall Process (Workflow)

A recall is a critical emergency. The module provides a streamlined, high-speed workflow to isolate and retrieve defective products.

1.  **Trigger:** A quality issue is identified (e.g., a customer complains of glass in a jar, or a supplier notifies KIYAN of salmonella in an RM batch).
2.  **Scope Identification (The Trace):**
    *   *If RM is compromised (Forward Trace):* The QC Manager enters the RM Lot ID. The system instantly lists all FG Lots that consumed this RM, their current warehouse locations, and any Customers who have already received them.
    *   *If FG is compromised (Backward Trace):* The QC Manager enters the FG Lot ID. The system lists all RM Lots used to make it, helping identify the root cause (e.g., contaminated sesame, or a shattered jar from a specific packaging lot).
3.  **Global Quarantine (Containment):** With one click, the QC Manager executes a "Trace Quarantine." The system instantly locks all compromised RM and FG Lots globally. WMS operators are physically blocked from picking them; Production is blocked from consuming them.
4.  **Notification & Action:**
    *   Internal alerts are sent to Factory Managers and Warehouse.
    *   The system generates an automated "Recall Notice" report detailing all affected Customers, Sales Orders, and contact information for the Sales team to execute outreach.
5.  **Return & Disposition:** Affected goods are returned to the Returns Warehouse, tracked under the original Lot ID, and ultimately processed for destruction or rework, closing the recall loop.

---

## 5. Feature Specifications

### 5.1 Batch & Lot Creation
*   **Purpose:** To generate cryptographically safe, human-readable identifiers.
*   **Business Rules:** Formats are configurable per product category (e.g., `YYMMDD-SHIFT-MACHINE-SEQ`).
*   **Validation:** Lot numbers must be absolutely unique globally across the entire database lifespan.
*   **Dependencies:** Product Management, Purchasing (for GRN), Production (for Yield).

### 5.2 Expiry Management
*   **Purpose:** Enforcing shelf-life rules to guarantee food safety.
*   **Business Rules:** Expiry dates are calculated automatically upon FG creation based on the Product Master's defined shelf life. The system automatically updates Lot Status to `EXPIRED` at midnight on the expiration date.
*   **Validation:** System hard-blocks the creation of an FG Lot if any consumed RM Lot is already expired.
*   **Dependencies:** Inventory (FEFO Routing).

---

## 6. Business Rules & Validation

### 6.1 Business Rules
*   **BR-TRC-01 (Lineage Immutability):** Once an RM Lot is linked as consumed by an FG Lot, that relationship CANNOT be broken or altered by any user, including the system Owner. It is cryptographically sealed for regulatory audits.
*   **BR-TRC-02 (Mandatory Tracking):** If a Product Master is flagged as "Lot Tracked", no inventory movement, consumption, or dispatch can occur without an explicit Lot ID scan.
*   **BR-TRC-03 (One-Step Forward, One-Step Back):** The minimum compliance standard. The system exceeds this by providing multi-level infinite depth tracing (e.g., tracking a sub-ingredient of a sub-assembly to the final customer).

### 6.2 Validation Rules
*   **Circular Reference Prevention:** A Lot cannot consume itself, nor can it consume a descendant lot.
*   **Quantity Sanity Check:** The total output quantity of an FG Batch cannot wildly exceed the mass balance of the traced input RM Lots.

---

## 7. System Mechanics

### 7.1 Dependencies
*   **Inventory/WMS:** For physical location tracking of the lots.
*   **Quality (QMS):** For applying Quarantine holds and logging inspection results against the Lot.
*   **Sales & Purchasing:** For establishing the outer boundaries of the supply chain (Suppliers and Customers).

### 7.2 Reports
*   **Bi-Directional Traceability Report:** The core regulatory document. Outputs a visual tree (or PDF ledger) of a lot's entire genealogy. Designed to be generated in under 10 seconds during an FDA/ISO mock recall audit.
*   **Expiry Risk Report:** Highlights lots categorized by `< 30 days`, `< 60 days`, etc., to drive discounting or expedited usage.
*   **Yield vs. Trace Variance:** Highlights discrepancies where the tracked inputs don't match the tracked outputs mathematically.

### 7.3 Notifications
*   **Recall Initiated (CRITICAL):** SMS/Push alerts sent to all executive and managerial staff the moment a global trace quarantine is executed.
*   **Expiry Warning:** Automated alerts sent to Warehouse Managers when high-value lots approach expiration.

### 7.4 Audit Logs
*   **Regulatory Audit Trail:** Every status change to a Lot (e.g., Active ➔ Quarantined ➔ Released) is logged with the User ID, Timestamp, and required Justification Code.
*   **Mock Recall Logs:** The system logs whenever a Traceability Report is executed, allowing management to track compliance with mandatory bi-annual "Mock Recall" drills.

---
*End of Batch and Lot Tracking Specification. This module guarantees that KIYAN ERP meets and exceeds the strictest international food safety tracing requirements.*
