const express = require('express');
const router = express.Router();
const {
    createTestimonial,
    getTestimonialsByPortfolioId,
    getTestimonialById,
    updateTestimonial,
    deleteTestimonial
} = require('../controllers/testimonialController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['user']), createTestimonial);
router.get('/:portfolioId', getTestimonialsByPortfolioId);
router.get('/testimonial/:testimonialId', getTestimonialById);
router.put('/testimonial/:testimonialId', authMiddleware, roleMiddleware(['user']), updateTestimonial);
router.delete('/testimonial/:testimonialId', authMiddleware, roleMiddleware(['user']), deleteTestimonial);

module.exports = router;
