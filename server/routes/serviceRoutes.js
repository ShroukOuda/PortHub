const express = require('express');
const router = express.Router();
const {
    createService,
    updateService,
    deleteService,
    getServiceById,
    getServicesByPortfolioId
} = require('../controllers/serviceController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['user']), createService);
router.put('/:serviceId', authMiddleware, roleMiddleware(['user']), updateService);
router.delete('/:serviceId', authMiddleware, roleMiddleware(['user']), deleteService);
router.get('/:serviceId', getServiceById);
router.get('/portfolio/:portfolioId', getServicesByPortfolioId);

module.exports = router;