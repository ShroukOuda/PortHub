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

// Generate 5-15 unique skills per portfolio with numeric levels
portfolioIds.forEach(portfolioId => {
  const numSkills = Math.floor(Math.random() * 11) + 5; // 5-15 skills
  const usedNames = new Set();

  for (let i = 0; i < numSkills; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const defsInCategory = skillDefsByCategory[category];
    const skillDef = defsInCategory[Math.floor(Math.random() * defsInCategory.length)];

    // Skip duplicates within same portfolio
    if (usedNames.has(skillDef.name)) continue;
    usedNames.add(skillDef.name);

    // Always numeric level 50-100 with ±5 variance
    const baseLevel = Math.floor(Math.random() * 41) + 55; // 55-95
    const variance = Math.floor(Math.random() * 11) - 5;   // -5 to +5
    const level = Math.min(100, Math.max(50, baseLevel + variance));

    skills.push({
      _id: new ObjectId(),
      portfolioId: portfolioId,
      name: skillDef.name,
      level: level,
      category: skillDef.category,
      icon: skillDef.icon || undefined,
    });
  }
});

module.exports = { skills };
