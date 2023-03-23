# base image
FROM node:14.17.6-alpine

# set working directory
WORKDIR /app

# copy and install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# copy the rest of the application
COPY . .

# build the application
RUN npm run build

# expose port
EXPOSE 3000

# run the application
CMD ["npm", "start"]
