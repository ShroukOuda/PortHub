const Portfolio = require('../models/Portfolio');

const createPortfolio = async (req, res) => {
    const { userId, title, About, sociallinks } = req.body;

    try {
        const newPortfolio = new Portfolio({
            userId,
            title,
            About,
            sociallinks
        });

        const savedPortfolio = await newPortfolio.save();
        res.status(201).json(savedPortfolio);
    } catch (error) {
        res.status(500).json({ message: 'Error creating portfolio', error: error.message });
    }
}

const updatePortfolio = async (req, res) => {
    const { portfolioId } = req.params;
    const { title, About, sociallinks } = req.body;

    try {
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(portfolioId, {
            title,
            About,
            sociallinks
        }, { new: true });
        res.status(200).json(updatedPortfolio);
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
        const portfolios = await Portfolio.find({ userId }).populate('userId', 'name email');
        if (portfolios.length === 0) {
            return res.status(404).json({ message: 'No portfolios found for this user' });
        }
        res.status(200).json(portfolios);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching portfolios', error: error.message });
    }
}

const getAllPortfolios = async (req, res) => {
    try {
        const portfolios = await Portfolio.find().populate('userId', 'name email');
        res.status(200).json(portfolios);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching portfolios', error: error.message });
    }
}

module.exports = {
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    getPortfolioById,
    getPortfolioByUserId,   
    getAllPortfolios
};