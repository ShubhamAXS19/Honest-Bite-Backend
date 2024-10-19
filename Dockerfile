FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy built application
COPY dist/ ./dist/
COPY .env ./

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/app.js"]