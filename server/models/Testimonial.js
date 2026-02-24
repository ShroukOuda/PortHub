const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({

    portfolioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    authorImage: {
        type: String,
        default: 'default-author-image.png',
        trim: true
    },
    position: {
        type: String,
        required: false,
        trim: true
    },
    company: {
        type: String,
        required: false,
        trim: true
    },
    rating: {
        type: Number,
        required: false,
        min: 1,
        max: 5,
        default: 5
    },
}, {
    timestamps: true,
});



const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
