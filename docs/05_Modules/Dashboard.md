# Module Specification Document
## Dashboard & Analytics Module
**System:** KIYAN Factory ERP
**Prepared by:** Enterprise ERP Business Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, CQRS Optimized

---

## 1. Objective & Scope
To define the dynamic, role-based Dashboard system for KIYAN Factory ERP. As the primary landing page for all users, the dashboard must deliver immediate, actionable insights relevant to the user's specific job function. The architecture leverages CQRS (Command Query Responsibility Segregation) to ensure that complex KPI calculations do not impact the transactional performance of the local edge server during active shop-floor operations.

---

## 2. Role-Based Dashboard Profiles
The dashboard dynamically arranges widgets based on the user's active role. 

*   **Owner / Factory Manager:** A holistic view containing Production KPIs, Sales KPIs, Accounting KPIs, overall Machine Status, and Critical Alerts (Quality/Maintenance).
*   **Production Manager:** Focused on manufacturing throughput. Displays Production KPIs, Today's Production, Pending Production Orders, Machine Status, and Quality Alerts.
*   **Warehouse Manager / Purchasing:** Focused on material flow. Displays Inventory KPIs, Low Stock, Pending Purchase Orders, and Recent Warehouse Activities.
*   **Sales:** Focused on fulfillment and revenue. Displays Today's Sales, Sales KPIs, Low Stock (Finished Goods only), and Pending Sales Orders.
*   **Accounting:** Focused on cash flow. Displays Accounting KPIs, Pending Purchase Orders (for AP), and Pending Invoices (AR).
*   **Quality Control:** Displays Quality Alerts, Pending Inspections, and Recent QC Activities.
*   **Maintenance / Engineering:** Displays Machine Status, Maintenance Alerts, and Predictive Failure Charts.
*   **Operator:** Typically bypasses the main dashboard and routes directly to the active Work Order execution screen.

---

## 3. Widget Specifications

### 3.1 Production KPIs
*   **Purpose:** High-level metrics indicating manufacturing efficiency, specifically Overall Equipment Effectiveness (OEE) and Batch Yield %.
*   **Data Source:** Production Module (aggregated `yield_records`, `scrap_logs`, `machine_runtimes`).
*   **Refresh Strategy:** Asynchronous Read Model updated every 15 minutes to prevent heavy real-time table locks.
*   **Permissions:** `VIEW_PRODUCTION_KPIS` (Owner, Factory Manager, Production Manager).
*   **Business Rules:** Yield % is calculated as `(Actual Output / Expected Target Output) * 100`. OEE factors in Availability, Performance, and Quality.
*   **Dependencies:** Production Module, Recipes Module.
*   **Possible Errors:** Division by zero if no production orders are released; skewed OEE if operators fail to log machine downtime accurately.
*   **Future Expansion:** Integration with SCADA for true real-time, sensor-driven OEE calculation without human input.

### 3.2 Inventory KPIs
*   **Purpose:** Summarizes warehouse health (Total Value of Inventory on Hand, Inventory Turnover Ratio, % of Quarantined Stock).
*   **Data Source:** Inventory Module (`stock_levels`, `lots`) crossed with Accounting (COGS).
*   **Refresh Strategy:** Hourly aggregation via background cron job.
*   **Permissions:** `VIEW_INVENTORY_KPIS` (Owner, Warehouse Manager, Factory Manager).
*   **Business Rules:** Inventory value is calculated using Moving Average Cost or standard cost, depending on accounting settings.
*   **Dependencies:** Inventory Module, Accounting Module.
*   **Possible Errors:** Inaccurate valuation if recent Purchase Orders are missing financial AP data.
*   **Future Expansion:** Machine learning anomaly detection to highlight unusual spikes in scrap or shrinkage.

### 3.3 Sales KPIs
*   **Purpose:** Tracks revenue velocity (Total Revenue MTD, Open Order Value, Average Order Value).
*   **Data Source:** Sales Module (`sales_orders`, `so_line_items`).
*   **Refresh Strategy:** Real-time on page load.
*   **Permissions:** `VIEW_SALES_KPIS` (Owner, Sales Manager).
*   **Business Rules:** Revenue is only recognized for dispatched orders. "Open Order Value" represents pipeline backlog.
*   **Dependencies:** Sales Module, Dispatch Module.
*   **Possible Errors:** Mismatched currency conversions if foreign B2B sales are improperly logged.
*   **Future Expansion:** Year-over-Year (YoY) comparison graphs against historical archived data.

