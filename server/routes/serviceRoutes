const express = require('express');
const router = express.Router();
const {
    createService,
    updateService,
    deleteService,
    getServiceById,
    getServicesByPortfolioId
} = require('../controllers/serviceController');

router.post('/', createService);
router.put('/:serviceId', updateService);
router.delete('/:serviceId', deleteService);
router.get('/:serviceId', getServiceById);
router.get('/portfolio/:portfolioId', getServicesByPortfolioId);

module.exports = router;