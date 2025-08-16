const { ObjectId } = require('mongodb');
const { user1Id, user2Id, user3Id, user4Id } = require('./users');

const portfolio1Id = new ObjectId();
const portfolio2Id = new ObjectId();
const portfolio3Id = new ObjectId();
const portfolio4Id = new ObjectId();

const portfolios = [
     {
      _id: portfolio1Id,
      userId: user1Id,
      title: "John Doe - Full Stack Developer",
      About: "I'm a passionate full-stack developer with expertise in modern web technologies.",
      AboutImage: "john-about.jpg",
      sociallinks: {
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe",
        facebook: "https://facebook.com/johndoe",
        instagram: "https://instagram.com/johndoe"
      }
    },
    {
      _id: portfolio2Id,
      userId: user2Id,
      title: "Sarah Johnson - UI/UX Designer",
      About: "Creative designer with a keen eye for detail and passion for user-centered design.",
      AboutImage: "sarah-about.jpg",
      sociallinks: {
        github: "https://github.com/sarahjohnson",
        linkedin: "https://linkedin.com/in/sarahjohnson",
        twitter: "https://twitter.com/sarahjohnson",
        facebook: "",
        instagram: "https://instagram.com/sarahdesigns"
      }
    },
    {
      _id: portfolio3Id,
      userId: user3Id,
      title: "Ali Hassan - Backend Developer",
      About: "Specializing in scalable backend systems and API architecture using .NET and Node.js.",
      AboutImage: "ali-about.jpg",
      sociallinks: {
        github: "https://github.com/alihassan",
        linkedin: "https://linkedin.com/in/alihassan",
        twitter: "",
        facebook: "",
        instagram: ""
      }
    },
    {
      _id: portfolio4Id,
      userId: user4Id,
      title: "Emily Smith - Angular Developer",
      About: "Experienced frontend developer focused on Angular, TypeScript, and performance optimization.",
      AboutImage: "emily-about.jpg",
      sociallinks: {
        github: "https://github.com/emilysmith",
        linkedin: "https://linkedin.com/in/emilysmith",
        twitter: "https://twitter.com/emilysmith",
        facebook: "",
        instagram: ""
      }
    }
];

module.exports = {
  portfolios,
  portfolio1Id,
  portfolio2Id,
  portfolio3Id,
  portfolio4Id
};