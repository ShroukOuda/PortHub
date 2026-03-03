const express = require('express');
const router = express.Router();
const {
    createService,
    getServicesByPortfolioId,
    getServiceById,
    updateService,
    deleteService,
    getMyServices
} = require('../controllers/serviceController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// User's own services route
router.get('/my', authMiddleware, getMyServices);

router.post('/', authMiddleware, roleMiddleware(['user', 'admin']), createService);
router.get('/portfolio/:portfolioId', getServicesByPortfolioId);
router.get('/:serviceId', getServiceById);
router.put('/:serviceId', authMiddleware, roleMiddleware(['user', 'admin']), updateService);
router.delete('/:serviceId', authMiddleware, roleMiddleware(['user', 'admin']), deleteService);

module.exports = router;