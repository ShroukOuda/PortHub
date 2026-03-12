const { ObjectId } = require('mongodb');
const { portfolioIds } = require('./portfolios');

const certificateData = [
  { title: 'AWS Certified Solutions Architect',              issuer: 'Amazon Web Services',         techs: ['AWS', 'Cloud Computing', 'Architecture'], image: 'Aws-Certified-Solutions-Architect.jpeg' },
  { title: 'AWS Certified Developer',                        issuer: 'Amazon Web Services',         techs: ['AWS', 'Cloud Computing', 'Node.js'], image: 'Aws-Certified-Developer.jpeg' },
  { title: 'Google Cloud Professional Architect',            issuer: 'Google',                      techs: ['Google Cloud', 'Cloud Computing', 'Architecture'], image: 'Google-Cloud-Professional-Architect.jpeg' },
  { title: 'Microsoft Certified: Azure Developer',           issuer: 'Microsoft',                   techs: ['Azure', 'Cloud Computing', '.NET'], image: 'Microsoft-Certified-Azure-Developer.jpeg' },
  { title: 'Microsoft Certified: Azure Solutions Architect', issuer: 'Microsoft',                   techs: ['Azure', 'Cloud Computing', 'Architecture'], image: 'Microsoft-Certified-Azure-Solutions-Architect.jpeg' },
  { title: 'Certified Kubernetes Administrator',             issuer: 'The Linux Foundation',        techs: ['Kubernetes', 'Docker', 'DevOps'], image: 'Certified-Kubernetes-Administrator.jpeg' },
  { title: 'MongoDB Certified Developer',                    issuer: 'MongoDB',                     techs: ['MongoDB', 'Database', 'NoSQL'], image: 'MongoDB-Certified-Developer.jpeg' },
  { title: 'Oracle Certified Professional',                  issuer: 'Oracle',                      techs: ['Oracle', 'SQL', 'Database'], image: 'Oracle-Certified-Professional.jpeg' },
  { title: 'Cisco Certified Network Associate',              issuer: 'Cisco',                       techs: ['Networking', 'Cisco', 'Infrastructure'], image: 'Cisco-Certified-Network-Associate.jpeg' },
  { title: 'Project Management Professional',                issuer: 'Project Management Institute', techs: ['Project Management', 'Agile', 'Leadership'], image: 'Project-Management-Professional.jpeg' },
  { title: 'Certified Scrum Master',                         issuer: 'Scrum Alliance',              techs: ['Scrum', 'Agile', 'Project Management'], image: 'Certified-Scrum-Master.jpeg' },
  { title: 'Certified Scrum Product Owner',                  issuer: 'Scrum Alliance',              techs: ['Scrum', 'Agile', 'Product Management'], image: 'Certified-Scrum-Product-Owner.jpeg' },
  { title: 'ITIL Foundation',                                issuer: 'AXELOS',                      techs: ['ITIL', 'IT Service Management', 'DevOps'], image: 'ITIL-Foundation.jpeg' },
  { title: 'CompTIA Security+',                              issuer: 'CompTIA',                     techs: ['Cybersecurity', 'Networking', 'Security'], image: 'CompTIA-Security+.jpeg' },
  { title: 'Certified Ethical Hacker',                       issuer: 'EC-Council',                  techs: ['Cybersecurity', 'Penetration Testing', 'Security'], image: 'Certified-Ethical-Hacker.jpeg' },
  { title: 'Google UX Design Certificate',                   issuer: 'Google',                      techs: ['UX Design', 'Prototyping', 'Figma'], image: 'Google-UX-Design-Certificate.jpeg' },
  { title: 'Meta Frontend Developer Certificate',            issuer: 'Meta',                        techs: ['Frontend Development', 'React', 'JavaScript'], image: 'Meta-Frontend-Developer-Certificate.jpeg' },
  { title: 'IBM Data Science Professional Certificate',      issuer: 'IBM',                         techs: ['Data Science', 'Python', 'Machine Learning'], image: 'IBM-Data-Science-Professional-Certificate.jpeg' },
  { title: 'Deep Learning Specialization',                   issuer: 'Coursera',                    techs: ['Deep Learning', 'Machine Learning', 'Python'], image: 'Deep-Learning-Specialization.jpeg' },
  { title: 'TensorFlow Developer Certificate',               issuer: 'Google',                      techs: ['TensorFlow', 'Machine Learning', 'Python'], image: 'TensorFlow-Developer-Certificate.jpeg' },
  { title: 'Tableau Desktop Specialist',                     issuer: 'Tableau',                     techs: ['Tableau', 'Analytics', 'Data Visualization'], image: 'Tableau-Desktop-Specialist.jpeg' },
  { title: 'Salesforce Certified Administrator',             issuer: 'Salesforce',                  techs: ['Salesforce', 'CRM', 'Cloud Computing'], image: 'Salesforce-Certified-Administrator.jpeg' },
  { title: 'HubSpot Marketing Software Certificate',         issuer: 'HubSpot',                     techs: ['Marketing', 'HubSpot', 'Content Strategy'], image: 'HubSpot-Marketing-Software-Certificate.jpeg' },
  { title: 'Google Analytics Individual Qualification',      issuer: 'Google',                      techs: ['Analytics', 'SEO', 'Marketing'], image: 'Google-Analytics-Individual-Qualification.jpeg' },
];

const certificates = [];

portfolioIds.forEach(portfolioId => {
  const numCertificates = Math.floor(Math.random() * 6); // 0–5 certificates

  const shuffled = [...certificateData].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, numCertificates);

  selected.forEach(({ title, issuer, techs, image }) => {
    const hasExpiration  = Math.random() > 0.7;
    const issueYear      = 2018 + Math.floor(Math.random() * 6);
    const issueMonth     = Math.floor(Math.random() * 12);
    const issueDate      = new Date(issueYear, issueMonth, 1);
    const expirationDate = hasExpiration
      ? new Date(issueYear + 2 + Math.floor(Math.random() * 2), issueMonth, 1)
      : null;

    const techCount = Math.floor(Math.random() * 3) + 1;
    const certTech  = [...new Set(techs)].slice(0, techCount);

    certificates.push({
      _id:              new ObjectId(),
      portfolioId:      portfolioId,
      title:            title,
      description:      `Comprehensive certification demonstrating expertise in ${certTech.join(', ')}.`,
      technologies:     certTech,
      issuer:           issuer,
      issueDate:        issueDate,
      expirationDate:   expirationDate,

      // ✅ Matches schema field name exactly
      CertificateImage: `uploads/certificates/seed/${image}`,

      credentialId:     `CRED-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      credentialUrl:    Math.random() > 0.3
        ? `https://credential.verify/${Math.random().toString(36).substring(2, 10)}`
        : '',
    });
  });
});

module.exports = { certificates };