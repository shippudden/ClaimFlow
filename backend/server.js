import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Submit endpoint - returns claimId immediately
app.post('/api/claim/submit', (req, res) => {
  const { photos, policyNumber, description, customerName } = req.body;

  // Validate
  if (!photos || photos.length === 0) {
    return res.status(400).json({ 
      error: 'Photos are required',
      success: false 
    });
  }

  // Generate claimId
  const claimId = `CLM-${Date.now()}`;

  // Mock response
  const response = {
    success: true,
    claimId: claimId,
    analysis: {
      damageType: 'Front bumper damage, cracked headlight',
      severity: 'Moderate',
      estimatedCost: 320000,
      negotiatedCost: 240000,
      savings: 80000,
      repairShop: {
        name: 'AutoFix Ikeja',
        address: '23 Obafemi Awolowo Way, Ikeja',
        appointmentTime: 'Tomorrow, 9:00 AM',
      },
      fraudRisk: 'Low',
      autoApproved: true,
    },
    submittedAt: new Date().toISOString(),
  };

  console.log(`✅ Claim submitted: ${claimId}`);
  res.json(response);
});

// Timeline endpoint - David's exact format
app.get('/api/claim/timeline', (req, res) => {
  const { claimId } = req.query;

  if (!claimId) {
    return res.status(400).json({ error: 'claimId is required' });
  }

  const timeline = [
    { time: 'Mon, 10:15 AM', text: 'Claim submitted', active: false },
    { time: 'Mon, 10:17 AM', text: 'AI damage assessment complete', active: false },
    { time: 'Mon, 10:45 AM', text: 'Negotiated repair cost: ₦240,000 (saved ₦80K)', active: false },
    { time: 'Mon, 11:00 AM', text: 'Insurance approved by Heirs', active: false },
    { time: 'Mon, 11:02 AM', text: 'Repair booked at AutoFix Ikeja for tomorrow 9 AM', active: true },
    { time: 'Mon, 1:00 PM', text: 'Rental car arranged - pickup at 4 PM today', active: false },
    { time: 'Tue, 9:30 AM', text: 'Repair in progress - bumper replacement started', active: false },
    { time: 'Wed, 2:00 PM', text: 'Repair complete - quality check passed ✅', active: false },
  ];

  console.log(`✅ Timeline fetched for: ${claimId}`);
  res.json({
    claimId: claimId,
    timeline: timeline,
  });
});

// Status endpoint
app.get('/api/claim/status', (req, res) => {
  const { claimId } = req.query;

  if (!claimId) {
    return res.status(400).json({ error: 'claimId is required' });
  }

  const status = {
    claimId: claimId,
    currentStep: 5,
    totalSteps: 8,
    status: 'repair_booked',
    percentComplete: 62,
    estimatedCompletion: 'Wed, 2:00 PM',
  };

  console.log(`✅ Status fetched for: ${claimId}`);
  res.json(status);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'ClaimFlow Backend Running' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('🚀 ClaimFlow Backend API Started');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🧪 Test: curl http://localhost:${PORT}/health`);
  console.log('');
  console.log('Available endpoints:');
  console.log('  POST   /api/claim/submit');
  console.log('  GET    /api/claim/timeline?claimId=CLM-123');
  console.log('  GET    /api/claim/status?claimId=CLM-123');
});