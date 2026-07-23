# Module Specification Document
## Recipe & Bill of Materials (BOM) Module
**System:** Generic Manufacturing ERP (KIYAN Factory Profile)
**Prepared by:** Enterprise ERP Solution Architect
**Date:** July 2026
**Architecture Environment:** Modular Monolith, Offline-First, Multi-Industry Ready

---

## 1. Objective & Scope
This document outlines the official specification for the Recipe & Bill of Materials (BOM) Module. This module is the engineering core of the manufacturing ERP. It defines the exact formulas, ingredients, packaging, and expected yields required to transform raw materials into finished goods. The architecture is explicitly designed to be industry-agnostic—equally capable of handling process manufacturing (e.g., mixing Tahini, blending chemicals) and discrete manufacturing (e.g., assembling electronics) without fundamental code changes.

---

## 2. Core Architectural Concepts

*   **Master Recipe vs. Version:** A Master Recipe acts as a logical container for a specific Target Product. It holds multiple immutable "Versions" (e.g., v1.0, v2.0), allowing the factory to iterate on formulas while preserving historical integrity.
*   **Multi-Industry Abstraction:** The module abstracts "Ingredients" and "Parts" into a generic `BOM_Component`. It abstracts "Evaporation" or "Off-cuts" into `Waste_Percentage`. This semantic flexibility ensures the same architecture supports a food factory and a furniture plant.
*   **Immutability:** Once a Recipe Version is used in a Production Order, it is permanently locked. Any adjustment requires a new version.

---

## 3. Feature Specifications

### 3.1 Master Recipe Management (Multiple Recipes)
*   **Purpose:** Defines the overarching blueprint mapping inputs to a specific Semi-Finished or Finished Product. Supports managing multiple alternative recipes for the same product (e.g., "Standard Tahini" vs. "Low-Cost Tahini" depending on raw material availability).
*   **Workflow:** R&D Engineer creates a new Master Recipe ➔ Selects the Target Output Product ➔ Creates the first Draft Version.
*   **Business Rules:** A Master Recipe must be tied to exactly one primary Target Product. Multiple ACTIVE Master Recipes can exist for a single product to support alternate manufacturing lines.
*   **Version Control:** Acts as the parent entity for all iterative versions.
*   **Dependencies:** Product Management Module.
*   **Validation:** Target Product must exist and possess an `ACTIVE` status.
*   **Approval Process:** N/A (Approval is delegated to the specific Version).
*   **Cost Calculation:** Displays the cost of the currently ACTIVE default version.
*   **Future Expansion:** Multi-plant capability where alternative recipes are automatically routed based on the facility executing the production order.

### 3.2 BOM Components (Ingredient List & Packaging Materials)
*   **Purpose:** Defines the exact inputs required to manufacture the target yield.
*   **Workflow:** Inside a Draft Version, the engineer adds lines for Raw Materials (Ingredients) and Packaging Materials, specifying exact required quantities.
*   **Business Rules:** Quantities must be defined relative to the target yield (e.g., to make 1000kg of paste, require 1020kg of raw sesame).
*   **Version Control:** Modifying a component, swapping an ingredient, or changing a quantity mandates the creation of a new Recipe Version.
*   **Dependencies:** Raw Material Module, Product Management Module.
*   **Validation:** Cannot add `DEPRECATED`, `OBSOLETE`, or incompatible product types to the BOM. Unit of Measure (UOM) must be valid and convertible.
*   **Approval Process:** Substitution of critical ingredients requires a secondary QC sign-off during the version approval phase.
*   **Cost Calculation:** Multiplies the required quantity by the Moving Average Cost (MAC) or Standard Cost of the component.
*   **Future Expansion:** Support for "Phantom BOMs" (transient sub-assemblies) and deep multi-level BOM flattening for complex discrete manufacturing industries.

### 3.3 Production Outputs (Yield, By-products & Waste Percentage)
*   **Purpose:** Accurately models the physical transformation process, capturing what comes out of the machine alongside the primary product.
*   **Workflow:** Define the Target Yield (e.g., 1000kg) ➔ Define expected Waste Percentage (e.g., 2% lost to evaporation/machine residue) ➔ Define salable By-products (e.g., 50kg of Sesame Husks sold for animal feed).
*   **Business Rules:** For process manufacturing, the system enforces Mass Balance: *(Total Mass of Inputs = Yield Mass + By-product Mass + Waste Mass)*.
*   **Version Control:** Adjusting the waste tolerance or yield ratio generates a new version.
*   **Dependencies:** Inventory Module (for resulting stock types).
*   **Validation:** System warns if mass balance is violated by >1% (configurable per industry).
*   **Approval Process:** Production Managers must approve the feasibility of the expected yield and waste tolerances.
*   **Cost Calculation:** Total input cost is proportionally divided among the primary Yield and salable By-products. Waste simply absorbs and increases the final unit cost of the primary yield.
*   **Future Expansion:** Dynamic Co-Product costing (e.g., in meat processing, where the cost split between high-grade and low-grade outputs fluctuates based on market value).

