const { ObjectId } = require('mongodb');

// Generate 200 user IDs
const userIds = Array.from({ length: 200 }, () => new ObjectId());

const users = [
  // USA Users (30)
  {
    _id: userIds[0],
    firstName: "John", lastName: "Smith", username: "john.smith", email: "john.smith@example.com",
    phone: "+12125551234", password: "Password@123", profilePicture: "/uploads/profiles/seed/user-avatar-1.jpg",
    bio: "Senior Software Engineer with 8+ years of experience building scalable web applications.",
    gender: "male", dateOfBirth: "1988-03-15", country: "USA", city: "New York", address: "123 Broadway, Apt 4B",
    jobTitle: "Senior Software Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[1],
    firstName: "Emily", lastName: "Johnson", username: "emily.johnson", email: "emily.johnson@example.com",
    phone: "+13105557890", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-1.jpg",
    bio: "UX Designer passionate about creating intuitive and accessible digital experiences.",
    gender: "female", dateOfBirth: "1991-07-22", country: "USA", city: "San Francisco", address: "456 Market St, Suite 200",
    jobTitle: "UX Designer", role: "user", isActive: true
  },
  {
    _id: userIds[2],
    firstName: "Michael", lastName: "Williams", username: "michael.williams", email: "michael.williams@example.com",
    phone: "+13125559876", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-1.jpg",
    bio: "DevOps Engineer specializing in cloud infrastructure and CI/CD pipelines.",
    gender: "male", dateOfBirth: "1985-11-03", country: "USA", city: "Seattle", address: "789 Pine St",
    jobTitle: "DevOps Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[3],
    firstName: "Sarah", lastName: "Brown", username: "sarah.brown", email: "sarah.brown@example.com",
    phone: "+16175552345", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-female-1.jpg",
    bio: "Full Stack Developer with expertise in React and Node.js. Love building products that make a difference.",
    gender: "female", dateOfBirth: "1992-09-18", country: "USA", city: "Austin", address: "101 Congress Ave",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[4],
    firstName: "David", lastName: "Jones", username: "david.jones", email: "david.jones@example.com",
    phone: "+16175559876", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-1.jpg",
    bio: "Data Scientist with background in machine learning and statistical analysis.",
    gender: "male", dateOfBirth: "1989-12-05", country: "USA", city: "Boston", address: "201 Boylston St",
    jobTitle: "Data Scientist", role: "admin", isActive: true
  },
  {
    _id: userIds[5],
    firstName: "Jessica", lastName: "Garcia", username: "jessica.garcia", email: "jessica.garcia@example.com",
    phone: "+12125558765", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-1.jpg",
    bio: "Product Manager bridging the gap between business needs and technical implementation.",
    gender: "female", dateOfBirth: "1987-04-30", country: "USA", city: "Chicago", address: "301 Michigan Ave",
    jobTitle: "Product Manager", role: "user", isActive: true
  },
  {
    _id: userIds[6],
    firstName: "James", lastName: "Miller", username: "james.miller", email: "james.miller@example.com",
    phone: "+12125554321", password: "Password@123", profilePicture: "/uploads/profiles/seed/consultant-male-1.jpg",
    bio: "Mobile Developer specializing in iOS and cross-platform solutions with Flutter.",
    gender: "male", dateOfBirth: "1993-08-12", country: "USA", city: "Portland", address: "401 Hawthorne Blvd",
    jobTitle: "Mobile Developer", role: "user", isActive: true
  },
  {
    _id: userIds[7],
    firstName: "Jennifer", lastName: "Davis", username: "jennifer.davis", email: "jennifer.davis@example.com",
    phone: "+16175553456", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-1.jpg",
    bio: "Technical Project Manager with experience leading agile teams and delivering complex software projects.",
    gender: "female", dateOfBirth: "1986-01-25", country: "USA", city: "Denver", address: "501 16th St",
    jobTitle: "Technical Project Manager", role: "user", isActive: true
  },
  {
    _id: userIds[8],
    firstName: "Robert", lastName: "Rodriguez", username: "robert.rodriguez", email: "robert.rodriguez@example.com",
    phone: "+12125556789", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-1.jpg",
    bio: "Backend Developer focused on building robust APIs and microservices with Java and Spring Boot.",
    gender: "male", dateOfBirth: "1990-06-17", country: "USA", city: "Miami", address: "601 Ocean Dr",
    jobTitle: "Backend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[9],
    firstName: "Lisa", lastName: "Martinez", username: "lisa.martinez", email: "lisa.martinez@example.com",
    phone: "+13105559876", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-1.jpg",
    bio: "UI/Visual Designer creating beautiful and functional interfaces for web and mobile apps.",
    gender: "female", dateOfBirth: "1994-02-08", country: "USA", city: "Los Angeles", address: "701 Sunset Blvd",
    jobTitle: "UI Designer", role: "user", isActive: true
  },
  {
    _id: userIds[10],
    firstName: "William", lastName: "Hernandez", username: "william.hernandez", email: "william.hernandez@example.com",
    phone: "+12125556789", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-2.jpg",
    bio: "Systems Architect with expertise in designing scalable, fault-tolerant distributed systems.",
    gender: "male", dateOfBirth: "1984-10-14", country: "USA", city: "Dallas", address: "801 Elm St",
    jobTitle: "Systems Architect", role: "admin", isActive: true
  },
  {
    _id: userIds[11],
    firstName: "Maria", lastName: "Lopez", username: "maria.lopez", email: "maria.lopez@example.com",
    phone: "+16175558765", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-2.jpg",
    bio: "Frontend Developer passionate about React, accessibility, and performance optimization.",
    gender: "female", dateOfBirth: "1992-05-21", country: "USA", city: "San Diego", address: "901 Gaslamp Quarter",
    jobTitle: "Frontend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[12],
    firstName: "Richard", lastName: "Gonzalez", username: "richard.gonzalez", email: "richard.gonzalez@example.com",
    phone: "+12125554321", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-2.jpg",
    bio: "Cloud Solutions Architect helping companies migrate and optimize their infrastructure on AWS.",
    gender: "male", dateOfBirth: "1983-09-30", country: "USA", city: "Phoenix", address: "1001 Camelback Rd",
    jobTitle: "Cloud Architect", role: "user", isActive: true
  },
  {
    _id: userIds[13],
    firstName: "Elizabeth", lastName: "Wilson", username: "elizabeth.wilson", email: "elizabeth.wilson@example.com",
    phone: "+16175559876", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-2.jpg",
    bio: "Content Strategist and Technical Writer with background in software documentation.",
    gender: "female", dateOfBirth: "1988-12-03", country: "USA", city: "Atlanta", address: "1101 Peachtree St",
    jobTitle: "Technical Writer", role: "user", isActive: true
  },
  {
    _id: userIds[14],
    firstName: "Joseph", lastName: "Anderson", username: "joseph.anderson", email: "joseph.anderson@example.com",
    phone: "+13105557654", password: "Password@123", profilePicture: "/uploads/profiles/seed/consultant-male-2.jpg",
    bio: "Security Engineer focused on application security, penetration testing, and secure coding practices.",
    gender: "male", dateOfBirth: "1987-07-19", country: "USA", city: "Washington DC", address: "1201 K St NW",
    jobTitle: "Security Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[15],
    firstName: "Thomas", lastName: "Taylor", username: "thomas.taylor", email: "thomas.taylor@example.com",
    phone: "+12125553456", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-2.jpg",
    bio: "QA Engineer passionate about automation testing and ensuring software quality.",
    gender: "male", dateOfBirth: "1990-04-11", country: "USA", city: "Philadelphia", address: "1301 Market St",
    jobTitle: "QA Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[16],
    firstName: "Patricia", lastName: "Thomas", username: "patricia.thomas", email: "patricia.thomas@example.com",
    phone: "+16175552345", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-2.jpg",
    bio: "Engineering Manager with 10+ years experience leading distributed development teams.",
    gender: "female", dateOfBirth: "1982-08-27", country: "USA", city: "Detroit", address: "1401 Woodward Ave",
    jobTitle: "Engineering Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[17],
    firstName: "Charles", lastName: "Jackson", username: "charles.jackson", email: "charles.jackson@example.com",
    phone: "+12125558765", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-3.jpg",
    bio: "Database Administrator managing large-scale PostgreSQL and MongoDB deployments.",
    gender: "male", dateOfBirth: "1985-02-14", country: "USA", city: "Minneapolis", address: "1501 Nicollet Mall",
    jobTitle: "Database Administrator", role: "user", isActive: true
  },
  {
    _id: userIds[18],
    firstName: "Christopher", lastName: "White", username: "christopher.white", email: "christopher.white@example.com",
    phone: "+13105559876", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-3.jpg",
    bio: "Game Developer creating immersive experiences with Unity and C#.",
    gender: "male", dateOfBirth: "1991-10-09", country: "USA", city: "Orlando", address: "1601 International Dr",
    jobTitle: "Game Developer", role: "user", isActive: true
  },
  {
    _id: userIds[19],
    firstName: "Daniel", lastName: "Harris", username: "daniel.harris", email: "daniel.harris@example.com",
    phone: "+16175556543", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-male-1.jpg",
    bio: "UX Researcher combining qualitative and quantitative methods to inform product design.",
    gender: "male", dateOfBirth: "1989-12-22", country: "USA", city: "Raleigh", address: "1701 Fayetteville St",
    jobTitle: "UX Researcher", role: "user", isActive: true
  },
  {
    _id: userIds[20],
    firstName: "Matthew", lastName: "Martin", username: "matthew.martin", email: "matthew.martin@example.com",
    phone: "+12125557654", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-4.jpg",
    bio: "Blockchain Developer building decentralized applications on Ethereum and Solana.",
    gender: "male", dateOfBirth: "1993-03-18", country: "USA", city: "Salt Lake City", address: "1801 S Temple",
    jobTitle: "Blockchain Developer", role: "user", isActive: true
  },
  {
    _id: userIds[21],
    firstName: "Anthony", lastName: "Thompson", username: "anthony.thompson", email: "anthony.thompson@example.com",
    phone: "+16175559876", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-3.jpg",
    bio: "Site Reliability Engineer ensuring high availability and performance of critical systems.",
    gender: "male", dateOfBirth: "1986-06-07", country: "USA", city: "Nashville", address: "1901 Broadway",
    jobTitle: "SRE", role: "user", isActive: true
  },
  {
    _id: userIds[22],
    firstName: "Donald", lastName: "Garcia", username: "donald.garcia", email: "donald.garcia@example.com",
    phone: "+13105558765", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-4.jpg",
    bio: "Embedded Systems Engineer working on IoT devices and real-time systems.",
    gender: "male", dateOfBirth: "1984-11-15", country: "USA", city: "Pittsburgh", address: "2001 Liberty Ave",
    jobTitle: "Embedded Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[23],
    firstName: "Mark", lastName: "Martinez", username: "mark.martinez", email: "mark.martinez@example.com",
    phone: "+12125552345", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-5.jpg",
    bio: "AR/VR Developer creating immersive mixed reality experiences for education and training.",
    gender: "male", dateOfBirth: "1992-09-01", country: "USA", city: "San Jose", address: "2101 Santana Row",
    jobTitle: "AR/VR Developer", role: "user", isActive: true
  },
  {
    _id: userIds[24],
    firstName: "Paul", lastName: "Robinson", username: "paul.robinson", email: "paul.robinson@example.com",
    phone: "+16175557654", password: "Password@123", profilePicture: "/uploads/profiles/seed/consultant-male-3.jpg",
    bio: "IT Consultant helping businesses optimize their technology stack and digital transformation.",
    gender: "male", dateOfBirth: "1983-05-29", country: "USA", city: "Cleveland", address: "2201 Euclid Ave",
    jobTitle: "IT Consultant", role: "user", isActive: true
  },
  {
    _id: userIds[25],
    firstName: "Steven", lastName: "Clark", username: "steven.clark", email: "steven.clark@example.com",
    phone: "+13105559876", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-4.jpg",
    bio: "Technical Lead guiding development teams and architecting scalable solutions.",
    gender: "male", dateOfBirth: "1981-12-10", country: "USA", city: "Kansas City", address: "2301 Grand Blvd",
    jobTitle: "Technical Lead", role: "admin", isActive: true
  },
  {
    _id: userIds[26],
    firstName: "Andrew", lastName: "Rodriguez", username: "andrew.rodriguez", email: "andrew.rodriguez@example.com",
    phone: "+12125556543", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-6.jpg",
    bio: "Machine Learning Engineer building recommendation systems and predictive models.",
    gender: "male", dateOfBirth: "1990-07-23", country: "USA", city: "Indianapolis", address: "2401 Monument Circle",
    jobTitle: "ML Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[27],
    firstName: "Joshua", lastName: "Lewis", username: "joshua.lewis", email: "joshua.lewis@example.com",
    phone: "+16175558765", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-5.jpg",
    bio: "Network Engineer designing and maintaining enterprise network infrastructure.",
    gender: "male", dateOfBirth: "1987-01-14", country: "USA", city: "Columbus", address: "2501 High St",
    jobTitle: "Network Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[28],
    firstName: "Kenneth", lastName: "Lee", username: "kenneth.lee", email: "kenneth.lee@example.com",
    phone: "+12125559876", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-7.jpg",
    bio: "Frontend Architect specializing in component libraries and design systems.",
    gender: "male", dateOfBirth: "1988-04-05", country: "USA", city: "Charlotte", address: "2601 Trade St",
    jobTitle: "Frontend Architect", role: "user", isActive: true
  },
  {
    _id: userIds[29],
    firstName: "Kevin", lastName: "Walker", username: "kevin.walker", email: "kevin.walker@example.com",
    phone: "+13105557654", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-5.jpg",
    bio: "DevOps Consultant helping teams implement CI/CD and infrastructure as code.",
    gender: "male", dateOfBirth: "1986-09-17", country: "USA", city: "Louisville", address: "2701 Main St",
    jobTitle: "DevOps Consultant", role: "user", isActive: true
  },

  // UK Users (20)
  {
    _id: userIds[30],
    firstName: "Oliver", lastName: "Taylor", username: "oliver.taylor", email: "oliver.taylor@example.co.uk",
    phone: "+442079460001", password: "Password@123", profilePicture: "/uploads/profiles/seed/user-avatar-2.jpg",
    bio: "Senior Developer at London fintech startup. Love building scalable systems.",
    gender: "male", dateOfBirth: "1990-02-14", country: "UK", city: "London", address: "221B Baker St",
    jobTitle: "Senior Developer", role: "user", isActive: true
  },
  {
    _id: userIds[31],
    firstName: "Amelia", lastName: "Brown", username: "amelia.brown", email: "amelia.brown@example.co.uk",
    phone: "+441612345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-3.jpg",
    bio: "UX/UI Designer with passion for creating accessible and inclusive digital experiences.",
    gender: "female", dateOfBirth: "1992-08-03", country: "UK", city: "Manchester", address: "1 Old Trafford",
    jobTitle: "UX Designer", role: "user", isActive: true
  },
  {
    _id: userIds[32],
    firstName: "Harry", lastName: "Wilson", username: "harry.wilson", email: "harry.wilson@example.co.uk",
    phone: "+441131234567", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-8.jpg",
    bio: "Full Stack Developer specializing in React and Node.js. Love open source.",
    gender: "male", dateOfBirth: "1993-11-21", country: "UK", city: "Leeds", address: "15 Park Row",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[33],
    firstName: "Olivia", lastName: "Davies", username: "olivia.davies", email: "olivia.davies@example.co.uk",
    phone: "+441512345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-3.jpg",
    bio: "Product Designer creating beautiful and functional digital products.",
    gender: "female", dateOfBirth: "1991-05-17", country: "UK", city: "Liverpool", address: "42 Matthew St",
    jobTitle: "Product Designer", role: "user", isActive: true
  },
  {
    _id: userIds[34],
    firstName: "George", lastName: "Evans", username: "george.evans", email: "george.evans@example.co.uk",
    phone: "+441171234567", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-6.jpg",
    bio: "DevOps Engineer managing cloud infrastructure and CI/CD pipelines.",
    gender: "male", dateOfBirth: "1988-12-09", country: "UK", city: "Bristol", address: "7 Clifton",
    jobTitle: "DevOps Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[35],
    firstName: "Isla", lastName: "Thomas", username: "isla.thomas", email: "isla.thomas@example.co.uk",
    phone: "+441912345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-3.jpg",
    bio: "Technical Project Manager with experience delivering complex software projects.",
    gender: "female", dateOfBirth: "1987-03-25", country: "UK", city: "Newcastle", address: "23 Grey St",
    jobTitle: "Technical Project Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[36],
    firstName: "Noah", lastName: "Roberts", username: "noah.roberts", email: "noah.roberts@example.co.uk",
    phone: "+441412345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-9.jpg",
    bio: "Mobile Developer building iOS and Android apps with React Native.",
    gender: "male", dateOfBirth: "1994-07-12", country: "UK", city: "Glasgow", address: "55 Buchanan St",
    jobTitle: "Mobile Developer", role: "user", isActive: true
  },
  {
    _id: userIds[37],
    firstName: "Poppy", lastName: "Johnson", username: "poppy.johnson", email: "poppy.johnson@example.co.uk",
    phone: "+441151234567", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-2.jpg",
    bio: "Visual Designer creating brand identities and marketing materials.",
    gender: "female", dateOfBirth: "1993-01-30", country: "UK", city: "Nottingham", address: "8 Market Square",
    jobTitle: "Visual Designer", role: "user", isActive: true
  },
  {
    _id: userIds[38],
    firstName: "Jack", lastName: "Walker", username: "jack.walker", email: "jack.walker@example.co.uk",
    phone: "+441211234567", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-6.jpg",
    bio: "Backend Developer specializing in Java and Spring Boot microservices.",
    gender: "male", dateOfBirth: "1989-10-05", country: "UK", city: "Birmingham", address: "100 Broad St",
    jobTitle: "Backend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[39],
    firstName: "Emily", lastName: "Wright", username: "emily.wright", email: "emily.wright@example.co.uk",
    phone: "+441612345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-4.jpg",
    bio: "Data Scientist using machine learning to solve business problems.",
    gender: "female", dateOfBirth: "1990-06-18", country: "UK", city: "Manchester", address: "25 King St",
    jobTitle: "Data Scientist", role: "user", isActive: true
  },
  {
    _id: userIds[40],
    firstName: "Charlie", lastName: "Robinson", username: "charlie.robinson", email: "charlie.robinson@example.co.uk",
    phone: "+441131234568", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-10.jpg",
    bio: "Frontend Developer passionate about React, TypeScript and modern CSS.",
    gender: "male", dateOfBirth: "1992-09-22", country: "UK", city: "Leeds", address: "30 Boar Lane",
    jobTitle: "Frontend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[41],
    firstName: "Grace", lastName: "Thompson", username: "grace.thompson", email: "grace.thompson@example.co.uk",
    phone: "+441512345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-4.jpg",
    bio: "UI Designer creating beautiful and intuitive interfaces for web and mobile.",
    gender: "female", dateOfBirth: "1991-04-14", country: "UK", city: "Liverpool", address: "12 Bold St",
    jobTitle: "UI Designer", role: "user", isActive: true
  },
  {
    _id: userIds[42],
    firstName: "Oscar", lastName: "White", username: "oscar.white", email: "oscar.white@example.co.uk",
    phone: "+441171234568", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-7.jpg",
    bio: "Cloud Architect designing solutions on AWS and Azure.",
    gender: "male", dateOfBirth: "1986-11-07", country: "UK", city: "Bristol", address: "45 Park St",
    jobTitle: "Cloud Architect", role: "user", isActive: true
  },
  {
    _id: userIds[43],
    firstName: "Mia", lastName: "Harris", username: "mia.harris", email: "mia.harris@example.co.uk",
    phone: "+441912345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-4.jpg",
    bio: "Product Owner bridging business requirements and technical implementation.",
    gender: "female", dateOfBirth: "1988-08-29", country: "UK", city: "Newcastle", address: "78 Quayside",
    jobTitle: "Product Owner", role: "user", isActive: true
  },
  {
    _id: userIds[44],
    firstName: "Jacob", lastName: "Martin", username: "jacob.martin", email: "jacob.martin@example.co.uk",
    phone: "+441412345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-11.jpg",
    bio: "Security Engineer focusing on application security and penetration testing.",
    gender: "male", dateOfBirth: "1987-12-03", country: "UK", city: "Edinburgh", address: "56 Princes St",
    jobTitle: "Security Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[45],
    firstName: "Freya", lastName: "Jones", username: "freya.jones", email: "freya.jones@example.co.uk",
    phone: "+441151234568", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-3.jpg",
    bio: "Motion Designer creating engaging animations for digital products.",
    gender: "female", dateOfBirth: "1993-02-11", country: "UK", city: "Nottingham", address: "34 Victoria St",
    jobTitle: "Motion Designer", role: "user", isActive: true
  },
  {
    _id: userIds[46],
    firstName: "Thomas", lastName: "King", username: "thomas.king", email: "thomas.king@example.co.uk",
    phone: "+441211234568", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-7.jpg",
    bio: "Database Administrator managing SQL Server and PostgreSQL databases.",
    gender: "male", dateOfBirth: "1985-05-19", country: "UK", city: "Birmingham", address: "200 Corporation St",
    jobTitle: "Database Administrator", role: "user", isActive: true
  },
  {
    _id: userIds[47],
    firstName: "Phoebe", lastName: "Cooper", username: "phoebe.cooper", email: "phoebe.cooper@example.co.uk",
    phone: "+441612345680", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-5.jpg",
    bio: "QA Engineer ensuring quality through automated and manual testing.",
    gender: "female", dateOfBirth: "1990-10-16", country: "UK", city: "Manchester", address: "67 Deansgate",
    jobTitle: "QA Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[48],
    firstName: "Archie", lastName: "Morgan", username: "archie.morgan", email: "archie.morgan@example.co.uk",
    phone: "+441131234569", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-12.jpg",
    bio: "Full Stack Developer with focus on Python and Django applications.",
    gender: "male", dateOfBirth: "1992-03-27", country: "UK", city: "Sheffield", address: "89 Ecclesall Rd",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[49],
    firstName: "Daisy", lastName: "Edwards", username: "daisy.edwards", email: "daisy.edwards@example.co.uk",
    phone: "+441512345680", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-5.jpg",
    bio: "Content Designer creating user-centered content for digital services.",
    gender: "female", dateOfBirth: "1991-07-08", country: "UK", city: "Liverpool", address: "45 Lark Lane",
    jobTitle: "Content Designer", role: "user", isActive: true
  },

  // Canada Users (15)
  {
    _id: userIds[50],
    firstName: "Liam", lastName: "Tremblay", username: "liam.tremblay", email: "liam.tremblay@example.ca",
    phone: "+14165551234", password: "Password@123", profilePicture: "/uploads/profiles/seed/user-avatar-3.jpg",
    bio: "Software Engineer at Toronto tech company. Building scalable web applications.",
    gender: "male", dateOfBirth: "1989-04-12", country: "Canada", city: "Toronto", address: "100 Queen St W",
    jobTitle: "Software Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[51],
    firstName: "Emma", lastName: "Gagnon", username: "emma.gagnon", email: "emma.gagnon@example.ca",
    phone: "+15145559876", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-6.jpg",
    bio: "UX Designer creating accessible and inclusive digital experiences.",
    gender: "female", dateOfBirth: "1991-09-23", country: "Canada", city: "Montreal", address: "200 Rue Sainte-Catherine",
    jobTitle: "UX Designer", role: "user", isActive: true
  },
  {
    _id: userIds[52],
    firstName: "Noah", lastName: "Roy", username: "noah.roy", email: "noah.roy@example.ca",
    phone: "+16045554321", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-13.jpg",
    bio: "Full Stack Developer specializing in MERN stack applications.",
    gender: "male", dateOfBirth: "1992-12-05", country: "Canada", city: "Vancouver", address: "300 Robson St",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[53],
    firstName: "Olivia", lastName: "Cote", username: "olivia.cote", email: "olivia.cote@example.ca",
    phone: "+14035553456", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-6.jpg",
    bio: "Product Designer passionate about creating meaningful digital products.",
    gender: "female", dateOfBirth: "1990-06-18", country: "Canada", city: "Ottawa", address: "400 Wellington St",
    jobTitle: "Product Designer", role: "user", isActive: true
  },
  {
    _id: userIds[54],
    firstName: "William", lastName: "Bouchard", username: "william.bouchard", email: "william.bouchard@example.ca",
    phone: "+19055556789", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-8.jpg",
    bio: "DevOps Engineer managing cloud infrastructure on AWS and Azure.",
    gender: "male", dateOfBirth: "1987-03-09", country: "Canada", city: "Calgary", address: "500 8th Ave SW",
    jobTitle: "DevOps Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[55],
    firstName: "Sophia", lastName: "Gauthier", username: "sophia.gauthier", email: "sophia.gauthier@example.ca",
    phone: "+17805557654", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-5.jpg",
    bio: "Technical Project Manager leading agile development teams.",
    gender: "female", dateOfBirth: "1986-11-14", country: "Canada", city: "Edmonton", address: "600 Jasper Ave",
    jobTitle: "Technical Project Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[56],
    firstName: "Benjamin", lastName: "Morin", username: "benjamin.morin", email: "benjamin.morin@example.ca",
    phone: "+13055559876", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-14.jpg",
    bio: "Mobile Developer building iOS apps with Swift and SwiftUI.",
    gender: "male", dateOfBirth: "1993-08-21", country: "Canada", city: "Winnipeg", address: "700 Portage Ave",
    jobTitle: "Mobile Developer", role: "user", isActive: true
  },
  {
    _id: userIds[57],
    firstName: "Charlotte", lastName: "Belanger", username: "charlotte.belanger", email: "charlotte.belanger@example.ca",
    phone: "+19055552345", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-4.jpg",
    bio: "Visual Designer creating brand identities and digital assets.",
    gender: "female", dateOfBirth: "1992-02-28", country: "Canada", city: "Quebec City", address: "800 Grande Allée",
    jobTitle: "Visual Designer", role: "user", isActive: true
  },
  {
    _id: userIds[58],
    firstName: "Lucas", lastName: "Pelletier", username: "lucas.pelletier", email: "lucas.pelletier@example.ca",
    phone: "+14165556543", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-8.jpg",
    bio: "Backend Developer specializing in Node.js and microservices.",
    gender: "male", dateOfBirth: "1990-05-16", country: "Canada", city: "Hamilton", address: "900 King St E",
    jobTitle: "Backend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[59],
    firstName: "Mia", lastName: "Lavoie", username: "mia.lavoie", email: "mia.lavoie@example.ca",
    phone: "+15145559877", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-7.jpg",
    bio: "Data Scientist applying machine learning to business problems.",
    gender: "female", dateOfBirth: "1989-10-03", country: "Canada", city: "London", address: "1000 Richmond St",
    jobTitle: "Data Scientist", role: "user", isActive: true
  },
  {
    _id: userIds[60],
    firstName: "Ethan", lastName: "Fortin", username: "ethan.fortin", email: "ethan.fortin@example.ca",
    phone: "+16045558765", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-15.jpg",
    bio: "Frontend Developer passionate about React, Vue and modern CSS.",
    gender: "male", dateOfBirth: "1991-12-11", country: "Canada", city: "Victoria", address: "1100 Douglas St",
    jobTitle: "Frontend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[61],
    firstName: "Amelia", lastName: "Gagné", username: "amelia.gagne", email: "amelia.gagne@example.ca",
    phone: "+14035557654", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-7.jpg",
    bio: "UI Designer creating beautiful and functional interfaces.",
    gender: "female", dateOfBirth: "1993-07-19", country: "Canada", city: "Halifax", address: "1200 Barrington St",
    jobTitle: "UI Designer", role: "user", isActive: true
  },
  {
    _id: userIds[62],
    firstName: "Jacob", lastName: "Levesque", username: "jacob.levesque", email: "jacob.levesque@example.ca",
    phone: "+19055553456", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-9.jpg",
    bio: "Cloud Architect designing solutions on AWS, Azure and GCP.",
    gender: "male", dateOfBirth: "1985-09-22", country: "Canada", city: "Regina", address: "1300 Albert St",
    jobTitle: "Cloud Architect", role: "admin", isActive: true
  },
  {
    _id: userIds[63],
    firstName: "Emily", lastName: "Bergeron", username: "emily.bergeron", email: "emily.bergeron@example.ca",
    phone: "+14115559876", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-6.jpg",
    bio: "Product Manager with expertise in SaaS and enterprise software.",
    gender: "female", dateOfBirth: "1987-04-07", country: "Canada", city: "Saskatoon", address: "1400 2nd Ave",
    jobTitle: "Product Manager", role: "user", isActive: true
  },
  {
    _id: userIds[64],
    firstName: "Samuel", lastName: "Caron", username: "samuel.caron", email: "samuel.caron@example.ca",
    phone: "+13055556543", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-16.jpg",
    bio: "Security Engineer focusing on application security and DevSecOps.",
    gender: "male", dateOfBirth: "1988-01-30", country: "Canada", city: "Quebec City", address: "1500 Ch Ste-Foy",
    jobTitle: "Security Engineer", role: "user", isActive: true
  },

  // Australia Users (15)
  {
    _id: userIds[65],
    firstName: "Jack", lastName: "O'Brien", username: "jack.obrien", email: "jack.obrien@example.com.au",
    phone: "+61255551234", password: "Password@123", profilePicture: "/uploads/profiles/seed/user-avatar-4.jpg",
    bio: "Full Stack Developer at Sydney startup. Love building products that make a difference.",
    gender: "male", dateOfBirth: "1990-03-18", country: "Australia", city: "Sydney", address: "1 George St",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[66],
    firstName: "Charlotte", lastName: "Cooper", username: "charlotte.cooper", email: "charlotte.cooper@example.com.au",
    phone: "+61355559876", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-8.jpg",
    bio: "UX Designer creating user-centered designs for fintech applications.",
    gender: "female", dateOfBirth: "1992-07-25", country: "Australia", city: "Melbourne", address: "100 Collins St",
    jobTitle: "UX Designer", role: "user", isActive: true
  },
  {
    _id: userIds[67],
    firstName: "Thomas", lastName: "Morgan", username: "thomas.morgan", email: "thomas.morgan@example.com.au",
    phone: "+61755554321", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-17.jpg",
    bio: "DevOps Engineer specializing in cloud infrastructure and automation.",
    gender: "male", dateOfBirth: "1988-11-09", country: "Australia", city: "Brisbane", address: "200 Queen St",
    jobTitle: "DevOps Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[68],
    firstName: "Mia", lastName: "Bailey", username: "mia.bailey", email: "mia.bailey@example.com.au",
    phone: "+61855553456", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-8.jpg",
    bio: "Product Designer creating digital products for healthcare industry.",
    gender: "female", dateOfBirth: "1991-05-14", country: "Australia", city: "Perth", address: "300 St Georges Tce",
    jobTitle: "Product Designer", role: "user", isActive: true
  },
  {
    _id: userIds[69],
    firstName: "James", lastName: "Murphy", username: "james.murphy", email: "james.murphy@example.com.au",
    phone: "+61855556789", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-10.jpg",
    bio: "Backend Developer building scalable APIs with Python and Django.",
    gender: "male", dateOfBirth: "1989-09-02", country: "Australia", city: "Adelaide", address: "400 King William St",
    jobTitle: "Backend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[70],
    firstName: "Isabella", lastName: "Walsh", username: "isabella.walsh", email: "isabella.walsh@example.com.au",
    phone: "+61255557654", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-7.jpg",
    bio: "Technical Project Manager leading agile teams in e-commerce sector.",
    gender: "female", dateOfBirth: "1986-12-11", country: "Australia", city: "Canberra", address: "500 London Circuit",
    jobTitle: "Technical Project Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[71],
    firstName: "Henry", lastName: "Sullivan", username: "henry.sullivan", email: "henry.sullivan@example.com.au",
    phone: "+61355559877", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-18.jpg",
    bio: "Mobile Developer building cross-platform apps with Flutter.",
    gender: "male", dateOfBirth: "1993-02-28", country: "Australia", city: "Hobart", address: "600 Elizabeth St",
    jobTitle: "Mobile Developer", role: "user", isActive: true
  },
  {
    _id: userIds[72],
    firstName: "Sophie", lastName: "Kennedy", username: "sophie.kennedy", email: "sophie.kennedy@example.com.au",
    phone: "+61755558765", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-5.jpg",
    bio: "Visual Designer creating brand identities and marketing collateral.",
    gender: "female", dateOfBirth: "1990-08-17", country: "Australia", city: "Gold Coast", address: "700 Surfers Paradise Blvd",
    jobTitle: "Visual Designer", role: "user", isActive: true
  },
  {
    _id: userIds[73],
    firstName: "William", lastName: "Ryan", username: "william.ryan", email: "william.ryan@example.com.au",
    phone: "+61855556543", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-9.jpg",
    bio: "Data Scientist applying ML to sports analytics and performance prediction.",
    gender: "male", dateOfBirth: "1987-04-06", country: "Australia", city: "Newcastle", address: "800 Hunter St",
    jobTitle: "Data Scientist", role: "user", isActive: true
  },
  {
    _id: userIds[74],
    firstName: "Ruby", lastName: "O'Connor", username: "ruby.oconnor", email: "ruby.oconnor@example.com.au",
    phone: "+61255552345", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-9.jpg",
    bio: "Frontend Developer passionate about React and performance optimization.",
    gender: "female", dateOfBirth: "1992-10-23", country: "Australia", city: "Wollongong", address: "900 Crown St",
    jobTitle: "Frontend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[75],
    firstName: "Oliver", lastName: "Johnson", username: "oliver.johnson", email: "oliver.johnson@example.com.au",
    phone: "+61355553456", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-19.jpg",
    bio: "Cloud Architect designing solutions on AWS for enterprise clients.",
    gender: "male", dateOfBirth: "1985-06-15", country: "Australia", city: "Sunshine Coast", address: "1000 Ocean Dr",
    jobTitle: "Cloud Architect", role: "user", isActive: true
  },
  {
    _id: userIds[76],
    firstName: "Grace", lastName: "Kelly", username: "grace.kelly", email: "grace.kelly@example.com.au",
    phone: "+61755557654", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-9.jpg",
    bio: "UI Designer creating intuitive interfaces for mobile apps.",
    gender: "female", dateOfBirth: "1991-01-29", country: "Australia", city: "Cairns", address: "1100 Esplanade",
    jobTitle: "UI Designer", role: "user", isActive: true
  },
  {
    _id: userIds[77],
    firstName: "Ethan", lastName: "McDonald", username: "ethan.mcdonald", email: "ethan.mcdonald@example.com.au",
    phone: "+61855559878", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-11.jpg",
    bio: "Security Engineer focusing on cloud security and compliance.",
    gender: "male", dateOfBirth: "1988-03-12", country: "Australia", city: "Darwin", address: "1200 Mitchell St",
    jobTitle: "Security Engineer", role: "admin", isActive: true
  },
  {
    _id: userIds[78],
    firstName: "Zoe", lastName: "Baker", username: "zoe.baker", email: "zoe.baker@example.com.au",
    phone: "+61255558766", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-8.jpg",
    bio: "Product Owner in fintech, bridging business and technical teams.",
    gender: "female", dateOfBirth: "1989-09-20", country: "Australia", city: "Geelong", address: "1300 Moorabool St",
    jobTitle: "Product Owner", role: "user", isActive: true
  },
  {
    _id: userIds[79],
    firstName: "Liam", lastName: "Campbell", username: "liam.campbell", email: "liam.campbell@example.com.au",
    phone: "+61355556544", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-20.jpg",
    bio: "Full Stack Developer specializing in MERN and serverless architectures.",
    gender: "male", dateOfBirth: "1990-12-04", country: "Australia", city: "Townsville", address: "1400 Flinders St",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },

  // India Users (15)
  {
    _id: userIds[80],
    firstName: "Aarav", lastName: "Sharma", username: "aarav.sharma", email: "aarav.sharma@example.co.in",
    phone: "+912212345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/user-avatar-5.jpg",
    bio: "Senior Software Engineer at Bangalore tech company. Expert in cloud computing.",
    gender: "male", dateOfBirth: "1988-05-12", country: "India", city: "Bangalore", address: "1 MG Road",
    jobTitle: "Senior Software Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[81],
    firstName: "Aanya", lastName: "Patel", username: "aanya.patel", email: "aanya.patel@example.co.in",
    phone: "+912212345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-10.jpg",
    bio: "UX Designer passionate about creating accessible digital experiences.",
    gender: "female", dateOfBirth: "1991-08-23", country: "India", city: "Mumbai", address: "100 Marine Drive",
    jobTitle: "UX Designer", role: "user", isActive: true
  },
  {
    _id: userIds[82],
    firstName: "Vihaan", lastName: "Kumar", username: "vihaan.kumar", email: "vihaan.kumar@example.co.in",
    phone: "+914412345680", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-21.jpg",
    bio: "Full Stack Developer building scalable web applications with React and Node.js.",
    gender: "male", dateOfBirth: "1992-11-07", country: "India", city: "Chennai", address: "200 Anna Salai",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[83],
    firstName: "Ananya", lastName: "Singh", username: "ananya.singh", email: "ananya.singh@example.co.in",
    phone: "+913312345681", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-10.jpg",
    bio: "Product Designer creating intuitive digital products for e-commerce.",
    gender: "female", dateOfBirth: "1990-03-18", country: "India", city: "Kolkata", address: "300 Park Street",
    jobTitle: "Product Designer", role: "user", isActive: true
  },
  {
    _id: userIds[84],
    firstName: "Advik", lastName: "Reddy", username: "advik.reddy", email: "advik.reddy@example.co.in",
    phone: "+914012345682", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-12.jpg",
    bio: "DevOps Engineer managing cloud infrastructure and CI/CD pipelines.",
    gender: "male", dateOfBirth: "1987-09-15", country: "India", city: "Hyderabad", address: "400 Banjara Hills",
    jobTitle: "DevOps Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[85],
    firstName: "Diya", lastName: "Gupta", username: "diya.gupta", email: "diya.gupta@example.co.in",
    phone: "+911112345683", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-9.jpg",
    bio: "Technical Project Manager leading distributed development teams.",
    gender: "female", dateOfBirth: "1986-12-04", country: "India", city: "Delhi", address: "500 Connaught Place",
    jobTitle: "Technical Project Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[86],
    firstName: "Kabir", lastName: "Verma", username: "kabir.verma", email: "kabir.verma@example.co.in",
    phone: "+912212345684", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-22.jpg",
    bio: "Mobile Developer building Android apps with Kotlin and Jetpack Compose.",
    gender: "male", dateOfBirth: "1993-06-21", country: "India", city: "Pune", address: "600 FC Road",
    jobTitle: "Mobile Developer", role: "user", isActive: true
  },
  {
    _id: userIds[87],
    firstName: "Ishita", lastName: "Malhotra", username: "ishita.malhotra", email: "ishita.malhotra@example.co.in",
    phone: "+917912345685", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-6.jpg",
    bio: "Visual Designer creating brand identities and digital assets.",
    gender: "female", dateOfBirth: "1992-02-09", country: "India", city: "Ahmedabad", address: "700 CG Road",
    jobTitle: "Visual Designer", role: "user", isActive: true
  },
  {
    _id: userIds[88],
    firstName: "Reyansh", lastName: "Joshi", username: "reyansh.joshi", email: "reyansh.joshi@example.co.in",
    phone: "+914012345686", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-10.jpg",
    bio: "Backend Developer specializing in Java, Spring Boot, and microservices.",
    gender: "male", dateOfBirth: "1989-10-17", country: "India", city: "Hyderabad", address: "800 HITEC City",
    jobTitle: "Backend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[89],
    firstName: "Myra", lastName: "Choudhury", username: "myra.choudhury", email: "myra.choudhury@example.co.in",
    phone: "+913312345687", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-11.jpg",
    bio: "Data Scientist applying machine learning to financial services.",
    gender: "female", dateOfBirth: "1990-07-28", country: "India", city: "Kolkata", address: "900 Salt Lake",
    jobTitle: "Data Scientist", role: "user", isActive: true
  },
  {
    _id: userIds[90],
    firstName: "Aryan", lastName: "Kapoor", username: "aryan.kapoor", email: "aryan.kapoor@example.co.in",
    phone: "+911112345688", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-23.jpg",
    bio: "Frontend Developer passionate about React, Next.js and modern web technologies.",
    gender: "male", dateOfBirth: "1991-04-14", country: "India", city: "Gurgaon", address: "1000 Cyber City",
    jobTitle: "Frontend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[91],
    firstName: "Sanya", lastName: "Mehta", username: "sanya.mehta", email: "sanya.mehta@example.co.in",
    phone: "+917912345689", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-11.jpg",
    bio: "UI Designer creating beautiful interfaces for mobile and web apps.",
    gender: "female", dateOfBirth: "1993-01-05", country: "India", city: "Jaipur", address: "1100 MI Road",
    jobTitle: "UI Designer", role: "user", isActive: true
  },
  {
    _id: userIds[92],
    firstName: "Arjun", lastName: "Nair", username: "arjun.nair", email: "arjun.nair@example.co.in",
    phone: "+914712345690", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-13.jpg",
    bio: "Cloud Architect designing solutions on AWS and Azure.",
    gender: "male", dateOfBirth: "1985-11-30", country: "India", city: "Thiruvananthapuram", address: "1200 MG Road",
    jobTitle: "Cloud Architect", role: "admin", isActive: true
  },
  {
    _id: userIds[93],
    firstName: "Sia", lastName: "Krishnamurthy", username: "sia.krishnamurthy", email: "sia.krishnamurthy@example.co.in",
    phone: "+914412345691", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-10.jpg",
    bio: "Product Manager with expertise in SaaS and enterprise software.",
    gender: "female", dateOfBirth: "1987-08-19", country: "India", city: "Chennai", address: "1300 OMR",
    jobTitle: "Product Manager", role: "user", isActive: true
  },
  {
    _id: userIds[94],
    firstName: "Rohan", lastName: "Menon", username: "rohan.menon", email: "rohan.menon@example.co.in",
    phone: "+912212345692", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-24.jpg",
    bio: "Security Engineer focusing on application security and DevSecOps.",
    gender: "male", dateOfBirth: "1988-03-22", country: "India", city: "Bangalore", address: "1400 Indiranagar",
    jobTitle: "Security Engineer", role: "user", isActive: true
  },

  // Germany Users (15)
  {
    _id: userIds[95],
    firstName: "Elias", lastName: "Müller", username: "elias.muller", email: "elias.muller@example.de",
    phone: "+493012345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/user-avatar-6.jpg",
    bio: "Software Engineer at Berlin tech company. Building scalable backend systems.",
    gender: "male", dateOfBirth: "1989-06-18", country: "Germany", city: "Berlin", address: "1 Unter den Linden",
    jobTitle: "Software Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[96],
    firstName: "Hannah", lastName: "Schmidt", username: "hannah.schmidt", email: "hannah.schmidt@example.de",
    phone: "+498912345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-12.jpg",
    bio: "UX Designer creating intuitive and accessible digital experiences.",
    gender: "female", dateOfBirth: "1991-09-24", country: "Germany", city: "Munich", address: "100 Marienplatz",
    jobTitle: "UX Designer", role: "user", isActive: true
  },
  {
    _id: userIds[97],
    firstName: "Finn", lastName: "Schneider", username: "finn.schneider", email: "finn.schneider@example.de",
    phone: "+4922112345680", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-25.jpg",
    bio: "Full Stack Developer specializing in React, Node.js, and cloud technologies.",
    gender: "male", dateOfBirth: "1992-12-11", country: "Germany", city: "Cologne", address: "200 Domplatz",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[98],
    firstName: "Lena", lastName: "Fischer", username: "lena.fischer", email: "lena.fischer@example.de",
    phone: "+496912345681", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-12.jpg",
    bio: "Product Designer creating digital products for automotive industry.",
    gender: "female", dateOfBirth: "1990-04-05", country: "Germany", city: "Frankfurt", address: "300 Römerberg",
    jobTitle: "Product Designer", role: "user", isActive: true
  },
  {
    _id: userIds[99],
    firstName: "Paul", lastName: "Weber", username: "paul.weber", email: "paul.weber@example.de",
    phone: "+497112345682", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-14.jpg",
    bio: "DevOps Engineer managing cloud infrastructure and automation pipelines.",
    gender: "male", dateOfBirth: "1987-10-29", country: "Germany", city: "Stuttgart", address: "400 Schlossplatz",
    jobTitle: "DevOps Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[100],
    firstName: "Mia", lastName: "Meyer", username: "mia.meyer", email: "mia.meyer@example.de",
    phone: "+494012345683", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-11.jpg",
    bio: "Technical Project Manager leading agile development teams in fintech.",
    gender: "female", dateOfBirth: "1986-07-16", country: "Germany", city: "Hamburg", address: "500 Rathausmarkt",
    jobTitle: "Technical Project Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[101],
    firstName: "Lukas", lastName: "Wagner", username: "lukas.wagner", email: "lukas.wagner@example.de",
    phone: "+495112345684", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-26.jpg",
    bio: "Mobile Developer building iOS apps with Swift and SwiftUI.",
    gender: "male", dateOfBirth: "1993-02-08", country: "Germany", city: "Hannover", address: "600 Kröpcke",
    jobTitle: "Mobile Developer", role: "user", isActive: true
  },
  {
    _id: userIds[102],
    firstName: "Emma", lastName: "Becker", username: "emma.becker", email: "emma.becker@example.de",
    phone: "+4935112345685", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-7.jpg",
    bio: "Visual Designer creating brand identities and digital assets.",
    gender: "female", dateOfBirth: "1992-05-20", country: "Germany", city: "Dresden", address: "700 Frauenkirche",
    jobTitle: "Visual Designer", role: "user", isActive: true
  },
  {
    _id: userIds[103],
    firstName: "Jonas", lastName: "Schulz", username: "jonas.schulz", email: "jonas.schulz@example.de",
    phone: "+4934112345686", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-11.jpg",
    bio: "Backend Developer specializing in Java, Spring Boot, and microservices.",
    gender: "male", dateOfBirth: "1989-11-13", country: "Germany", city: "Leipzig", address: "800 Augustusplatz",
    jobTitle: "Backend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[104],
    firstName: "Sophie", lastName: "Hoffmann", username: "sophie.hoffmann", email: "sophie.hoffmann@example.de",
    phone: "+4969112345687", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-13.jpg",
    bio: "Data Scientist applying machine learning to manufacturing and Industry 4.0.",
    gender: "female", dateOfBirth: "1990-08-27", country: "Germany", city: "Frankfurt", address: "900 Messe",
    jobTitle: "Data Scientist", role: "user", isActive: true
  },
  {
    _id: userIds[105],
    firstName: "Leon", lastName: "Koch", username: "leon.koch", email: "leon.koch@example.de",
    phone: "+4971112345688", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-27.jpg",
    bio: "Frontend Developer passionate about React, TypeScript and performance.",
    gender: "male", dateOfBirth: "1991-03-04", country: "Germany", city: "Stuttgart", address: "1000 Königstraße",
    jobTitle: "Frontend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[106],
    firstName: "Anna", lastName: "Richter", username: "anna.richter", email: "anna.richter@example.de",
    phone: "+4921112345689", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-13.jpg",
    bio: "UI Designer creating beautiful interfaces for web and mobile apps.",
    gender: "female", dateOfBirth: "1993-09-15", country: "Germany", city: "Düsseldorf", address: "1100 Königsallee",
    jobTitle: "UI Designer", role: "user", isActive: true
  },
  {
    _id: userIds[107],
    firstName: "Max", lastName: "Schäfer", username: "max.schafer", email: "max.schafer@example.de",
    phone: "+4951112345690", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-15.jpg",
    bio: "Cloud Architect designing solutions on AWS, Azure and Google Cloud.",
    gender: "male", dateOfBirth: "1985-12-22", country: "Germany", city: "Cologne", address: "1200 MediaPark",
    jobTitle: "Cloud Architect", role: "admin", isActive: true
  },
  {
    _id: userIds[108],
    firstName: "Laura", lastName: "Bauer", username: "laura.bauer", email: "laura.bauer@example.de",
    phone: "+4930112345691", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-12.jpg",
    bio: "Product Manager with expertise in B2B software and digital transformation.",
    gender: "female", dateOfBirth: "1987-04-10", country: "Germany", city: "Berlin", address: "1300 Potsdamer Platz",
    jobTitle: "Product Manager", role: "user", isActive: true
  },
  {
    _id: userIds[109],
    firstName: "Felix", lastName: "Klein", username: "felix.klein", email: "felix.klein@example.de",
    phone: "+4989112345692", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-28.jpg",
    bio: "Security Engineer focusing on application security and DevSecOps.",
    gender: "male", dateOfBirth: "1988-06-30", country: "Germany", city: "Munich", address: "1400 Theresienwiese",
    jobTitle: "Security Engineer", role: "user", isActive: true
  },

  // France Users (15)
  {
    _id: userIds[110],
    firstName: "Lucas", lastName: "Martin", username: "lucas.martin", email: "lucas.martin@example.fr",
    phone: "+33123456789", password: "Password@123", profilePicture: "/uploads/profiles/seed/user-avatar-7.jpg",
    bio: "Full Stack Developer with expertise in React and Node.js.",
    gender: "male", dateOfBirth: "1990-02-14", country: "France", city: "Paris", address: "1 Rue de Rivoli",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[111],
    firstName: "Chloe", lastName: "Bernard", username: "chloe.bernard", email: "chloe.bernard@example.fr",
    phone: "+33412345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-14.jpg",
    bio: "UX Designer passionate about creating accessible digital experiences.",
    gender: "female", dateOfBirth: "1992-07-19", country: "France", city: "Lyon", address: "100 Rue de la République",
    jobTitle: "UX Designer", role: "user", isActive: true
  },
  {
    _id: userIds[112],
    firstName: "Hugo", lastName: "Dubois", username: "hugo.dubois", email: "hugo.dubois@example.fr",
    phone: "+33512345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-29.jpg",
    bio: "Backend Developer specializing in Java and Spring Boot.",
    gender: "male", dateOfBirth: "1988-11-25", country: "France", city: "Bordeaux", address: "200 Place de la Bourse",
    jobTitle: "Backend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[113],
    firstName: "Camille", lastName: "Thomas", username: "camille.thomas", email: "camille.thomas@example.fr",
    phone: "+33312345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-14.jpg",
    bio: "Product Designer creating innovative digital products.",
    gender: "female", dateOfBirth: "1991-04-03", country: "France", city: "Lille", address: "300 Grand Place",
    jobTitle: "Product Designer", role: "user", isActive: true
  },
  {
    _id: userIds[114],
    firstName: "Louis", lastName: "Robert", username: "louis.robert", email: "louis.robert@example.fr",
    phone: "+33212345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-16.jpg",
    bio: "DevOps Engineer managing cloud infrastructure and CI/CD pipelines.",
    gender: "male", dateOfBirth: "1987-09-12", country: "France", city: "Nantes", address: "400 Place Royale",
    jobTitle: "DevOps Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[115],
    firstName: "Lea", lastName: "Richard", username: "lea.richard", email: "lea.richard@example.fr",
    phone: "+33123456780", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-13.jpg",
    bio: "Technical Project Manager leading agile development teams.",
    gender: "female", dateOfBirth: "1986-12-08", country: "France", city: "Toulouse", address: "500 Place du Capitole",
    jobTitle: "Technical Project Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[116],
    firstName: "Gabriel", lastName: "Petit", username: "gabriel.petit", email: "gabriel.petit@example.fr",
    phone: "+33412345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-30.jpg",
    bio: "Mobile Developer creating iOS and Android apps with React Native.",
    gender: "male", dateOfBirth: "1993-03-21", country: "France", city: "Strasbourg", address: "600 Cathédrale",
    jobTitle: "Mobile Developer", role: "user", isActive: true
  },
  {
    _id: userIds[117],
    firstName: "Manon", lastName: "Durand", username: "manon.durand", email: "manon.durand@example.fr",
    phone: "+33512345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-8.jpg",
    bio: "Visual Designer creating brand identities and digital assets.",
    gender: "female", dateOfBirth: "1992-10-17", country: "France", city: "Montpellier", address: "700 Place de la Comédie",
    jobTitle: "Visual Designer", role: "user", isActive: true
  },
  {
    _id: userIds[118],
    firstName: "Jules", lastName: "Leroy", username: "jules.leroy", email: "jules.leroy@example.fr",
    phone: "+33312345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-12.jpg",
    bio: "Data Scientist applying machine learning to finance.",
    gender: "male", dateOfBirth: "1989-05-29", country: "France", city: "Rennes", address: "800 Parlement de Bretagne",
    jobTitle: "Data Scientist", role: "user", isActive: true
  },
  {
    _id: userIds[119],
    firstName: "Emma", lastName: "Moreau", username: "emma.moreau", email: "emma.moreau@example.fr",
    phone: "+33212345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-15.jpg",
    bio: "Frontend Developer expert in React and web performance.",
    gender: "female", dateOfBirth: "1990-08-11", country: "France", city: "Nice", address: "900 Promenade des Anglais",
    jobTitle: "Frontend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[120],
    firstName: "Nathan", lastName: "Simon", username: "nathan.simon", email: "nathan.simon@example.fr",
    phone: "+33123456781", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-31.jpg",
    bio: "Cloud Architect designing solutions on AWS and Azure.",
    gender: "male", dateOfBirth: "1985-01-24", country: "France", city: "Paris", address: "1000 La Défense",
    jobTitle: "Cloud Architect", role: "user", isActive: true
  },
  {
    _id: userIds[121],
    firstName: "Ines", lastName: "Michel", username: "ines.michel", email: "ines.michel@example.fr",
    phone: "+33412345680", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-15.jpg",
    bio: "UI Designer creating intuitive interfaces for mobile applications.",
    gender: "female", dateOfBirth: "1993-06-06", country: "France", city: "Lyon", address: "1100 Bellecour",
    jobTitle: "UI Designer", role: "user", isActive: true
  },
  {
    _id: userIds[122],
    firstName: "Mathis", lastName: "Lefebvre", username: "mathis.lefebvre", email: "mathis.lefebvre@example.fr",
    phone: "+33512345680", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-17.jpg",
    bio: "Security Engineer specializing in application security and DevSecOps.",
    gender: "male", dateOfBirth: "1988-11-19", country: "France", city: "Bordeaux", address: "1200 Quinconces",
    jobTitle: "Security Engineer", role: "admin", isActive: true
  },
  {
    _id: userIds[123],
    firstName: "Zoé", lastName: "Garcia", username: "zoe.garcia", email: "zoe.garcia@example.fr",
    phone: "+33312345680", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-14.jpg",
    bio: "Product Owner in fintech sector, bridging business and technical teams.",
    gender: "female", dateOfBirth: "1987-09-03", country: "France", city: "Lille", address: "1300 Euralille",
    jobTitle: "Product Owner", role: "user", isActive: true
  },
  {
    _id: userIds[124],
    firstName: "Raphaël", lastName: "David", username: "raphael.david", email: "raphael.david@example.fr",
    phone: "+33212345680", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-32.jpg",
    bio: "Full Stack Developer specializing in serverless architectures.",
    gender: "male", dateOfBirth: "1991-12-14", country: "France", city: "Nantes", address: "1400 Île de Nantes",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },

  // Brazil Users (15)
  {
    _id: userIds[125],
    firstName: "Miguel", lastName: "Silva", username: "miguel.silva", email: "miguel.silva@example.com.br",
    phone: "+551112345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/user-avatar-8.jpg",
    bio: "Senior Software Engineer specializing in scalable systems.",
    gender: "male", dateOfBirth: "1988-04-22", country: "Brazil", city: "São Paulo", address: "1 Av. Paulista",
    jobTitle: "Senior Software Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[126],
    firstName: "Sofia", lastName: "Santos", username: "sofia.santos", email: "sofia.santos@example.com.br",
    phone: "+552112345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-16.jpg",
    bio: "UX Designer creating inclusive and accessible digital experiences.",
    gender: "female", dateOfBirth: "1991-08-15", country: "Brazil", city: "Rio de Janeiro", address: "100 Av. Atlântica",
    jobTitle: "UX Designer", role: "user", isActive: true
  },
  {
    _id: userIds[127],
    firstName: "Arthur", lastName: "Oliveira", username: "arthur.oliveira", email: "arthur.oliveira@example.com.br",
    phone: "+553112345680", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-33.jpg",
    bio: "Full Stack Developer with focus on React and Node.js.",
    gender: "male", dateOfBirth: "1992-11-30", country: "Brazil", city: "Belo Horizonte", address: "200 Av. Afonso Pena",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[128],
    firstName: "Alice", lastName: "Souza", username: "alice.souza", email: "alice.souza@example.com.br",
    phone: "+554112345681", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-16.jpg",
    bio: "Product Designer creating innovative digital products.",
    gender: "female", dateOfBirth: "1990-03-07", country: "Brazil", city: "Curitiba", address: "300 Av. Batel",
    jobTitle: "Product Designer", role: "user", isActive: true
  },
  {
    _id: userIds[129],
    firstName: "Davi", lastName: "Rodrigues", username: "davi.rodrigues", email: "davi.rodrigues@example.com.br",
    phone: "+555112345682", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-18.jpg",
    bio: "DevOps Engineer managing cloud infrastructure and automation.",
    gender: "male", dateOfBirth: "1987-10-19", country: "Brazil", city: "Salvador", address: "400 Av. Oceânica",
    jobTitle: "DevOps Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[130],
    firstName: "Laura", lastName: "Ferreira", username: "laura.ferreira", email: "laura.ferreira@example.com.br",
    phone: "+556112345683", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-15.jpg",
    bio: "Technical Project Manager leading agile teams.",
    gender: "female", dateOfBirth: "1986-06-11", country: "Brazil", city: "Brasília", address: "500 Esplanada dos Ministérios",
    jobTitle: "Technical Project Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[131],
    firstName: "Heitor", lastName: "Alves", username: "heitor.alves", email: "heitor.alves@example.com.br",
    phone: "+557112345684", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-34.jpg",
    bio: "Mobile Developer creating iOS and Android apps with Flutter.",
    gender: "male", dateOfBirth: "1993-02-24", country: "Brazil", city: "Fortaleza", address: "600 Av. Beira Mar",
    jobTitle: "Mobile Developer", role: "user", isActive: true
  },
  {
    _id: userIds[132],
    firstName: "Manuela", lastName: "Lima", username: "manuela.lima", email: "manuela.lima@example.com.br",
    phone: "+558112345685", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-9.jpg",
    bio: "Visual Designer creating brand identities and digital assets.",
    gender: "female", dateOfBirth: "1992-05-09", country: "Brazil", city: "Recife", address: "700 Av. Boa Viagem",
    jobTitle: "Visual Designer", role: "user", isActive: true
  },
  {
    _id: userIds[133],
    firstName: "Gabriel", lastName: "Gomes", username: "gabriel.gomes", email: "gabriel.gomes@example.com.br",
    phone: "+559112345686", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-13.jpg",
    bio: "Backend Developer specializing in Java and microservices.",
    gender: "male", dateOfBirth: "1989-09-14", country: "Brazil", city: "Porto Alegre", address: "800 Av. Ipiranga",
    jobTitle: "Backend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[134],
    firstName: "Valentina", lastName: "Costa", username: "valentina.costa", email: "valentina.costa@example.com.br",
    phone: "+551112345687", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-17.jpg",
    bio: "Data Scientist applying machine learning to business problems.",
    gender: "female", dateOfBirth: "1990-12-03", country: "Brazil", city: "Campinas", address: "900 Av. José de Souza Campos",
    jobTitle: "Data Scientist", role: "user", isActive: true
  },
  {
    _id: userIds[135],
    firstName: "Enzo", lastName: "Martins", username: "enzo.martins", email: "enzo.martins@example.com.br",
    phone: "+552112345688", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-35.jpg",
    bio: "Frontend Developer passionate about React and web performance.",
    gender: "male", dateOfBirth: "1991-07-28", country: "Brazil", city: "Rio de Janeiro", address: "1000 Barra da Tijuca",
    jobTitle: "Frontend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[136],
    firstName: "Heloísa", lastName: "Rocha", username: "heloisa.rocha", email: "heloisa.rocha@example.com.br",
    phone: "+553112345689", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-17.jpg",
    bio: "UI Designer creating beautiful and functional interfaces.",
    gender: "female", dateOfBirth: "1993-04-17", country: "Brazil", city: "Belo Horizonte", address: "1100 Savassi",
    jobTitle: "UI Designer", role: "user", isActive: true
  },
  {
    _id: userIds[137],
    firstName: "Pedro", lastName: "Nascimento", username: "pedro.nascimento", email: "pedro.nascimento@example.com.br",
    phone: "+554112345690", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-19.jpg",
    bio: "Cloud Architect designing solutions on AWS and Azure.",
    gender: "male", dateOfBirth: "1985-11-22", country: "Brazil", city: "Curitiba", address: "1200 Centro Cívico",
    jobTitle: "Cloud Architect", role: "user", isActive: true
  },
  {
    _id: userIds[138],
    firstName: "Lívia", lastName: "Cardoso", username: "livia.cardoso", email: "livia.cardoso@example.com.br",
    phone: "+555112345691", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-16.jpg",
    bio: "Product Manager with expertise in SaaS and enterprise software.",
    gender: "female", dateOfBirth: "1987-01-05", country: "Brazil", city: "Salvador", address: "1300 Pelourinho",
    jobTitle: "Product Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[139],
    firstName: "João", lastName: "Melo", username: "joao.melo", email: "joao.melo@example.com.br",
    phone: "+556112345692", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-36.jpg",
    bio: "Security Engineer focused on application security and DevSecOps.",
    gender: "male", dateOfBirth: "1988-08-09", country: "Brazil", city: "Brasília", address: "1400 Asa Sul",
    jobTitle: "Security Engineer", role: "user", isActive: true
  },

  // Nigeria Users (10)
  {
    _id: userIds[140],
    firstName: "Chidi", lastName: "Okonkwo", username: "chidi.okonkwo", email: "chidi.okonkwo@example.com.ng",
    phone: "+234112345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/user-avatar-9.jpg",
    bio: "Full Stack Developer building scalable web applications for African businesses.",
    gender: "male", dateOfBirth: "1990-05-18", country: "Nigeria", city: "Lagos", address: "1 Marina",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[141],
    firstName: "Ngozi", lastName: "Okafor", username: "ngozi.okafor", email: "ngozi.okafor@example.com.ng",
    phone: "+234212345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-18.jpg",
    bio: "UX Designer passionate about creating accessible digital experiences for African users.",
    gender: "female", dateOfBirth: "1992-09-24", country: "Nigeria", city: "Abuja", address: "100 Central Area",
    jobTitle: "UX Designer", role: "user", isActive: true
  },
  {
    _id: userIds[142],
    firstName: "Oluwaseun", lastName: "Adebayo", username: "oluwaseun.adebayo", email: "oluwaseun.adebayo@example.com.ng",
    phone: "+234312345680", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-37.jpg",
    bio: "Backend Developer specializing in Node.js and microservices architecture.",
    gender: "male", dateOfBirth: "1988-11-12", country: "Nigeria", city: "Ibadan", address: "200 Ring Road",
    jobTitle: "Backend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[143],
    firstName: "Chioma", lastName: "Eze", username: "chioma.eze", email: "chioma.eze@example.com.ng",
    phone: "+234412345681", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-18.jpg",
    bio: "Product Designer creating innovative digital products for fintech.",
    gender: "female", dateOfBirth: "1991-03-07", country: "Nigeria", city: "Port Harcourt", address: "300 Woji",
    jobTitle: "Product Designer", role: "user", isActive: true
  },
  {
    _id: userIds[144],
    firstName: "Emeka", lastName: "Nwosu", username: "emeka.nwosu", email: "emeka.nwosu@example.com.ng",
    phone: "+234512345682", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-20.jpg",
    bio: "DevOps Engineer managing cloud infrastructure and CI/CD pipelines.",
    gender: "male", dateOfBirth: "1987-07-29", country: "Nigeria", city: "Kano", address: "400 Zoo Road",
    jobTitle: "DevOps Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[145],
    firstName: "Ifeanyi", lastName: "Obi", username: "ifeanyi.obi", email: "ifeanyi.obi@example.com.ng",
    phone: "+234612345683", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-17.jpg",
    bio: "Technical Project Manager leading agile development teams.",
    gender: "female", dateOfBirth: "1986-10-14", country: "Nigeria", city: "Enugu", address: "500 Independence Layout",
    jobTitle: "Technical Project Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[146],
    firstName: "Folake", lastName: "Akinwale", username: "folake.akinwale", email: "folake.akinwale@example.com.ng",
    phone: "+234712345684", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-10.jpg",
    bio: "Visual Designer creating brand identities and digital assets.",
    gender: "female", dateOfBirth: "1993-02-21", country: "Nigeria", city: "Lagos", address: "600 Victoria Island",
    jobTitle: "Visual Designer", role: "user", isActive: true
  },
  {
    _id: userIds[147],
    firstName: "Adebayo", lastName: "Ogunleye", username: "adebayo.ogunleye", email: "adebayo.ogunleye@example.com.ng",
    phone: "+234812345685", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-14.jpg",
    bio: "Mobile Developer building Android and iOS apps with Flutter.",
    gender: "male", dateOfBirth: "1989-06-05", country: "Nigeria", city: "Abuja", address: "700 Garki",
    jobTitle: "Mobile Developer", role: "user", isActive: true
  },
  {
    _id: userIds[148],
    firstName: "Chinwe", lastName: "Okeke", username: "chinwe.okeke", email: "chinwe.okeke@example.com.ng",
    phone: "+234912345686", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-19.jpg",
    bio: "Data Scientist applying machine learning to agricultural technology.",
    gender: "female", dateOfBirth: "1990-12-16", country: "Nigeria", city: "Ibadan", address: "800 Bodija",
    jobTitle: "Data Scientist", role: "user", isActive: true
  },
  {
    _id: userIds[149],
    firstName: "Chukwudi", lastName: "Eze", username: "chukwudi.eze", email: "chukwudi.eze@example.com.ng",
    phone: "+234012345687", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-38.jpg",
    bio: "Frontend Developer passionate about React and modern web technologies.",
    gender: "male", dateOfBirth: "1991-04-23", country: "Nigeria", city: "Port Harcourt", address: "900 GRA",
    jobTitle: "Frontend Developer", role: "user", isActive: true
  },

  // Italy Users (10)
  {
    _id: userIds[150],
    firstName: "Leonardo", lastName: "Rossi", username: "leonardo.rossi", email: "leonardo.rossi@example.it",
    phone: "+390612345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/user-avatar-10.jpg",
    bio: "Full Stack Developer with experience in React and Node.js.",
    gender: "male", dateOfBirth: "1989-03-12", country: "Italy", city: "Rome", address: "1 Via del Corso",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[151],
    firstName: "Sofia", lastName: "Russo", username: "sofia.russo", email: "sofia.russo@example.it",
    phone: "+390212345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-20.jpg",
    bio: "UX Designer passionate about creating accessible digital experiences.",
    gender: "female", dateOfBirth: "1991-08-27", country: "Italy", city: "Milan", address: "100 Via Montenapoleone",
    jobTitle: "UX Designer", role: "user", isActive: true
  },
  {
    _id: userIds[152],
    firstName: "Francesco", lastName: "Ferrari", username: "francesco.ferrari", email: "francesco.ferrari@example.it",
    phone: "+390312345680", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-39.jpg",
    bio: "Backend Developer specializing in Java and Spring Boot.",
    gender: "male", dateOfBirth: "1987-11-18", country: "Italy", city: "Turin", address: "200 Via Roma",
    jobTitle: "Backend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[153],
    firstName: "Giulia", lastName: "Esposito", username: "giulia.esposito", email: "giulia.esposito@example.it",
    phone: "+390412345681", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-19.jpg",
    bio: "Product Designer creating innovative digital products.",
    gender: "female", dateOfBirth: "1990-04-05", country: "Italy", city: "Naples", address: "300 Spaccanapoli",
    jobTitle: "Product Designer", role: "user", isActive: true
  },
  {
    _id: userIds[154],
    firstName: "Alessandro", lastName: "Bianchi", username: "alessandro.bianchi", email: "alessandro.bianchi@example.it",
    phone: "+390512345682", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-21.jpg",
    bio: "DevOps Engineer managing cloud infrastructure and CI/CD pipelines.",
    gender: "male", dateOfBirth: "1988-09-23", country: "Italy", city: "Bologna", address: "400 Piazza Maggiore",
    jobTitle: "DevOps Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[155],
    firstName: "Aurora", lastName: "Romano", username: "aurora.romano", email: "aurora.romano@example.it",
    phone: "+390612345683", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-18.jpg",
    bio: "Technical Project Manager leading agile development teams.",
    gender: "female", dateOfBirth: "1986-12-08", country: "Italy", city: "Florence", address: "500 Piazza della Signoria",
    jobTitle: "Technical Project Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[156],
    firstName: "Lorenzo", lastName: "Colombo", username: "lorenzo.colombo", email: "lorenzo.colombo@example.it",
    phone: "+390712345684", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-40.jpg",
    bio: "Mobile Developer creating iOS and Android apps with React Native.",
    gender: "male", dateOfBirth: "1993-02-14", country: "Italy", city: "Genoa", address: "600 Via Garibaldi",
    jobTitle: "Mobile Developer", role: "user", isActive: true
  },
  {
    _id: userIds[157],
    firstName: "Alice", lastName: "Ricci", username: "alice.ricci", email: "alice.ricci@example.it",
    phone: "+390812345685", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-11.jpg",
    bio: "Visual Designer creating brand identities and digital assets.",
    gender: "female", dateOfBirth: "1992-07-19", country: "Italy", city: "Venice", address: "700 Piazza San Marco",
    jobTitle: "Visual Designer", role: "user", isActive: true
  },
  {
    _id: userIds[158],
    firstName: "Matteo", lastName: "Marino", username: "matteo.marino", email: "matteo.marino@example.it",
    phone: "+390912345686", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-15.jpg",
    bio: "Data Scientist applying machine learning to finance.",
    gender: "male", dateOfBirth: "1989-10-30", country: "Italy", city: "Palermo", address: "800 Quattro Canti",
    jobTitle: "Data Scientist", role: "user", isActive: true
  },
  {
    _id: userIds[159],
    firstName: "Ginevra", lastName: "Gallo", username: "ginevra.gallo", email: "ginevra.gallo@example.it",
    phone: "+391012345687", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-21.jpg",
    bio: "Frontend Developer passionate about React and web performance.",
    gender: "female", dateOfBirth: "1991-05-26", country: "Italy", city: "Turin", address: "900 Piazza Castello",
    jobTitle: "Frontend Developer", role: "user", isActive: true
  },

  // Spain Users (10)
  {
    _id: userIds[160],
    firstName: "Pablo", lastName: "Garcia", username: "pablo.garcia", email: "pablo.garcia@example.es",
    phone: "+349112345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/user-avatar-11.jpg",
    bio: "Full Stack Developer with experience in React and Node.js.",
    gender: "male", dateOfBirth: "1989-06-21", country: "Spain", city: "Madrid", address: "1 Gran Vía",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[161],
    firstName: "Lucia", lastName: "Fernandez", username: "lucia.fernandez", email: "lucia.fernandez@example.es",
    phone: "+349312345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-22.jpg",
    bio: "UX Designer passionate about creating accessible digital experiences.",
    gender: "female", dateOfBirth: "1992-09-14", country: "Spain", city: "Barcelona", address: "100 Las Ramblas",
    jobTitle: "UX Designer", role: "user", isActive: true
  },
  {
    _id: userIds[162],
    firstName: "Daniel", lastName: "Gonzalez", username: "daniel.gonzalez", email: "daniel.gonzalez@example.es",
    phone: "+349412345680", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-41.jpg",
    bio: "Backend Developer specializing in Java and Spring Boot.",
    gender: "male", dateOfBirth: "1988-11-05", country: "Spain", city: "Valencia", address: "200 Plaza del Ayuntamiento",
    jobTitle: "Backend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[163],
    firstName: "Maria", lastName: "Rodriguez", username: "maria.rodriguez", email: "maria.rodriguez@example.es",
    phone: "+349512345681", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-20.jpg",
    bio: "Product Designer creating innovative digital products.",
    gender: "female", dateOfBirth: "1990-03-28", country: "Spain", city: "Seville", address: "300 Plaza de España",
    jobTitle: "Product Designer", role: "user", isActive: true
  },
  {
    _id: userIds[164],
    firstName: "Alejandro", lastName: "Lopez", username: "alejandro.lopez", email: "alejandro.lopez@example.es",
    phone: "+349612345682", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-22.jpg",
    bio: "DevOps Engineer managing cloud infrastructure and CI/CD pipelines.",
    gender: "male", dateOfBirth: "1987-07-17", country: "Spain", city: "Zaragoza", address: "400 Plaza del Pilar",
    jobTitle: "DevOps Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[165],
    firstName: "Paula", lastName: "Martinez", username: "paula.martinez", email: "paula.martinez@example.es",
    phone: "+349712345683", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-19.jpg",
    bio: "Technical Project Manager leading agile development teams.",
    gender: "female", dateOfBirth: "1986-10-09", country: "Spain", city: "Malaga", address: "500 Calle Larios",
    jobTitle: "Technical Project Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[166],
    firstName: "David", lastName: "Sanchez", username: "david.sanchez", email: "david.sanchez@example.es",
    phone: "+349812345684", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-42.jpg",
    bio: "Mobile Developer creating iOS and Android apps with Flutter.",
    gender: "male", dateOfBirth: "1993-01-23", country: "Spain", city: "Murcia", address: "600 Plaza Cardenal Belluga",
    jobTitle: "Mobile Developer", role: "user", isActive: true
  },
  {
    _id: userIds[167],
    firstName: "Sara", lastName: "Perez", username: "sara.perez", email: "sara.perez@example.es",
    phone: "+349912345685", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-12.jpg",
    bio: "Visual Designer creating brand identities and digital assets.",
    gender: "female", dateOfBirth: "1992-05-12", country: "Spain", city: "Palma", address: "700 Plaza Mayor",
    jobTitle: "Visual Designer", role: "user", isActive: true
  },
  {
    _id: userIds[168],
    firstName: "Javier", lastName: "Gomez", username: "javier.gomez", email: "javier.gomez@example.es",
    phone: "+349012345686", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-16.jpg",
    bio: "Data Scientist applying machine learning to retail sector.",
    gender: "male", dateOfBirth: "1989-08-30", country: "Spain", city: "Bilbao", address: "800 Plaza Circular",
    jobTitle: "Data Scientist", role: "user", isActive: true
  },
  {
    _id: userIds[169],
    firstName: "Carmen", lastName: "Diaz", username: "carmen.diaz", email: "carmen.diaz@example.es",
    phone: "+349112345687", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-23.jpg",
    bio: "Frontend Developer passionate about React and web performance.",
    gender: "female", dateOfBirth: "1991-04-18", country: "Spain", city: "Alicante", address: "900 Explanada de España",
    jobTitle: "Frontend Developer", role: "user", isActive: true
  },

  // Mexico Users (10)
  {
    _id: userIds[170],
    firstName: "Juan", lastName: "Hernandez", username: "juan.hernandez", email: "juan.hernandez@example.mx",
    phone: "+525512345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/user-avatar-12.jpg",
    bio: "Full Stack Developer with experience in React and Node.js.",
    gender: "male", dateOfBirth: "1989-07-15", country: "Mexico", city: "Mexico City", address: "1 Paseo de la Reforma",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[171],
    firstName: "Maria", lastName: "Garcia", username: "maria.garcia", email: "maria.garcia@example.mx",
    phone: "+523312345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-24.jpg",
    bio: "UX Designer passionate about creating accessible digital experiences.",
    gender: "female", dateOfBirth: "1992-10-22", country: "Mexico", city: "Guadalajara", address: "100 Av. Chapultepec",
    jobTitle: "UX Designer", role: "user", isActive: true
  },
  {
    _id: userIds[172],
    firstName: "Carlos", lastName: "Martinez", username: "carlos.martinez", email: "carlos.martinez@example.mx",
    phone: "+528112345680", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-43.jpg",
    bio: "Backend Developer specializing in Java and Spring Boot.",
    gender: "male", dateOfBirth: "1988-12-08", country: "Mexico", city: "Monterrey", address: "200 Macroplaza",
    jobTitle: "Backend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[173],
    firstName: "Guadalupe", lastName: "Lopez", username: "guadalupe.lopez", email: "guadalupe.lopez@example.mx",
    phone: "+526621345681", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-21.jpg",
    bio: "Product Designer creating innovative digital products.",
    gender: "female", dateOfBirth: "1990-04-19", country: "Mexico", city: "Puebla", address: "300 Zócalo",
    jobTitle: "Product Designer", role: "user", isActive: true
  },
  {
    _id: userIds[174],
    firstName: "Jose", lastName: "Gonzalez", username: "jose.gonzalez", email: "jose.gonzalez@example.mx",
    phone: "+5261412345682", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-23.jpg",
    bio: "DevOps Engineer managing cloud infrastructure and CI/CD pipelines.",
    gender: "male", dateOfBirth: "1987-08-11", country: "Mexico", city: "Tijuana", address: "400 Av. Revolución",
    jobTitle: "DevOps Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[175],
    firstName: "Ana", lastName: "Rodriguez", username: "ana.rodriguez", email: "ana.rodriguez@example.mx",
    phone: "+524441345683", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-20.jpg",
    bio: "Technical Project Manager leading agile development teams.",
    gender: "female", dateOfBirth: "1986-11-03", country: "Mexico", city: "León", address: "500 Arco de la Calzada",
    jobTitle: "Technical Project Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[176],
    firstName: "Miguel", lastName: "Sanchez", username: "miguel.sanchez", email: "miguel.sanchez@example.mx",
    phone: "+529991345684", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-44.jpg",
    bio: "Mobile Developer creating iOS and Android apps with React Native.",
    gender: "male", dateOfBirth: "1993-02-27", country: "Mexico", city: "Mérida", address: "600 Paseo de Montejo",
    jobTitle: "Mobile Developer", role: "user", isActive: true
  },
  {
    _id: userIds[177],
    firstName: "Carmen", lastName: "Ramirez", username: "carmen.ramirez", email: "carmen.ramirez@example.mx",
    phone: "+529511345685", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-13.jpg",
    bio: "Visual Designer creating brand identities and digital assets.",
    gender: "female", dateOfBirth: "1992-06-16", country: "Mexico", city: "Querétaro", address: "700 Av. de la Constitución",
    jobTitle: "Visual Designer", role: "user", isActive: true
  },
  {
    _id: userIds[178],
    firstName: "Alejandro", lastName: "Cruz", username: "alejandro.cruz", email: "alejandro.cruz@example.mx",
    phone: "+525512345686", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-17.jpg",
    bio: "Data Scientist applying machine learning to financial sector.",
    gender: "male", dateOfBirth: "1989-09-09", country: "Mexico", city: "San Luis Potosí", address: "800 Plaza de Armas",
    jobTitle: "Data Scientist", role: "user", isActive: true
  },
  {
    _id: userIds[179],
    firstName: "Fernanda", lastName: "Torres", username: "fernanda.torres", email: "fernanda.torres@example.mx",
    phone: "+526621345687", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-25.jpg",
    bio: "Frontend Developer passionate about React and web performance.",
    gender: "female", dateOfBirth: "1991-05-24", country: "Mexico", city: "Chihuahua", address: "900 Plaza de Armas",
    jobTitle: "Frontend Developer", role: "user", isActive: true
  },

  // Japan Users (10)
  {
    _id: userIds[180],
    firstName: "Haruto", lastName: "Sato", username: "haruto.sato", email: "haruto.sato@example.co.jp",
    phone: "+81312345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/user-avatar-13.jpg",
    bio: "Full Stack Developer building scalable web applications.",
    gender: "male", dateOfBirth: "1990-03-10", country: "Japan", city: "Tokyo", address: "1 Shibuya Crossing",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[181],
    firstName: "Yui", lastName: "Suzuki", username: "yui.suzuki", email: "yui.suzuki@example.co.jp",
    phone: "+81612345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-26.jpg",
    bio: "UX Designer passionate about creating accessible experiences.",
    gender: "female", dateOfBirth: "1992-08-18", country: "Japan", city: "Osaka", address: "100 Dotonbori",
    jobTitle: "UX Designer", role: "user", isActive: true
  },
  {
    _id: userIds[182],
    firstName: "Souta", lastName: "Takahashi", username: "souta.takahashi", email: "souta.takahashi@example.co.jp",
    phone: "+815212345680", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-45.jpg",
    bio: "Backend Developer specializing in Java and microservices.",
    gender: "male", dateOfBirth: "1988-11-25", country: "Japan", city: "Yokohama", address: "200 Minato Mirai",
    jobTitle: "Backend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[183],
    firstName: "Rin", lastName: "Tanaka", username: "rin.tanaka", email: "rin.tanaka@example.co.jp",
    phone: "+819212345681", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-22.jpg",
    bio: "Product Designer creating innovative digital products.",
    gender: "female", dateOfBirth: "1991-04-03", country: "Japan", city: "Nagoya", address: "300 Osu",
    jobTitle: "Product Designer", role: "user", isActive: true
  },
  {
    _id: userIds[184],
    firstName: "Haruki", lastName: "Watanabe", username: "haruki.watanabe", email: "haruki.watanabe@example.co.jp",
    phone: "+817212345682", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-24.jpg",
    bio: "DevOps Engineer managing cloud infrastructure.",
    gender: "male", dateOfBirth: "1987-07-29", country: "Japan", city: "Fukuoka", address: "400 Tenjin",
    jobTitle: "DevOps Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[185],
    firstName: "Mio", lastName: "Ito", username: "mio.ito", email: "mio.ito@example.co.jp",
    phone: "+811112345683", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-21.jpg",
    bio: "Technical Project Manager leading agile development teams.",
    gender: "female", dateOfBirth: "1986-10-14", country: "Japan", city: "Sapporo", address: "500 Odori Park",
    jobTitle: "Technical Project Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[186],
    firstName: "Minato", lastName: "Yamamoto", username: "minato.yamamoto", email: "minato.yamamoto@example.co.jp",
    phone: "+812112345684", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-46.jpg",
    bio: "Mobile Developer building iOS and Android apps.",
    gender: "male", dateOfBirth: "1993-02-21", country: "Japan", city: "Kobe", address: "600 Harborland",
    jobTitle: "Mobile Developer", role: "user", isActive: true
  },
  {
    _id: userIds[187],
    firstName: "Sakura", lastName: "Nakamura", username: "sakura.nakamura", email: "sakura.nakamura@example.co.jp",
    phone: "+814112345685", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-14.jpg",
    bio: "Visual Designer creating brand identities.",
    gender: "female", dateOfBirth: "1992-05-09", country: "Japan", city: "Kyoto", address: "700 Gion",
    jobTitle: "Visual Designer", role: "user", isActive: true
  },
  {
    _id: userIds[188],
    firstName: "Itsuki", lastName: "Kobayashi", username: "itsuki.kobayashi", email: "itsuki.kobayashi@example.co.jp",
    phone: "+815212345686", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-18.jpg",
    bio: "Data Scientist applying machine learning to business problems.",
    gender: "male", dateOfBirth: "1989-09-16", country: "Japan", city: "Hiroshima", address: "800 Peace Park",
    jobTitle: "Data Scientist", role: "user", isActive: true
  },
  {
    _id: userIds[189],
    firstName: "Mei", lastName: "Yamada", username: "mei.yamada", email: "mei.yamada@example.co.jp",
    phone: "+819212345687", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-27.jpg",
    bio: "Frontend Developer passionate about React.",
    gender: "female", dateOfBirth: "1991-12-04", country: "Japan", city: "Sendai", address: "900 Ichibancho",
    jobTitle: "Frontend Developer", role: "user", isActive: true
  },

  // Additional users to reach 200
  {
    _id: userIds[190],
    firstName: "Mateo", lastName: "Fernandez", username: "mateo.fernandez", email: "mateo.fernandez@example.ar",
    phone: "+541112345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/user-avatar-14.jpg",
    bio: "Full Stack Developer with expertise in React and Node.js.",
    gender: "male", dateOfBirth: "1990-05-12", country: "Argentina", city: "Buenos Aires", address: "1 Av. 9 de Julio",
    jobTitle: "Full Stack Developer", role: "user", isActive: true
  },
  {
    _id: userIds[191],
    firstName: "Elena", lastName: "Popescu", username: "elena.popescu", email: "elena.popescu@example.ro",
    phone: "+40112345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-28.jpg",
    bio: "UX Designer creating intuitive digital experiences.",
    gender: "female", dateOfBirth: "1992-09-24", country: "Romania", city: "Bucharest", address: "100 Victoriei",
    jobTitle: "UX Designer", role: "user", isActive: true
  },
  {
    _id: userIds[192],
    firstName: "Andrei", lastName: "Ionescu", username: "andrei.ionescu", email: "andrei.ionescu@example.ro",
    phone: "+40212345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-47.jpg",
    bio: "Backend Developer specializing in Java and Spring Boot.",
    gender: "male", dateOfBirth: "1988-11-08", country: "Romania", city: "Cluj-Napoca", address: "200 Unirii",
    jobTitle: "Backend Developer", role: "user", isActive: true
  },
  {
    _id: userIds[193],
    firstName: "Sofia", lastName: "Kovács", username: "sofia.kovacs", email: "sofia.kovacs@example.hu",
    phone: "+36112345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/creative-female-23.jpg",
    bio: "Product Designer creating innovative digital products.",
    gender: "female", dateOfBirth: "1991-04-15", country: "Hungary", city: "Budapest", address: "300 Andrássy út",
    jobTitle: "Product Designer", role: "user", isActive: true
  },
  {
    _id: userIds[194],
    firstName: "László", lastName: "Nagy", username: "laszlo.nagy", email: "laszlo.nagy@example.hu",
    phone: "+36212345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/engineer-male-25.jpg",
    bio: "DevOps Engineer managing cloud infrastructure.",
    gender: "male", dateOfBirth: "1987-07-19", country: "Hungary", city: "Debrecen", address: "400 Piac utca",
    jobTitle: "DevOps Engineer", role: "user", isActive: true
  },
  {
    _id: userIds[195],
    firstName: "Emma", lastName: "Lindström", username: "emma.lindstrom", email: "emma.lindstrom@example.se",
    phone: "+46812345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/executive-female-22.jpg",
    bio: "Technical Project Manager leading agile development teams.",
    gender: "female", dateOfBirth: "1986-10-28", country: "Sweden", city: "Stockholm", address: "500 Gamla Stan",
    jobTitle: "Technical Project Manager", role: "admin", isActive: true
  },
  {
    _id: userIds[196],
    firstName: "Erik", lastName: "Johansson", username: "erik.johansson", email: "erik.johansson@example.se",
    phone: "+46912345679", password: "Password@123", profilePicture: "/uploads/profiles/seed/developer-male-48.jpg",
    bio: "Mobile Developer building iOS and Android apps.",
    gender: "male", dateOfBirth: "1993-02-14", country: "Sweden", city: "Gothenburg", address: "600 Avenyn",
    jobTitle: "Mobile Developer", role: "user", isActive: true
  },
  {
    _id: userIds[197],
    firstName: "Nina", lastName: "Jensen", username: "nina.jensen", email: "nina.jensen@example.dk",
    phone: "+4512345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/designer-female-15.jpg",
    bio: "Visual Designer creating brand identities and digital assets.",
    gender: "female", dateOfBirth: "1992-06-07", country: "Denmark", city: "Copenhagen", address: "700 Strøget",
    jobTitle: "Visual Designer", role: "user", isActive: true
  },
  {
    _id: userIds[198],
    firstName: "Mikkel", lastName: "Andersen", username: "mikkel.andersen", email: "mikkel.andersen@example.dk",
    phone: "+4523456789", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-male-19.jpg",
    bio: "Data Scientist applying machine learning to healthcare.",
    gender: "male", dateOfBirth: "1989-09-30", country: "Denmark", city: "Aarhus", address: "800 Latinerkvarteret",
    jobTitle: "Data Scientist", role: "user", isActive: true
  },
  {
    _id: userIds[199],
    firstName: "Klara", lastName: "Novak", username: "klara.novak", email: "klara.novak@example.cz",
    phone: "+42012345678", password: "Password@123", profilePicture: "/uploads/profiles/seed/professional-female-29.jpg",
    bio: "Frontend Developer passionate about React and performance.",
    gender: "female", dateOfBirth: "1991-11-18", country: "Czech Republic", city: "Prague", address: "900 Old Town Square",
    jobTitle: "Frontend Developer", role: "user", isActive: true
  }
];

module.exports = {
  users,
  userIds
};