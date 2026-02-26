# Source Code Directory

This directory contains the main source code for the GrowPoint platform.

## Structure

```
src/
├── frontend/          # React.js web application
│   ├── public/       # Static assets served by Express/Nginx
│   ├── src/          # Application source code
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components (routes)
│   │   ├── context/      # State management (AuthContext)
│   │   ├── services/     # API communication layer
│   │   ├── styles/       # Global styles and Tailwind config
│   │   └── media/        # Images and media files
│   ├── package.json   # Dependencies and scripts
│   └── Dockerfile     # Container configuration
│
├── backend/           # Node.js/Express API server
│   ├── src/          # Application source code
│   │   ├── server.js        # Entry point
│   │   ├── config/          # Configuration files (DB, Cloudinary, etc.)
│   │   ├── models/          # MongoDB schemas (Mongoose)
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/      # Custom middleware (auth, validation)
│   │   └── seeds/           # Database seeding scripts
│   ├── package.json   # Dependencies and scripts
│   ├── Dockerfile     # Container configuration
│   └── .env.example   # Environment variable template
│
└── database/          # Database schemas and migrations
    ├── schemas/       # JSON schema definitions
    ├── migrations/    # Database migration scripts
    ├── indexes/       # MongoDB index definitions
    └── backups/       # Database backup storage
```

## Frontend

**Location**: `src/frontend/`

- **Framework**: React.js with functional components
- **Styling**: Tailwind CSS with PostCSS
- **State**: React Context API
- **HTTP**: Axios with JWT interceptor
- **Build**: Create React App (CRA)

### Key Files
- `src/App.js` - Main application component
- `src/index.js` - Entry point
- `src/components/` - Reusable UI components
- `src/pages/` - Route-based page components
- `src/context/AuthContext.js` - Auth state management
- `src/services/api.js` - API communication

## Backend

**Location**: `src/backend/`

- **Runtime**: Node.js v16+
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose ODM
- **Auth**: JWT tokens + bcryptjs
- **File Storage**: Cloudinary integration

### Key Files
- `src/server.js` - Express server setup
- `src/controllers/` - Business logic handlers:
  - `authController.js` - Auth endpoints
  - `assessmentController.js` - Assessment logic
  - `userController.js` - User management
  - `skillController.js` - Skill catalog
  - `careerProfileController.js` - Career recommendations
  - `courseController.js` - Course management
- `src/models/` - Mongoose schemas:
  - `User.js` - User profiles
  - `Assessment.js` - Psychometric tests
  - `UserProgress.js` - Assessment progress tracking
  - `Skill.js` - Competency catalog
  - `Course.js` - Course database
  - `CareerProfile.js` - Career information
  - `LearningPath.js` - Learning sequences
- `src/routes/` - API endpoints
- `src/middleware/auth.js` - JWT verification
- `src/config/` - Configuration:
  - `db.js` - MongoDB connection
  - `cloudinary.js` - File upload config
- `src/seeds/` - Database population scripts

## Database

**Location**: `src/database/`

Contains database-related files for schema management and migrations.

### Subdirectories
- `schemas/` - JSON schema definitions for validation
- `migrations/` - Scripts to update database structure
- `indexes/` - MongoDB index creation scripts
- `backups/` - Backup storage directory

## Running the Application

### Development
```bash
# Backend
cd src/backend
npm install
npm start

# Frontend (in separate terminal)
cd src/frontend
npm install
npm start
```

### Production (Docker)
```bash
docker-compose up -d
```

### With Docker Compose
```bash
# From root directory
docker-compose build
docker-compose up -d
```

## Development Guidelines

### Frontend
- Use functional components with hooks
- Organize components by feature
- Keep component logic in custom hooks
- Use Context API for global state
- Import styles locally with Tailwind utilities

### Backend
- Follow MVC pattern (Models, Views/Routes, Controllers)
- Validate inputs before processing
- Use consistent error handling
- Document API endpoints in controllers
- Add middleware for cross-cutting concerns

### Database
- Use Mongoose schema validation
- Create indexes for frequently queried fields
- Keep related data normalized
- Implement data validation at model level

## Environment Setup

1. Copy `.env.example` to root directory and backend:
   ```bash
   cp .env.example backend/.env
   ```

2. Update environment variables:
   - `MONGODB_URI` - Database connection string
   - `JWT_SECRET` - Token signing secret
   - `CLOUDINARY_*` - Image upload credentials
   - `NODE_ENV` - development/production

3. Install dependencies:
   ```bash
   npm install  # Root
   cd src/frontend && npm install
   cd ../backend && npm install
   ```

4. Start development servers:
   ```bash
   npm run dev  # Requires concurrently (root) or separate terminals
   ```

## Deployment

See [DEPLOYMENT.md](../../DEPLOYMENT.md) for detailed deployment instructions covering:
- Docker Compose setup
- Heroku deployment
- AWS deployment (EC2, ECS)
- DigitalOcean deployment
- SSL/HTTPS configuration
- Monitoring and logging

## Documentation

- Full architecture details: [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)
- API reference: [API_REFERENCE.md](../../API_REFERENCE.md)
- Business model: [docs/BUSINESS_MODEL.md](../../docs/BUSINESS_MODEL.md)
- Setup guide: [SETUP.md](../../SETUP.md)
