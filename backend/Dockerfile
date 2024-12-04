FROM ghcr.io/puppeteer/puppeteer:23.9.0

# Set the working directory
WORKDIR /usr/src/app

# Install any dependencies you need (if applicable)
COPY package*.json ./
RUN npm ci

# Copy your application files
COPY . .

# Start the application
CMD ["node", "server.js"]
# Expose the port the app runs on
EXPOSE 3000