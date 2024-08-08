# Base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Start a new stage for a smaller production image
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the built app from the previous stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy next.config.mjs
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start", "--", "-p", "3000"]