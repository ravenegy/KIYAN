# Module Specification Document
## Reports & Business Intelligence (BI) Module
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, OLAP/OLTP Segregated, Read-Replica Ready

---

## 1. Objective & Scope
This document outlines the official specification for the Reports & Business Intelligence (BI) Module. As the analytical brain of the ERP, this module transforms raw transactional data from all operational modules into actionable, strategic insights. It serves all tiers of the enterprise—providing real-time operational dashboards for shop-floor supervisors, tactical reports for department managers, and high-level financial aggregations for the executive board.

---

## 2. Core BI Features & Capabilities

### 2.1 Analytics & Visualization
*   **Dashboard KPIs:** Role-based, customizable home screens featuring real-time metric widgets (e.g., Today's Revenue, Current Factory OEE, Open Support Tickets).
*   **Charts & Graphing:** Dynamic visual representations of data utilizing best-practice charting (e.g., Pareto charts for Scrap/Defects, Line charts for Revenue trends, Heatmaps for Warehouse utilization).

### 2.2 Data Manipulation & Delivery
*   **Advanced Filters:** Multi-dimensional querying allowing users to slice data by complex criteria (e.g., "Show all Sales Orders WHERE Status = 'Shipped' AND Margin < 15% AND Date BETWEEN X AND Y").
*   **Saved Reports:** Allows users to save complex filter configurations and column layouts as personalized "Views" for one-click retrieval in the future.
*   **Scheduled Reports:** A cron-driven engine that automatically generates and emails specific reports to designated stakeholders at defined intervals (e.g., "Email the Daily Shift Production Summary to the Factory Manager every day at 06:00 AM").

### 2.3 Export & Output Formats
*   **Export PDF:** Generates pixel-perfect, immutable, branded documents suitable for external distribution, board meetings, or compliance audits.
*   **Export Excel (.xlsx):** Preserves column data types (numbers, dates) and allows for post-export manipulation, pivot tables, and financial modeling by analysts.
*   **CSV Export:** High-speed, raw flat-file data extraction for ingestion into third-party tools or legacy systems.
*   **Print:** Optimized CSS print media queries ensuring reports print cleanly without web navigation UI elements.

---

## 3. Report Catalog by Domain

The BI Module centralizes reporting across the entire ERP ecosystem:

### 3.1 Financial & Management Reports
*   **Executive Dashboard:** High-level roll-up of Gross Revenue, Operating Expenses, Net Margin, and Cash Flow.
*   **Financial Statements:** Trial Balance, Profit & Loss (Income Statement), Balance Sheet, Statement of Cash Flows.
*   **Cost Center Analysis:** Budget vs. Actual spend broken down by department or production line.
*   **AR/AP Aging:** 30/60/90+ day analysis of outstanding customer debt and vendor liabilities.

### 3.2 Production & Maintenance Reports
*   **OEE (Overall Equipment Effectiveness):** The master manufacturing KPI combining Availability, Performance, and Quality metrics per machine.
*   **Manufacturing Yield Variance:** Compares theoretical BOM expected yield vs. actual shop-floor yield.
*   **Maintenance Reports:** Mean Time Between Failures (MTBF), Mean Time to Repair (MTTR), and Preventative Maintenance Compliance Rate.

### 3.3 Inventory & Warehouse Reports
*   **Stock Aging & Expiry Risk:** Highlights FEFO inventory at risk of expiring before it can be consumed or sold (critical for food manufacturing).
*   **Inventory Valuation:** Tracks real-time monetary value of stock (Moving Average Cost vs. Standard Cost).
*   **Warehouse Utilization:** Heatmaps showing empty bin capacity vs. full bins across different facility zones.

### 3.4 Quality & Operational Reports
*   **Cost of Poor Quality (COPQ):** Financial calculation of scrap, rework labor, and returned goods.
*   **First Pass Yield (FPY):** Percentage of goods manufactured correctly the first time without rework.
*   **Supplier Defect Rate:** Percentage of incoming raw material lots rejected by QA at the dock.

### 3.5 Sales & Purchasing Reports
*   **Order-to-Cash (O2C) Cycle:** Average time from Sales Order creation to final Invoice payment.
*   **Procure-to-Pay (P2P) Cycle:** Average time from Purchase Requisition to Vendor Payment.
*   **Sales Margin Erosion:** Tracks discounts given by the sales team against standard price lists.
*   **Supplier Spend Analysis:** Total procurement volume categorized by vendor and material category.

### 3.6 Human Resources (HR) Reports
*   **Labor Efficiency Variance:** Standard expected labor hours (from BOMs) vs. actual clocked hours on the shop floor.
*   **Overtime Analysis:** Financial impact of overtime hours mapped to specific shifts or departments.
*   **Absenteeism & Turnover:** Tracks workforce stability metrics.

---

## 4. System Architecture & Mechanics

### 4.1 Data Sources & Aggregation
*   **Source of Truth:** Data is queried directly from the ERP's primary PostgreSQL relational database, ensuring 100% synchronization with operational reality.
*   **Materialized Views:** For highly complex, historical aggregations (e.g., Year-over-Year Sales Data across millions of rows), the system utilizes Materialized Views that refresh on a schedule to provide instant load times without taxing the transactional engine.

### 4.2 Performance Strategy (OLTP vs. OLAP)
*   To prevent massive analytical queries from slowing down mission-critical shop-floor operations (OLTP - Online Transaction Processing), the BI architecture is designed to eventually support **Read-Replicas**.
*   Heavy reports are routed to a synchronized read-only database node, ensuring that generating a 5-year financial history report does not delay a warehouse worker scanning a barcode.
*   **Pagination & Lazy Loading:** UI grids enforce strict server-side pagination and lazy-loading to handle millions of rows gracefully in the browser.

### 4.3 Business Rules & Validation
*   **Temporal Accuracy:** Financial reports strictly respect accounting period locks. A P&L run for a locked prior month must yield the exact same result today as it did a year ago.
*   **Data Immutability:** Exported PDFs are stamped with a generation timestamp and user UUID to guarantee document provenance.
*   **Calculation Consistency:** KPIs like OEE or Moving Average Cost utilize centralized, shared backend calculation engines. A metric viewed on a Dashboard uses the exact same math as a metric exported to Excel.

### 4.4 Permissions & Data Governance
Security in the BI module operates on a strict Principle of Least Privilege, implementing **Row-Level Security (RLS)** and module-level access:
*   `REPORT_FINANCE_VIEW`: Grants access to P&L and Ledgers.
*   `REPORT_SALES_VIEW`: Grants access to Sales pipelines, but restricts viewing of underlying Cost of Goods Sold (COGS) margins unless `MARGIN_VIEW` is also held.
*   `REPORT_HR_VIEW_SENSITIVE`: Restricts access to payroll and personal demographic reporting.
*   **Branch/Facility Isolation:** A Production Manager at Facility A can only run OEE reports for Facility A's machines, whereas the Global VP of Manufacturing can run aggregated reports across all facilities.

---

## 5. Future Analytics Expansion (Roadmap)

To transition the ERP from a system of *record* to a system of *intelligence*, the following capabilities are planned:

*   **Data Warehouse / Data Lake Integration:** Automated ETL (Extract, Transform, Load) pipelines to push ERP data nightly into Snowflake or Google BigQuery for enterprise-wide correlation with external data sources.
*   **Predictive Analytics (Machine Learning):** Utilizing historical consumption and sales data to auto-generate predictive baseline forecasts for Production Planning and Purchasing.
*   **External BI Tool Support:** Exposing secure OData / GraphQL endpoints to allow finance teams to connect direct live-feeds into Microsoft PowerBI or Tableau.
*   **Natural Language Query (LLM Integration):** Allowing executives to type conversational queries (e.g., "Show me the top 5 raw materials causing production delays this month") and dynamically generating the SQL and charting required to answer it.