### 3.4 Recipe Versioning & History
*   **Purpose:** Maintains a strict, immutable audit trail of formula evolution for regulatory compliance (e.g., FDA, ISO 9001).
*   **Workflow:** User selects an ACTIVE version ➔ Clicks "Revise" ➔ System clones it as a new `DRAFT` version ➔ Edits made ➔ Submitted for approval ➔ New version becomes `ACTIVE`, old version becomes `ARCHIVED`.
*   **Business Rules:** An `ACTIVE` or `ARCHIVED` version is strictly read-only.
*   **Version Control:** Uses strict semantic integer versioning (v1, v2, v3).
*   **Dependencies:** Shared Kernel (Audit Logs).
*   **Validation:** A DRAFT cannot be activated if it contains identical components and yields to the previous version (prevents ghost versions).
*   **Approval Process:** Archiving an old version happens automatically upon the approval of the new version.
*   **Cost Calculation:** Each version maintains a permanent snapshot of its theoretical cost at the exact moment it was approved.
*   **Future Expansion:** A/B testing of different versions simultaneously on the shop floor to determine real-world yield efficiency.

### 3.5 Recipe Validation & Status Management
*   **Purpose:** Ensures no recipe can be executed on the shop floor unless it is chemically, physically, and financially sound.
*   **Workflow:** DRAFT version is built ➔ System runs automated validation checks ➔ User triggers manual approval routing ➔ Status moves from `DRAFT` ➔ `PENDING_APPROVAL` ➔ `ACTIVE`.
*   **Business Rules:** Production Orders can ONLY be linked to `ACTIVE` recipe versions.
*   **Version Control:** Status transitions are the primary mechanism for locking versions.
*   **Dependencies:** Roles & Permissions Module.
*   **Validation:** Automated checks for missing UOMs, obsolete components, zero-quantity lines, and mass balance violations.
*   **Approval Process:** Multi-stage workflow requiring digital signatures (e.g., R&D creates, Finance approves cost, QC approves formulation, Factory Manager activates).
*   **Cost Calculation:** Finance approval is automatically requested if the new version's calculated cost exceeds the previous version by more than a configured threshold (e.g., > 5%).
*   **Future Expansion:** AI-driven validation that suggests optimal ingredient substitutions based on live global market pricing before approval.

### 3.6 Production Cost Calculation (BOM Costing)
*   **Purpose:** To provide a highly accurate Standard Expected Cost for the finished product prior to actual manufacturing.
*   **Workflow:** The system constantly polls the inventory ledger ➔ Aggregates the Moving Average Cost (MAC) of all raw materials and packaging ➔ Deducts the expected value of By-products ➔ Outputs the Total BOM Cost.
*   **Business Rules:** 
    *   *Total BOM Cost = (Sum of Ingredient Costs) + (Sum of Packaging Costs) - (Value of By-products).*
    *   Costing must account for the Waste Percentage (e.g., if you need 100kg but waste 5%, you must price in the cost of 105.26kg of inputs).
*   **Version Control:** The theoretical cost dynamically floats with raw material prices while the version is `DRAFT`. Once `ACTIVE`, a baseline cost snapshot is saved.
*   **Dependencies:** Accounting/Finance Module, Inventory Module.
*   **Validation:** System flags an error if any BOM component has an undefined or zero cost.
*   **Approval Process:** Dramatic fluctuations in the dynamic cost of an active recipe trigger warnings to the Finance team.
*   **Cost Calculation:** (Core Functionality described above).
*   **Future Expansion:** Activity-Based Costing (ABC). Linking Machine Routing to the Recipe to automatically add electricity, labor, and machine depreciation costs directly into the per-unit yield cost.

---
*End of Recipe / BOM Module Specification. This design ensures absolute traceability, flexible scaling across manufacturing paradigms, and rigorous financial control.*
