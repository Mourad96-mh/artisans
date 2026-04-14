const mongoose = require('mongoose');

function oneYearFromNow() {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d;
}

const registrationSchema = new mongoose.Schema({
  plan: {
    type: String,
    enum: ['horizon', 'silver', 'premium'],
    required: true,
  },
  company: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, default: '' },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  trade: { type: String, required: true },
  comments: { type: String, default: '' },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted', 'rejected'],
    default: 'new',
  },
  renewsAt: {
    type: Date,
    default: oneYearFromNow,
  },
}, { timestamps: true });

// Virtual: is the subscription currently active
registrationSchema.virtual('isActive').get(function () {
  return this.status === 'converted' && this.renewsAt > new Date();
});

registrationSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Registration', registrationSchema);
