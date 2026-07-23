# Module Specification Document
## Purchasing Management Module (Procurement)
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Multi-Branch Ready

---

## 1. Objective & Scope
This document outlines the official specification for the Purchasing Management Module. This module governs the complete Procure-to-Pay (P2P) lifecycle. It ensures that the factory acquires raw materials, packaging, and services at the right time, at the right price, and at the right quality. The module enforces strict financial controls, segregation of duties, and seamless downstream integration with Inventory, Quality Control, and Accounts Payable.

---

## 2. Multi-Branch Purchasing Architecture (Future Readiness)
The architecture is designed to support both centralized and decentralized procurement models out-of-the-box. Every transactional document (PR, RFQ, PO, GRN) inherently possesses a `Branch ID` and `Target Warehouse ID`. This allows a Central Purchasing Department at Headquarters to negotiate and issue POs, while physical delivery and GRN generation occur at remote factory branches.

---

## 3. Feature Specifications

### 3.1 Purchase Requisitions (Purchase Requests)
*   **Purpose:** To capture internal demands for goods or services from any department across the factory (e.g., Maintenance requesting spare parts, Production requesting raw materials).
*   **Workflow:** User creates PR ➔ Specifies items, target date, and destination warehouse ➔ Submits for approval ➔ Department Head approves ➔ Routes to Purchasing queue. (Alternatively, the MRP engine auto-generates Draft PRs when inventory hits Minimum Stock).
*   **Business Rules:** PRs are internal documents only; they do not encumber external funds or legally bind the company.
*   **Validation Rules:** Requested items must exist in the Product Master (or be clearly marked as Ad-Hoc/One-Off text lines). Requested delivery date must be $\ge$ today.
*   **Approval Rules:** Multi-tier authorization matrix based on the user's department and the estimated monetary value of the request.
*   **Dependencies:** Product Management, Inventory (MRP triggers), HR (Department Hierarchy).
*   **Permissions:** `PR_CREATE`, `PR_APPROVE`.
*   **Notifications:** Alert to Department Head when pending; Alert to Creator when approved/rejected; Alert to Buyers when routed to their queue.
*   **Audit Logs:** Logs quantity or priority modifications made by approvers prior to final sign-off.
*   **Reports:** Open Requisitions by Department, MRP Auto-Generated Demand.
*   **KPIs:** PR Processing Time (Creation to Approval).

### 3.2 Request for Quotation (RFQ) & Supplier Quotations
*   **Purpose:** To solicit competitive bids from multiple vendors to ensure optimal pricing, lead times, and terms.
*   **Workflow:** Buyer consolidates approved PRs ➔ Generates an RFQ document ➔ Selects target Suppliers ➔ Sends RFQ ➔ Suppliers return Quotations ➔ Buyer enters Quotes into ERP.
*   **Business Rules:** RFQs for specific Raw Materials can only be sent to suppliers listed on the Approved Vendor List (AVL) for that material.
*   **Validation Rules:** Quotation validity dates must be strictly enforced; expired quotes cannot be awarded.
*   **Approval Rules:** Standard workflow requires no approval to *send* an RFQ, but does require approval to *award* it (see 3.3 Quotation Comparison).
*   **Dependencies:** Supplier Master Data, Quality Control (AVL verification).
*   **Permissions:** `RFQ_CREATE`, `QUOTE_ENTRY`.
*   **Notifications:** Alert to Buyer when a quote is nearing expiration without action.
*   **Audit Logs:** Immutably records all received bids to prevent retroactive tampering after an award is made.
*   **Reports:** Active RFQ Status, Vendor Bid Participation Rate.
*   **KPIs:** RFQ Turnaround Time (from RFQ issue to Quote receipt).

