const SkillDefinition = require('../models/SkillDefinition');
const { deleteFile } = require('../utils/fileUtils');

// Get all active skill definitions (public)
const getAllSkillDefinitions = async (req, res) => {
    try {
        const skills = await SkillDefinition.find({ isActive: true }).sort({ category: 1, name: 1 });
        res.status(200).json({ data: skills });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching skill definitions', error: error.message });
    }
};

// Get all skill definitions including inactive (admin)
const getAllSkillDefinitionsAdmin = async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (category && category !== 'all') {
            query.category = category;
        }
        const skills = await SkillDefinition.find(query).sort({ category: 1, name: 1 });
        res.status(200).json({ data: skills });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching skill definitions', error: error.message });
    }
};

// Create a new skill definition (admin)
const createSkillDefinition = async (req, res) => {
    const { name, category, icon } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ message: 'Skill name is required' });
        }
        const existing = await SkillDefinition.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
        if (existing) {
            return res.status(409).json({ message: 'A skill with this name already exists' });
        }
        const skill = await SkillDefinition.create({ name, category: category || 'Technical', icon });
        res.status(201).json({ data: skill });
    } catch (error) {
        res.status(500).json({ message: 'Error creating skill definition', error: error.message });
    }
};

// Update a skill definition (admin)
const updateSkillDefinition = async (req, res) => {
    const { id } = req.params;

    const allowedFields = ['name', 'category', 'icon', 'isActive'];
    const updateData = Object.fromEntries(
        allowedFields
            .filter(field => req.body[field] !== undefined)
            .map(field => [field, req.body[field]])
    );

    try {
        if (updateData.icon) {
            const existing = await SkillDefinition.findById(id);
            if (existing?.icon && existing.icon !== updateData.icon) {
                await deleteFile(existing.icon);
            }
        }

        const skill = await SkillDefinition.findByIdAndUpdate(id, updateData, { new: true });
        if (!skill) {
            return res.status(404).json({ message: 'Skill definition not found' });
        }
        res.status(200).json({ data: skill });
    } catch (error) {
        res.status(500).json({ message: 'Error updating skill definition', error: error.message });
    }
};

// Delete a skill definition (admin)
const deleteSkillDefinition = async (req, res) => {
    const { id } = req.params;
    try {
        await SkillDefinition.findByIdAndDelete(id);
        res.status(200).json({ message: 'Skill definition deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting skill definition', error: error.message });
    }
};

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await SkillDefinition.distinct('category');
        res.status(200).json({ data: categories.sort() });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

module.exports = {
    getAllSkillDefinitions,
    getAllSkillDefinitionsAdmin,
    createSkillDefinition,
    updateSkillDefinition,
    deleteSkillDefinition,
    getCategories
};
