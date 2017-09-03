FROM mikehearn/node-with-chrome-headless:6

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y git

# Install app dependencies
WORKDIR /app
ADD package.json /app/package.json
ADD bower.json /app/bower.json
ADD yarn.lock /app/yarn.lock

# Run app as non-root
RUN useradd -m appuser
RUN chown -R appuser:appuser /app
USER appuser

# Add files & build app
RUN yarn && bower install --allow-root
ADD . /app/
RUN yarn run build

# Serve app
CMD PORT=8000 node fastboot-server.js
