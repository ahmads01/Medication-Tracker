const NotificationService = require('../services/notification.service');
const UserPreference = require('../models/UserPreference');
const logger = require('../utils/logger');

class NotificationController {
  /**
   * Get user notifications
   */
  static async getNotifications(req, res, next) {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 20, read } = req.query;

      const result = await NotificationService.getUserNotifications(userId, {
        page: parseInt(page),
        limit: parseInt(limit),
        read: read === 'true' ? true : read === 'false' ? false : undefined
      });

      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      logger.error('Error fetching notifications:', error);
      next(error);
    }
  }

  /**
   * Mark a notification as read
   */
  static async markAsRead(req, res, next) {
    try {
      const userId = req.user.id;
      const { notificationId } = req.params;

      const notification = await NotificationService.markAsRead(notificationId, userId);
      
      if (!notification) {
        return res.status(404).json({
          success: false,
          message: 'Notification not found or access denied'
        });
      }

      res.json({
        success: true,
        data: notification
      });
    } catch (error) {
      logger.error('Error marking notification as read:', error);
      next(error);
    }
  }

  /**
   * Mark all notifications as read
   */
  static async markAllAsRead(req, res, next) {
    try {
      const userId = req.user.id;
      
      await Notification.updateMany(
        { userId, read: false },
        { $set: { read: true } }
      );

      res.json({
        success: true,
        message: 'All notifications marked as read'
      });
    } catch (error) {
      logger.error('Error marking all notifications as read:', error);
      next(error);
    }
  }

  /**
   * Get user notification preferences
   */
  static async getPreferences(req, res, next) {
    try {
      const userId = req.user.id;
      
      let preferences = await UserPreference.findOne({ userId });
      
      // If no preferences exist, create default ones
      if (!preferences) {
        preferences = await UserPreference.create({ userId });
      }

      res.json({
        success: true,
        data: preferences
      });
    } catch (error) {
      logger.error('Error fetching notification preferences:', error);
      next(error);
    }
  }

  /**
   * Update user notification preferences
   */
  static async updatePreferences(req, res, next) {
    try {
      const userId = req.user.id;
      const updates = req.body;

      // Filter out any invalid fields
      const allowedUpdates = [
        'notification', 'medicationHistoryRetention', 'language', 'theme', 'accessibility'
      ];
      
      const updatesToApply = {};
      Object.keys(updates).forEach(key => {
        if (allowedUpdates.includes(key)) {
          updatesToApply[key] = updates[key];
        }
      });

      // Add lastUpdated timestamp
      updatesToApply.lastUpdated = new Date();

      const preferences = await UserPreference.findOneAndUpdate(
        { userId },
        { $set: updatesToApply },
        { new: true, upsert: true, runValidators: true }
      );

      res.json({
        success: true,
        data: preferences
      });
    } catch (error) {
      logger.error('Error updating notification preferences:', error);
      next(error);
    }
  }

  /**
   * Register a push notification subscription
   */
  static async registerPushSubscription(req, res, next) {
    try {
      const userId = req.user.id;
      const { subscription } = req.body;

      if (!subscription) {
        return res.status(400).json({
          success: false,
          message: 'Subscription object is required'
        });
      }

      // In a real app, you would save this subscription to the user's profile
      // For example:
      // await User.findByIdAndUpdate(userId, {
      //   $addToSet: { pushSubscriptions: subscription }
      // });

      res.json({
        success: true,
        message: 'Push notification subscription registered successfully'
      });
    } catch (error) {
      logger.error('Error registering push subscription:', error);
      next(error);
    }
  }
}

module.exports = NotificationController;
