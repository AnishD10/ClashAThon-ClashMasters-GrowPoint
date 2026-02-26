# Use Node.js 20 LTS Alpine
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install all dependencies (including devDependencies for React dev server)
RUN npm install

# Copy all frontend source code
COPY . .

# Expose port 3000 for React development server
EXPOSE 3000

# Start React development server with hot reload
CMD ["npm", "start"]
