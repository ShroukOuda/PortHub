const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Service = require('../models/Service');
const Education = require('../models/Education');
const Experience = require('../models/Experience');
const Certificate = require('../models/Certificate');
const Testimonial = require('../models/Testimonial');

// Get admin dashboard statistics
const getAdminStats = async (req, res) => {
    try {
        const [
            totalUsers,
            totalPortfolios,
            totalProjects,
            totalSkills,
            adminCount,
            publicPortfolioCount,
            privatePortfolioCount,
            recentUsers,
            recentPortfolios,
            usersThisMonth,
            portfoliosThisMonth
        ] = await Promise.all([
            User.countDocuments(),
            Portfolio.countDocuments(),
            Project.countDocuments(),
            Skill.countDocuments(),
            User.countDocuments({ role: 'admin' }),
            Portfolio.countDocuments({ isPublic: { $ne: false } }),
            Portfolio.countDocuments({ isPublic: false }),
            User.find().sort({ createdAt: -1 }).limit(5).select('firstName lastName email createdAt profileImage profilePicture'),
            Portfolio.find().sort({ createdAt: -1 }).limit(5).populate('userId', 'firstName lastName'),
            User.countDocuments({
                createdAt: { $gte: new Date(new Date().setDate(1)) }
            }),
            Portfolio.countDocuments({
                createdAt: { $gte: new Date(new Date().setDate(1)) }
            })
        ]);

        // Total portfolio views across platform
        const viewsAgg = await Portfolio.aggregate([
            { $group: { _id: null, totalViews: { $sum: '$views' } } }
        ]);
        const totalViews = viewsAgg.length > 0 ? viewsAgg[0].totalViews : 0;

        // Top viewed portfolios
        const topPortfolios = await Portfolio.find({ views: { $gt: 0 } })
            .sort({ views: -1 })
            .limit(5)
            .populate('userId', 'firstName lastName')
            .select('title views userId');

        // User registration over last 12 months
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
        twelveMonthsAgo.setDate(1);
        twelveMonthsAgo.setHours(0, 0, 0, 0);

        const userGrowth = await User.aggregate([
            { $match: { createdAt: { $gte: twelveMonthsAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Portfolio creation over last 12 months
        const portfolioGrowth = await Portfolio.aggregate([
            { $match: { createdAt: { $gte: twelveMonthsAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Build complete 12-month arrays
        const months = [];
        for (let i = 11; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            months.push(d.toISOString().slice(0, 7)); // YYYY-MM
        }

        const userGrowthData = months.map(m => {
            const entry = userGrowth.find(e => e._id === m);
            return { month: m, count: entry ? entry.count : 0 };
        });

        const portfolioGrowthData = months.map(m => {
            const entry = portfolioGrowth.find(e => e._id === m);
            return { month: m, count: entry ? entry.count : 0 };
        });

        // Platform-wide daily views for last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        const allPortfolios = await Portfolio.find({ 'viewHistory.0': { $exists: true } }).select('viewHistory');
        const dailyViewsMap = {};
        for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.toISOString().split('T')[0];
            dailyViewsMap[key] = 0;
        }
        allPortfolios.forEach(p => {
            p.viewHistory.forEach(entry => {
                const key = new Date(entry.date).toISOString().split('T')[0];
                if (dailyViewsMap.hasOwnProperty(key)) {
                    dailyViewsMap[key] += entry.count;
                }
            });
        });
        const platformViewHistory = Object.entries(dailyViewsMap).map(([date, count]) => ({ date, count }));

        // Country breakdown
        const countryAgg = await User.aggregate([
            { $match: { country: { $ne: null, $ne: '' } } },
            { $group: { _id: '$country', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        const countryCounts = countryAgg.map(c => ({ country: c._id, count: c.count }));
        const totalCountries = countryCounts.length;

        // Gender breakdown
        const genderAgg = await User.aggregate([
            { $match: { gender: { $ne: null, $ne: '' } } },
            { $group: { _id: '$gender', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        const genderCounts = genderAgg.map(g => ({ gender: g._id, count: g.count }));

        // Job title breakdown
        const jobTitleAgg = await User.aggregate([
            { $match: { jobTitle: { $ne: null, $ne: '' } } },
            { $group: { _id: '$jobTitle', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        const jobTitleCounts = jobTitleAgg.map(j => ({ jobTitle: j._id, count: j.count }));

        res.status(200).json({
            data: {
                totalUsers,
                totalPortfolios,
                totalProjects,
                totalSkills,
                totalViews,
                adminCount,
                publicPortfolioCount,
                privatePortfolioCount,
                usersThisMonth,
                portfoliosThisMonth,
                recentUsers,
                recentPortfolios,
                topPortfolios,
                userGrowthData,
                portfolioGrowthData,
                platformViewHistory,
                totalCountries,
                countryCounts,
                genderCounts,
                jobTitleCounts
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin stats', error: error.message });
    }
};

// Get all users (admin)
const getUsers = async (req, res) => {
    try {
        const { search, status, role, page = 1, limit = 10, sortBy = 'newest' } = req.query;
        
        let query = {};
        
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { username: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (status === 'active') {
            query.isActive = true;
        } else if (status === 'inactive') {
            query.isActive = false;
        }
        
        if (role && role !== 'all') {
            query.role = role;
        }

        // Determine sort order
        let sortOption = { createdAt: -1 }; // default: newest
        switch (sortBy) {
            case 'oldest': sortOption = { createdAt: 1 }; break;
            case 'name-asc': sortOption = { firstName: 1, lastName: 1 }; break;
            case 'name-desc': sortOption = { firstName: -1, lastName: -1 }; break;
            case 'email': sortOption = { email: 1 }; break;
            case 'role': sortOption = { role: -1, createdAt: -1 }; break;
            default: sortOption = { createdAt: -1 };
        }

        const total = await User.countDocuments(query);
        const users = await User.find(query)
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .select('-password');

        res.status(200).json({
            data: users,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Toggle user status (active/inactive)
const toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isActive = !user.isActive;
        await user.save();

        res.status(200).json({ 
            message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: 'Error toggling user status', error: error.message });
    }
};

// Change user role (admin)
const changeUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role. Must be "user" or "admin".' });
        }
        
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.status(200).json({ 
            message: `User role changed to ${role} successfully`,
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: 'Error changing user role', error: error.message });
    }
};

// Delete user (admin)
const deleteUserByAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        
        // First delete all user's related data
        const portfolio = await Portfolio.findOne({ userId: id });
        
        if (portfolio) {
            await Promise.all([
                Project.deleteMany({ portfolioId: portfolio._id }),
                Skill.deleteMany({ portfolioId: portfolio._id }),
                Service.deleteMany({ portfolioId: portfolio._id }),
                Education.deleteMany({ portfolioId: portfolio._id }),
                Experience.deleteMany({ portfolioId: portfolio._id }),
                Certificate.deleteMany({ portfolioId: portfolio._id }),
                Testimonial.deleteMany({ portfolioId: portfolio._id }),
                Portfolio.findByIdAndDelete(portfolio._id)
            ]);
        }
        
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: 'User and all related data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// Get all portfolios (admin)
const getPortfolios = async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;
        
        let query = {};
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { About: { $regex: search, $options: 'i' } }
            ];
        }

        const total = await Portfolio.countDocuments(query);
        const portfolios = await Portfolio.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('userId', 'firstName lastName email profileImage');

        res.status(200).json({
            data: portfolios,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching portfolios', error: error.message });
    }
};

// Delete portfolio (admin)
const deletePortfolioByAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Delete all related data
        await Promise.all([
            Project.deleteMany({ portfolioId: id }),
            Skill.deleteMany({ portfolioId: id }),
            Service.deleteMany({ portfolioId: id }),
            Education.deleteMany({ portfolioId: id }),
            Experience.deleteMany({ portfolioId: id }),
            Certificate.deleteMany({ portfolioId: id }),
            Testimonial.deleteMany({ portfolioId: id }),
            Portfolio.findByIdAndDelete(id)
        ]);

        res.status(200).json({ message: 'Portfolio and all related data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting portfolio', error: error.message });
    }
};

module.exports = {
    getAdminStats,
    getUsers,
    toggleUserStatus,
    changeUserRole,
    deleteUserByAdmin,
    getPortfolios,
    deletePortfolioByAdmin
};
