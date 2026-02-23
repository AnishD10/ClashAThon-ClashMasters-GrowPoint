# Docker Setup Guide for Know Your Potential

## 🎯 What is Docker and Why We Use It

**Docker** packages your entire application (backend, frontend, database) into isolated containers that run identically on everyone's computer. This means:

✅ **No more "works on my machine"** - Everyone has the exact same environment  
✅ **Easy setup** - New teammates run 2 commands and everything works  
✅ **No manual installation** - No need to install MongoDB, configure databases, etc.  
✅ **Isolated development** - Each developer has their own database, can't break each other's work  
✅ **Fast iteration** - Reset database in 10 seconds, not 10 minutes  

---

## 📋 Prerequisites

Before starting, you need:

1. **Docker Desktop** installed and running
   - Download: https://www.docker.com/products/docker-desktop
   - After install, restart your computer
   - Verify it's running: Open Docker Desktop, should see green "Docker Desktop is running"

2. **Git** (to clone the repository)

3. **Text Editor** (VS Code recommended)

---

## 🚀 Quick Start (First Time Setup)

### Step 1: Clone the Repository

```powershell
# Navigate to where you want the project
cd D:\

# Clone the repository
git clone <your-repo-url>
cd Know-Your-Potential
```

### Step 2: Verify Docker is Running

```powershell
# Check Docker is installed and running
docker --version
# Should show: Docker version 24.x.x or higher

# Test Docker works
docker ps
# Should show empty list or running containers (no errors)
```

### Step 3: Start All Services

```powershell
# Build and start everything (first time takes 3-5 minutes)
docker-compose up --build
```

**What you'll see:**
```
[+] Building...
[+] Running 3/3
 ✔ Container knowyourpotential-mongodb    Started
 ✔ Container knowyourpotential-backend    Started  
 ✔ Container knowyourpotential-frontend   Started

mongodb  | waiting for connections on port 27017
backend  | ✅ Server running on port 5000
backend  | MongoDB Connected: mongodb
backend  | Database: knowyourpotential
frontend | webpack compiled successfully
frontend | On Your Network:  http://localhost:3000/
```

### Step 4: Access the Application

Open your browser:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api/health
- **MongoDB:** mongodb://admin:admin123@localhost:27017 (use MongoDB Compass)

---

## 🎯 Daily Development Workflow

### Starting Your Work Day

```powershell
# Navigate to project
cd D:\Know-Your-Potential

# Start all services (runs in foreground, shows logs)
docker-compose up
```

**Tip:** Keep this terminal open to see live logs. Open a new terminal for other commands.

### Starting in Background (No Logs)

```powershell
# Start detached (runs in background)
docker-compose up -d

# View logs later if needed
docker-compose logs -f backend   # Follow backend logs
docker-compose logs -f frontend  # Follow frontend logs
```

### Making Code Changes

**Backend changes** (e.g., editing `userController.js`):
1. Edit the file
2. Save
3. Backend automatically restarts (nodemon)
4. See "Server running on port 5000" again
5. Changes are live!

**Frontend changes** (e.g., editing `HomePage.js`):
1. Edit the file
2. Save  
3. Browser automatically refreshes (hot reload)
4. Changes appear instantly!

### Stopping Services

```powershell
# If running in foreground:
Press Ctrl + C

# If running in background:
docker-compose down
```

### Ending Your Work Day

```powershell
# Stop all containers (keeps data)
docker-compose down

# Your code changes are saved ✅
# Your database data is saved ✅
# Tomorrow: Just run docker-compose up again
```

---

## 🛠️ Common Commands Cheat Sheet

### Starting Services
```powershell
docker-compose up              # Start (foreground, see logs)
docker-compose up -d           # Start (background)
docker-compose up --build      # Rebuild and start (after package.json changes)
```

### Stopping Services
```powershell
docker-compose down            # Stop containers
docker-compose down -v         # Stop and delete database (fresh start)
```

