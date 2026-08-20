FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to serve the static build
RUN npm install -g serve

# Copy built artifacts from builder stage
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 80

# Start the application
CMD ["serve", "-s", "build", "-l", "80"]
