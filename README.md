# Daitan Group DevOps Tools Bootcamp

This is the project used during Daitan Group DevOps Tool Bootcamp on DevWeek. With this project, we will dive into some of the tools and processes normally adopted by a DevOps team.

Along with this project, you will find links to the presentations used during the Bootcamp to explain some of the concepts presented here.

Additionally, this repository will be divided into some tags, marking some milestones for you to follow along.

The Bootcamp will be composed of 3 major parts, we will take a simple application to the cloud using docker and them deploying it on kubernetes. On the second part, we will instrument the application to get insights and see if we're going in the right direction. The last part we will automate our deploy cycle, moving from manual steps to automated steps, first deploying the application to Heroku, and them automating all the stack and deploying it on a kubernetes cluster.

## Table of Contents

- [Daitan Group DevOps Tools Bootcamp](#daitan-group-devops-tools-bootcamp)
	- [Table of Contents](#table-of-contents)
	- [Basic Project](#basic-project)
		- [Tools](#tools)
		- [How to use it](#how-to-use-it)
			- [Running API Project](#running-api-project)
			- [Running WEB Project](#running-web-project)
	- [From local to cloud](#from-local-to-cloud)
		- [Generating Dockerfile](#generating-dockerfile)
			- [Docker it: API](#docker-it-api)
			- [Docker it: WEB](#docker-it-web)
			- [Glue it up](#glue-it-up)
		- [Grouping with compose](#grouping-with-compose)
		- [Pushing to Docker Registry](#pushing-to-docker-registry)
		- [Kubernetes Interactive Deploy](#kubernetes-interactive-deploy)
		- [Kubernetes deploy through file descriptor](#kubernetes-deploy-through-file-descriptor)
		- [Kubernetes Exposing to the world](#kubernetes-exposing-to-the-world)
	- [Instrumenting](#instrumenting)
		- [Application Performance Monitoring](#application-performance-monitoring)
		- [Prometheus](#prometheus)
		- [Instrumenting the Application](#instrumenting-the-application)
		- [Scrapping the Application with Prometheus](#scrapping-the-application-with-prometheus)
		- [Consolidating telemetry data](#consolidating-telemetry-data)
		- [Dashboard on Grafana](#dashboard-on-grafana)
		- [Extracting Insights](#extracting-insights)
	- [Continuous Integration and Deployment](#continuous-integration-and-deployment)
		- [Splitting the steps](#splitting-the-steps)
		- [Building the automation file](#building-the-automation-file)
		- [Managing Secrets](#managing-secrets)
		- [Deploying to Heroku](#deploying-to-heroku)
		- [Deploying to Kubernetes](#deploying-to-kubernetes)
	- [Something Missing](#something-missing)
		- [Know issues](#know-issues)

## Basic Project

The idea of this repo and this Bootcamp is to learn and train with some of the tools normally used by a fully DevOps team. The tools itself represent just a part of the DevOps mentality, but a bunch of tools together will not make you or your team DevOps. My intention here is to help you guys understand the importance of this tools and how they help you achieve a faster development cycle for your apps.

Another point that's very important is that there is no `silver bullet` in here. There is a huge collection of tools available on the market, and the ones used in this Bootcamp are just a small collection of them. We choose just free/open source tools here because we don't want to impose any kind of cost during the course.

The code included here follow the [MIT License](LICENCE) so you are free to fork it, change it and publish it as long as you keep the license file on it. As this is a Bootcamp about kubernetes, instrumentation, and deployment, don't expect a complex piece of code in our applications, as the purpose of this apps is only to serve as examples on how to use this tools. Also, keep in mind that I'm not a NodeJS developer, I came from Java world, so Node is nor my main language, but as the number of node developers is growing fast, it's easy to showcase a node app instead of a java app, besides, it's easy to apply all of this methods into any language.

The app present here is composed of an API that will talk to MongoDB and serve data to our Front-End made with ReactJS. We will get those apps, and put them on Docker containers, run it locally, and then deploy it into a local kubernetes cluster. Everything you apply into your local cluster, it's exactly the same thing you will apply to any kubernetes cluster managed by any vendor, as the premise of kubernetes is to serve as a vendor agnostic environment.

### Tools

If you have any previous knowledge of any of the given tool, it will help a lot in understanding the Bootcamp, but if you don't have, don't worry. This Bootcamp is focused on presenting all the tools needed to start playing with automation and DevOps tools, so sit down and relax while we discover it together.

- [NodeJS](https://nodejs.org/en/)
- [ReactJS](https://reactjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Router](https://reacttraining.com/react-router/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mongoose](http://mongoosejs.com/)
- [ExpressJS](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Postman](https://www.getpostman.com/)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [Prometheus](https://prometheus.io/)
- [Grafana](https://grafana.com/)
- [GitHub](https://github.com/)
- [GitLab](https://about.gitlab.com/)
- [Heroku](https://www.heroku.com/)
- [Microsoft Azure](https://azure.microsoft.com)
- [Google Cloud Platform](https://cloud.google.com/)

### How to use it

You will find all the releases unde the tag of the project. Those releases are intended to be used as a starting point for this project. You will receive a clean environment, containing just the application itself (both API and WEB) and you will be able to run them with the commands present at `package.json` file of both projects. You can use a `.env` file to set some of the variables of the API app. Every new release will be an incremental step to our goal of taking this application to the cloud. When required, we will point to the tag on the code that you can get to start at that point, and we expect you to finish that topic at the start of the next tag.

A good starting point for you will be our [first tag](https://github.com/paulushcgcj/daitan-k8s-bootcamp/releases/tag/v1.0), so get it and start working on it.

#### Running API Project

To run the API, you will need a MongoDB instance running. I recommend that you use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/general) as you can use it with a free instance or any other cloud provided mongodb instance, or you can use a [dockerized mongodb](https://hub.docker.com/_/mongo/).

If you, like miself, prefeer to use a dockerized mongodb instance, so I will execute the following command:

```bash
docker run --name k8s-bootcamp-db -p 27017:27017 -d mongo
```

This will download if you already don't have mongodb image on your docker, and start it for you, exposing the default mongodb port to you. Now create a `.env` file in your [api folder](lab/api), with the following:

```configuration
PORT=8090 #the exposed port, use the one that suits you better
MONGO=<YOUR MONGODB CONNECTION STRING>
```

Replace the placeholder with your mongodb ip. If you use atlas, get the connection info from atlas, if you use Google Cloud or Azure, get the connection there as well, but if you, like miself prefer to go with a local dockerized mongo, point it to your `localhost` or `127.0.0.1`.

Just a quick note here, if you use [Docker Toolbox](https://docs.docker.com/toolbox/), due to OS limitations, you have to point to the VM ip address. Usually it will be `192.168.99.100`, but check your instance IP by running `docker-machine env`.

Once we have it done, let's check nodejs. Make sure you have nodejs and npm installed, and inside API folder run `npm i` to install all the dependencies, and them run `npm run dev` to execute the projecton dev environment.

Awesome now you are ready to use the API.

#### Running WEB Project

Now, we need to boot up our web interface, so we can do some of the steps that we did in API, go to [web folder](lab/web) and install the dependencies with `npm i`. Now we have everything in place, make sure our API is up and running and edit the `packages.json` file and change the `proxy` property to point to your API port, the same one you configured on the previous step. Once is done, run `yarn start` or `npm start` to execute the project and a new windows will pop-up with the project.

## From local to cloud

This is the first class, the one where we will be packing our application inside docker and them sending it to a kubernetes cluster.

### Generating Dockerfile

The first step is trying to understand what we have, and what is our current dependencies. Let's start with the API.

#### Docker it: API

Our API depends on the MongoDB, but, as mentioned during the start, we have mongoDB in docker, so we just need to start it using docker and point our image to it. If you don't remember how is done, is like this:

```bash
docker run --name k8s-bootcamp-db -p 27017:27017 -d mongo
```

Once we have our mongo instance up and running, we can now proceed with packing our API. We need to understand what we need from our API as well before we begin, and as a simple app, we only need to expose the API HTTP port right now. The way docker works is by keeping everything inside it's own world, not exposing anything, so we need to export the port to the outside world.

Let's create a file called `Dockerfile` in our API folder. This file will be then used by docker to generate our pack.

```dockerfile
FROM node:8
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
cmd npm start
```

Now, to build it, we have to run the docker command to build it. Don't worry we will pass through all parameters one by one. So inside your APi folder, where you created your ´Dockerfile`, run:

```shell
docker build --build-arg BUILD_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"` --build-arg VCS_REF=`git rev-parse --short HEAD` --build-arg IMAGE_TAG_REF=v1 -t k8s-bootcamp/api .
```

It can take some time, specially if you don't already have this image in your local docker. After it finishes, check the size of the image, and you will see how big it is, full of non used stuff. While it build, let's focus on what each parameter means:

- `BUILD_DATE` -> Set the date of the build while we inspect the image.
- `VCS_REF` -> Set the commit ID of the code that generated the image, good to backtrack what we've done.
- `IMAGE_TAG_REF` -> It serve as a tag to mark the version of the image

```shell
$ docker images k8s-bootcamp/api
REPOSITORY          TAG                 IMAGE ID            CREATED              SIZE
k8s-bootcamp/api    latest              37e113effb09        About a minute ago   768MB
```

Hmm, 768 MB, that's waaaay too big for us to afford, specially in a so simple application like this one. We can certainly reduce the size of our image, and this will also reduce the time it takes for us to download it in our cluster or even in another computer. Lets change the `Dockerfile` again, to use a smaller version, based on Linux Alpine, by changing just the from line.

```dockerfile
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
cmd npm start
```

Again, let's build it with the same command. If you forgot what command is:

```shell
docker build --build-arg BUILD_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"` --build-arg VCS_REF=`git rev-parse --short HEAD` --build-arg IMAGE_TAG_REF=v1 -t k8s-bootcamp/api .
```

Now let's check the new size of our image.

```shell
$ docker images k8s-bootcamp/api
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
k8s-bootcamp/api    latest              647fb47486a3        12 minutes ago      163MB
```

Wow we squeeched to less than 200 MB, that's a lot. Remember, this will be the size of the image we will be using, so smaller means better and faster load time. Now, we will try to glue our node with our API. First let's stop the existing mongo instance, so we can boot up another one with a small trick.

#### Docker it: WEB

Ok, once we have our API in a dockerized version, let's now focus on our web app. We can reuse a lot of things we used in our API to build the WEB layer, so let's redo some of those steps. create a file called `Dockerfile` in our WEB folder too.

```dockerfile
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
```

Again, let's build it with the same command but change the name of the image. Now, you're probably thinking why I'm exposing the same port on both applications, and it's simple. This is an internal only port, when we expose this por to the external world, we will be routing it to another port.

```shell
docker build --build-arg BUILD_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"` --build-arg VCS_REF=`git rev-parse --short HEAD` --build-arg IMAGE_TAG_REF=v1 -t k8s-bootcamp/web .
```

Now let's check the new size of our image.

```shell
$ docker images k8s-bootcamp/web
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
k8s-bootcamp/web    latest              290b78caefef        4 minutes ago       21MB
```

We managed to achieve a smaller image now, only 21mb, because we changed the way we made our image. We first build our image using the same image as before, but after we built the image, we then build a final one, using nginx, and we pass just the result of our build to nginx. Awesome, don't you think?

#### Glue it up

Ok, now we have everything we need to put it all together. Let's recap some things. We created a docker image for our APi, and one for our WEB layer, now it's time to make it work together. As docker isolate every image running on it's own world, we have to make them talk to each other, but not only talk, we have to point each image to each other by setting some environment variables.

Let's begin by creating a dedicated network for our containers to comunicate to each other. This way they can access each other, but they cannot be accesed by another container.

```shell
docker network create --subnet=199.18.0.0/16 k8s-bootcamp-nw
```

Cool, now we have our dedicated network, let's put some things to run on it. Let's begin by hooking up mongodb on it.

```shell
docker run --name k8s-bootcamp-db --net k8s-bootcamp-nw --ip 199.18.0.10 -d mongo
```

If you look it closer, you will see that we passed our network to mongo, by using the parameter `--net` and set an IP for it with `--ip`. Why? Because we can controll it better if we do it like this.
Let's hook now our API.

```shell
docker run --name k8s-bootcamp-api --net k8s-bootcamp-nw --ip 199.18.0.11 -e MONGO=199.18.0.10 -d k8s-bootcamp/api
```

We passed as an environment variable the mongodb ip. Cool. But for both images, why we didn't passed the port to proxy? Because don't need it, as we don't need to access those images. Remember if you don't need to access it, don't expose it, it's safer.

```shell
docker run --name k8s-bootcamp-web --net k8s-bootcamp-nw --ip 199.18.0.12 -p 5000:80 --add-host="apiserver:199.18.0.11" -d k8s-bootcamp/web
```
Now, we proxied a port here, and passed some other host to it usind the `--add-host` parameter. Why? Because we did a little trick in our final image to proxy all our api related calls to the correct host. We used nginx to do it by setting as a proxy address to point to a hostname, so we need to add a hostname pointing to some IP address.

It's a small workaround, but it works like a charm. Now access your docker address passing port 5000 and you will access the same application as before, but running from docker. But everytime you want to run your application, you will have to execute the same 4 commands, can we improve it?

### Grouping with compose

```yaml
version: '3'

services:
  database:
    image: mongo
  
  apiserver:
    image: k8s-bootcamp/api
    environment:
      - MONGO=database
    depends_on:
      - database
    ports:
      - "3000"
    links:
      - database

  webserver:
    image: k8s-bootcamp/web
    depends_on:
      - apiserver
    ports:
      - "5000:80"
    links:
			- apiserver
			
```

### Pushing to Docker Registry

### Kubernetes Interactive Deploy

### Kubernetes deploy through file descriptor

### Kubernetes Exposing to the world

## Instrumenting

### Application Performance Monitoring

### Prometheus

### Instrumenting the Application

### Scrapping the Application with Prometheus

### Consolidating telemetry data

### Dashboard on Grafana

### Extracting Insights

## Continuous Integration and Deployment

### Splitting the steps

### Building the automation file

### Managing Secrets

### Deploying to Heroku

### Deploying to Kubernetes

## Something Missing

If you have ideas for more “How To” or fixes for some errors found in here, [let us know](https://github.com/paulushcgcj/daitan-k8s-bootcamp/issues) or [contribute some!](https://github.com/paulushcgcj/daitan-k8s-bootcamp/edit/master/README.md)

### Know issues

- Sometimes, npm just don't work as expected. It can be due to some network issues, or path issues (is know that windows environments contains a limitation on the amount of characters used) so try to keep the project under a directory within a small path if you, like miself intent to use it on windows environment.
- MongoDB could be a real pain to install in certain environments, so I recommend that you use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/general) as you can use it with a free instance or any other cloud provided mongodb instance, or you can use a [dockerized mongodb](https://hub.docker.com/_/mongo/).