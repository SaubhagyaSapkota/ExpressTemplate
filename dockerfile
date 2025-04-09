# using node:18.20.3-alpine as base image
FROM node:18.20.3-alpine

WORKDIR /app

COPY package*.json ./

# install dependencies and pm2
RUN npm install
RUN npm install pm2 -g

COPY . .

# build the app
RUN npm run build

EXPOSE 8080

# start the app via pm2
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]