const express = require('express');
const Project = require('../models/Project');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/projects — public, called by homeowner form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, postalCode, trade, description, budget } = req.body;
    const project = await Project.create({ name, email, phone, postalCode, trade, description, budget });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/projects — admin only
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, trade, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (trade) filter.trade = trade;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/projects/stats — admin only
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const [total, byStatus, byTrade] = await Promise.all([
      Project.countDocuments(),
      Project.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Project.aggregate([{ $group: { _id: '$trade', count: { $sum: 1 } } }]),
    ]);
    res.json({ total, byStatus, byTrade });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/projects/:id/status — admin only
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/projects/:id — admin only
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