### 3.4 Accounting KPIs
*   **Purpose:** Tracks immediate factory liquidity (Total Accounts Receivable, Total Accounts Payable, Cash on Hand).
*   **Data Source:** Accounting Module (`invoices`, `payments`).
*   **Refresh Strategy:** Real-time on page load.
*   **Permissions:** `VIEW_FINANCIAL_KPIS` (Owner, Accountant).
*   **Business Rules:** AP/AR must strictly reflect unpaid, approved invoices. Draft invoices are excluded.
*   **Dependencies:** Accounting Module, Purchasing (for AP), Sales (for AR).
*   **Possible Errors:** Missing sub-ledger entries if the monthly reconciliation process failed.
*   **Future Expansion:** Predictive cash flow modeling based on historical customer payment delays.

### 3.5 Machine Status
*   **Purpose:** Live visual map or list showing the current operational state of core factory machinery (Roasters, Mills).
*   **Data Source:** Production Module (Work Orders currently assigned to `Equipment`) and Maintenance Module.
*   **Refresh Strategy:** 60-second polling.
*   **Permissions:** `VIEW_MACHINE_STATUS` (Production Manager, Maintenance, Factory Manager).
*   **Business Rules:** States include: `RUNNING` (Green), `IDLE` (Yellow), `MAINTENANCE` (Orange), `FAULTED` (Red).
*   **Dependencies:** Production Module, Maintenance Module.
*   **Possible Errors:** Stale state if an operator fails to close a Work Order at shift end.
*   **Future Expansion:** Live MQTT feed directly from PLC hardware displaying RPM and operating temperatures.

