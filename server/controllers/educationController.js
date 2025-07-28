const Education = require('../models/Education');
const createEducation = async (req, res) => {
    const { portfolioId, institution, degree, fieldOfStudy, startDate, endDate, description } = req.body;

    try {
        const newEducation = new Education({
            portfolioId,
            institution,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
            description
        });

        const savedEducation = await newEducation.save();
        res.status(201).json(savedEducation);
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
    const { institution, degree, fieldOfStudy, startDate, endDate, description } = req.body;

    try {
        const updatedEducation = await Education.findByIdAndUpdate(educationId, {
            institution,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
            description
        }, { new: true });
        res.status(200).json(updatedEducation);
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
    getEducationById
};