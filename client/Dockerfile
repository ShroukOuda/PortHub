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

# Install a simple static file server
RUN npm install -g serve

# Copy the built browser output
COPY --from=build /app/dist/client/browser ./dist

EXPOSE 4000

CMD ["serve", "-s", "dist", "-l", "4000"]
