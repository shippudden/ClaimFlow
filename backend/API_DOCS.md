# ClaimFlow Backend APIs

Backend server runs on: **http://localhost:3000**

## Endpoints

### 1. Health Check
```bash
GET /health
```

**Response:**
```json
{"status":"ok","message":"ClaimFlow Backend Running"}
```

---

### 2. Submit Claim
```bash
POST /api/claim/submit
```

**Request Body:**
```json
{
  "photos": ["photo1.jpg", "photo2.jpg"],
  "policyNumber": "POL-123456",
  "description": "Front bumper damaged",
  "customerName": "Chidi Okafor"
}
```

**Response:**
```json
{
  "success": true,
  "claimId": "CLM-1770852904037",
  "analysis": {
    "damageType": "Front bumper damage, cracked headlight",
    "severity": "Moderate",
    "estimatedCost": 320000,
    "negotiatedCost": 240000,
    "savings": 80000,
    "repairShop": {
      "name": "AutoFix Ikeja",
      "address": "23 Obafemi Awolowo Way, Ikeja",
      "appointmentTime": "Tomorrow, 9:00 AM"
    },
    "fraudRisk": "Low",
    "autoApproved": true
  },
  "submittedAt": "2026-02-11T23:35:04.037Z"
}
```

---

### 3. Get Timeline
```bash
GET /api/claim/timeline?claimId=CLM-123
```

**Response (David's exact format):**
```json
{
  "claimId": "CLM-123",
  "timeline": [
    { "time": "Mon, 10:15 AM", "text": "Claim submitted", "active": false },
    { "time": "Mon, 10:17 AM", "text": "AI damage assessment complete", "active": false },
    { "time": "Mon, 10:45 AM", "text": "Negotiated repair cost: ₦240,000 (saved ₦80K)", "active": false },
    { "time": "Mon, 11:00 AM", "text": "Insurance approved by Heirs", "active": false },
    { "time": "Mon, 11:02 AM", "text": "Repair booked at AutoFix Ikeja for tomorrow 9 AM", "active": true },
    { "time": "Mon, 1:00 PM", "text": "Rental car arranged - pickup at 4 PM today", "active": false },
    { "time": "Tue, 9:30 AM", "text": "Repair in progress - bumper replacement started", "active": false },
    { "time": "Wed, 2:00 PM", "text": "Repair complete - quality check passed ✅", "active": false }
  ]
}
```

---

### 4. Get Status
```bash
GET /api/claim/status?claimId=CLM-123
```

**Response:**
```json
{
  "claimId": "CLM-123",
  "currentStep": 5,
  "totalSteps": 8,
  "status": "repair_booked",
  "percentComplete": 62,
  "estimatedCompletion": "Wed, 2:00 PM"
}
```

---

## How to Run

**Terminal 1 - Backend:**
```bash
npm run backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

---

## Frontend Integration

David needs to call these endpoints from the Vite frontend (localhost:5173).

### Option 1: Direct calls with full URL
```javascript
const response = await fetch('http://localhost:3000/api/claim/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ photos, policyNumber })
});
```

### Option 2: Vite Proxy (recommended)
Add to `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
```

Then frontend can call:
```javascript
fetch('/api/claim/submit', {...})  // Proxy handles routing to :3000
```
```

---

## 📧 MESSAGE TO SEND DAVID
```
Hey David! 👋

Backend APIs are ready and tested ✅

All 3 endpoints working:
- POST /api/claim/submit - returns claimId + analysis immediately
- GET /api/claim/timeline?claimId=X - returns your exact format
- GET /api/claim/status?claimId=X - returns progress data

How to test:
1. I'm running backend on http://localhost:3000
2. You can test: curl http://localhost:3000/health
3. Full docs in backend/API_DOCS.md

Frontend integration:
Since your Vite app runs on :5173 and backend on :3000, you have 2 options:

Option 1: Call http://localhost:3000/api/... directly
Option 2: Add Vite proxy (see API_DOCS.md)

The timeline response matches your format exactly:
{ time: "Mon, 10:15 AM", text: "...", active: true/false }

Ready for you to hook up! Let me know if you need any changes 🚀