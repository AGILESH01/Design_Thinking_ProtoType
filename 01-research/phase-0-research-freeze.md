# Phase 0 — Research Freeze & Problem Framing

**Project:** QuickPay / Financial Transfer Experience  
**Date:** September 2026  
**Status:** Frozen (Baseline Established)  

---

## 1. Problem Statement & Objectives
Users transferring money frequently encounter friction, uncertainty, and cognitive overload—particularly around recipient verification, selecting the correct funding source, and confirming transaction details before irreversible execution.

**Primary Objective:** Deliver a frictionless, trustworthy, and rapid end-to-end payment experience that minimizes input errors and builds confidence at each step of the flow.

---

## 2. Target User Persona
- **Primary Persona:** Mobile-first everyday user transferring money to peers, small merchants, or family.
- **Key Pain Points:**
  - Hesitation / anxiety when entering recipient info (fear of sending money to the wrong person).
  - Unclear transaction limits or fees until the final screen.
  - Multi-step clutter when trying to complete a quick repeat payment.
- **Jobs to be Done (JTBD):** "When I need to send money to someone quickly, I want a streamlined, error-preventing flow so that I can transfer funds in seconds with absolute certainty."

---

## 3. Scope & User Flow Specification (The Frozen Baseline)

The baseline flow derived from the paper prototype sketches consists of 6 sequential stages:

```
[Screen 1: Home Dashboard]
         │
         ▼ (Tap "Pay" / "Quick Pay")
[Screen 2: Quick Pay Hub / Mode Selection]
         │
         ▼ (Select / Search Contact or Scan)
[Screen 3: Recipient Selection & Verification]
         │
         ▼ (Enter Value & Optional Note)
[Screen 4: Amount & Currency Input]
         │
         ▼ (Choose Funding Account)
[Screen 5: Payment Method / Source Selection]
         │
         ▼ (Authenticate & Review)
[Screen 6: Confirmation & Receipt]
```

### Detailed Screen Requirements

| Step | Screen | Core Elements & User Actions |
|---|---|---|
| **1** | **Home** | Available balance card, primary CTA ("Pay" / "Quick Pay"), recent recipients/quick avatars, recent activity list, bottom navigation. |
| **2** | **Quick Pay** | Search bar (Name, Phone, Tag/Handle), frequent/recent contacts list, Scan QR code button, Split bill shortcut. |
| **3** | **Recipient** | Contact validation card (avatar, verified badge, masked phone/account number), instant confirmation to prevent mistaken identity. |
| **4** | **Amount** | Large numpad / currency display, available balance preview, preset amount chips ($10, $25, $50, $100), note/memo field. |
| **5** | **Payment Method** | Funding sources list (Primary Checking, Savings, Linked Debit/Credit Card, Wallet Balance), fee disclosure ($0.00), balance indicators. |
| **6** | **Confirmation** | Review modal/screen (Recipient, Amount, Source, Fee, ETA), Biometric / PIN authorization action, Success state with transaction ID and receipt sharing. |

---

## 4. Testable Hypotheses for Prototype 1 (Lo-Fi)
1. **Hypothesis 1 (Verification):** Showing verified contact badges and clear recipient identifiers on Screen 3 reduces user hesitation time by >40%.
2. **Hypothesis 2 (Efficiency):** Preset amount chips on Screen 4 accelerate micro-transfers compared to manual numpad entry.
3. **Hypothesis 3 (Clarity):** Showing the selected payment method and fee directly alongside the amount before final confirmation reduces cart/transfer abandonment.

---

## 5. Research Freeze Agreement
- **Frozen Parameters:** 6-step flow order, core interaction steps, no extraneous features (e.g., crypto, recurring loans) until Prototype 1 completes Test Round 1 & Round 2.
- **Next Step:** Build **Prototype 1 — Digital Lo-Fi** in `03-prototype-1/` to prepare for usability testing.
