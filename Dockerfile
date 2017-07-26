FROM debian:stable-slim

ARG DEBIAN_FRONTEND=noninteractive

# Install headless Chrome
RUN apt-get update -qqy \
  && apt-get -qqy install \
       dumb-init gnupg curl wget ca-certificates apt-transport-https \
       ttf-wqy-zenhei \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update -qqy \
  && apt-get -qqy install google-chrome-unstable \
  && rm /etc/apt/sources.list.d/google-chrome.list \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

# Node, NPM, Yarn
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g yarn@rc

# Install app dependencies
WORKDIR /app
ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

# Run app as non-root
RUN useradd -m appuser
RUN chown -R appuser:appuser /app
USER appuser

RUN yarn

ADD . /app/
RUN yarn run build


CMD PORT=8000 node fastboot-server.js
