# Use the official Node.js image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app
RUN npm install

# Copy the rest of the application files
COPY . /app

# Build the React app for production
RUN npm run build

# Expose port 3000 to serve the React app
EXPOSE 3000

# Serve the React app
CMD ["npm", "start"]
