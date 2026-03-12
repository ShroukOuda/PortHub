const fs = require('fs');
const path = require('path');
const Testimonial = require('../models/Testimonial');
const Portfolio = require('../models/Portfolio');
const { deleteFile } = require('../utils/fileUtils');



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

    const allowedFields = ['content', 'author', 'authorImage', 'position', 'company', 'rating'];
    const updateData = Object.fromEntries(
        allowedFields
            .filter(field => req.body[field] !== undefined)
            .map(field => [field, req.body[field]])
    );

    // Support legacy field aliases
    if (updateData.author === undefined && req.body.clientName !== undefined) updateData.author = req.body.clientName;
    if (updateData.authorImage === undefined && req.body.clientImage !== undefined) updateData.authorImage = req.body.clientImage;
    if (updateData.position === undefined && req.body.clientPosition !== undefined) updateData.position = req.body.clientPosition;
    if (updateData.company === undefined && req.body.clientCompany !== undefined) updateData.company = req.body.clientCompany;

    try {
        if (updateData.authorImage) {
            const existing = await Testimonial.findById(testimonialId);
            if (existing?.authorImage && existing.authorImage !== updateData.authorImage) {
                await deleteFile(existing.authorImage, 'default-author-image.png');
            }
        }

        const updatedTestimonial = await Testimonial.findByIdAndUpdate(testimonialId, updateData, { new: true });
        res.status(200).json({ data: updatedTestimonial });
    } catch (error) {
        res.status(500).json({ message: 'Error updating testimonial', error: error.message });
    }
};
const deleteTestimonial = async (req, res) => {
    const { testimonialId } = req.params;

    try {
        const testimonial = await Testimonial.findById(testimonialId);
        if (testimonial && testimonial.authorImage) {
            await deleteFile(testimonial.authorImage, 'default-author-image.png');
        }

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