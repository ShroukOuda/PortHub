const express = require('express');
const router = express.Router();
const {
    createService,
    updateService,
    deleteService,
    getServiceById,
    getServicesByPortfolioId,
    getMyServices
} = require('../controllers/serviceController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// User's own services route
router.get('/my', authMiddleware, getMyServices);

router.post('/', authMiddleware, roleMiddleware(['user', 'admin']), createService);
router.put('/:serviceId', authMiddleware, roleMiddleware(['user', 'admin']), updateService);
router.delete('/:serviceId', authMiddleware, roleMiddleware(['user', 'admin']), deleteService);
router.get('/:serviceId', getServiceById);
router.get('/portfolio/:portfolioId', getServicesByPortfolioId);

module.exports = router;