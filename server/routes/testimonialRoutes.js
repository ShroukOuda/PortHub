const express = require('express');
const router = express.Router();
const {
    createTestimonial,
    getTestimonialsByPortfolioId,
    getTestimonialById,
    updateTestimonial,
    deleteTestimonial,
    getMyTestimonials
} = require('../controllers/testimonialController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// User's own testimonials route
router.get('/my', authMiddleware, getMyTestimonials);

router.post('/', authMiddleware, roleMiddleware(['user', 'admin']), createTestimonial);
router.get('/portfolio/:portfolioId', getTestimonialsByPortfolioId);
router.get('/:testimonialId', getTestimonialById);
router.put('/:testimonialId', authMiddleware, roleMiddleware(['user', 'admin']), updateTestimonial);
router.delete('/:testimonialId', authMiddleware, roleMiddleware(['user', 'admin']), deleteTestimonial);

module.exports = router;
