const { ObjectId } = require('mongodb');
const { portfolioIds } = require('./portfolios');

const projectDefinitions = [
  { title: 'E-Commerce Platform',           techs: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'], image: 'ecommerce-platform.jpeg' },
  { title: 'Healthcare Management System',  techs: ['Angular', 'Express', 'PostgreSQL', 'Docker'], image: 'healthcare-app.jpeg' },
  { title: 'FinTech Dashboard',             techs: ['Vue.js', 'Python', 'Django', 'AWS', 'D3.js'], image: 'fintech-dashboard.jpeg' },
  { title: 'Social Media App',              techs: ['React Native', 'Firebase', 'GraphQL', 'Node.js'], image: 'social-media-app.jpeg' },
  { title: 'Learning Management System',    techs: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'], image: 'learning-management.jpeg' },
  { title: 'Real Estate Portal',            techs: ['React', 'Spring Boot', 'MySQL', 'Google Maps API'], image: 'real-estate-portal.jpeg' },
  { title: 'Food Delivery App',             techs: ['Flutter', 'Node.js', 'MongoDB', 'Socket.io'], image: 'food-delivery-app.jpeg' },
  { title: 'Travel Booking Platform',       techs: ['Angular', 'Java', 'PostgreSQL', 'Redis'], image: 'travel-booking.jpeg' },
  { title: 'Personal Portfolio Website',    techs: ['Next.js', 'Tailwind CSS', 'Framer Motion'], image: 'portfolio-website.jpeg' },
  { title: 'Blog Platform',                 techs: ['React', 'Node.js', 'MongoDB', 'Markdown'], image: 'blog-platform.jpeg' },
  { title: 'Weather Application',           techs: ['React', 'OpenWeatherAPI', 'Chart.js', 'PWA'], image: 'weather-app.jpeg' },
  { title: 'Task Manager',                  techs: ['Vue.js', 'Firebase', 'Vuetify', 'PWA'], image: 'task-manager.jpeg' },
  { title: 'CRM System',                    techs: ['Angular', 'Express', 'MongoDB', 'JWT'], image: 'crm-system.jpeg' },
  { title: 'Inventory Management',          techs: ['React', 'Node.js', 'PostgreSQL', 'Material UI'], image: 'inventory-management.jpeg' },
  { title: 'Chat Application',              techs: ['React', 'Socket.io', 'Node.js', 'MongoDB'], image: 'chat-application.jpeg' },
  { title: 'Video Streaming Platform',      techs: ['Next.js', 'AWS S3', 'FFmpeg', 'HLS'], image: 'video-streaming.jpeg' },
  { title: 'Analytics Dashboard',           techs: ['React', 'D3.js', 'Python', 'Flask', 'PostgreSQL'], image: 'analytics-dashboard.jpeg' },
  { title: 'IoT Monitoring System',         techs: ['React', 'Node.js', 'MQTT', 'InfluxDB', 'Grafana'], image: 'iot-platform.jpeg' },
  { title: 'AI Chatbot',                    techs: ['Python', 'TensorFlow', 'Flask', 'React'], image: 'ai-chatbot.jpeg' },
  { title: 'Blockchain Wallet',             techs: ['React', 'Solidity', 'Web3.js', 'Ethereum'], image: 'blockchain-wallet.jpeg' },
  { title: 'Fitness Tracker',               techs: ['React Native', 'Node.js', 'MongoDB', 'HealthKit'], image: 'fitness-tracker.jpeg' },
  { title: 'Music Player',                  techs: ['React', 'Web Audio API', 'Node.js', 'MongoDB'], image: 'music-player.jpeg' },
  { title: 'News Aggregator',               techs: ['Vue.js', 'Python', 'FastAPI', 'Redis'], image: 'news-aggregator.jpeg' },
  { title: 'Mobile Game',                   techs: ['Angular', 'Spring Boot', 'MySQL', 'Stripe'], image: 'mobile-game.jpeg' },
  { title: 'Online Code',            techs: ['React', 'Monaco Editor', 'Docker', 'WebSocket'], image: 'online-code-editor.jpeg' },
];

const descriptions = [
  'A comprehensive {title} built with modern technologies. Features include user authentication, real-time updates, responsive design, and optimized performance.',
  'Full-featured {title} designed for scalability and maintainability. Implements best practices in security, testing, and CI/CD deployment.',
  'Production-ready {title} showcasing expertise in full-stack development. Includes admin dashboard, analytics, and automated testing.',
  'Innovative {title} with a focus on user experience and accessibility. Built with clean architecture and comprehensive documentation.',
  'High-performance {title} leveraging cutting-edge technologies. Features include caching, lazy loading, and server-side rendering for optimal speed.',
];

const projects = [];

portfolioIds.forEach(portfolioId => {
  const numProjects = Math.floor(Math.random() * 6) + 3; // 3-8 projects
  const shuffled = [...projectDefinitions].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, numProjects);

  selected.forEach(({ title, techs, image }) => {
    const template = descriptions[Math.floor(Math.random() * descriptions.length)];
    const description = template.replace('{title}', title.toLowerCase());

    projects.push({
      _id: new ObjectId(),
      portfolioId: portfolioId,
      title: title,
      description: description,
      technologies: techs,
      image: `uploads/projects/seed/${image}`,
      demoUrl: Math.random() > 0.3 ? `https://demo-${title.toLowerCase().replace(/\s+/g, '-')}.com` : '',
      githubUrl: Math.random() > 0.2 ? `https://github.com/user/${title.toLowerCase().replace(/\s+/g, '-')}` : '',
    });
  });
});

module.exports = { projects };
