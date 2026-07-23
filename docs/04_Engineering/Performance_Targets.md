# Module Specification Document
## Performance & Security Requirements
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, High-Availability, Zero-Trust Security

---

## 1. Objective & Scope
This document defines the strict, measurable engineering Service Level Agreements (SLAs) for the KIYAN Factory ERP. In an industrial context, slow software causes physical supply chain bottlenecks, and insecure software invites catastrophic corporate espionage or ransomware. This specification establishes the exact quantitative thresholds that the engineering and infrastructure teams must achieve and maintain in production.

---

## 2. Performance Engineering Targets

All performance metrics are evaluated at the 95th percentile (p95) under simulated heavy factory load (e.g., 500 concurrent users performing mixed write/read operations).

### 2.1 Application Startup & Load Time
*   **Server Cold Boot:** The backend API container must achieve operational readiness (database connections pooled, caches warmed) in **< 5.0 seconds**.
*   **Client Time-to-Interactive (TTI):** The Single Page Application (SPA) must download, parse, and become fully interactive in **< 1.5 seconds** over a standard factory Wi-Fi connection.

### 2.2 Database Queries & API Latency
*   **Transactional Writes (CRUD):** Standard insert/update operations (e.g., logging a machine yield, updating a CRM profile) must complete in **< 100ms** (network latency excluded).
*   **Data Read (Single Record):** Fetching a specific document by ID (e.g., a Purchase Order) must complete in **< 50ms**.

### 2.3 Search Speed
*   **Quick Search / Type-Ahead:** Indexed prefix matching must return suggestions to the UI in **< 150ms** to guarantee a fluid typing experience.
*   **Global Omnisearch:** Full-text search querying across millions of indexed records spanning all modules must return grouped results in **< 500ms**.

### 2.4 High-Volume Data Rendering (Large Inventory)
*   **Grid Rendering:** When rendering a massive dataset (e.g., an Inventory Ledger containing 50,000+ active lots), the UI must utilize DOM virtualization to guarantee a scroll frame rate of **60 FPS** (Frames Per Second) without stuttering.
*   **Grid Memory:** The browser footprint for navigating this massive dataset must not exceed a DOM memory overhead of **< 50MB**.

### 2.5 Complex Querying (Production History)
*   **Traceability Tree Execution:** Executing a deep, multi-level recursive query—such as a BOM explosion mixed with upstream/downstream Lot Lineage tracing up to 5 levels deep—must complete in **< 2.5 seconds**.

### 2.6 System Resource Utilization
*   **Client Memory Usage:** To prevent tab crashes on low-end shop-floor tablets, the maximum browser heap size for an active, long-running ERP session must be constrained to **< 150MB**.
*   **Server CPU Usage:** Under standard operational load, the API container CPU utilization should idle at **< 10%**. Auto-scaling triggers must aggressively spin up horizontal replicas if sustained CPU usage breaches **70%** for more than 60 seconds.

### 2.7 Offline Performance (PWA)
*   **Offline Queueing:** The time taken to catch a failed network request, serialize the payload, and commit it to the local IndexedDB Outbox must be **< 50ms**, remaining imperceptible to the operator.
*   **Sync Throughput:** Upon network restoration, the background Service Worker must synchronize queued payloads to the master database at a rate of **> 100 transactions per second**, avoiding prolonged data inconsistency.

---

## 3. Security & Governance Targets

The system operates on a Zero-Trust, Default-Deny posture. Security is measured by the strictness of its boundaries and the speed of its auditability.

### 3.1 Encryption Standards
*   **In-Transit:** **100%** of network traffic (Client ➔ Load Balancer ➔ API ➔ Database) must be encrypted using **TLS 1.3**. Non-HTTPS connections must be aggressively dropped.
*   **At-Rest:** **100%** of database volumes, file storage (S3/NAS), and backup artifacts must be encrypted using **AES-256** block-level encryption.
*   **Field-Level Encryption:** Highly sensitive PII (e.g., Employee Bank Details, Executive Salary Rates) must be encrypted at the application layer *before* being written to the database.

### 3.2 Authentication Controls
*   **MFA Enforcement:** Multi-Factor Authentication (TOTP/FIDO2) is **100% mandatory** for all users assigned `ADMIN`, `FINANCE`, or `EXEC` roles.
*   **Session Lifetimes:** 
    *   High-Privilege Office Users: Strict idle timeout of **15 minutes**.
    *   Shop-Floor MES Terminals: Shift-based timeout of **12 hours** (bound strictly to a specific physical IP/MAC address).
*   **Brute-Force Protection:** A maximum of **5** consecutive failed login attempts will result in an automatic **30-minute** account lockout.

### 3.3 Authorization (RBAC)
*   **Zero-Trust Coverage:** **100%** of API endpoints (excluding public `/auth` routes) must require an explicit, cryptographic JWT containing verified role claims.
*   **Resolution Speed:** The middleware that intercepts the request, verifies the JWT signature, and checks the RBAC matrix must execute in **< 10ms**.

### 3.4 Audit & Traceability
*   **Coverage:** **100%** of CUD (Create, Update, Delete) operations on Master and Transactional data must be immutably logged.
*   **Log Shipping Latency:** The time between a business transaction committing and the corresponding Audit Log arriving in the central SIEM/Log Aggregator must be **< 5.0 seconds**.
*   **Immutability:** The central log repository must be configured as WORM (Write-Once-Read-Many) to prevent tampering by compromised administrators.

### 3.5 Backup & Disaster Recovery
*   **RPO (Recovery Point Objective):** The maximum acceptable data loss in the event of catastrophic failure is **15 minutes** (achieved via continuous Incremental WAL archiving).
*   **RTO (Recovery Time Objective):** The time required to restore the entire ERP from bare metal to operational status is **< 4.0 hours**.
*   **Validation:** Automated restore-and-verify sandbox tests must run weekly with a targeted success rate of **100%**.
