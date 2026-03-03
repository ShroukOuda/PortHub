const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/portfolioController');

const authMiddleware = require('../middlewares/authMiddleware');
const optionalAuthMiddleware = require('../middlewares/optionalAuthMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// User's own portfolio routes (must be before parameterized routes)
router.get('/my', authMiddleware, getMyPortfolio);
router.get('/my/stats', authMiddleware, getMyPortfolioStats);
router.patch('/:portfolioId/theme', authMiddleware, updatePortfolioTheme);

// Public: track portfolio view (no auth needed)
router.post('/:portfolioId/view', trackPortfolioView);

// Public: get full portfolio data in single call (no auth, faster loading)
router.get('/user/:userId/full', optionalAuthMiddleware, getFullPortfolioByUserId);

router.post('/', authMiddleware, roleMiddleware(['user', 'admin']), createPortfolio);
router.put('/:portfolioId', authMiddleware, roleMiddleware(['user', 'admin']), updatePortfolio);
router.delete('/:portfolioId', authMiddleware, roleMiddleware(['user', 'admin']), deletePortfolio);
router.get('/:portfolioId', authMiddleware, roleMiddleware(['user', 'admin']), getPortfolioById);
router.get('/user/:userId', optionalAuthMiddleware, getPortfolioByUserId);
router.get('/', authMiddleware, roleMiddleware(['admin']), getAllPortfolios);

module.exports = router;
