require('dotenv').config();
const fs = require('fs');
const path = require('path');
const userModel = require('../models/User');
const Portfolio = require('../models/Portfolio');
const { hashPassword } = require('../utils/hash');
const { deleteFile } = require('../utils/fileUtils');




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

// Update user (admin)
const updateUser = async (req, res) => {
    const userId = req.params.id;

    const allowedFields = ['firstName', 'lastName', 'username', 'email', 'phone', 'gender', 'country', 'dateOfBirth', 'city', 'address', 'role'];
    const updateData = Object.fromEntries(
        allowedFields
            .filter(field => req.body[field] !== undefined)
            .map(field => [field, req.body[field]])
    );

    try {
        const existingUser = await userModel.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.body.password) {
            updateData.password = await hashPassword(req.body.password);
        }

        const user = await userModel.findByIdAndUpdate(userId, updateData, { new: true });
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};  

// Delete user
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        // First find the user to get their profile picture path
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete profile picture if it exists and isn't the default
        if (user.profilePicture) {
            try {
                await deleteFile(user.profilePicture, 'default-profile.png');
            } catch (fileError) {
                console.error('Failed to delete user profile picture:', fileError.message);
                
            }
        }

     
        const Portfolio = require('../models/Portfolio');
        const portfolio = await Portfolio.findOne({ userId: user._id });
        
        if (portfolio) {
            // Delete portfolio's projects images
            const Project = require('../models/Project');
            const projects = await Project.find({ portfolioId: portfolio._id });
            for (const project of projects) {
                if (project.image) {
                    await deleteFile(project.image, 'default-project-image.png');
                }
                // Delete the project from DB
                await Project.findByIdAndDelete(project._id);
            }

            // Delete portfolio's certificates images
            const Certificate = require('../models/Certificate');
            const certificates = await Certificate.find({ portfolioId: portfolio._id });
            for (const cert of certificates) {
                if (cert.CertificateImage) {
                    await deleteFile(cert.CertificateImage, 'default-certificate-image.png');
                }
                // Delete the certificate from DB
                await Certificate.findByIdAndDelete(cert._id);
            }

            // Delete portfolio's testimonials
            const Testimonial = require('../models/Testimonial');
            const testimonials = await Testimonial.find({ portfolioId: portfolio._id });
            for (const testimonial of testimonials) {
                if (testimonial.authorImage) {
                    await deleteFile(testimonial.authorImage, 'default-author-image.png');
                }
                await Testimonial.findByIdAndDelete(testimonial._id);
            }

            // Finally delete the portfolio
            await Portfolio.findByIdAndDelete(portfolio._id);
        }

        // Now delete the user
        await userModel.findByIdAndDelete(userId);
        
        res.status(200).json({ message: 'User and all associated data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// Update current user's profile (self-update)
const updateMyProfile = async (req, res) => {
    const userId = req.user._id;

    const allowedFields = ['firstName', 'lastName', 'username', 'phone', 'gender', 'country', 'dateOfBirth', 'city', 'address', 'bio', 'jobTitle', 'profilePicture'];
    const updateData = Object.fromEntries(
        allowedFields
            .filter(field => req.body[field] !== undefined)
            .map(field => [field, req.body[field]])
    );

    try {
        const existingUser = await userModel.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if username is being changed and if it's already taken
        if (updateData.username && updateData.username !== existingUser.username) {
            const duplicateUser = await userModel.findOne({ username: updateData.username });
            if (duplicateUser) {
                return res.status(400).json({ message: 'Username already taken' });
            }
        }

        // Delete old profile picture if a new one is provided
        if (updateData.profilePicture) {
            if (existingUser.profilePicture && existingUser.profilePicture !== updateData.profilePicture) {
                await deleteFile(existingUser.profilePicture, 'default-profile.png');
            }
        }

        const user = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

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
        const bcrypt = require('bcryptjs');
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