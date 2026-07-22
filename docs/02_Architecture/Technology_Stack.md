# Official Technology Stack Decision Document
## KIYAN Factory ERP

**Prepared by:** Chief Technology Officer (CTO)
**Date:** July 2026
**Target Architecture:** Offline-First, Local Edge Server with Desktop-First Client
**Industry:** Food Manufacturing

---

## 1. Executive Summary
This document outlines the official technology stack for the KIYAN Factory ERP. The selection prioritizes an **Offline-First**, high-performance architecture capable of operating independently on a local edge server. The stack is designed for a **Desktop-First** user experience on the shop floor and back office, while establishing a robust foundation for future mobile applications and external B2B APIs. Every choice has been made to maximize long-term maintainability, developer velocity, and industrial-grade reliability.

---

## 2. Core Language & Architecture

### Programming Language
*   **Selected:** TypeScript (Strict Mode)
*   **Comparisons:** Java, C# (.NET), Python, TypeScript.
*   **Justification:** TypeScript allows for an isomorphic (full-stack) codebase. We can share Domain Entities, Validation Rules (e.g., BOM requirements, Lot tracing logic), and Data Transfer Objects (DTOs) directly between the backend Edge Server and the Desktop Frontend. This eliminates entire classes of bugs, reduces duplication, and provides a massive talent pool for long-term maintainability.

