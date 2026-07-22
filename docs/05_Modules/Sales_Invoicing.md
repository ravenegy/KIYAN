# Module Specification Document
## Sales and Invoicing Module (Order-to-Cash)
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Headless eCommerce Ready

---

## 1. Objective & Scope
This document outlines the official specification for the Sales and Invoicing Module. Governing the entire Order-to-Cash (O2C) lifecycle, this module converts factory capacity and inventory into realized revenue. It manages quoting, legally binding sales contracts, fulfillment authorization, and the collection of funds. The architecture is explicitly designed with robust APIs to support seamless future integrations with B2B portals and B2C eCommerce platforms.

---

## 2. Feature Specifications

### 2.1 Sales Quotations (Estimates/Proposals)
*   **Purpose:** To provide customers with a non-binding pricing proposal for goods, including estimated delivery dates and terms.
*   **Workflow:** Sales Rep creates Quotation ➔ Selects Customer (Active or Prospect) & Items ➔ Applies discretionary discounts ➔ Sends PDF to Customer ➔ Customer Accepts ➔ Quote converts directly into a Sales Order.
*   **Business Rules:** Quotations do NOT reserve inventory or encumber factory capacity. They are strictly informational until converted.
*   **Validation:** Must possess a strict "Validity Expiry Date" (e.g., valid for 15 days). Expired quotes cannot be converted to orders without re-pricing.
*   **Dependencies:** CRM (Customer Profiles), Product Management (Pricing).
*   **Permissions:** `QUOTE_CREATE`, `QUOTE_VIEW`.
*   **Notifications:** Alert to Sales Rep 48 hours before a high-value Quote expires to prompt follow-up.
*   **Audit Logs:** Logs any manual changes to unit prices made before sending the quote.
*   **Reports:** Quote Pipeline Report, Win/Loss Analysis.
*   **KPIs:** Quote-to-Order Conversion Rate (Win Rate), Quote Turnaround Time.

### 2.2 Sales Orders (SO) & Sales Approval
*   **Purpose:** The central, legally binding contract committing the factory to deliver specific quantities of product by a specific date.
*   **Workflow:** SO generated (from Quote, eCommerce API, or manual entry) ➔ System evaluates Pricing and Credit limits ➔ Route for Approval (if required) ➔ Status: `RELEASED` ➔ Demand pushed to Production/WMS.
*   **Business Rules:** Generating a `RELEASED` Sales Order instantly places a "Reservation" hold on available inventory (ATP decreases) or triggers a Production Planning demand if out of stock.
*   **Validation:** The Customer must have an `ACTIVE` status. The system executes a hard Credit Limit check (Open Orders + Unpaid Invoices + New SO Value $\le$ Credit Limit).
*   **Dependencies:** CRM (Credit Limits), Inventory (Reservations), Production Planning (Demand generation).
*   **Permissions:** `SO_CREATE`, `SO_APPROVE_DISCOUNT`, `SO_OVERRIDE_CREDIT`.
*   **Notifications:** Alert to Production Planning if a massive VIP order drops that requires immediate schedule adjustment.
*   **Audit Logs:** Records the exact ATP (Available to Promise) inventory state at the exact moment the order was placed.
*   **Reports:** Open Order Backlog, Sales by Region/Category.
*   **KPIs:** Order Volume, Average Order Value (AOV).

