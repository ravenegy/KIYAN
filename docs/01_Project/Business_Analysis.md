# KIYAN Factory ERP
## Comprehensive Business Workflow Analysis

**Prepared by:** Senior Business Analyst, ERP & Manufacturing Systems
**Date:** July 2026
**Industry:** Food Manufacturing (Tahini & Sesame Products)
**Facility:** KIYAN

---

## 1. Factory Organization & Departments

KIYAN Factory is organized to optimize the linear flow of food manufacturing, ensuring strict adherence to food safety standards and operational efficiency. The factory is divided into the following functional departments:

1. **Procurement & Purchasing:** Sources raw sesame, packaging materials, and machinery spare parts.
2. **Warehouse & Inventory:** Manages Raw Materials (RM), Work in Progress (WIP), and Finished Goods (FG).
3. **Production:** Core processing units (Cleaning, Hulling, Roasting, Milling).
4. **Quality Control (QC):** Lab testing, compliance, and product release.
5. **Packaging:** Bottling, labeling, and palletizing of finished paste and tahini.
6. **Sales & Customer Service:** Order management, CRM, and distribution dispatch.
7. **Accounting & Finance:** AP/AR, cash flow management, COGS analysis, and ledger.
8. **Human Resources (HR):** Labor scheduling, payroll, and compliance training.
9. **Management:** Executive oversight, strategic planning, and performance monitoring.

---

## 2. Supply Chain & Inbound Workflows

### 2.1 Supplier Workflow & Purchasing
* **Purpose:** To evaluate vendors, negotiate contracts, and procure high-quality raw sesame and supplies to meet production demand without overstocking.
* **Actors:** Purchasing Manager, Procurement Officers, Suppliers.
* **Inputs:** Material Requirements Planning (MRP) reports, inventory reorder alerts, vendor quotes.
* **Outputs:** Purchase Orders (POs), Vendor Contracts, Supplier Scorecards.
* **Business Rules:** All POs above $10,000 require CFO approval. Only QA-approved suppliers can be issued a PO for raw sesame.
* **Dependencies:** Approved supplier list from QC, real-time inventory levels.
* **Possible Exceptions:** Supplier out of stock, price fluctuations, delayed shipments.
* **Potential Risks:** Supply chain disruption halting production, supplier quality drops.
* **Future Improvements:** Automated B2B vendor portal for direct PO acceptance and shipment tracking.

### 2.2 Raw Material Receiving
* **Purpose:** To intake physical deliveries, verify weights and documentation, and hold goods for quality inspection.
* **Actors:** Receiving Clerk, Forklift Driver, QC Inspector.
* **Inputs:** Supplier Delivery Note, PO, Physical Goods, Weighbridge Ticket.
* **Outputs:** Goods Receipt Note (GRN), Quarantine/Hold Status, Initial Lot Number.
* **Business Rules:** Goods cannot enter general inventory without a valid PO. All incoming food-grade materials are automatically placed in "Quarantine" status. Tolerance for weight discrepancy is ±1%.
* **Dependencies:** Valid PO, functional weighbridge.
* **Possible Exceptions:** Over/under-delivery, damaged packaging, missing paperwork.
* **Potential Risks:** Accepting contaminated lots, moisture damage during transit not caught at the dock.
* **Future Improvements:** Direct integration of the weighbridge scale with the ERP via IoT.

### 2.3 Warehouse Operations & Inventory Flow
* **Purpose:** To store, manage, and track the internal movement of all RM, WIP, and FG to ensure optimal stock levels and traceability.
* **Actors:** Warehouse Manager, Material Handlers.
* **Inputs:** GRN, Production Material Requisitions, Sales Dispatch Orders.
* **Outputs:** Bin locations, Stock Ledger entries, Transfer Orders.
* **Business Rules:** Strict First-In-First-Out (FIFO) or First-Expired-First-Out (FEFO) rules apply to all perishable goods. Materials cannot be moved without a barcode scan.
* **Dependencies:** Accurate physical labeling of all pallets/bins.
* **Possible Exceptions:** Lost stock, damaged stock, scanner hardware failure.
* **Potential Risks:** Inventory shrinkage, cross-contamination of allergens (if applicable), stock expiring before use.
* **Future Improvements:** Automated Guided Vehicles (AGVs) for pallet movement and automated cycle-counting drones.

---

## 3. Manufacturing & Quality Workflows

### 3.1 Recipe Management
* **Purpose:** To define the exact specifications, Bill of Materials (BOM), and routing steps required to produce specific tahini and sesame products.
* **Actors:** R&D Manager, Production Manager.
* **Inputs:** Raw material specifications, machine capabilities, target product profiles.
* **Outputs:** Approved BOMs, Standard Operating Procedures (SOPs), target yields.
* **Business Rules:** Recipes are strictly version-controlled. Any change requires dual authorization (Production & QC).
* **Dependencies:** Accurate machine calibration data.
* **Possible Exceptions:** Need for ingredient substitution due to supply shortages.
* **Potential Risks:** Unauthorized recipe alterations leading to product recalls or inconsistent taste.
* **Future Improvements:** AI-driven recipe adjustments based on real-time raw sesame moisture and oil content analysis.

