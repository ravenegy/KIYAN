# Module Specification Document
## Deployment & Release Strategy Specification
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Containerized, Offline-First, Air-Gap Ready

---

## 1. Objective & Scope
This document outlines the official Deployment and Release Strategy for the KIYAN Factory ERP. Deploying mission-critical software into active manufacturing environments requires absolute precision to avoid halting production lines. This specification defines the standardized procedures for initial provisioning, environment configuration, database bootstrapping, and zero-downtime lifecycle management, fully supporting both air-gapped offline installations and future cloud-connected update pipelines.

---

## 2. First Installation & Provisioning

The initial rollout of the ERP to a factory floor is treated as an immutable, repeatable infrastructure event.

### 2.1 Environment Configuration
*   **Containerized Architecture:** The ERP application, database, and caching layers are bundled as isolated container images. This eliminates "it works on my machine" discrepancies and ensures the exact same binaries tested in QA are deployed to the factory server.
*   **Environment Variables:** All environment-specific configurations (Database Connection Strings, API Secrets, JWT Signing Keys, SMTP settings) are strictly decoupled from the application binary. They are injected at runtime via secure environment configurations, ensuring the codebase contains zero hardcoded secrets.
*   **Hardware Requirements:** The system scales vertically based on factory size. The deployment specifies minimum CPU, RAM, and IOPS requirements to ensure the database can handle high-throughput manufacturing execution events.

### 2.2 Database Initialization
*   **Schema Bootstrapping:** Upon first boot, the system automatically runs the foundational schema definitions, establishing all tables, indexes, and constraints.
*   **Master Data Seeding:** The deployment engine seeds critical, immutable master data required for basic functioning (e.g., ISO Currencies, Base Units of Measure, standard Tax Classes, and default System Roles).
*   **Super-Admin Provisioning:** The initialization script generates the initial `SUPER_ADMIN` credentials, outputting a one-time secure password to the deployment console. The administrator is forced to rotate this password upon first login.

### 2.3 Offline Installation (Air-Gapped Factories)
*   **The Reality:** Many high-security or remote factories operate in strict "Air-Gapped" environments with zero outbound internet access.
*   **The Solution:** The entire deployment payload (Container Images, Migration Scripts, Dependencies) is packaged into a single, self-extracting deployment artifact. This artifact can be transferred to the factory via secure physical media (USB/Hard Drive) or pre-installed on a plug-and-play Hardware Appliance (Edge Server), ensuring zero reliance on public package registries (like NPM or Docker Hub) during installation.

---

## 3. Updates & Schema Migration

ERPs are living systems that require continuous patching, compliance updates, and feature rollouts without disrupting daily operations.

### 3.1 The Update Pipeline
*   **Immutable Releases:** Updates are never applied by hot-patching live code files on the server. A new, immutable container image is pulled/loaded alongside the running version.
*   **Blue/Green Deployment Strategy:** The factory load-balancer directs traffic to the active "Blue" environment. The new "Green" environment is spun up in the background. Once the Green environment passes automated health checks, the load-balancer instantaneously swaps the traffic, resulting in near-zero downtime for shop-floor operators.

### 3.2 Database Migration
*   **Sequential Evolution:** Database schema changes (adding columns, creating new tables) are executed via strict, timestamped migration scripts. 
*   **Atomic Migrations:** Migrations are wrapped in database transactions. If an update script fails halfway through (e.g., due to a data constraint conflict), the entire migration rolls back automatically, preventing the database from entering a corrupted, half-migrated state.
*   **Backward Compatibility:** The application code is designed to be backward compatible with the database schema for at least one version cycle to facilitate smooth rolling updates.

---

## 4. Rollback Strategy

In the event that an update introduces a critical business-logic regression, the system must support rapid reversion.

### 4.1 Application Rollback
*   Because the update utilized a Blue/Green strategy, the previous container image is preserved on the server.
*   To rollback the application layer, the IT Administrator simply issues a rollback command, and the load-balancer instantly repoints traffic back to the original, stable container.

### 4.2 Database Rollback (Pre-Update Snapshots)
*   Database rollbacks are inherently complex due to transactions that may have occurred *after* the update.
*   **Automated Snapshots:** The deployment engine enforces a strict safety protocol: Before any database migration script is allowed to execute, the system automatically triggers a Full Database Backup snapshot.
*   **Execution:** If a catastrophic schema failure occurs, the rollback procedure restores the database to this exact pre-update snapshot. (Note: Any operational data entered during the brief window between the update and the rollback will need to be re-entered, hence the necessity of rapid validation).

---

## 5. Future Expansion: Online Updates (Over-The-Air)

As factory infrastructure modernizes with highly available fiber or 5G connectivity, the deployment architecture will activate its Cloud-Sync capabilities.

### 5.1 Automated Patch Management
*   The local factory edge-server will establish a secure, outbound-only telemetry tunnel to the central KIYAN Cloud Command Center.
*   **Over-The-Air (OTA) Delivery:** When a new stable release or critical security patch is published globally, the factory server will automatically download the encrypted deployment payload in the background during operational hours.
*   **Maintenance Windows:** The actual execution of the update (the Blue/Green swap) is scheduled to automatically trigger during pre-defined factory maintenance windows (e.g., Sunday at 03:00 AM), achieving a completely hands-off, evergreen ERP ecosystem.
*   **Centralized Fleet Monitoring:** IT Executives at Corporate HQ will have a centralized dashboard showing the exact ERP version, uptime, and deployment health of every factory server across the globe.
