# Stage 1: Build the React app
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy all files, including .env.production
COPY . .

# Build the React app (will read from .env.production)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
