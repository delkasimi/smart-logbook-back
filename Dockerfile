# Use Node v20.9.0 as the base image
FROM node:20.9.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Your application listens on port 3000
EXPOSE 3000

# Define the command to run your app (using "npm start" here)
CMD [ "npm", "start" ]
