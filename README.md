# Implement Client Script & UI Policy (Incident)

SkillWallet Group Project: ServiceNow System Administrator  
**Student:** Seneka S (`senekaselvamani2007@gmail.com`)  
**Instance:** `https://dev300679.service-now.com`  

---

## 1. Overview
This project configures dynamic form controls and client-side validations on the ServiceNow **Incident** table using **UI Policies**, **UI Policy Actions**, and **Client Scripts** (`onChange`, `onSubmit`, `onCellEdit`).

---

## 2. Implemented Configurations

### Milestone 1 & 2: UI Policy & Actions
- **UI Policy Name:** `High Impact Control`
  - **Table:** `incident`
  - **Active:** `true`
  - **Condition:** `impact=1^EQ` (Impact is 1 - High)
  - **Reverse if false:** `true`
  - **Global:** `true`
- **UI Policy Action 1:**
  - **Field:** `assignment_group`
  - **Mandatory:** `true`
- **UI Policy Action 2:**
  - **Field:** `urgency`
  - **Read-only (`disabled`):** `true`
  - **Visible:** `Leave alone` (`ignore`)

### Milestone 3: onChange Client Script
- **Name:** `Auto set urgency for high impact`
- **Table:** `incident`
- **Type:** `onChange`
- **Field name:** `impact`
- **Script Location:** [`scripts/client_script_onChange_impact.js`](scripts/client_script_onChange_impact.js)
- **Logic:** When `newValue == '1'`, automatically sets `urgency` to `'1'` and prints info banner: `"Urgency set to High for High impact incident."`.

### Milestone 4: onSubmit Client Script
- **Name:** `Prevent save if Assigned To missing`
- **Table:** `incident`
- **Type:** `onSubmit`
- **Script Location:** [`scripts/client_script_onSubmit_assigned_to.js`](scripts/client_script_onSubmit_assigned_to.js)
- **Logic:** Checks if `impact == '1'` and `assigned_to` is empty. If empty, displays an inline field error message `"Assigned To is mandatory for High impact incidents."` and aborts submission (`return false`).

### Milestone 5: onCellEdit Client Script
- **Name:** `Prevent state change via list edit`
- **Table:** `incident`
- **Type:** `onCellEdit`
- **Field name:** `state`
- **Script Location:** [`scripts/client_script_onCellEdit_state.js`](scripts/client_script_onCellEdit_state.js)
- **Logic:** Intercepts inline list cell edits on the `state` column, alerts `"State cannot be updated using list editing. Please open the Incident."`, and rejects the change with `callback(false)`.

---

## 3. Test & Verification Results (Milestone 6)

| Test Activity | Action Performed | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| **Activity 1: Mandatory Enforcement** | Set Impact = 1 on Incident form, left Assigned To blank, clicked Save | Urgency auto-sets to 1; Urgency becomes read-only; Assignment Group becomes mandatory; form submission blocked with field message on Assigned To | All triggered as expected. Error banner and field message rendered. | **PASS** |
| **Activity 2: Successful Save** | Populated Assigned To (`David Loo`) with Impact = 1 | Record saves successfully | Incident `INC0010001` created/updated with Priority 1 - Critical. | **PASS** |
| **Activity 3: Reverse Condition Test** | Changed Impact back to 2 - Medium | Assignment Group mandatory reverts to false; Urgency read-only reverts to false; form saves | Reverted accurately and saved. | **PASS** |
| **Activity 4: List Edit Blocking** | Double-clicked `State` column in Incident list view, changed value, and clicked Save icon | Alert pops up and modification rejected | Alert displayed, list edit canceled, state remains untouched. | **PASS** |
| **Activity 5: Form-Based Update** | Opened Incident form, updated State to In Progress/On Hold, and saved | State change saved successfully without restriction | Record updated cleanly. | **PASS** |

---

## 4. SkillWallet Project Status
- **Progress:** 100% Completed
- **All 7 Epics & 11 Activities:** Completed
- **Demo Link:** `https://dev300679.service-now.com`
