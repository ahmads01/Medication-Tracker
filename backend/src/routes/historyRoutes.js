const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const { protect } = require('../middleware/auth');

// Apply authentication middleware to all routes
// Apply authentication middleware to all routes
router.use(protect);

/**
 * @swagger
 * /api/history:
 *   get:
 *     summary: Get medication history with filters
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [TAKEN, MISSED, SKIPPED, DELAYED]
 *         description: Filter by status
 *       - in: query
 *         name: medicationId
 *         schema:
 *           type: string
 *         description: Filter by medication ID
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date (ISO format)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date (ISO format)
 *     responses:
 *       200:
 *         description: List of medication history entries
 *       400:
 *         description: Invalid query parameters
 *       401:
 *         description: Unauthorized
 */
router.get('/', historyController.getHistory);

/**
 * @swagger
 * /api/history:
 *   post:
 *     summary: Log a medication action
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - medicationId
 *               - status
 *             properties:
 *               medicationId:
 *                 type: string
 *                 description: ID of the medication
 *               status:
 *                 type: string
 *                 enum: [TAKEN, MISSED, SKIPPED, DELAYED]
 *                 description: Status of the medication action
 *               notes:
 *                 type: string
 *                 description: Optional notes about the action
 *               actualTime:
 *                 type: string
 *                 format: date-time
 *                 description: When the action actually occurred (defaults to now)
 *               scheduledTime:
 *                 type: string
 *                 format: date-time
 *                 description: When the medication was scheduled to be taken (defaults to now)
 *               dosage:
 *                 type: object
 *                 properties:
 *                   amount:
 *                     type: number
 *                   unit:
 *                     type: string
 *     responses:
 *       201:
 *         description: Medication action logged successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/', historyController.logMedicationAction);

/**
 * @swagger
 * /api/history/statistics:
 *   get:
 *     summary: Get medication adherence statistics
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for statistics (ISO format)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for statistics (ISO format)
 *     responses:
 *       200:
 *         description: Medication adherence statistics
 *       401:
 *         description: Unauthorized
 */
router.get('/statistics', historyController.getStatistics);

module.exports = router;
