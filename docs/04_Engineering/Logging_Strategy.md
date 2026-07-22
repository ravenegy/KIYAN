# Module Specification Document
## Enterprise Logging Strategy
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Structured JSON Logging, Centralized Log Aggregation

---

## 1. Objective & Scope
This document outlines the official Enterprise Logging Strategy for the KIYAN Factory ERP. In an enterprise manufacturing environment subject to strict regulatory compliance (FDA, ISO, GAAP), logging is not merely a debugging tool—it is a critical system of record. This strategy dictates how telemetry, security events, and system errors are captured, classified, secured, and retained to provide total observability and irrefutable auditability.

---

## 2. Supported Log Categories

To prevent massive "log soup," all telemetry must be strictly categorized into one of the following domains:

### 2.1 Application Logs
*   **Purpose:** To capture standard runtime events, API request/response cycles, and non-fatal operational workflows.
*   **Scope:** HTTP status codes, routing transitions, external API integrations (e.g., eCommerce syncs), and cache invalidation events.

### 2.2 Security Logs
*   **Purpose:** To track all identity-related events and protect the perimeter against unauthorized access or privilege escalation.
*   **Scope:** Successful/failed logins, MFA challenges, JWT token issuances/expirations, RBAC `403 Forbidden` denials, and password resets.

### 2.3 Audit Logs (Business Traceability)
*   **Purpose:** To maintain an immutable ledger of all critical business transactions and Master Data mutations.
*   **Scope:** Create/Update/Delete (CUD) operations on Master Data (Recipes, Customers, Suppliers) and Transactional Data (Journal Entries, Purchase Orders, QC Inspections). Captures the "Who, What, When, and Why."

### 2.4 Database Logs
*   **Purpose:** To monitor the health, integrity, and performance of the persistence layer.
*   **Scope:** Connection pool exhaustion, transaction deadlocks, slow queries (e.g., $> 500ms$), and ORM constraint violations. *Never logs raw returned business data.*

### 2.5 Background Jobs (Asynchronous Tasks)
*   **Purpose:** To track the execution of headless tasks that run outside the standard user request cycle.
*   **Scope:** Nightly MRP (Material Requirements Planning) runs, automated database backups, batch email dispatches (e.g., dunning letters), and month-end depreciation calculations. Captures start time, end time, success state, and failure stack traces.

### 2.6 Performance Logs (APM)
*   **Purpose:** To provide Application Performance Monitoring (APM) metrics to ensure the system meets SLA response times.
*   **Scope:** CPU/Memory utilization spikes, Garbage Collection pauses, API latency percentiles (p95, p99), and payload sizes.

---

## 3. Log Levels & Classification

Every log entry must be tagged with a standardized severity level to enable effective alert routing and filtering.

*   **FATAL:** Catastrophic system failure. The application or a critical subsystem has crashed and cannot recover (e.g., Database connection completely severed). Triggers immediately waking DevOps.
*   **ERROR:** A specific operation failed, but the system is still running (e.g., 500 Internal Server Error on a specific API route, eCommerce webhook failed).
*   **WARN:** An anomalous event occurred that did not halt execution but requires attention (e.g., 404 Not Found spikes, slow DB query detected, Background Job took 3x longer than normal).
*   **INFO:** Standard operational milestones (e.g., System started, User logged in, Nightly backup completed).
*   **DEBUG:** Detailed information useful for IT support diagnosing an issue in a production environment (e.g., step-by-step evaluation of a complex tax calculation engine).
*   **TRACE:** Deep algorithmic tracking, memory state dumps. Only enabled in local development or specific staging environments.

---

## 4. Operational Capabilities

### 4.1 Search & Filtering
*   **Structured Logging:** All logs are output as structured JSON objects, never as plain text strings. This enables deterministic parsing.
*   **Correlation IDs:** Every log entry tied to a user's request contains a `trace_id`. Searching this ID instantly filters the aggregator to show the entire lifecycle of that specific request across the Application, Database, and Security layers.
*   **Faceted Filtering:** IT Administrators can filter the central log dashboard by `Level`, `Category`, `User_UUID`, `Module_Name`, or `Timestamp` range.

### 4.2 Export capabilities
*   **Compliance Exports:** Authorized auditors can export filtered Log segments to immutable formats (PDF, signed CSV) for external regulatory review (e.g., extracting all QC Audit Logs for a specific Batch ID during an FDA inspection).

---

## 5. Log Lifecycle: Retention & Archiving

Storage costs scale rapidly with extensive logging. The ERP implements a tiered retention policy based on log category and compliance requirements.

*   **Hot Storage (Immediate Search & APM):**
    *   All logs are kept in indexed, searchable hot storage (e.g., Elasticsearch/OpenSearch) for **30 days**.
*   **Warm Storage (Investigations):**
    *   Application, Performance, and Background Job logs are moved to lower-cost warm storage for **90 days** before permanent deletion.
*   **Cold Storage & Archiving (Compliance):**
    *   Security, Database, and Audit Logs are shipped to compressed, encrypted Cold Storage (e.g., AWS S3 Glacier) after 30 days.
    *   *Statutory Retention:* Audit logs relating to financial transactions, HR actions, and manufacturing traceability are archived and retained for **7 to 10 years** depending on the operating jurisdiction.

---

## 6. Security & Data Privacy

Logs often inadvertently become a vector for data breaches if not strictly governed.

### 6.1 Data Masking (PII & Credentials)
*   The logging engine employs middleware that utilizes Regex and key-matching to automatically scrub sensitive data *before* it is written to disk or the log aggregator.
*   **Masked Fields:** Passwords, Authorization Bearer Tokens, Credit Card Numbers, Bank Account details, and specific employee Protected Health Information (PHI). These are replaced with `[REDACTED]`.

### 6.2 Immutability (WORM Storage)
*   Logs are strictly Write-Once-Read-Many (WORM). The logging service only has `APPEND` permissions. Even System Administrators cannot `UPDATE` or `DELETE` log entries, preventing bad actors from covering their tracks after a breach.

### 6.3 Access Control
*   Access to the Centralized Log Management Dashboard is governed by strict RBAC.
    *   *Developers* can view Application and Performance logs.
    *   *Security Officers* can view Security Logs.
    *   *System Administrators* have global viewing rights.
    *   No one has mutation rights.

---
*End of Enterprise Logging Strategy. This architecture ensures the KIYAN ERP is fully observable, highly secure, and rigorously compliant with international manufacturing standards.*