### 2.3 Tax Calculation & Discounts (Financial Engine)
*   **Purpose:** To dynamically calculate complex, multi-jurisdictional tax liabilities and enforce margin-protective discounting logic.
*   **Workflow:** Items added to SO ➔ Engine evaluates Customer Category and Delivery Address ➔ Applies Custom Price Lists/Discounts ➔ Computes line-item and global Taxes.
*   **Business Rules:** Discounts can be absolute amounts or percentages. The engine strictly enforces a Maximum Margin Erosion threshold (e.g., Sales cannot discount below a 15% gross margin). Export orders to foreign jurisdictions apply zero-rated tax rules based on CRM configuration.
*   **Validation:** Tax IDs on the Customer Profile must be valid to apply zero-rated tax logic.
*   **Dependencies:** CRM (Price Lists, Tax Status), Accounting (Tax Ledgers).
*   **Permissions:** `DISCOUNT_APPLY`, `APPROVE_MARGIN_EROSION`.
*   **Notifications:** Alert to Sales Director if an order is submitted with a discount breaching the standard margin rules.
*   **Audit Logs:** Logs the exact rules engine path used to arrive at the final tax/discount figure.
*   **Reports:** Discount Impact Analysis, Tax Liability Accrual.
*   **KPIs:** Average Gross Margin (%), Effective Tax Rate.

### 2.4 Delivery Notes (Dispatching)
*   **Purpose:** The logistical document (Waybill/Packing Slip) accompanying the physical shipment, signifying the transfer of goods.
*   **Workflow:** WMS Picks and Packs the order ➔ Truck is loaded ➔ Delivery Note Generated ➔ Goods physically leave the facility ➔ Inventory On-Hand is deducted.
*   **Business Rules:** A Delivery Note permanently deducts physical stock. It triggers the recognition of Cost of Goods Sold (COGS) in the Accounting module.
*   **Validation:** Quantities on the Delivery Note MUST perfectly match the physical quantities scanned out by the WMS. Cannot dispatch `QUARANTINED` lots.
*   **Dependencies:** WMS (Dispatch Operations), Inventory (Stock Ledger).
*   **Permissions:** `DELIVERY_NOTE_GENERATE`.
*   **Notifications:** Automated Advance Shipping Notice (ASN) / Email sent to the customer with tracking details.
*   **Audit Logs:** Logs the operator who authorized the truck to depart.
*   **Reports:** Daily Dispatch Log, Proof of Delivery (POD) Tracking.
*   **KPIs:** On-Time In-Full (OTIF) Delivery %, Order Cycle Time (SO Creation to Dispatch).

### 2.5 Invoices & Outstanding Invoices (Accounts Receivable)
*   **Purpose:** The formal request for payment, finalizing the commercial transaction and generating Accounts Receivable (AR) ledgers.
*   **Workflow:** Delivery Note confirmed ➔ System auto-generates Draft Invoice ➔ Finance posts Invoice ➔ Emailed to Customer ➔ Status: `UNPAID` ➔ Tracks aging until settled.
*   **Business Rules:** Invoices are strictly immutable once posted. To correct an error on a posted invoice, a Credit Note must be issued. Invoices can only be generated for quantities that have been physically dispatched (except for explicitly defined Pre-Payment/Proforma scenarios).
*   **Validation:** Invoice totals must exactly match the Delivery Note multiplied by the approved SO pricing.
*   **Dependencies:** Accounting (AR, General Ledger).
*   **Permissions:** `INVOICE_GENERATE`, `INVOICE_POST`.
*   **Notifications:** Automated dunning emails sent to customers at 30, 60, and 90 days past due.
*   **Audit Logs:** Tracks the user who finalized and posted the document.
*   **Reports:** Accounts Receivable Aging (30/60/90+ days), Revenue Recognition.
*   **KPIs:** Days Sales Outstanding (DSO), Invoice Dispute Rate.

### 2.6 Payments
*   **Purpose:** To record the receipt of funds and reconcile outstanding customer debt.
*   **Workflow:** Bank Transfer/Check received ➔ AR Clerk creates Payment Receipt ➔ System matches Payment to specific `UNPAID` Invoice(s) ➔ Invoice Status: `PAID`.
*   **Business Rules:** Overpayments are stored as "Unallocated Customer Credit" to be applied to future invoices. Partial payments transition the invoice to `PARTIALLY_PAID`.
*   **Validation:** Payment Date cannot be in the future.
*   **Dependencies:** Accounting (Cash & Bank Management).
*   **Permissions:** `PAYMENT_ENTRY`.
*   **Notifications:** Alert to Sales Account Manager when a severely overdue account finally clears their balance.
*   **Audit Logs:** Logs the bank transaction reference ID against the internal payment ID.
*   **Reports:** Daily Cash Collection, Customer Payment Allocation.
*   **KPIs:** Collection Effectiveness Index (CEI).

