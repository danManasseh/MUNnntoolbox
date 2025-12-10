######  Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/mun-nn-toolbox-frontend

# Add the source code to app
COPY ./ /usr/local/mun-nn-toolbox-frontend/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run nn-build:prod


######  Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest as serve

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/mun-nn-toolbox-frontend/dist/frontend /usr/share/nginx/html

# Expose port 3080
EXPOSE 3080