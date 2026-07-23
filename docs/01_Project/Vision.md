# KIYAN Factory ERP
## Project Vision & Master Software Blueprint

**Date:** July 2026
**Industry:** Food Manufacturing
**Facility:** KIYAN
**Core Products:** White Sesame Tahini, Roasted Sesame, Sesame Paste

---

### 1. Executive Summary
KIYAN Factory ERP is a purpose-built, enterprise-grade Manufacturing Execution and Resource Planning system designed exclusively for KIYAN's food manufacturing operations. Specializing in sesame-based products, the system provides a highly resilient, offline-first digital backbone for the entire factory. It eliminates data silos, digitizes paper-based processes, and provides an immutable source of truth for production, inventory, and financials.

### 2. Business Goals
*   **Total Traceability:** Achieve 100% digital traceability from raw sesame seed intake to finished tahini dispatch to ensure food safety.
*   **Operational Efficiency:** Minimize production bottlenecks, optimize machine utilization, and reduce material waste.
*   **Quality Assurance:** Standardize quality control processes to ensure strict compliance with international food safety regulations.
*   **Unified Data:** Unify disparate departmental data into a single, cohesive source of truth for rapid decision-making.

### 3. Project Objectives
*   Deploy an offline-capable ERP architecture that functions seamlessly during internet outages to prevent factory downtime.
*   Implement real-time, barcode-driven inventory tracking for raw materials, work-in-progress (WIP), and finished goods.
*   Automate the generation of production orders, routing, and bill of materials (BOM) calculations.
*   Provide executive management with real-time dashboards for OEE (Overall Equipment Effectiveness), yield tracking, and financial health.

### 4. Project Scope
The initial scope covers the complete lifecycle of KIYAN's operations across 10 core departments:
1. Production
2. Inventory
3. Warehouses
4. Purchasing
5. Sales
6. Quality Control
7. Packaging
8. Accounting
9. HR
10. Management

### 5. Business Challenges
*   **Harsh Factory Environments:** Dust, heat, and moisture in processing zones (roasting/milling) require resilient hardware and highly accessible software UX.
*   **Network Unreliability:** Potential internet connectivity drops in regional factory zones must not halt production.
*   **Strict Lot Traceability:** Food safety mandates exact tracking (e.g., matching a specific batch of raw Sudanese sesame to a specific jar of White Tahini).
*   **Yield Variability:** Fluctuations in production output based on raw sesame quality, moisture content, and roasting profiles.

### 6. Proposed Solution
A custom-tailored, Modular Offline-First ERP. The system will run on a local edge server within the KIYAN facility, ensuring sub-millisecond latency and total independence from external internet connections. It will utilize secure background synchronization to a cloud replica for remote executive management and disaster recovery.

### 7. Business Workflow
1.  **Procurement:** Supplier evaluation, Purchase Order (PO) creation, and raw sesame receiving.
2.  **Intake & QC:** Weighing, sampling, moisture testing, and approval of raw materials.
3.  **Warehousing:** Bin/pallet allocation and strict FIFO (First-In-First-Out) enforcement.
4.  **Production:** Cleaning -> Hulling -> Roasting -> Cooling -> Milling (Tahini/Paste).
5.  **In-Process QC:** Viscosity, color, temperature, and taste testing at specific routing stages.
6.  **Packaging:** Bottling, labeling, boxing, and palletizing.
7.  **Finished Goods:** Transfer to the dispatch warehouse.
8.  **Sales & Distribution:** Order fulfillment, invoicing, and logistics.

### 8. Main Departments
*   **Production:** Shop floor execution, routing, machine management, and yield logging.
*   **Inventory & Warehouses:** Stock levels, inter-warehouse transfers, physical cycle counts.
*   **Purchasing:** Vendor management, RFQs, and automated reorder points.
*   **Sales:** CRM, sales orders, pricing tiers, and client accounts.
*   **Quality Control (QC):** Testing protocols, quarantine holds, and release authorizations.
*   **Packaging:** Bill of Materials (jars, lids, labels), packing execution tracking.
*   **Accounting:** AP/AR, General Ledger, and dynamic Cost of Goods Sold (COGS).
*   **HR:** Shift scheduling, attendance tracking, payroll inputs, and worker certifications (e.g., hygiene).
*   **Management:** High-level analytics, financial reporting, and workflow approvals.

### 9. High-Level Modules
*   **MRP (Material Requirements Planning):** BOM management, demand forecasting, and automated procurement suggestions.
*   **MES (Manufacturing Execution System):** Work center tracking, downtime logging, and real-time yield calculation.
*   **WMS (Warehouse Management System):** Barcode/QR scanning, lot tracking, and spatial bin management.
*   **QMS (Quality Management System):** CAPA (Corrective and Preventive Actions), non-conformance reports, and lab integrations.
*   **FMS (Financial Management System):** Sub-ledger integration, COGS tracking, and invoicing.
*   **HRIS (Human Resources Information System):** Roster management and role-based access control mapping.