### Viewing Logs
```powershell
docker-compose logs            # All logs
docker-compose logs backend    # Backend only
docker-compose logs -f mongodb # Follow MongoDB logs (live)
docker-compose logs --tail=50  # Last 50 lines
```

### Restarting Services
```powershell
docker-compose restart backend    # Restart backend only
docker-compose restart            # Restart all
```

### Checking Status
```powershell
docker-compose ps              # What's running?
docker ps                      # Docker's view of containers
```

### Entering a Container (Advanced)
```powershell
# Get a shell inside backend container
docker-compose exec backend sh

# Get MongoDB shell
docker-compose exec mongodb mongosh -u admin -p admin123
```

---

## 🗄️ Database Management

### Viewing Your Data

**Option 1: MongoDB Compass (GUI)**
1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connection string: `mongodb://admin:admin123@localhost:27017`
3. Browse collections graphically

**Option 2: Command Line**
```powershell
# Connect to MongoDB
docker-compose exec mongodb mongosh -u admin -p admin123

# Inside MongoDB shell:
use knowyourpotential          # Switch to your database
db.users.find()                # View all users
db.skills.countDocuments()     # Count skills
exit                           # Quit
```

### Reset Database (Fresh Start)

```powershell
# ⚠️ WARNING: This deletes ALL data!

# Stop containers and delete data
docker-compose down -v

# Start fresh
docker-compose up
```

**When to reset:**
- Test data is messy
- Need clean slate
- Database schema changed
- Something went wrong

---

## 🐛 Troubleshooting

### Problem: Port Already in Use

**Error:**
```
Error: bind: address already in use
```

**Solution:**
```powershell
# Find what's using the port (3000, 5000, or 27017)
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <process-id> /F

# Or change ports in docker-compose.yml:
ports:
  - "3001:3000"  # Use 3001 on your computer instead
```

### Problem: Backend Can't Connect to MongoDB

**Error:**
```
Error connecting to MongoDB: connect ECONNREFUSED
```

**Solution:**
```powershell
# Check MongoDB is running
docker-compose ps

# If MongoDB is unhealthy, restart it
docker-compose restart mongodb

# Check MongoDB logs
docker-compose logs mongodb
```

### Problem: Changes Not Reflecting

**For backend:**
```powershell
# Restart backend container
docker-compose restart backend

# Check if nodemon is running
docker-compose logs backend | findstr nodemon
```

**For frontend:**
```powershell
# Restart frontend container
docker-compose restart frontend

# Clear browser cache (Ctrl + Shift + R)
```

**For package.json changes:**
```powershell
# Must rebuild when dependencies change
docker-compose down
docker-compose up --build
```

### Problem: Out of Disk Space

```powershell
# Check Docker disk usage
docker system df

# Clean up unused images/volumes
docker system prune -a --volumes

# ⚠️ WARNING: This deletes ALL Docker data, including your database!
```

### Problem: Docker Desktop Not Starting

1. Restart Docker Desktop
2. Restart your computer
3. Check WSL 2 is enabled:
   - Docker Desktop → Settings → General
   - "Use WSL 2 based engine" should be checked
4. Update Docker Desktop to latest version

### Problem: Container Keeps Restarting

```powershell
# Check logs to see errors
docker-compose logs backend

# Common causes:
# - Syntax error in code (check logs)
# - Missing environment variable
# - MongoDB not ready yet (wait 10 seconds)
```

---

## 📦 Understanding the Architecture

```
Your Computer (Windows)
├── Docker Desktop (manages containers)
    ├── MongoDB Container
    │   ├── MongoDB 7 running
    │   └── Data: localhost:27017
    │
    ├── Backend Container
    │   ├── Node.js 20
    │   ├── Express API
    │   └── Port: localhost:5000
    │
    └── Frontend Container
        ├── React Dev Server
        ├── Hot Reload enabled
        └── Port: localhost:3000
```

