FROM node:18

RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y busybox
WORKDIR /home
RUN mkdir frontend
RUN yarn create vite frontend --template react
WORKDIR frontend
COPY package.json package.json
COPY vite.config.js vite.config.js
RUN npm install axios react-router-dom jwt-decode
RUN npm install
RUN npm install @react-google-maps/api
RUN npm install emailjs-com
RUN npm install @emailjs/browser
RUN npm install react-scroll

EXPOSE 5173
