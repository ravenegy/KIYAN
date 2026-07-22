# Module Specification Document
## Authentication & Identity Module
**System:** KIYAN Factory ERP
**Prepared by:** Senior Enterprise Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Desktop-First

---

## 1. Objective
To design a secure, scalable, and enterprise-grade Authentication and Identity Module for the KIYAN Factory ERP. This module acts as the gatekeeper for all system interactions, ensuring strict access control, identity verification, and non-repudiation of user actions. The architecture is designed to operate 100% autonomously on the local edge server, ensuring zero disruption to factory operations during internet outages, while seamlessly supporting future state replication to cloud environments.

---

## 2. Module Scope
This module encapsulates the complete identity lifecycle and session management workflows, including:
*   **Login & Authentication:** Standard credentials and rapid shift-based authentication for shared factory workstations.
*   **Logout & Session Revocation:** Manual and automated session termination.
*   **Password Management:** User-initiated password changes, administrator resets, and forced password changes on initial login.
*   **Session Management:** Token issuance, validation, sliding expiration, and concurrent session limits.
*   **Security Enforcement:** Password policies, account lockout mechanisms, and brute-force protection.
*   **Multi-User Workstation Support:** Facilitating fast switching between operators on a shared shop-floor tablet.
*   **Security Logging:** Immutable auditing of all identity-related events (successes and failures).

---

## 3. User Stories

### Factory Floor & Operations
*   **As a Shop Floor Operator**, I want to log in quickly using a dedicated workstation PIN so that I can switch shifts or log production yield without typing a complex password with gloves on.
*   **As a Shop Floor Operator**, I want the system to automatically log me out after a brief period of inactivity on a shared terminal, so that my account isn't accidentally used by another worker.

### Back Office & Management
*   **As a Department Manager**, I want to be prompted to change my password on my first login, so that my default credentials are secured immediately.
*   **As an Accountant**, I want my session to remain active throughout my standard 8-hour shift while I am actively working, without being repeatedly prompted to log in.
*   **As an Administrator**, I want to be able to manually reset an employee's password and force them to change it on their next login, so that I can resolve forgotten password requests securely.
*   **As an Administrator**, I want to view a security audit log of all failed login attempts, so that I can identify potential insider threats or brute-force attacks.
*   **As an Administrator**, I want the system to automatically lock an account after 5 failed attempts, so that the system is protected against password guessing.

---

## 4. Functional Requirements

### 4.1 Standard Login
*   **Purpose:** Authenticate standard back-office and management users.
*   **Inputs:** Username, Password.
*   **Outputs:** Access Token, Refresh Token, User Profile (Basic), Roles/Permissions list.
*   **Validation Rules:** Username and Password cannot be empty.
*   **Business Rules:** If the account is locked, reject immediately. If "Require Password Change" is flagged, authenticate but restrict access to the "Change Password" workflow only.
*   **Dependencies:** User record, Password Policy settings.
*   **Failure Cases:** Invalid credentials, Account disabled, Account locked.
*   **Edge Cases:** Login attempt exactly at the moment the account is being disabled by HR.

### 4.2 Fast Workstation Login (Shop Floor)
*   **Purpose:** Allow rapid, secure authentication for operators sharing a single physical device on the production floor.
*   **Inputs:** Employee ID / Workstation PIN.
*   **Outputs:** Short-lived Access Token, Shift Session Context.
*   **Business Rules:** Workstation PINs are only valid on designated factory floor IP addresses/devices. The session timeout is significantly shorter (e.g., 15 minutes of inactivity).
*   **Failure Cases:** Invalid PIN, IP address not whitelisted for fast login.

### 4.3 Logout
*   **Purpose:** Terminate the user's active session.
*   **Inputs:** Valid Access Token / Refresh Token.
*   **Outputs:** Success acknowledgment.
*   **Business Rules:** The specific refresh token is marked as revoked in the database. Client-side state must be cleared.
*   **Dependencies:** Active User Session record.
*   **Failure Cases:** Token already revoked (idempotent success should be returned).

### 4.4 Change Password
*   **Purpose:** Allow a user to update their credentials securely.
*   **Inputs:** Current Password, New Password, Confirm New Password.
*   **Outputs:** Success acknowledgment, audit log entry.
*   **Validation Rules:** New Password must match Confirm New Password. New Password must meet complexity requirements. New Password cannot match the Current Password.
*   **Business Rules:** Successfully changing a password immediately revokes all *other* active sessions for that user across all devices. Clears the "Require Password Change" flag.
*   **Failure Cases:** Current password incorrect, complexity rules violated.

### 4.5 Administrator Password Reset
*   **Purpose:** Allow HR or IT to reset a forgotten password.
*   **Inputs:** Target User ID, Admin Credentials, New Temporary Password.
*   **Outputs:** Success acknowledgment, audit log entry.
*   **Business Rules:** Automatically sets the "Require Password Change" flag on the target user's account. Revokes all active sessions for the target user immediately.
*   **Dependencies:** Administrator must possess the `RESET_PASSWORDS` permission.

---

## 5. Non-Functional Requirements

