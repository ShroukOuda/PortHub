const { ObjectId } = require('mongodb');
const { portfolioIds } = require('./portfolios');

const serviceNames = [
  'Web Development', 'Mobile App Development', 'UI/UX Design', 'Consulting',
  'Technical Writing', 'Code Review', 'DevOps Setup', 'Cloud Migration',
  'Database Design', 'API Development', 'Performance Optimization', 'Security Audit',
  'Brand Identity Design', 'User Research', 'Prototyping', 'Frontend Development',
  'Backend Development', 'Full Stack Development', 'WordPress Development', 'E-commerce Solutions',
  'SEO Optimization', 'Content Strategy', 'Training & Workshops', 'Mentoring'
];

const serviceIcons = [
  'web-development.svg', 'mobile-development.svg', 'ui-ux-design.svg', 'consulting.svg',
  'technical-writing.svg', 'code-review.svg', 'devops.svg', 'cloud-migration.svg',
  'database.svg', 'api.svg', 'performance.svg', 'security.svg',
  'brand-design.svg', 'user-research.svg', 'prototyping.svg', 'frontend.svg',
  'backend.svg', 'fullstack.svg', 'wordpress.svg', 'ecommerce.svg',
  'seo.svg', 'content-strategy.svg', 'training.svg', 'mentoring.svg'
];

const services = [];

// Generate 2-6 services per portfolio
portfolioIds.forEach(portfolioId => {
  const numServices = Math.floor(Math.random() * 5) + 2; // 2-6 services
  
  for (let i = 0; i < numServices; i++) {
    const serviceName = serviceNames[Math.floor(Math.random() * serviceNames.length)];
    
    services.push({
      _id: new ObjectId(),
      portfolioId: portfolioId,
      name: serviceName,
      title: `${serviceName} Services`,
      description: `I offer professional ${serviceName.toLowerCase()} services tailored to your needs. With years of experience and a focus on quality, I deliver solutions that exceed expectations.`,
      icon: serviceIcons[Math.floor(Math.random() * serviceIcons.length)]
    });
  }
});

module.exports = { services };