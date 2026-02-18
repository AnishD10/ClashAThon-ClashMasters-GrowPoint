# 🚀 GETTING STARTED QUICK GUIDE

## 5-Minute Quickstart

### 1. Install Dependencies
```bash
# Terminal 1: Backend
cd backend
npm install

# Terminal 2: Frontend (new terminal)
cd frontend
npm install
```

### 2. Configure Environment
```bash
# Backend
cd backend
cp .env.example .env

# Frontend
cd frontend
cp .env.example .env
```

### 3. Start Servers
```bash
# Terminal 1: Backend (port 5000)
cd backend
npm run dev

# Terminal 2: Frontend (port 3000)
cd frontend
npm start
```

### 4. Open Browser
Visit: **http://localhost:3000**

---

## 📚 Next Steps

### First Time Using the App?

1. **Register Account**
   - Click "Register" on landing page
   - Fill in your details
   - You'll be automatically logged in

2. **Take Assessments**
   - Go to "Assessments" page
   - Click "Start" on any assessment
   - Answer all questions
   - Submit to see your score

3. **Check Recommendations**
   - After 2-3 assessments, go to "Dashboard"
   - See personalized learning path suggestions
   - Click "Start Learning" on recommended path

4. **Browse Skills**
   - Go to "Skills" page
   - Filter by category or difficulty
   - Explore all available skills

5. **Track Progress**
   - On Dashboard, see:
     - Total skills attempted
     - Completion percentage
     - Average scores
     - Recent assessment history

---

## 📁 Understanding File Structure

### Backend Key Files
| File | Purpose |
|------|---------|
| `src/server.js` | Main Express app & routes setup |
| `src/config/db.js` | MongoDB connection configuration |
| `src/models/User.js` | User authentication & profile |
| `src/models/Assessment.js` | Quiz questions structure |
| `src/controllers/assessmentController.js` | **CORE: Recommendation engine** |
| `src/middleware/auth.js` | JWT token verification |

### Frontend Key Files
| File | Purpose |
|------|---------|
| `src/App.js` | Route definitions & main layout |
| `src/context/AuthContext.js` | Global authentication state |
| `src/services/api.js` | API communication layer |
| `src/pages/DashboardPage.js` | User stats & recommendations |
| `src/pages/AssessmentsPage.js` | Quiz interface |
| `src/components/Navbar.js` | Navigation bar |

---

## 🔍 Key Features to Try

### 1. Authentication
- Register with email & password
- Login to get JWT token
- Token automatically sent with all requests
- Logout clears session

### 2. Skill Discovery
- View 50+ skills
- Filter by category (Web Dev, Data Science, etc.)
- Filter by difficulty (Beginner, Intermediate, Advanced)
- Combine filters for precise search

### 3. Assessments
- **10-15 minute assessments** in different skill areas
- **Multiple choice questions** with explanations
- **Real-time scoring** (0-100%)
- **Assessment history** showing all past attempts

### 4. Recommendation Engine
- Takes top 3 categories from your assessments
- Finds matching learning paths
- Ranks by relevance to your strengths
- Shows job outcomes for each path

### 5. Dashboard
- **Statistics:** Total attempted, completed, in progress
- **Progress bar:** Visual completion percentage
- **Recommendations:** Top 5 suggested learning paths
- **Recent activity:** Latest assessments

---

## 🐛 Common Issues & Solutions

### "Cannot connect to MongoDB"
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Install MongoDB: https://docs.mongodb.com/manual/installation/
- Start MongoDB: `mongod` (in separate terminal)
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9      # macOS/Linux
netstat -ano | findstr :3000       # Windows
```

### "CORS error" in frontend console
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Ensure backend is running on port 5000
- Check `.env` file in frontend has: `REACT_APP_API_URL=http://localhost:5000/api`
- Restart both servers

### Dependencies not installing
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## 💡 API Examples (Test with Postman)

