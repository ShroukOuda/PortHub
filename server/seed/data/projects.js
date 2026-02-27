const { ObjectId } = require('mongodb');
const { portfolioIds } = require('./portfolios');

const projectImages = [
  'ecommerce-platform.jpg', 'healthcare-app.jpg', 'fintech-dashboard.jpg', 'social-media-app.jpg',
  'learning-management.jpg', 'real-estate-portal.jpg', 'food-delivery-app.jpg', 'travel-booking.jpg',
  'portfolio-website.jpg', 'blog-platform.jpg', 'weather-app.jpg', 'task-manager.jpg',
  'crm-system.jpg', 'inventory-management.jpg', 'chat-application.jpg', 'video-streaming.jpg',
  'analytics-dashboard.jpg', 'iot-platform.jpg', 'ai-chatbot.jpg', 'blockchain-wallet.jpg',
  'mobile-game.jpg', 'fitness-tracker.jpg', 'music-player.jpg', 'news-aggregator.jpg'
];

const projectTitles = [
  'E-Commerce Platform', 'Healthcare Management System', 'FinTech Dashboard', 'Social Media App',
  'Learning Management System', 'Real Estate Portal', 'Food Delivery App', 'Travel Booking Platform',
  'Personal Portfolio Website', 'Blog Platform', 'Weather Application', 'Task Manager',
  'CRM System', 'Inventory Management', 'Chat Application', 'Video Streaming Platform',
  'Analytics Dashboard', 'IoT Monitoring System', 'AI Chatbot', 'Blockchain Wallet',
  'Mobile Game', 'Fitness Tracker', 'Music Player', 'News Aggregator'
];

const technologies = [
  'React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Next.js', 'Vue.js', 'Python',
  'Django', 'Flask', 'PostgreSQL', 'MySQL', 'Firebase', 'AWS', 'Docker', 'Kubernetes',
  'TensorFlow', 'PyTorch', 'Flutter', 'React Native', 'Swift', 'Kotlin', 'Java', 'Spring Boot',
  'GraphQL', 'REST API', 'Redux', 'Tailwind CSS', 'Material UI', 'Bootstrap', 'Figma', 'Adobe XD'
];

const projects = [];

// Generate 3-8 projects per portfolio
portfolioIds.forEach(portfolioId => {
  const numProjects = Math.floor(Math.random() * 6) + 3; // 3-8 projects
  
  for (let i = 0; i < numProjects; i++) {
    const title = projectTitles[Math.floor(Math.random() * projectTitles.length)];
    
    // Generate 2-6 random technologies
    const techCount = Math.floor(Math.random() * 5) + 2;
    const projectTech = [];
    for (let j = 0; j < techCount; j++) {
      projectTech.push(technologies[Math.floor(Math.random() * technologies.length)]);
    }
    
    projects.push({
      _id: new ObjectId(),
      portfolioId: portfolioId,
      title: title,
      description: `A ${title.toLowerCase()} built with modern technologies. This project demonstrates my skills in full-stack development, user experience design, and scalable architecture.`,
      technologies: [...new Set(projectTech)], // Remove duplicates
      image: `/uploads/projects/seed/${projectImages[Math.floor(Math.random() * projectImages.length)]}`,
      demoUrl: Math.random() > 0.3 ? `https://demo-${title.toLowerCase().replace(/\s+/g, '-')}.com` : '',
      githubUrl: Math.random() > 0.2 ? `https://github.com/user/${title.toLowerCase().replace(/\s+/g, '-')}` : ''
    });
  }
});

module.exports = { projects };