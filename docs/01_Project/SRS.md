# Software Requirements Specification (SRS)
## KIYAN Factory ERP

**Date:** July 2026
**Industry:** Food Manufacturing (Sesame & Tahini)
**Facility:** KIYAN

---

### 1. Introduction
This Software Requirements Specification (SRS) documents the comprehensive requirements for the KIYAN Factory ERP system. It serves as the official blueprint for the development, testing, and deployment of the enterprise resource planning solution tailored specifically for KIYAN's tahini and sesame manufacturing operations.

### 2. Purpose
The purpose of this document is to define the functional and non-functional requirements of the KIYAN Factory ERP. It establishes a clear, unified understanding among all stakeholders—executive management, factory operators, department heads, and the development team—regarding what the system will do, how it will perform, and the constraints under which it will operate.

### 3. Scope
The KIYAN Factory ERP is an offline-first, modular software system covering the end-to-end manufacturing lifecycle. The scope encompasses 10 core modules: Production, Inventory, Warehouses, Purchasing, Sales, Quality Control, Packaging, Accounting, HR, and Management. It specifically focuses on digital traceability, operational efficiency, quality assurance, and seamless operation during external network outages via local edge servers.

### 4. Product Perspective
The KIYAN Factory ERP acts as the central nervous system for the factory. It operates primarily on a Local Edge Server within the KIYAN facility to guarantee continuous uptime, with a background synchronization mechanism to a cloud environment for remote management and disaster recovery. It replaces disparate legacy systems, spreadsheets, and paper-based tracking, serving as the sole source of truth for all operational data.

### 5. Product Functions
The system provides the following major functions:
*   **Inventory & Warehouse Management:** Real-time tracking of raw materials (Sudanese sesame, etc.), WIP, and finished goods using barcode/QR scanning and exact lot tracing.
*   **Production & MRP:** Automated bill of materials (BOM) management, routing, yield calculation, and downtime logging.
*   **Procurement & Sales:** Purchase order creation, vendor management, sales order processing, and CRM capabilities.
*   **Quality Management (QMS):** Enforcing lab testing protocols, non-conformance quarantine, and release authorizations.
*   **Financials (FMS):** Dynamic Cost of Goods Sold (COGS) tracking, AP/AR, and sub-ledger integration.
*   **Human Resources:** Shift scheduling, attendance tracking, and role-based access control.

### 6. User Classes
*   **Shop Floor Operators:** Interact with touch-optimized interfaces and barcode scanners to log production yields, movements, and downtimes. Require large UX elements and minimal text entry.
*   **Quality Control Analysts:** Enter lab results, approve/reject batches, and manage quarantine holds. Require structured data entry and document attachment capabilities.
*   **Warehouse Staff:** Execute physical inventory movements, cycle counts, and order picking using mobile scanning devices.
*   **Department Managers (Production, HR, Sales, Procurement):** Plan schedules, manage orders, approve workflows, and analyze departmental metrics.
*   **Executive Management:** Access high-level dashboards (OEE, financials, yield) locally or via the cloud replica.
*   **System Administrators:** Manage edge-server health, cloud synchronization, user roles, and backups.

### 7. Operating Environment
*   **Hardware:** Local Edge Server (on-premise) with RAID storage and UPS; ruggedized tablets and barcode scanners on the factory floor; standard desktop PCs in administrative offices.
*   **Network:** Robust local Area Network (LAN) spanning the factory; intermittent WAN (internet) connection.
*   **Software:** Standards-compliant web browsers (Chrome, Edge, Safari) for the Progressive Web App (PWA) client.

### 8. Functional Requirements
*   **FR-01 (Traceability):** The system shall trace any finished good lot back to its constituent raw material lots, and vice versa, within 60 seconds.
*   **FR-02 (Inventory Movements):** The system shall enforce FIFO (First-In-First-Out) rules for all material transfers unless overridden by a user with Manager-level authorization.
*   **FR-03 (Production Execution):** The system shall allow operators to log machine state (running, idle, maintenance) and calculate instantaneous OEE.
*   **FR-04 (Quality Gates):** The system shall prevent the consumption or shipping of any lot marked as 'Quarantined' or 'Pending QA'.
*   **FR-05 (Offline Operation):** The core application shall continue to process local transactions (reads and writes) continuously when the external internet connection is completely severed.
*   **FR-06 (Automated Sync):** The system shall automatically synchronize all local transactions to the cloud replica once WAN connectivity is restored, resolving conflicts via deterministic state rules.

