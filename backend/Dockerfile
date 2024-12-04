FROM node:18-slim

# Update apt-get and install dependencies
RUN apt-get update -y && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Download and install Google Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb \
    && apt-get install -f -y \
    && rm google-chrome-stable_current_amd64.deb

# Set up the working directory
WORKDIR /usr/src/app

# Copy package.json and install node dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of your application
COPY . .

# Default command to run when the container starts
CMD ["node", "server.js"]
