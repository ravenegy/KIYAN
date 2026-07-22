# Module Specification Document
## Product Management (Master Data) Module
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Master Data Management (MDM)

---

## 1. Objective & Scope
This document outlines the official specification for the Product Management Module. Acting as the core Master Data Management (MDM) hub, this module defines the exact specifications of every physical and logical item interacting with the ERP. It provides the foundational product catalog utilized by Inventory, Production, Purchasing, Sales, and Accounting modules to ensure data consistency across the enterprise.

---

## 2. Supported Product Types
The system strictly categorizes master records to enforce type-specific business logic:

*   **Raw Materials:** Agricultural or base inputs (e.g., Raw Sesame Seeds). Requires Batch/Lot tracking and Expiry tracking.
*   **Semi-Finished Products (WIP):** Bulk intermediary goods (e.g., Bulk Roasted Sesame, Unpackaged Tahini Paste). Can be linked to a Recipe (BOM).
*   **Finished Products:** Final retail or wholesale items (e.g., 500g Tahini Jar). Requires Recipe links, Lot tracking, and Selling Prices.
*   **Packaging Materials:** Jars, lids, cartons, and labels. Lot tracking applied for safety recall tracing.
*   **Services:** Intangible items used in billing or purchasing (e.g., "Freight Shipping", "Machine Calibration"). No physical inventory tracking.
*   **Consumables:** Operational supplies (e.g., PPE, cleaning chemicals). Excluded from BOMs and COGS, treated as overhead expenses.

---

## 3. Product Attributes & Metadata

### 3.1 Identification & Classification
*   **Product Code:** Internal human-readable identifier (e.g., `RM-SES-001`).
*   **SKU (Stock Keeping Unit):** Standardized, strictly unique alphanumeric code used for tracking.
*   **Barcode (UPC/EAN):** Global standard barcode for retail scanning.
*   **QR Code:** Internal high-density 2D code utilized by the factory WMS for complex LPNs (License Plate Numbers).
*   **Category:** Hierarchical classification (e.g., `Food -> Pastes -> Tahini`).
*   **Brand:** KIYAN proprietary brand or third-party label for white-labeling operations.

### 3.2 Physical Properties
*   **Unit (UOM):** Base unit of measure (e.g., Grams, Liters, Pieces, Pallets).
*   **Weight:** Net and Gross weights (essential for logistics and shipping load planning).
*   **Dimensions:** Length, Width, Height (essential for warehouse bin capacity calculations).

### 3.3 Financial Properties
*   **Cost:** Standard or Expected Cost (actual cost fluctuates dynamically via Moving Average Cost in the Inventory module).
*   **Selling Price:** Default MSRP or Base B2B price. Overridden by Customer Pricing Tiers in the Sales module.
*   **Tax:** Applicable tax class (e.g., Standard VAT, Zero-Rated for basic foods).

### 3.4 Supply Chain & Manufacturing Controls
*   **Batch Tracking & Lot Tracking:** Boolean flags dictating if the system MUST demand a lot number during any physical movement.
*   **Expiry Tracking:** Boolean flag dictating if FEFO (First-Expired-First-Out) logic and shelf-life limits apply.
*   **Recipe Link:** For Semi-Finished and Finished Products, links to the active Version of the Bill of Materials (BOM) in the Recipes Module.

### 3.5 Media, Relations & Associations
*   **Status:** `DRAFT`, `ACTIVE`, `DEPRECATED`, `OBSOLETE`.
*   **Images:** Primary thumbnail and high-resolution galleries.
*   **Attachments:** Safety Data Sheets (SDS), Technical Data Sheets (TDS), or QA/QC tolerance documents.
*   **Alternative Products:** Substitutes allowed by QC if the primary RM/PM is out of stock (e.g., substituting a generic 500g jar for a branded one).
*   **Compatible Products:** For cross-selling in B2B portals (e.g., recommending Halawa along with bulk Tahini orders).

---

