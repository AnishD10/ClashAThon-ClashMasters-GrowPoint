# Use Node.js 20 LTS Alpine - lightweight and stable
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (Docker layer caching optimization)
# If package.json doesn't change, this layer is cached
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend source code
COPY . .

# Expose port 5000 (documentation, actual mapping in docker-compose.yml)
EXPOSE 5000

# Start development server with hot reload
CMD ["npm", "start"]
