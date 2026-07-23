# Module Specification Document
## State Management Strategy
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Single Page Application (SPA), Offline-First

---

## 1. Objective & Scope
This document defines the official State Management Strategy for the KIYAN Factory ERP frontend architecture. An enterprise ERP is incredibly data-heavy, featuring massive data grids, complex hierarchical forms, and a strict requirement for offline factory-floor resilience. A poorly designed state architecture will result in severe memory leaks, sluggish UI performance, and data sync conflicts. This specification categorizes state types and dictates the exact architectural approach to handle data fetching, caching, mutation, and garbage collection.

---

## 2. Recommended Strategy & Justification

**Recommendation:** A strictly segregated, multi-tiered state architecture utilizing specialized tools for specific types of state (e.g., TanStack Query/React Query for Server State, Zustand for Client State, URL Parameters for Routing State).

**Why this is the best strategy:**
Historically, ERPs suffered by dumping all data (server responses, form inputs, UI toggles) into a single monolithic global store (like legacy Redux). This caused massive performance bottlenecks because updating a single form input could trigger re-renders across the entire application tree. 
By segregating state, we achieve:
1.  **Performance:** Form keystrokes do not trigger global re-renders.
2.  **Cache Invalidation:** Server state manages its own staleness and background refetching automatically.
3.  **Shareability:** Moving filters and search parameters to the URL allows managers to share exact report views via links.
4.  **Offline Readiness:** Separating the API cache allows it to be easily serialized and persisted to the browser's IndexedDB for offline access.

---

## 3. State Classifications & Implementation Rules

### 3.1 Global & Session State (Client State)
*   **Definition:** Ephemeral UI state that affects the entire application but does not originate from the database.
*   **Scope:** Current authenticated user profile, active RBAC permissions, UI theme (Dark/Light), sidebar collapse status, and current localization/language context.
*   **Strategy:** Utilize a lightweight, atomic state manager (e.g., Zustand or React Context).
*   **Memory Management:** Lives in memory. Cleared entirely upon user logout or hard browser refresh (except for theme/language preferences which sync to `localStorage`).

### 3.2 Module & Cache State (Server State)
*   **Definition:** The asynchronous data fetched from the ERP backend (e.g., Lists of Sales Orders, Customer Profiles, Inventory ledgers).
*   **Scope:** Data fetching, caching, loading states, error states, and background synchronization.
*   **Strategy:** Utilize a dedicated Async State/Cache Manager. 
    *   *Stale-While-Revalidate:* When a user navigates to a module, the system instantly renders the cached data, while silently fetching fresh data in the background and updating the UI seamlessly.
    *   *Cache Invalidation:* When an entity is mutated (e.g., updating a Purchase Order), the system explicitly invalidates the cache for that specific ID and the corresponding list views, forcing an immediate background refetch.

### 3.3 Form State
*   **Definition:** The highly volatile state of user inputs before they are submitted to the server.
*   **Scope:** Text inputs, dropdown selections, dynamic line-item grids (e.g., adding 50 raw materials to a Recipe BOM), validation errors, and dirty/touched states.
*   **Strategy:** Utilize uncontrolled component strategies (e.g., React Hook Form).
    *   *Performance:* Form state must remain strictly local to the form component. Keystrokes must NOT trigger re-renders of the parent layout or global store.
    *   *Drafting:* For massive documents (like a Master Production Schedule), the form state periodically auto-saves a draft version to `localStorage` to prevent data loss if the browser crashes.

### 3.4 Search, Filters, and Pagination State (URL State)
*   **Definition:** The parameters dictating what specific slice of data the user is currently viewing.
*   **Scope:** Search queries, advanced filter toggles, active tab selections, page numbers, and sorting directions (ASC/DESC).
*   **Strategy:** Must be strictly bound to the **URL Query Parameters** (e.g., `?status=RELEASED&page=2&sort=date_desc`).
    *   *Why:* Ensures the browser's Back/Forward buttons work as expected. Allows a Production Manager to apply 10 complex filters to a report, copy the URL, and slack it to the Factory Director, who will see the exact same view upon clicking.

---

## 4. Offline Storage, Persistence, and Synchronization

To support operations in factory zones with zero Wi-Fi, the ERP implements an Offline-First architectural pattern.

### 4.1 Storage Mechanisms
*   **IndexedDB:** The primary local database for the browser. Used to store the serialized Server State Cache. This allows the ERP to load instantly and display historical data even with no network connection.
*   **localStorage:** Used exclusively for tiny, non-sensitive UI preferences (theme, last visited module) and temporary Draft form states. *Never used for transactional ERP data.*

### 4.2 The "Outbox" Synchronization Pattern
*   **Workflow:** When an Operator executes a write-action (e.g., "Log Yield" on a machine) while offline, the API request fails gracefully.
*   **Queueing:** The application catches the failure, serializes the exact API payload, and stores it in an IndexedDB "Outbox" queue. 
*   **Optimistic UI:** The UI optimistically updates to reflect the action as if it succeeded, visually flagging the record as "Pending Sync."
*   **Synchronization:** A background Service Worker continuously pings for network restoration. Once online, the worker drains the Outbox queue, executing the API payloads sequentially in the exact order they occurred.

### 4.3 Conflict Resolution
*   If an Outbox sync fails due to a business rule violation (e.g., the Operator consumed inventory while offline, but another user deleted that inventory online 5 minutes ago), the sync is paused. The system alerts the user with a "Sync Conflict Resolution" modal, forcing manual intervention.

---

## 5. Memory Management & Performance

Enterprise ERPs can easily crash browser tabs if memory is not strictly managed.

### 5.1 Cache Garbage Collection
*   The Server State Cache is configured with a strict `cacheTime` (e.g., 15 minutes). Unused data (data not currently being displayed by mounted components) is automatically garbage-collected and purged from browser memory after this duration.

### 5.2 Virtualization for Large Datasets
*   **The Problem:** Rendering a Bill of Materials with 5,000 components, or a General Ledger with 10,000 journal entries, will freeze the DOM.
*   **The Strategy:** The UI must implement **Windowing/Virtualization**. The DOM will only ever render the specific 30 rows currently visible in the user's viewport, dynamically swapping out the DOM nodes as the user scrolls.

### 5.3 Debouncing Volatile State
*   Global search bars and heavy filter inputs must be debounced (e.g., wait 300ms after the user stops typing before committing the state to the URL and firing the API request). This prevents flooding the backend with partial queries and UI stuttering.

---
*End of State Management Strategy Specification. This architecture ensures the KIYAN ERP remains lightning-fast, highly resilient, and memory-efficient regardless of the scale of the manufacturing data.*
