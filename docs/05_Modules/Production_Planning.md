# Module Specification Document
## Production Planning Module
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Advanced Planning and Scheduling (APS)

---

## 1. Objective & Scope
This document outlines the official specification for the Production Planning Module. Acting as the central nervous system of manufacturing operations, this module balances market demand against finite factory resources. It orchestrates when, where, and how products are manufactured by synchronizing Machine Capacity, Employee Availability, and Material Inventory to generate an optimized, executable Master Production Schedule (MPS).

---

## 2. Core Planning Capabilities

### 2.1 Demand Planning
*   **Purpose:** To aggregate all sources of demand into a unified production target.
*   **Mechanics:** Consolidates Confirmed Sales Orders (Make-to-Order), Minimum Stock Level triggers (Make-to-Stock), and historical seasonal forecasts.
*   **Constraints:** Must resolve conflicting demands (e.g., a massive sudden B2B order vs. routine stock replenishment).

### 2.2 Capacity Planning (Machine & Employee)
*   **Purpose:** To define the true throughput limits of the factory.
*   **Machine Capacity:** Calculates theoretical maximum output based on machine run-rates (from the Recipes/BOM module) minus expected downtime, maintenance windows, and historical OEE (Overall Equipment Effectiveness).
*   **Employee Capacity:** Evaluates available labor hours mapped to specific skill sets (e.g., only 3 operators are certified to run the Roaster). Extracted from the HR module and shift schedules.
*   **Constraints:** Planning cannot exceed the lower bound of either Machine or Employee capacity (the bottleneck dictates the schedule).

### 2.3 Material Availability (MRP)
*   **Purpose:** To ensure raw materials and packaging are physically present before a machine is turned on.
*   **Mechanics:** Cross-references the proposed schedule's BOM requirements against WMS `Available to Promise (ATP)` stock and Incoming Purchase Orders.
*   **Constraints:** A Production Order cannot be scheduled if the required raw materials are neither in stock nor confirmed for delivery before the scheduled start time.

### 2.4 Production Calendar
*   **Purpose:** Defines the temporal boundaries of factory operations.
*   **Mechanics:** Maps out Shifts (e.g., 1st, 2nd, 3rd shift), Weekends, Public Holidays, and Planned Maintenance windows.
*   **Constraints:** The scheduling engine skips non-working hours automatically unless explicitly authorized for "Overtime" scheduling.

---

## 3. Scheduling & Allocation Logic

### 3.1 Production Scheduling
*   **Forward Scheduling:** Starts from today (or a specific start date) and calculates the earliest possible completion date based on available capacity. Used for Make-to-Stock or Urgent Orders.
*   **Backward Scheduling:** Starts from the Sales Order Due Date and works backward to find the latest possible start date. Minimizes WIP (Work in Progress) inventory and warehousing costs. Used for standard Make-to-Order fulfillment.

### 3.2 Resource Allocation
*   **Purpose:** Assigning specific physical and human resources to discrete tasks.
*   **Mechanics:** The system assigns a specific Work Center (e.g., Roaster Line 1) and a required Skill/Operator to a Production Order.
*   **Logic:** Prefers preferred/primary machines defined in the Recipe, but can fallback to alternative routing if the primary machine is over capacity.

### 3.3 Priority & Urgent Orders
*   **Standard Priority:** FIFO-based scheduling driven by standard due dates.
*   **High Priority:** Orders that are scheduled first in the queue during the next available shift.
*   **Urgent (Preemptive) Orders:** Emergency orders (e.g., replacing a rejected VIP customer shipment). 
*   **Scheduling Logic (Urgent):** The system simulates pausing currently running non-priority orders, injects the Urgent Order into the immediate schedule, and cascades (delays) all subsequent orders, highlighting the cascading impact to the Production Manager before committing.

---

## 4. Master Planning Workflow

1.  **Demand Aggregation:** System compiles all open Sales Orders and Low Stock Alerts.
2.  **Draft MPS Generation:** System generates a Draft Master Production Schedule (MPS).
3.  **Constraint Evaluation (Finite Scheduling):** System attempts to fit the Draft MPS into the Production Calendar, considering Machine/Employee capacity and Material Availability.
4.  **Optimization:** The scheduling engine clusters similar orders to minimize changeover/setup times (e.g., grouping all White Tahini orders before Black Tahini to avoid intermediate machine deep-cleaning).
5.  **Planner Review:** Production Manager reviews the Gantt chart, manually drags-and-drops orders to handle edge cases, and resolves bottleneck warnings.
6.  **Schedule Release:** The schedule is locked for a specific horizon (e.g., the next 48 hours). Production Orders are transitioned to `RELEASED` and pushed to the shop-floor execution screens.

---

## 5. Business Rules & Validation

### 5.1 Business Rules
*   **BR-PLAN-01:** Released schedules within the "Frozen Zone" (e.g., next 24 hours) cannot be automatically rescheduled by the system; they require manual Manager override.
*   **BR-PLAN-02:** Routine Maintenance tasks plotted on the Production Calendar act as hard blocks. Standard production cannot be scheduled over them.
*   **BR-PLAN-03:** Material Reservations are strictly generated the moment an order transitions from `PLANNED` to `RELEASED`.

### 5.2 Validation Rules
*   **No Double Booking:** A specific Machine or Employee cannot be allocated to >100% capacity at any given minute.
*   **BOM Integrity:** A Production Order cannot be planned against an `ARCHIVED` or `DRAFT` Recipe Version.
*   **Feasibility Check:** If Backward Scheduling calculates a start date in the past (to meet a due date), the system flags the order as "Infeasible" and switches to Forward Scheduling, flagging a projected late delivery.

---

## 6. System Dependencies & Optimization

### 6.1 Dependencies
*   **Sales Module:** Provides Make-to-Order demand and due dates.
*   **Inventory/WMS Module:** Provides Material Availability (ATP).
*   **Recipes (BOM) Module:** Provides machine routing, expected run rates, and material requirements.
*   **Maintenance Module:** Provides machine availability and downtime windows.
*   **HR Module:** Provides employee availability, shift mapping, and skill matrices.

### 6.2 Optimization Strategies (Algorithmic)
*   **Changeover Matrix:** Minimizing setup times by sequencing production intelligently (e.g., Light to Dark colors, Allergen-Free to Allergen-Containing).
*   **Bottleneck Relief:** If Work Center A is overloaded, the system automatically checks if the Recipe allows alternative routing through Work Center B, even if B is slightly less efficient.

---

## 7. Reports & KPIs

### 7.1 Key Performance Indicators (KPIs)
*   **Schedule Adherence (SA):** % of production orders completed exactly as scheduled (Time and Quantity).
*   **Capacity Utilization:** % of available machine hours actively scheduled for production vs. idle time.
*   **On-Time In Full (OTIF):** % of orders ready for dispatch by the customer's requested due date.
*   **Changeover Time Ratio:** % of total factory time spent cleaning or retooling machines between different product runs.

### 7.2 Reports
*   **Master Production Schedule (MPS):** The definitive daily/weekly Gantt chart and task list for the factory floor.
*   **Capacity Bottleneck Report:** Highlights Work Centers that are consistently operating at >95% capacity, indicating a need for capital expenditure (new machines) or more shifts.
*   **Material Shortage Forecast:** Projects future material stockouts based on the current planned schedule vs. incoming Purchase Orders.
*   **Urgent Order Impact Analysis:** A financial and operational breakdown of how much overtime or delayed standard orders were caused by injecting an Urgent Order into the schedule.
