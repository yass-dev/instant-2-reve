FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN apk add curl vim

EXPOSE 3000
EXPOSE 3001