# Software Architecture Document (SAD)
## KIYAN Factory ERP

**Prepared by:** Principal Software Architect
**Date:** July 2026
**Industry:** Food Manufacturing
**Facility:** KIYAN

---

## 1. Architectural Pattern Analysis & Selection

Designing an enterprise ERP for an offline-first manufacturing environment requires balancing strict transactional integrity with deployment simplicity. Below is the analysis of architectural paradigms considered for the KIYAN Factory ERP.

### 1.1 Architectural Paradigms Compared

*   **Layered Architecture:** Organizes code into tiers (Presentation, Business, Data). *Pros:* Simple to understand. *Cons:* Leads to database-driven design where business logic leaks into data access layers, making it rigid and hard to test.
*   **Clean / Hexagonal Architecture (Ports and Adapters):** Puts the Domain (business logic) at the absolute center, agnostic of UI, databases, or frameworks. *Pros:* Highly testable, delays infrastructure decisions, isolates core ERP rules from external dependencies. *Cons:* Higher initial boilerplate.
*   **Domain-Driven Design (DDD):** A modeling approach that aligns software structure with the business domain (e.g., separating "Production" from "Quality"). *Pros:* Perfect for complex business rules like BOMs and yield routing; establishes a Ubiquitous Language. *Cons:* Steep learning curve.
*   **Modular Monolith:** A single deployable application divided internally into strictly isolated bounded contexts. *Pros:* Deployment simplicity (crucial for local edge servers), avoids network latency between modules, strong transactional consistency.
*   **Microservices:** Independent deployable services. *Pros:* Independent scaling and deployment. *Cons:* Introduces distributed system complexities, network unreliability, complex distributed transactions (Sagas), and requires a heavy DevOps presence—unsuitable for a localized, offline factory server.
*   **CQRS (Command Query Responsibility Segregation):** Separates read models from write models. *Pros:* Optimizes heavy manufacturing reporting (Queries) without slowing down fast barcode scans (Commands).
*   **Repository Pattern & Service Layer:** Abstractions to manage data access and orchestrate business use cases. *Pros:* Enables Dependency Injection and testing of the Service Layer without a real database.
*   **Dependency Injection (DI):** Inverts control by passing dependencies into classes. *Pros:* Essential for Hexagonal architecture to swap out real databases for in-memory mocks during testing.
*   **Domain Events:** A mechanism to publish side effects when a domain state changes (e.g., `LotQuarantinedEvent`). *Pros:* Decouples modules (Inventory doesn't need to call Quality directly).

### 1.2 The Selected Architecture
**Selection:** A **Modular Monolith** applying **Hexagonal Architecture** and **Domain-Driven Design (DDD)**, utilizing **CQRS** for complex reporting and **Domain Events** for inter-module communication.

**Justification for an Offline Manufacturing ERP:**
A localized edge server in a harsh factory environment must be robust, easy to deploy, and resilient. Microservices would introduce unacceptable operational overhead and distributed data risks without a dedicated on-site DevOps team. A Modular Monolith provides the logical boundaries and modularity of microservices but deploys as a single robust process. Hexagonal Architecture ensures that KIYAN's unique tahini manufacturing rules (Domain) are never entangled with the specific database or web framework, ensuring longevity.

---

## 2. Overall Architecture

The KIYAN ERP operates on a **Local Edge-First Topology**:
1.  **Client Tier:** Progressive Web Apps (PWAs) running on rugged factory tablets, desktop PCs, and barcode scanners, communicating via the local factory LAN.
2.  **Edge Server Tier (The Modular Monolith):** An on-premise server hosting the ERP application and the master relational database. This guarantees sub-millisecond latency and 100% uptime regardless of internet connectivity.
3.  **Cloud Synchronization Tier:** A transactional outbox processor that asynchronously replicates state changes to a Cloud Replica when the WAN connection is active, enabling remote executive management dashboards.

---

## 3. Project Layers (Hexagonal Structure)

Within each module, the application is strictly divided into concentric layers:

1.  **Domain Layer (Core):** Contains Enterprise Business Rules (Entities, Value Objects, Domain Services, Domain Events). Has zero external dependencies. (e.g., `TahiniRecipe`, `LotTraceabilityRule`).
2.  **Application Layer (Use Cases):** Orchestrates domain objects to execute specific workflows (e.g., `ProduceTahiniBatchUseCase`). Defines Interfaces (Ports) for external systems.
3.  **Infrastructure Layer (Adapters):** Implements the Application Layer's ports. Contains database repositories, event bus publishers, and third-party API clients.
4.  **Presentation Layer (Primary Adapters):** REST/GraphQL Controllers handling HTTP requests, authentication, and input validation before passing DTOs to the Application Layer.

---

## 4. Module Boundaries (Bounded Contexts)

Following DDD, the ERP is divided into strictly isolated modules. A module cannot directly access another module's database tables.

*   **Identity & Access Module:** RBAC, Authentication, User Sessions.
*   **Inventory & WMS Module:** Lots, Bins, Movements, Cycle Counts.
*   **Production & MES Module:** Work Orders, Routing, Recipes, Machine State.
*   **Quality & QMS Module:** Testing Protocols, Quarantines, CoAs.
*   **Procurement Module:** Suppliers, POs, Goods Receipts.
*   **Sales & CRM Module:** Customers, Pricing, Sales Orders, Dispatch.
*   **Finance & Accounting Module:** Sub-ledgers, AP/AR, COGS, Invoicing.

---

## 5. Shared Components (Shared Kernel)

To prevent code duplication, a `Shared Kernel` module contains foundational elements used across all contexts:
*   **Base Domain Primitives:** `AggregateRoot`, `DomainEvent`, `Entity` base classes.
*   **Value Objects:** `Money`, `Weight`, `UnitOfMeasure`, `Barcode`.
*   **Cross-Cutting Concerns:** Audit Logging, Telemetry/Tracing, Exception Formatting, Date/Time providers.

---

## 6. Communication Strategy

*   **Intra-Module (Inside a Bounded Context):** Synchronous, in-process method calls via the Application Service layer. Fast and strongly consistent.
*   **Inter-Module (Between Bounded Contexts):** Asynchronous **Domain Events** published to an In-Memory Event Bus.
    *   *Example:* When the Production Module finishes a batch, it publishes `TahiniBatchCompletedEvent`. The Inventory Module listens to this event to increment stock, and the Finance Module listens to calculate COGS.
*   **Querying Across Modules:** API Composition at the Presentation layer, or leveraging CQRS read-models that subscribe to events to build optimized cross-module views.

---

## 7. Dependency Rules

1.  **Inward Pointing Rule:** Dependencies MUST point inward toward the Domain. The Domain depends on nothing. Application depends on Domain. Infrastructure depends on Application.
2.  **Module Isolation Rule:** Modules may only communicate via public Application Layer Interfaces (Services) or via asynchronous Domain Events. Database-level joins across bounded contexts are strictly forbidden.

---

## 8. Scalability Strategy

*   **Vertical Scaling:** Primary scalability relies on scaling the on-premise Edge Server's CPU and RAM.
*   **Horizontal Scaling:** Because the Application Layer is completely stateless (sessions stored in Redis/DB), the ERP process can be replicated across a local server cluster behind a load balancer if factory concurrent users grow drastically.
*   **CQRS for Reporting:** Heavy end-of-month financial and yield reports will be routed to a read-only database replica to prevent table locks from impacting fast-paced shop floor barcode scanning.

---

## 9. Testing Strategy

*   **Unit Tests (70%):** Targeting the Domain Layer. Testing complex state changes, yield calculations, and quality validation rules in isolation without database connections.
*   **Integration Tests (20%):** Targeting the Infrastructure Layer. Verifying that Repositories correctly map to the database, and that Event Bus adapters properly dispatch events.
*   **End-to-End Tests (10%):** Simulating complete factory workflows (e.g., PO Intake -> Production -> Shipping) via the Presentation layer APIs.

---

## 10. Error Handling Strategy

*   **Domain Exceptions:** The Domain Layer throws descriptive, strongly-typed business errors (e.g., `InsufficientInventoryException`, `QualityHoldViolationException`).
*   **Global Exception Handling:** The Presentation Layer catches these exceptions and maps them to standard HTTP status codes (e.g., 400 Bad Request) with localized, user-friendly error messages for the PWA client.
*   **Dead Letter Queues:** If an asynchronous Domain Event fails to process (e.g., Inventory fails to update after Production), the event is sent to a Dead Letter Queue for manual administrative review to ensure eventual consistency is not lost.

---

## 11. Security Strategy

*   **Edge Network Security:** The ERP server is isolated on a secure Factory VLAN, protected by a hardware firewall.
*   **Authentication & RBAC:** JWT-based stateless authentication. Fine-grained Role-Based Access Control mapped to departments (e.g., `Warehouse_Operator`, `QC_Manager`).
*   **Data Protection:** TLS 1.3 for all LAN/WAN traffic. Transparent Data Encryption (TDE) for the underlying relational database to protect data at rest on the edge server.

---

## 12. Offline Strategy

*   **Master Data:** The local Edge Server acts as the Master Database. It never relies on cloud APIs for core factory execution.
*   **Client Resilience:** The PWA uses Service Workers and IndexedDB to cache UI assets and read-models, ensuring the UI remains snappy even during temporary Wi-Fi drops on the factory floor.
*   **Transactional Outbox Pattern:** Every transaction on the edge server writes a sync record to a local `Outbox` table. A background worker continuously reads this table and synchronizes the data to the Cloud Replica via HTTPS when the WAN is available.

---

## 13. Maintainability & Extensibility Strategy

*   **Documentation via Code:** DDD ensures the code reads like the business process. The ubiquitous language means developers and business analysts use the exact same terminology.
*   **Open/Closed Principle:** By using Domain Events, new functionality can be added without altering existing code. (e.g., To add a new "SMS Notification" feature when a machine breaks, simply add a new listener to the `MachineFailedEvent` without touching the Production module code).
*   **Future Microservices:** Because the Modular Monolith strictly enforces module boundaries and avoids cross-module database joins, any module (e.g., Finance) can be easily extracted into a standalone Microservice in the future if cloud migration or separate scaling is ever required.
