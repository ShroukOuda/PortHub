const { ObjectId } = require('mongodb');
const { portfolioIds } = require('./portfolios');

const institutions = [
  'Stanford University', 'MIT', 'Harvard University', 'University of Oxford', 'University of Cambridge',
  'ETH Zurich', 'Carnegie Mellon University', 'UC Berkeley', 'Princeton University', 'Yale University',
  'Columbia University', 'UCLA', 'University of Toronto', 'University of British Columbia', 'McGill University',
  'University of Sydney', 'University of Melbourne', 'IIT Bombay', 'IIT Delhi', 'IIT Madras',
  'National University of Singapore', 'Tsinghua University', 'University of Tokyo', 'Technical University of Munich',
  'École Polytechnique', 'Sorbonne University', 'University of São Paulo', 'University of Cape Town',
  'University of Lagos', 'American University of Nigeria', 'University of Buenos Aires', 'University of Copenhagen',
  'University of Helsinki', 'University of Amsterdam', 'KU Leuven', 'University of Vienna', 'University of Warsaw'
];

const degrees = [
  'Bachelor of Science in Computer Science',
  'Bachelor of Engineering in Software Engineering',
  'Bachelor of Information Technology',
  'Master of Science in Computer Science',
  'Master of Engineering in Artificial Intelligence',
  'Master of Business Administration',
  'PhD in Computer Science',
  'PhD in Data Science',
  'Bachelor of Design in Interactive Design',
  'Master of Human-Computer Interaction',
  'Bachelor of Science in Data Science',
  'Master of Cybersecurity',
  'Bachelor of Science in Mathematics',
  'Bachelor of Science in Physics',
  'Bachelor of Commerce in Information Systems'
];

const fieldsOfStudy = [
  'Computer Science', 'Software Engineering', 'Data Science', 'Information Technology', 
  'Artificial Intelligence', 'Cybersecurity', 'Human-Computer Interaction', 'Design',
  'Mathematics', 'Physics', 'Business Administration', 'Information Systems'
];

const grades = ['A', 'A-', 'B+', 'B', 'First Class', 'Distinction', '3.8 GPA', '3.9 GPA', '4.0 GPA'];

const educations = [];

// Generate 1-3 education entries per portfolio
portfolioIds.forEach(portfolioId => {
  const numEducations = Math.floor(Math.random() * 3) + 1; // 1-3 education entries
  
  for (let i = 0; i < numEducations; i++) {
    const isCurrent = i === 0 && Math.random() > 0.7; // Some might be current
    
    // Generate random dates
    const endYear = isCurrent ? null : 2015 + Math.floor(Math.random() * 7);
    const startYear = endYear ? endYear - (Math.floor(Math.random() * 4) + 3) : 2019 - (Math.floor(Math.random() * 2) + 1);
    
    educations.push({
      _id: new ObjectId(),
      portfolioId: portfolioId,
      institution: institutions[Math.floor(Math.random() * institutions.length)],
      degree: degrees[Math.floor(Math.random() * degrees.length)],
      fieldOfStudy: fieldsOfStudy[Math.floor(Math.random() * fieldsOfStudy.length)],
      startDate: new Date(startYear, 8, 1), // September
      endDate: endYear ? new Date(endYear, 5, 15) : null, // June
      current: isCurrent,
      description: `Focused on ${fieldsOfStudy[Math.floor(Math.random() * fieldsOfStudy.length)].toLowerCase()}, with coursework in algorithms, data structures, and software design. Participated in research projects and hackathons.`,
      grade: grades[Math.floor(Math.random() * grades.length)],
      gpa: (Math.random() * 1 + 3).toFixed(2) // 3.0-4.0
    });
  }
});

module.exports = { educations };