## 4. Lifecycle & Workflows

1.  **DRAFT:** A new item is being created by R&D or Procurement. It cannot be purchased, produced, or sold.
2.  **ACTIVE:** Fully approved master data. Visible and usable across all ERP modules.
3.  **DEPRECATED:** The item is being phased out. Existing inventory can be sold or consumed, but NO new Purchase Orders or Production Orders can be generated.
4.  **OBSOLETE:** The item is dead. Completely hidden from active dropdowns and search results, retained purely for historical database integrity.

---

## 5. Business & Validation Rules

### 5.1 Business Rules
*   **BR-PRD-01 (Type Immutability):** Once a product is created and has generated transactions (e.g., an Inventory Movement), its Core Type (e.g., changing from Raw Material to Service) CANNOT be changed to prevent corrupting historical ledgers.
*   **BR-PRD-02 (UOM Lock):** The Base Unit of Measure cannot be changed after initial stock is received. All subsequent packaging variations (e.g., Box of 12) must be defined as unit conversions (1 Box = 12 Pieces).
*   **BR-PRD-03 (Services Exclusion):** Products typed as "Services" bypass all WMS, Inventory, and Quality modules automatically.

### 5.2 Validation Rules
*   **Uniqueness:** SKU and Product Code must be globally unique across the entire database.
*   **Numeric Constraints:** Weight, Dimensions, Cost, and Price cannot be negative.
*   **Expiry Logic:** If "Expiry Tracking" is enabled, "Lot Tracking" MUST also be enabled (an expiry date applies to a specific lot, not a global product).

---

## 6. System Mechanics

### 6.1 Dependencies
*   **Inventory Module:** Uses Products to define Stock Levels and Lots.
*   **Purchasing & Sales Modules:** Uses Products for Line Items on POs and SOs.
*   **Recipes (BOM) Module:** Consumes Products as ingredients and outputs Products as yields.

### 6.2 Search & Filtering Strategy
*   **Search Engine:** PostgreSQL native Full-Text Search (FTS) applied to Product Name, SKU, Code, and Brand. Barcode scanners execute exact-match queries against indexed Barcode/QR fields for sub-100ms retrieval.
*   **Filtering:** Multi-select faceted filtering by Category Tree, Product Type, Status, and Boolean flags (e.g., "Show all ACTIVE Finished Goods that are Lot Tracked").

### 6.3 Import / Export
*   **Import:** Support for CSV/Excel bulk uploads to rapidly seed the database during onboarding. Includes a pre-validation phase that checks for duplicate SKUs or missing mandatory fields before committing the upload.
*   **Export:** CSV/Excel export of the full catalog or filtered views for offline analysis by procurement or finance.

### 6.4 Audit Logging
*   All structural modifications (e.g., changing dimensions, updating default cost, toggling tracking flags) trigger a shadow-table audit log recording the User UUID, Timestamp, and previous vs. new values.
*   Changing a product status (e.g., Active to Deprecated) generates a high-priority audit event.

### 6.5 Reporting
*   **Product Master Catalog:** Clean, printable PDF or Excel catalog.
*   **Missing Data Report:** Highlights products lacking critical operational data (e.g., ACTIVE products missing weight/dimensions, which breaks warehouse capacity planning).
*   **Cost Variance Analysis:** Compares the static Expected Cost against the real-time Moving Average Cost calculated by the Inventory module.

### 6.6 Future Expansion
*   **PIM (Product Information Management) Sync:** Headless API endpoints to push rich media and marketing descriptions directly to a future B2C Shopify or B2B eCommerce portal.
*   **PLM (Product Lifecycle Management) Integration:** Expanding the "DRAFT" status into a full multi-stage R&D approval workflow for new food recipes, including nutritional fact generation and allergen auto-tagging.
*   **Supplier Catalogs:** Linking a single KIYAN Product to multiple Supplier SKUs (e.g., Supplier A calls it `SES-100`, Supplier B calls it `RAW-SES`).
