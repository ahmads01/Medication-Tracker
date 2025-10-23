const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  medicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medication',
    required: true
  },
  status: {
    type: String,
    enum: ['TAKEN', 'MISSED', 'SKIPPED', 'DELAYED'],
    required: true
  },
  scheduledTime: {
    type: Date,
    required: true
  },
  actualTime: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true
  },
  dosage: {
    amount: Number,
    unit: String
  },
  notificationSent: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '730d' // Auto-delete after 2 years
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for faster querying
historySchema.index({ userId: 1, scheduledTime: -1 });
historySchema.index({ medicationId: 1, scheduledTime: -1 });

// Add a virtual for time difference (delay in minutes)
historySchema.virtual('delayMinutes').get(function() {
  if (this.status === 'DELAYED' && this.actualTime && this.scheduledTime) {
    return Math.round((this.actualTime - this.scheduledTime) / (1000 * 60));
  }
  return 0;
});

const History = mongoose.model('History', historySchema);

module.exports = History;
