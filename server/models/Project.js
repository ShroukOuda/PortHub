const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
   portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [{
    type: String
  }],
  images: [{
    type: String
  }],
  demoUrl: {
    type: String,
    default: ''
  },
  githubUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);