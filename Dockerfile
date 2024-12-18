# Stage 1: Build Stage
FROM node:20.18.0-alpine3.20 AS builder

# Install build dependencies
RUN apk update && apk add --no-cache libc6-compat git

WORKDIR /app

# Copy only package files to cache dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Clean up unnecessary files
RUN rm -rf node_modules && yarn install --production --frozen-lockfile

# Stage 2: Production Image
FROM node:20.18.0-alpine3.20

WORKDIR /app

# Copy only the built application and production dependencies from the builder stage
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/assets /app/assets
COPY --from=builder /app/public /app/public

ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=3072

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