*   **Security:** Passwords must never be stored in plain text or easily reversible formats. Tokens must be cryptographically signed and unalterable.
*   **Performance:** The login validation and token issuance process must complete in under 200 milliseconds to prevent workflow bottlenecks during shift changes.
*   **Offline Behaviour:** Authentication MUST occur strictly against the local Edge Server. The system must not require external DNS resolution or cloud API availability to validate credentials.
*   **Reliability:** The authentication service is the gateway to the ERP; it must be highly resilient and fail gracefully, logging critical errors locally.
*   **Availability:** 99.99% uptime required during factory operational hours.
*   **Scalability:** The token verification mechanism (JWT) must be stateless to allow horizontal scaling of the Edge Server application nodes without requiring session affinity (sticky sessions).
*   **Maintainability:** Password complexity rules and lockout thresholds must be configurable via system settings, not hardcoded.

---

## 6. Security Specification

### 6.1 Password Policy
*   Minimum length: 12 characters (Back office), 4-digit PIN (Shop Floor Fast Login).
*   Complexity (Back office): Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.
*   Dictionary checks: Passwords cannot match the username, employee name, or company name ("KIYAN").

### 6.2 Password Encryption Strategy
*   **Algorithm:** Argon2id.
*   **Salting:** Cryptographically secure random salt generated per user.
*   **Transmission:** Passwords must only be transmitted over TLS 1.3 encrypted channels.

### 6.3 Session Security
*   **Architecture:** JWT (JSON Web Tokens) with asymmetric signing (RS256).
*   **Access Token:** Short-lived (e.g., 15 minutes). Contains User ID and core Roles.
*   **Refresh Token:** Long-lived, sliding expiration (e.g., 12 hours). Stored securely (HttpOnly cookie or encrypted local storage in Electron). Validated against the database upon use to allow immediate centralized revocation.
*   **Token Invalidation:** Modifying a user's roles, locking their account, or changing their password must instantly invalidate their Refresh Token family.

### 6.4 Authentication Flow
1.  Client submits credentials.
2.  Server verifies credentials and checks lockout status.
3.  Server generates Refresh Token and stores its hash/ID in the `user_sessions` table.
4.  Server generates Access Token.
5.  Server returns both tokens to the client.
6.  Client attaches Access Token to Authorization header for subsequent API calls.

### 6.5 Account Lockout & Brute Force Protection
*   **Threshold:** 5 consecutive failed login attempts within a 15-minute window.
*   **Action:** Account is locked.
*   **Resolution:** Account automatically unlocks after 30 minutes, OR can be manually unlocked by an Administrator.

### 6.6 Audit Logging
*   All identity events (Login Success, Login Failure, Logout, Password Change, Password Reset, Account Lock, Account Unlock) must be immutably recorded in the security audit log, capturing Timestamp, IP Address, Device Fingerprint, and Target User ID.

---

## 7. Business Rules

1.  **BR-AUTH-01:** Users cannot log in if their linked HR Employee record is marked as "Terminated" or "Suspended".
2.  **BR-AUTH-02:** A newly created user account must have the `must_change_password` flag set to `true`.
3.  **BR-AUTH-03:** Users flagged with `must_change_password` are restricted to the `ChangePassword` API route and cannot access any other ERP module until the password is changed.
4.  **BR-AUTH-04:** Shop floor PIN logins are restricted to devices located on the internal Factory VLAN. Attempts to use PIN login from external networks (VPN/Cloud) will be rejected.
5.  **BR-AUTH-05:** Concurrent active sessions are permitted, but an Administrator resetting a password must globally revoke all sessions.

---

## 8. Exceptions

*   `InvalidCredentialsException`: Thrown when the username, password, or PIN is incorrect. (Message must be generic: "Invalid username or password" to prevent user enumeration).
*   `AccountLockedException`: Thrown when a user attempts to log in to an account that has exceeded the failed attempt threshold.
*   `AccountDisabledException`: Thrown when an inactive/terminated user attempts to log in.
*   `PasswordRequirementsNotMetException`: Thrown during a password change if the new password violates the company complexity policy.
*   `SessionExpiredException`: Thrown when a refresh token has expired or been explicitly revoked.
*   `NetworkRestrictionException`: Thrown when a user attempts a Fast PIN login from an unauthorized IP subnet.
*   `PasswordChangeRequiredException`: Thrown/Signaled when a user successfully authenticates but must immediately change their password.

---

## 9. Module Dependencies

The Authentication module interacts with the following Bounded Contexts:

*   **Users / Identity Module (Internal):** Directly reads and updates the `users` and `user_sessions` tables.
*   **Roles & Permissions (Internal):** Retrieves the access profiles associated with the authenticating user to embed minimal authorization claims into the JWT Access Token.
*   **Audit Logs (Shared Kernel):** Dispatches security events (e.g., `UserLoggedInEvent`, `FailedLoginAttemptEvent`) to the centralized Audit Logging service.
*   **Settings (Core / Config):** Reads company-wide security settings (e.g., Lockout Thresholds, Password Complexity Rules) to enforce dynamic policies.
*   **Human Resources (HR Module):** Asynchronously listens for `EmployeeTerminatedEvent` to immediately disable the associated User account and revoke active sessions. (Communication strictly via Domain Events).
