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
        minlength: 2,
        maxlength: 100,
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
        minlength: 2,
        maxlength: 100,
        trim: true
    },
}, {
    timestamps: true,
});



const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
