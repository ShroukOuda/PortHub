const { ObjectId } = require('mongodb');
const { portfolioIds } = require('./portfolios');

const certificateTitles = [
  'AWS Certified Solutions Architect',
  'AWS Certified Developer',
  'Google Cloud Professional Architect',
  'Microsoft Certified: Azure Developer',
  'Microsoft Certified: Azure Solutions Architect',
  'Certified Kubernetes Administrator',
  'MongoDB Certified Developer',
  'Oracle Certified Professional',
  'Cisco Certified Network Associate',
  'Project Management Professional',
  'Certified Scrum Master',
  'Certified Scrum Product Owner',
  'ITIL Foundation',
  'CompTIA Security+',
  'Certified Ethical Hacker',
  'Google UX Design Certificate',
  'Meta Frontend Developer Certificate',
  'IBM Data Science Professional Certificate',
  'Deep Learning Specialization',
  'TensorFlow Developer Certificate',
  'Tableau Desktop Specialist',
  'Salesforce Certified Administrator',
  'HubSpot Marketing Software Certificate',
  'Google Analytics Individual Qualification'
];

const issuers = [
  'Amazon Web Services', 'Google', 'Microsoft', 'Coursera', 'edX', 'Udacity', 'Udemy',
  'LinkedIn Learning', 'Pluralsight', 'Oracle', 'Cisco', 'CompTIA', 'ISC²', 'EC-Council',
  'Project Management Institute', 'Scrum Alliance', 'The Linux Foundation', 'CNCF',
  'IBM', 'Meta', 'Tableau', 'Salesforce', 'HubSpot', 'Google'
];

const technologies = [
  'AWS', 'Cloud Computing', 'Kubernetes', 'Docker', 'Python', 'Machine Learning',
  'Data Science', 'UX Design', 'Frontend Development', 'React', 'Node.js',
  'Cybersecurity', 'Networking', 'Project Management', 'Agile', 'Scrum',
  'Database', 'MongoDB', 'SQL', 'Analytics', 'Tableau', 'Salesforce'
];

const certificates = [];

// Generate 0-5 certificates per portfolio
portfolioIds.forEach(portfolioId => {
  const numCertificates = Math.floor(Math.random() * 6); // 0-5 certificates
  
  for (let i = 0; i < numCertificates; i++) {
    const hasExpiration = Math.random() > 0.7;
    const issueYear = 2018 + Math.floor(Math.random() * 5);
    const issueMonth = Math.floor(Math.random() * 12);
    const issueDate = new Date(issueYear, issueMonth, 1);
    
    const expirationDate = hasExpiration ? new Date(issueYear + 2 + Math.floor(Math.random() * 2), issueMonth, 1) : null;
    
    // Generate 1-3 technologies
    const techCount = Math.floor(Math.random() * 3) + 1;
    const certTech = [];
    for (let j = 0; j < techCount; j++) {
      certTech.push(technologies[Math.floor(Math.random() * technologies.length)]);
    }
    
    certificates.push({
      _id: new ObjectId(),
      portfolioId: portfolioId,
      title: certificateTitles[Math.floor(Math.random() * certificateTitles.length)],
      description: `Comprehensive certification demonstrating expertise in ${certTech.join(', ')}.`,
      technologies: certTech,
      issuer: issuers[Math.floor(Math.random() * issuers.length)],
      issueDate: issueDate,
      expirationDate: expirationDate,
      CertificateImage: Math.random() > 0.5 ? `uploads/certificates/seed/certificate-${Math.floor(Math.random() * 20) + 1}.jpg` : 'default-certificate-image.png',
      credentialId: `CRED-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      credentialUrl: Math.random() > 0.3 ? `https://credential.verify/${Math.random().toString(36).substring(2, 10)}` : ''
    });
  }
});

module.exports = { certificates };