FROM node:20-alpine

WORKDIR /usr/src/app
USER node
COPY dist .
COPY package.json .

CMD node server.js

EXPOSE 3000