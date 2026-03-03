# PortHub — Server (Express API)

RESTful API server for the PortHub portfolio builder, built with **Express 5**, **Mongoose 8**, and **JWT authentication**.

## Tech Stack

- **Runtime**: Node.js 22+
- **Framework**: Express 5.1
- **Database**: MongoDB via Mongoose 8.16
- **Auth**: JWT + Passport.js (Google & GitHub OAuth)
- **File Upload**: Multer 2.0
- **Testing**: Jest 30 + Supertest 7

## Getting Started

### Prerequisites

- Node.js ≥ 22
- MongoDB (local or Atlas URI)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the server root:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017
DB_NAME=porthub
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### Run

```bash
# Development (with nodemon)
npm start

# Seed database with sample data
npm run seed
```

The API will be available at `http://localhost:3000`.

## Project Structure

```
server/
├── app.js                  # Express app setup & middleware
├── index.js                # Entry point — connects DB & starts server
├── config/
│   ├── db.js               # MongoDB connection
│   ├── corsOptions.js      # CORS configuration
│   ├── allowedOrigins.js   # Allowed origins list
│   └── passport.js         # Passport strategies
├── controllers/            # Route handlers
├── middlewares/
│   ├── authMiddleware.js   # JWT verification
│   ├── roleMiddleware.js   # Role-based access control
│   └── uploadMiddleware.js # Multer file upload config
├── models/                 # Mongoose schemas
├── routes/                 # Express routers
├── seed/                   # Database seeding scripts
├── tests/                  # Jest test suites
├── uploads/                # Uploaded files (profiles, projects)
└── utils/
    ├── hash.js             # bcrypt helpers
    ├── jwt.js              # JWT sign/verify
    └── validators.js       # Input validation
```

## API Endpoints

### Auth (`/api/auth`)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login with email/username |
| GET | `/check-username` | Check username availability |
| GET | `/check-email` | Check email availability |
| GET | `/google` | Google OAuth |
| GET | `/github` | GitHub OAuth |

### Users (`/api/users`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/stats` | — | Public stats |
| GET | `/public` | — | Users with public portfolios |
| GET | `/me` | User | Current user profile |
| PUT | `/me` | User | Update own profile |
| PUT | `/me/password` | User | Change password |
| GET | `/:id` | — | Get user by ID |
| GET | `/` | Admin | All users |
| PUT | `/:id` | Admin | Update user |
| DELETE | `/:id` | Admin | Delete user |

### Portfolios (`/api/portfolios`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | — | Public portfolios |
| GET | `/:id` | — | Get by ID |
| GET | `/user/:userId` | — | Get by user ID |
| GET | `/user/:userId/full` | — | Full portfolio (all sections) |
| POST | `/` | User | Create portfolio |
| PUT | `/:id` | User | Update portfolio |
| DELETE | `/:id` | User | Delete portfolio |

### Skill Definitions (`/api/skill-definitions`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | — | All active skills |
| GET | `/categories` | — | Distinct categories |
| GET | `/admin` | Admin | All skills (with filters) |
| POST | `/` | Admin | Create skill |
| PUT | `/:id` | Admin | Update skill |
| DELETE | `/:id` | Admin | Delete skill |

### Other Resources
Each of these follows the same CRUD pattern under `/api/<resource>`:
`projects`, `skills`, `services`, `experiences`, `educations`, `certificates`, `testimonials`

### Admin (`/api/admin`)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/stats` | Dashboard statistics |
| GET | `/users` | Paginated user list |
| PUT | `/users/:id/toggle-status` | Toggle active/inactive |
| PUT | `/users/:id/role` | Change user role |
| DELETE | `/users/:id` | Delete user |
| GET | `/portfolios` | Paginated portfolio list |

## Testing

```bash
npm test
```

Tests are located in `tests/` and use Jest with the setup file `tests/setup.js` which connects to a test database.

## Docker

```bash
docker build -t porthub-server .
docker run -p 3000:3000 --env-file .env porthub-server
```

Or use the root `docker-compose.yml` for the full stack.

## License

ISC
