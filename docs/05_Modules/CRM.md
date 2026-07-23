# Module Specification Document
## Customer Relationship Management (CRM) Module
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, B2B/B2C Ready

---

## 1. Objective & Scope
This document outlines the official specification for the Customer Relationship Management (CRM) Module. Acting as the commercial heart of the ERP, this module manages the enterprise's revenue-generating entities. It governs customer onboarding, structural hierarchy (billing vs. shipping locations), pricing strategies, and financial risk mitigation through strict credit limit enforcement. The module provides Sales, Finance, and Fulfillment teams with a 360-degree view of customer health.

---

## 2. Customer Lifecycle

The CRM module tracks customers through a strict, state-machine-driven lifecycle to ensure compliance and proper financial handling:

1.  **PROSPECT (Lead):** A potential customer. Quotes/Estimates can be generated, but legally binding Sales Orders cannot be confirmed.
2.  **ONBOARDING:** Customer has agreed to do business. Finance is actively collecting tax IDs, conducting credit checks, and setting up payment terms.
3.  **ACTIVE:** Fully verified customer. Can place orders, receive shipments, and be invoiced.
4.  **CREDIT HOLD:** System-applied or manual status. Customer has breached their credit limit or has severely overdue invoices. New Sales Orders are blocked from dispatch.
5.  **BLOCKED:** Hard administrative stop (e.g., due to bankruptcy, legal dispute, or severe compliance breach). All commercial activity is frozen.
6.  **ARCHIVED (Inactive):** Customer hasn't placed an order in a defined period (e.g., 2 years). Hidden from active dropdowns to reduce UI clutter but retained for historical reporting.

---

## 3. Feature Specifications

### 3.1 Customer Profiles & Categories
*   **Purpose:** To serve as the Master Data Management (MDM) record for all client identities, demographic data, and categorical segmentations.
*   **Workflow:** Sales creates Prospect Profile ➔ Enters basic data and Category (e.g., `Distributor`, `Wholesale`, `Direct-to-Consumer`) ➔ Submits for Onboarding ➔ Finance adds Tax/Legal details ➔ Profile set to ACTIVE.
*   **Business Rules:** Categorization drives downstream logic (e.g., `Wholesale` customers automatically bypass retail VAT logic depending on jurisdiction).
*   **Validation Rules:** Tax ID / VAT Number must be unique across the system. Legal Company Name cannot be empty.
*   **Dependencies:** Core Master Data.
*   **Permissions:** `CUSTOMER_CREATE`, `CUSTOMER_EDIT`, `CUSTOMER_VIEW`.
*   **Notifications:** Alert to Finance when a new B2B profile is submitted for credit review.
*   **Reports:** Customer Master Directory, Revenue Concentration by Category.
*   **Audit Logs:** Strict tracking of changes to Legal Name, Tax ID, or Category mapping.

### 3.2 Addresses, Contacts & Delivery Locations
*   **Purpose:** To map the physical reality of the customer's enterprise, separating financial billing destinations from physical fulfillment nodes.
*   **Workflow:** User adds a Primary Contact ➔ Defines a `Billing Address` ➔ Defines one or multiple `Delivery Locations` (Shipping Addresses).
*   **Business Rules:** A customer MUST have exactly one designated `Billing Address`. A customer can have infinite `Delivery Locations`. Sales Orders must explicitly select a Delivery Location.
*   **Validation Rules:** Addresses must contain valid ISO Country and Postal Codes for future logistics API integrations.
*   **Dependencies:** Sales Module (Order Routing), Logistics (Freight Calculations).
*   **Permissions:** `CUSTOMER_CONTACT_MANAGE`.
*   **Notifications:** Alert to Sales Account Manager if a primary contact bounces an email.
*   **Reports:** Delivery Location Geographic Heatmap.
*   **Audit Logs:** Logs when a new delivery location is added or a primary contact is changed.

### 3.3 Credit Limit & Outstanding Balance
*   **Purpose:** To protect the factory's cash flow by mitigating financial exposure and preventing runaway bad debt.
*   **Workflow:** Finance conducts credit check ➔ Sets a Maximum Credit Limit in the Profile ➔ System continuously calculates (Open Orders + Unpaid Invoices) = Outstanding Balance ➔ Blocks new orders if Balance > Limit.
*   **Business Rules:** 
    *   *Hard Block:* Order cannot be saved if it breaches the limit.
    *   *Soft Block:* Order is saved but placed on `CREDIT HOLD`, preventing WMS dispatch until Finance overrides or the customer pays down their balance.
