# Use the official Node.js image as the base image
FROM node:14

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application files to the working directory
COPY index.js .

# Expose the port on which the application will run
EXPOSE 80

# Command to start the application
CMD ["npm", "start"]