### 3.2 Production Planning & Production Orders
* **Purpose:** To convert sales demand and safety stock requirements into an actionable manufacturing schedule.
* **Actors:** Production Planner, Plant Manager.
* **Inputs:** Sales forecasts, confirmed Sales Orders, current FG inventory, machine availability.
* **Outputs:** Master Production Schedule (MPS), Work Orders, Material Requisitions.
* **Business Rules:** Production runs must be sequenced to minimize allergen washdowns (e.g., standard tahini before flavored/mixed paste).
* **Dependencies:** Accurate sales data and machine uptime status.
* **Possible Exceptions:** Sudden rush orders, unexpected machine breakdowns.
* **Potential Risks:** Overproduction leading to waste, underproduction leading to missed sales.
* **Future Improvements:** Advanced Planning and Scheduling (APS) using heuristic algorithms.

### 3.3 Machine Assignment
* **Purpose:** To allocate specific Work Orders to specific work centers (e.g., Roaster A vs. Roaster B) based on capacity and capabilities.
* **Actors:** Shift Supervisor.
* **Inputs:** Work Orders, Maintenance Schedules, Operator Roster.
* **Outputs:** Machine Dispatch List.
* **Business Rules:** Machines scheduled for preventative maintenance cannot be assigned Work Orders.
* **Dependencies:** Updated maintenance logs.
* **Possible Exceptions:** Machine fails mid-assignment requiring immediate re-routing.
* **Potential Risks:** Bottlenecks at key machines (e.g., the primary milling stone).
* **Future Improvements:** Dynamic assignment based on real-time machine health telemetry.

### 3.4 Production Tracking
* **Purpose:** To track the real-time execution of manufacturing, logging material consumption, yields, scrap, and time taken.
* **Actors:** Shop Floor Operators, Shift Supervisors.
* **Inputs:** Work Order, Scanned RM Lots.
* **Outputs:** WIP Inventory, Finished Yields, Scrap Logs, Machine Downtime Logs.
* **Business Rules:** Operators MUST scan the barcode of the raw material lot being consumed. Yields must be recorded at the end of each routing stage (e.g., after hulling, after roasting).
* **Dependencies:** Functional local edge server and barcode scanners.
* **Possible Exceptions:** Network failure on the floor (edge server mitigates this), barcode unreadable.
* **Potential Risks:** Operator forgets to log scrap, leading to inaccurate inventory and skewed COGS.
* **Future Improvements:** SCADA integration to automatically log yields and machine time without human input.

### 3.5 Quality Control (QC)
* **Purpose:** To enforce food safety standards by testing RM, WIP, and FG at critical control points (moisture, color, viscosity, taste).
* **Actors:** QA/QC Analysts, QC Manager.
* **Inputs:** Physical Samples, Test Protocols, Production Routing alerts.
* **Outputs:** Certificates of Analysis (CoA), Pass/Fail verdicts, Quarantine releases.
* **Business Rules:** FG cannot be packaged until the final mill batch passes viscosity and taste tests. Failed lots require a CAPA (Corrective and Preventive Action) workflow.
* **Dependencies:** Calibrated lab equipment.
* **Possible Exceptions:** Borderline test results requiring secondary lab confirmation.
* **Potential Risks:** Releasing contaminated or sub-standard product resulting in brand damage or public health risks.
* **Future Improvements:** Direct ERP integration with lab testing hardware (e.g., digital viscometers).

### 3.6 Packaging
* **Purpose:** To bottle, label, seal, and box bulk tahini into retail or wholesale finished goods.
* **Actors:** Packaging Line Operators.
* **Inputs:** Bulk Tahini (WIP), Packaging Materials (Jars, Lids, Labels), Approved Work Order.
* **Outputs:** Finished Goods Inventory (palletized), Lot Codes printed on physical items.
* **Business Rules:** The system must generate a unique finished good lot code that permanently links to the WIP bulk lot and the packaging material lots.
* **Dependencies:** Released WIP from QC.
* **Possible Exceptions:** Label printer jams, packaging material defects (e.g., cracked jars).
* **Potential Risks:** Mislabeled products (e.g., missing allergen warnings) leading to regulatory fines.
* **Future Improvements:** Automated computer vision inspection for label placement and cap seal integrity.

---

## 4. Outbound & Customer Workflows

### 4.1 Finished Goods Warehouse
* **Purpose:** To safely store packaged tahini and orchestrate order picking and dispatch.
* **Actors:** Warehouse Operators, Dispatch Manager.
* **Inputs:** FG from Packaging, Sales Dispatch Orders.
* **Outputs:** Pick Lists, Packing Slips, Bills of Lading.
* **Business Rules:** FEFO (First-Expired-First-Out) must strictly dictate which pallets are picked for an order.
* **Dependencies:** Accurate FG lot expiration dates.
* **Possible Exceptions:** Requested lot is damaged in the warehouse, requiring a substitute lot pick.
* **Potential Risks:** Shipping expired product, loading the wrong pallet onto a truck.
* **Future Improvements:** RFID tagging for pallets to automate loading validation.

