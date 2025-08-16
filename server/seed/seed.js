const { MongoClient } = require('mongodb');
require('dotenv').config();

const { users} = require('./data/users');
const { portfolios } = require('./data/portfolios');
const { testimonials } = require('./data/testimonials');
const { services } = require('./data/services');
const { skills } = require('./data/skills');  
const { certificates } = require('./data/certificates');
const { projects } = require('./data/projects');
const { educations } = require('./data/educations');
const { experiences } = require('./data/experiences');

const url = process.env.MONGO_URL;

const dbName = process.env.DB_NAME;

const seedDatabase = async () => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);

        // Clear existing collections
        await db.collection('users').deleteMany({});
        await db.collection('portfolios').deleteMany({});
        await db.collection('testimonials').deleteMany({});
        await db.collection('services').deleteMany({});
        await db.collection('skills').deleteMany({});
        await db.collection('certificates').deleteMany({});
        await db.collection('projects').deleteMany({});
        await db.collection('educations').deleteMany({});
        await db.collection('experiences').deleteMany({});

        console.log('Collections cleared');

        // Seed new data
        await db.collection('users').insertMany(users);
        await db.collection('portfolios').insertMany(portfolios);
        await db.collection('testimonials').insertMany(testimonials);
        await db.collection('services').insertMany(services);
        await db.collection('skills').insertMany(skills);
        await db.collection('certificates').insertMany(certificates);
        await db.collection('projects').insertMany(projects);
        await db.collection('educations').insertMany(educations);
        await db.collection('experiences').insertMany(experiences);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await client.close();
    }
}

seedDatabase();

module.exports = seedDatabase;