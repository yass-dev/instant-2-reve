FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN apk add curl vim

EXPOSE 8080