### 3.3 Quotation Comparison & Awarding
*   **Purpose:** To objectively analyze competing supplier quotes and convert the winning bid into a Purchase Order.
*   **Workflow:** System generates side-by-side comparison matrix (Price, Delivery Date, Payment Terms) ➔ Buyer selects winning Quote ➔ System generates Draft PO ➔ Losing suppliers are marked as `Rejected`.
*   **Business Rules:** The system automatically highlights the lowest Total Landed Cost. 
*   **Validation Rules:** Cannot award multiple suppliers for the exact same PR line item unless explicitly splitting the quantity.
*   **Approval Rules:** If the Buyer selects a winning quote that is *not* the lowest price (e.g., selecting a faster, more expensive vendor), mandatory justification notes and Secondary Manager Approval are required.
*   **Dependencies:** Core Pricing Engine.
*   **Permissions:** `AWARD_QUOTE`, `APPROVE_BID_VARIANCE`.
*   **Notifications:** Automated notification (email hook) to losing suppliers.
*   **Audit Logs:** Records the justification code/text for overriding the lowest-price recommendation.
*   **Reports:** Quote Variance Analysis, Sourcing Savings Report.
*   **KPIs:** Cost Avoidance / Sourcing Savings (%).

### 3.4 Purchase Orders (POs) & Partial Orders
*   **Purpose:** The legally binding external contract issued to a supplier, encumbering company funds.
*   **Workflow:** Draft PO generated (from Quote or PR) ➔ Financial Approval ➔ Status: `RELEASED` ➔ Sent to Supplier ➔ Status: `ACKNOWLEDGED` ➔ Goods begin arriving (Transitions to `PARTIALLY_RECEIVED` or `FULFILLED`).
*   **Business Rules:** Partial shipments are permitted. The PO remains open (`PARTIALLY_RECEIVED`) until the entire quantity is satisfied, or the Buyer manually forces the PO to `CLOSED` (Short-Closed).
*   **Validation Rules:** Total PO value cannot exceed the user's financial authorization limit. Delivery dates must be populated.
*   **Approval Rules:** Strict Financial Authorization Matrix (e.g., Buyer < $10k, Purchasing Manager < $50k, CFO > $50k).
*   **Dependencies:** Accounting (Budget Encumbrance), Inventory.
*   **Permissions:** `PO_CREATE`, `PO_APPROVE`, `PO_SHORT_CLOSE`.
*   **Notifications:** Alert to Warehouse Manager indicating incoming inbound volume for the week.
*   **Audit Logs:** Captures digital signatures of all financial approvers.
*   **Reports:** Open PO Commitments, Vendor Delivery Schedule.
*   **KPIs:** PO Cycle Time (Draft to Released), Purchase Order Value by Category.

### 3.5 Goods Receiving Notes (GRN)
*   **Purpose:** To formally document the physical transfer of custody of goods from the supplier to the factory warehouse.
*   **Workflow:** Delivery Truck arrives ➔ Receiving Clerk scans PO Barcode ➔ Counts goods ➔ Generates GRN ➔ Goods placed in `QUARANTINE` / Staging ➔ System updates PO status.
*   **Business Rules:** Generating a GRN updates physical inventory (increasing On-Hand stock) but does NOT yet authorize payment. Food/chemical items always default to `QUARANTINED` pending QC release.
*   **Validation Rules:** Received quantities are checked against PO limits. The system enforces an Over-Receipt Tolerance (e.g., +5%). Deliveries exceeding this tolerance are hard-blocked at the scanner.
*   **Approval Rules:** Deliveries within tolerance auto-approve. Deliveries exceeding tolerance require a Warehouse Manager override to accept the excess stock.
*   **Dependencies:** Warehouse (WMS), Quality Control (Intake Inspections), Purchasing (PO limits).
*   **Permissions:** `GRN_CREATE`, `GRN_OVERRIDE_TOLERANCE`.
*   **Notifications:** Alert to QC that goods require incoming inspection. Alert to Buyer if a delivery is significantly short.
*   **Audit Logs:** Records exact timestamp, receiving clerk, and any tolerance overrides.
*   **Reports:** Daily Receipts Log, Supplier Delivery Discrepancies.
*   **KPIs:** On-Time In-Full (OTIF) Delivery %, Receiving Dock Cycle Time.

