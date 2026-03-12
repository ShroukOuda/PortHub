const { ObjectId } = require('mongodb');
const { portfolioIds } = require('./portfolios');

const serviceDefinitions = [
  // Web & Frontend
  { name: 'Web Development' },
  { name: 'Frontend Development' },
  { name: 'Backend Development' },
  { name: 'Full Stack Development' },
  { name: 'WordPress Development' },
  { name: 'E-commerce Solutions' },
  { name: 'Progressive Web Apps' },
  { name: 'Landing Page Design' },

  // Mobile
  { name: 'Mobile App Development' },
  { name: 'iOS Development' },
  { name: 'Android Development' },
  { name: 'Cross-Platform Apps' },

  // Design
  { name: 'UI/UX Design' },
  { name: 'Brand Identity Design' },
  { name: 'Prototyping' },
  { name: 'Wireframing' },
  { name: 'Graphic Design' },
  { name: 'Motion Design' },
  { name: 'Logo Design' },
  { name: 'Design System' },

  // APIs & Backend
  { name: 'API Development' },
  { name: 'REST API Design' },
  { name: 'GraphQL Development' },
  { name: 'Microservices' },
  { name: 'Webhook Integration' },

  // Database
  { name: 'Database Design' },
  { name: 'Database Optimization' },
  { name: 'Data Migration' },
  { name: 'Data Modeling' },

  // DevOps & Cloud
  { name: 'DevOps Setup' },
  { name: 'Cloud Migration' },
  { name: 'CI/CD Pipelines' },
  { name: 'Docker & Kubernetes' },
  { name: 'AWS Solutions' },
  { name: 'Linux Administration' },

  // Security & Performance
  { name: 'Security Audit' },
  { name: 'Performance Optimization' },
  { name: 'Code Review' },
  { name: 'Penetration Testing' },
  { name: 'Vulnerability Assessment' },

  // SEO & Marketing
  { name: 'SEO Optimization' },
  { name: 'Content Strategy' },
  { name: 'Analytics Setup' },
  { name: 'Email Marketing' },

  // Consulting & Training
  { name: 'Consulting' },
  { name: 'Technical Writing' },
  { name: 'Training & Workshops' },
  { name: 'Mentoring' },
  { name: 'Agile Coaching' },
  { name: 'User Research' },
  { name: 'Tech Strategy' },
  { name: 'Project Management' },

  // AI & Emerging Tech
  { name: 'AI Integration' },
  { name: 'Machine Learning' },
  { name: 'Chatbot Development' },
  { name: 'Automation Scripts' },
  { name: 'Web Scraping' },

  // Testing
  { name: 'QA & Testing' },
  { name: 'Unit Testing' },
  { name: 'End-to-End Testing' },
];

const descriptionTemplates = [
  'I offer professional {name} services tailored to your specific needs. With years of hands-on experience and a strong focus on quality, I deliver solutions that are reliable, scalable, and built to exceed expectations.',
  'Specializing in {name}, I help businesses transform their ideas into reality. My approach combines technical expertise with creative problem-solving to deliver outstanding results.',
  'With deep expertise in {name}, I provide end-to-end solutions that drive real business value. From strategy to execution, I ensure every project meets the highest standards.',
  'As a dedicated {name} professional, I bring a unique blend of technical skill and industry knowledge. I focus on delivering measurable outcomes that help my clients succeed.',
  'Offering comprehensive {name} services, I work closely with clients to understand their goals and deliver custom solutions that make a lasting impact.',
];

const services = [];

portfolioIds.forEach(portfolioId => {
  const shuffled = [...serviceDefinitions].sort(() => Math.random() - 0.5);
  const numServices = Math.floor(Math.random() * 5) + 2; // 2-6 services
  const selected = shuffled.slice(0, numServices);

  selected.forEach(({ name }) => {
    const template = descriptionTemplates[Math.floor(Math.random() * descriptionTemplates.length)];
    const description = template.replace('{name}', name.toLowerCase());

    services.push({
      _id:         new ObjectId(),
      portfolioId: portfolioId,
      name:        name,
      title:       name,
      description: description,
    });
  });
});

module.exports = { services };
