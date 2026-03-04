const JobTitle = require('../models/JobTitle');

// Public: Get active job titles only
const getActiveJobTitles = async (req, res) => {
    try {
        const jobTitles = await JobTitle.find({ isActive: true }).sort({ title: 1 });
        res.status(200).json(jobTitles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job titles', error: error.message });
    }
};

// Admin: Get all job titles with pagination and search
const getAllJobTitles = async (req, res) => {
    try {
        const { search = '', page = 1, limit = 20 } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        const filter = {};
        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }

        const [data, total] = await Promise.all([
            JobTitle.find(filter)
                .sort({ createdAt: -1 })
                .skip((pageNum - 1) * limitNum)
                .limit(limitNum),
            JobTitle.countDocuments(filter)
        ]);

        res.status(200).json({
            data,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                pages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job titles', error: error.message });
    }
};

// Admin: Create a new job title
const createJobTitle = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title || !title.trim()) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const existing = await JobTitle.findOne({ title: { $regex: `^${title.trim()}$`, $options: 'i' } });
        if (existing) {
            return res.status(409).json({ message: 'Job title already exists' });
        }

        const jobTitle = new JobTitle({ title: title.trim() });
        await jobTitle.save();
        res.status(201).json(jobTitle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating job title', error: error.message });
    }
};

// Admin: Update a job title
const updateJobTitle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ message: 'Title is required' });
        }

        // Check for duplicate (exclude current)
        const existing = await JobTitle.findOne({
            title: { $regex: `^${title.trim()}$`, $options: 'i' },
            _id: { $ne: id }
        });
        if (existing) {
            return res.status(409).json({ message: 'Job title already exists' });
        }

        const updated = await JobTitle.findByIdAndUpdate(id, { title: title.trim() }, { new: true });
        if (!updated) {
            return res.status(404).json({ message: 'Job title not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Error updating job title', error: error.message });
    }
};

// Admin: Delete a job title
const deleteJobTitle = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await JobTitle.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Job title not found' });
        }
        res.status(200).json({ message: 'Job title deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job title', error: error.message });
    }
};

// Admin: Toggle job title active status
const toggleJobTitleStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const jobTitle = await JobTitle.findById(id);
        if (!jobTitle) {
            return res.status(404).json({ message: 'Job title not found' });
        }
        jobTitle.isActive = !jobTitle.isActive;
        await jobTitle.save();
        res.status(200).json(jobTitle);
    } catch (error) {
        res.status(500).json({ message: 'Error toggling job title status', error: error.message });
    }
};

module.exports = {
    getActiveJobTitles,
    getAllJobTitles,
    createJobTitle,
    updateJobTitle,
    deleteJobTitle,
    toggleJobTitleStatus
};
