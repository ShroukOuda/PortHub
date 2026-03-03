# PortHub — Personal Portfolio Builder

A full-stack **MEAN** (MongoDB, Express, Angular, Node.js) web application that allows users to create, manage, and showcase professional portfolios. Each registered user gets a personal portfolio page with projects, skills, experience, education, services, certificates, testimonials, and more.

---

## Features

- **User Authentication** — Register / Login with JWT, Google & GitHub OAuth
- **Dashboard** — Manage portfolio sections (projects, skills, services, education, experience, certificates, testimonials)
- **Portfolio Viewer** — Public portfolio pages with customisable templates & colors
- **Admin Panel** — User management, skill definitions, analytics with charts
- **Image Upload** — Profile pictures and project images via Multer
- **SSR** — Server-Side Rendering with `@angular/ssr` for SEO
- **Dockerised** — Docker Compose with MongoDB, API server, and Angular SSR client

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 20, Tailwind CSS 4, ng2-charts, Lucide icons |
| Backend | Express 5, Mongoose 8, Passport.js, JWT |
| Database | MongoDB 7 |
| Testing | Jest + Supertest (server), Karma + Jasmine (client) |
| DevOps | Docker, Docker Compose |

## Project Structure

```
PortHub/
├── client/          # Angular 20 SSR application
├── server/          # Express REST API
├── docker-compose.yml
└── README.md
```

## Quick Start

### Prerequisites

- Node.js ≥ 22
- MongoDB (local or Atlas)
- npm ≥ 10

### 1. Clone the repo

```bash
git clone https://github.com/ShroukOuda/Portfolio.git
cd Portfolio
```

### 2. Server

```bash
cd server
cp .env.example .env   # Configure MONGO_URL, JWT_SECRET, etc.
npm install
npm start              # Starts on http://localhost:3000
```

### 3. Client

```bash
cd client
npm install --legacy-peer-deps
npm start              # Starts on http://localhost:4200
```

### 4. Seed data (optional)

```bash
cd server
npm run seed
```

## Docker

Run the entire stack with a single command:

```bash
docker compose up --build
```

| Service | URL |
|---------|-----|
| Client (SSR) | http://localhost:4000 |
| API Server | http://localhost:3000 |
| MongoDB | localhost:27017 |

## Testing

```bash
# Server tests
cd server && npm test

# Client tests
cd client && npm test
```

## API Overview

| Route | Description |
|-------|-------------|
| `/api/auth` | Register, Login, OAuth |
| `/api/users` | User CRUD, public stats |
| `/api/portfolios` | Portfolio CRUD, full portfolio endpoint |
| `/api/projects` | Project CRUD |
| `/api/skills` | User skills CRUD |
| `/api/skill-definitions` | Admin-managed predefined skills |
| `/api/services` | Service CRUD |
| `/api/experiences` | Experience CRUD |
| `/api/educations` | Education CRUD |
| `/api/certificates` | Certificate CRUD |
| `/api/testimonials` | Testimonial CRUD |
| `/api/uploads` | File uploads |
| `/api/admin` | Admin dashboard & management |

## Environment Variables (Server)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 3000) |
| `MONGO_URL` | MongoDB connection URL |
| `DB_NAME` | Database name |
| `JWT_SECRET` | JWT signing secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth secret |

## License

ISC

## Author

**Shrouk Ouda** — [GitHub](https://github.com/ShroukOuda)