const express = require('express');
const jwt = require('jsonwebtoken');
const ArtisanUser = require('../models/ArtisanUser');
const Registration = require('../models/Registration');
const Project = require('../models/Project');
const authMiddleware = require('../middleware/auth');
const artisanAuth = require('../middleware/artisanAuth');

const router = express.Router();

// ── Admin: create artisan account ────────────────────────
// POST /api/artisan/create — admin only
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { email, password, registrationId } = req.body;

    const registration = await Registration.findById(registrationId);
    if (!registration) return res.status(404).json({ message: 'Registration not found' });

    const existing = await ArtisanUser.findOne({ email });
    if (existing) return res.status(400).json({ message: 'An account with this email already exists' });

    const artisan = await ArtisanUser.create({ email, password, registration: registrationId });
    res.status(201).json({ id: artisan._id, email: artisan.email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ── Admin: assign project to artisan ─────────────────────
// PATCH /api/artisan/projects/:id/assign — admin only
router.patch('/projects/:id/assign', authMiddleware, async (req, res) => {
  try {
    const { artisanUserId } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { assignedTo: artisanUserId || null, status: artisanUserId ? 'matched' : 'processing' },
      { new: true }
    ).populate('assignedTo', 'email');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ── Admin: list all artisan accounts ─────────────────────
// GET /api/artisan/accounts — admin only
router.get('/accounts', authMiddleware, async (req, res) => {
  try {
    const accounts = await ArtisanUser.find()
      .populate('registration', 'company firstName lastName plan renewsAt status')
      .select('email registration nextProjectDate createdAt')
      .sort({ createdAt: -1 });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── Admin: update artisan credentials ────────────────────
// PATCH /api/artisan/:id/credentials — admin only
router.patch('/:id/credentials', authMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;
    const artisan = await ArtisanUser.findById(req.params.id);
    if (!artisan) return res.status(404).json({ message: 'Account not found' });

    if (email && email !== artisan.email) {
      const existing = await ArtisanUser.findOne({ email });
      if (existing) return res.status(400).json({ message: 'Email already in use' });
      artisan.email = email;
    }
    if (password) {
      artisan.password = password; // pre-save hook will hash it
    }

    await artisan.save();
    res.json({ id: artisan._id, email: artisan.email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ── Artisan: login ────────────────────────────────────────
// POST /api/artisan/login — public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const artisan = await ArtisanUser.findOne({ email }).populate('registration');
    if (!artisan) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await artisan.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    // Block access if subscription is expired
    const reg = artisan.registration;
    if (!reg || reg.status !== 'converted' || new Date(reg.renewsAt) < new Date()) {
      return res.status(403).json({
        message: 'Votre abonnement a expiré. Contactez-nous pour renouveler votre accès.',
        expired: true,
      });
    }

    const token = jwt.sign(
      { id: artisan._id, email: artisan.email, role: 'artisan' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, email: artisan.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── Artisan: dashboard data ───────────────────────────────
// GET /api/artisan/dashboard — artisan only
router.get('/dashboard', artisanAuth, async (req, res) => {
  try {
    const artisan = await ArtisanUser.findById(req.artisan.id).populate({
      path: 'registration',
      select: 'company firstName lastName plan renewsAt status trade postalCode',
    });

    if (!artisan) return res.status(404).json({ message: 'Account not found' });

    const reg = artisan.registration;
    if (!reg || reg.status !== 'converted' || new Date(reg.renewsAt) < new Date()) {
      return res.status(403).json({
        message: 'Votre abonnement a expiré. Contactez-nous pour renouveler votre accès.',
        expired: true,
      });
    }

    const projects = await Project.find({ assignedTo: req.artisan.id })
      .sort({ createdAt: -1 });

    const registration = artisan.registration;
    const now = new Date();
    const subscriptionActive = registration.status === 'converted' && new Date(registration.renewsAt) > now;
    const daysUntilRenewal = Math.ceil((new Date(registration.renewsAt) - now) / (1000 * 60 * 60 * 24));

    res.json({
      artisan: {
        email: artisan.email,
        company: registration.company,
        firstName: registration.firstName,
        lastName: registration.lastName,
        trade: registration.trade,
        postalCode: registration.postalCode,
        nextProjectDate: artisan.nextProjectDate,
      },
      subscription: {
        plan: registration.plan,
        status: registration.status,
        renewsAt: registration.renewsAt,
        isActive: subscriptionActive,
        daysUntilRenewal: subscriptionActive ? daysUntilRenewal : null,
      },
      projects,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── Artisan: set next project date ───────────────────────
// PATCH /api/artisan/availability — artisan only
router.patch('/availability', artisanAuth, async (req, res) => {
  try {
    const { nextProjectDate } = req.body;
    const artisan = await ArtisanUser.findByIdAndUpdate(
      req.artisan.id,
      { nextProjectDate: nextProjectDate || null },
      { new: true }
    );
    if (!artisan) return res.status(404).json({ message: 'Account not found' });
    res.json({ nextProjectDate: artisan.nextProjectDate });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ── Artisan: verify token ─────────────────────────────────
// GET /api/artisan/me — artisan only
router.get('/me', artisanAuth, async (req, res) => {
  res.json({ email: req.artisan.email, id: req.artisan.id });
});

module.exports = router;
