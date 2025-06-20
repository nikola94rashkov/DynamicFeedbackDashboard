const express = require('express');

const { isAuthenticated } = require('../middleware/authMiddleware');

const {
    createFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedbackById,
    getAllFeedbacks,
    getFeedbacksByUserId
} = require('../controllers/feedbackController');

const router = express.Router();

router.post('/', isAuthenticated, createFeedback);
router.put('/:id', isAuthenticated, updateFeedback);
router.delete('/:id', isAuthenticated, deleteFeedback);

router.get('/:id', getFeedbackById);
router.get('/', getAllFeedbacks);

router.get('/user/:userId', getFeedbacksByUserId);

module.exports = router;