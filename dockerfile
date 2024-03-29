#Use an official Node.js runtime as a parent image
FROM node:14-alpine

#Set the working directory in the container
WORKDIR /app

#Copy package.json and package-lock.json to the container
COPY package*.json ./

#Install app dependencies
RUN npm install

#Copy the rest of the application code to the container
COPY . .

#Expose the port on which your Node.js application will run
EXPOSE 3000

#Define the command to run your Node.js application
CMD [ "node", "app.js" ]