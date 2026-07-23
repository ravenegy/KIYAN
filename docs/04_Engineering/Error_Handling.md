# Module Specification Document
## Error Handling & Resilience Strategy
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, API-Driven

---

## 1. Objective & Scope
This document outlines the official Error Handling and Resilience Strategy for the KIYAN Factory ERP. In a high-stakes manufacturing environment, system errors must never result in corrupted data, unhandled crashes, or operator confusion. This strategy defines how the system classifies, logs, and recovers from anomalies, ensuring that end-users receive actionable, jargon-free guidance while developers and IT support receive the deep diagnostic context required for rapid resolution.

---

## 2. Error Classification & Handling Matrix

### 2.1 Validation Errors (Client & Server)
*   **Classification:** Preventable User Error (HTTP 400 Bad Request).
*   **Context:** The data submitted does not match the required schema (e.g., entering text into a numeric weight field, missing a mandatory expiry date).
*   **Recovery & Retry:** The system blocks submission. No backend retry is necessary. The user must correct the input.
*   **User Message:** Specific, localized, and actionable (e.g., "The Expiration Date cannot be in the past," highlighted in red beneath the specific input field).
*   **Developer Message:** Exact schema path violation (e.g., `body.items[0].quantity must be a positive integer`).

### 2.2 Business Logic Errors
*   **Classification:** Contextual Rule Violation (HTTP 409 Conflict / 422 Unprocessable Entity).
*   **Context:** The data is structurally valid, but the action violates a core manufacturing or financial rule (e.g., attempting to consume inventory that is currently Quarantined, or exceeding a customer's credit limit).
*   **Recovery & Retry:** The transaction is aborted and rolled back. The user must alter the business context (e.g., request a credit override) before retrying.
*   **User Message:** Clear explanation of the business block (e.g., "Cannot dispatch Order #1045 because Customer Balance exceeds the Credit Limit of $50,000.").
*   **Developer Message:** Internal Business Rule ID and state mismatch details.

### 2.3 Authentication Errors
*   **Classification:** Identity Failure (HTTP 401 Unauthorized).
*   **Context:** The user is not logged in, their session has timed out, or their JWT token is invalid/tampered with.
*   **Recovery & Retry:** The client application intercepts the 401 response, caches the user's current unsaved UI state (if possible), and redirects to the Login screen. Upon successful login, the user is redirected back to their previous context.
*   **User Message:** "Your session has expired. Please log in again to continue."
*   **Developer Message:** Token lifecycle state (e.g., `TokenExpiredError`, `SignatureMismatch`).

### 2.4 Authorization Errors
*   **Classification:** Privilege Violation (HTTP 403 Forbidden).
*   **Context:** A valid, authenticated user attempts to access a module, API, or record that their Role-Based Access Control (RBAC) profile explicitly denies (e.g., an Operator attempting to view the Payroll dashboard).
*   **Recovery & Retry:** The action is hard-blocked. The system renders an "Access Denied" view.
*   **User Message:** "You do not have the required permissions to view this module. Please contact your System Administrator if you require access."
*   **Developer Message:** Required permission vs. possessed permissions mapping.

### 2.5 Database Errors
*   **Classification:** Infrastructure/Data Integrity Failure (HTTP 500 Internal Server Error / 503 Service Unavailable).
*   **Context:** The database encounters a deadlock, a unique constraint violation (e.g., duplicate invoice number), or connection pool exhaustion.
*   **Recovery & Retry:** 
    *   *Deadlocks/Timeouts:* The backend implements automated exponential backoff and retries the transaction up to 3 times before failing.
    *   *Constraint Violations:* Transaction rolls back immediately; no automated retry.
*   **User Message:** Generic safety message. *Never expose SQL queries or schema details to the user.* (e.g., "We encountered an issue saving this record. Please try again or provide Support Code: XJ-992 to IT.")
*   **Developer Message:** Full SQL stack trace, table name, constraint name, and failing query parameters.

### 2.6 Network Errors
*   **Classification:** Connectivity Failure (HTTP 502, 504, or Browser `TypeError: Failed to fetch`).
*   **Context:** The client cannot reach the server due to bad factory Wi-Fi, a downed DNS, or a dropped load balancer connection.
*   **Recovery & Retry:** The client-side HTTP interceptor automatically retries idempotent requests (e.g., GET requests) using exponential backoff (e.g., wait 1s, 2s, 4s). Non-idempotent requests (POST/Payment) are NOT auto-retried to prevent double-billing or double-dispatching.
*   **User Message:** "Experiencing a poor network connection. Attempting to reconnect..."
*   **Developer Message:** TCP/IP or Gateway timeout details.

### 2.7 Offline Errors (Offline-First Architecture)
*   **Classification:** Expected Environmental State.
*   **Context:** A warehouse operator drives a forklift into a Wi-Fi dead zone while picking an order.
*   **Recovery & Retry:** The ERP is designed as a Progressive Web App (PWA). Write actions (e.g., scanning a barcode) are saved locally to browser IndexedDB in an "Outbox" queue. The UI optimistically updates. When the network connection is restored, a background Service Worker automatically syncs the Outbox queue to the server.
*   **User Message:** "You are currently offline. Changes are saved locally and will sync automatically when you return to a Wi-Fi zone." (Visualized via a yellow "Offline Mode" banner).
*   **Developer Message:** Local queue state, sync conflict resolution logs.

### 2.8 Unexpected Exceptions
*   **Classification:** Unhandled Fatal Error (HTTP 500).
*   **Context:** Null pointer exceptions, memory leaks, or missing edge-case logic.
*   **Recovery & Retry:** The application must gracefully degrade. If the frontend crashes entirely, an Error Boundary catches the crash, preventing a white screen of death, and presents a fallback UI.
*   **User Message:** "An unexpected system error occurred. Our engineering team has been notified. [Reload Application]"
*   **Developer Message:** Complete stack trace, memory heap state, and triggering event payload.

---

## 3. Systemic Resilience & Logging Strategy

### 3.1 Logging Tiers
*   **Silent Logs (Debug/Info):** Standard API requests, background job completions. Stored temporarily for performance monitoring.
*   **Warn Logs:** Automated retries triggered, offline sync conflicts, users hitting rate limits. Alerts IT without waking them up.
*   **Error/Critical Logs:** Database failures, 500 Exceptions, Security Authorization breaches. Triggers immediate PagerDuty/SMS alerts to the DevOps and Security teams.

### 3.2 Secure Logging (Data Masking)
Under no circumstances will the Error Logging engine record Personally Identifiable Information (PII), Passwords, API Keys, or Payment Data. The logger automatically scrubs and masks sensitive payload fields before shipping logs to the central aggregator (e.g., Datadog, ELK stack).

---

## 4. Support Diagnostics & Resolution

To bridge the gap between frustrated users and IT support, the system employs a standardized diagnostic tracing framework.

### 4.1 The Correlation ID (Trace ID)
Every single HTTP request originating from the client is injected with a unique, UUID-based `X-Correlation-ID` header. This ID travels through the load balancer, the API layer, and down to the database query.

### 4.2 Support Diagnostic Workflow
1.  **The Event:** An Operator encounters a critical 500 Error while releasing a Production Order.
2.  **The UI:** The ERP displays the generic user message, but appends a visible footnote: `"Support Trace ID: 8f4c-22b9-1a"`.
3.  **The Hand-off:** The Operator calls IT Support and reads the Trace ID.
4.  **The Resolution:** The IT Administrator pastes the Trace ID into the Central Logging Dashboard. The dashboard instantly filters millions of logs to show the exact user session, the exact API request, the specific database deadlock, and the full Developer Developer Message stack trace, enabling resolution in minutes rather than days.

### 4.3 Session Replay (Future Analytics)
For highly complex UI states that are difficult to reproduce (e.g., dragging and dropping elements on the Production Gantt Chart), the system will support localized, anonymized session replay telemetry. If an unhandled exception occurs, the last 30 seconds of DOM mutations are packaged with the error log, allowing frontend engineers to literally "watch" the crash happen to determine the exact sequence of clicks that caused it.
