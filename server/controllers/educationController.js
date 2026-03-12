const Education = require('../models/Education');
const Portfolio = require('../models/Portfolio');

// Get current user's education
const getMyEducation = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const portfolio = await Portfolio.findOne({ userId });
        
        if (!portfolio) {
            return res.status(200).json({ data: [] });
        }

        const education = await Education.find({ portfolioId: portfolio._id }).sort({ startDate: -1 });
        res.status(200).json({ data: education });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching education', error: error.message });
    }
};

const createEducation = async (req, res) => {
    const { institution, degree, fieldOfStudy, startDate, endDate, description, gpa } = req.body;
    let { portfolioId } = req.body;

    // Date validation
    if (startDate && endDate) {
        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({ message: 'Start date must be before end date' });
        }
    }

    try {
        // If no portfolioId provided, get user's portfolio
        if (!portfolioId && req.user) {
            const portfolio = await Portfolio.findOne({ userId: req.user._id || req.user.id });
            if (portfolio) {
                portfolioId = portfolio._id;
            }
        }

        const newEducation = new Education({
            portfolioId,
            institution,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
            description,
            gpa
        });

        const savedEducation = await newEducation.save();
        res.status(201).json({ data: savedEducation });
    } catch (error) {
        res.status(500).json({ message: 'Error creating education', error: error.message });
    }
}
const getEducationByPortfolioId = async (req, res) => {
    const { portfolioId } = req.params;

    try {
        const education = await Education.find({ portfolioId });
        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching education', error: error.message });
    }
}
const updateEducation = async (req, res) => {
    const { educationId } = req.params;
    const { startDate, endDate } = req.body;

    // Date validation
    if (startDate && endDate) {
        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({ message: 'Start date must be before end date' });
        }
    }

    const allowedFields = ['institution', 'degree', 'fieldOfStudy', 'startDate', 'endDate', 'description', 'grade', 'gpa', 'current'];
    const updateData = Object.fromEntries(
        allowedFields
            .filter(field => req.body[field] !== undefined)
            .map(field => [field, req.body[field]])
    );

    try {
        const updatedEducation = await Education.findByIdAndUpdate(educationId, updateData, { new: true });
        res.status(200).json({ data: updatedEducation });
    } catch (error) {
        res.status(500).json({ message: 'Error updating education', error: error.message });
    }
}
const deleteEducation = async (req, res) => {
    const { educationId } = req.params;

    try {
        await Education.findByIdAndDelete(educationId);
        res.status(200).json({ message: 'Education deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting education', error: error.message });
    }
}
const getEducationById = async (req, res) => {
    const { educationId } = req.params;

    try {
        const education = await Education.findById(educationId).populate('portfolioId', 'title');
        if (!education) {
            return res.status(404).json({ message: 'Education not found' });
        }
        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching education', error: error.message });
    }
}   

module.exports = {
    createEducation,
    getEducationByPortfolioId,
    updateEducation,
    deleteEducation,
    getEducationById,
    getMyEducation
};