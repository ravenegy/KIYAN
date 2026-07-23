# Module Specification Document
## Barcode & QR System (Auto-ID & Data Capture)
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Hardware-Agnostic

---

## 1. Objective & Scope
This document outlines the official specification for the Barcode and QR System (Auto-ID). In a modern manufacturing environment, manual data entry is the primary source of operational friction and critical data corruption. This system bridges the physical and digital worlds, enabling instantaneous, error-free data capture across the entire factory floor—from the receiving dock to the production line and out to the shipping bays.

---

## 2. Supported Entities & Symbology

The system dictates specific symbologies (1D vs. 2D) based on the data density required by the physical entity.

### 2.1 1D Barcodes (Code 128)
Used for simple, alphanumeric primary keys where data density is low and older laser scanners are prevalent.
*   **Employees:** Printed on physical ID badges for rapid time-clock punching and MES (Manufacturing Execution System) login.
*   **Products & Raw Materials:** Standard SKU identification (e.g., UPC/EAN mapping) for general cataloging.
*   **Locations (Warehouses/Bins):** Affixed to warehouse racks, aisles, and specific bin locations to validate put-away and picking tasks.
*   **Assets:** Affixed to machinery, forklifts, and IT hardware for rapid maintenance ticket creation and fixed asset auditing.

### 2.2 2D Barcodes (QR Codes & DataMatrix)
Used for high-density, composite data payloads, minimizing the need for the scanner to perform multiple database lookups.
*   **Batches & Lots:** QR codes embed a serialized JSON string containing: `[Item_ID, Lot_Number, Supplier_ID, Expiry_Date, Qty]`. This allows a single scan to validate FEFO (First-Expired, First-Out) compliance instantly.
*   **Production Orders (Travelers):** Printed on the physical traveler document. A single scan on the shop floor loads the entire active Bill of Materials (BOM) and routing instructions onto the operator's MES terminal.

---

## 3. System Workflow & Mechanics

### 3.1 Generation
*   **Dynamic Creation:** Barcodes and QR codes are generated dynamically on the server-side (or client-side via canvas for offline mode) at the exact moment a record is instantiated (e.g., when a Goods Receipt Note generates a new Lot ID).
*   **Composite Payloads:** For QR codes, the system compiles the critical data points into a minified, delimiter-separated payload to keep the QR matrix small and easily scannable by low-resolution cameras.

### 3.2 Printing
*   **Integration:** Relies heavily on the ERP's underlying *Printing Engine*.
*   **Execution:** Capable of outputting raw ZPL (Zebra Programming Language) commands for high-speed industrial thermal printers at the dock, or rendering high-res images on PDF A4 traveler documents.
*   **Auto-Print Rules:** The system supports event-driven printing (e.g., the moment a QA Inspector marks a lot as "Passed", the system automatically commands the nearest thermal printer to spit out a green "APPROVED" QR label).

### 3.3 Scanning & Hardware Interfaces
*   **Keyboard Wedge (USB/Bluetooth):** The ERP UI is designed to accept inputs from standard rugged scanners (e.g., Zebra, Honeywell) acting as keyboard emulators. Input fields are auto-focused to ensure immediate capture.
*   **Camera Integration (PWA):** The ERP's mobile Progressive Web App (PWA) utilizes the HTML5 WebRTC API to turn any standard smartphone or tablet camera into a 2D barcode scanner, eliminating the need for expensive proprietary hardware for lighter tasks.

---

## 4. Validation & Error Prevention

The primary value of Auto-ID is the physical enforcement of digital business rules.

*   **Contextual Scanning:** The UI enforces strict context. If a user is on the "Dispatch Order" screen and scans a Bin Location barcode instead of a Lot barcode, the system instantly rejects the input.
*   **Hard-Stops (Poka-Yoke):** 
    *   *Example 1:* An operator scans a Raw Material Lot to consume it into a mixer. The system reads the embedded Expiry Date. If the date is past, the UI flashes red, emits a loud rejection chime, and physically blocks the consumption transaction.
    *   *Example 2:* An operator scans a Lot that is actively tagged as `QUARANTINED` by QA. The system intercepts the scan and denies the movement.

---

## 5. Security & Integrity

*   **Un-guessable Identifiers:** Serialized IDs generated for Lots and Production Orders use cryptographically secure random suffixes to prevent "guess-scanning" (where an operator manually types sequential numbers to bypass actually walking to the item).
*   **Payload Hashing:** For highly sensitive QR codes (e.g., high-value asset transfers or off-site logistics), the QR payload includes a lightweight HMAC (Hash-based Message Authentication Code) signature. If a malicious actor attempts to print a fake QR code to spoof a system transfer, the ERP will reject the invalid signature upon scan.

---

## 6. Offline Behaviour

Given the spotty Wi-Fi environments common in heavy manufacturing, the Barcode & QR system must function seamlessly offline.

*   **Offline Data Caching:** At the start of a shift, the PWA downloads a cached list of active Bin Locations, Work Orders, and expected Picklist Lots to local `IndexedDB`.
*   **Offline Scanning:** When a worker scans a Lot deep in a Wi-Fi dead zone, the system performs a localized validation check against the cached data.
*   **The Outbox Queue:** If the scan is valid, the physical movement is recorded locally into an "Outbox" queue. The UI provides a successful audio/visual cue. Once the scanner/device reconnects to the network, the outbox payload silently synchronizes with the central database.

---

## 7. Future Hardware Integration (Roadmap)

To push toward "Industry 4.0" and true dark-warehouse automation, the Auto-ID architecture is designed to scale beyond optical scanning:

*   **UHF RFID Integration:** Transitioning from line-of-sight optical scanning to Radio Frequency Identification. Forklifts equipped with RFID antennas will instantly bulk-scan entire pallets of raw materials the moment they cross a loading dock geofence, communicating directly with the ERP's API.
*   **Automated Guided Vehicles (AGVs):** Exposing low-latency REST/gRPC endpoints allowing robotic factory vehicles to report their locational QR-code scans to the ERP's warehouse mapping module in real time.
*   **IoT Smart Scales:** Connecting Bluetooth/Serial weigh-scales to the MES terminal. When an operator scans a partial lot's barcode, the scale automatically injects the exact remaining weight into the ERP form, eliminating manual key-in errors entirely.
