# Fetching the latest node image on alpine linux
FROM node:18.14.2-alpine

# Setting up the work directory
WORKDIR /api

# Installing dependencies
COPY ./package.json /api
RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD npm start