### Backend Architecture Framework
*   **Selected:** NestJS
*   **Comparisons:** Express.js, Fastify, Spring Boot (Java), ASP.NET Core (C#).
*   **Justification:** NestJS provides a heavily opinionated, enterprise-ready architecture out of the box. It natively supports our chosen **Modular Monolith** and **Domain-Driven Design (DDD)** paradigms. It enforces strict module boundaries, has built-in CQRS modules, and offers exceptional long-term maintainability compared to the "wild west" of raw Express.js.

### Desktop Framework
*   **Selected:** Electron (with React)
*   **Comparisons:** Tauri (Rust), .NET MAUI, Qt.
*   **Justification:** While Tauri offers a lighter memory footprint, Electron is the undisputed king of enterprise desktop apps (VS Code, Slack, Figma). It gives us deep, seamless access to local Node.js APIs (crucial for direct thermal printer hardware integration and COM/Serial port barcode scanners) without needing to write Rust bridging code. React provides a massive ecosystem for modern, responsive UI components optimized for touch-screens on the factory floor.

---

## 3. Data Management & Persistence

### Database
*   **Selected:** PostgreSQL
*   **Comparisons:** MySQL, Microsoft SQL Server, SQLite.
*   **Justification:** PostgreSQL is the world's most advanced open-source relational database. It provides strict ACID compliance for inventory ledgers and financial transactions. Crucially, its world-class `JSONB` support allows us to store highly dynamic Quality Control (QC) test protocols and recipes without constantly altering database schemas. 

### Object-Relational Mapping (ORM)
*   **Selected:** MikroORM
*   **Comparisons:** Prisma, TypeORM, Sequelize.
*   **Justification:** For a DDD-based ERP, we need an ORM that supports the "Data Mapper" pattern and the "Unit of Work" pattern. Prisma is great for rapid development but couples domain logic to the database schema. TypeORM has largely stagnated. MikroORM perfectly separates our pure Domain Entities from persistence mechanics, ensuring the Business Layer remains totally ignorant of the database layer.

---

## 4. Core Infrastructure

### Dependency Injection (DI)
*   **Selected:** NestJS Built-in DI
*   **Comparisons:** TSyringe, InversifyJS.
*   **Justification:** Standardizing on NestJS means we utilize its native, highly optimized Inversion of Control (IoC) container. This avoids third-party library bloat and perfectly handles lifecycle events (singletons, request-scoped instances) required for the Hexagonal Architecture's Port/Adapter swapping.

### Logging
*   **Selected:** Pino
*   **Comparisons:** Winston, Morgan, Bunyan.
*   **Justification:** In a high-throughput factory environment tracking thousands of barcode scans, logging overhead must be minimal. Pino is exceptionally fast and produces structured JSON logs. This allows us to easily ship logs to a centralized ELK stack (Elasticsearch, Logstash, Kibana) in the future for deep application performance monitoring.

### Validation
*   **Selected:** Zod
*   **Comparisons:** class-validator, Yup, Joi.
*   **Justification:** Zod is a TypeScript-first schema declaration and validation library. It allows us to define a schema once and automatically infer the static TypeScript type. We will use Zod to validate incoming API payloads on the backend, and use the exact same Zod schemas for form validation in the React desktop client.

### Configuration Management
*   **Selected:** @nestjs/config (backed by Zod)
*   **Comparisons:** dotenv, config.
*   **Justification:** Environment variables (database URLs, printer IP addresses, cloud sync keys) will be validated at application startup using Zod. If the edge server is misconfigured, the application will "fail fast" and crash immediately with a descriptive error, rather than failing silently during production operations.

---

## 5. Security & Access

### Authentication
*   **Selected:** JSON Web Tokens (JWT) with Sliding Refresh Tokens
*   **Comparisons:** Session (Cookies), OAuth2.
*   **Justification:** JWTs are stateless, which perfectly supports our future REST API and Mobile App requirements without burdening the Edge Server with session memory overhead. The desktop client will store encrypted refresh tokens to maintain logins across shifts, while access tokens will be short-lived (15 minutes) for security.

### Authorization
*   **Selected:** CASL (Isomorphic Authorization)
*   **Comparisons:** Casbin, hardcoded RBAC.
*   **Justification:** CASL allows us to define permissions via rules (e.g., `can('approve', 'PurchaseOrder')`) and share them between the NestJS backend and the React frontend. The UI will automatically hide buttons the user is not authorized to click, while the backend enforces the exact same rule computationally.

---

## 6. Enterprise Output & Reporting

### PDF Generation
*   **Selected:** Puppeteer (Headless Chromium)
*   **Comparisons:** PDFKit, react-pdf.
*   **Justification:** ERP systems require complex, pixel-perfect documents (Invoices, Certificates of Analysis, Bills of Lading) that often include dynamic tables, logos, and barcodes. Writing these in raw PDFKit is excruciating. Puppeteer allows us to design these documents using standard HTML/CSS and render them to perfect PDFs on the edge server.

### Excel Export
*   **Selected:** ExcelJS
*   **Comparisons:** SheetJS, excel4node.
*   **Justification:** SheetJS Pro requires expensive commercial licensing for advanced styling, and the free version is heavily restricted. ExcelJS is open-source, highly performant, supports rich cell styling (crucial for financial ledgers), and can stream large datasets directly to the client to avoid memory crashes on the server.

---

## 7. Factory Floor Integrations

### Barcode & QR Libraries
*   **Selected:** `bwip-js` (Backend) / `JsBarcode` & `qrcode.react` (Frontend)
*   **Comparisons:** native fonts, ZXing.
*   **Justification:** `bwip-js` supports over 100 barcode types natively in Node.js, ensuring we can generate high-resolution images for packaging labels directly on the server. On the frontend, `qrcode.react` provides instant, error-corrected QR code rendering for on-screen scanning.

### Thermal Printing
*   **Selected:** Raw ZPL (Zebra Programming Language) over TCP/IP
*   **Comparisons:** node-thermal-printer, OS Print Spoolers.
*   **Justification:** Factory environments use industrial thermal printers (Zebra, Brother). Bypassing flaky Windows/Linux print spoolers and sending raw ZPL commands directly to the printer's IP address ensures instant, driverless, and bulletproof label printing with zero formatting errors.

---

## 8. QA, Packaging & Deployment

### Testing Framework
*   **Selected:** Vitest (Unit/Integration) & Playwright (E2E)
*   **Comparisons:** Jest, Cypress, Selenium.
*   **Justification:** Vitest is significantly faster than Jest and native to the modern Vite ecosystem, making TDD (Test-Driven Development) a breeze. Playwright is vastly superior to Cypress for E2E testing, allowing us to spin up multiple browser contexts to simulate complex interactions (e.g., a Warehouse Operator and a QC Analyst interacting on different screens simultaneously).

### Packaging
*   **Selected:** Electron Builder
*   **Comparisons:** Electron Forge.
*   **Justification:** Electron Builder is the industry standard for enterprise packaging. It easily handles native Node.js dependencies, creates highly optimized Windows installers (NSIS), and manages code signing certificates efficiently.

### Auto Update
*   **Selected:** electron-updater
*   **Comparisons:** Custom polling.
*   **Justification:** Integrates natively with Electron Builder. Crucially, it supports generic HTTP servers. Because KIYAN is offline-first, we will host the update binaries on the Local Edge Server. The desktop clients on the factory floor will automatically ping the edge server, download updates, and install them silently in the background, ensuring all clients are on the exact same ERP version without needing internet access.
