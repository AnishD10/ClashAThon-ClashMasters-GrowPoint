# SYSTEM ARCHITECTURE & DESIGN DOCUMENTATION

## 📋 Table of Contents
1. [System Architecture](#system-architecture)
2. [Database Design](#database-design)
3. [API Specifications](#api-specifications)
4. [Core Algorithm](#core-algorithm)
5. [Security Architecture](#security-architecture)
6. [Component Design](#component-design)

---

## 🏗️ System Architecture

### High-Level Overview
```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                        │
│        (React.js + Tailwind CSS Frontend)               │
│                                                          │
│  [Home] → [Register/Login] → [Dashboard]               │
│                              ├─ [Skills]                │
│                              ├─ [Assessments]           │
│                              └─ [Progress]              │
└────────────────── HTTP/CORS ──────────────────────────┘
                       ↓ ↑
        ┌──────────────────────────────────┐
        │     RESTFUL API BACKEND           │
        │    (Node.js + Express.js)        │
        │                                  │
        │  ├─ /auth      (Authentication)  │
        │  ├─ /skills    (Skill catalog)   │
        │  ├─ /assessments (Quizzes)      │
        │  └─ /users     (Profile/Stats)   │
        │                                  │
        │  Middleware: JWT, Auth, CORS     │
        └──────────────────────────────────┘
                       ↓ ↑
        ┌──────────────────────────────────┐
        │        MONGODB DATABASE           │
        │                                  │
        │  - Users                         │
        │  - Skills                        │
        │  - Assessments                   │
        │  - UserProgress                  │
        │  - LearningPaths                 │
        └──────────────────────────────────┘
```

### Backend Folder Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection logic
│   │
│   ├── models/
│   │   ├── User.js            # User schema with password hashing
│   │   ├── Skill.js           # Skill catalog
│   │   ├── Assessment.js      # Quiz questions and answers
│   │   ├── UserProgress.js    # Track each user's learning
│   │   └── LearningPath.js    # Curated skill sequences
│   │
│   ├── controllers/
│   │   ├── authController.js       # register, login, getCurrentUser
│   │   ├── skillController.js      # getAllSkills, getPathways
│   │   ├── assessmentController.js # Assessment logic + Recommendation Engine
│   │   └── userController.js       # Profile, Dashboard, Progress
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── skillRoutes.js
│   │   ├── assessmentRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── middleware/
│   │   └── auth.js            # JWT verification + role checks
│   │
│   └── server.js              # Express app setup + routes
│
├── package.json               # Dependencies
└── .env                       # Environment variables
```

### Frontend Folder Structure
```
frontend/src/
├── pages/
│   ├── HomePage.js        # Landing page with value prop
│   ├── LoginPage.js       # User login form
│   ├── RegisterPage.js    # User registration form
│   ├── DashboardPage.js   # Main user dashboard + recommendations
│   ├── SkillsPage.js      # Skill browsing + filtering
│   └── AssessmentsPage.js # Quiz interface + submission
│
├── components/
│   └── Navbar.js          # Navigation + user menu
│
├── context/
│   └── AuthContext.js     # Global auth state (Redux alternative)
│
├── services/
│   └── api.js             # Axios API client + interceptors
│
├── styles/
│   └── index.css          # Tailwind CSS + custom styles
│
├── App.js                 # Route definitions + layout
├── index.js               # React DOM render entry
└── index.css              # Global styles
```

---

## 📊 Database Design

### Entity Relationship Diagram
```
┌──────────────┐
│   User       │
├──────────────┤
│ _id (PK)     │
│ name         │
│ email (UNQ)  │
│ password     │
│ education    │
│ role         │
│ interests[]  │
└──────────────┘
      │
      │ 1:N
      ├─────────────────┐
      │                 │
      ↓                 ↓
┌──────────────┐  ┌──────────────────┐
│ UserProgress │  │ Assessment       │
├──────────────┤  ├──────────────────┤
│ _id (PK)     │  │ _id (PK)         │
│ user_id (FK) │  │ title            │
│ assessment_id│  │ category         │
│ score        │  │ questions[]      │
│ status       │  │ passing_score    │
│ started_at   │  │ duration_minutes │
│ completed_at │  └──────────────────┘
└──────────────┘
      │
      ├─────────────────┐
      │                 │
      ↓                 ↓
┌──────────────┐  ┌──────────────────┐
│  Skill       │  │ LearningPath     │
├──────────────┤  ├──────────────────┤
│ _id (PK)     │  │ _id (PK)         │
│ name (UNQ)   │  │ title (UNQ)      │
│ category     │  │ skills[]         │
│ difficulty   │  │ target_users[]   │
│ demand       │  │ job_outcomes[]   │
│ trending     │  │ total_hours      │
│ resources[]  │  └──────────────────┘
└──────────────┘
```

### Schema Details

#### User Collection
```javascript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  name: String,                     // User's full name
  email: String (UNIQUE),          // Must be unique per user
  password: String (HASHED),       // Encrypted with bcryptjs
  education_level: String,          // "+2", "Bachelor's", etc.
  interests: [String],              // e.g., ["Web Dev", "Data Science"]
  role: String,                     // "student" or "admin"
  profile_completed: Boolean,       // Has user filled profile?
  createdAt: Date,                  // Auto-set on creation
  updatedAt: Date                   // Auto-updated on modification
}
```

**Why this structure:**
- Email is UNIQUE to prevent duplicate accounts
- Password is hashed for security (never stored in plain text)
- Role enables admin-only operations
- Interests help with recommendation personalization

#### Assessment Collection
```javascript
{
  _id: ObjectId,
  title: String,                    // e.g., "Web Dev Aptitude Test"
  category: String,                 // Skill category it tests
  duration_minutes: Number,         // Time limit for assessment
  questions: [                      // Array of quiz questions
    {
      question: String,             // The actual question
      options: [String],            // Multiple choice options
      correct_answer: String,       // The right answer
      explanation: String           // Why this is correct
    }
  ],
  passing_score: Number,            // Min score to pass (default: 60)
  is_active: Boolean,               // Can users take this assessment?
  createdAt: Date,
  updatedAt: Date
}
```

**Why this structure:**
- Multiple questions enable comprehensive skill evaluation
- Explanations help users learn from mistakes
- Category links assessments to skills for recommendations

#### UserProgress Collection
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (FK),           // Reference to User
  assessment_id: ObjectId (FK),     // Which assessment was taken
  skill_id: ObjectId (FK),          // Which skill was tested
  status: String,                   // "Not Started", "In Progress", "Completed"
  score: Number,                    // 0-100
  completion_percentage: Number,    // How much of path is complete
  started_at: Date,                 // When user started learning
  completed_at: Date,               // When user finished
  time_spent_hours: Number,         // Total learning time
  createdAt: Date,
  updatedAt: Date
}
```

**Why this structure:**
- Tracks every user-assessment interaction
- Stores scores for analysis and recommendations
- Enables progress visualization on dashboard

---

## 🔌 API Specifications

### Authentication Endpoints

#### POST /api/auth/register
**Purpose:** Create new user account

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "education_level": "+2"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f191e810c19729de860ea",
    "name": "John Doe",
    "email": "john@example.com",
    "education_level": "+2"
  }
}
```

**Process:**
1. Validate input fields
2. Check if email already exists
3. Hash password with bcryptjs and 10 salt rounds
4. Create user in database
5. Generate JWT token (expires in 7 days)
6. Return token and user data

---

#### POST /api/auth/login
**Purpose:** Authenticate user and return JWT token

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f191e810c19729de860ea",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error (Invalid):**
```json
{
  "error": "Invalid credentials"
}
```

**Process:**
1. Validate email and password provided
2. Find user by email
3. Compare provided password with stored hash
4. If match: Generate JWT token
5. If no match: Return 401 error

---

### Assessment Endpoints

#### POST /api/assessments/start
**Purpose:** Initiate assessment and return questions

**Request:**
```json
{
  "assessment_id": "507f191e810c19729de860ea"
}
```

**Response:**
```json
{
  "success": true,
  "assessment": {
    "title": "Web Dev Aptitude Test",
    "duration_minutes": 30,
    "questions": [
      {
        "_id": "...",
        "question": "What is React?",
        "options": ["Library", "Framework", "Server", "Database"]
      }
    ],
    "total_questions": 10
  },
  "progress_id": "507f191e810c19729de860ea"
}
```

**Process:**
1. Find assessment by ID
2. Create UserProgress record with status "In Progress"
3. Record start time
4. Return questions WITHOUT answers (security!)
5. Return progress_id for later submission

**Important:** Answers are NOT sent to client to prevent cheating

---

#### POST /api/assessments/submit
**Purpose:** Submit assessment answers and calculate score

**Request:**
```json
{
  "assessment_id": "507f191e810c19729de860ea",
  "progress_id": "507f191e810c19729de860ea",
  "answers": ["Library", "Framework", "Server"]  // User's selected answers
}
```

**Response:**
```json
{
  "success": true,
  "score": 85,
  "passing_score": 60,
  "passed": true,
  "detailed_results": [
    {
      "question": "What is React?",
      "user_answer": "Library",
      "correct_answer": "Library",
      "is_correct": true,
      "explanation": "React is a JavaScript library..."
    }
  ]
}
```

**Scoring Algorithm:**
```
correct_count = number of user answers matching correct_answers
score = (correct_count / total_questions) * 100
```

**Process:**
1. Verify assessment and progress exist
2. Compare user answers with correct answers
3. Calculate score
4. Update UserProgress with score and status
5. Return detailed results with explanations

---

### Recommendation Engine

#### GET /api/assessments/recommendations/personalized
**Purpose:** Analyze user performance and suggest learning paths

**Response:**
```json
{
  "success": true,
  "user_performance": {
    "Web Development": 85,
    "Data Science": 72,
    "Cloud Computing": 60
  },
  "recommendations": [
    {
      "_id": "...",
      "title": "Full-Stack Web Development",
      "description": "Learn frontend and backend web development",
      "difficulty_level": "Intermediate",
      "relevance_score": 85,
      "job_outcomes": ["Web Developer", "Frontend Engineer"]
    },
    {
      "_id": "...",
      "title": "Data Science Fundamentals",
      "difficulty_level": "Beginner",
      "relevance_score": 72,
      "job_outcomes": ["Data Analyst", "Data Scientist"]
    }
  ]
}
```

**Recommendation Algorithm:**

```javascript
// Step 1: Get user's assessment scores
userAssessments = await UserProgress.find({user_id})

// Step 2: Group by category
categories = {
  'Web Development': [85, 90, 80],  // Multiple quizzes in same category
  'Data Science': [72, 68],
  'Cloud Computing': [60]
}

// Step 3: Calculate category averages
categoryAverages = {
  'Web Development': 85,
  'Data Science': 70,
  'Cloud Computing': 60
}

// Step 4: Get top 3 categories
topCategories = ['Web Development', 'Data Science', 'Cloud Computing']

// Step 5: Find matching learning paths
paths = await LearningPath.find({
  category: {$in: topCategories},
  is_active: true
})

// Step 6: Score and rank paths
scoredPaths = paths.map(path => ({
  ...path,
  relevance_score: categoryAverages[path.category] || 0
})).sort((a, b) => b.relevance_score - a.relevance_score)

// Return top 5 recommendations
return scoredPaths.slice(0, 5)
```

---

## 🧠 Core Algorithm: Personalized Recommendations

### Why This Algorithm?

The recommendation algorithm is the **core solution** to decision paralysis. Instead of students randomly choosing courses, the system:

1. **Measures aptitude** through multi-question assessments
2. **Identifies strengths** by aggregating scores by category
3. **Finds matching paths** in areas where student excels
4. **Ranks by relevance** ensuring best recommendations appear first
5. **Shows job outcomes** helping students see career prospects

### Decision Making Flow

```
Student registers
        ↓
Sees skill catalog
        ↓
Selects skills and takes assessments
        ↓
System analyzes scores
        ↓
Algorithm identifies top strengths
        ↓
Recommends 3-5 learning paths
        ↓
Student sees personalized recommendations
        ↓
Student picks path and starts learning
        ↓
Eliminates decision paralysis!
```

---

## 🔐 Security Architecture

### 1. Password Security
```javascript
// User registration:
const salt = await bcrypt.genSalt(10);  // 10 computation rounds
password = await bcrypt.hash(password, salt);

// Example hash:
// Input: "password123"
// Salted Hash: $2a$10$E7BVe9Md4RaKv0gU5eFXXO4rj5RrPZN3HZ2G1H5w3K6L7m5N9O2K
```

**Why 10 salt rounds?**
- Stronger than 1-5 rounds
- Not too slow (takes ~100ms per hash)
- Industry standard for bcryptjs

### 2. JWT Authentication
```
User Login → Generate JWT → Stored in localStorage → Sent in every API request

JWT Structure:
Header.Payload.Signature
{"alg":"HS256"}.{"id":"507f...","role":"student"}.kEy8FdK...
```

**Flow:**
1. User logs in
2. Server generates JWT token (expires in 7 days)
3. Frontend stores token in localStorage
4. Every API request includes: `Authorization: Bearer <token>`
5. Backend verifies token signature before allowing access

### 3. Protected Routes
```javascript
// Frontend: ProtectedRoute component
function ProtectedRoute({children}) {
  const {isAuthenticated} = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
}

// Backend: Auth middleware
function protect(req, res, next) {
  if (!token) return 401 error;
  if (!verifyToken(token)) return 401 error;
  next();  // Allow access
}
```

### 4. CORS Security
```javascript
// Only allow requests from frontend
cors({
  origin: "http://localhost:3000",  // Only this domain
  credentials: true
})
```

---

## 🎨 Component Design

### React Component Hierarchy
```
<App>
  ├── <Navbar>          # Persistent header
  ├── <Routes>
  │   ├── / → <HomePage>
  │   ├── /register → <RegisterPage>
  │   ├── /login → <LoginPage>
  │   ├── /dashboard → <ProtectedRoute>
  │   │   └── <DashboardPage>
  │   │       ├── StatCard (reusable)
  │   │       ├── ProgressBar
  │   │       └── RecommendationCard
  │   ├── /skills → <ProtectedRoute>
  │   │   └── <SkillsPage>
  │   │       ├── FilterControls
  │   │       └── SkillCard[]
  │   └── /assessments → <ProtectedRoute>
  │       └── <AssessmentsPage>
  │           ├── AssessmentList
  │           └── AssessmentQuiz
  └── <AuthProvider>     # Global state
```

### State Management
```
AuthContext (Global)
├── user object
├── token
├── isAuthenticated
├── login() function
├── register() function
└── logout() function

Component-level State
├── Dashboard: dashboardData, recommendations
├── Skills: skills list, filters
└── Assessments: currentQuestion, answers, score
```

---

## 📈 Performance Considerations

1. **Database Indexes**
```javascript
// On frequently searched fields
userSchema.index({ email: 1 });  // Fast email lookup
skillSchema.index({ category: 1, difficulty: 1 });  // Fast filtering
userProgressSchema.index({ user_id: 1, skill_id: 1 });  // Fast progress lookup
```

2. **API Response Pagination**
```javascript
// For large skill lists
GET /api/skills?page=1&limit=20
// Returns page 1 with 20 skills
```

3. **Frontend Optimization**
- React.memo() for component memoization
- useCallback() for event handler Memoization
- Code splitting with lazy loading
- Image optimization

---

**Architecture Document Complete!**

For implementation details, see SETUP.md
