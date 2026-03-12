const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    portfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    level: {
        type: mongoose.Schema.Types.Mixed, // Accept both string and number
        required: false,
        default: 50
    },
    category: {
        type: String,
        required: false,
        trim: true,
        default: 'Technical'
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