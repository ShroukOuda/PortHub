const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const { users } = require('./data/users');
const { portfolios } = require('./data/portfolios');
const { testimonials } = require('./data/testimonials');
const { services } = require('./data/services');
const { skills } = require('./data/skills');
const { certificates } = require('./data/certificates');
const { projects } = require('./data/projects');
const { educations } = require('./data/educations');
const { experiences } = require('./data/experiences');
const { skillDefinitions } = require('./data/skillDefinitions');
const { jobTitles } = require('./data/jobTitles');
const { countries } = require('./data/countries');

const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

// Hash passwords for users
const hashUserPasswords = async (usersData) => {
    const saltRounds = 10;
    return Promise.all(usersData.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, saltRounds)
    })));
};

const seedCollection = async (db, name, data, summary) => {
    try {
        const result = await db.collection(name).insertMany(data);
        summary[name] = result.insertedCount;
    } catch (err) {
        console.error(`❌ Error seeding ${name}:`, err.message);
        summary[name] = 'ERROR';
    }
};

const seedDatabase = async () => {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db(dbName);
        const summary = {};

        // ── 1. Clear all collections ────────────────────────────
        const collections = [
            'users', 'portfolios', 'testimonials', 'services',
            'skills', 'certificates', 'projects', 'educations',
            'experiences', 'skilldefinitions', 'jobtitles', 'countries'
        ];

        for (const col of collections) {
            try {
                await db.collection(col).deleteMany({});
            } catch (err) {
                console.warn(`⚠️  Could not clear ${col}: ${err.message}`);
            }
        }
        console.log('🗑️  Collections cleared\n');

        // ── 2. Seed in dependency order ─────────────────────────

        // Independent reference data first
        await seedCollection(db, 'skilldefinitions', skillDefinitions, summary);
        await seedCollection(db, 'jobtitles', jobTitles, summary);
        await seedCollection(db, 'countries', countries, summary);

        // Users (hash passwords first)
        try {
            const usersWithHashedPasswords = await hashUserPasswords(users);
            const uResult = await db.collection('users').insertMany(usersWithHashedPasswords);
            summary['users'] = uResult.insertedCount;
        } catch (err) {
            console.error('❌ Error seeding users:', err.message);
            summary['users'] = 'ERROR';
        }

        // Portfolios (depend on users)
        await seedCollection(db, 'portfolios', portfolios, summary);

        // Everything else depends on portfolios
        await seedCollection(db, 'skills', skills, summary);
        await seedCollection(db, 'projects', projects, summary);
        await seedCollection(db, 'services', services, summary);
        await seedCollection(db, 'educations', educations, summary);
        await seedCollection(db, 'experiences', experiences, summary);
        await seedCollection(db, 'certificates', certificates, summary);
        await seedCollection(db, 'testimonials', testimonials, summary);

        // ── 3. Print summary ────────────────────────────────────
        console.log('\n╔══════════════════════════════════════╗');
        console.log('║         SEED SUMMARY                 ║');
        console.log('╠══════════════════════════════════════╣');
        for (const [collection, count] of Object.entries(summary)) {
            const status = count === 'ERROR' ? '❌' : '✅';
            const label = collection.padEnd(22);
            console.log(`║ ${status} ${label} ${String(count).padStart(10)} ║`);
        }
        console.log('╚══════════════════════════════════════╝');

        const errors = Object.values(summary).filter(v => v === 'ERROR').length;
        if (errors > 0) {
            console.log(`\n⚠️  Seeding completed with ${errors} error(s)`);
        } else {
            console.log('\n🎉 Database seeded successfully!');
        }

    } catch (error) {
        console.error('💥 Fatal error seeding database:', error);
    } finally {
        await client.close();
        console.log('🔌 MongoDB connection closed');
    }
};

seedDatabase();

module.exports = seedDatabase;