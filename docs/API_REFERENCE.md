# API REFERENCE DOCUMENTATION

Complete documentation of all backend API endpoints.

## 🔗 Base URL
```
http://localhost:5000/api
```

## 📝 Authentication

All protected endpoints require JWT token in header:
```
Authorization: Bearer <your-jwt-token>
```

To get a token, call `/auth/login` or `/auth/register`.

---

## 🔐 Authentication Endpoints

### POST /auth/register
**Create new user account**

**HTTP Method:** POST  
**Authentication:** Not required  
**Status Code:** 201 (Created)

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (min 6 chars)",
  "education_level": "string ('+2' | 'Bachelor's' | 'Master's' | 'Other')"
}
```

**Success Response (201):**
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

**Error Response (400):**
```json
{
  "error": "Email already registered"
}
```

**Process:**
1. Validates required fields
2. Checks email uniqueness
3. Hashes password (bcryptjs)
4. Creates user in MongoDB
5. Generates JWT (7 day expiry)
6. Returns token (auto-login)

---

### POST /auth/login
**Authenticate user**

**HTTP Method:** POST  
**Authentication:** Not required  
**Status Code:** 200

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Success Response (200):**
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

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

**Process:**
1. Validates input
2. Finds user by email
3. Compares password with hash
4. If match: generates JWT token
5. If no match: returns 401 error

---

### GET /auth/me
**Get current logged-in user**

**HTTP Method:** GET  
**Authentication:** Required (JWT)  
**Status Code:** 200

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f191e810c19729de860ea",
    "name": "John Doe",
    "email": "john@example.com",
    "education_level": "+2",
    "interests": ["Web Development"],
    "profile_completed": true
  }
}
```

---

## 🎯 Skill Endpoints

### GET /skills
**Retrieve all skills with optional filters**

**HTTP Method:** GET  
**Authentication:** Not required  
**Status Code:** 200

**Query Parameters:**
```
?category=Web Development
?difficulty_level=Intermediate
?trending=true
```

**Examples:**
```
/skills                                    # All skills
/skills?category=Web Development          # Web skills only
/skills?difficulty_level=Beginner         # Beginner skills
/skills?category=Web Development&trending=true
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 45,
  "skills": [
    {
      "_id": "507f191e810c19729de860ea",
      "name": "React.js",
      "category": "Web Development",
      "description": "JavaScript library for building UIs",
      "difficulty_level": "Intermediate",
      "learning_time_hours": 40,
      "job_market_demand": "High",
      "trending": true,
      "prerequisites": ["JavaScript", "HTML/CSS"]
    }
  ]
}
```

---

### GET /skills/:id
**Get single skill details**

**HTTP Method:** GET  
**Authentication:** Not required  
**Status Code:** 200

**URL Parameters:**
```
:id = MongoDB skill ID
```

**Success Response (200):**
```json
{
  "success": true,
  "skill": {
    "_id": "507f191e810c19729de860ea",
    "name": "React.js",
    "category": "Web Development",
    "description": "JavaScript library for building interactive UIs",
    "difficulty_level": "Intermediate",
    "learning_time_hours": 40,
    "prerequisites": ["JavaScript", "HTML/CSS"],
    "job_market_demand": "High",
    "trending": true,
    "resources": [
      "https://react.dev",
      "https://codecademy.com/react"
    ]
  }
}
```

---

### GET /skills/categories/list
**Get all skill categories**

**HTTP Method:** GET  
**Authentication:** Not required  
**Status Code:** 200

**Success Response (200):**
```json
{
  "success": true,
  "categories": [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Cloud Computing",
    "DevOps",
    "Cybersecurity",
    "AI/ML",
    "Other"
  ]
}
```

---

### POST /skills
**Create new skill (Admin only)**

**HTTP Method:** POST  
**Authentication:** Required (Admin role)  
**Status Code:** 201

**Request Body:**
```json
{
  "name": "Next.js",
  "category": "Web Development",
  "description": "React framework for production",
  "difficulty_level": "Advanced",
  "learning_time_hours": 35,
  "job_market_demand": "High",
  "trending": true
}
```

**Success Response (201):**
```json
{
  "success": true,
  "skill": {
    "_id": "507f191e810c19729de860ea",
    "name": "Next.js",
    ...
  }
}
```

---

### GET /skills/paths/all
**Get all learning paths**

**HTTP Method:** GET  
**Authentication:** Not required  
**Status Code:** 200

