FROM ghcr.io/puppeteer/puppeteer:23.9.0

# Install dependencies for Google Chrome
RUN apt-get update && apt-get install -y \
  wget \
  curl \
  gnupg2 \
  unzip \
  && curl -sSL https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o google-chrome-stable_current_amd64.deb \
  && dpkg -i google-chrome-stable_current_amd64.deb \
  && apt-get -f install -y \
  && rm google-chrome-stable_current_amd64.deb

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . . 

CMD ["node", "server.js"]