### 4.2 Customer Workflow & Sales
* **Purpose:** To acquire customers, process orders, manage pricing tiers, and ensure timely delivery.
* **Actors:** Sales Representatives, Sales Manager.
* **Inputs:** Customer inquiries, Purchase Orders (from clients).
* **Outputs:** Sales Orders, Invoices, Delivery Schedules.
* **Business Rules:** Orders exceeding a customer's credit limit require Finance approval. Volume discounts must be systematically calculated.
* **Dependencies:** Available to Promise (ATP) inventory data.
* **Possible Exceptions:** Customer cancels order post-production, customer requests expedited shipping.
* **Potential Risks:** Over-promising delivery dates due to inaccurate inventory visibility.
* **Future Improvements:** B2B e-commerce portal allowing wholesale clients to place and track orders independently.

---

## 5. Finance & Corporate Workflows

### 5.1 Accounting
* **Purpose:** To record all financial transactions, track Cost of Goods Sold (COGS), manage Accounts Payable (AP) and Accounts Receivable (AR).
* **Actors:** Accountants, CFO.
* **Inputs:** GRNs (for AP), Invoices (for AR), Production Scrap logs (for COGS).
* **Outputs:** General Ledger, Balance Sheet, Income Statement.
* **Business Rules:** Three-way matching (PO + GRN + Supplier Invoice) is mandatory before vendor payment is issued.
* **Dependencies:** Timely data entry from the warehouse and sales departments.
* **Possible Exceptions:** Invoice disputes, currency exchange rate fluctuations on imported sesame.
* **Potential Risks:** Inaccurate COGS calculation due to poor shop floor yield reporting.
* **Future Improvements:** AI-assisted invoice OCR and automated matching.

### 5.2 Cash Flow
* **Purpose:** To monitor liquidity, ensuring the factory can pay suppliers while waiting for customer invoice payments.
* **Actors:** CFO, Treasury Analyst.
* **Inputs:** AR Aging Reports, AP Aging Reports, Payroll obligations.
* **Outputs:** Cash Flow Forecasts.
* **Business Rules:** Minimum cash reserves must be maintained.
* **Dependencies:** Accurate accounting ledgers.
* **Possible Exceptions:** Major client defaults on payment.
* **Potential Risks:** Insolvency due to mismatched payable and receivable terms.
* **Future Improvements:** Predictive cash flow modeling using macroeconomic indicators.

### 5.3 Management Dashboard & Reporting
* **Purpose:** To provide real-time, high-level visibility into factory health for executive decision-making.
* **Actors:** CEO, Plant Manager, Department Heads.
* **Inputs:** Aggregated data from all ERP modules.
* **Outputs:** KPI Dashboards (OEE, Yield %, Revenue, Open Non-Conformances).
* **Business Rules:** Dashboards must refresh at least hourly. Financial data must be restricted to executive roles.
* **Dependencies:** Continuous data flow from the edge server to the reporting replica.
* **Possible Exceptions:** Data sync delays due to WAN outages.
* **Potential Risks:** Making strategic decisions based on stale or inaccurate dashboard data.
* **Future Improvements:** Natural language AI queries (e.g., "What was the average tahini yield on Shift B last week?").

### 5.4 Notifications
* **Purpose:** To alert relevant personnel to critical events, bottlenecks, or required actions.
* **Actors:** System (Sender), All Users (Receivers).
* **Inputs:** System triggers (e.g., low inventory, failed QC test, pending approval).
* **Outputs:** In-app alerts, SMS, Emails.
* **Business Rules:** Critical alerts (e.g., machine failure) must escalate to higher management if unacknowledged within 15 minutes.
* **Dependencies:** Configured notification thresholds.
* **Possible Exceptions:** Notification fatigue if thresholds are too sensitive.
* **Potential Risks:** Critical alerts being ignored leading to operational failures.
* **Future Improvements:** Context-aware mobile push notifications for managers walking the floor.

### 5.5 Approval Workflow
* **Purpose:** To enforce internal controls and separation of duties for sensitive actions (e.g., PO generation, Recipe changes, Credit limit overrides).
* **Actors:** Initiators, Approvers (Managers/Executives).
* **Inputs:** Action Request (e.g., "Approve PO #1002").
* **Outputs:** Approved/Rejected Status, Audit Log entry.
* **Business Rules:** Approvers cannot approve their own requests. Approvals must be digitally signed and timestamped.
* **Dependencies:** Properly configured Role-Based Access Control (RBAC) hierarchy.
* **Possible Exceptions:** Approver is on leave (requires a delegation workflow).
* **Potential Risks:** Bottlenecks in operations if approvers are unresponsive.
* **Future Improvements:** Mobile app specifically for one-click executive approvals.
