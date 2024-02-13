# Use Node.js version 20 as a base image
FROM node:21.6.1

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 8544

# Define the command to run your application
CMD ["npm", "run", "dev"]
