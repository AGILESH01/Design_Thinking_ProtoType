# Prototype 1 Implementation Plan

## 1. Goal
Test the hypothesis: *Can a senior-oriented UPI payment journey be understood and completed using the proposed interface without unnecessary confusion or assistance?*

## 2. Tech Stack
- React 18, TypeScript, Vite
- Tailwind CSS for styling
- Lucide React for iconography
- Local React state for mock data (no real backend/APIs)

## 3. Screen-by-Screen Specification (Derived from Paper Prototypes)

### 3.1 Home Screen
- **Header:** Profile avatar (left), "Hello, User" text, Star icon (right).
- **Balance Card:** "Your Balance", "₹2,560", eye icon to toggle visibility.
- **Action Buttons (Row of 4 vertical pills):**
  - Pay (Up Arrow) - Primary action
  - Receive (Down Arrow)
  - History (Receipt Icon)
  - Help (Question Mark)
- **Quick Pay Section:**
  - "Quick Pay" title with "See all >" link.
  - 4 round contact avatars: Ravi (Saved), Daughter (Saved), Electricity (Bill), Mobile (Bill).
- **Safety Reminder:**
  - Card with shield icon, "Stay Safe! Never share your OTP, PIN with anyone" with right arrow.
- **Bottom Navigation:**
  - Home (active), Pay, History, Help.

### 3.2 Pay Screen
- **Header:** Back arrow, "Pay" title.
- **Recipient Block:** Avatar, "Ravi Sharma", green "Verified" badge, "UPI ID : ravi@okaxis".
- **Amount Input:** Label "Enter Amount", large input field with "₹ 500" placeholder and "x" clear button.
- **Message Input:** Label "Add a message (optional)", text input.
- **Payment Method:** Radio list:
  - UPI (Google Pay / BHIM / Paytm) [default selected]
  - Bank Account
  - Debit / Credit Card
- **CTA:** Large green "Pay Now" button at the bottom (above nav).

### 3.3 Confirmation Screen
- **Header:** Back arrow, "Confirm Payment" title.
- **Success Banner:** Green box, white checkmark, "Payment Successful!", large "₹ 500", "to Ravi Sharma", timestamp.
- **Details Card:** Name, UPI ID, Amount, Message.
- **Actions:** "View Receipt" (solid blue), "Back to Home" (outline blue).

### 3.4 History Screen
- **Header:** Back arrow, "Payment History" title.
- **Filters:** "All" (active solid), "Received" (outline), "Sent" (outline).
- **Transaction List:**
  - Rows with Avatar/Icon, Name, Type (UPI Payment/Received/Bill Payment), Date/Time, Amount (₹), and green "Completed" badge.

### 3.5 Help Screen & Learn/Practice
- **Header:** Back arrow, "Help" title.
- **Search Bar:** "Search for help..."
- **Help Topics (Colored Cards):**
  - Learn & Practice (Purple) -> Navigates to Practice mode.
  - How to make a payment (Blue)
  - UPI / App Basics (Green)
  - Security Tips (Yellow)
  - Common Issues (Pink)
  - Contact Support (Blue)
- **Learn & Practice Modal/Screen:**
  - Explains "Try a practice payment with virtual money."
  - "Why use this? Builds confidence, Learn by doing, Safe & risk-free".
  - "Start Practice" button initiates the core flow with a visible "Practice Mode" banner.

## 4. Execution Steps
1. Initialize Vite React TS project in `03-prototype-1/app`.
2. Install Tailwind CSS & Lucide icons.
3. Build base layout shell (Mobile viewport constraint max-width: 400px, centered on desktop).
4. Implement navigation state (Router or simple state-based view switching).
5. Build the 5 core screens matching the visual hierarchy (large fonts, clear contrast).
6. Wire up the mock payment flow (Home -> Pay -> Confirmation).
7. Test extensively in browser (mobile emulation).
8. Report back on final implementation.
