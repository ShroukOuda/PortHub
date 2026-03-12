const Country = require('../models/Country');

// Public: Get active countries only
const getActiveCountries = async (req, res) => {
    try {
        const countries = await Country.find({ isActive: true }).sort({ name: 1 });
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching countries', error: error.message });
    }
};

// Admin: Get all countries with pagination and search
const getAllCountries = async (req, res) => {
    try {
        const { search = '', page = 1, limit = 20 } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        const filter = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } },
                { dialCode: { $regex: search, $options: 'i' } }
            ];
        }

        const [data, total] = await Promise.all([
            Country.find(filter)
                .sort({ name: 1 })
                .skip((pageNum - 1) * limitNum)
                .limit(limitNum),
            Country.countDocuments(filter)
        ]);

        res.status(200).json({
            data,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                pages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching countries', error: error.message });
    }
};

// Admin: Create a new country
const createCountry = async (req, res) => {
    try {
        const { name, code, dialCode } = req.body;
        if (!name || !code || !dialCode) {
            return res.status(400).json({ message: 'Name, code, and dial code are required' });
        }

        const existing = await Country.findOne({
            $or: [
                { name: { $regex: `^${name.trim()}$`, $options: 'i' } },
                { code: code.trim().toUpperCase() }
            ]
        });
        if (existing) {
            return res.status(409).json({ message: 'Country with this name or code already exists' });
        }

        const country = new Country({
            name: name.trim(),
            code: code.trim().toUpperCase(),
            dialCode: dialCode.trim()
        });
        await country.save();
        res.status(201).json(country);
    } catch (error) {
        res.status(500).json({ message: 'Error creating country', error: error.message });
    }
};

// Admin: Update a country
const updateCountry = async (req, res) => {
    try {
        const { id } = req.params;

        const allowedFields = ['name', 'code', 'dialCode'];
        const updateData = Object.fromEntries(
            allowedFields
                .filter(field => req.body[field] !== undefined)
                .map(field => [field, req.body[field]])
        );

        if (typeof updateData.name === 'string') updateData.name = updateData.name.trim();
        if (typeof updateData.code === 'string') updateData.code = updateData.code.trim().toUpperCase();
        if (typeof updateData.dialCode === 'string') updateData.dialCode = updateData.dialCode.trim();

        const duplicateConditions = [];
        if (updateData.name) {
            duplicateConditions.push({ name: { $regex: `^${updateData.name}$`, $options: 'i' } });
        }
        if (updateData.code) {
            duplicateConditions.push({ code: updateData.code });
        }

        if (duplicateConditions.length > 0) {
            const existing = await Country.findOne({
                $or: duplicateConditions,
                _id: { $ne: id }
            });
            if (existing) {
                return res.status(409).json({ message: 'Country with this name or code already exists' });
            }
        }

        const updated = await Country.findByIdAndUpdate(id, updateData, { new: true });

        if (!updated) {
            return res.status(404).json({ message: 'Country not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Error updating country', error: error.message });
    }
};

// Admin: Delete a country
const deleteCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Country.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Country not found' });
        }
        res.status(200).json({ message: 'Country deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting country', error: error.message });
    }
};

// Admin: Toggle country active status
const toggleCountryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const country = await Country.findById(id);
        if (!country) {
            return res.status(404).json({ message: 'Country not found' });
        }
        country.isActive = !country.isActive;
        await country.save();
        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ message: 'Error toggling country status', error: error.message });
    }
};

module.exports = {
    getActiveCountries,
    getAllCountries,
    createCountry,
    updateCountry,
    deleteCountry,
    toggleCountryStatus
};
