const { ObjectId } = require('mongodb');
const { portfolio1Id, portfolio2Id, portfolio3Id } = require('./portfolios');



const educations = [
      {
        _id: new ObjectId(),
        portfolioId: portfolio1Id,
        institution: "University of Technology",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        startDate: "2014-09-01",
        endDate: "2018-06-15",
        description: "Focused on software engineering, algorithms, and web development.",
        grade: "3.8 GPA"
    },
    {
        _id: new ObjectId(),
        portfolioId: portfolio2Id,
        institution: "Design Institute",
        degree: "Bachelor of Fine Arts",
        fieldOfStudy: "Graphic Design",
        startDate: "2013-09-01",
        endDate: "2017-05-20",
        description: "Specialized in digital design, user experience, and visual communication.",
        grade: "3.9 GPA"
    },
    {
        _id: new ObjectId(),
        portfolioId: portfolio3Id,
        institution: "Cairo University",
        degree: "Bachelor of Engineering",
        fieldOfStudy: "Software Engineering",
        startDate: "2012-09-01",
        endDate: "2016-06-15",
        description: "Specialized in cloud and distributed systems.",
        grade: "3.7 GPA"
    }
];

module.exports = { educations };