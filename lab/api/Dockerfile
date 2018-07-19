FROM node:8-alpine
LABEL mantainer="Paulo Gomes da Cruz Junior <paulushc@gmail.com>"

#Set the workdir folder
WORKDIR /app
#Copy the required content of the api folder
COPY . /app
#Install dependencies
RUN npm i
#Build the project
RUN npm run build
#Expose the port 3000
EXPOSE 3000
#RUN THE APP
CMD npm start