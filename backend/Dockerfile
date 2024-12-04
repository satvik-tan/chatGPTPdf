FROM ghcr.io/puppeteer/puppeteer:23.9.0

# Set the working directory
WORKDIR /usr/src/app

# Install necessary dependencies for running Chrome
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libnss3 \
    libx11-xcb1 \
    libgbm1 \
    libvulkan1 \
    libasound2 \
    libcurl4 \
    libdrm2 \
    xdg-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Add Google Chrome's repository
RUN curl -fsSL https://dl.google.com/linux/linux_signing_key.pub | tee /etc/apt/trusted.gpg.d/google.asc
RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google-chrome.list

# Install Google Chrome
RUN apt-get update && apt-get install -y google-chrome-stable --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Set the environment variable for Puppeteer to use the installed Chrome
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Install any node dependencies (npm ci will only install exact versions specified in package-lock.json)
COPY package*.json ./
RUN npm ci

# Copy the rest of your application files
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
