const Experience = require('../models/Experience');

const createExperience = async (req, res) => {
    try {
        const { portfolioId, title, company, startDate, endDate, description, position } = req.body;
        const experience = new Experience({
            portfolioId,
            title,
            company,
            startDate,
            endDate,
            description,
            position
        });
        const savedExperience = await experience.save();
        res.status(201).json(savedExperience);
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
        const { title, company, startDate, endDate, description, position } = req.body;
        const experience = await Experience.findByIdAndUpdate(id, {
            title,
            company,
            startDate,
            endDate,
            description,
            position
        }, { new: true });  
        if (!experience) {
            return res.status(404).json({ error: 'Experience not found' });
        }
        res.status(200).json(experience);
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
        res.status(204).send('Experience deleted successfully');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createExperience,
    getExperienceByPortfolioId,
    getExperienceById,
    updateExperience,
    deleteExperience
};