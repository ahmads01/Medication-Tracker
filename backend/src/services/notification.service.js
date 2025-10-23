const nodemailer = require('nodemailer');
let webpush;
try {
  webpush = require('web-push');
} catch (error) {
  console.warn('web-push module not found. Push notifications will be disabled.');
  webpush = null;
}
const Notification = require('../models/Notification');
const logger = require('../utils/logger');

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Web Push setup - Disabled for now to allow server to start
logger.warn('Web Push notifications are temporarily disabled to allow server startup');
webpush = null;

class NotificationService {
  /**
   * Send a notification through the specified channels
   * @param {Object} options - Notification options
   * @param {String} options.userId - ID of the user to notify
   * @param {String} options.type - Type of notification (REMINDER, ALERT, etc.)
   * @param {String} options.title - Notification title
   * @param {String} options.message - Notification message
   * @param {Object} [options.data] - Additional data to include
   * @param {String[]} [options.channels=['IN_APP']] - Channels to send through
   * @param {Date} [options.scheduledFor] - When to send the notification
   * @returns {Promise<Object>} - Result of the notification sending
   */
  static async sendNotification({
    userId,
    type,
    title,
    message,
    data = {},
    channels = ['IN_APP'],
    scheduledFor = new Date()
  }) {
    try {
      // Create notification record
      const notification = new Notification({
        userId,
        type,
        title,
        message,
        data,
        channel: channels[0], // Primary channel
        scheduledFor,
        status: 'PENDING'
      });

      // Save the notification first
      await notification.save();

      // Process each channel
      const results = await Promise.allSettled(
        channels.map(channel => this.sendViaChannel(notification, channel))
      );

      // Update notification status based on results
      const hasFailures = results.some(r => r.status === 'rejected');
      notification.status = hasFailures ? 'FAILED' : 'SENT';
      notification.sentAt = new Date();
      
      if (hasFailures) {
        notification.error = {
          message: 'One or more channels failed to send',
          timestamp: new Date(),
          details: results
            .filter(r => r.status === 'rejected')
            .map(r => r.reason.message)
        };
      }

      await notification.save();
      return { success: !hasFailures, notification };
    } catch (error) {
      logger.error('Error sending notification:', error);
      throw error;
    }
  }

  /**
   * Send notification via a specific channel
   * @private
   */
  static async sendViaChannel(notification, channel) {
    try {
      switch (channel) {
        case 'EMAIL':
          return await this.sendEmail(notification);
        case 'PUSH':
          return await this.sendPush(notification);
        case 'SMS':
          return await this.sendSms(notification);
        case 'IN_APP':
        default:
          // For in-app, we just need to ensure it's saved
          return { success: true, channel };
      }
    } catch (error) {
      logger.error(`Error sending ${channel} notification:`, error);
      throw error;
    }
  }

  static async sendEmail(notification) {
    const { userId, title, message } = notification;
    
    // In a real app, you would fetch the user's email
    const userEmail = 'user@example.com'; // Replace with actual user email lookup
    
    const mailOptions = {
      from: `"Medication Tracker" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: title,
      text: message,
      html: `<p>${message}</p>`
    };

    await transporter.sendMail(mailOptions);
    return { success: true, channel: 'EMAIL' };
  }

  static async sendPush(notification) {
    // In a real app, you would fetch the user's push subscription
    const subscription = {}; // Replace with actual subscription from DB
    
    if (!subscription) {
      throw new Error('No push subscription found for user');
    }

    const payload = JSON.stringify({
      title: notification.title,
      body: notification.message,
      data: notification.data,
      icon: '/icon.png'
    });

    await webpush.sendNotification(subscription, payload);
    return { success: true, channel: 'PUSH' };
  }

  static async sendSms(notification) {
    // Implement SMS sending logic (e.g., using Twilio)
    // This is a placeholder implementation
    logger.info(`SMS sent: ${notification.title} - ${notification.message}`);
    return { success: true, channel: 'SMS' };
  }

  /**
   * Mark a notification as read
   */
  static async markAsRead(notificationId, userId) {
    return Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { $set: { read: true } },
      { new: true }
    );
  }

  /**
   * Get user notifications
   */
  static async getUserNotifications(userId, { limit = 20, page = 1, read } = {}) {
    const query = { userId };
    if (read !== undefined) {
      query.read = read;
    }

    const [notifications, total] = await Promise.all([
      Notification.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Notification.countDocuments(query)
    ]);

    return {
      data: notifications,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        limit
      }
    };
  }
}

module.exports = NotificationService;