### 10. System Vision
To create an intuitive, bulletproof operating system for the KIYAN factory that operators love to use. The system will fade into the background, replacing clipboards and spreadsheets with fast, touch-friendly interfaces that empower floor workers and provide absolute visibility to stakeholders.

### 11. Future Expansion
*   **IoT & SCADA Integration:** Direct telemetry from roasters and mills (temperature curves, RPM, power usage) for predictive maintenance.
*   **B2B Customer Portal:** Allowing wholesale distributors to place and track orders directly.
*   **Advanced AI Forecasting:** Predicting sesame yield and optimal roasting profiles based on historical intake data and ambient conditions.

### 12. Success Criteria
*   Zero data loss and zero production halts during external network interruptions.
*   End-to-end lot recall report generation in under 60 seconds.
*   Reduction of inventory discrepancies to < 1%.
*   100% adoption by shop floor staff within 30 days of the Phase 1 rollout.

### 13. Risks & Mitigation
*   **Hardware Failures on Edge Server:** Mitigated by local RAID storage, redundant power supplies, and automated cloud backups.
*   **User Resistance on Shop Floor:** Mitigated by highly intuitive, large-target touch UI for operators, requiring minimal typing.
*   **Data Sync Conflicts:** Mitigated by a robust transactional sync log utilizing Last-Write-Wins and deterministic state resolution.

### 14. Assumptions
*   KIYAN will provide a dedicated on-premise server room with UPS (Uninterruptible Power Supply) and environmental controls.
*   The factory floor will have adequate local Wi-Fi (LAN) coverage for tablet and scanner operation.
*   Standardized naming conventions, testing parameters, and manufacturing recipes are already documented and ready for digitization.

### 15. Development Philosophy
*   **Domain-Driven Design (DDD):** Software architecture will directly mirror KIYAN's operational domains (e.g., `ProductionContext`, `QualityContext`, `InventoryContext`).
*   **User-Centric Shop Floor:** The production UI must rely heavily on barcode scans, large buttons, and dropdowns to minimize human error and accommodate workers wearing gloves.
*   **Security by Design:** Strict Role-Based Access Control (RBAC) ensuring operators only see and interact with what they need to execute their specific shift.

### 16. Offline First Strategy
The architecture relies on a **Local Edge Server** model:
*   Factory devices (tablets, PCs, scanners) connect over the Local Area Network (LAN) to an on-premise application server.
*   This on-premise server acts as the primary master database for the facility.
*   A cloud-based replica is maintained via asynchronous, transactional replication for remote management, global reporting, and disaster recovery.
*   If the external internet goes down, the factory LAN ensures the facility operates at 100% capacity without disruption.

### 17. Scalability Strategy
*   **Data Partitioning:** Archiving historical production and QA data annually to maintain active database performance and fast query times.
*   **Stateless Application Tier:** The application services can be scaled horizontally on the local server cluster as concurrent users and IoT endpoints increase.
*   **Event-Driven Architecture:** Decoupling heavy asynchronous processes (like financial ledger posting and cloud syncing) from real-time operational flows (like scanning a barcode).

### 18. High-Level Software Architecture
*   **Presentation Layer:** Progressive Web App (PWA) optimized for tablets on the factory floor and desktop browsers in the back office.
*   **Application Layer:** Modular Monolith architecture (facilitating easy on-prem deployment while maintaining strict, decoupled module boundaries for future microservices extraction if necessary).
*   **Data Layer:** Relational Database (e.g., PostgreSQL) for strict ACID compliance and transactional integrity, with JSON document support for flexible QA testing schemas.
*   **Integration Layer:** RESTful APIs for mobile scanners and future hardware (scales, barcode label printers) integration.

### 19. Core Design Principles
*   **ACID Compliance:** Absolute transactional integrity for all inventory movements and financial postings.
*   **Immutability:** Production logs and QA test results are append-only audit trails. Once committed, data is versioned, not overwritten.
*   **Graceful Degradation:** Non-critical modules (like remote analytics) fail silently without impacting core manufacturing execution.
*   **Simplicity over Cleverness:** Code must be readable, maintainable, and thoroughly documented for long-term enterprise sustainability.

### 20. Project Roadmap
*   **Phase 1 (Months 1-3): Foundation & Inventory.** Master data setup, procurement, raw material warehousing, and basic sales orders.
*   **Phase 2 (Months 4-6): Core Production.** MRP, routing, recipe management (Tahini, Paste, Roasted), and shop floor execution tracking.
*   **Phase 3 (Months 7-8): Quality & Traceability.** In-process QA, lab approvals, quarantine workflows, and end-to-end lot tracing.
*   **Phase 4 (Months 9-10): Financials & HR.** AP/AR, dynamic COGS calculation, attendance, and shift tracking.
*   **Phase 5 (Months 11-12): Cloud Sync & Analytics.** Remote management dashboards, edge-to-cloud sync finalization, and disaster recovery drills.
