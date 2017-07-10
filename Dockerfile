FROM alpine

RUN apk --no-cache add nodejs nodejs-npm
RUN npm install -g yarn@rc

WORKDIR /app
ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

RUN adduser appuser -D
RUN chown -R appuser:appuser /app
USER appuser

RUN yarn

ADD . /app/
RUN yarn run build


CMD PORT=8000 node fastboot-server.js
