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
  { name: 'Elizabeth Garcia', position: 'Marketing Director', company: 'BrandCo', image: 'professional-female-5' }
];

const testimonialContents = [
  "An exceptional professional who delivered beyond our expectations. The quality of work and attention to detail was impressive.",
  "One of the best collaborators I've worked with. Highly skilled, reliable, and a great team player.",
  "Transformed our product with innovative solutions. Highly recommend for any challenging project.",
  "Delivered high-quality work on time and within budget. Will definitely work with them again.",
  "Brought fresh ideas and technical excellence to our project. A true expert in their field.",
  "Great communication and problem-solving skills. Made a complex project feel simple.",
  "Their expertise was invaluable to our success. Went above and beyond to ensure we were satisfied.",
  "Creative, professional, and technically brilliant. A pleasure to work with.",
  "Understood our requirements perfectly and delivered exactly what we needed. Highly recommended.",
  "Outstanding work ethic and technical knowledge. A key contributor to our project's success."
];

const testimonials = [];

// Generate 0-8 testimonials per portfolio (more for public portfolios)
portfolioIds.forEach((portfolioId, index) => {
  // Portfolio is public if index < 150 (first 150 portfolios are public)
  const isPublic = index < 150;
  const maxTestimonials = isPublic ? 8 : 4;
  const numTestimonials = Math.floor(Math.random() * maxTestimonials); // 0 to maxTestimonials-1
  
  for (let i = 0; i < numTestimonials; i++) {
    const author = authors[Math.floor(Math.random() * authors.length)];
    
    testimonials.push({
      _id: new ObjectId(),
      portfolioId: portfolioId,
      content: testimonialContents[Math.floor(Math.random() * testimonialContents.length)],
      author: author.name,
      authorImage: author.image ? `/uploads/profiles/seed/${author.image}.jpg` : 'default-author-image.png',
      position: author.position,
      company: author.company,
      rating: Math.floor(Math.random() * 2) + 4 // 4 or 5 stars
    });
  }
});

module.exports = { testimonials };