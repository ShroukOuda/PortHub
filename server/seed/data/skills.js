const { ObjectId } = require('mongodb');
const { portfolioIds } = require('./portfolios');

const skillsByCategory = {
  'Programming Languages': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'Dart'],
  'Frontend': ['React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Redux'],
  'Backend': ['Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'Laravel', 'Ruby on Rails', 'ASP.NET', 'FastAPI', 'GraphQL'],
  'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite', 'Firebase', 'DynamoDB', 'Cassandra', 'Elasticsearch'],
  'DevOps': ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'GitLab CI', 'AWS', 'Azure', 'GCP', 'Terraform', 'Ansible'],
  'Mobile': ['React Native', 'Flutter', 'iOS (Swift)', 'Android (Kotlin)', 'Xamarin', 'Ionic'],
  'Data Science': ['Pandas', 'NumPy', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Jupyter', 'R', 'Tableau', 'Power BI'],
  'Design': ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'InDesign', 'Blender'],
  'Soft Skills': ['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration', 'Time Management', 'Critical Thinking']
};

const skills = [];

// Generate 5-15 skills per portfolio
portfolioIds.forEach(portfolioId => {
  const numSkills = Math.floor(Math.random() * 10) + 5; // 5-15 skills
  
  for (let i = 0; i < numSkills; i++) {
    const categories = Object.keys(skillsByCategory);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const skillNames = skillsByCategory[category];
    const skillName = skillNames[Math.floor(Math.random() * skillNames.length)];
    
    // Random level (60-100 for numbers, or Beginner/Intermediate/Advanced/Expert for strings)
    const useNumberLevel = Math.random() > 0.3;
    let level;
    if (useNumberLevel) {
      level = Math.floor(Math.random() * 40) + 60; // 60-100
    } else {
      const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
      level = levels[Math.floor(Math.random() * levels.length)];
    }
    
    skills.push({
      _id: new ObjectId(),
      portfolioId: portfolioId,
      name: skillName,
      level: level,
      category: category,
      icon: Math.random() > 0.5 ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skillName.toLowerCase().replace(/\s+/g, '')}/${skillName.toLowerCase().replace(/\s+/g, '')}-original.svg` : undefined
    });
  }
});

module.exports = { skills };