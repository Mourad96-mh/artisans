const mongoose = require('mongoose');
// ArtisanUser ref added for assignedTo field

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  postalCode: { type: String, required: true },
  trade: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: String, default: '' },
  status: {
    type: String,
    enum: ['new', 'processing', 'matched', 'completed', 'cancelled'],
    default: 'new',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArtisanUser',
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
