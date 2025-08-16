const Testimonial = require('../models/Testimonial');

const createTestimonial = async (req, res) => {
    const { portfolioId, content , author, authorImage, position } = req.body;

    try {
        const newTestimonial = new Testimonial({
            portfolioId,
            content,
            author,
            authorImage,
            position

        });

        const savedTestimonial = await newTestimonial.save();
        res.status(201).json(savedTestimonial);
    } catch (error) {
        res.status(500).json({ message: 'Error creating testimonial', error: error.message });
    }
};

const getTestimonialsByPortfolioId = async (req, res) => {
    const { portfolioId } = req.params;

    try {
        const testimonials = await Testimonial.find({ portfolioId });
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
    }
};

const getTestimonialById = async (req, res) => {
    const { testimonialId } = req.params;

    try {
        const testimonial = await Testimonial.findById(testimonialId);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(200).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching testimonial', error: error.message });
    }
};

const updateTestimonial = async (req, res) => {
    const { testimonialId } = req.params;
    const { content } = req.body;

    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(testimonialId, {
            content,
        }, { new: true });
        res.status(200).json(updatedTestimonial);
    } catch (error) {
        res.status(500).json({ message: 'Error updating testimonial', error: error.message });
    }
};
const deleteTestimonial = async (req, res) => {
    const { testimonialId } = req.params;

    try {
        await Testimonial.findByIdAndDelete(testimonialId);
        res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting testimonial', error: error.message });
    }
};

module.exports = {
    createTestimonial,
    getTestimonialsByPortfolioId,
    getTestimonialById,
    updateTestimonial,
    deleteTestimonial
};