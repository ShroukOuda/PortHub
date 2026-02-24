const Testimonial = require('../models/Testimonial');
const Portfolio = require('../models/Portfolio');

// Get current user's testimonials
const getMyTestimonials = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const portfolio = await Portfolio.findOne({ userId });
        
        if (!portfolio) {
            return res.status(200).json({ data: [] });
        }

        const testimonials = await Testimonial.find({ portfolioId: portfolio._id });
        res.status(200).json({ data: testimonials });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
    }
};

const createTestimonial = async (req, res) => {
    const { content, clientName, clientImage, clientPosition, clientCompany, author, authorImage, position, company, rating } = req.body;
    let { portfolioId } = req.body;

    try {
        // If no portfolioId provided, get user's portfolio
        if (!portfolioId && req.user) {
            const portfolio = await Portfolio.findOne({ userId: req.user._id || req.user.id });
            if (portfolio) {
                portfolioId = portfolio._id;
            }
        }

        const newTestimonial = new Testimonial({
            portfolioId,
            content,
            author: author || clientName,
            authorImage: authorImage || clientImage,
            position: position || clientPosition,
            company: company || clientCompany,
            rating
        });

        const savedTestimonial = await newTestimonial.save();
        res.status(201).json({ data: savedTestimonial });
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
    const { content, author, authorImage, position, company, rating, clientName, clientImage, clientPosition, clientCompany } = req.body;

    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(testimonialId, {
            content,
            author: author || clientName,
            authorImage: authorImage || clientImage,
            position: position || clientPosition,
            company: company || clientCompany,
            rating
        }, { new: true });
        res.status(200).json({ data: updatedTestimonial });
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
    deleteTestimonial,
    getMyTestimonials
};