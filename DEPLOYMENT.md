# Deployment Guide

## Overview

GrowPoint can be deployed using Docker Compose for containerized deployment or manually on traditional servers. This guide covers both local development setup and production deployment.

## Prerequisites

- Docker & Docker Compose (v1.29+)
- Node.js v16+ (for local development)
- MongoDB (local or MongoDB Atlas)
- Git
- Environment variables configured

## Quick Start with Docker

### 1. Clone and Setup

```bash
git clone https://github.com/ClashMasters/GrowPoint.git
cd GrowPoint
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp backend/.env.example backend/.env
```

**Required Variables:**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLOUDINARY_NAME` - Cloudinary account name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `REACT_APP_API_BASE_URL` - Backend API URL

### 3. Start Services

```bash
docker-compose up -d
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

### 4. Seed Database

```bash
docker-compose exec backend npm run seed
```

This populates the database with:
- Sample assessments
- Skill catalog
- Career profiles
- Learning paths
- Sample courses

## Manual Deployment

### Backend Setup

```bash
cd backend
npm install
npm run start
```

Backend runs on port 5000 by default.

### Frontend Setup

```bash
cd frontend
npm install
npm run build
npm start
```

Frontend runs on port 3000 in development, serves static files in production.

### Database Setup

#### Option 1: Local MongoDB

```bash
mongod --dbpath ./data
```

#### Option 2: MongoDB Atlas (Cloud)

Create account at https://www.mongodb.com/cloud/atlas

Update `MONGODB_URI` in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/growpoint?retryWrites=true&w=majority
```

## Production Deployment

### Using Docker Compose

For production, update `docker-compose.yml`:

1. **Set environment to production:**
   ```yaml
   environment:
     - NODE_ENV=production
     - REACT_APP_API_BASE_URL=https://api.growpoint.com
   ```

2. **Use MongoDB Atlas instead of local MongoDB:**
   ```bash
   docker-compose down mongodb
   ```

3. **Deploy to cloud platform:**

#### Option 1: Deploy to Heroku

```bash
heroku login
heroku create growpoint-backend
heroku create growpoint-frontend

# Backend
cd backend
heroku config:set JWT_SECRET=your_secret_key
heroku config:set MONGODB_URI=mongodb+srv://...
git push heroku main

# Frontend  
cd ../frontend
heroku config:set REACT_APP_API_BASE_URL=https://growpoint-backend.herokuapp.com
git push heroku main
```

#### Option 2: Deploy to AWS

**Using EC2:**
1. Launch EC2 instance (Ubuntu 20.04 LTS)
2. Install Node.js and Docker
3. Clone repository
4. Configure .env variables
5. Run `docker-compose up -d`
6. Configure security groups for ports 3000, 5000, 27017

**Using Elastic Container Service (ECS):**
1. Create ECR repositories for frontend and backend
2. Push Docker images
3. Create task definitions
4. Deploy using CloudFormation or AWS Console

#### Option 3: Deploy to DigitalOcean

```bash
# SSH into droplet
ssh root@your_droplet_ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Clone repository
git clone https://github.com/ClashMasters/GrowPoint.git
cd GrowPoint

# Configure environment
cp backend/.env.example backend/.env
# Edit .env with production values

# Start services
docker-compose up -d
```

#### Option 4: Deploy to Railway

1. Connect GitHub repository
2. Create services for backend and frontend
3. Set environment variables in Railway dashboard
4. Deploy automatically on push

### Database Backup & Maintenance

#### MongoDB Atlas Backups

1. Enable automatic backups in Atlas dashboard
2. Retention: 35 days minimum
3. Test restoration quarterly

#### Local Backups

```bash
# Backup
mongodump --out ./backup/$(date +%Y%m%d)

# Restore
mongorestore ./backup/20240226
```

## Accessing the Live Application

### Development Deployment

**Local Access:**
- Web App: http://localhost:3000
- API Health: http://localhost:5000/api/health
- Database: mongodb://localhost:27017/growpoint

**Testing:**
```bash
# Check backend health
curl http://localhost:5000/api/health

# List assessments
curl http://localhost:5000/api/assessments

