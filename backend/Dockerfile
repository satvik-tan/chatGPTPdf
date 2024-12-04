FROM ghcr.io/puppeteer/puppeteer:23.9.0

# Set environment variables to skip Chromium download and use a pre-installed Chrome
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Install necessary dependencies for Chrome to work properly in the container
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Download and install the latest stable version of Google Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb \
    && apt-get -f install -y \
    && rm google-chrome-stable_current_amd64.deb

WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the app
COPY . .

# Run your server
CMD ["node", "server.js"]