**Communication:**
- Frontend → Backend: `http://localhost:5000/api`
- Backend → MongoDB: `mongodb://mongodb:27017` (inside Docker network)
- You → Frontend: `http://localhost:3000` (in browser)

---

## 🎓 Docker Concepts for Beginners

### What is a Container?
Think of it as a lightweight virtual machine. It runs your app in isolation with its own:
- Operating system (tiny Linux)
- File system
- Network
- Processes

### What is an Image?
A template/blueprint for a container. Like a .zip file with your app + everything it needs.

### What is a Volume?
Persistent storage for data. Survives when containers are deleted.

### What is docker-compose?
A tool to manage multiple containers (MongoDB + Backend + Frontend) as one application.

---

## 🔄 Development vs Production

### Development (What You're Using Now)
- **MongoDB:** Local container
- **Backend:** Hot reload with nodemon
- **Frontend:** React dev server with hot reload
- **Data:** You can reset database anytime
- **Purpose:** Fast development, easy debugging

### Production (For Deployment Later)
- **MongoDB:** Atlas cloud database
- **Backend:** Optimized build, no hot reload
- **Frontend:** Optimized static files (minified)
- **Data:** Real user data, never reset
- **Purpose:** Fast performance, high security

**To switch to production:**
Update `.env` with Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/knowyourpotential
```

---

## 🤝 Team Collaboration

### Adding New Teammates

**Setup for new teammate:**
1. Install Docker Desktop
2. `git clone <repo>`
3. `cd Know-Your-Potential`
4. `docker-compose up`
5. Done! ✅

**Total time:** ~5 minutes (vs hours without Docker)

### Sharing Database Data (Optional)

If you want teammates to have same test data:

```powershell
# Export data
docker-compose exec mongodb mongosh -u admin -p admin123 --eval "db.users.find()" > users.json

# Commit to git (optional)
git add users.json
git commit -m "Add test users"

# Teammate imports:
# (Instructions for data import if needed)
```

**Note:** Usually not needed. Each developer has their own test data.

---

## ❓ FAQ

**Q: Do I need to install MongoDB?**  
A: No! Docker provides MongoDB in a container.

**Q: Do I need to install Node.js?**  
A: No! Docker containers have Node.js 20 inside.

**Q: Can I use MongoDB Compass?**  
A: Yes! Connect to `mongodb://admin:admin123@localhost:27017`

**Q: Will this work on Mac/Linux?**  
A: Yes! Docker is cross-platform. Same commands work everywhere.

**Q: Can I work offline?**  
A: Yes! After first `docker-compose up`, you can work offline.

**Q: How do I update my Node version?**  
A: Edit `Dockerfile`, change `FROM node:20-alpine` to `FROM node:22-alpine`, then rebuild.

**Q: Why is first startup slow?**  
A: Docker downloads images (700 MB MongoDB, 150 MB Node). After first time, it's fast.

**Q: Can I use VS Code debugger?**  
A: Yes! See Advanced Debugging section below (TODO).

---

## 🎬 Next Steps

1. ✅ Get Docker running: `docker-compose up`
2. ✅ Open frontend: http://localhost:3000
3. ✅ Test registration/login
4. ✅ Make a small code change (see hot reload work)
5. ✅ Reset database: `docker-compose down -v && docker-compose up`

**You're ready to develop!** 🚀

---

## 📞 Getting Help

**If something goes wrong:**
1. Check logs: `docker-compose logs`
2. Restart: `docker-compose down && docker-compose up`
3. Ask teammate who has it working
4. Check this DOCKER.md troubleshooting section
5. Google the exact error message

**Useful Resources:**
- Docker Documentation: https://docs.docker.com
- MongoDB Documentation: https://www.mongodb.com/docs
- Our Project README: ../README.md

---

**Happy Coding!** 🎉
