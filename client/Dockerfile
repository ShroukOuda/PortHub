# ---- Build Stage ----
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:22-alpine AS production

WORKDIR /app

# Copy the built SSR output
COPY --from=build /app/dist ./dist

# The Angular SSR server is self-contained
EXPOSE 4000

CMD ["node", "dist/client/server/server.mjs"]
