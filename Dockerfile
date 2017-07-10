FROM node

ADD package.json /app/package.json

WORKDIR /app
RUN yarn

ADD . /app/

CMD PORT=80 node server.js
