const { ObjectId } = require('mongodb');
const { userIds } = require('./users');

// Generate 190 portfolio IDs
const portfolioIds = Array.from({ length: 190 }, () => new ObjectId());

// Theme variations with proper object structure
const themes = {
  // Dark themes
  dark1: { primaryColor: '#91729c', secondaryColor: '#432161', backgroundColor: '#1a1a2e', textColor: '#ffffff', accentColor: '#e9c46a', fontFamily: 'Inter' },
  dark2: { primaryColor: '#6c5ce7', secondaryColor: '#341f97', backgroundColor: '#0f0f1a', textColor: '#ffffff', accentColor: '#00d2d3', fontFamily: 'Poppins' },
  dark3: { primaryColor: '#e84342', secondaryColor: '#b33939', backgroundColor: '#1e272e', textColor: '#d2dae2', accentColor: '#f7d794', fontFamily: 'Roboto' },
  dark4: { primaryColor: '#0abde3', secondaryColor: '#0a79bf', backgroundColor: '#182C47', textColor: '#f5f6fa', accentColor: '#fbc687', fontFamily: 'Montserrat' },
  dark5: { primaryColor: '#f5cd79', secondaryColor: '#e77f67', backgroundColor: '#2c3e50', textColor: '#ecf0f1', accentColor: '#786fa6', fontFamily: 'Open Sans' },
  dark6: { primaryColor: '#cf6a87', secondaryColor: '#b71540', backgroundColor: '#0c0f15', textColor: '#ffffff', accentColor: '#f8c291', fontFamily: 'Lato' },
  dark7: { primaryColor: '#78e08f', secondaryColor: '#38ada9', backgroundColor: '#1e2b37', textColor: '#eaeef2', accentColor: '#f6b93b', fontFamily: 'Raleway' },
  dark8: { primaryColor: '#b8e994', secondaryColor: '#079992', backgroundColor: '#222831', textColor: '#eeeeee', accentColor: '#f9ca24', fontFamily: 'Nunito' },
  dark9: { primaryColor: '#fa744f', secondaryColor: '#c44545', backgroundColor: '#1b262c', textColor: '#f5f5f5', accentColor: '#2c7873', fontFamily: 'Quicksand' },
  dark10: { primaryColor: '#574b90', secondaryColor: '#303952', backgroundColor: '#1a2639', textColor: '#d9d9d9', accentColor: '#eab545', fontFamily: 'Oswald' },
  
  // Light themes
  light1: { primaryColor: '#6c5ce7', secondaryColor: '#4834d4', backgroundColor: '#f8f9fa', textColor: '#2d3436', accentColor: '#00b894', fontFamily: 'Inter' },
  light2: { primaryColor: '#e17055', secondaryColor: '#d63031', backgroundColor: '#ffffff', textColor: '#2d3436', accentColor: '#0984e3', fontFamily: 'Poppins' },
  light3: { primaryColor: '#00b894', secondaryColor: '#00cec9', backgroundColor: '#f0f0f0', textColor: '#1e272e', accentColor: '#ff7675', fontFamily: 'Roboto' },
  light4: { primaryColor: '#fdcb6e', secondaryColor: '#e17055', backgroundColor: '#ffffff', textColor: '#2c3e50', accentColor: '#6c5ce7', fontFamily: 'Montserrat' },
  light5: { primaryColor: '#a29bfe', secondaryColor: '#6c5ce7', backgroundColor: '#f7f1e3', textColor: '#40407a', accentColor: '#ffb8b8', fontFamily: 'Open Sans' },
  light6: { primaryColor: '#ffb8b8', secondaryColor: '#ff7979', backgroundColor: '#ffffff', textColor: '#130f40', accentColor: '#7ed6df', fontFamily: 'Lato' },
  light7: { primaryColor: '#7ed6df', secondaryColor: '#22a6b3', backgroundColor: '#f9f9f9', textColor: '#30336b', accentColor: '#f0932b', fontFamily: 'Raleway' },
  light8: { primaryColor: '#badc58', secondaryColor: '#6ab04c', backgroundColor: '#fefefe', textColor: '#130f40', accentColor: '#eb4d4b', fontFamily: 'Nunito' },
  
  // Vibrant themes
  vibrant1: { primaryColor: '#ff6b6b', secondaryColor: '#4ecdc4', backgroundColor: '#1e272e', textColor: '#ffffff', accentColor: '#ff9f43', fontFamily: 'Inter' },
  vibrant2: { primaryColor: '#54a0ff', secondaryColor: '#5f27cd', backgroundColor: '#222f3e', textColor: '#f5f6fa', accentColor: '#ff9ff3', fontFamily: 'Poppins' },
  vibrant3: { primaryColor: '#f368e0', secondaryColor: '#ee5a24', backgroundColor: '#0a3d62', textColor: '#ffffff', accentColor: '#feca57', fontFamily: 'Roboto' },
  vibrant4: { primaryColor: '#48dbfb', secondaryColor: '#ff6b6b', backgroundColor: '#2c3e50', textColor: '#ecf0f1', accentColor: '#feca57', fontFamily: 'Montserrat' },
  vibrant5: { primaryColor: '#ff9ff3', secondaryColor: '#feca57', backgroundColor: '#1dd1a1', textColor: '#341f97', accentColor: '#ff6b6b', fontFamily: 'Open Sans' },
  vibrant6: { primaryColor: '#10ac84', secondaryColor: '#ff9f43', backgroundColor: '#222831', textColor: '#eeeeee', accentColor: '#ee5a24', fontFamily: 'Lato' },
  vibrant7: { primaryColor: '#5f27cd', secondaryColor: '#341f97', backgroundColor: '#54a0ff', textColor: '#f5f6fa', accentColor: '#ff9ff3', fontFamily: 'Raleway' },
  vibrant8: { primaryColor: '#00d2d3', secondaryColor: '#ff9f43', backgroundColor: '#222f3e', textColor: '#c8d6e5', accentColor: '#f368e0', fontFamily: 'Nunito' },
  
  // Minimalist themes
  minimal1: { primaryColor: '#333333', secondaryColor: '#555555', backgroundColor: '#ffffff', textColor: '#222222', accentColor: '#0077be', fontFamily: 'Inter' },
  minimal2: { primaryColor: '#222222', secondaryColor: '#444444', backgroundColor: '#f8f8f8', textColor: '#111111', accentColor: '#d32f2f', fontFamily: 'Roboto' },
  minimal3: { primaryColor: '#424242', secondaryColor: '#616161', backgroundColor: '#eeeeee', textColor: '#212121', accentColor: '#0d47a1', fontFamily: 'Lato' },
  minimal4: { primaryColor: '#1e1e1e', secondaryColor: '#3d3d3d', backgroundColor: '#fafafa', textColor: '#171717', accentColor: '#c2185b', fontFamily: 'Montserrat' },
  minimal5: { primaryColor: '#2b2b2b', secondaryColor: '#4a4a4a', backgroundColor: '#f5f5f5', textColor: '#2c2c2c', accentColor: '#2e7d32', fontFamily: 'Open Sans' }
};

