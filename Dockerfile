FROM node

WORKDIR /app

ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock
RUN yarn

ADD . /app/
RUN yarn run build

RUN useradd -ms /bin/bash appuser
RUN chown -R appuser:appuser /app
USER appuser

CMD PORT=8000 node fastboot-server.js
