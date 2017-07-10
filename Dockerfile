FROM node

RUN useradd -ms /bin/bash appuser
RUN mkdir /app && chown -R appuser:appuser /app

USER appuser

ADD package.json /app/package.json
WORKDIR /app
RUN yarn

ADD . /app/

CMD PORT=8000 node server.js
