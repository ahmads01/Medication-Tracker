const History = require('../models/History');
const logger = require('../utils/logger');

class HistoryController {
  /**
   * Get medication history with pagination and filtering
   */
  static async getHistory(req, res, next) {
    try {
      const userId = req.user.id; // Assuming user is authenticated and ID is available in req.user
      const { 
        page = 1, 
        limit = 20, 
        status, 
        medicationId, 
        startDate, 
        endDate 
      } = req.query;

      const query = { userId };

      // Apply filters
      if (status) {
        query.status = status.toUpperCase();
      }
      
      if (medicationId) {
        query.medicationId = medicationId;
      }
      
      if (startDate || endDate) {
        query.scheduledTime = {};
        if (startDate) query.scheduledTime.$gte = new Date(startDate);
        if (endDate) query.scheduledTime.$lte = new Date(endDate);
      }

      const [history, total] = await Promise.all([
        History.find(query)
          .sort({ scheduledTime: -1 })
          .skip((page - 1) * limit)
          .limit(parseInt(limit))
          .populate('medicationId', 'name dosage')
          .lean(),
        History.countDocuments(query)
      ]);

      res.json({
        success: true,
        data: history,
        pagination: {
          total,
          page: parseInt(page),
          totalPages: Math.ceil(total / limit),
          limit: parseInt(limit)
        }
      });
    } catch (error) {
      logger.error('Error fetching history:', error);
      next(error);
    }
  }

  /**
   * Log a medication action (taken, skipped, etc.)
   */
  static async logMedicationAction(req, res, next) {
    try {
      const userId = req.user.id;
      const { medicationId, status, notes, actualTime, scheduledTime, dosage } = req.body;

      // Validate required fields
      if (!medicationId || !status) {
        return res.status(400).json({
          success: false,
          message: 'Medication ID and status are required'
        });
      }

      // Validate status
      const validStatuses = ['TAKEN', 'MISSED', 'SKIPPED', 'DELAYED'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
      }

      // Create history entry
      const historyEntry = new History({
        userId,
        medicationId,
        status,
        notes,
        scheduledTime: scheduledTime || new Date(),
        actualTime: actualTime || new Date(),
        dosage
      });

      await historyEntry.save();

      // In a real app, you might want to update the medication's next dose here
      // and trigger any follow-up actions

      res.status(201).json({
        success: true,
        data: historyEntry
      });
    } catch (error) {
      logger.error('Error logging medication action:', error);
      next(error);
    }
  }

  /**
   * Get statistics about medication adherence
   */
  static async getStatistics(req, res, next) {
    try {
      const userId = req.user.id;
      const { startDate, endDate } = req.query;

      const match = { userId };
      
      if (startDate || endDate) {
        match.scheduledTime = {};
        if (startDate) match.scheduledTime.$gte = new Date(startDate);
        if (endDate) match.scheduledTime.$lte = new Date(endDate);
      }

      const stats = await History.aggregate([
        { $match: match },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$count' },
            byStatus: {
              $push: {
                status: '$_id',
                count: '$count'
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            total: 1,
            byStatus: 1,
            adherenceRate: {
              $cond: [
                { $eq: ['$total', 0] },
                0,
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $ifNull: [
                            {
                              $arrayElemAt: [
                                {
                                  $filter: {
                                    input: '$byStatus',
                                    as: 's',
                                    cond: { $eq: ['$$s.status', 'TAKEN'] }
                                  }
                                },
                                0
                              ]
                            },
                            { status: 'TAKEN', count: 0 }
                          ]
                        },
                        '$total'
                      ]
                    },
                    100
                  ]
                }
              ]
            }
          }
        }
      ]);

      res.json({
        success: true,
        data: stats[0] || { total: 0, byStatus: [], adherenceRate: 0 }
      });
    } catch (error) {
      logger.error('Error fetching statistics:', error);
      next(error);
    }
  }
}

module.exports = HistoryController;
