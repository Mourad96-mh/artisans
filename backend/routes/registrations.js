const express = require('express');
const Registration = require('../models/Registration');
const ArtisanUser = require('../models/ArtisanUser');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/registrations — public, called by the frontend form
router.post('/', async (req, res) => {
  try {
    const { plan, company, firstName, lastName, email, phone, postalCode, trade, comments } = req.body;
    const registration = await Registration.create({
      plan, company, firstName, lastName, email, phone, postalCode, trade, comments,
    });
    res.status(201).json(registration);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/registrations — admin only
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, plan, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (plan) filter.plan = plan;
    if (search) {
      filter.$or = [
        { company: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    const registrations = await Registration.find(filter).sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/registrations/stats — admin only
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const [total, byStatus, byPlan] = await Promise.all([
      Registration.countDocuments(),
      Registration.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Registration.aggregate([{ $group: { _id: '$plan', count: { $sum: 1 } } }]),
    ]);
    res.json({ total, byStatus, byPlan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/registrations/:id/status — admin only
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!registration) return res.status(404).json({ message: 'Not found' });
    res.json(registration);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/registrations/:id/renew — admin only, extends renewsAt by 1 year
router.patch('/:id/renew', authMiddleware, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) return res.status(404).json({ message: 'Not found' });

    const base = registration.renewsAt > new Date() ? registration.renewsAt : new Date();
    const newDate = new Date(base);
    newDate.setFullYear(newDate.getFullYear() + 1);

    registration.renewsAt = newDate;
    await registration.save();
    res.json(registration);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/registrations/:id — admin only
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    await ArtisanUser.deleteOne({ registration: req.params.id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
