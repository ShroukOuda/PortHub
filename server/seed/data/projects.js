const { ObjectId } = require('mongodb');
const { portfolioIds } = require('./portfolios');

const projectImages = [
  'ecommerce-platform.jpeg', 'healthcare-app.jpeg', 'fintech-dashboard.jpeg', 'social-media-app.jpeg',
  'learning-management.jpeg', 'real-estate-portal.jpeg', 'food-delivery-app.jpeg', 'travel-booking.jpeg',
  'portfolio-website.jpeg', 'blog-platform.jpeg', 'weather-app.jpeg', 'task-manager.jpeg',
  'crm-system.jpeg', 'inventory-management.jpeg', 'chat-application.jpeg', 'video-streaming.jpeg',
  'analytics-dashboard.jpeg', 'iot-platform.jpeg', 'ai-chatbot.jpeg', 'blockchain-wallet.jpeg',
  'mobile-game.jpeg', 'fitness-tracker.jpeg', 'music-player.jpeg', 'news-aggregator.jpeg'
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
    const titleIndex = Math.floor(Math.random() * projectTitles.length);
    const title = projectTitles[titleIndex];
    
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
      image: `uploads/projects/seed/${projectImages[titleIndex]}`,
      demoUrl: Math.random() > 0.3 ? `https://demo-${title.toLowerCase().replace(/\s+/g, '-')}.com` : '',
      githubUrl: Math.random() > 0.2 ? `https://github.com/user/${title.toLowerCase().replace(/\s+/g, '-')}` : ''
    });
  }
});

module.exports = { projects };