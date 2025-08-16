const { ObjectId } = require('mongodb');
const { portfolio1Id, portfolio2Id, portfolio3Id, portfolio4Id } = require('./portfolios');

const testimonials = [
      {
      _id: new ObjectId(),
      portfolioId: portfolio1Id,
      content: "John delivered an exceptional platform that exceeded our expectations.",
      author: "Mike Chen",
      authorImage: "https://i.pravatar.cc/150?img=5",
      position: "CEO, RetailTech Inc"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio2Id,
      content: "Sarah's design work transformed our user experience completely.",
      author: "David Thompson",
      authorImage: "https://i.pravatar.cc/150?img=6",
      position: "Marketing Director, FinanceApp"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio3Id,
      content: "Ali created a robust API system that scaled effortlessly.",
      author: "Omar Khaled",
      authorImage: "https://i.pravatar.cc/150?img=7",
      position: "CTO, CloudX"
    },
    {
      _id: new ObjectId(),
      portfolioId: portfolio4Id,
      content: "Emily built a stunning portfolio website with great performance.",
      author: "Rachel Green",
      authorImage: "https://i.pravatar.cc/150?img=8",
      position: "Project Manager, Webify"
    }
];

module.exports = { testimonials };
