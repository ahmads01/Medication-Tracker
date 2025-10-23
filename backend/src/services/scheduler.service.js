const cron = require('node-cron');
const NotificationService = require('./notification.service');
const Notification = require('../models/Notification');
const History = require('../models/History');
const UserPreference = require('../models/UserPreference');
const logger = require('../utils/logger');

class SchedulerService {
  constructor() {
    this.jobs = new Map();
  }

  /**
   * Initialize all scheduled jobs
   */
  initScheduledJobs() {
    logger.info('Initializing scheduled jobs...');

    // Clean up old notifications (runs daily at midnight)
    this.scheduleJob('0 0 * * *', 'cleanup-notifications', this.cleanupOldNotifications.bind(this));

    // Check for due medications (runs every minute)
    this.scheduleJob('* * * * *', 'check-medication-reminders', this.checkMedicationReminders.bind(this));

    // Check for upcoming refills (runs daily at 8 AM)
    this.scheduleJob('0 8 * * *', 'check-refill-reminders', this.checkRefillReminders.bind(this));

    logger.info('All scheduled jobs initialized');
  }

  /**
   * Schedule a new job
   */
  scheduleJob(cronExpression, jobName, task) {
    if (this.jobs.has(jobName)) {
      this.jobs.get(jobName).stop();
    }

    const job = cron.schedule(cronExpression, async () => {
      try {
        logger.info(`Running scheduled job: ${jobName}`);
        await task();
      } catch (error) {
        logger.error(`Error in scheduled job ${jobName}:`, error);
      }
    }, {
      scheduled: true,
      timezone: 'UTC'
    });

    this.jobs.set(jobName, job);
    logger.info(`Scheduled job ${jobName} with pattern: ${cronExpression}`);
  }

  /**
   * Check for medications that are due and send reminders
   */
  async checkMedicationReminders() {
    try {
      // Check if database is connected
      const mongoose = require('mongoose');
      if (mongoose.connection.readyState !== 1) {
        logger.warn('Database not connected, skipping medication reminders check');
        return;
      }

      // In a real app, you would query for medications that are due soon
      // This is a simplified example
      const now = new Date();
      logger.info(`Checking for medication reminders at ${now.toISOString()}`);

      // Here you would typically query your database for due medications
      // For example:
      // const dueMedications = await Medication.find({
      //   nextDose: { $lte: now },
      //   status: 'active'
      // }).populate('userId', 'name email');

      // For each medication, you would then:
      // 1. Check user preferences
      // 2. Send appropriate notifications
      // 3. Update the next scheduled dose
      // 4. Log the action in history

      // This is a placeholder implementation
      logger.info('Medication reminder check completed');
    } catch (error) {
      logger.error('Error in checkMedicationReminders:', error);
    }
  }

  /**
   * Check for medications that need refills soon
   */
  async checkRefillReminders() {
    try {
      // Check if database is connected
      const mongoose = require('mongoose');
      if (mongoose.connection.readyState !== 1) {
        logger.warn('Database not connected, skipping refill reminders check');
        return;
      }

      logger.info('Checking for medication refill reminders...');
      
      // In a real app, you would query for medications that are running low
      // This is a simplified example
      
      // Placeholder implementation
      logger.info('Refill reminder check completed');
    } catch (error) {
      logger.error('Error in checkRefillReminders:', error);
    }
  }

  /**
   * Clean up old notifications and history
   */
  async cleanupOldNotifications() {
    try {
      logger.info('Cleaning up old notifications and history...');
      
      // Check if database is connected
      const mongoose = require('mongoose');
      if (mongoose.connection.readyState !== 1) {
        logger.warn('Database not connected, skipping cleanup');
        return;
      }
      
      // Delete notifications older than 90 days
      const notificationResult = await Notification.deleteMany({
        createdAt: { $lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) }
      });

      // Delete history entries based on user preferences
      // This is a simplified example - in a real app, you'd need to handle this per user
      const historyResult = await History.deleteMany({
        createdAt: { $lt: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000) }
      });

      logger.info(`Cleanup completed: ${notificationResult.deletedCount} notifications and ${historyResult.deletedCount} history entries removed`);
    } catch (error) {
      logger.error('Error in cleanupOldNotifications:', error);
    }
  }

  /**
   * Stop all scheduled jobs
   */
  stopAllJobs() {
    for (const [name, job] of this.jobs.entries()) {
      job.stop();
      logger.info(`Stopped job: ${name}`);
    }
    this.jobs.clear();
  }
}

// Export a singleton instance
module.exports = new SchedulerService();
