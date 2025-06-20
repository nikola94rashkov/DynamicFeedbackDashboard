const Feedback = require('../models/Feedback');

const createFeedback = async (req, res) => {
    const { name, email, content, category, status } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const newFeedback = new Feedback({
            name,
            email,
            content,
            category,
            status,
            author: userId,
        });

        console.log('req.session', req.session)

        const savedFeedback = await newFeedback.save();

        res.status(201).json({
            message: 'Feedback created successfully',
            feedback: {
                ...savedFeedback.toObject()
            }
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', error: err.message });
        }

        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const updateFeedback = async (req, res) => {
    const { id } = req.params;
    const { name, email, content, category, status } = req.body;
    const userId = req.session.userId;

    console.log('req.query')

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const feedback = await Feedback.findOne({ _id: id, author: userId });

        console.log('feedback', feedback)

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found or unauthorized' });
        }

        feedback.name = name || feedback.name;
        feedback.content = content || feedback.content;
        feedback.email = email || feedback.email;
        feedback.category = category || feedback.category;
        feedback.status = status || feedback.status;

        const updatedFeedback = await feedback.save();
        res.status(200).json({ message: 'Feedback updated successfully', feedback: updatedFeedback });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const deleteFeedback = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const feedback = await Feedback.findOneAndDelete({ _id: id, author: userId });

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found or unauthorized' });
        }

        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getFeedbackById = async (req, res) => {
    const { id } = req.params;

    try {
        const feedback = await Feedback.findById(id).populate('author', 'firstName lastName email');

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        res.status(200).json({
            ...feedback.toObject(),
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getAllFeedbacks = async (req, res) => {
    const { page = 1, limit = 10, status, category, sortBy } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    try {
        const skip = (page - 1) * limit;
        let feedbacks;
        let totalFeedbacks = await Feedback.countDocuments(filter);

        if (sortBy && sortBy.toLowerCase() === 'status') {
            feedbacks = await Feedback.aggregate([
                { $match: filter },
                { $addFields: {
                        statusOrder: {
                            $switch: {
                                branches: [
                                    { case: { $eq: ["$status", "pending"] }, then: 1 },
                                    { case: { $eq: ["$status", "resolved"] }, then: 2 },
                                    { case: { $eq: ["$status", "closed"] }, then: 3 }
                                ],
                                default: 4
                            }
                        }
                    }},
                { $sort: { statusOrder: 1, createdAt: -1 } },
                { $skip: skip },
                { $limit: parseInt(limit) },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'author',
                        foreignField: '_id',
                        as: 'author'
                    }
                },
                { $unwind: '$author' },
                { $project: {
                        name: 1,
                        content: 1,
                        email: 1,
                        category: 1,
                        status: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    }}
            ]);
        } else {
            let sortOptions = { createdAt: -1 };

            if (sortBy) {
                switch (sortBy.toLowerCase()) {
                    case 'name':
                        sortOptions = { name: 1 };
                        break;
                    case 'category':
                        sortOptions = { category: 1 };
                        break;
                    case 'newest':
                        sortOptions = { createdAt: -1 };
                        break;
                    case 'oldest':
                        sortOptions = { createdAt: 1 };
                        break;
                }
            }

            feedbacks = await Feedback.find(filter)
                .populate('author', 'firstName lastName email')
                .skip(skip)
                .limit(parseInt(limit))
                .sort(sortOptions);
        }

        res.status(200).json({
            success: true,
            feedbacks,
            totalFeedbacks,
            totalPages: Math.ceil(totalFeedbacks / limit),
            currentPage: parseInt(page),
        });
    } catch (err) {
        console.error('Error fetching feedbacks:', err);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching feedbacks',
            error: err.message
        });
    }
};

const getFeedbacksByUserId = async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    try {
        const skip = (page - 1) * limit;

        const feedbacks = await Feedback.find({ author: userId })
            .populate('author', 'firstName lastName email')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const totalFeedbacks = await Feedback.countDocuments({ author: userId });

        res.status(200).json({
            feedbacks,
            totalFeedbacks,
            totalPages: Math.ceil(totalFeedbacks / limit),
            currentPage: parseInt(page),
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    createFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedbackById,
    getAllFeedbacks,
    getFeedbacksByUserId
};