const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    portfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    level: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    icon: {
        type: String,
        required: false,
        trim: true
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Skill', SkillSchema);