*   **Validation Rules:** Credit Limits can only be modified by authorized financial controllers, never by Sales.
*   **Dependencies:** Accounting (AR Ledger), Sales (Open Orders).
*   **Permissions:** `CREDIT_LIMIT_MANAGE`, `OVERRIDE_CREDIT_HOLD`.
*   **Notifications:** Immediate alert to Sales Rep and Customer (optional) when their Outstanding Balance reaches 90% of their Credit Limit.
*   **Reports:** Accounts Receivable Aging Report, Credit Exposure vs. Limit Variance.
*   **Audit Logs:** Highly scrutinized log of any changes to the Credit Limit amount and who authorized it.

### 3.4 Customer Price Lists & Discounts
*   **Purpose:** To manage complex B2B commercial agreements, enabling tiered pricing, volume discounts, and customer-specific product catalogs.
*   **Workflow:** Sales Manager defines a Custom Price List (e.g., `Tier 1 Distributor Pricing`) ➔ Assigns it to the Customer Profile ➔ Defines global or line-item Discount % matrices.
*   **Business Rules:** When a Sales Order is created, the system first checks for a Customer-Specific Price List. If absent, it falls back to the Product Master's Default MSRP.
*   **Validation Rules:** Discount percentages cannot exceed the Maximum Allowable Margin Erosion defined by Finance. Price lists must have effective Start/End dates.
*   **Dependencies:** Product Management (Base Pricing), Sales (Order Generation).
*   **Permissions:** `PRICE_LIST_MANAGE`, `DISCOUNT_APPROVE`.
*   **Notifications:** Alert to Sales 30 days before a customized Price List contract expires.
*   **Reports:** Customer Profitability Analysis, Discount/Margin Erosion Impact.
*   **Audit Logs:** Logs any manual overrides to standard pricing applied at the customer profile level.

### 3.5 Customer Documents & Notes
*   **Purpose:** To store unstructured CRM data, communication history, and binding legal attachments.
*   **Workflow:** Account Executive logs a call summary in Customer Notes ➔ Uploads signed Master Service Agreement (MSA) or Tax Exemption Certificate to Documents.
*   **Business Rules:** Tax exemption documents require an Expiry Date. If the document expires, the system automatically begins applying standard taxes to the customer's orders.
*   **Validation Rules:** Document uploads must conform to allowed MIME types (PDF, JPEG) and size limits.
*   **Dependencies:** File Storage Engine, Accounting (Tax Calculation Engine).
*   **Permissions:** `CRM_NOTE_ADD`, `DOCUMENT_UPLOAD`.
*   **Notifications:** System alert when a Tax Exemption Certificate is 15 days from expiration.
*   **Reports:** Expiring Customer Contracts Register.
*   **Audit Logs:** Immutably logs all document uploads and deletions. Note edits are version-controlled.

### 3.6 Sales History & Status Management
*   **Purpose:** To provide a real-time, 360-degree view of commercial performance and relationship standing.
*   **Workflow (Sales History):** System dynamically queries all historical Sales Orders, Dispatches, and Returns tied to the customer ID for visualization on the profile dashboard.
*   **Workflow (Status Change):** Administrator selects New Status (e.g., `ACTIVE` to `BLOCKED`) ➔ Submits mandatory Reason Code ➔ System immediately cascades restrictions.
*   **Business Rules:** A customer cannot be archived if they have an active outstanding balance > $0.00.
*   **Validation Rules:** Status changes to `BLOCKED` or `CREDIT HOLD` require an explanatory note.
*   **Dependencies:** Sales (Order History), Warehouse (Dispatch History).
*   **Permissions:** `CUSTOMER_STATUS_CHANGE`.
*   **Notifications:** High-priority alert to the Executive Team if a Top-10 (by revenue) customer is placed on `BLOCKED` status.
*   **Reports:** Customer Lifetime Value (CLV), Churn Risk Report, Order Frequency Analysis.
*   **Audit Logs:** Logs the exact timestamp, user, and justification for any status transition.

---

## 4. Future CRM Features (Roadmap)

To ensure KIYAN ERP scales with the enterprise's commercial ambitions, the following capabilities are designed into the architectural roadmap:

*   **B2B Customer Portal:** A headless web application allowing `ACTIVE` customers to log in, view their custom price lists, place orders directly, download previous invoices, and track live shipment statuses without requiring a sales rep.
*   **AI Churn Prediction:** Machine Learning models that analyze Order Frequency and Sales History to flag `ACTIVE` customers who show purchasing patterns indicative of moving to a competitor.
*   **Salesforce / HubSpot Integration:** Bi-directional API hooks (Webhooks/REST) to sync "Prospects" from dedicated marketing platforms directly into the ERP as they transition to "Onboarding", preventing dual data entry.
*   **Dynamic Credit Scoring:** Integration with third-party financial credit bureaus (e.g., Dun & Bradstreet) to dynamically adjust a customer's Credit Limit based on their global financial health, rather than just their ERP ledger history.
*   **Omnichannel Support Ticketing:** Linking customer profiles to post-sale support tickets (RMAs, quality complaints) directly within the CRM view to give Account Executives full visibility before going into contract renegotiations.
