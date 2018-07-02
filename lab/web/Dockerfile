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

FROM nginx:alpine
LABEL mantainer="Paulo Gomes da Cruz Junior <paulushc@gmail.com>"
#Copy from previous build
COPY --from=build /app/build /usr/share/nginx/html
COPY localhost.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]