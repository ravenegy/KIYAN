# Module Specification Document
## Enterprise Search Engine Specification
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Full-Text Search (FTS), Offline-Capable

---

## 1. Objective & Scope
This document outlines the official specification for the Enterprise Search Engine. In a massive ERP containing millions of records—from granular inventory lots and purchase orders to employee profiles and financial ledgers—search is the primary navigation paradigm for power users. This engine is designed to deliver sub-second, highly relevant results across all modules while strictly respecting the system's Role-Based Access Control (RBAC) perimeter.

---

## 2. Core Search Modalities

### 2.1 Global Search (Omnisearch)
*   **Purpose:** To provide a ubiquitous, frictionless entry point for finding any entity in the ERP without navigating through module menus.
*   **Workflow:** Accessible via a universal keyboard shortcut (`Cmd/Ctrl + K`) or a persistent top-navbar search input.
*   **Behavior:** As the user types, the engine queries across all indexed domains simultaneously. Results are visually grouped by module category (e.g., *Customers*, *Sales Orders*, *Raw Materials*). Clicking a result deep-links the user directly to that specific record.

### 2.2 Quick Search (Type-Ahead)
*   **Purpose:** Context-specific, instant filtering within a currently active module or dropdown menu.
*   **Workflow:** Found at the top of data grids (e.g., the Purchase Order List) or within relational selectors (e.g., selecting a Supplier on a new PO).
*   **Behavior:** Provides instant, debounced type-ahead suggestions. Matches on primary identifiers (IDs, Names, SKUs) rather than deep full-text document contents to ensure zero latency.

### 2.3 Advanced Search
*   **Purpose:** Deep, highly granular data mining within a specific module to answer complex business questions.
*   **Workflow:** Accessed via an "Advanced" toggle next to module search bars.
*   **Behavior:** Supports multi-parameter querying using Boolean logic (AND, OR, NOT). Users can define complex conditionals (e.g., `Status = RELEASED` AND `Delivery_Date < NEXT_WEEK` AND `Margin % > 15`).

---

## 3. Search Usability Features

### 3.1 Filters (Faceted Search)
*   Search results provide dynamic sidebar facets to rapidly narrow down massive datasets.
*   Facets automatically adapt based on the dataset (e.g., searching "Coffee" in the Inventory module will present facets for *Warehouse Location*, *Lot Expiry Date*, and *Quality Status*).

### 3.2 Sorting
*   **Global Search:** Default sorting is strictly by **Relevance** (Lexical matching score + Recency).
*   **Module/Advanced Search:** Default sorting is by **Recency** (Newest first), with options to sort by specific columnar data (e.g., Order Amount Highest-to-Lowest, Alphabetical).

### 3.3 Saved Searches (Custom Views)
*   Users can save complex Advanced Search parameter sets as named "Views".
*   These saved searches appear as quick-access tabs or sidebar links within the module, allowing a Production Manager to instantly pull up their daily "Delayed Orders Awaiting Material" query with one click.

### 3.4 Search History & Predictive Typing
*   **Recent Searches:** Clicking into an empty search bar immediately displays the user's last 5 search queries and last 5 visited records.
*   **Predictive Match:** The engine learns from individual user behavior. If a Warehouse Worker frequently searches for "Pallet", the engine will predict and auto-suggest packaging materials before raw materials.

---

## 4. Architecture & Performance Strategy

To maintain lightning-fast responsiveness under enterprise load, the search architecture employs strict performance boundaries.

### 4.1 Indexing Strategy
*   **Primary Engine:** Utilizes the native Full-Text Search (FTS) capabilities of the primary relational database (e.g., PostgreSQL `tsvector` and `tsquery`).
*   **Index Types:** 
    *   *GIN (Generalized Inverted Index):* Applied to heavily searched text columns (Document Notes, Product Descriptions) for rapid full-text lookups.
    *   *Trigram Indexes (`pg_trgm`):* Applied to primary identifiers (Names, SKUs, Email Addresses) to support highly performant fuzzy matching and typo tolerance (e.g., searching "Jhon" will match "John").
*   **Offline Search:** For the Offline-First PWA client, critical master data (e.g., Item SKUs, active Customer names) is indexed locally within the browser's IndexedDB, allowing instant Quick Search even when the factory Wi-Fi drops.

### 4.2 Performance Limits
*   **Debouncing:** All search inputs implement a strict 300ms debounce. The system will not fire a query to the backend until the user pauses typing, preventing database overload.
*   **Pagination / Lazy Loading:** Global search returns a maximum of 5 results per category. "View All" links push the user to a fully paginated Advanced Search view.
*   **Query Timeouts:** Search queries are hard-capped at 3 seconds. If a poorly structured Advanced Search exceeds this, it is killed, and the user is prompted to refine their filters.

---

## 5. Security & Governance

Search engines are a common vector for data leakage if not strictly secured. The KIYAN ERP Search Engine enforces a "Secure by Design" philosophy.

### 5.1 Permission Trimming (RBAC)
*   The search engine is deeply integrated with the Role-Based Access Control (RBAC) module. 
*   **Post-Filter vs. Pre-Filter:** Security is applied as a *Pre-Filter* at the database query level, never as a *Post-Filter* in the application layer. The query payload is dynamically rewritten to append security clauses (e.g., an Operator searching for "Payroll" will have `AND module_access = true` appended; returning 0 results at the database level).

### 5.2 Row-Level Security (RLS)
*   For modules that require granular record ownership (e.g., HR Performance Reviews or Regional Sales Leads), Row-Level Security ensures that even if a user searches for a globally known term, the database will only return the specific rows they are explicitly authorized to view.
*   Users can never discover the existence of a restricted record through predictive type-ahead or fuzzy matching.

---

## 6. Future Expansion (Roadmap)

As the data volume grows to tens of millions of rows, the Search Engine will evolve to support:

*   **Dedicated Search Clusters:** Offloading search queries from the primary transactional database (PostgreSQL) to a dedicated, distributed search engine like **Elasticsearch** or **OpenSearch** via background CDC (Change Data Capture) pipelines.
*   **Semantic Search (AI/Vector):** Moving beyond keyword matching to intent matching using Vector Embeddings. (e.g., Searching "things to fix machines" will semantically return "Spare Parts" and "Maintenance Work Orders").
*   **OCR Integration:** Indexing the text *inside* uploaded PDF and JPEG attachments (e.g., signed Delivery Notes), making scanned physical documents globally searchable.
