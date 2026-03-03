const mongoose = require('mongoose');

const SkillDefinitionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        default: 'Technical'
    },
    icon: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('SkillDefinition', SkillDefinitionSchema);
