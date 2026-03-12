const { ObjectId } = require('mongodb');
const { portfolioIds } = require('./portfolios');

const authors = [
  { name: 'John Smith', position: 'CEO', company: 'TechStart Inc', image: 'professional-male-1' },
  { name: 'Sarah Johnson', position: 'Product Manager', company: 'InnovateLabs', image: 'professional-female-1' },
  { name: 'Michael Brown', position: 'CTO', company: 'CloudScale', image: 'professional-male-2' },
  { name: 'Emily Davis', position: 'Design Director', company: 'CreativeHub', image: 'professional-female-2' },
  { name: 'David Wilson', position: 'Founder', company: 'StartupXYZ', image: 'professional-male-3' },
  { name: 'Jessica Martinez', position: 'Engineering Manager', company: 'TechCorp', image: 'professional-female-3' },
  { name: 'Robert Taylor', position: 'Lead Developer', company: 'DevHouse', image: 'professional-male-4' },
  { name: 'Jennifer Anderson', position: 'Product Owner', company: 'FinTech Solutions', image: 'professional-female-4' },
  { name: 'William Thomas', position: 'CEO', company: 'Digital Agency', image: 'professional-male-5' },
  { name: 'Elizabeth Garcia', position: 'Marketing Director', company: 'BrandCo', image: 'professional-female-5' },
  { name: 'James Rodriguez',   position: 'VP of Engineering',    company: 'ScaleUp Inc', image: 'professional-male-6' },
  { name: 'Amanda Lee',        position: 'Head of Product',      company: 'AppWorks', image: 'professional-female-6' },
  { name: 'Christopher White',  position: 'Director of Tech',    company: 'DataFlow', image: 'professional-male-7' },
  { name: 'Sophia Kim',        position: 'Startup Founder',      company: 'NexGen Labs', image: 'professional-female-7' },
  { name: 'Daniel Harris',     position: 'Senior Architect',     company: 'SkyNet Solutions', image: 'professional-male-8' },
  { name: 'Olivia Clark',      position: 'Project Lead',         company: 'Bright Ideas Co', image: 'professional-female-8' },
  { name: 'Matthew Lewis',     position: 'CIO',                  company: 'Enterprise Corp', image: 'professional-male-9' },
  { name: 'Isabella Walker',   position: 'UX Director',          company: 'PixelPerfect', image: 'professional-female-9' },
  { name: 'Andrew Hall',       position: 'Tech Advisor',         company: 'VentureWorks', image: 'professional-male-10' },
  { name: 'Mia Young',         position: 'Operations Manager',   company: 'SwiftOps', image: 'professional-female-10' },
];


const testimonialContents = [
  'An exceptional professional who delivered beyond our expectations. The quality of work and attention to detail was impressive throughout the entire project.',
  'One of the best collaborators I have ever worked with. Highly skilled, reliable, and a great team player who elevates everyone around them.',
  'Transformed our product with innovative solutions and creative problem-solving. Highly recommend for any challenging project.',
  'Delivered high-quality work on time and within budget. Communication was outstanding and they truly understood our vision.',
  'Brought fresh ideas and technical excellence to our project. A true expert who made complex requirements feel straightforward.',
  'Great communication and problem-solving skills. Made a complex project feel simple and kept us informed every step of the way.',
  'Their expertise was invaluable to our success. Went above and beyond to ensure we were completely satisfied with the results.',
  'Creative, professional, and technically brilliant. Working with them was an absolute pleasure from start to finish.',
  'Understood our requirements perfectly and delivered exactly what we needed. We saw measurable improvements immediately.',
  'Outstanding work ethic and deep technical knowledge. A key contributor to our project success and team morale.',
  'Provided elegant solutions to our toughest challenges. Their code quality and documentation set a new standard for our team.',
  'Exceeded every expectation and delivered a product that our users love. Planning our next collaboration already.',
  'Remarkable ability to translate business needs into technical solutions. Truly understands the big picture while nailing the details.',
  'An incredibly talented developer with a keen eye for design. The end result was both functional and beautiful.',
  'Proactive, thorough, and a joy to collaborate with. They anticipated issues before they arose and always had a solution ready.',
];

const testimonials = [];

portfolioIds.forEach(portfolioId => {
  const numTestimonials = Math.floor(Math.random() * 5) + 1; // 1-5 testimonials (min 1)

  // Unique authors per portfolio
  const shuffled = [...authors].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, numTestimonials);

  selected.forEach(({ name, position, company, image }) => {
    testimonials.push({
      _id: new ObjectId(),
      portfolioId: portfolioId,
      content: testimonialContents[Math.floor(Math.random() * testimonialContents.length)],
      author: name,
      authorImage: image ? `uploads/profiles/seed/${image}.jpg` : 'default-author-image.png',
      position: position,
      company: company,
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
    });
  });
});

module.exports = { testimonials };
