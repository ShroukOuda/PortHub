const { ObjectId } = require('mongodb');
const { portfolioIds } = require('./portfolios');

const companies = [
  'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla', 'Adobe', 'Salesforce', 'Oracle',
  'IBM', 'Intel', 'Cisco', 'Uber', 'Airbnb', 'Spotify', 'Slack', 'Zoom', 'Shopify', 'Twitter',
  'LinkedIn', 'PayPal', 'Square', 'Stripe', 'Dropbox', 'Pinterest', 'Reddit', 'Snapchat', 'TikTok',
  'Tech Mahindra', 'Infosys', 'TCS', 'Wipro', 'HCL', 'Accenture', 'Deloitte', 'PwC', 'EY', 'KPMG',
  'Goldman Sachs', 'JPMorgan', 'Bank of America', 'Wells Fargo', 'Citibank', 'Capital One', 'Visa', 'Mastercard',
  'StartupXYZ', 'TechVentures', 'InnovateLabs', 'DigitalSolutions', 'CloudNative Inc', 'DataDriven Co'
];

const jobTitles = [
  'Senior Software Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer',
  'DevOps Engineer', 'Data Scientist', 'UI/UX Designer', 'Product Manager', 'Project Manager',
  'Technical Lead', 'Software Architect', 'Mobile Developer', 'Cloud Architect', 'Security Engineer',
  'Machine Learning Engineer', 'AI Specialist', 'Database Administrator', 'Systems Administrator',
  'QA Engineer', 'Business Analyst', 'IT Consultant', 'Web Developer', 'Game Developer',
  'Blockchain Developer', 'AR/VR Developer', 'Embedded Systems Engineer', 'Network Engineer',
  'Technical Writer', 'Developer Advocate', 'Site Reliability Engineer', 'Scrum Master'
];

const locations = [
  'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA',
  'London, UK', 'Manchester, UK', 'Toronto, ON', 'Vancouver, BC', 'Montreal, QC',
  'Sydney, NSW', 'Melbourne, VIC', 'Bangalore, KA', 'Mumbai, MH', 'Berlin, Germany',
  'Munich, Germany', 'Paris, France', 'Lyon, France', 'Tokyo, Japan', 'Osaka, Japan',
  'Singapore', 'Shanghai, China', 'Hong Kong', 'Dubai, UAE', 'Amsterdam, Netherlands'
];

const experiences = [];

// Generate 2-5 experiences per portfolio
portfolioIds.forEach(portfolioId => {
  const numExperiences = Math.floor(Math.random() * 4) + 2; // 2-5 experiences
  
  for (let i = 0; i < numExperiences; i++) {
    const isCurrent = i === 0 && Math.random() > 0.3; // First experience often current
    
    // Generate random dates
    const endYear = isCurrent ? null : 2020 + Math.floor(Math.random() * 4);
    const startYear = endYear ? endYear - (Math.floor(Math.random() * 3) + 1) : 2021 - (Math.floor(Math.random() * 3) + 1);
    
    // Generate 1-4 technologies
    const techCount = Math.floor(Math.random() * 4) + 1;
    const technologies = [];
    const techOptions = ['React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'GraphQL'];
    for (let j = 0; j < techCount; j++) {
      technologies.push(techOptions[Math.floor(Math.random() * techOptions.length)]);
    }
    
    experiences.push({
      _id: new ObjectId(),
      portfolioId: portfolioId,
      title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      startDate: new Date(startYear, Math.floor(Math.random() * 12), 1),
      endDate: endYear ? new Date(endYear, Math.floor(Math.random() * 12), 1) : null,
      current: isCurrent,
      description: `Led development of key features and mentored junior developers. Collaborated with cross-functional teams to deliver high-quality software solutions. Implemented best practices for code quality and performance optimization.`,
      position: jobTitles[Math.floor(Math.random() * jobTitles.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      technologies: technologies
    });
  }
});

module.exports = { experiences };