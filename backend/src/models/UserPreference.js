const mongoose = require('mongoose');

const notificationPreferenceSchema = new mongoose.Schema({
  email: {
    type: Boolean,
    default: true
  },
  push: {
    type: Boolean,
    default: true
  },
  sms: {
    type: Boolean,
    default: false
  },
  inApp: {
    type: Boolean,
    default: true
  },
  reminderBefore: {
    type: Number, // minutes before
    default: 15
  },
  timezone: {
    type: String,
    default: 'UTC'
  },
  quietHours: {
    enabled: {
      type: Boolean,
      default: false
    },
    start: {
      type: String, // "22:00"
      default: '22:00'
    },
    end: {
      type: String, // "08:00"
      default: '08:00'
    }
  },
  medicationReminders: {
    type: Boolean,
    default: true
  },
  refillReminders: {
    type: Boolean,
    default: true
  },
  systemUpdates: {
    type: Boolean,
    default: true
  },
  marketing: {
    type: Boolean,
    default: false
  }
});

const userPreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notification: {
    type: notificationPreferenceSchema,
    default: () => ({})
  },
  medicationHistoryRetention: {
    type: Number, // days
    default: 730 // 2 years
  },
  language: {
    type: String,
    default: 'en'
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'system'
  },
  accessibility: {
    fontSize: {
      type: String,
      enum: ['small', 'normal', 'large', 'xlarge'],
      default: 'normal'
    },
    highContrast: {
      type: Boolean,
      default: false
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create index for faster lookups
userPreferenceSchema.index({ userId: 1 }, { unique: true });

const UserPreference = mongoose.model('UserPreference', userPreferenceSchema);

module.exports = UserPreference;
