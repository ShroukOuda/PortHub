const express = require('express');
const router = express.Router();
const {
    getActiveCountries,
    getAllCountries,
    createCountry,
    updateCountry,
    deleteCountry,
    toggleCountryStatus
} = require('../controllers/countryController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Public route - get active countries
router.get('/active', getActiveCountries);

// Admin routes
router.get('/', authMiddleware, roleMiddleware(['admin']), getAllCountries);
router.post('/', authMiddleware, roleMiddleware(['admin']), createCountry);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateCountry);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteCountry);
router.patch('/:id/toggle', authMiddleware, roleMiddleware(['admin']), toggleCountryStatus);

module.exports = router;
