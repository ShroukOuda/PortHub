const Experience = require('../models/Experience');
const Portfolio = require('../models/Portfolio');

// Get current user's experience
const getMyExperience = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const portfolio = await Portfolio.findOne({ userId });
        
        if (!portfolio) {
            return res.status(200).json({ data: [] });
        }

        const experiences = await Experience.find({ portfolioId: portfolio._id }).sort({ startDate: -1 });
        res.status(200).json({ data: experiences });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching experience', error: error.message });
    }
};

const createExperience = async (req, res) => {
    try {
        const { title, company, startDate, endDate, description, position, location, current, technologies } = req.body;
        let { portfolioId } = req.body;

        // If no portfolioId provided, get user's portfolio
        if (!portfolioId && req.user) {
            const portfolio = await Portfolio.findOne({ userId: req.user._id || req.user.id });
            if (portfolio) {
                portfolioId = portfolio._id;
            }
        }

        const experience = new Experience({
            portfolioId,
            title,
            company,
            startDate,
            endDate,
            description,
            position,
            location,
            current,
            technologies
        });
        const savedExperience = await experience.save();
        res.status(201).json({ data: savedExperience });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getExperienceByPortfolioId = async (req, res) => {
    try {
        const experiences = await Experience.find({ portfolioId: req.params.portfolioId });
        res.status(200).json(experiences);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ error: 'Experience not found' });
        }
        res.status(200).json(experience);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, company, startDate, endDate, description, position, location, current, technologies } = req.body;
        const experience = await Experience.findByIdAndUpdate(id, {
            title,
            company,
            startDate,
            endDate,
            description,
            position,
            location,
            current,
            technologies
        }, { new: true });  
        if (!experience) {
            return res.status(404).json({ error: 'Experience not found' });
        }
        res.status(200).json({ data: experience });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const experience = await Experience.findByIdAndDelete(id);
        if (!experience) {
            return res.status(404).json({ error: 'Experience not found' });
        }
        res.status(200).json({ message: 'Experience deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createExperience,
    getExperienceByPortfolioId,
    getExperienceById,
    updateExperience,
    deleteExperience,
    getMyExperience
};