const { ObjectId } = require('mongodb');
const { portfolioIds } = require('./portfolios');
const { skillDefinitions } = require('./skillDefinitions');

// Group skill definitions by category for weighted selection
const skillDefsByCategory = {};
skillDefinitions.forEach(sd => {
  if (!skillDefsByCategory[sd.category]) skillDefsByCategory[sd.category] = [];
  skillDefsByCategory[sd.category].push(sd);
});
const categories = Object.keys(skillDefsByCategory);

const skills = [];

// Generate 5-15 skills per portfolio
portfolioIds.forEach(portfolioId => {
  const numSkills = Math.floor(Math.random() * 10) + 5; // 5-15 skills
  const usedNames = new Set();
  
  for (let i = 0; i < numSkills; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const defsInCategory = skillDefsByCategory[category];
    const skillDef = defsInCategory[Math.floor(Math.random() * defsInCategory.length)];
    
    // Skip duplicates within same portfolio
    if (usedNames.has(skillDef.name)) continue;
    usedNames.add(skillDef.name);
    
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
      name: skillDef.name,
      level: level,
      category: skillDef.category,
      icon: skillDef.icon || undefined
    });
  }
});

module.exports = { skills };