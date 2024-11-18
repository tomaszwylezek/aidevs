# Use an official base image (adjust based on your application)
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port (adjust if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 