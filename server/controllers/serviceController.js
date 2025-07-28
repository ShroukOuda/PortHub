const Service = require('../models/Service');

const createService = async (req, res) => {
    const { portfolioId, name, description, icon } = req.body;

    try {
        const newService = new Service({
            portfolioId,
            name,
            description,
            icon
        });

        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service', error: error.message });
    }
}
const updateService = async (req, res) => {
    const { serviceId } = req.params;
    const { name, description, icon } = req.body;

    try {
        const updatedService = await Service.findByIdAndUpdate(serviceId, {
            name,
            description,
            icon
        }, { new: true });
        res.status(200).json(updatedService);
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
    getServicesByPortfolioId
};