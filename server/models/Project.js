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
  image: {
    type: String,
    required: false,
    default: 'default-project-image.png',
    trim: true
  },
  demoUrl: {
    type: String,
    default: ''
  },
  githubUrl: {
    type: String,
    default: ''
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);