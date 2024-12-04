FROM ghcr.io/puppeteer/puppeteer:23.9.0

# Set the working directory
WORKDIR /usr/src/app

# Install necessary browser dependencies
RUN apt-get update && apt-get install -y apt-transport-https wget gnupg
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -y google-chrome-stable

# Install any dependencies you need (if applicable)
COPY package*.json ./
RUN npm ci

# Copy your application files
COPY . .

# Start the application
CMD ["node", "server.js"]
# Expose the port the app runs on
EXPOSE 3000