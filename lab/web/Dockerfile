FROM node:8-alpine as build
LABEL mantainer="Paulo Gomes da Cruz Junior <paulushc@gmail.com>"

#Set the workdir folder
WORKDIR /app
#Copy the required content of the api folder
COPY . /app
#Install dependencies
RUN npm i
#Build the project
RUN npm run build

FROM node:8-alpine
LABEL mantainer="Paulo Gomes da Cruz Junior <paulushc@gmail.com>"
#Set the workdir folder
WORKDIR /app
#Copy from previous build
COPY --from=build /app/build /app
#We install globally serve to "serve" our files
RUN npm install -g serve
#Expose the port 5000
EXPOSE 5000
#RUN THE APP

ARG prod_url
ENV PRODUCTION_URL=$prod_url
CMD REACT_APP_PUBLIC_URL=$PRODUCTION_URL serve -s .
