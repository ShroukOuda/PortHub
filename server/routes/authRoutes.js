const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

const {
    registerUser,
    loginUser,
    logoutUser,
    checkUsername,
    checkEmail,
    validateEmail,
    validatePhone,
    oauthCallback,
    getOAuthUser,
    forgotPassword,
    verifyResetCode,
    resetPassword
} = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware')('profiles');

// Local auth routes
router.post('/register', upload.single('profilePicture'), registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.get('/check-username', checkUsername);
router.get('/check-email', checkEmail);
router.get('/validate-email', validateEmail);
router.get('/validate-phone', validatePhone);

// Forgot password routes
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-code', verifyResetCode);
router.post('/reset-password', resetPassword);

// OAuth user data
router.get('/oauth/user/:userId', getOAuthUser);

// Google OAuth routes
router.get('/google', (req, res, next) => {
    console.log('Google OAuth initiated');
    next();
}, passport.authenticate('google', { 
    scope: ['profile', 'email'] 
}));

router.get('/google/callback', 
    (req, res, next) => {
        console.log('Google callback received');
        next();
    },
    passport.authenticate('google', { 
        failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:4200'}/login?error=google_auth_failed`,
        session: false 
    }),
    oauthCallback
);

// GitHub OAuth routes
router.get('/github', (req, res, next) => {
    console.log('GitHub OAuth initiated');
    next();
}, passport.authenticate('github', { 
    scope: ['user:email'] 
}));

router.get('/github/callback',
    (req, res, next) => {
        console.log('GitHub callback received');
        next();
    },
    passport.authenticate('github', { 
        failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:4200'}/login?error=github_auth_failed`,
        session: false 
    }),
    oauthCallback
);

module.exports = router;
