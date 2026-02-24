const Skill = require('../models/Skill');
const Portfolio = require('../models/Portfolio');

// Get current user's skills
const getMySkills = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const portfolio = await Portfolio.findOne({ userId });
        
        if (!portfolio) {
            return res.status(200).json({ data: [] });
        }

        const skills = await Skill.find({ portfolioId: portfolio._id });
        res.status(200).json({ data: skills });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching skills', error: error.message });
    }
};

const createSkill = async (req, res) => {
    const { name, level, category, icon } = req.body;
    let { portfolioId } = req.body;

    try {
        // If no portfolioId provided, get user's portfolio
        if (!portfolioId && req.user) {
            const portfolio = await Portfolio.findOne({ userId: req.user._id || req.user.id });
            if (portfolio) {
                portfolioId = portfolio._id;
            }
        }

        const newSkill = new Skill({
            portfolioId,
            name,
            level,
            category,
            icon
        });

        const savedSkill = await newSkill.save();
        res.status(201).json({ data: savedSkill });
    } catch (error) {
        res.status(500).json({ message: 'Error creating skill', error: error.message });
    }
}

const getSkillsByPortfolioId = async (req, res) => {
    const { portfolioId } = req.params;

    try {
        const skills = await Skill.find({ portfolioId });
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching skills', error: error.message });
    }
}
const updateSkill = async (req, res) => {
    const { skillId } = req.params;
    const { name, level, category, icon } = req.body;

    try {
        const updatedSkill = await Skill.findByIdAndUpdate(skillId, {
            name,
            level,
            category,
            icon
        }, { new: true });
        res.status(200).json({ data: updatedSkill });
    } catch (error) {
        res.status(500).json({ message: 'Error updating skill', error: error.message });
    }
}
const deleteSkill = async (req, res) => {
    const { skillId } = req.params;

    try {
        await Skill.findByIdAndDelete(skillId);
        res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting skill', error: error.message });
    }
}

const getSkillById = async (req, res) => {
    const { skillId } = req.params;

    try {
        const skill = await Skill.findById(skillId).populate('portfolioId', 'title');
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.status(200).json(skill);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching skill', error: error.message });
    }
}
module.exports = {
    getSkillById,
    getSkillsByPortfolioId,
    createSkill,
    updateSkill,
    deleteSkill,
    getMySkills
}