### 3.6 Today's Production
*   **Purpose:** Shows exactly what has been manufactured in the facility since midnight.
*   **Data Source:** Production Module (`yield_records` filtered by today's date).
*   **Refresh Strategy:** 5-minute polling.
*   **Permissions:** `VIEW_TODAYS_PRODUCTION` (Production Manager, Owner).
*   **Business Rules:** Quantities must be displayed in standard UOMs (e.g., Tons of Tahini, KGs of Paste).
*   **Dependencies:** Production Module.
*   **Possible Errors:** Timezone calculation issues if the edge server clock drifts.
*   **Future Expansion:** Real-time progress bars mapping actual output against the daily target.

### 3.7 Today's Sales
*   **Purpose:** Shows orders received and orders shipped today.
*   **Data Source:** Sales Module (`sales_orders`, `dispatches`).
*   **Refresh Strategy:** 5-minute polling.
*   **Permissions:** `VIEW_TODAYS_SALES` (Sales, Owner).
*   **Business Rules:** Differentiates between 'Orders Booked' (Commitment) and 'Orders Dispatched' (Revenue).
*   **Dependencies:** Sales Module, Warehouse Module.
*   **Possible Errors:** None specific; purely transactional read.
*   **Future Expansion:** Geolocation map showing the destination of today's dispatched pallets.

### 3.8 Low Stock
*   **Purpose:** Warns procurement and warehouse teams about materials nearing depletion.
*   **Data Source:** Inventory Module (`stock_levels` vs `item_masters.reorder_point`).
*   **Refresh Strategy:** Real-time on page load.
*   **Permissions:** `VIEW_LOW_STOCK` (Warehouse, Purchasing, Production).
*   **Business Rules:** Triggers when `Available Stock` (Total Stock - Quarantined Stock - Committed to Production) falls below the `Safety Stock` threshold.
*   **Dependencies:** Inventory Module, Quality Module (for Quarantines).
*   **Possible Errors:** False alarms if a large PO has been physically received but the GRN has not been entered into the system.
*   **Future Expansion:** One-click "Generate Draft PO" button directly from the widget.

### 3.9 Pending Purchase Orders
*   **Purpose:** Highlights incoming shipments or POs awaiting executive approval.
*   **Data Source:** Purchasing Module (`purchase_orders`).
*   **Refresh Strategy:** Real-time on page load.
*   **Permissions:** `VIEW_PENDING_POS` (Purchasing, Owner, Warehouse Manager).
*   **Business Rules:** Grouped by status: "Awaiting Approval", "In Transit", "Partially Received".
*   **Dependencies:** Purchasing Module.
*   **Possible Errors:** Orphaned POs from deleted/deactivated suppliers.
*   **Future Expansion:** EDI integration to automatically update "In Transit" status from logistics partners.

### 3.10 Pending Production Orders
*   **Purpose:** Shows the immediate manufacturing backlog queue.
*   **Data Source:** Production Module (`production_orders` with status `RELEASED` or `PLANNED`).
*   **Refresh Strategy:** Real-time on page load.
*   **Permissions:** `VIEW_PENDING_PRODUCTION` (Production Manager, Factory Manager).
*   **Business Rules:** Ordered strictly by Target Deadline date.
*   **Dependencies:** Production Module.
*   **Possible Errors:** Overdue orders displaying incorrectly if the deadline was historically modified.
*   **Future Expansion:** AI-based suggested rescheduling based on current machine bottlenecks.

### 3.11 Recent Activities
*   **Purpose:** A real-time audit trail of user actions across the ERP to provide ambient awareness.
*   **Data Source:** Shared Kernel (`audit_logs`).
*   **Refresh Strategy:** WebSocket push for real-time scrolling (or 30-second polling).
*   **Permissions:** Based on the user's department (e.g., Warehouse sees stock moves, QC sees test results).
*   **Business Rules:** Only shows high-level, human-readable events (e.g., "John Doe approved PO #1002").
*   **Dependencies:** All Modules.
*   **Possible Errors:** Log flooding if a background script performs bulk updates.
*   **Future Expansion:** Clickable links on activities to jump directly to the affected record.

### 3.12 Notifications
*   **Purpose:** Inbox for actionable alerts directly targeted at the logged-in user.
*   **Data Source:** Notifications Module (`system_alerts`).
*   **Refresh Strategy:** Real-time via WebSockets.
*   **Permissions:** Universal access, filtered to `user_id`.
*   **Business Rules:** Supports "Mark as Read" and "Dismiss". Critical alerts cannot be dismissed until the underlying issue is resolved.
*   **Dependencies:** Notifications Module.
*   **Possible Errors:** Unhandled websocket disconnects leaving stale notifications.
*   **Future Expansion:** Push notifications forwarded to a future KIYAN mobile app.

### 3.13 Quality Alerts
*   **Purpose:** Extremely high-priority widget displaying new Quarantine Holds or failed lab tests.
*   **Data Source:** Quality Module (`quarantine_holds`, `quality_inspections`).
*   **Refresh Strategy:** Real-time via WebSockets.
*   **Permissions:** `VIEW_QUALITY_ALERTS` (QC Manager, Production Manager, Factory Manager).
*   **Business Rules:** Remains visible until a QC Manager officially reviews and either condemns or conditionally releases the lot.
*   **Dependencies:** Quality Module, Inventory Module.
*   **Possible Errors:** None; high-integrity read.
*   **Future Expansion:** Auto-halting production lines via SCADA if consecutive critical quality alerts are triggered on the same machine.

### 3.14 Maintenance Alerts
*   **Purpose:** Warns about machines requiring immediate service or upcoming preventative maintenance.
*   **Data Source:** Maintenance Module (`maintenance_orders`).
*   **Refresh Strategy:** 5-minute polling.
*   **Permissions:** `VIEW_MAINTENANCE_ALERTS` (Maintenance, Production Manager).
*   **Business Rules:** Ordered by severity/urgency. Highlights machines that have exceeded their recommended run-hours.
*   **Dependencies:** Maintenance Module, Production Module (for run-hours).
*   **Possible Errors:** Edge cases where a machine is replaced but the old ID is still generating automated alerts.
*   **Future Expansion:** Integration with vibration sensors to predict bearing failures before they trigger hour-based alerts.

### 3.15 Charts
*   **Purpose:** Visual representations of historical and trend data (e.g., 30-Day Revenue Trend, 7-Day Tahini Yield Variation).
*   **Data Source:** CQRS Reporting Database / Materialized Views.
*   **Refresh Strategy:** Nightly batch processing for historical charts.
*   **Permissions:** Highly role-dependent.
*   **Business Rules:** Must gracefully handle missing data points (e.g., weekends with zero production).
*   **Dependencies:** Reporting Module.
*   **Possible Errors:** Chart rendering library failures if massive datasets are pushed to the client memory.
*   **Future Expansion:** Custom drag-and-drop chart builder for Factory Managers.

### 3.16 Reports Shortcuts
*   **Purpose:** Quick links to generate heavy PDF/Excel documents.
*   **Data Source:** Static configuration.
*   **Refresh Strategy:** Static.
*   **Permissions:** Role-dependent.
*   **Business Rules:** Launches parameterized report modals (e.g., "Generate Monthly Yield Report").
*   **Dependencies:** Presentation Layer.
*   **Possible Errors:** None.
*   **Future Expansion:** "Favorite" mechanism for users to pin their most-used reports.

### 3.17 Quick Actions
*   **Purpose:** Floating or pinned buttons to execute the most common tasks instantly without navigating deep into menus.
*   **Data Source:** Static configuration based on Role.
*   **Refresh Strategy:** Static.
*   **Permissions:** Role-dependent (e.g., QC sees "Log Test Result", Warehouse sees "Transfer Stock").
*   **Business Rules:** Actions open highly optimized, fast-entry modals designed for barcode scanning workflows.
*   **Dependencies:** Cross-cutting Application Services.
*   **Possible Errors:** None.
*   **Future Expansion:** Context-aware quick actions powered by AI (e.g., suggesting "Create PO for Jars" if jar stock is low).
