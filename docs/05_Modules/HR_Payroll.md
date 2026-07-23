# Module Specification Document
## Human Resources and Payroll Module (HCM)
**System:** KIYAN Factory ERP (Adaptable for Generic Enterprise Manufacturing)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, IIoT/Biometric Ready

---

## 1. Objective & Scope
This document outlines the official specification for the Human Resources and Payroll Module. Functioning as the Human Capital Management (HCM) core of the enterprise, this module tracks the entire employee lifecycle from onboarding to offboarding. In a manufacturing context, this module is deeply intertwined with production operations, as it governs employee availability, machine operating certifications, and direct/indirect labor cost allocations.

---

## 2. Organization & Core Profiles

### 2.1 Departments & Job Titles
*   **Purpose:** To establish the hierarchical reporting structure and classify labor for cost accounting and permission matrices.
*   **Workflow:** HR Director defines Department (e.g., `Production`, `Maintenance`, `QA`) ➔ Creates Job Titles within the Department (e.g., `Roaster Operator`, `QA Analyst`) ➔ Assigns reporting lines.
*   **Business Rules:** Every Job Title must map to a specific Department. Job Titles define whether an employee is considered Direct Labor (COGS) or Indirect Labor (Overhead).
*   **Validation:** Department names and Job Title codes must be unique.
*   **Permissions:** `ORG_CHART_MANAGE`.
*   **Notifications:** Alert to IT/Admin when a new department is created to establish group email lists or system roles.
*   **Reports:** Headcount by Department, Organizational Chart.
*   **KPIs:** Labor Cost per Department.

### 2.2 Employee Profiles & Documents
*   **Purpose:** The central Master Data record for all staff, containing demographic, financial, and legal compliance data.
*   **Workflow:** HR onboards candidate ➔ Enters personal details, Job Title, and Bank Account ➔ Uploads Contracts, IDs, and Health Certificates ➔ Profile is `ACTIVE`.
*   **Business Rules:** In food manufacturing, specific documents (e.g., Food Handler Health Certificates) are mandatory. If a Health Certificate expires, the employee is automatically blocked from being assigned to shop-floor Production Orders.
*   **Validation:** National ID / Passport Number must be strictly unique.
*   **Permissions:** `EMPLOYEE_CREATE`, `EMPLOYEE_VIEW_SENSITIVE`.
*   **Notifications:** Automated alerts to HR and the Employee 30/15 days before a Visa, Contract, or Health Certificate expires.
*   **Audit Logs:** Strict logging of any changes to Bank Account details (anti-fraud) or Base Salary.
*   **Reports:** Employee Directory, Expiring Documents Register, Turnover Report.
*   **KPIs:** Employee Turnover Rate, Average Tenure.

---

## 3. Time, Attendance & Scheduling

### 3.1 Shifts & Production Calendars
*   **Purpose:** To define the working hours, break times, and operational cycles of the factory.
*   **Workflow:** HR defines Shift Templates (e.g., `Morning 06:00-14:00`, `Night 22:00-06:00`) ➔ Assigns employees or entire departments to specific shift rotations.
*   **Business Rules:** Shifts dictate late-arrival thresholds and overtime eligibility rules.
*   **Validation:** Shift start and end times cannot logically overlap in a single definition.
*   **Dependencies:** Production Planning (Requires shift data for Capacity Planning).
*   **Permissions:** `SHIFT_SCHEDULE_MANAGE`.
*   **Reports:** Shift Roster, Coverage Gap Analysis.

### 3.2 Attendance & Overtime
*   **Purpose:** To accurately capture hours worked for payroll processing and production labor costing.
*   **Workflow:** Employee clocks in/out (via UI, RFID, or Biometrics) ➔ System calculates actual hours vs. Shift scheduled hours ➔ Computes Late Minutes, Early Departures, and Overtime.
*   **Business Rules:** Overtime (OT) is generally not paid automatically just because an employee clocks out late; it requires a manager's explicit `OVERTIME_APPROVAL` to convert recorded extra hours into payable OT.
*   **Validation:** An employee cannot clock out if they haven't clocked in.
*   **Dependencies:** Hardware Integration Layer (for API endpoints receiving clock events).
*   **Notifications:** Alert to Shift Manager if critical personnel (e.g., Boiler Operator) fail to clock in within 15 minutes of shift start.
*   **Audit Logs:** Tracks manual overrides of clock-in/out times by HR.
*   **Reports:** Daily Attendance Sheet, Absenteeism Report, Overtime Accumulation.
*   **KPIs:** Absenteeism Rate, Overtime Cost Ratio.

### 3.3 Leave Requests & Vacations
*   **Purpose:** To manage paid and unpaid time off, tracking accrual balances and ensuring operational coverage.
*   **Workflow:** Employee submits Leave Request (e.g., Sick, Annual, Maternity) ➔ Direct Manager approves (operational check) ➔ HR approves (balance check) ➔ System deducts from annual balance.
*   **Business Rules:** Annual leave balances accrue based on tenure and contract terms. If a request exceeds the accrued balance, the excess is automatically mapped as Unpaid Leave (triggering a payroll deduction).
*   **Validation:** Leave end date must be $\ge$ start date.
*   **Permissions:** `LEAVE_REQUEST_SUBMIT`, `LEAVE_APPROVE`.
*   **Notifications:** Alert to Production Planner when leave is approved so capacity can be adjusted.
*   **Reports:** Leave Balance Summary, Department Out-of-Office Calendar.

