const express = require('express');
const router = express.Router();
const {
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    getPortfolioById,
    getAllPortfolios
} = require('../controllers/portfolioController');

router.post('/', createPortfolio);
router.put('/:portfolioId', updatePortfolio);
router.delete('/:portfolioId', deletePortfolio);
router.get('/:portfolioId', getPortfolioById);
router.get('/', getAllPortfolios);

module.exports = router;