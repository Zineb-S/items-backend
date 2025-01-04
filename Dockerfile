# Use Node.js LTS as a base image
FROM node:lts

# Set working directory
WORKDIR /usr/src/app

# Install curl for healthchecks
RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

# Copy source files
COPY . .

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npx", "nodemon", "server.js"]
