const Portfolio = require('../models/Portfolio');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Service = require('../models/Service');
const Education = require('../models/Education');
const Experience = require('../models/Experience');
const Certificate = require('../models/Certificate');
const Testimonial = require('../models/Testimonial');
const { deleteFile } = require('../utils/fileUtils');

const createPortfolio = async (req, res) => {
    const { title, About, sociallinks, tagline, bio, theme, isPublic, cvUrl } = req.body;
    
    // Use userId from authenticated user (from JWT token)
    const userId = req.user._id || req.user.id;

    console.log('Creating portfolio for user:', userId);
    console.log('Request body:', req.body);

    try {
        // Check if user already has a portfolio
        const existingPortfolio = await Portfolio.findOne({ userId });
        if (existingPortfolio) {
            return res.status(400).json({ message: 'You already have a portfolio. You can only have one portfolio per account.' });
        }

        const newPortfolio = new Portfolio({
            userId,
            title,
            About,
            tagline,
            bio,
            sociallinks,
            theme,
            isPublic: isPublic !== false,
            cvUrl: cvUrl || ''
        });

        const savedPortfolio = await newPortfolio.save();
        res.status(201).json({ data: savedPortfolio });
    } catch (error) {
        console.error('Error creating portfolio:', error);
        res.status(500).json({ message: 'Error creating portfolio', error: error.message });
    }
}

// Get current user's portfolio with all related data
const getMyPortfolio = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const portfolio = await Portfolio.findOne({ userId }).populate('userId', 'firstName lastName email profileImage').lean();
        
        if (!portfolio) {
            return res.status(404).json({ message: 'No portfolio found. Create one first.' });
        }

        // Get all related data
        const [projects, skills, services, education, experience, certificates, testimonials] = await Promise.all([
            Project.find({ portfolioId: portfolio._id }).lean(),
            Skill.find({ portfolioId: portfolio._id }).lean(),
            Service.find({ portfolioId: portfolio._id }).lean(),
            Education.find({ portfolioId: portfolio._id }).lean(),
            Experience.find({ portfolioId: portfolio._id }).lean(),
            Certificate.find({ portfolioId: portfolio._id }).lean(),
            Testimonial.find({ portfolioId: portfolio._id }).lean()
        ]);

        // Return portfolio with all related data
        res.status(200).json({
            data: {
                ...portfolio,
                projects,
                skills,
                services,
                education,
                experience,
                certificates,
                testimonials
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching portfolio', error: error.message });
    }
};

// Update portfolio theme
const updatePortfolioTheme = async (req, res) => {
    const { portfolioId } = req.params;

    const allowedFields = ['theme'];
    const updateData = Object.fromEntries(
        allowedFields
            .filter(field => req.body[field] !== undefined)
            .map(field => [field, req.body[field]])
    );

    try {
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            portfolioId,
            updateData,
            { new: true }
        );
        res.status(200).json({ data: updatedPortfolio });
    } catch (error) {
        res.status(500).json({ message: 'Error updating theme', error: error.message });
    }
};

const updatePortfolio = async (req, res) => {
    const { portfolioId } = req.params;

    const allowedFields = ['title', 'About', 'tagline', 'bio', 'sociallinks', 'isPublic', 'theme', 'cvUrl', 'AboutImage'];
    const updateData = Object.fromEntries(
        allowedFields
            .filter(field => req.body[field] !== undefined)
            .map(field => [field, req.body[field]])
    );

    if (updateData.sociallinks === undefined && req.body.socialLinks !== undefined) {
        updateData.sociallinks = req.body.socialLinks;
    }

    try {
        if (updateData.AboutImage) {
            const existing = await Portfolio.findById(portfolioId);
            if (existing?.AboutImage && existing.AboutImage !== updateData.AboutImage) {
                await deleteFile(existing.AboutImage, 'default-about-image.png');
            }
        }

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(portfolioId, updateData, { new: true });
        res.status(200).json({ data: updatedPortfolio });
    } catch (error) {
        res.status(500).json({ message: 'Error updating portfolio', error: error.message });
    }
}

const deletePortfolio = async (req, res) => {
    const { portfolioId } = req.params;

    try {
        await Portfolio.findByIdAndDelete(portfolioId);
        res.status(200).json({ message: 'Portfolio deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting portfolio', error: error.message });
    }
}

const getPortfolioById = async (req, res) => {
    const { portfolioId } = req.params;

    try {
        const portfolio = await Portfolio.findById(portfolioId).populate('userId', 'name email');
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching portfolio', error: error.message });
    }
}

const getPortfolioByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const portfolios = await Portfolio.find({ userId }).populate('userId', 'firstName lastName email profileImage');
        if (portfolios.length === 0) {
            return res.status(404).json({ message: 'No portfolios found for this user' });
        }

        // Check access: if portfolio is private, only the owner or an admin can view it
        const requestingUser = req.user; // may be undefined if not logged in
        const filtered = portfolios.filter(p => {
            if (p.isPublic !== false) return true; // public → anyone
            if (!requestingUser) return false;       // private + no auth → hide
            const ownerId = p.userId?._id?.toString() || p.userId?.toString();
            if (requestingUser._id.toString() === ownerId) return true;  // owner
            if (requestingUser.role === 'admin') return true;            // admin
            return false;
        });

        if (filtered.length === 0) {
            return res.status(403).json({ message: 'This portfolio is private' });
        }

        res.status(200).json(filtered);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching portfolios', error: error.message });
    }
}

const getAllPortfolios = async (req, res) => {
    try {
        const portfolios = await Portfolio.find().populate('userId', 'name email').lean();
        res.status(200).json(portfolios);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching portfolios', error: error.message });
    }
}

// Track a portfolio view (public, no auth required)
const trackPortfolioView = async (req, res) => {
    const { portfolioId } = req.params;
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const portfolio = await Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        // Increment total views
        portfolio.views = (portfolio.views || 0) + 1;

        // Update daily view history
        const existingEntry = portfolio.viewHistory.find(
            entry => new Date(entry.date).getTime() === today.getTime()
        );

        if (existingEntry) {
            existingEntry.count += 1;
        } else {
            portfolio.viewHistory.push({ date: today, count: 1 });
        }

        // Keep only last 90 days of history
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
        portfolio.viewHistory = portfolio.viewHistory.filter(
            entry => new Date(entry.date) >= ninetyDaysAgo
        );

        await portfolio.save();
        res.status(200).json({ views: portfolio.views });
    } catch (error) {
        res.status(500).json({ message: 'Error tracking view', error: error.message });
    }
};

// Get current user's portfolio stats (views over time)
const getMyPortfolioStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const portfolio = await Portfolio.findOne({ userId });

        if (!portfolio) {
            return res.status(404).json({ message: 'No portfolio found' });
        }

        // Get view history for last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        // Build a complete 30-day array
        const viewHistory = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);

            const entry = portfolio.viewHistory.find(
                h => new Date(h.date).toDateString() === date.toDateString()
            );

            viewHistory.push({
                date: date.toISOString().split('T')[0],
                count: entry ? entry.count : 0
            });
        }

        // Get content counts for distribution chart
        const portfolioId = portfolio._id;
        const [projects, skills, services, education, experience, certificates, testimonials] = await Promise.all([
            Project.countDocuments({ portfolioId }),
            Skill.countDocuments({ portfolioId }),
            Service.countDocuments({ portfolioId }),
            Education.countDocuments({ portfolioId }),
            Experience.countDocuments({ portfolioId }),
            Certificate.countDocuments({ portfolioId }),
            Testimonial.countDocuments({ portfolioId })
        ]);

        res.status(200).json({
            data: {
                totalViews: portfolio.views || 0,
                viewHistory,
                contentDistribution: {
                    projects,
                    skills,
                    services,
                    education,
                    experience,
                    certificates,
                    testimonials
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};

// Get a user's full portfolio with all related data (public, no auth required)
const getFullPortfolioByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const portfolio = await Portfolio.findOne({ userId }).populate('userId', 'firstName lastName email profilePicture profileImage bio jobTitle city country phone').lean();
        
        if (!portfolio) {
            return res.status(404).json({ message: 'No portfolio found for this user' });
        }

        // Check access
        if (portfolio.isPublic === false) {
            const requestingUser = req.user;
            if (!requestingUser) return res.status(403).json({ message: 'This portfolio is private' });
            const ownerId = portfolio.userId?._id?.toString() || portfolio.userId?.toString();
            if (requestingUser._id.toString() !== ownerId && requestingUser.role !== 'admin') {
                return res.status(403).json({ message: 'This portfolio is private' });
            }
        }

        const portfolioId = portfolio._id;
        const [projects, skills, services, education, experience, certificates, testimonials] = await Promise.all([
            Project.find({ portfolioId }).lean(),
            Skill.find({ portfolioId }).lean(),
            Service.find({ portfolioId }).lean(),
            Education.find({ portfolioId }).lean(),
            Experience.find({ portfolioId }).lean(),
            Certificate.find({ portfolioId }).lean(),
            Testimonial.find({ portfolioId }).lean()
        ]);

        // Extract user data from populated field
        const user = portfolio.userId;
        const portfolioObj = { ...portfolio };
        delete portfolioObj.userId;

        res.status(200).json({
            user,
            portfolio: portfolioObj,
            projects,
            skills,
            services,
            educations: education,
            experiences: experience,
            certificates,
            testimonials
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching full portfolio', error: error.message });
    }
};

module.exports = {
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    getPortfolioById,
    getPortfolioByUserId,   
    getAllPortfolios,
    getMyPortfolio,
    updatePortfolioTheme,
    trackPortfolioView,
    getMyPortfolioStats,
    getFullPortfolioByUserId
};