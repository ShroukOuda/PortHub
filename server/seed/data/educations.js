const { ObjectId } = require('mongodb');
const { portfolioIds } = require('./portfolios');

const institutions = [
  'Stanford University',
  'MIT',
  'Harvard University',
  'University of Oxford',
  'University of Cambridge',
  'Carnegie Mellon University',
  'UC Berkeley',
  'University of Toronto',
  'ETH Zurich',
  'National University of Singapore',
  'University of Tokyo',
  'Technical University of Munich',
  'University of Melbourne',
  'IIT Bombay',
  'Georgia Institute of Technology',
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
  'Bachelor of Science in Data Science',
  'Master of Cybersecurity',
  'Bachelor of Science in Mathematics',
  'Master of Human-Computer Interaction',
];

const fieldsOfStudy = [
  'Computer Science', 'Software Engineering', 'Data Science',
  'Information Technology', 'Artificial Intelligence', 'Cybersecurity',
  'Human-Computer Interaction', 'Mathematics', 'Business Administration',
];

const descriptionTemplates = [
  'Focused on {field} with coursework in algorithms, data structures, and software design. Participated in research projects and hackathons.',
  'Studied {field} with emphasis on practical application. Completed capstone project and contributed to open-source initiatives.',
  'Specialized in {field}, gaining deep expertise through hands-on labs, collaborative projects, and academic research.',
  'Pursued {field} with distinction. Engaged in teaching assistantships, peer mentoring, and competitive programming.',
];

const educations = [];

portfolioIds.forEach(portfolioId => {
  const numEducations = Math.floor(Math.random() * 3) + 1; // 1-3 education entries

  // Non-overlapping: work backwards from graduation ~2018-2022
  let cursor = new Date(2018 + Math.floor(Math.random() * 5), 5, 15); // June graduation

  for (let i = 0; i < numEducations; i++) {
    const isCurrent = i === 0 && Math.random() > 0.85; // ~15% chance first entry is current

    const endDate = isCurrent ? null : new Date(cursor);

    // Duration: 2-5 years depending on degree level
    const durationYears = Math.floor(Math.random() * 4) + 2; // 2-5 years
    const startDate = new Date(cursor);
    startDate.setFullYear(startDate.getFullYear() - durationYears);
    startDate.setMonth(8); // September start

    // Move cursor backward (1-2 year gap between degrees)
    cursor = new Date(startDate);
    cursor.setMonth(cursor.getMonth() - Math.floor(Math.random() * 12) - 6);

    const institution = institutions[Math.floor(Math.random() * institutions.length)];
    const degree = degrees[Math.floor(Math.random() * degrees.length)];
    const field = fieldsOfStudy[Math.floor(Math.random() * fieldsOfStudy.length)];
    const template = descriptionTemplates[Math.floor(Math.random() * descriptionTemplates.length)];

    // Numeric GPA 3.0-4.0
    const gpa = (Math.random() * 1.0 + 3.0).toFixed(2);

    educations.push({
      _id: new ObjectId(),
      portfolioId: portfolioId,
      institution: institution,
      degree: degree,
      fieldOfStudy: field,
      startDate: startDate,
      endDate: endDate,
      current: isCurrent,
      description: template.replace('{field}', field.toLowerCase()),
      grade: `${gpa} GPA`,
      gpa: parseFloat(gpa),
    });
  }
});

module.exports = { educations };
