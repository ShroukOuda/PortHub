const express = require('express');
const router = express.Router();
const {
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    getPortfolioById,
    getPortfolioByUserId,
    getAllPortfolios
} = require('../controllers/portfolioController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['user']), createPortfolio);
router.put('/:portfolioId', authMiddleware, roleMiddleware(['user']), updatePortfolio);
router.delete('/:portfolioId', authMiddleware, roleMiddleware(['user']), deletePortfolio);
router.get('/:portfolioId', authMiddleware, roleMiddleware(['user', 'admin']), getPortfolioById);
router.get('/user/:userId', getPortfolioByUserId);
router.get('/', authMiddleware, roleMiddleware(['admin']), getAllPortfolios);

module.exports = router;
