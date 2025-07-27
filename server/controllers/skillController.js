const Skill = require('../models/Skill');

const createSkill = async (req, res) => {
    const { portfolioId, name, level } = req.body;

    try {
        const newSkill = new Skill({
            portfolioId,
            name,
            level,
        });

        const savedSkill = await newSkill.save();
        res.status(201).json(savedSkill);
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
    const { name, level } = req.body;

    try {
        const updatedSkill = await Skill.findByIdAndUpdate(skillId, {
            name,
            level
        }, { new: true });
        res.status(200).json(updatedSkill);
    } catch (error) {
        res.status(500).json({ message: 'Error updating skill', error: error.message });
    }
}
const deleteSkill = async (req, res) => {
    const { skillId } = req.params;

    try {
        await Skill.findByIdAndDelete(skillId);
        res.status(204).send('Skill deleted successfully');
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
    deleteSkill
}