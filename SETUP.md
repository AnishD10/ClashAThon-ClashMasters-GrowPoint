# SETUP & INSTALLATION GUIDE

## ✅ Prerequisites

Before you start, make sure you have:
- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **npm** or **yarn** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **VS Code** (optional but recommended)

## 🔧 Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/AnishD10/Know-Your-Potential.git
cd Know-Your-Potential
```

### 2. Backend Setup

Navigate to backend folder:
```bash
cd backend
```

**Install Dependencies:**
```bash
npm install
```

**Create Environment File:**
```bash
cp .env.example .env
```

**Edit `.env` file** with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/knowyourpotential
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Available MongoDB Options:**
```
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/knowyourpotential

# MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/knowyourpotential
```

**Start Backend Server:**
```bash
npm run dev
```

Expected output:
```
✅ Server running on port 5000
Environment: development
MongoDB Connected: localhost
```

### 3. Frontend Setup

Navigate to frontend folder (in a new terminal):
```bash
cd frontend
```

**Install Dependencies:**
```bash
npm install
```

**Create Environment File:**
```bash
cp .env.example .env
```

**Edit `.env` file:**
```
REACT_APP_API_URL=http://localhost:5000/api
```

**Start Frontend Development Server:**
```bash
npm start
```

Expected output:
```
Compiled successfully!

You can now view Know-Your-Potential in the browser.

Local:            http://localhost:3000
```

## ✨ Verifying Installation

### Backend Verification
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Expected response
{"message":"Server is running","timestamp":"2026-02-18T..."}
```

### Frontend Verification
- Open http://localhost:3000 in your browser
- You should see the "Know Your Potential" landing page
- Click "Get Started" to go to registration

## 📊 Sample Data Setup (Optional)

To test the application with sample data, run these API calls using Postman or curl:

### 1. Create Sample Skills
```bash
curl -X POST http://localhost:5000/api/skills \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React.js",
    "category": "Web Development",
    "description": "Learn modern React for building web UIs",
    "difficulty_level": "Intermediate",
    "learning_time_hours": 40,
    "job_market_demand": "High",
    "trending": true
  }'
```

### 2. Create Sample Assessment
```bash
curl -X POST http://localhost:5000/api/assessments \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Web Development Aptitude Test",
    "category": "Web Development",
    "duration_minutes": 30,
    "passing_score": 60,
    "questions": [
      {
        "question": "What is React?",
        "options": ["A library", "A framework", "A server", "A database"],
        "correct_answer": "A library",
        "explanation": "React is a JavaScript library for building UIs"
      }
    ]
  }'
```

## 🐛 Troubleshooting

### Port 5000 Already in Use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000    # Windows
```

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running locally: `mongod`
- Or use MongoDB Atlas connection string
- Check MONGODB_URI in .env

### CORS Error in Frontend
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Verify REACT_APP_API_URL in frontend/.env
- Ensure backend --CORS_ORIGIN matches frontend URL
- Restart both servers

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 Terminal Commands Reference

### Backend Commands
```bash
npm start       # Start production server
npm run dev     # Start with auto-reload (development)
npm test        # Run tests
```

### Frontend Commands
```bash
npm start            # Start development server
npm run build        # Create production build
npm run eject        # Eject from Create React App (not reversible)
```

## ✅ Testing the Application

### Step 1: Register
1. Go to http://localhost:3000
2. Click "Register"
3. Fill form with details
4. Click "Register"

### Step 2: Take Assessment
1. Go to "Assessments" page
2. Click "Start" on any assessment
3. Answer questions
4. Click "Submit"
5. View score

### Step 3: Check Dashboard
1. Go to "Dashboard"
2. View stats and recommendations
3. See personalized learning paths

### Step 4: Explore Skills
1. Go to "Skills" page
2. Filter by category/difficulty
3. Browse available skills

## 🚀 Deployment

### Deploy Backend (Heroku Example)
```bash
cd backend
npm install -g heroku-cli
heroku login
heroku create your-app-name
git push heroku main
```

### Deploy Frontend (Netlify Example)
```bash
cd frontend
npm run build
# Drag 'build' folder to Netlify
```

## 📞 Support

If you encounter issues:
1. Check error messages carefully
2. Review .env configuration
3. Ensure all dependencies are installed
4. Check MongoDB connection
5. Open an issue on GitHub

---

**Happy Coding! 🎉**