### Example 1: Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Developer",
  "email": "john@example.com",
  "password": "securePass123",
  "education_level": "+2"
}
```

### Example 2: Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePass123"
}

Response includes: token (JWT)
```

### Example 3: Get All Skills
```
GET http://localhost:5000/api/skills

Optional filters:
?category=Web Development
?difficulty_level=Intermediate
?trending=true
```

### Example 4: Start Assessment
```
POST http://localhost:5000/api/assessments/start
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "assessment_id": "507f191e810c19729de860ea"
}
```

### Example 5: Submit Assessment
```
POST http://localhost:5000/api/assessments/submit
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "assessment_id": "...",
  "progress_id": "...",
  "answers": ["Option A", "Option B", "Option A"]
}
```

### Example 6: Get Recommendations
```
GET http://localhost:5000/api/assessments/recommendations/personalized
Authorization: Bearer <your-jwt-token>

Returns: Personalized learning paths based on assessment scores
```

---

## 📊 Data Flow Visualization

### Registration Flow
```
[User Enters Details] 
    ↓
[Frontend validates] 
    ↓
[POST /api/auth/register] 
    ↓
[Backend hashes password] 
    ↓
[Save user to MongoDB] 
    ↓
[Generate JWT token] 
    ↓
[Return token + user data] 
    ↓
[Frontend stores token in localStorage] 
    ↓
[User logged in → Redirected to Dashboard]
```

### Assessment & Recommendation Flow
```
[User takes assessment] 
    ↓
[POST /api/assessments/start] 
    ↓
[Backend returns questions (no answers!)] 
    ↓
[User answers questions] 
    ↓
[POST /api/assessments/submit] 
    ↓
[Backend calculates score] 
    ↓
[Save to UserProgress] 
    ↓
[GET /api/assessments/recommendations/personalized] 
    ↓
[Backend analyzes all past assessment scores] 
    ↓
[Aggregates by skill category] 
    ↓
[Finds matching learning paths] 
    ↓
[Ranks by relevance] 
    ↓
[Returns 3-5 recommendations] 
    ↓
[Dashboard displays suggestions] 
    ↓
[User can start recommended path!]
```

---

## 🎯 Development Workflow

### When Making Changes

#### Backend Changes
1. Edit file in `backend/src/`
2. Save file
3. Nodemon automatically restarts server
4. Test with Postman or curl

#### Frontend Changes
1. Edit file in `frontend/src/`
2. Save file
3. React automatically reloads browser
4. Test in http://localhost:3000

#### Database Changes
1. Edit model in `src/models/`
2. Restart backend server
3. New schema changes apply to new documents

---

## 📝 Testing Checklist

Before deploying, test these scenarios:

- [ ] Register new account works
- [ ] Login with correct credentials works
- [ ] Login with wrong password fails
- [ ] Can view all skills
- [ ] Can filter skills by category
- [ ] Can start assessment
- [ ] Can submit assessment and get score
- [ ] Can see recommendations after assessments
- [ ] Can view dashboard with stats
- [ ] Can logout and login again

---

## 🚀 Next Level Features

Want to extend this? Try adding:

1. **Search Bar** - Search skills by name
2. **Wishlist** - Save favorite skills/paths
3. **User Reviews** - Rate and review skills
4. **Comments** - Discuss skills with others
5. **Premium Courses** - Add paid courses
6. **Leaderboard** - Show top scorers
7. **Notifications** - Alert on new paths
8. **Mobile App** - React Native/Flutter

---

## 📞 Need Help?

- Check [SETUP.md](SETUP.md) for detailed setup guide
- Check [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
- Open an issue on GitHub
- Review error messages in console

---

## 🎉 You're All Set!

You should now have a fully functional "Know Your Potential" skill discovery platform!

**Next Steps:**
1. Go to http://localhost:3000
2. Register an account
3. Take some assessments
4. See your personalized recommendations
5. Explore all features!

Happy learning! 🚀