### 9. Non-Functional Requirements
*   **NFR-01 (Response Time):** Local transactions (e.g., barcode scan processing) must complete and update the UI in under 500 milliseconds.
*   **NFR-02 (Data Integrity):** The database shall adhere strictly to ACID properties for all transactional data.
*   **NFR-03 (Auditability):** All state changes to inventory, production, and financials must generate an immutable, timestamped audit log identifying the user.

### 10. Security Requirements
*   **SEC-01 (Authentication):** All users must authenticate via secure credentials. Support for PIN-based rapid login for shop floor operators mapped to specific shifts.
*   **SEC-02 (Authorization):** Strict Role-Based Access Control (RBAC) ensuring users can only view and modify data relevant to their specific department and tier.
*   **SEC-03 (Data Encryption):** Data at rest on the edge server and cloud replica, as well as data in transit over LAN and WAN, must be encrypted using industry-standard protocols (e.g., AES-256, TLS 1.3).

### 11. Performance Requirements
*   **PER-01 (Concurrent Users):** The local edge server must support up to 200 concurrent active users without degradation in the 500ms response time SLA.
*   **PER-02 (Reporting Speed):** End-of-month financial and production yield reports spanning 12 months of historical data must generate in under 10 seconds.

### 12. Reliability Requirements
*   **REL-01 (Data Loss Prevention):** The system shall employ localized RAID redundancy and automated snapshotting to ensure zero data loss in the event of a single drive failure on the edge server.
*   **REL-02 (Fault Tolerance):** Non-critical background processes (e.g., analytical aggregation) failing shall not impact core transactional capabilities.

### 13. Availability
*   **AVA-01 (Uptime SLA):** The local factory application must maintain a 99.99% uptime availability during operational hours.
*   **AVA-02 (Maintenance Windows):** System updates and maintenance shall be conductible without full system shutdowns, utilizing blue-green deployment strategies on the edge server.

### 14. Scalability
*   **SCA-01 (Data Volume):** The system architecture must gracefully handle at least 5 years of accumulated transactional data before requiring active-to-archive partitioning.
*   **SCA-02 (Horizontal Scaling):** The application layer must be designed statelessly to allow horizontal scaling across multiple edge server nodes if facility size increases.

### 15. Maintainability
*   **MNT-01 (Code Quality):** Codebases must follow Domain-Driven Design (DDD) principles and be comprehensively documented.
*   **MNT-02 (Diagnostics):** The system must include a centralized logging module to aggregate application errors, slow queries, and hardware metrics for rapid troubleshooting.

### 16. Usability
*   **USA-01 (Shop Floor UI):** Production and warehouse interfaces must feature touch targets of at least 44x44 pixels and rely heavily on visual cues (colors, large icons) over text.
*   **USA-02 (Accessibility):** The UI must maintain high contrast ratios suitable for environments with glare or poor lighting (e.g., warehouse aisles).
*   **USA-03 (Training Time):** A new shop floor operator must be able to independently execute their standard daily workflows after no more than 2 hours of training.

### 17. Business Constraints
*   **Budget & Resources:** Development and deployment must align with the approved phased roadmap spanning 12 months.
*   **Regulatory Compliance:** The system must strictly adhere to local and international food safety data retention and reporting mandates (e.g., HACCP, ISO 22000).

### 18. Technical Constraints
*   **Technology Stack:** Must utilize modern, open-source or highly standardized enterprise technologies (e.g., React/PWA for frontend, Node/PostgreSQL for backend) to avoid vendor lock-in.
*   **Hardware Compatibility:** The frontend must run efficiently on low-cost, ruggedized Android or Windows tablets.

### 19. Assumptions
*   KIYAN provides and maintains the physical infrastructure (LAN, UPS, server room).
*   All legacy data required for Phase 1 (master item lists, vendor details) will be cleansed and formatted for import prior to deployment.
*   Standard operating procedures (SOPs) for the physical manufacturing process are mature and finalized.

### 20. Acceptance Criteria
*   The system successfully processes a simulated week of full production volume (intake to dispatch) purely offline, followed by a successful cloud synchronization with zero data loss or conflicts.
*   A full forward and backward lot traceability report can be generated accurately within the 60-second SLA.
*   Stakeholder sign-off on user acceptance testing (UAT) for all core modules defined in Phase 1 and 2.

### 21. Future Features
*   **SCADA/IoT Integration:** Direct ingestion of telemetry data from roasting ovens and milling machines for predictive maintenance.
*   **B2B Client Portal:** External-facing web portal for wholesale clients to place orders and track shipment statuses.
*   **AI-Driven Forecasting:** Machine learning algorithms to predict optimal sesame yield and optimize roasting profiles based on historical environmental variables and raw material attributes.