# List skills
curl http://localhost:5000/api/skills
```

### Production Deployment

**Example URLs (replace with your domain):**

- **Web App**: https://app.growpoint.com
- **API Endpoint**: https://api.growpoint.com
- **Admin Dashboard**: https://app.growpoint.com/admin (if implemented)

**DNS Configuration for Custom Domain:**

1. Point domain to server IP or load balancer
2. Configure SSL certificate (Let's Encrypt - free)
3. Update `REACT_APP_API_BASE_URL` environment variable

### HTTPS/SSL Setup

**Using Let's Encrypt with Certbot:**

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot certonly --standalone -d growpoint.com -d api.growpoint.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

**Using Docker with SSL:**

Mount certificates in docker-compose.yml:
```yaml
volumes:
  - /etc/letsencrypt:/etc/letsencrypt:ro
```

## Performance Optimization

### Frontend Optimization

1. **Build Optimization:**
   ```bash
   npm run build  # Creates optimized production build
   ```

2. **Environment Configuration:**
   - Set `NODE_ENV=production`
   - Disable source maps in production
   - Enable gzip compression

3. **Caching:**
   - Configure cache headers in reverse proxy
   - Use CDN for static assets

### Backend Optimization

1. **Database Indexing:**
   ```javascript
   // Ensure indexes are created
   db.users.createIndex({ email: 1 })
   db.userProgress.createIndex({ user_id: 1 })
   db.skills.createIndex({ name: 1 })
   ```

2. **Connection Pooling:**
   - MongoDB connection pool size: 50-100
   - Adjust based on concurrent users

3. **Rate Limiting:**
   - Implement rate limiting on API endpoints
   - Use Redis for distributed rate limiting

## Monitoring & Logging

### Application Logs

```bash
# View backend logs
docker-compose logs backend

# View frontend logs
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f backend
```

### Health Checks

```bash
# Backend health check
curl http://localhost:5000/api/health

# Expected response:
# { "status": "OK", "environment": "production" }
```

### Metrics Collection (Optional)

Integrate monitoring tools:
- **New Relic**: Real-time performance monitoring
- **Sentry**: Error tracking and debugging
- **Datadog**: Infrastructure monitoring
- **Grafana**: Visualization dashboard

## Troubleshooting

### Common Issues

**1. MongoDB Connection Failed**
- Check connection string in .env
- Ensure MongoDB is running
- Verify network/firewall settings
- Test with: `mongosh "mongodb://localhost:27017"`

**2. Backend API Not Responding**
- Check logs: `docker-compose logs backend`
- Verify port 5000 is not blocked
- Ensure environment variables are set
- Check Node.js version compatibility

**3. Frontend Not Loading**
- Clear browser cache (Ctrl+Shift+Delete)
- Check API base URL is correct
- Verify CORS is enabled
- Check browser console for errors

**4. Docker Container Exit**
```bash
docker-compose logs <service_name>  # See exit reason
docker-compose up -d <service_name> # Restart
```

### Debug Mode

Enable verbose logging:

**Backend:**
```bash
DEBUG=growpoint:* npm start
```

**Frontend:**
```bash
REACT_DEBUG=true npm start
```

## Scaling Considerations

### Horizontal Scaling

1. **Multiple Backend Instances:**
   - Load balancer (Nginx, HAProxy)
   - Multiple container replicas
   - Shared MongoDB instance

2. **Database Replication:**
   - MongoDB replica sets
   - Read replicas for scaling
   - Sharding for large datasets

### Load Balancing

```yaml
# docker-compose.yml example
services:
  backend-1:
    image: backend:latest
    ports:
      - "5001:5000"
  backend-2:
    image: backend:latest
    ports:
      - "5002:5000"
  
  nginx:
    image: nginx:latest
    ports:
      - "5000:5000"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
```

## Maintenance & Updates

### Updating Application

```bash
git pull origin main
docker-compose down
docker-compose build
docker-compose up -d
npm run seed  # Migrate data if needed
```

### Backup Strategy

- **Database**: Daily automated backups to cloud storage
- **Code**: Git commits with tags for releases
- **Configuration**: Store .env in secure vault (AWS Secrets Manager, HashiCorp Vault)

### Update Schedule

- Security patches: Immediate
- Bug fixes: Weekly
- Feature releases: Monthly
- Major versions: Quarterly (with testing)

## Support & Documentation

For detailed setup instructions, see:
- [GETTING_STARTED.md](./GETTING_STARTED.md) - Local development setup
- [SETUP.md](./SETUP.md) - Detailed configuration guide
- [README.md](./README.md) - Project overview
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - System architecture
- [API_REFERENCE.md](./API_REFERENCE.md) - API documentation

## Contact & Support

- **Issues**: GitHub Issues page
- **Email**: support@growpoint.com
- **Documentation**: https://docs.growpoint.com
- **Community**: GitHub Discussions
