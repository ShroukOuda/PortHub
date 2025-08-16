const { ObjectId } = require('mongodb');
const { portfolio1Id, portfolio2Id, portfolio3Id, portfolio4Id } = require('./portfolios');


const experiences = [
      {
      _id: new ObjectId(),
      portfolioId: portfolio1Id,
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      startDate: "2021-03-15",
      endDate: null,
      description: "Lead development of enterprise web applications using React, Node.js, and AWS.",
      position: "Senior Developer"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio2Id,
      title: "Senior UI/UX Designer",
      company: "Design Studio Inc",
      startDate: "2020-01-15",
      endDate: null,
      description: "Lead design projects for Fortune 500 companies, creating user-centered designs.",
      position: "Senior Designer"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio3Id,
      title: "Backend Developer",
      company: "CloudX",
      startDate: "2019-09-01",
      endDate: null,
      description: "Built scalable APIs and integrated with cloud infrastructure.",
      position: "Backend Engineer"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio4Id,
      title: "Frontend Developer",
      company: "Webify",
      startDate: "2020-05-10",
      endDate: null,
      description: "Worked on Angular projects, improving performance and accessibility.",
      position: "Frontend Engineer"
    }
];

module.exports = { experiences };