### 3.6 Purchase Invoices (Accounts Payable Matching)
*   **Purpose:** To record the supplier's liability and authorize the release of funds via a strict 3-Way Match process.
*   **Workflow:** Supplier sends Invoice ➔ AP Clerk enters Invoice Data ➔ System attempts 3-Way Match (PO Quantity/Price vs. GRN Quantity vs. Invoice Quantity/Price) ➔ If matched, Invoice is `APPROVED` for payment.
*   **Business Rules:** An invoice cannot be processed for goods that have not yet been received (no prepayments via this standard workflow).
*   **Validation Rules:** Invoice Number must be strictly unique per supplier to prevent double-payment.
*   **Approval Rules:** 3-Way Match = Auto-Approval. Mismatches (e.g., Invoice price is higher than PO price) require AP Manager and Purchasing Manager intervention (Dispute Resolution).
*   **Dependencies:** Accounting (AP Ledger, General Ledger).
*   **Permissions:** `INVOICE_ENTRY`, `APPROVE_PRICE_VARIANCE`.
*   **Notifications:** Alert to Purchasing if a price mismatch is detected.
*   **Audit Logs:** Logs who authorized a payment despite a 3-Way Match failure.
*   **Reports:** Uninvoiced Receipts (Accruals), AP Aging Report, Invoice Discrepancy Log.
*   **KPIs:** 3-Way Match Success Rate (%), Days Payable Outstanding (DPO).

### 3.7 Returns to Supplier (RTV / Debit Memo)
*   **Purpose:** To manage the physical return of defective or excess goods and recover financial value from the vendor.
*   **Workflow:** QC Rejects received goods OR Warehouse identifies excess ➔ RTV Document generated ➔ Goods physically shipped back ➔ System generates a Debit Memo request to Accounting.
*   **Business Rules:** RTVs immediately deduct inventory from the specific Lot ID that failed QC. The corresponding PO line can optionally be reopened to demand a replacement from the supplier.
*   **Validation Rules:** Cannot return a quantity greater than what was historically received on the referenced GRN.
*   **Approval Rules:** Requires both QC authorization (for defective goods) and Purchasing authorization (commercial agreement with vendor).
*   **Dependencies:** Quality Control, Inventory, Accounting.
*   **Permissions:** `RTV_CREATE`, `RTV_APPROVE`.
*   **Notifications:** Alert to Finance to withhold pending payments to this supplier until a Credit Note is received.
*   **Audit Logs:** Complete chain of custody tracing the defective Lot out of the facility.
*   **Reports:** Return to Vendor Register, Supplier Defect/Return Value.
*   **KPIs:** Return Rate per Supplier (%).

### 3.8 Purchase Cancellation
*   **Purpose:** Safely terminating a procurement document before it is fully executed, ensuring budgets and stock projections are corrected.
*   **Workflow:** Authorized user clicks "Cancel" ➔ Selects Reason Code (e.g., "Budget Cut", "Supplier Default") ➔ System cascades the cancellation to related documents.
*   **Business Rules:** 
    *   **PR/RFQ:** Can be cancelled freely.
    *   **PO:** Can be cancelled only if NO GRN has been generated. If partial delivery occurred, the PO must be "Short-Closed," not cancelled.
*   **Validation Rules:** Mandatory Reason Code and justification text.
*   **Approval Rules:** Cancelling a `RELEASED` PO requires the Buyer to confirm they have legally notified the supplier of the cancellation.
*   **Dependencies:** Accounting (Frees encumbered budget limits), Production Planning (Removes incoming stock from ATP projections).
*   **Permissions:** `PO_CANCEL`, `PR_CANCEL`.
*   **Notifications:** Alert to Requesting Department that their PR/PO was terminated. Alert to Warehouse to ignore incoming shipment.
*   **Audit Logs:** Records the exact state of the document at the time of cancellation and the user who pulled the plug.
*   **Reports:** Cancelled Orders Summary, Cancellation Reason Pareto.
*   **KPIs:** PO Cancellation Rate (%).

---
*End of Purchasing Management Module Specification. This design ensures that every dollar spent by the factory is fully authorized, tracked, and verified against physical deliveries.*
