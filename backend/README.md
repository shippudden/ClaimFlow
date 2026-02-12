# ClaimFlow Backend API

Express-based REST API for ClaimFlow insurance claim processing simulation.

## Architecture
```
Frontend (Vite - Port 5173)
    ↓
Backend API (Express - Port 3000)
    ↓
Mock Data Layer
```

## Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **CORS:** Enabled for local development
- **Data:** In-memory mock responses (no database needed for MVP)

## Running Locally
```bash
# Install dependencies
npm install

# Start backend server
npm run backend

# Server starts on http://localhost:3000
```

## API Endpoints

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "message": "ClaimFlow Backend Running"
}
```

---

### Submit Claim
```http
POST /api/claim/submit
Content-Type: application/json
```

**Request Body:**
```json
{
  "photos": ["base64string1", "base64string2"],
  "policyNumber": "POL-123456",
  "description": "Front bumper damaged in parking lot",
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

**Business Logic:**
- Generates unique claim ID using timestamp
- Simulates AI damage assessment (2-3 second delay on frontend)
- Returns mock repair cost negotiation (₦80K savings)
- Flags fraud risk as "Low" for demo

---

### Get Timeline
```http
GET /api/claim/timeline?claimId={claimId}
```

**Query Parameters:**
- `claimId` (required) - The claim identifier

**Response:**
```json
{
  "claimId": "CLM-123",
  "timeline": [
    {
      "time": "Mon, 10:15 AM",
      "text": "Claim submitted",
      "active": false
    },
    {
      "time": "Mon, 10:17 AM",
      "text": "AI damage assessment complete",
      "active": false
    },
    {
      "time": "Mon, 10:45 AM",
      "text": "Negotiated repair cost: ₦240,000 (saved ₦80K)",
      "active": false
    },
    {
      "time": "Mon, 11:00 AM",
      "text": "Insurance approved by Heirs",
      "active": false
    },
    {
      "time": "Mon, 11:02 AM",
      "text": "Repair booked at AutoFix Ikeja for tomorrow 9 AM",
      "active": true
    },
    {
      "time": "Mon, 1:00 PM",
      "text": "Rental car arranged - pickup at 4 PM today",
      "active": false
    },
    {
      "time": "Tue, 9:30 AM",
      "text": "Repair in progress - bumper replacement started",
      "active": false
    },
    {
      "time": "Wed, 2:00 PM",
      "text": "Repair complete - quality check passed ✅",
      "active": false
    }
  ]
}
```

**Data Format:**
- `time` (string) - Human-readable timestamp
- `text` (string) - Event description
- `active` (boolean) - Current step indicator

**Customer Journey:**
1. Claim submitted (10:15 AM)
2. AI analyzes damage (10:17 AM)
3. Repair shops negotiated (10:45 AM)
4. Insurance approves (11:00 AM)
5. Repair booked (11:02 AM) ← **Active step**
6. Rental car arranged (1:00 PM)
7. Repair in progress (Next day 9:30 AM)
8. Repair complete (Next day 2:00 PM)

---

### Get Status
```http
GET /api/claim/status?claimId={claimId}
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

**Status Values:**
- `submitted` - Initial claim received
- `analyzing` - AI processing damage
- `approved` - Insurance approved payout
- `repair_booked` - Appointment scheduled
- `in_progress` - Repair ongoing
- `completed` - Claim closed

---

## Frontend Integration

### Option 1: Vite Proxy (Recommended)

Add to `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
```

Then call APIs without full URL:
```javascript
const response = await fetch('/api/claim/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### Option 2: Direct Calls
```javascript
const response = await fetch('http://localhost:3000/api/claim/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

---

## Deployment

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Railway
```bash
# Push to GitHub, connect repo in Railway dashboard
# Add start command: node backend/server.js
```

### Environment Variables
```env
PORT=3000  # Auto-provided by most platforms
NODE_ENV=production
```

---

## Error Handling

All endpoints return proper HTTP status codes:
- `200` - Success
- `400` - Bad request (missing required fields)
- `405` - Method not allowed (wrong HTTP method)
- `500` - Server error

Example error response:
```json
{
  "error": "Photos are required",
  "success": false
}
```

---

## Testing
```bash
# Health check
curl http://localhost:3000/health

# Submit claim
curl -X POST http://localhost:3000/api/claim/submit \
  -H "Content-Type: application/json" \
  -d '{"photos":["test.jpg"],"policyNumber":"POL123"}'

# Get timeline
curl http://localhost:3000/api/claim/timeline?claimId=CLM-123

# Get status
curl http://localhost:3000/api/claim/status?claimId=CLM-123
```

---

## Design Decisions

### Why Express?
- Lightweight (perfect for MVP)
- Fast setup (built in 4 hours)
- Easy deployment (works on all platforms)
- Team familiarity (standard Node.js framework)

### Why No Database?
- Hackathon MVP doesn't need persistence
- Mock data is sufficient for demo
- Faster development (no schema design)
- Easy to deploy (no DB setup needed)

### Why Port 3000?
- Standard backend port
- Avoids conflict with Vite (5173)
- Easy to remember for testing

---

## Future Enhancements

For production deployment:
- [ ] Add Supabase for data persistence
- [ ] Implement actual AI integration (Claude/GPT-4 Vision)
- [ ] Add Africa's Talking for real SMS
- [ ] Add authentication (JWT tokens)
- [ ] Add rate limiting
- [ ] Add logging (Winston/Pino)
- [ ] Add automated tests (Jest/Vitest)

---

## Contributors

**Backend Development:** Kingsley (Full-Stack Developer)
**Frontend Integration:** David (Product + Frontend)
**DevOps:** Prosper (Cloud/Deployment)