const themeList = Object.values(themes);

const portfolios = [
  // Portfolio 1 (John Smith - USA) - Public
  {
    _id: portfolioIds[0],
    userId: userIds[0],
    title: "John Smith - Senior Full Stack Developer",
    About: "I'm a passionate Senior Software Engineer with 8+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud architecture.",
    tagline: "Building scalable solutions for complex problems",
    bio: "With over 8 years of experience in full-stack development, I've helped startups and enterprises build robust web applications. My expertise includes React, Node.js, TypeScript, and cloud infrastructure on AWS. I'm passionate about clean code, performance optimization, and mentoring junior developers.",
    AboutImage: "john-about.jpg",
    sociallinks: {
      github: "https://github.com/johnsmith",
      linkedin: "https://linkedin.com/in/johnsmith",
      twitter: "https://twitter.com/johnsmith",
      facebook: "",
      instagram: ""
    },
    theme: themes.dark1,
    isPublic: true,
    cvUrl: "/uploads/cv/john-smith-cv.pdf",
    views: 3452,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 25)
    }))
  },
  // Portfolio 2 (Emily Johnson - USA) - Public
  {
    _id: portfolioIds[1],
    userId: userIds[1],
    title: "Emily Johnson - UX Designer",
    About: "Creative UX Designer passionate about creating intuitive and accessible digital experiences that users love.",
    tagline: "Designing experiences that matter",
    bio: "I'm a UX Designer based in San Francisco with 6+ years of experience designing for web and mobile applications. I specialize in user research, wireframing, prototyping, and usability testing. I believe in human-centered design and creating products that are both beautiful and functional.",
    AboutImage: "emily-about.jpg",
    sociallinks: {
      github: "",
      linkedin: "https://linkedin.com/in/emilyjohnson",
      twitter: "https://twitter.com/emilydesigns",
      facebook: "",
      instagram: "https://instagram.com/emilydesigns"
    },
    theme: themes.dark6,
    isPublic: true,
    cvUrl: "/uploads/cv/emily-johnson-cv.pdf",
    views: 2876,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 20)
    }))
  },
  // Portfolio 3 (Michael Williams - USA) - Private
  {
    _id: portfolioIds[2],
    userId: userIds[2],
    title: "Michael Williams - DevOps Portfolio",
    About: "DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and automation.",
    tagline: "Automating everything, everywhere",
    bio: "I'm a DevOps Engineer with expertise in AWS, Kubernetes, Docker, and CI/CD pipelines. I help companies streamline their development and deployment processes, reducing time-to-market and improving reliability.",
    AboutImage: "michael-about.jpg",
    sociallinks: {
      github: "https://github.com/michaelwilliams",
      linkedin: "https://linkedin.com/in/michaelwilliams",
      twitter: "",
      facebook: "",
      instagram: ""
    },
    theme: themes.light2,
    isPublic: false,
    cvUrl: "",
    views: 876,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 10)
    }))
  },
  // Portfolio 4 (Sarah Brown - USA) - Public
  {
    _id: portfolioIds[3],
    userId: userIds[3],
    title: "Sarah Brown - Full Stack Developer",
    About: "Full Stack Developer with expertise in React, Node.js, and MongoDB. Love building products that make a difference.",
    tagline: "Turning ideas into reality with code",
    bio: "I'm a Full Stack Developer based in Austin, TX. I specialize in building modern web applications using the MERN stack. I'm passionate about creating intuitive user experiences and writing clean, maintainable code.",
    AboutImage: "sarah-about.jpg",
    sociallinks: {
      github: "https://github.com/sarahbrown",
      linkedin: "https://linkedin.com/in/sarahbrown",
      twitter: "https://twitter.com/sarahcodes",
      facebook: "",
      instagram: ""
    },
    theme: themes.vibrant3,
    isPublic: true,
    cvUrl: "/uploads/cv/sarah-brown-cv.pdf",
    views: 1987,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 18)
    }))
  },
  // Portfolio 5 (David Jones - USA) - Public
  {
    _id: portfolioIds[4],
    userId: userIds[4],
    title: "David Jones - Data Science Portfolio",
    About: "Data Scientist with background in machine learning and statistical analysis. Turning data into actionable insights.",
    tagline: "Finding patterns in the noise",
    bio: "I'm a Data Scientist based in Boston with expertise in machine learning, statistical analysis, and data visualization. I've worked on projects ranging from recommendation systems to predictive modeling for healthcare and finance.",
    AboutImage: "david-about.jpg",
    sociallinks: {
      github: "https://github.com/davidjones",
      linkedin: "https://linkedin.com/in/davidjones",
      twitter: "https://twitter.com/daviddatasci",
      facebook: "",
      instagram: ""
    },
    theme: themes.light5,
    isPublic: true,
    cvUrl: "/uploads/cv/david-jones-cv.pdf",
    views: 1564,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 15)
    }))
  },
  // Portfolio 6 (Jessica Garcia - USA) - Private
  {
    _id: portfolioIds[5],
    userId: userIds[5],
    title: "Jessica Garcia - Product Management",
    About: "Product Manager bridging the gap between business needs and technical implementation.",
    tagline: "Building products that users love",
    bio: "I'm a Product Manager with experience in B2B and B2C products. I specialize in user research, product strategy, and working with cross-functional teams to deliver successful products.",
    AboutImage: "jessica-about.jpg",
    sociallinks: {
      github: "",
      linkedin: "https://linkedin.com/in/jessicagarcia",
      twitter: "https://twitter.com/jessicapm",
      facebook: "",
      instagram: ""
    },
    theme: themes.dark4,
    isPublic: false,
    cvUrl: "",
    views: 654,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 8)
    }))
  },
  // Portfolio 7 (James Miller - USA) - Public
  {
    _id: portfolioIds[6],
    userId: userIds[6],
    title: "James Miller - Mobile Developer",
    About: "Mobile Developer specializing in iOS and cross-platform solutions with Flutter.",
    tagline: "Creating amazing mobile experiences",
    bio: "I'm a Mobile Developer based in Portland with 5+ years of experience building iOS and cross-platform apps. I specialize in Swift, SwiftUI, and Flutter. I'm passionate about creating smooth, intuitive mobile experiences.",
    AboutImage: "james-about.jpg",
    sociallinks: {
      github: "https://github.com/jamesmiller",
      linkedin: "https://linkedin.com/in/jamesmiller",
      twitter: "https://twitter.com/jamesmobile",
      facebook: "",
      instagram: ""
    },
    theme: themes.minimal2,
    isPublic: true,
    cvUrl: "/uploads/cv/james-miller-cv.pdf",
    views: 2234,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 22)
    }))
  },
  // Portfolio 8 (Jennifer Davis - USA) - Public
  {
    _id: portfolioIds[7],
    userId: userIds[7],
    title: "Jennifer Davis - Technical Project Manager",
    About: "Technical Project Manager with experience leading agile teams and delivering complex software projects.",
    tagline: "Leading teams to success",
    bio: "I'm a Technical Project Manager with 8+ years of experience in software development and project management. I specialize in agile methodologies, risk management, and cross-functional team leadership.",
    AboutImage: "jennifer-about.jpg",
    sociallinks: {
      github: "",
      linkedin: "https://linkedin.com/in/jenniferdavis",
      twitter: "https://twitter.com/jenniferpm",
      facebook: "",
      instagram: ""
    },
    theme: themes.vibrant2,
    isPublic: true,
    cvUrl: "/uploads/cv/jennifer-davis-cv.pdf",
    views: 1432,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 14)
    }))
  },
  // Portfolio 9 (Robert Rodriguez - USA) - Private
  {
    _id: portfolioIds[8],
    userId: userIds[8],
    title: "Robert Rodriguez - Backend Developer",
    About: "Backend Developer focused on building robust APIs and microservices with Java and Spring Boot.",
    tagline: "Building the backbone of applications",
    bio: "I'm a Backend Developer with expertise in Java, Spring Boot, and microservices architecture. I've built scalable APIs for fintech and e-commerce applications. I'm passionate about clean code and system design.",
    AboutImage: "robert-about.jpg",
    sociallinks: {
      github: "https://github.com/robertrodriguez",
      linkedin: "https://linkedin.com/in/robertrodriguez",
      twitter: "",
      facebook: "",
      instagram: ""
    },
    theme: themes.light3,
    isPublic: false,
    cvUrl: "",
    views: 765,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 9)
    }))
  },
  // Portfolio 10 (Lisa Martinez - USA) - Public
  {
    _id: portfolioIds[9],
    userId: userIds[9],
    title: "Lisa Martinez - UI Designer",
    About: "UI/Visual Designer creating beautiful and functional interfaces for web and mobile apps.",
    tagline: "Designing pixels with purpose",
    bio: "I'm a UI Designer based in Los Angeles with a passion for creating beautiful, functional interfaces. I specialize in visual design, design systems, and bringing brands to life through digital experiences.",
    AboutImage: "lisa-about.jpg",
    sociallinks: {
      github: "",
      linkedin: "https://linkedin.com/in/lisamartinez",
      twitter: "https://twitter.com/lisadesigns",
      facebook: "",
      instagram: "https://instagram.com/lisadesigns"
    },
    theme: themes.vibrant5,
    isPublic: true,
    cvUrl: "/uploads/cv/lisa-martinez-cv.pdf",
    views: 2890,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 24)
    }))
  },
  // Portfolio 11 (William Hernandez - USA) - Public
  {
    _id: portfolioIds[10],
    userId: userIds[10],
    title: "William Hernandez - Systems Architect",
    About: "Systems Architect with expertise in designing scalable, fault-tolerant distributed systems.",
    tagline: "Architecting for scale and reliability",
    bio: "I'm a Systems Architect with over 12 years of experience designing and building large-scale distributed systems. I specialize in microservices, event-driven architecture, and cloud-native applications.",
    AboutImage: "william-about.jpg",
    sociallinks: {
      github: "https://github.com/williamhernandez",
      linkedin: "https://linkedin.com/in/williamhernandez",
      twitter: "",
      facebook: "",
      instagram: ""
    },
    theme: themes.dark9,
    isPublic: true,
    cvUrl: "/uploads/cv/william-hernandez-cv.pdf",
    views: 1876,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 16)
    }))
  },
  // Portfolio 12 (Maria Lopez - USA) - Public
  {
    _id: portfolioIds[11],
    userId: userIds[11],
    title: "Maria Lopez - Frontend Developer",
    About: "Frontend Developer passionate about React, accessibility, and performance optimization.",
    tagline: "Creating fast, accessible web experiences",
    bio: "I'm a Frontend Developer based in San Diego with expertise in React, TypeScript, and modern CSS. I'm passionate about creating performant, accessible web applications that provide great user experiences.",
    AboutImage: "maria-about.jpg",
    sociallinks: {
      github: "https://github.com/marialopez",
      linkedin: "https://linkedin.com/in/marialopez",
      twitter: "https://twitter.com/mariafrontend",
      facebook: "",
      instagram: ""
    },
    theme: themes.light7,
    isPublic: true,
    cvUrl: "/uploads/cv/maria-lopez-cv.pdf",
    views: 2345,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 21)
    }))
  },
  // Portfolio 13 (Richard Gonzalez - USA) - Private
  {
    _id: portfolioIds[12],
    userId: userIds[12],
    title: "Richard Gonzalez - Cloud Architect",
    About: "Cloud Solutions Architect helping companies migrate and optimize their infrastructure on AWS.",
    tagline: "Moving businesses to the cloud",
    bio: "I'm a Cloud Architect specializing in AWS. I help companies design and implement cloud strategies, migrate existing workloads, and optimize costs. I'm passionate about building secure, scalable cloud infrastructure.",
    AboutImage: "richard-about.jpg",
    sociallinks: {
      github: "https://github.com/richardgonzalez",
      linkedin: "https://linkedin.com/in/richardgonzalez",
      twitter: "",
      facebook: "",
      instagram: ""
    },
    theme: themes.dark5,
    isPublic: false,
    cvUrl: "",
    views: 543,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 7)
    }))
  },
  // Portfolio 14 (Elizabeth Wilson - USA) - Public
  {
    _id: portfolioIds[13],
    userId: userIds[13],
    title: "Elizabeth Wilson - Technical Writer",
    About: "Content Strategist and Technical Writer with background in software documentation.",
    tagline: "Making complex things simple",
    bio: "I'm a Technical Writer with 7 years of experience in software documentation. I specialize in API documentation, user guides, and developer tutorials. I believe that good documentation is key to product success.",
    AboutImage: "elizabeth-about.jpg",
    sociallinks: {
      github: "https://github.com/elizabethwilson",
      linkedin: "https://linkedin.com/in/elizabethwilson",
      twitter: "https://twitter.com/elizabethwrites",
      facebook: "",
      instagram: ""
    },
    theme: themes.light1,
    isPublic: true,
    cvUrl: "/uploads/cv/elizabeth-wilson-cv.pdf",
    views: 1234,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 12)
    }))
  },
  // Portfolio 15 (Joseph Anderson - USA) - Public
  {
    _id: portfolioIds[14],
    userId: userIds[14],
    title: "Joseph Anderson - Security Engineer",
    About: "Security Engineer focused on application security, penetration testing, and secure coding practices.",
    tagline: "Securing applications from the ground up",
    bio: "I'm a Security Engineer with expertise in application security, penetration testing, and secure software development lifecycle. I help companies identify vulnerabilities and build more secure applications.",
    AboutImage: "joseph-about.jpg",
    sociallinks: {
      github: "https://github.com/josephanderson",
      linkedin: "https://linkedin.com/in/josephanderson",
      twitter: "https://twitter.com/josephsecurity",
      facebook: "",
      instagram: ""
    },
    theme: themes.dark8,
    isPublic: true,
    cvUrl: "/uploads/cv/joseph-anderson-cv.pdf",
    views: 1678,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 15)
    }))
  },
  // Portfolio 16 (Thomas Taylor - USA) - Private
  {
    _id: portfolioIds[15],
    userId: userIds[15],
    title: "Thomas Taylor - QA Engineer",
    About: "QA Engineer passionate about automation testing and ensuring software quality.",
    tagline: "Breaking things to make them better",
    bio: "I'm a QA Engineer with expertise in automated testing, performance testing, and quality assurance processes. I help teams deliver high-quality software through comprehensive testing strategies.",
    AboutImage: "thomas-about.jpg",
    sociallinks: {
      github: "https://github.com/thomastaylor",
      linkedin: "https://linkedin.com/in/thomastaylor",
      twitter: "",
      facebook: "",
      instagram: ""
    },
    theme: themes.vibrant4,
    isPublic: false,
    cvUrl: "",
    views: 432,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 6)
    }))
  },
  // Portfolio 17 (Patricia Thomas - USA) - Public
  {
    _id: portfolioIds[16],
    userId: userIds[16],
    title: "Patricia Thomas - Engineering Manager",
    About: "Engineering Manager with 10+ years experience leading distributed development teams.",
    tagline: "Building and leading high-performing teams",
    bio: "I'm an Engineering Manager with over a decade of experience in software development and team leadership. I specialize in building and mentoring distributed teams, agile methodologies, and technical strategy.",
    AboutImage: "patricia-about.jpg",
    sociallinks: {
      github: "",
      linkedin: "https://linkedin.com/in/patriciathomas",
      twitter: "https://twitter.com/patriciaem",
      facebook: "",
      instagram: ""
    },
    theme: themes.minimal4,
    isPublic: true,
    cvUrl: "/uploads/cv/patricia-thomas-cv.pdf",
    views: 2100,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 19)
    }))
  },
  // Portfolio 18 (Charles Jackson - USA) - Public
  {
    _id: portfolioIds[17],
    userId: userIds[17],
    title: "Charles Jackson - Database Administrator",
    About: "Database Administrator managing large-scale PostgreSQL and MongoDB deployments.",
    tagline: "Keeping data safe and fast",
    bio: "I'm a Database Administrator with expertise in PostgreSQL, MongoDB, and Redis. I specialize in database design, performance tuning, backup and recovery, and high availability setups.",
    AboutImage: "charles-about.jpg",
    sociallinks: {
      github: "https://github.com/charlesjackson",
      linkedin: "https://linkedin.com/in/charlesjackson",
      twitter: "",
      facebook: "",
      instagram: ""
    },
    theme: themes.light6,
    isPublic: true,
    cvUrl: "/uploads/cv/charles-jackson-cv.pdf",
    views: 1456,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 13)
    }))
  },
  // Portfolio 19 (Christopher White - USA) - Private
  {
    _id: portfolioIds[18],
    userId: userIds[18],
    title: "Christopher White - Game Developer",
    About: "Game Developer creating immersive experiences with Unity and C#.",
    tagline: "Creating worlds and adventures",
    bio: "I'm a Game Developer with expertise in Unity, C#, and 3D graphics. I've worked on mobile games, VR experiences, and interactive installations. I'm passionate about creating engaging gameplay and immersive worlds.",
    AboutImage: "christopher-about.jpg",
    sociallinks: {
      github: "https://github.com/christopherwhite",
      linkedin: "https://linkedin.com/in/christopherwhite",
      twitter: "https://twitter.com/chrisgamedev",
      facebook: "",
      instagram: ""
    },
    theme: themes.vibrant7,
    isPublic: false,
    cvUrl: "",
    views: 876,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 10)
    }))
  },
  // Portfolio 20 (Daniel Harris - USA) - Public
  {
    _id: portfolioIds[19],
    userId: userIds[19],
    title: "Daniel Harris - UX Researcher",
    About: "UX Researcher combining qualitative and quantitative methods to inform product design.",
    tagline: "Understanding users to build better products",
    bio: "I'm a UX Researcher with expertise in user interviews, usability testing, surveys, and data analysis. I help product teams understand their users and make data-driven design decisions.",
    AboutImage: "daniel-about.jpg",
    sociallinks: {
      github: "",
      linkedin: "https://linkedin.com/in/danielharris",
      twitter: "https://twitter.com/danieluxr",
      facebook: "",
      instagram: ""
    },
    theme: themes.light4,
    isPublic: true,
    cvUrl: "/uploads/cv/daniel-harris-cv.pdf",
    views: 1321,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 12)
    }))
  },
  // Portfolio 21 (Oliver Taylor - UK) - Public
  {
    _id: portfolioIds[20],
    userId: userIds[30],
    title: "Oliver Taylor - Senior Full Stack Developer",
    About: "Senior Developer at London fintech startup. Love building scalable systems with modern technologies.",
    tagline: "Building the future of fintech",
    bio: "I'm a Senior Full Stack Developer based in London with 7+ years of experience in fintech. I specialize in React, Node.js, TypeScript, and cloud architecture on AWS. I'm passionate about clean code, testing, and mentoring.",
    AboutImage: "oliver-about.jpg",
    sociallinks: {
      github: "https://github.com/olivertaylor",
      linkedin: "https://linkedin.com/in/olivertaylor",
      twitter: "https://twitter.com/oliverdev",
      facebook: "",
      instagram: ""
    },
    theme: themes.dark7,
    isPublic: true,
    cvUrl: "/uploads/cv/oliver-taylor-cv.pdf",
    views: 2987,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 24)
    }))
  },
  // Portfolio 22 (Amelia Brown - UK) - Public
  {
    _id: portfolioIds[21],
    userId: userIds[31],
    title: "Amelia Brown - UX/UI Designer",
    About: "UX/UI Designer with passion for creating accessible and inclusive digital experiences.",
    tagline: "Designing for everyone",
    bio: "I'm a UX/UI Designer based in Manchester with 6 years of experience. I specialize in accessible design, user research, and creating beautiful interfaces for web and mobile apps.",
    AboutImage: "amelia-about.jpg",
    sociallinks: {
      github: "",
      linkedin: "https://linkedin.com/in/ameliabrown",
      twitter: "https://twitter.com/ameliadesigns",
      facebook: "",
      instagram: "https://instagram.com/ameliadesigns"
    },
    theme: themes.vibrant1,
    isPublic: true,
    cvUrl: "/uploads/cv/amelia-brown-cv.pdf",
    views: 2456,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 22)
    }))
  },
  // Portfolio 23 (Harry Wilson - UK) - Private
  {
    _id: portfolioIds[22],
    userId: userIds[32],
    title: "Harry Wilson - Full Stack Developer",
    About: "Full Stack Developer specializing in React and Node.js. Love contributing to open source.",
    tagline: "Building and sharing",
    bio: "I'm a Full Stack Developer based in Leeds with 5 years of experience. I specialize in React, Node.js, and TypeScript. I'm an active open source contributor and love sharing knowledge through blog posts and talks.",
    AboutImage: "harry-about.jpg",
    sociallinks: {
      github: "https://github.com/harrywilson",
      linkedin: "https://linkedin.com/in/harrywilson",
      twitter: "https://twitter.com/harrycodes",
      facebook: "",
      instagram: ""
    },
    theme: themes.minimal1,
    isPublic: false,
    cvUrl: "",
    views: 987,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 11)
    }))
  },
  // Portfolio 24 (Olivia Davies - UK) - Public
  {
    _id: portfolioIds[23],
    userId: userIds[33],
    title: "Olivia Davies - Product Designer",
    About: "Product Designer creating beautiful and functional digital products for startups and enterprises.",
    tagline: "Designing products people love",
    bio: "I'm a Product Designer based in Liverpool with expertise in end-to-end product design. I've worked with startups and enterprises to create intuitive, user-centered digital products.",
    AboutImage: "olivia-about.jpg",
    sociallinks: {
      github: "",
      linkedin: "https://linkedin.com/in/oliviadavies",
      twitter: "https://twitter.com/oliviadesigns",
      facebook: "",
      instagram: "https://instagram.com/oliviadesigns"
    },
    theme: themes.dark3,
    isPublic: true,
    cvUrl: "/uploads/cv/olivia-davies-cv.pdf",
    views: 2134,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 20)
    }))
  },
  // Portfolio 25 (George Evans - UK) - Public
  {
    _id: portfolioIds[24],
    userId: userIds[34],
    title: "George Evans - DevOps Engineer",
    About: "DevOps Engineer managing cloud infrastructure and CI/CD pipelines for high-traffic applications.",
    tagline: "Automating for reliability",
    bio: "I'm a DevOps Engineer with 7 years of experience in cloud infrastructure and automation. I specialize in AWS, Kubernetes, Terraform, and CI/CD pipelines. I help teams deploy faster and more reliably.",
    AboutImage: "george-about.jpg",
    sociallinks: {
      github: "https://github.com/georgeevans",
      linkedin: "https://linkedin.com/in/georgeevans",
      twitter: "",
      facebook: "",
      instagram: ""
    },
    theme: themes.vibrant8,
    isPublic: true,
    cvUrl: "/uploads/cv/george-evans-cv.pdf",
    views: 1876,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 17)
    }))
  },
  // Portfolio 26 (Liam Tremblay - Canada) - Public
  {
    _id: portfolioIds[25],
    userId: userIds[50],
    title: "Liam Tremblay - Software Engineer",
    About: "Software Engineer at Toronto tech company. Building scalable web applications with modern technologies.",
    tagline: "Engineering solutions for real problems",
    bio: "I'm a Software Engineer based in Toronto with 6 years of experience in full-stack development. I specialize in React, Node.js, and cloud architecture. I'm passionate about clean code and performance optimization.",
    AboutImage: "liam-about.jpg",
    sociallinks: {
      github: "https://github.com/liamtremblay",
      linkedin: "https://linkedin.com/in/liamtremblay",
      twitter: "https://twitter.com/liamcodes",
      facebook: "",
      instagram: ""
    },
    theme: themes.dark2,
    isPublic: true,
    cvUrl: "/uploads/cv/liam-tremblay-cv.pdf",
    views: 2345,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 21)
    }))
  },
  // Portfolio 27 (Emma Gagnon - Canada) - Public
  {
    _id: portfolioIds[26],
    userId: userIds[51],
    title: "Emma Gagnon - UX Designer",
    About: "UX Designer creating accessible and inclusive digital experiences for web and mobile.",
    tagline: "Designing with empathy",
    bio: "I'm a UX Designer based in Montreal with 5 years of experience in creating accessible digital experiences. I specialize in user research, wireframing, and usability testing for bilingual applications.",
    AboutImage: "emma-about.jpg",
    sociallinks: {
      github: "",
      linkedin: "https://linkedin.com/in/emmagagnon",
      twitter: "https://twitter.com/emmadesigns",
      facebook: "",
      instagram: "https://instagram.com/emmadesigns"
    },
    theme: themes.minimal5,
    isPublic: true,
    cvUrl: "/uploads/cv/emma-gagnon-cv.pdf",
    views: 1987,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 18)
    }))
  },
  // Portfolio 28 (Noah Roy - Canada) - Private
  {
    _id: portfolioIds[27],
    userId: userIds[52],
    title: "Noah Roy - Full Stack Developer",
    About: "Full Stack Developer specializing in MERN stack applications for startups.",
    tagline: "From idea to product",
    bio: "I'm a Full Stack Developer based in Vancouver with expertise in the MERN stack. I help startups build their MVP and scale their products. I'm passionate about clean code and user-centered design.",
    AboutImage: "noah-about.jpg",
    sociallinks: {
      github: "https://github.com/noahroy",
      linkedin: "https://linkedin.com/in/noahroy",
      twitter: "",
      facebook: "",
      instagram: ""
    },
    theme: themes.vibrant6,
    isPublic: false,
    cvUrl: "",
    views: 654,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 8)
    }))
  },
  // Portfolio 29 (Olivia Cote - Canada) - Public
  {
    _id: portfolioIds[28],
    userId: userIds[53],
    title: "Olivia Cote - Product Designer",
    About: "Product Designer passionate about creating meaningful digital products for social impact.",
    tagline: "Designing for good",
    bio: "I'm a Product Designer based in Ottawa with 6 years of experience designing for social impact organizations. I specialize in user research, interaction design, and creating accessible digital experiences.",
    AboutImage: "olivia-about.jpg",
    sociallinks: {
      github: "",
      linkedin: "https://linkedin.com/in/oliviacote",
      twitter: "https://twitter.com/oliviadesigns",
      facebook: "",
      instagram: "https://instagram.com/oliviadesigns"
    },
    theme: themes.light8,
    isPublic: true,
    cvUrl: "/uploads/cv/olivia-cote-cv.pdf",
    views: 1765,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 16)
    }))
  },
  // Portfolio 30 (William Bouchard - Canada) - Public
  {
    _id: portfolioIds[29],
    userId: userIds[54],
    title: "William Bouchard - DevOps Engineer",
    About: "DevOps Engineer managing cloud infrastructure on AWS and Azure for enterprise clients.",
    tagline: "Building reliable infrastructure",
    bio: "I'm a DevOps Engineer based in Calgary with 8 years of experience in cloud infrastructure. I specialize in AWS, Azure, Kubernetes, and infrastructure as code. I help enterprises build scalable and reliable systems.",
    AboutImage: "william-about.jpg",
    sociallinks: {
      github: "https://github.com/williambouchard",
      linkedin: "https://linkedin.com/in/williambouchard",
      twitter: "",
      facebook: "",
      instagram: ""
    },
    theme: themes.dark10,
    isPublic: true,
    cvUrl: "/uploads/cv/william-bouchard-cv.pdf",
    views: 2134,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 19)
    }))
  },
  // Portfolio 31 (Jack O'Brien - Australia) - Public
  {
    _id: portfolioIds[30],
    userId: userIds[65],
    title: "Jack O'Brien - Full Stack Developer",
    About: "Full Stack Developer at Sydney startup. Love building products that make a difference in people's lives.",
    tagline: "Building products with purpose",
    bio: "I'm a Full Stack Developer based in Sydney with 6 years of experience in startup environments. I specialize in React, Node.js, and cloud architecture. I'm passionate about creating products that solve real problems.",
    AboutImage: "jack-about.jpg",
    sociallinks: {
      github: "https://github.com/jackobrien",
      linkedin: "https://linkedin.com/in/jackobrien",
      twitter: "https://twitter.com/jackcodes",
      facebook: "",
      instagram: ""
    },
    theme: themes.light2,
    isPublic: true,
    cvUrl: "/uploads/cv/jack-obrien-cv.pdf",
    views: 2678,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 23)
    }))
  },
  // Portfolio 32 (Charlotte Cooper - Australia) - Public
  {
    _id: portfolioIds[31],
    userId: userIds[66],
    title: "Charlotte Cooper - UX Designer",
    About: "UX Designer creating user-centered designs for fintech applications in Melbourne.",
    tagline: "Designing for financial wellness",
    bio: "I'm a UX Designer based in Melbourne with 5 years of experience in fintech. I specialize in user research, wireframing, and designing complex financial applications that are intuitive and easy to use.",
    AboutImage: "charlotte-about.jpg",
    sociallinks: {
      github: "",
      linkedin: "https://linkedin.com/in/charlottecooper",
      twitter: "https://twitter.com/charlottedesigns",
      facebook: "",
      instagram: "https://instagram.com/charlottedesigns"
    },
    theme: themes.dark3,
    isPublic: true,
    cvUrl: "/uploads/cv/charlotte-cooper-cv.pdf",
    views: 1876,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 17)
    }))
  },
  // Portfolio 33 (Thomas Morgan - Australia) - Private
  {
    _id: portfolioIds[32],
    userId: userIds[67],
    title: "Thomas Morgan - DevOps Engineer",
    About: "DevOps Engineer specializing in cloud infrastructure and automation for Brisbane tech companies.",
    tagline: "Automating for efficiency",
    bio: "I'm a DevOps Engineer based in Brisbane with 7 years of experience. I specialize in AWS, Kubernetes, and CI/CD pipelines. I help companies streamline their development and deployment processes.",
    AboutImage: "thomas-about.jpg",
    sociallinks: {
      github: "https://github.com/thomasmorgan",
      linkedin: "https://linkedin.com/in/thomasmorgan",
      twitter: "",
      facebook: "",
      instagram: ""
    },
    theme: themes.minimal3,
    isPublic: false,
    cvUrl: "",
    views: 765,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 9)
    }))
  },
  // Portfolio 34 (Aarav Sharma - India) - Public
  {
    _id: portfolioIds[33],
    userId: userIds[80],
    title: "Aarav Sharma - Senior Software Engineer",
    About: "Senior Software Engineer at Bangalore tech company. Expert in cloud computing and scalable architectures.",
    tagline: "Engineering for scale",
    bio: "I'm a Senior Software Engineer based in Bangalore with 9 years of experience. I specialize in Java, Spring Boot, microservices, and cloud architecture. I've built scalable systems for fintech and e-commerce.",
    AboutImage: "aarav-about.jpg",
    sociallinks: {
      github: "https://github.com/aaravsharma",
      linkedin: "https://linkedin.com/in/aaravsharma",
      twitter: "https://twitter.com/aaravcodes",
      facebook: "",
      instagram: ""
    },
    theme: themes.vibrant2,
    isPublic: true,
    cvUrl: "/uploads/cv/aarav-sharma-cv.pdf",
    views: 3124,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 28)
    }))
  },
  // Portfolio 35 (Aanya Patel - India) - Public
  {
    _id: portfolioIds[34],
    userId: userIds[81],
    title: "Aanya Patel - UX Designer",
    About: "UX Designer passionate about creating accessible digital experiences for diverse Indian users.",
    tagline: "Designing for India",
    bio: "I'm a UX Designer based in Mumbai with 6 years of experience. I specialize in creating accessible digital experiences for Indian users across languages and cultures. I'm passionate about inclusive design.",
    AboutImage: "aanya-about.jpg",
    sociallinks: {
      github: "",
      linkedin: "https://linkedin.com/in/aanyapatel",
      twitter: "https://twitter.com/aanyadesigns",
      facebook: "",
      instagram: "https://instagram.com/aanyadesigns"
    },
    theme: themes.dark4,
    isPublic: true,
    cvUrl: "/uploads/cv/aanya-patel-cv.pdf",
    views: 2345,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 21)
    }))
  },
  // Portfolio 36 (Vihaan Kumar - India) - Private
  {
    _id: portfolioIds[35],
    userId: userIds[82],
    title: "Vihaan Kumar - Full Stack Developer",
    About: "Full Stack Developer building scalable web applications with React and Node.js for Chennai startups.",
    tagline: "Building for the next billion",
    bio: "I'm a Full Stack Developer based in Chennai with 5 years of experience. I specialize in the MERN stack and have built applications for edtech and healthcare startups in India.",
    AboutImage: "vihaan-about.jpg",
    sociallinks: {
      github: "https://github.com/vihaankumar",
      linkedin: "https://linkedin.com/in/vihaankumar",
      twitter: "",
      facebook: "",
      instagram: ""
    },
    theme: themes.light5,
    isPublic: false,
    cvUrl: "",
    views: 876,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 10)
    }))
  },
  // Portfolio 37 (Elias Müller - Germany) - Public
  {
    _id: portfolioIds[36],
    userId: userIds[95],
    title: "Elias Müller - Software Engineer",
    About: "Software Engineer at Berlin tech company. Building scalable backend systems with Java and Spring Boot.",
    tagline: "Engineering robust systems",
    bio: "I'm a Software Engineer based in Berlin with 7 years of experience in backend development. I specialize in Java, Spring Boot, and microservices architecture. I'm passionate about clean code and system design.",
    AboutImage: "elias-about.jpg",
    sociallinks: {
      github: "https://github.com/eliasmuller",
      linkedin: "https://linkedin.com/in/eliasmuller",
      twitter: "https://twitter.com/eliasmuller",
      facebook: "",
      instagram: ""
    },
    theme: themes.dark9,
    isPublic: true,
    cvUrl: "/uploads/cv/elias-muller-cv.pdf",
    views: 2543,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 23)
    }))
  },
  // Portfolio 38 (Hannah Schmidt - Germany) - Public
  {
    _id: portfolioIds[37],
    userId: userIds[96],
    title: "Hannah Schmidt - UX Designer",
    About: "UX Designer creating intuitive and accessible digital experiences for German users.",
    tagline: "Designing for clarity",
    bio: "I'm a UX Designer based in Munich with 6 years of experience. I specialize in user research, wireframing, and creating accessible digital experiences for German-speaking users.",
    AboutImage: "hannah-about.jpg",
    sociallinks: {
      github: "",
      linkedin: "https://linkedin.com/in/hannahschmidt",
      twitter: "https://twitter.com/hannahdesigns",
      facebook: "",
      instagram: "https://instagram.com/hannahdesigns"
    },
    theme: themes.light7,
    isPublic: true,
    cvUrl: "/uploads/cv/hannah-schmidt-cv.pdf",
    views: 1987,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 18)
    }))
  },
  // Portfolio 39 (Lucas Martin - France) - Public
  {
    _id: portfolioIds[38],
    userId: userIds[110],
    title: "Lucas Martin - Full Stack Developer",
    About: "Full Stack Developer with expertise in React and Node.js. Based in Paris.",
    tagline: "Creating innovative solutions",
    bio: "I'm a Full Stack Developer based in Paris with 6 years of experience. I specialize in React, Node.js, and cloud architecture. I'm passionate about clean code and solving complex problems.",
    AboutImage: "lucas-about.jpg",
    sociallinks: {
      github: "https://github.com/lucasmartin",
      linkedin: "https://linkedin.com/in/lucasmartin",
      twitter: "https://twitter.com/lucasdev",
      facebook: "",
      instagram: ""
    },
    theme: themes.vibrant5,
    isPublic: true,
    cvUrl: "/uploads/cv/lucas-martin-cv.pdf",
    views: 2213,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 20)
    }))
  },
  // Portfolio 40 (Miguel Silva - Brazil) - Public
  {
    _id: portfolioIds[39],
    userId: userIds[125],
    title: "Miguel Silva - Senior Software Engineer",
    About: "Senior Software Engineer specializing in scalable systems and microservices architecture.",
    tagline: "Building systems that scale",
    bio: "I'm a Senior Software Engineer based in São Paulo with 9 years of experience. I specialize in Java, Spring Boot, microservices, and cloud architecture. I help companies build robust and scalable systems.",
    AboutImage: "miguel-about.jpg",
    sociallinks: {
      github: "https://github.com/miguelsilva",
      linkedin: "https://linkedin.com/in/miguelsilva",
      twitter: "https://twitter.com/migueldev",
      facebook: "",
      instagram: ""
    },
    theme: themes.dark5,
    isPublic: true,
    cvUrl: "/uploads/cv/miguel-silva-cv.pdf",
    views: 2876,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 25)
    }))
  },
  // Portfolio 41 (Chidi Okonkwo - Nigeria) - Public
  {
    _id: portfolioIds[40],
    userId: userIds[140],
    title: "Chidi Okonkwo - Full Stack Developer",
    About: "Full Stack Developer building scalable web applications for African businesses and startups.",
    tagline: "Building for Africa",
    bio: "I'm a Full Stack Developer based in Lagos with 6 years of experience building web applications for African businesses. I specialize in React, Node.js, and cloud infrastructure. I'm passionate about using technology to solve local problems.",
    AboutImage: "chidi-about.jpg",
    sociallinks: {
      github: "https://github.com/chidiokonkwo",
      linkedin: "https://linkedin.com/in/chidiokonkwo",
      twitter: "https://twitter.com/chidicodes",
      facebook: "",
      instagram: ""
    },
    theme: themes.light1,
    isPublic: true,
    cvUrl: "/uploads/cv/chidi-okonkwo-cv.pdf",
    views: 1987,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 18)
    }))
  },
  // Portfolio 42 (Leonardo Rossi - Italy) - Public
  {
    _id: portfolioIds[41],
    userId: userIds[150],
    title: "Leonardo Rossi - Full Stack Developer",
    About: "Full Stack Developer with experience in React and Node.js. Passionate about design and software architecture.",
    tagline: "Creating digital experiences",
    bio: "I'm a Full Stack Developer based in Rome with 7 years of experience. I specialize in React, Node.js, and scalable architectures. I'm passionate about design and creating elegant solutions.",
    AboutImage: "leonardo-about.jpg",
    sociallinks: {
      github: "https://github.com/leonardorossi",
      linkedin: "https://linkedin.com/in/leonardorossi",
      twitter: "https://twitter.com/leonardodev",
      facebook: "",
      instagram: ""
    },
    theme: themes.minimal2,
    isPublic: true,
    cvUrl: "/uploads/cv/leonardo-rossi-cv.pdf",
    views: 2100,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 19)
    }))
  },
  // Portfolio 43 (Pablo Garcia - Spain) - Public
  {
    _id: portfolioIds[42],
    userId: userIds[160],
    title: "Pablo Garcia - Full Stack Developer",
    About: "Full Stack Developer with experience in React and Node.js. Passionate about creating innovative web applications.",
    tagline: "Innovating through code",
    bio: "I'm a Full Stack Developer based in Madrid with 7 years of experience. I specialize in React, Node.js, and cloud architecture. I'm passionate about creating applications that solve real problems.",
    AboutImage: "pablo-about.jpg",
    sociallinks: {
      github: "https://github.com/pablogarcia",
      linkedin: "https://linkedin.com/in/pablogarcia",
      twitter: "https://twitter.com/pablodev",
      facebook: "",
      instagram: ""
    },
    theme: themes.dark8,
    isPublic: true,
    cvUrl: "/uploads/cv/pablo-garcia-cv.pdf",
    views: 2341,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 21)
    }))
  },
  // Portfolio 44 (Juan Hernandez - Mexico) - Public
  {
    _id: portfolioIds[43],
    userId: userIds[170],
    title: "Juan Hernandez - Full Stack Developer",
    About: "Full Stack Developer with experience in React and Node.js. Passionate about creating technology solutions for Mexico.",
    tagline: "Technology for Mexico",
    bio: "I'm a Full Stack Developer based in Mexico City with 7 years of experience. I specialize in React, Node.js, and cloud architecture. I'm passionate about creating technology solutions for the Mexican market.",
    AboutImage: "juan-about.jpg",
    sociallinks: {
      github: "https://github.com/juanhernandez",
      linkedin: "https://linkedin.com/in/juanhernandez",
      twitter: "https://twitter.com/juandev",
      facebook: "",
      instagram: ""
    },
    theme: themes.light4,
    isPublic: true,
    cvUrl: "/uploads/cv/juan-hernandez-cv.pdf",
    views: 2234,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 20)
    }))
  },
  // Portfolio 45 (Haruto Sato - Japan) - Public
  {
    _id: portfolioIds[44],
    userId: userIds[180],
    title: "Haruto Sato - Full Stack Developer",
    About: "Full Stack Developer building scalable web applications in Tokyo.",
    tagline: "Building for the future",
    bio: "I'm a Full Stack Developer based in Tokyo with 7 years of experience. I specialize in React, Node.js, and cloud architecture. I'm passionate about creating applications that are both beautiful and functional.",
    AboutImage: "haruto-about.jpg",
    sociallinks: {
      github: "https://github.com/harutosato",
      linkedin: "https://linkedin.com/in/harutosato",
      twitter: "https://twitter.com/harutodev",
      facebook: "",
      instagram: ""
    },
    theme: themes.vibrant3,
    isPublic: true,
    cvUrl: "/uploads/cv/haruto-sato-cv.pdf",
    views: 2456,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 22)
    }))
  },
  // Portfolio 46 (Mateo Fernandez - Argentina) - Public
  {
    _id: portfolioIds[45],
    userId: userIds[190],
    title: "Mateo Fernandez - Full Stack Developer",
    About: "Full Stack Developer with expertise in React and Node.js. Based in Buenos Aires.",
    tagline: "Creating digital solutions",
    bio: "I'm a Full Stack Developer based in Buenos Aires with 6 years of experience. I specialize in React, Node.js, and cloud architecture. I'm passionate about building applications that make a difference.",
    AboutImage: "mateo-about.jpg",
    sociallinks: {
      github: "https://github.com/mateofernandez",
      linkedin: "https://linkedin.com/in/mateofernandez",
      twitter: "https://twitter.com/mateodev",
      facebook: "",
      instagram: ""
    },
    theme: themes.dark6,
    isPublic: true,
    cvUrl: "/uploads/cv/mateo-fernandez-cv.pdf",
    views: 1987,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 18)
    }))
  },
  // Portfolio 47 (Klara Novak - Czech Republic) - Public
  {
    _id: portfolioIds[46],
    userId: userIds[199],
    title: "Klara Novak - Frontend Developer",
    About: "Frontend Developer passionate about React and performance optimization. Based in Prague.",
    tagline: "Creating fast, beautiful interfaces",
    bio: "I'm a Frontend Developer based in Prague with 5 years of experience. I specialize in React, TypeScript, and performance optimization. I'm passionate about creating fast, accessible web applications.",
    AboutImage: "klara-about.jpg",
    sociallinks: {
      github: "https://github.com/klaranovak",
      linkedin: "https://linkedin.com/in/klaranovak",
      twitter: "https://twitter.com/klaradev",
      facebook: "",
      instagram: ""
    },
    theme: themes.light3,
    isPublic: true,
    cvUrl: "/uploads/cv/klara-novak-cv.pdf",
    views: 1765,
    viewHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 16)
    }))
  }
];