**Query Parameters:**
```
?category=Web Development
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 8,
  "paths": [
    {
      "_id": "507f191e810c19729de860ea",
      "title": "Full-Stack Web Development",
      "description": "Learn frontend and backend development",
      "category": "Web Development",
      "target_users": ["Web Developer", "Frontend Engineer"],
      "difficulty_level": "Intermediate",
      "total_hours": 120,
      "job_outcomes": ["Web Developer", "Full-Stack Developer"],
      "skills": [
        {
          "skill_id": {...},
          "order": 1,
          "is_mandatory": true
        }
      ]
    }
  ]
}
```

---

### GET /skills/paths/:id
**Get single learning path details**

**HTTP Method:** GET  
**Authentication:** Not required  
**Status Code:** 200

**Success Response (200):**
```json
{
  "success": true,
  "path": {
    "_id": "507f191e810c19729de860ea",
    "title": "Full-Stack Web Development",
    "description": "Learn to build complete web applications",
    "category": "Web Development",
    "skills": [
      {
        "skill_id": {
          "name": "HTML/CSS",
          "difficulty_level": "Beginner"
        },
        "order": 1,
        "is_mandatory": true
      },
      {
        "skill_id": {...},
        "order": 2,
        "is_mandatory": true
      }
    ],
    "total_hours": 120,
    "job_outcomes": ["Web Developer", "Frontend Developer"]
  }
}
```

---

## 📊 Assessment Endpoints

### GET /assessments
**Get all available assessments**

**HTTP Method:** GET  
**Authentication:** Not required  
**Status Code:** 200

**Success Response (200):**
```json
{
  "success": true,
  "count": 12,
  "assessments": [
    {
      "_id": "507f191e810c19729de860ea",
      "title": "Web Development Aptitude Test",
      "category": "Web Development",
      "duration_minutes": 30,
      "passing_score": 60,
      "questions": [
        {
          "question": "What is HTML?",
          "options": ["Markup Language", "Programming", "Design Tool"],
          "correct_answer": "Markup Language",
          "explanation": "HTML is a markup language for webpages"
        }
      ]
    }
  ]
}
```

**Note:** Full question-answer pairs are exposed here for admin/content purposes. When user takes quiz, answers are hidden.

---

### POST /assessments/start
**Start assessment and get questions**

**HTTP Method:** POST  
**Authentication:** Required (JWT)  
**Status Code:** 200

**Request Body:**
```json
{
  "assessment_id": "507f191e810c19729de860ea"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "assessment": {
    "title": "Web Development Aptitude Test",
    "duration_minutes": 30,
    "total_questions": 10,
    "questions": [
      {
        "_id": "507f1910...",
        "question": "What is React?",
        "options": ["Library", "Framework", "Server", "Database"]
      }
    ]
  },
  "progress_id": "507f191e810c19729de860ea"
}
```

**Important:** Correct answers are NOT returned to prevent cheating.

---

### POST /assessments/submit
**Submit assessment and get score**

**HTTP Method:** POST  
**Authentication:** Required (JWT)  
**Status Code:** 200

**Request Body:**
```json
{
  "assessment_id": "507f191e810c19729de860ea",
  "progress_id": "507f191f...",
  "answers": [
    "Library",
    "Framework",
    "Server",
    "Database",
    "Library"
  ]
}
```

**Success Response (200):**
```json
{
  "success": true,
  "score": 80,
  "passing_score": 60,
  "passed": true,
  "detailed_results": [
    {
      "question": "What is React?",
      "user_answer": "Library",
      "correct_answer": "Library",
      "is_correct": true,
      "explanation": "React is a JavaScript library for UIs"
    },
    {
      "question": "What is Vue?",
      "user_answer": "Framework",
      "correct_answer": "Framework",
      "is_correct": true,
      "explanation": "Vue is a progressive JavaScript framework"
    }
  ]
}
```

**Scoring Algorithm:**
```
score = (correct_answers / total_questions) * 100
```

---

### GET /assessments/recommendations/personalized
**Get personalized learning path recommendations**

**HTTP Method:** GET  
**Authentication:** Required (JWT)  
**Status Code:** 200

**Success Response (200):**
```json
{
  "success": true,
  "user_performance": {
    "Web Development": 85,
    "Data Science": 72,
    "Cloud Computing": 65
  },
  "recommendations": [
    {
      "_id": "507f191e810c19729de860ea",
      "title": "Full-Stack Web Development",
      "description": "Learn frontend and backend development",
      "difficulty_level": "Intermediate",
      "relevance_score": 85,
      "job_outcomes": ["Web Developer", "Full-Stack Engineer"],
      "total_hours": 120
    },
    {
      "_id": "507f191f...",
      "title": "Data Science Fundamentals",
      "difficulty_level": "Beginner",
      "relevance_score": 72,
      "job_outcomes": ["Data Analyst", "Data Scientist"]
    }
  ],
  "message": "Personalized learning paths based on your strengths"
}
```

