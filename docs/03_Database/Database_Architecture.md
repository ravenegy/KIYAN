# Database Architecture Document
## KIYAN Factory ERP

**Prepared by:** Senior Database Architect
**Date:** July 2026
**Industry:** Food Manufacturing (Sesame & Tahini)
**Facility:** KIYAN

---

## 1. Executive Summary
This document defines the overarching database architecture, design principles, and data management strategies for the KIYAN Factory ERP. As an offline-first enterprise system running on a local edge server, the database must guarantee absolute transactional integrity, rapid response times for shop-floor barcode scanning, and meticulous lot traceability without compromising future scalability or cloud synchronization capabilities.

## 2. Core Database Paradigms

### 2.1 Database Type
*   **Primary Datastore:** Relational Database Management System (RDBMS) - PostgreSQL.
*   **Justification:** An ERP heavily relies on strict relationships, financial ledgers, and inventory tracking where data anomalies are unacceptable. PostgreSQL provides industry-leading ACID compliance. Additionally, its native `JSONB` support allows hybrid storage for dynamic, schema-less data such as changing Quality Control (QC) testing parameters or nested BOM structures without requiring constant DDL (Data Definition Language) changes.

### 2.2 Normalization Strategy
*   **Approach:** 3rd Normal Form (3NF) for all transactional and master data tables to eliminate data redundancy and ensure data integrity.
*   **Denormalization Exceptions:** Controlled denormalization will be applied strictly for read-heavy reporting views (CQRS read models) or historical snapshotting (e.g., stamping the product price on a Sales Order Line Item so it remains unaffected by future price updates).

### 2.3 Primary Keys Strategy
*   **Approach:** UUIDv7 (Universally Unique Identifier version 7).
*   **Justification:** UUIDv7 contains a time-based sorting component, preventing the index fragmentation and slow insertion speeds traditionally associated with UUIDv4 in B-tree indexes. Crucially, using UUIDs ensures absolute global uniqueness, which is mandatory for the future synchronization strategy where edge server records must merge with cloud replicas without primary key collisions. Sequential integers (auto-increment) will NOT be used for primary keys.

### 2.4 Foreign Keys Strategy
*   **Approach:** Strict enforcement at the database level.
*   **Justification:** To guarantee referential integrity, foreign key constraints will be applied across all relational tables. Cascading deletes (`ON DELETE CASCADE`) are generally forbidden except for tight parent-child relationships (e.g., deleting a Purchase Order deletes its Line Items). Otherwise, restrictive constraints (`ON DELETE RESTRICT`) will be used to prevent accidental deletion of referenced master data.

## 3. Data Integrity & Lifecycle

### 3.1 Transaction Strategy
*   **Approach:** Explicit Unit of Work wrapping bounded context operations.
*   **Justification:** Multi-table operations (e.g., a Production Order completion that consumes Raw Material Lots, generates a Finished Good Lot, and posts to the General Ledger) must be wrapped in a strict database transaction. It must completely succeed (Commit) or completely fail (Rollback) to ensure the ERP never enters a partially updated state.

### 3.2 Soft Delete Strategy
*   **Approach:** Standardized `deleted_at` timestamp column on all master data and transactional tables.
*   **Justification:** In an ERP, data is rarely physically deleted due to audit and financial compliance. A non-null `deleted_at` timestamp marks a record as soft-deleted. Application-level ORM filters will automatically exclude these records from standard queries.

### 3.3 Audit Strategy
*   **Approach:** Trigger-based Audit Tables.
*   **Justification:** For compliance with food safety and financial regulations, every change to critical tables (Inventory, Recipes, Financials) will trigger an automatic insertion into a parallel `audit_log` table. This log will capture the table name, record ID, user ID making the change, timestamp, and a JSON payload containing the `before` and `after` state of the record.

### 3.4 History Strategy
*   **Approach:** Temporal / Versioned Tables for Master Data.
*   **Justification:** When a Tahini Recipe (BOM) changes, historical production runs must still reference the exact recipe version used at that time. Master entities subject to structural changes will use a versioning strategy (e.g., `recipe_v1`, `recipe_v2`) rather than overwriting the original record.

### 3.5 Archive Strategy
*   **Approach:** Time-based Partitioning.
*   **Justification:** To maintain fast query speeds as data grows over the years, large append-only tables (like machine telemetry, granular inventory movements, and system logs) will use PostgreSQL table partitioning by date (e.g., monthly or yearly partitions). Older partitions can be moved to slower, cheaper storage or dropped entirely from the edge server once safely archived to the cloud.

## 4. Performance & Availability

### 4.1 Indexing Strategy
*   **Approach:** Targeted B-Tree and GIN Indexing.
*   **Justification:** 
    *   **B-Tree:** Applied to all Foreign Keys, frequently sorted columns (dates, statuses), and exact-match search fields (Barcodes, Lot Numbers, Usernames).
    *   **GIN (Generalized Inverted Index):** Applied to `JSONB` columns (for fast querying of dynamic QC results) and full-text search vectors.
    *   Over-indexing will be avoided to prevent slow insertion speeds during rapid shop-floor manufacturing execution.

### 4.2 Performance Strategy
*   **Approach:** Connection Pooling and CQRS.
*   **Justification:** PgBouncer (or equivalent connection pooler) will be deployed to manage connections from the stateless application servers. Complex analytical queries (e.g., Annual Yield Reports) will utilize database materialized views or asynchronous CQRS read models to avoid locking transactional tables during peak factory shifts.

### 4.3 Search Strategy
*   **Approach:** PostgreSQL Full-Text Search.
*   **Justification:** For standard multi-field searching (e.g., finding a Customer by name, email, or company), native PostgreSQL full-text search will be utilized. It provides excellent performance without the operational complexity of deploying a separate search engine like Elasticsearch on the edge server.

### 4.4 Concurrency Strategy
*   **Approach:** Optimistic Concurrency Control (OCC).
*   **Justification:** To handle multiple users modifying the same record (e.g., two warehouse workers picking from the same bin), tables will include a `version` integer column. The ORM will automatically check this version upon update. If a collision is detected, the transaction is aborted, and the user is prompted to refresh, preventing lost updates without utilizing restrictive database row locks (Pessimistic Concurrency) that could cause deadlocks.

## 5. Offline & Synchronization Architecture

### 5.1 Offline Strategy
*   **Approach:** Edge as Master.
*   **Justification:** The database residing on the local KIYAN facility edge server is the definitive Master Database. It does not rely on a cloud connection for authorization, validation, or transactional commitment. Factory operations remain completely unhindered during WAN outages.

### 5.2 Future Synchronization Strategy
*   **Approach:** Transactional Outbox Pattern to Cloud Replica.
*   **Justification:** To support remote management dashboards, the edge database will synchronize state to a Cloud PostgreSQL replica.
    1.  Every local transaction that modifies state will also insert an event record into an `outbox` table within the same transaction.
    2.  A separate, resilient background worker will read this `outbox` table and push the events to the cloud via HTTPS.
    3.  Because UUIDv7 is used for primary keys across the entire system, records can be safely inserted into the cloud replica without ID collision.
    4.  The sync is strictly one-way (Edge -> Cloud) for factory operational data, simplifying conflict resolution (Local Edge always wins). Configuration data flowing Cloud -> Edge will use distinct conflict resolution protocols.