---

## 4. Payroll & Compensation

### 4.1 Payroll Processing (The Run)
*   **Purpose:** To accurately calculate Net Pay based on Base Salary, Attendance, Overtime, and variable modifiers.
*   **Workflow:** HR initiates Monthly Payroll Run ➔ System fetches Base Salaries ➔ Fetches Unpaid Leave & Lateness ➔ Fetches Approved Overtime, Bonuses, and Penalties ➔ Calculates Gross Pay ➔ Deducts Taxes and Social Insurance ➔ Calculates Net Pay ➔ CFO Approves ➔ Generates Bank Transfer File & Accounting JEs.
*   **Business Rules:** Payroll processing is a locked transactional batch. Once `APPROVED` and `POSTED`, individual payslips cannot be edited. Corrections require an adjustment in the *subsequent* month's payroll.
*   **Validation:** The system hard-blocks generating a payroll run for a period that has already been closed.
*   **Dependencies:** Accounting Module (Posts Debit to Salary Expense, Credit to Accrued Payroll/Cash).
*   **Permissions:** `PAYROLL_GENERATE`, `PAYROLL_APPROVE`.
*   **Notifications:** Automated digital payslips emailed to employees upon CFO approval.
*   **Audit Logs:** Irreversible log of the CFO's digital signature locking the payroll batch.
*   **Reports:** Master Payroll Register, Tax Withholding Summary, Bank Transfer Export (CSV/XML).
*   **KPIs:** Total Payroll Cost, Overtime % of Total Payroll.

### 4.2 Bonuses, Penalties & Loans
*   **Purpose:** To handle all ad-hoc financial additions or deductions to an employee's compensation.
*   **Workflow (Loans):** Employee requests Loan/Advance ➔ HR & Finance approve ➔ Installment schedule generated ➔ System automatically deducts installment from subsequent payroll runs until balance is zero.
*   **Workflow (Bonuses/Penalties):** Manager submits a Bonus (e.g., "Production Target Met") or Penalty (e.g., "Safety Violation") ➔ HR approves ➔ Appended to the current month's payroll.
*   **Business Rules:** Total monthly loan deductions plus penalties cannot exceed a legally mandated percentage of the employee's Base Salary (e.g., max 30% deduction).
*   **Validation:** Loan requests cannot exceed the maximum allowance dictated by the employee's tenure/grade.
*   **Permissions:** `BONUS_PENALTY_MANAGE`, `LOAN_APPROVE`.
*   **Reports:** Outstanding Employee Loans, Penalty Reason Pareto.

---

## 5. Talent Management & Development

### 5.1 Performance Reviews
*   **Purpose:** To formalize employee evaluation, driving promotions, annual raises, and identifying underperformers.
*   **Workflow:** HR schedules Annual Review ➔ Manager completes appraisal form (scoring KPIs, Core Values) ➔ 1-on-1 meeting held ➔ Employee signs off ➔ Final rating recorded.
*   **Business Rules:** Review scores are directly linked to the annual Bonus calculation matrix.
*   **Validation:** Required fields and qualitative justification for extreme scores (e.g., 1/5 or 5/5) must be populated.
*   **Permissions:** `PERFORMANCE_REVIEW_MANAGE`.
*   **Notifications:** Reminder to Managers to complete pending appraisals before the deadline.
*   **Reports:** Departmental Performance Distribution (Bell Curve), Top Performers List.

### 5.2 Training Records & Certifications
*   **Purpose:** Crucial for manufacturing compliance, ensuring only competent and legally certified staff operate hazardous machinery or handle food.
*   **Workflow:** Employee completes Training (e.g., `Forklift Operation`, `HACCP Level 2`) ➔ HR logs the Training Record ➔ Attaches Certificate and Expiry Date.
*   **Business Rules:** The Production Order Module (MES) reads this data. If an operator's `Roasting Machine Safety` certification is missing or expired, the MES UI will physically block them from logging into that Work Center.
*   **Validation:** Mandatory Expiry Date for compliance-related training.
*   **Dependencies:** Production Order Module (Operator Verification), Quality Module (QMS).
*   **Notifications:** Alert to Training Manager 60 days before critical certifications expire.
*   **Reports:** Skills Matrix, Expired Certifications Risk Report.

---

## 6. Future Expansion (Roadmap)

To ensure the HCM module scales with modern factory requirements, the architecture incorporates the following future-readiness:

*   **Biometric Attendance Integration:** The Attendance engine exposes a highly scalable API endpoint designed to receive high-frequency webhook payloads from physical Biometric terminals (Fingerprint, Facial Recognition, Iris scanners). This will bypass manual UI clock-ins entirely, preventing "buddy punching."
*   **Employee Self-Service (ESS) Mobile App:** Headless APIs allow for a future mobile application where employees can view payslips, request leave, and view their shift schedules from their personal devices.
*   **Automated Skill Routing:** Future AI integration with Production Planning, where the system automatically maps the most highly-rated operators (based on Performance Reviews and Training Yields) to the most complex Production Orders dynamically.
