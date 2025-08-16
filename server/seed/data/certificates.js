const { ObjectId } = require('mongodb');
const { portfolio1Id, portfolio2Id } = require('./portfolios');



const certificates = [
      {
        _id: new ObjectId(),
        portfolioId: portfolio1Id,
        title: "AWS Certified Solutions Architect",
        description: "Expertise in designing distributed applications on AWS.",
        technologies: ["AWS", "Cloud Computing", "Architecture"],
        issuer: "Amazon Web Services",
        issueDate: "2022-08-15",
        expirationDate: "2025-08-15",
        CertificateImage:"https://via.placeholder.com/200x200?text=AWS+Cert"
    },
    {
        _id: new ObjectId(),
        portfolioId: portfolio2Id,
        title: "Google UX Design Certificate",
        description: "Fundamentals of UX design including research and usability testing.",
        technologies: ["UX Design", "Figma", "User Research"],
        issuer: "Google",
        issueDate: "2020-12-10",
        expirationDate: null,
        CertificateImage: "https://via.placeholder.com/200x200?text=Google+UX+Cert"
    }
];

module.exports = { certificates };
