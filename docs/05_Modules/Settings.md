# Module Specification Document
## Settings & Configuration Module
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Multi-Branch, Strictly Governed

---

## 1. Objective & Scope
This document outlines the official specification for the Settings & Configuration Module. Acting as the central nervous system of the ERP, this module dictates global behaviors, regional compliance standards, numbering sequences, and security parameters. It is highly restricted, ensuring that only authorized administrators can modify the foundational rules that govern the manufacturing, financial, and logistical modules.

---

## 2. Organization & Core Definitions

### 2.1 Company Profile
*   **Purpose:** Defines the primary legal entity operating the ERP.
*   **Business Rules:** The system supports a single primary Company profile per tenant, containing the official Legal Name, Tax Identification Number (TIN), Corporate Registration Number, and the master high-resolution Logo.
*   **Validation:** Tax IDs and Registration Numbers must pass localized checksum/format validations to ensure legal compliance.
*   **Dependencies:** The Printing Engine relies heavily on this data to inject corporate headers and logos into external-facing documents (Invoices, POs).

### 2.2 Factory & Branches
*   **Purpose:** Defines the physical and logistical infrastructure of the enterprise.
*   **Business Rules:** Every transaction, inventory movement, and employee must be logically assigned to a specific Factory or Branch. This enables segregated cost-center reporting.
*   **Validation:** Branch Codes (e.g., `NYC-01`, `LDN-HQ`) must be strictly unique and alphanumeric.
*   **Dependencies:** WMS (Warehouse Management System) bins must map to a physical branch; HR records must map to a working location.

---

## 3. Financial & Operational Standards

### 3.1 Currencies
*   **Purpose:** Defines the Base (Functional) Currency for financial reporting, and active Foreign Currencies for trading.
*   **Business Rules:** The Base Currency is **immutable** once the very first financial Journal Entry is posted to the ledger. Foreign currencies require exchange rates, which must be maintained with effective dates to ensure historical transactions remain accurate.
*   **Validation:** Currency codes must follow standard ISO 4217 (e.g., `USD`, `EUR`, `JPY`).
*   **Dependencies:** Accounting (GL), Sales, Purchasing.

### 3.2 Units of Measure (UoM)
*   **Purpose:** Establishes the physical metrics used to quantify inventory and production yields (e.g., Kilograms, Liters, Pallets, Pieces).
*   **Business Rules:** UoMs are categorized by class (Weight, Volume, Length, Count). Conversion factors must be explicitly defined against a Base Unit (e.g., 1 Box = 12 Pieces). A UoM cannot be deleted or modified if it is actively utilized in an existing Bill of Materials (BOM) or Stock Ledger.
*   **Validation:** Conversion ratios must be $> 0$.
*   **Dependencies:** Inventory, Recipes, Production Orders, Purchasing.

### 3.3 Taxes
*   **Purpose:** Defines VAT, GST, Sales Tax, and Withholding Tax configurations.
*   **Business Rules:** Tax codes must be explicitly mapped to specific General Ledger (GL) Liability/Asset accounts. Tax rates can be date-bound (e.g., "VAT increases to 20% starting Jan 1st").
*   **Validation:** Tax percentages cannot be negative.
*   **Dependencies:** Finance (Chart of Accounts), Sales (Invoicing), Purchasing (Vendor Bills).

---

## 4. System & Localization

### 4.1 Languages
*   **Purpose:** Handles Internationalization (i18n) for the user interface and printed documents.
*   **Business Rules:** The Administrator sets a global default language. Individual users can override this with their personal language preference. External documents (like Purchase Orders) can be configured to print in the specific language assigned to the Supplier's profile.
*   **Dependencies:** User Profiles, Printing Engine, Supplier/Customer CRM data.

### 4.2 Printing Settings
*   **Purpose:** Defines global constraints for physical document generation.
*   **Business Rules:** Sets default paper sizes (A4 vs. Letter), default margins, and fallback fonts for the Printing Engine.
*   **Dependencies:** Printing Engine, PDF Exporter.

### 4.3 Numbering (Document Sequences)
*   **Purpose:** Manages the auto-generation rules for primary keys and document IDs (e.g., `INV-2026-0001`).
*   **Business Rules:** Document sequences are legally binding in many jurisdictions. They must be strictly contiguous without gaps. Once a sequence configuration is actively generating IDs, its prefix and padding cannot be retroactively altered.
*   **Validation:** Prefixes must be unique across the system to prevent a Purchase Order (PO-100) from clashing with a Production Order (PO-100).

### 4.4 Notifications
*   **Purpose:** Configures global routing rules for system alerts.
*   **Business Rules:** Administrators can define whether certain alert classes (e.g., "Machine Breakdown") default to In-App UI, Email, or SMS notification channels.

---

## 5. Security & Access Control

### 5.1 Users
*   **Purpose:** The central directory for creating and deactivating user accounts.
*   **Business Rules:** Users are never permanently deleted from the database to preserve the integrity of the Audit Log; they are only marked as `INACTIVE`. Passwords must adhere to defined entropy requirements (length, special characters, rotation frequency).
*   **Validation:** Email addresses/Usernames must be globally unique.
*   **Dependencies:** Audit Log, HR (Employee Profiles).

### 5.2 Permissions (Roles)
*   **Purpose:** Defines the Role-Based Access Control (RBAC) matrices.
*   **Business Rules:** Follows a strict Default-Deny posture. Administrators configure Roles (e.g., "Warehouse Operator") by assigning specific View/Create/Update/Approve capabilities. The system actively monitors for Toxic Combinations (Segregation of Duties), warning the Admin if a role attempts to combine `CREATE_PAYMENT` and `APPROVE_PAYMENT`.
*   **Dependencies:** Every module in the ERP system.

---

## 6. Future Expansion (Roadmap)

To ensure the ERP integrates seamlessly into broader IT ecosystems, the following settings sub-modules are architected for future deployment:

### 6.1 Email Integration (SMTP/IMAP)
*   **Scope:** Configuration of corporate SMTP servers (e.g., Office365, SendGrid, AWS SES).
*   **Future Use:** Enables the ERP to automatically dispatch Invoices to customers and Purchase Orders to vendors directly from the application layer, complete with DKIM/SPF compliance tracking.

### 6.2 Cloud Sync Configuration
*   **Scope:** Management of edge-node connectivity for the Offline-First architecture.
*   **Future Use:** Allows administrators to define sync intervals, resolve central database conflict strategies, and monitor the queue health of local factory servers synchronizing payloads back to the master Cloud database.

### 6.3 API Keys & Webhooks
*   **Scope:** The developer portal within the ERP.
*   **Future Use:** Allows Admins to generate scoped JWTs/API Keys for third-party integrations (e.g., connecting a BI tool like Tableau or hooking up IoT PLC sensors). Will support the registration of outbound Webhooks to trigger external systems when specific ERP events occur (e.g., pinging a Slack channel when a massive Sales Order is closed).
