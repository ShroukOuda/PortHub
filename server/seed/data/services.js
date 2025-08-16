const { ObjectId } = require('mongodb');
const { portfolio1Id, portfolio2Id, portfolio3Id, portfolio4Id } = require('./portfolios');

const services = [
     {
      _id: new ObjectId(),
      portfolioId: portfolio1Id,
      name: "Web Development",
      description: "Full-stack development using React, Node.js, and cloud platforms.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio2Id,
      name: "UI/UX Design",
      description: "User interface and experience design for web and mobile apps.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio3Id,
      name: "API Development",
      description: "RESTful API design with authentication and scalability.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio4Id,
      name: "Frontend Development",
      description: "Building performant Angular web applications.",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg"
    }
];

module.exports = { services };