**Algorithm:**
1. Fetch user's assessment scores
2. Group by skill category
3. Calculate averages per category
4. Find learning paths in top 3 categories
5. Rank by relevance (user's score in that category)
6. Return top 5 recommendations

---

### GET /assessments/history/user
**Get user's assessment history**

**HTTP Method:** GET  
**Authentication:** Required (JWT)  
**Status Code:** 200

**Success Response (200):**
```json
{
  "success": true,
  "history": [
    {
      "_id": "507f191e...",
      "user_id": "507f191f...",
      "assessment_id": {
        "_id": "507f1920...",
        "title": "Web Dev Test",
        "category": "Web Development"
      },
      "score": 85,
      "status": "Completed",
      "started_at": "2026-02-18T10:30:00Z",
      "completed_at": "2026-02-18T10:45:00Z"
    }
  ]
}
```

---

## 👤 User Endpoints

### GET /users/profile
**Get user profile**

**HTTP Method:** GET  
**Authentication:** Required (JWT)  
**Status Code:** 200

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f191e810c19729de860ea",
    "name": "John Doe",
    "email": "john@example.com",
    "education_level": "+2",
    "interests": ["Web Development", "Data Science"],
    "profile_completed": true
  }
}
```

---

### PATCH /users/profile
**Update user profile**

**HTTP Method:** PATCH  
**Authentication:** Required (JWT)  
**Status Code:** 200

**Request Body:**
```json
{
  "name": "John Updated",
  "education_level": "Bachelor's",
  "interests": ["Web Development", "Cloud Computing"],
  "profile_completed": true
}
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f191e810c19729de860ea",
    "name": "John Updated",
    "education_level": "Bachelor's",
    "interests": ["Web Development", "Cloud Computing"]
  }
}
```

---

### GET /users/dashboard
**Get user's learning dashboard**

**HTTP Method:** GET  
**Authentication:** Required (JWT)  
**Status Code:** 200

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "education_level": "+2"
  },
  "stats": {
    "total_attempted": 5,
    "completed": 3,
    "in_progress": 1,
    "average_score": 78,
    "completion_percentage": 60
  },
  "recent_assessments": [
    {
      "_id": "507f191e...",
      "assessment_id": {...},
      "score": 85,
      "status": "Completed",
      "completed_at": "2026-02-18T10:45:00Z"
    }
  ]
}
```

---

### GET /users/progress
**Get detailed learning progress**

**HTTP Method:** GET  
**Authentication:** Required (JWT)  
**Status Code:** 200

**Query Parameters:**
```
?skill_id=<skill_id>  # Optional: filter by skill
```

**Success Response (200):**
```json
{
  "success": true,
  "progress": [
    {
      "_id": "507f191e...",
      "user_id": "507f191f...",
      "skill_id": {
        "_id": "507f1920...",
        "name": "React.js"
      },
      "assessment_id": {...},
      "status": "Completed",
      "score": 88,
      "completion_percentage": 100,
      "started_at": "2026-02-15T09:00:00Z",
      "completed_at": "2026-02-15T09:30:00Z",
      "time_spent_hours": 0.5
    }
  ]
}
```

---

## ❌ Error Responses

### Common Error Codes

**400 - Bad Request**
```json
{
  "error": "Please provide all required fields"
}
```

**401 - Unauthorized**
```json
{
  "error": "Token is invalid"
}
```

**404 - Not Found**
```json
{
  "error": "Skill not found"
}
```

**500 - Server Error**
```json
{
  "error": "Internal Server Error"
}
```

---

## 🔒 Security Notes

1. **JWT Tokens expire in 7 days**
   - User needs to login again after expiry
   - Token sent in every request header

2. **Passwords are hashed**
   - Never send plaintext passwords
   - Never store passwords in localStorage

3. **Protected routes**
   - Endpoints with "Authentication: Required" need valid JWT
   - Admin endpoints check user role

4. **Rate limiting (recommended)**
   - Consider adding rate limiting in production
   - Prevent brute force attacks

---

## 📊 Request/Response Format

All responses follow this format:
```json
{
  "success": true/false,
  "data": {...},
  "error": "error message if applicable"
}
```

All requests should have:
```
Content-Type: application/json
```

---

## 🧪 Testing

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123","education_level":"+2"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'

# Get Skills
curl http://localhost:5000/api/skills

# Protected route with token
curl -H "Authorization: Bearer <token>" \
  http://localhost:5000/api/users/profile
```

### Using Postman
1. Create new request
2. Set method (POST/GET/PATCH)
3. Enter URL
4. Add headers: `Content-Type: application/json`
5. For protected routes: `Authorization: Bearer <token>`
6. Add request body (if needed)
7. Click Send

---

**API Documentation Complete!**

For more details, see ARCHITECTURE.md and SETUP.md
