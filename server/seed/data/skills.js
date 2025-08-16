const { ObjectId } = require('mongodb');
const { portfolio1Id, portfolio2Id, portfolio3Id, portfolio4Id } = require('./portfolios');

const skills = [
     {
      _id: new ObjectId(),
      portfolioId: portfolio1Id,
      name: "JavaScript",
      level: "Advanced",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio1Id,
      name: "React",
      level: "Advanced",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio2Id,
      name: "Figma",
      level: "Advanced",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio3Id,
      name: ".NET Core",
      level: "Advanced",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio4Id,
      name: "Angular",
      level: "Advanced",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg"
    }
];

module.exports = { skills };