### 2.7 Returns (RMA) & Credit Notes
*   **Purpose:** To manage customer rejections, physical reverse logistics, and the subsequent financial refunds.
*   **Workflow:** Customer reports defect ➔ RMA (Return Merchandise Authorization) created ➔ Goods arrive at Returns Warehouse ➔ QC inspects ➔ Finance issues Credit Note ➔ Credit applied to customer's account or refunded via cash.
*   **Business Rules:** Returned goods are NEVER placed back into `ACTIVE` inventory; they default to `QUARANTINED` pending disposition. A Credit Note reverses the revenue and AR recognized by the original invoice.
*   **Validation:** A Credit Note cannot exceed the monetary value of the original linked Invoice.
*   **Dependencies:** WMS (Returns Receiving), QC (Inspection), Accounting.
*   **Permissions:** `RMA_CREATE`, `CREDIT_NOTE_APPROVE`.
*   **Notifications:** Alert to QC that customer returned goods have arrived at the dock.
*   **Audit Logs:** Full chain of custody linking the Credit Note back to the original FG Lot ID that failed in the field.
*   **Reports:** Return Reason Analysis, Total Credit Notes Issued.
*   **KPIs:** Return Rate (%), Cost of Customer Returns.

### 2.8 Sales Cancellation
*   **Purpose:** To cleanly terminate a commercial transaction before fulfillment is complete, ensuring inventory and financial projections are corrected.
*   **Workflow:** User clicks "Cancel" on a Sales Order ➔ Provides Reason Code (e.g., "Customer Request", "Stock Unavailable") ➔ System cascades cancellation.
*   **Business Rules:** A Sales Order can ONLY be cancelled if no Delivery Note has been generated. If goods have left the building, the Returns (RMA) workflow must be used. Cancelling an order immediately releases the reserved inventory back into ATP (Available to Promise).
*   **Validation:** Requires a mandatory Cancellation Reason Code.
*   **Dependencies:** Inventory (Releases ATP hold).
*   **Permissions:** `SO_CANCEL`.
*   **Notifications:** Alert to Warehouse to abort the picking task.
*   **Audit Logs:** Logs the exact state of the order at the time of cancellation and the user who executed it.
*   **Reports:** Cancelled Orders Summary, Lost Sales Value.
*   **KPIs:** Order Cancellation Rate (%).

---

## 3. Future eCommerce Integration (Architecture Readiness)

To support future Omni-Channel and Direct-to-Consumer (D2C) initiatives (e.g., Shopify, Magento, Custom B2B Portals), the module is built upon a Headless, API-first architecture:

*   **Real-Time ATP Sync:** The system exposes an outbound webhook to push real-time `Available to Promise` inventory levels to the eCommerce storefront, preventing overselling.
*   **Order Ingestion API:** Web orders are pushed directly into the ERP via REST/gRPC endpoints, automatically generating `RELEASED` Sales Orders (if pre-paid online) or `DRAFT` Sales Orders (if pending B2B credit check).
*   **Bi-Directional Status Updates:** As the WMS picks, packs, and dispatches the order, the ERP fires webhooks back to the eCommerce platform to trigger customer-facing "Your Order Has Shipped" emails and update tracking numbers.
*   **Price List Headless Delivery:** B2B portals can query the ERP's Pricing Engine in real-time, ensuring that a logged-in wholesale customer sees their exact contracted pricing without duplicating logic in the web frontend.
