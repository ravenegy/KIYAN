# Module Specification Document
## Printing Engine & Physical Output Strategy
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Hardware-Agnostic

---

## 1. Objective & Scope
This document outlines the official specification for the Printing Engine. In a manufacturing environment, physical paper and labels are just as critical as digital data. The Printing Engine acts as the translation layer between the ERP's digital records and the physical world. It handles everything from high-fidelity, legally compliant A4 financial documents to high-speed, rugged thermal barcode labels required for warehouse tracking, ensuring precise formatting and reliable hardware execution.

---

## 2. Architecture & Output Modes

To support the vastly different requirements of office printing versus shop-floor labeling, the engine utilizes a dual-path architecture:

### 2.1 The PDF Export Engine (A4 / Document Mode)
*   **Purpose:** To generate immutable, pixel-perfect, branded documents suitable for external distribution or official record-keeping.
*   **Mechanics:** Utilizes a headless server-side rendering engine (or a robust client-side canvas library for offline support). It converts structured HTML/CSS templates injected with ERP data into standardized PDF files.
*   **Usage:** Invoices, Purchase Orders, Management Reports, and Production Travelers.

### 2.2 The Thermal Label Engine (Raw / Raster Mode)
*   **Purpose:** To generate high-speed, continuous-feed labels for inventory tracking and logistics.
*   **Mechanics:** Capable of generating either high-resolution raster images specifically sized for label dimensions (e.g., 4"x6") to be sent to standard OS printer drivers, or compiling raw printer command languages (like ZPL - Zebra Programming Language) for direct-to-device network printing.
*   **Usage:** Lot Barcodes, Shipping Labels, Bin Location QR Codes.

### 2.3 Symbology Generator (Barcodes & QR Codes)
*   **Mechanics:** A dedicated sub-engine that dynamically generates scannable assets.
*   **1D Barcodes (e.g., Code 128):** Used for simple, alphanumeric Lot Numbers or SKU IDs. Ideal for older laser scanners.
*   **2D Barcodes (QR Codes, DataMatrix):** Used for dense data payloads. A single QR code on a shipping label can embed the Delivery Note ID, Customer ID, and a serialized list of contained Lots.

---

## 3. Supported Document Types

### 3.1 Invoices & Purchase Orders (Commercial Documents)
*   **Format:** A4 or US Letter.
*   **Requirements:** Must support multi-page pagination for massive orders, dynamic sub-totaling at the bottom of each page, embedded corporate logos, and strict alignment for tax grids. 

### 3.2 Production Orders (Shop Floor Travelers)
*   **Format:** A4 or A5.
*   **Requirements:** Functions as the physical companion to the MES screen. Must include the Bill of Materials (BOM), routing steps, safety warnings, and blank physical sign-off boxes for QA inspectors who require wet signatures.

### 3.3 Labels (Inventory, Shipping, WIP)
*   **Format:** Variable thermal roll sizes (e.g., 4"x6" shipping, 2"x1" component labels).
*   **Requirements:** Must clearly display the Item Name, Lot Number, Expiry Date (FEFO critical), and a scannable Barcode/QR Code. Fonts must be bold, sans-serif, and highly legible from a distance.

---

## 4. The Template System

To prevent developer bottlenecks every time a business requirement changes, the Printing Engine relies on a dynamic Template System.

### 4.1 Template Design
*   Templates are defined using standard web technologies (HTML/CSS) or a visual WYSIWYG editor within the ERP's settings module.
*   **Data Binding:** Templates utilize a bracketed variable syntax (e.g., `{{ customer.company_name }}`, `{{ invoice.total_tax }}`).

### 4.2 Template Management
*   **Versioning:** When a template is updated, previous versions are archived. Historically printed documents can be regenerated using the template version that was active on their original print date.
*   **Conditional Logic:** Templates support basic rendering logic (e.g., "If `Customer.Country` is 'Export', print 'Zero Rated for VAT' in the footer").

---

## 5. Workflow & Execution

The standard printing workflow is designed to be frictionless for the end-user:

1.  **Trigger:** User clicks the "Print / Export" button on a transactional record (e.g., a GRN).
2.  **Context Resolution:** The engine determines the required format (Label vs. A4) and fetches the active Template for that specific document type.
3.  **Data Hydration:** The ERP securely fetches the transactional data and binds it to the Template placeholders.
4.  **Generation:** The Symbology generator creates any required Barcodes/QR Codes and injects them into the layout.
5.  **Output Delivery:** 
    *   *Browser Mode:* The generated PDF or image is pushed to the browser's native print dialog, allowing the user to select their local/network printer.
    *   *Download Mode:* The file is saved to the user's local disk.

---

## 6. Printer Compatibility

The architecture is explicitly designed to be hardware-agnostic, avoiding vendor lock-in.

*   **Standard Printers (Laser/Inkjet):** 100% compatibility. By relying on the browser's native print dialog and standard PDF generation, any printer that interfaces with Windows/macOS/Linux will function perfectly.
*   **Thermal Label Printers (Zebra, Dymo, Brother, TSC):** Supported via standard OS drivers. The ERP scales the document canvas exactly to the millimetric dimensions of the label roll, ensuring zero clipping or misaligned margins.

---

## 7. Future Expansion (Roadmap)

To support heavy industrial automation, the Printing Engine will expand to include:

*   **Direct IP Printing (Silent Print):** Bypassing the browser's print dialog entirely. The ERP backend will communicate directly with networked factory printers via TCP/IP (Raw Socket/IPP). Example: When a Warehouse Operator scans "Order Picked" on their tablet, the shipping label instantly and silently prints at the loading dock printer.
*   **Bluetooth/Mobile Printing:** Support for wearable or forklift-mounted Bluetooth thermal printers interacting directly with the ERP's mobile/PWA client.
*   **Automated Print Routing:** Rules-engine integration where specific documents automatically route to specific physical locations (e.g., all Hazardous Material handling sheets auto-print at the Safety Officer's desk, regardless of who created the PO).
