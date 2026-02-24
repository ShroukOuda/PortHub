const Service = require('../models/Service');
const Portfolio = require('../models/Portfolio');

// Get current user's services
const getMyServices = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const portfolio = await Portfolio.findOne({ userId });
        
        if (!portfolio) {
            return res.status(200).json({ data: [] });
        }

        const services = await Service.find({ portfolioId: portfolio._id });
        res.status(200).json({ data: services });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error: error.message });
    }
};

const createService = async (req, res) => {
    const { title, description, icon, price } = req.body;
    let { portfolioId } = req.body;

    try {
        // If no portfolioId provided, get user's portfolio
        if (!portfolioId && req.user) {
            const portfolio = await Portfolio.findOne({ userId: req.user._id || req.user.id });
            if (portfolio) {
                portfolioId = portfolio._id;
            }
        }

        const newService = new Service({
            portfolioId,
            name: title,
            title: title,
            description: description || '',
            icon,
        });

        const savedService = await newService.save();
        res.status(201).json({ data: savedService });
    } catch (error) {
        res.status(500).json({ message: 'Error creating service', error: error.message });
    }
}
const updateService = async (req, res) => {
    const { serviceId } = req.params;
    const { name, title, description, icon } = req.body;

    try {
        const updatedService = await Service.findByIdAndUpdate(serviceId, {
            name: name || title,
            title: title || name,
            description,
            icon
        }, { new: true });
        res.status(200).json({ data: updatedService });
    } catch (error) {
        res.status(500).json({ message: 'Error updating service', error: error.message });
    }
}
const deleteService = async (req, res) => {
    const { serviceId } = req.params;

    try {
        await Service.findByIdAndDelete(serviceId);
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service', error: error.message });
    }
}
const getServiceById = async (req, res) => {
    const { serviceId } = req.params;

    try {
        const service = await Service.findById(serviceId).populate('portfolioId', 'title');
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service', error: error.message });
    }
}
const getServicesByPortfolioId = async (req, res) => {
    const { portfolioId } = req.params;

    try {
        const services = await Service.find({ portfolioId }).populate('portfolioId', 'title');
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error: error.message });
    }
}

module.exports = {
    createService,
    updateService,
    deleteService,
    getServiceById,
    getServicesByPortfolioId,
    getMyServices
};