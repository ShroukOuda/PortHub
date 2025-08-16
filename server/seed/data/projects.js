const { ObjectId } = require('mongodb');
const { portfolio1Id, portfolio2Id, portfolio3Id, portfolio4Id } = require('./portfolios');

const projects = [
     {
      _id: new ObjectId(),
      portfolioId: portfolio1Id,
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with user authentication, payment, and inventory management.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "Redux"],
      image: "https://via.placeholder.com/600x400?text=E-Commerce+Platform",
      demoUrl: "https://myecommerce-demo.com",
      githubUrl: "https://github.com/johndoe/ecommerce-platform"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio1Id,
      title: "Task Management App",
      description: "Collaborative task management app with drag-and-drop and team features.",
      technologies: ["Vue.js", "Socket.io", "Express", "PostgreSQL"],
      image: "https://via.placeholder.com/600x400?text=Task+Management+App",
      demoUrl: "https://mytasks-demo.com",
      githubUrl: "https://github.com/johndoe/task-management"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio2Id,
      title: "Mobile Banking App UI",
      description: "Modern and intuitive mobile banking app interface design.",
      technologies: ["Figma", "Adobe XD", "InVision"],
      image: "https://via.placeholder.com/600x400?text=Banking+UI",
      demoUrl: "https://banking-prototype.com",
      githubUrl: ""
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio3Id,
      title: "API Gateway System",
      description: "Enterprise-grade API Gateway with authentication and rate limiting.",
      technologies: [".NET Core", "Docker", "Kubernetes", "PostgreSQL"],
      image: "https://via.placeholder.com/600x400?text=API+Gateway",
      demoUrl: "",
      githubUrl: "https://github.com/alihassan/apigateway"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio4Id,
      title: "Portfolio Website",
      description: "Personal portfolio built with Angular and Tailwind CSS.",
      technologies: ["Angular", "Tailwind", "Firebase"],
      image: "https://via.placeholder.com/600x400?text=Portfolio+Website",
      demoUrl: "https://emily-portfolio.com",
      githubUrl: "https://github.com/emilysmith/portfolio"
    }
];

module.exports = { projects };