// Generate remaining portfolios (48-190) to reach 190 total
for (let i = 47; i < 190; i++) {
  const userIndex = i % 200;
  const themeIndex = i % themeList.length;
  const isPublic = i < 150; // First 150 are public, last 40 are private
  
  portfolios.push({
    _id: portfolioIds[i],
    userId: userIds[userIndex],
    title: `Portfolio of User ${userIndex + 1}`,
    About: `Professional portfolio showcasing my work as a developer.`,
    tagline: "Creating impactful solutions",
    bio: `I'm a professional based in various locations with experience in building digital products.`,
    AboutImage: "default-about.jpg",
    sociallinks: {
      github: Math.random() > 0.3 ? `https://github.com/user${userIndex}` : "",
      linkedin: Math.random() > 0.2 ? `https://linkedin.com/in/user${userIndex}` : "",
      twitter: Math.random() > 0.6 ? `https://twitter.com/user${userIndex}` : "",
      facebook: "",
      instagram: Math.random() > 0.7 ? `https://instagram.com/user${userIndex}` : ""
    },
    theme: themeList[themeIndex],
    isPublic: isPublic,
    cvUrl: Math.random() > 0.5 ? `/uploads/cv/user${userIndex}-cv.pdf` : "",
    views: Math.floor(Math.random() * 3000),
    viewHistory: Array.from({ length: 30 }, (_, j) => ({
      date: new Date(Date.now() - j * 24 * 60 * 60 * 1000),
      count: Math.floor(Math.random() * 20)
    }))
  });
}

module.exports = {
  portfolios,
  portfolioIds
};