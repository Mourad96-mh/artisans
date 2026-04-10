const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: { type: String, default: 'availability' },
  artisanId: { type: mongoose.Schema.Types.ObjectId, ref: 'ArtisanUser' },
  artisanEmail: String,
  company: String,
  nextProjectDate: Date,
  dismissed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
