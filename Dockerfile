# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Install sharp for improved image optimization
RUN npm install sharp

# Build the Next.js application
RUN npm run build

# Add debugging steps
RUN echo "Contents of /app directory:"
RUN ls -la /app
RUN echo "Contents of /app/.next directory:"
RUN ls -la /app/.next
RUN echo "Contents of /app/.next/standalone directory (if it exists):"
RUN ls -la /app/.next/standalone || echo "Standalone directory not found"

# Production stage
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Set node environment to production
ENV NODE_ENV=production

# Add a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from build stage
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copy the built app
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the correct permission for prerender cache
RUN mkdir -p .next
RUN chown nextjs:nodejs .next

# Switch to non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]