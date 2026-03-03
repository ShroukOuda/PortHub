require('dotenv').config();
const userModel = require('../models/User');
const Portfolio = require('../models/Portfolio');
const { hashPassword } = require('../utils/hash');


// Get public stats (no auth required) — totals + country breakdown
const getPublicStats = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments();
        const totalPortfolios = await Portfolio.countDocuments({ isPublic: { $ne: false } });

        // Country breakdown — count users per country
        const countryAgg = await userModel.aggregate([
            { $match: { country: { $exists: true, $ne: '' } } },
            { $group: { _id: '$country', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        const countryCounts = countryAgg.map(c => ({ country: c._id, count: c.count }));
        const totalCountries = countryCounts.length;

        res.status(200).json({ totalUsers, totalPortfolios, totalCountries, countryCounts });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};

// Get all users (admin use)
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Get users who have at least one public portfolio (public listing)
const getUsersWithPublicPortfolios = async (req, res) => {
    try {
        // Find portfolios where isPublic is not explicitly false (true or undefined both count as public)
        const publicPortfolios = await Portfolio.find({ isPublic: { $ne: false } }).select('userId').lean();
        const userIds = [...new Set(publicPortfolios.map(p => p.userId.toString()))];

        const users = await userModel.find({ _id: { $in: userIds } }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

// Update user
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, username, email, password, phone, gender, country, dateOfBirth, city, address, role } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.username = username || user.username;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.role = role || user.role;
        user.gender = gender || user.gender;
        user.country = country || user.country;
        user.city = city || user.city;
        user.address = address || user.address;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;

        if (password) {
            user.password = await hashPassword(password);
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};  

// Delete user
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// Update current user's profile (self-update)
const updateMyProfile = async (req, res) => {
    const userId = req.user._id;
    const { firstName, lastName, username, phone, gender, country, dateOfBirth, city, address, bio, jobTitle, profilePicture } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if username is being changed and if it's already taken
        if (username && username !== user.username) {
            const existingUser = await userModel.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already taken' });
            }
        }

        // Update allowed fields only (not email, role, or password)
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.username = username || user.username;
        user.phone = phone !== undefined ? phone : user.phone;
        user.gender = gender || user.gender;
        user.country = country || user.country;
        user.city = city || user.city;
        user.address = address || user.address;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;
        user.bio = bio !== undefined ? bio : user.bio;
        user.jobTitle = jobTitle || user.jobTitle;
        if (profilePicture !== undefined) user.profilePicture = profilePicture;

        await user.save();
        
        // Return user without password
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(200).json({ message: 'Profile updated successfully', user: userResponse });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};

// Change current user's password
const changePassword = async (req, res) => {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const bcrypt = require('bcrypt');
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Validate new password
        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters' });
        }

        // Update password
        user.password = await hashPassword(newPassword);
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error changing password', error: error.message });
    }
};

// Get current user's profile
const getMyProfile = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getPublicStats,
    getUsersWithPublicPortfolios,
    getUserById,
    updateUser,
    deleteUser,
    updateMyProfile,
    changePassword,
    getMyProfile
};  