const { ObjectId } = require('mongodb');
const { portfolioIds } = require('./portfolios');

const companies = [
  'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla', 'Adobe',
  'Salesforce', 'Oracle', 'IBM', 'Intel', 'Cisco', 'Uber', 'Airbnb', 'Spotify',
  'Slack', 'Zoom', 'Shopify', 'LinkedIn', 'PayPal', 'Stripe', 'Dropbox',
  'Accenture', 'Deloitte', 'Goldman Sachs', 'JPMorgan', 'Capital One',
  'StartupXYZ', 'TechVentures', 'InnovateLabs', 'CloudNative Inc', 'DataDriven Co',
];

const jobTitles = [
  'Senior Software Engineer', 'Full Stack Developer', 'Frontend Developer',
  'Backend Developer', 'DevOps Engineer', 'Data Scientist', 'UI/UX Designer',
  'Product Manager', 'Technical Lead', 'Software Architect', 'Mobile Developer',
  'Cloud Architect', 'Security Engineer', 'Machine Learning Engineer',
  'QA Engineer', 'Web Developer', 'Site Reliability Engineer', 'Scrum Master',
];

const locations = [
  'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA',
  'London, UK', 'Toronto, ON', 'Sydney, NSW', 'Berlin, Germany', 'Singapore',
  'Paris, France', 'Tokyo, Japan', 'Dubai, UAE', 'Amsterdam, Netherlands',
  'Vancouver, BC', 'Mumbai, MH', 'Bangalore, KA', 'Remote',
];

const descriptionTemplates = [
  'Led development of key features and mentored junior developers. Collaborated with cross-functional teams to deliver scalable software solutions.',
  'Designed and implemented microservices architecture serving millions of users. Reduced system latency by 40% through performance optimization.',
  'Spearheaded migration to cloud infrastructure, improving deployment speed and system reliability. Introduced CI/CD pipelines for the engineering team.',
  'Built responsive web applications and RESTful APIs. Conducted code reviews and established coding standards adopted team-wide.',
  'Developed data pipelines and machine learning models. Collaborated with stakeholders to translate business requirements into technical solutions.',
  'Managed agile development sprints and delivered features on schedule. Improved test coverage from 45% to 90% across the product.',
];

const techOptions = [
  'React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'Kubernetes',
  'MongoDB', 'PostgreSQL', 'GraphQL', 'TypeScript', 'Angular', 'Vue.js',
  'Redis', 'Terraform', 'Jenkins', 'Git', 'REST APIs',
];

const experiences = [];

portfolioIds.forEach(portfolioId => {
  const numExperiences = Math.floor(Math.random() * 4) + 2; // 2-5 experiences
  const usedCompanies = new Set();

  // Build non-overlapping periods in reverse chronological order
  // Start from "now" and work backwards
  let cursor = new Date(2024, 6, 1); // July 2024

  for (let i = 0; i < numExperiences; i++) {
    const isCurrent = i === 0; // Exactly one current (the most recent)

    // Duration: 1-4 years
    const durationMonths = Math.floor(Math.random() * 36) + 12; // 12-48 months

    const endDate = isCurrent ? null : new Date(cursor);
    const startDate = new Date(cursor);
    startDate.setMonth(startDate.getMonth() - durationMonths);

    // Move cursor backward past a gap of 0-6 months
    cursor = new Date(startDate);
    cursor.setMonth(cursor.getMonth() - Math.floor(Math.random() * 7));

    // Pick unique company
    let company;
    do {
      company = companies[Math.floor(Math.random() * companies.length)];
    } while (usedCompanies.has(company) && usedCompanies.size < companies.length);
    usedCompanies.add(company);

    const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];

    // Pick 2-5 unique technologies
    const shuffledTech = [...techOptions].sort(() => Math.random() - 0.5);
    const technologies = shuffledTech.slice(0, Math.floor(Math.random() * 4) + 2);

    experiences.push({
      _id: new ObjectId(),
      portfolioId: portfolioId,
      title: title,
      company: company,
      startDate: startDate,
      endDate: endDate,
      current: isCurrent,
      description: descriptionTemplates[Math.floor(Math.random() * descriptionTemplates.length)],
      position: title,
      location: locations[Math.floor(Math.random() * locations.length)],
      technologies: technologies,
    });
  }
});

module.exports = { experiences };
