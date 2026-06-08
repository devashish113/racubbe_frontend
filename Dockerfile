# Stage 1: Dependency management
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# Use --legacy-peer-deps to handle peer dependency resolution conflicts
RUN npm ci --legacy-peer-deps

# Stage 2: Production builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build the production server
RUN npm run build

# Stage 3: Production runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Create a non-root group and user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copy only the compiled output and public assets needed to run the app
COPY --from=builder /app/.output ./.output

USER nodejs
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
