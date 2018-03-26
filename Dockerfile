FROM mikehearn/node-with-chrome-headless:6

ARG DEBIAN_FRONTEND=noninteractive

# Install app dependencies
WORKDIR /app
ADD package.json /app/package.json
ADD bower.json /app/bower.json
ADD yarn.lock /app/yarn.lock

# Run app as non-root
RUN adduser appuser --disabled-password --gecos "" --uid 1000
RUN chown -R appuser:appuser /app
USER appuser

# Add files & build app
RUN yarn && bower install --allow-root
ADD . /app/
RUN yarn run build:production

# Serve app
CMD PORT=8000 node fastboot-server.js
