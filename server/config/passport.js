require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

// Debug: Check if env vars are loaded
console.log('OAuth Config:', {
  googleClientId: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET',
  githubClientId: process.env.GITHUB_CLIENT_ID ? 'SET' : 'NOT SET'
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists with this Google ID
      let user = await User.findOne({ googleId: profile.id });
      
      if (user) {
        return done(null, user);
      }
      
      // Check if user exists with same email
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      if (email) {
        user = await User.findOne({ email });
        if (user) {
          // Link Google account to existing user
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        }
      }
      
      // Create new user
      const newUser = await User.create({
        googleId: profile.id,
        firstName: profile.name?.givenName || profile.displayName?.split(' ')[0] || 'User',
        lastName: profile.name?.familyName || profile.displayName?.split(' ').slice(1).join(' ') || '',
        username: `google_${profile.id}`,
        email: email || `google_${profile.id}@placeholder.com`,
        phone: 'Not provided',
        password: `oauth_${Date.now()}_${Math.random().toString(36)}`, // Random password for OAuth users
        profilePicture: profile.photos && profile.photos[0] ? profile.photos[0].value : 'default-profile.png',
        bio: 'Joined via Google',
        gender: 'other',
        dateOfBirth: new Date('1990-01-01'),
        country: 'Not specified',
        city: 'Not specified',
        address: 'Not specified',
        jobTitle: 'Not specified',
        authProvider: 'google'
      });
      
      return done(null, newUser);
    } catch (error) {
      return done(error, null);
    }
  }
));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/api/auth/github/callback',
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists with this GitHub ID
      let user = await User.findOne({ githubId: profile.id.toString() });
      
      if (user) {
        return done(null, user);
      }
      
      // Get email from profile
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      
      if (email) {
        user = await User.findOne({ email });
        if (user) {
          // Link GitHub account to existing user
          user.githubId = profile.id.toString();
          await user.save();
          return done(null, user);
        }
      }
      
      // Create new user
      const displayName = profile.displayName || profile.username || 'GitHub User';
      const nameParts = displayName.split(' ');
      
      const newUser = await User.create({
        githubId: profile.id.toString(),
        firstName: nameParts[0] || 'User',
        lastName: nameParts.slice(1).join(' ') || '',
        username: `github_${profile.username || profile.id}`,
        email: email || `github_${profile.id}@placeholder.com`,
        phone: 'Not provided',
        password: `oauth_${Date.now()}_${Math.random().toString(36)}`, // Random password for OAuth users
        profilePicture: profile.photos && profile.photos[0] ? profile.photos[0].value : 'default-profile.png',
        bio: profile.bio || 'Joined via GitHub',
        gender: 'other',
        dateOfBirth: new Date('1990-01-01'),
        country: 'Not specified',
        city: 'Not specified',
        address: 'Not specified',
        jobTitle: 'Not specified',
        authProvider: 'github'
      });
      
      return done(null, newUser);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
