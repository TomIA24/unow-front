# Stage 1: Build the React app

FROM node:20 AS build



# Set working directory

WORKDIR /app



# Copy package.json and package-lock.json into the container

COPY package*.json ./



# Install dependencies

RUN npm install --force



# Copy the rest of the application into the container

COPY . .



# Build the React app

RUN npm run build



# Stage 2: Serve the React app with nginx

FROM nginx:alpine



# Copy the Nginx configuration file

COPY nginx.conf /etc/nginx/conf.d/default.conf



# Copy the build output from the first stage to the Nginx public directory

COPY --from=build /app/build /usr/share/nginx/html



# Expose port 80 to the outside world

EXPOSE 80



# Start Nginx when the container starts

CMD ["nginx", "-g", "daemon off;"]







# Stage 2: Serve the React app using Apache

#FROM httpd:alpine



# Copy the build folder from Stage 1 into the Apache public directory

#COPY --from=build /app/build/ /usr/local/apache2/htdocs/



# Expose port 80

#EXPOSE 80
