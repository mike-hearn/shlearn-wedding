FROM mikehearn/node-with-chrome-headless:6

ARG DEBIAN_FRONTEND=noninteractive

# Install app dependencies
WORKDIR /app
ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

# Run app as non-root
RUN useradd -m appuser
RUN chown -R appuser:appuser /app
USER appuser

# Add files & build app
RUN yarn
ADD . /app/
RUN yarn run build

# Serve app
CMD PORT=8000 node fastboot-server.js
