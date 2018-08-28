# DevOps Tools Bootcamp

This is the project used during DevOps Tool Bootcamp on DevWeek. With this project, we will dive into some of the tools and processes normally adopted by a DevOps team.

Along with this project, you will find links to the presentations used during the Bootcamp to explain some of the concepts presented here.

Additionally, this repository will be divided into some tags, marking some milestones for you to follow along.

The Bootcamp will be composed of 3 major parts, we will take a simple application to the cloud using docker and them deploying it on kubernetes. On the second part, we will instrument the application to get insights and see if we're going in the right direction. The last part we will automate our deploy cycle, moving from manual steps to automated steps, first deploying the application to Heroku, and them automating all the stack and deploying it on a kubernetes cluster.

## Table of Contents

- [DevOps Tools Bootcamp](#devops-tools-bootcamp)
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
		- [Kubernetes in our app](#kubernetes-in-our-app)
		- [Porting it to vendored providers](#porting-it-to-vendored-providers)
	- [Instrumenting](#instrumenting)
		- [Application Performance Management](#application-performance-management)
		- [Is APM expensive? It doesn’t have to be](#is-apm-expensive-it-doesn%E2%80%99t-have-to-be)
		- [Prometheus](#prometheus)
			- [What is Prometheus](#what-is-prometheus)
			- [When does it fit](#when-does-it-fit)
			- [When does it not fit](#when-does-it-not-fit)
		- [Instrumenting the Application](#instrumenting-the-application)
			- [Metric types](#metric-types)
				- [Counter](#counter)
				- [Gauge](#gauge)
				- [Histogram](#histogram)
				- [Summary](#summary)
			- [Getting our hands dirty](#getting-our-hands-dirty)
		- [Scrapping the Application with Prometheus](#scrapping-the-application-with-prometheus)
		- [Consolidating telemetry data](#consolidating-telemetry-data)
		- [Dashboard on Grafana](#dashboard-on-grafana)
		- [Extracting Insights](#extracting-insights)
	- [Continuous Integration and Deployment](#continuous-integration-and-deployment)
		- [Integration of what](#integration-of-what)
		- [Deploy or Delivery](#deploy-or-delivery)
		- [Splitting the steps](#splitting-the-steps)
		- [Managing Secrets](#managing-secrets)
		- [Deploying](#deploying)
			- [Deploying to Firebase](#deploying-to-firebase)
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

A good starting point for you will be our [first tag](https://github.com/paulushcgcj/devops-k8s-bootcamp/releases/tag/v1.0), so get it and start working on it.

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

Yes we can improve it, and the first step to improve it, is by grouping all together with compose. Docker compose can help us grouping a lot of boring repetitive commands in a single file, so we can boot-up and shutdown faster and easily. Create a file called `docker-compose.yml` and we will build what we need inside it. We will begin by setting the version, and them describing all the services, one by one, in a very straightforward way. We can and we will set an order because we first need mongodb up and running before we start the API, and we need the API up to be able to run our web app. Even with this kind of restriction it's possible to use docker, and in a real scenario, we will probably have much more restrictions as this.

Also, remember that, when we executed all the images manually, we managed to keep it safe, by not exposing unecessarie ports to an external world, and using compose will be the same, but easier to build. Take a look at our compose file:

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

Its easy to understand what this file describes, as compose uses a clean file format to achieve this. We are moving to our goal to put all of this in the cloud. Now you can use it with `docker-compose up -d`to start and `docker-compose down` to stop it. Cleaner and easier than the last time.

### Pushing to Docker Registry

If you are wondering, where does all of this docker images come from, they came from docker registry. Docker registry is a central hub where you share your docker images with the world, so they can use it the same way as you've been using all those images. This is a public repository, and it's the default for docker. You can have your private registry as well, so if you're wondering how can you keep your images safe from the eyes of unnintended audience, you can keep a private registry inside your company, or by using a private vendor, like AWS, Google Cloud or Microsoft Azure.

Let's create an account at [docker hub](https://hub.docker.com/) so we can upload our images there, and then let's log into it:

```shell
$ docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: paulushc
Password:
Login Succeeded
```

Now we need to do something before we can upload our images. You need to create am image using your username in order to upload it to docker hub. But why you didn't tell us earlier so we already built it using our usernames. Well, first you need to understand how we build an image so we can share it with the world. Let's begin by retagging our images to be use our usernames.

We don't need to rebuild it from scratch. First, because docker know that every layer is already done, so it will skip some of the build parts, and second, because we just need to tag it. Let's do it then.

```shell
docker tag k8s-bootcamp/api paulushc/k8s-bootcamp-api:v1
docker tag k8s-bootcamp/web paulushc/k8s-bootcamp-web:v1
```

Just remember to change my username to your username. Once is done, we have everything needed to send your images to docker hub. Now let's push it.

```shell
$ docker push paulushc/k8s-bootcamp-web:v1
The push refers to repository [docker.io/paulushc/k8s-bootcamp-web]
b606b9bfeb46: Pushed
1ef3410d83ef: Pushed
951c1d7bace7: Mounted from library/nginx
91295ee17337: Mounted from library/nginx
423678709065: Mounted from library/nginx
cd7100a72410: Mounted from library/nginx
v1: digest: sha256:6fafc1d301b93a919e83a904d80052d61d5c575965cc73ae8d4f793bdfc80464 size: 1570
```

Awesome, now let's push the other one, the process is the same so I will skip it from this doc. Now, let's change our compose file so we can use our remote images.

```yaml
version: '3'

services:
  database:
    image: mongo

  apiserver:
    image: paulushc/k8s-bootcamp-api
    environment:
      - MONGO=database
    depends_on:
      - database
    ports:
      - "3000"
    links:
      - database

  webserver:
    image: paulushc/k8s-bootcamp-web
    depends_on:
      - apiserver
    ports:
      - "5000:80"
    links:
      - apiserver
```

Great, now if we run `docker-compose up -d` again, it will use our remote images instead of our local ones. Now we can share this compose file with our friends, parents, significant other, teacher, dog and goldfish so they can use it the same way as you. This is one of the awesome things containers give us, this kind of flexibility. The user, don't need to have node installed, it don't need to have anything but a container app installed, and in our case, docker. Another awesome thing, is that you don't need to worry about environment differences between you and the user, as you're shipping the environment along with your app. Pretty cool.

### Kubernetes Interactive Deploy

Alright, now it's time to deploy it in cloud. But before we spend a penny, let's see our options. First we will be using kubernetes (as you already don't know it) to orchestrate our containers. You can start with a local cluster so you won't spend a penny while learning. First select a local cluster software to start with. I'm using [minikube](https://github.com/kubernetes/minikube/releases) as a local cluster and we also need [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) to manage our cluster.

Cool, now let's focus on deploying to our cluster. Once you follow the steps to start minikube, and after that, check if we managed to get the information from minikube with `kubectl cluster-info`. It will return some info about your cluster like:

```shell
$ kubectl cluster-info
Kubernetes master is running at https://192.168.99.101:8443

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

Everything you do in command prompt you can also do in the dashboard, but let's focus on the command prompt for now. Once we know that we're connected to a cluster, let's begin by checking our nodes:

```shell
$ kubectl get nodes
NAME       STATUS    ROLES     AGE       VERSION
minikube   Ready     <none>    7d        v1.9.4
```

Your version can be different so don't worry about it. Now let's deploy something to our cluster. We can do it in 2 ways, by running commands (called interactive way) or by a file descriptor, let's begin the same way we did with docker, first with some commands. To deploy to kubernetes, we will use a command very simmilar to docker `kubectl run`. The `run` command creates a new deployment. We need to provide the deployment name and app image location (include the full repository url for images hosted outside Docker hub). We want to run the app on a specific port so we add the --port parameter. Let's use a demo web app image. You don't need to worry about this image, it's just a random demo but it doesn't matter for now.

```shell
kubectl run k8s-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1 --port=8080
```

Yay, you've just deployed your application to kubernetes in a few seconds. Kubernetes will make sure your application is up and running and will also make sure that if it fails to load, restart it. This performed a few things for you:

- searched for a suitable node where an instance of the application could be run (we have only 1 available node)
- scheduled the application to run on that Node
- configured the cluster to reschedule the instance on a new Node when needed

To list your deployments use the `kubectl get deployments` command:

```shell
$ kubectl get deployments
NAME           DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
k8s-bootcamp   1         1         1            0           2m
```

It could take a while for your deployed image to be up and running, depending on the size of the image. That's why we focused on reducing the size of our image before, because this can impact in our deployment time. OK, now while you read this, your deployment should be finished, you can check again with the same command to see if it's avaliable. Nice, now let's see our pods.

Pods are the smalles unity in a kubernetes cluster. You will find more information at the [kubernetes website](https://kubernetes.io/docs/home/). Let's proceed, let's start our proxy interface. This interface is responsible to enable the communication between our isolated pods and the external world. First, in a new console windows open the gates between the isolated world and our corrupted world by running the `kubectl proxy`. This will expose a port for you, and you will be able to access some information inside kubernetes.

```shell
$ kubectl proxy
Starting to serve on 127.0.0.1:8001
```

Now, you can use the pod name to request the application through pod. You can do it like this:

```shell
$ kubectl get pods
NAME                            READY     STATUS    RESTARTS   AGE
k8s-bootcamp-6bc5b9d6bd-rq9fl   1/1       Running   0          19m
$ curl http://localhost:8001/api/v1/namespaces/default/pods/k8s-bootcamp-6bc5b9d6bd-rq9fl/proxy/
Hello Kubernetes bootcamp! | Running on: k8s-bootcamp-6bc5b9d6bd-rq9fl | v=1
```

Or like this:

```shell
$ export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
$ echo Name of the Pod: $POD_NAME
Name of the Pod: k8s-bootcamp-6bc5b9d6bd-rq9fl
$ curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/proxy/
Hello Kubernetes bootcamp! | Running on: k8s-bootcamp-6bc5b9d6bd-rq9fl | v=1
```

This way you will be accessing theimage running inside the pod. Cool, now moving on, we need to understand that pods are mortal. Pods will born, live and die, and that's how they're built for. But when a pod die, it will change it's IP address, so it became harder to access it. To overcome this, we need to create a service to expose a fixed address to access. So far, minikune don't support LoadBalancer option, so we will use another kind of exposition, the NodePort:

```shell
$ kubectl expose deployment/k8s-bootcamp --type="NodePort" --port 8080
service "k8s-bootcamp" exposed
```

Ok, now we can check if the service is up by running `kubectl get services` and you will see 2 entries:

```shell
$ kubectl get services
NAME           TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
k8s-bootcamp   NodePort    10.96.236.71   <none>        8080:30908/TCP   43s
kubernetes     ClusterIP   10.96.0.1      <none>        443/TCP          7d
```

We can access the details of our service by running the `describe` command:

```shell
$ kubectl describe services/k8s-bootcamp
Name:                     k8s-bootcamp
Namespace:                default
Labels:                   run=k8s-bootcamp
Annotations:              <none>
Selector:                 run=k8s-bootcamp
Type:                     NodePort
IP:                       10.96.236.71
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  30908/TCP
Endpoints:                172.17.0.8:8080
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

We can use another set of commands to save an environment variable to access our pod:

```shell
$ export NODE_PORT=$(kubectl get services/k8s-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')
$ echo NODE_PORT=$NODE_PORT
NODE_PORT=30908
$ curl $(minikube ip):$NODE_PORT
Hello Kubernetes bootcamp! | Running on: k8s-bootcamp-6bc5b9d6bd-rq9fl | v=1
```

Awesome, you can now access our instance directly, and that's great, we don't need anymore the proxy to access our container.

### Kubernetes deploy through file descriptor

Let's start from the begining, now using a file descriptor. We will work with the same image again to achieve the same result. You will create a yaml file with the deployment description. This is an example of how the file is composed:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: ademoweb
  labels:
    name: ademoweb
spec:
  type: NodePort
  ports:
  - name: http
    port: 8080
    targetPort: 8080
  selector:
    name: ademo-web
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name:  ademo-web-deploy
  labels:
    name: ademo-web
spec:
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  template:
    metadata:
      labels:
        name: ademo-web
    spec:
      imagePullSecrets:
        - name: acr-secret
      containers:
      - image: gcr.io/google-samples/kubernetes-bootcamp:v1
        name:  ademo-web-cntnr
        resources:
          requests:
            cpu: "20m"
            memory: "55M"
        ports:
        - containerPort:  8080
          name:  ademo-web
        volumeMounts:
        - mountPath: /data
          name: data
        imagePullPolicy: Always
      volumes:
        - name: data
          emptyDir: {}
      restartPolicy: Always
```

Cool? Now, to deploy it, we need to apply this deployment to the cluster, by using `kubectl apply -f filename.yaml`. I've called mine ademo, and as you can see, we have everything contained into this file, splitted by a bunch of dashes, we have first our service, exposing our container and then our deployment, stating which services we need to deploy. Once we apply it, we can check the deployment, pods and services and we will find everything there.

```shell
$ kubectl get deployments
NAME               DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
ademo-web-deploy   1         1         1            1           8s
$ kubectl get pods
NAME                              READY     STATUS    RESTARTS   AGE
ademo-web-deploy-6bb47d4f-rxp8x   1/1       Running   0          1m
$ kubectl get services
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
ademoweb     NodePort    10.110.66.238   <none>        8080:31491/TCP   2m
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP          7d
```

And if we execute the same scripts again, changing just the name:

```shell
$ export NODE_PORT=$(kubectl get services/ademoweb -o go-template='{{(index .spec.ports 0).nodePort}}')
$ echo NODE_PORT=$NODE_PORT
NODE_PORT=32348
$ curl $(minikube ip):$NODE_PORT
Hello Kubernetes bootcamp! | Running on: ademo-web-deploy-7964c7c757-5gkpc | v=1
```

We achieved the same thing, but using just a single file. This saved us a lot of time and repetitive code. And if we change something in our deployment file, we can execute the same apply again and the deployment will be updated.

### Kubernetes in our app

Now, let's start working in our deployment. We will now deploy our images. So far we've been working with this demo images but this doesn't represent our current state.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mongodb
  labels:
    name: mongodb
spec:
  type: ClusterIP
  ports:
  - name: tcp
    port: 27017
    targetPort: 27017
  selector:
    name: company-db
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name:  company-k8s-deploy-db
  labels:
    name: k8s-bootcamp-db
spec:
  replicas: 1
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  template:
    metadata:
      labels:
        name:  company-db
    spec:
      imagePullSecrets:
        - name: acr-secret
      containers:
      - image:  mongo
        name:  company-db-cntnr
        resources:
          requests:
            cpu: "20m"
            memory: "55M"
        ports:
        - containerPort:  27017
          name:  company-db
        volumeMounts:
        - mountPath: /data
          name: data
        imagePullPolicy: Always
      volumes:
        - name: data
          emptyDir: {}
      restartPolicy: Always
---
apiVersion: v1
kind: Service
metadata:
  name: apiserver
  labels:
    name: apiserver
spec:
  type: ClusterIP
  ports:
  - name: http
    port: 3000
    targetPort: 3000
  selector:
    name: company-api
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name:  company-k8s-deploy-api
  labels:
    name: k8s-bootcamp-api
spec:
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  template:
    metadata:
      labels:
        name: company-api
    spec:
      imagePullSecrets:
        - name: acr-secret
      containers:
      - image:  paulushc/k8s-bootcamp-api:v1
        name:  company-api-cntnr
        resources:
          requests:
            cpu: "20m"
            memory: "55M"
        env:
        - name: MONGO
          value: mongodb
        - name: KUBE_NODE_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        - name: KUBE_POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: KUBE_POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        ports:
        - containerPort:  3000
          name:  company-api
        volumeMounts:
        - mountPath: /data
          name: data
        imagePullPolicy: Always
      volumes:
        - name: data
          emptyDir: {}
      restartPolicy: Always
---
apiVersion: v1
kind: Service
metadata:
  name: web
  labels:
    name: web
spec:
  type: NodePort
  ports:
  - name: http
    port: 80
    targetPort: 80
  selector:
    name: company-web
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name:  company-k8s-deploy-web
  labels:
    name: k8s-bootcamp-web
spec:
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  template:
    metadata:
      labels:
        name: company-web
    spec:
      imagePullSecrets:
        - name: acr-secret
      containers:
      - image:  paulushc/k8s-bootcamp-web:v1
        name:  company-web-cntnr
        resources:
          requests:
            cpu: "20m"
            memory: "55M"
        env:
        - name: KUBE_NODE_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        - name: KUBE_POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: KUBE_POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        ports:
        - containerPort:  80
          name:  company-web
        volumeMounts:
        - mountPath: /data
          name: data
        imagePullPolicy: Always
      volumes:
        - name: data
          emptyDir: {}
      restartPolicy: Always

```

Wow that's waaaay too huge. Let's cut it into small pieces. Let's begin with database. First the service to expose mongodb to our other containers:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mongodb
  labels:
    name: mongodb
spec:
  type: ClusterIP
  ports:
  - name: tcp
    port: 27017
    targetPort: 27017
  selector:
    name: company-db
```

You will see that most of our services are equal. Here, we have our ports defined, and the type set as ClusterIP, so this service will be exposed to our other containers but not to the outside world. Check the selector, this is how our service will find which service it will expose.

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name:  company-k8s-deploy-db
  labels:
    name: k8s-bootcamp-db
spec:
  replicas: 1
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  template:
    metadata:
      labels:
        name:  company-db
    spec:
      imagePullSecrets:
        - name: acr-secret
      containers:
      - image:  mongo
        name:  company-db-cntnr
        resources:
          requests:
            cpu: "20m"
            memory: "55M"
        ports:
        - containerPort:  27017
          name:  company-db
        volumeMounts:
        - mountPath: /data
          name: data
        imagePullPolicy: Always
      volumes:
        - name: data
          emptyDir: {}
      restartPolicy: Always
```

A lot of boilerplate stuff, you will find it here what container it will attach to this deployment, the deployment name, and also what ports it need to expose to the service.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: apiserver
  labels:
    name: apiserver
spec:
  type: ClusterIP
  ports:
  - name: http
    port: 3000
    targetPort: 3000
  selector:
    name: company-api
```

Again, the service for our api is veri simmilar to the mongodb, we just change the port and the selector.

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name:  company-k8s-deploy-api
  labels:
    name: k8s-bootcamp-api
spec:
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  template:
    metadata:
      labels:
        name: company-api
    spec:
      imagePullSecrets:
        - name: acr-secret
      containers:
      - image:  paulushc/k8s-bootcamp-api:v1
        name:  company-api-cntnr
        resources:
          requests:
            cpu: "20m"
            memory: "55M"
        env:
        - name: MONGO
          value: mongodb
        - name: KUBE_NODE_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        - name: KUBE_POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: KUBE_POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        ports:
        - containerPort:  3000
          name:  company-api
        volumeMounts:
        - mountPath: /data
          name: data
        imagePullPolicy: Always
      volumes:
        - name: data
          emptyDir: {}
      restartPolicy: Always
```

No surprises in here, we just used an environment variable to set our mongodb address. Let's go on.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web
  labels:
    name: web
spec:
  type: NodePort
  ports:
  - name: http
    port: 80
    targetPort: 80
  selector:
    name: company-web
```

The only difference in here is the type, now we used NodePort, to expose our port to the outside world. We only use NodePort, because we can't use LoadBalancer in minikube.

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name:  company-k8s-deploy-web
  labels:
    name: k8s-bootcamp-web
spec:
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  template:
    metadata:
      labels:
        name: company-web
    spec:
      imagePullSecrets:
        - name: acr-secret
      containers:
      - image:  paulushc/k8s-bootcamp-web:v1
        name:  company-web-cntnr
        resources:
          requests:
            cpu: "20m"
            memory: "55M"
        env:
        - name: KUBE_NODE_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        - name: KUBE_POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: KUBE_POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        ports:
        - containerPort:  80
          name:  company-web
        volumeMounts:
        - mountPath: /data
          name: data
        imagePullPolicy: Always
      volumes:
        - name: data
          emptyDir: {}
      restartPolicy: Always
```

Nothing new here as well. You will see that we split the information with 3 dashes, and this way we can use a single file to describe our complete deployment. Very neat.

### Porting it to vendored providers

## Instrumenting

Right now, you're probably asking yourself, what is instrumentation. According to the internet, "instrumentation refers to an ability to monitor or measure the level of a product's performance, to diagnose errors and to write trace information.Programmers implement instrumentation in the form of code instructions that monitor specific components in a system (for example, instructions may output logging information to appear on screen). When an application contains instrumentation code, it can be managed using a management tool. Instrumentation is necessary to review the performance of the application. Instrumentation approaches can be of two types: Source instrumentation and binary instrumentation."

Indeed, instrumentation is when you add some pieces of code to track how your application is behaving. A fancy term is used by the industri, and it's called APM, or Application Performance Management. You need to be very carefull when you add instrumentation to your code, because it will introduce overhead to your application, so it's a matter of how much your instrumentation will impact the code execution, and sometimes, even if the impact is big, the kind of insight added by the instrumentation can certainly payback. Be wise when instrumenting your application, and don't try to reinvent the weel,  always use some kind of plugin, client or library to instrument your code.

### Application Performance Management

APM is all about understanding the "why" as fast as possible. If you want to measure the performance of a web application, it is pretty trivial to parse the access logs and get an idea of how long web requests take. This would give you an idea about overall performance and which pages are slow. Unfortunately, it doesn’t answer the key question of why.

The heart of APM solutions is understanding why transactions in your application are slow or failing. For example, a development or operations team can instantly tell from this visual that their database is causing some performance spikes. They can also leverage their APM to identify exactly which database query and web requests were affected.

APM solutions can help identify common application problems quickly:

- Track overall application usage to understand spikes in traffic
- Find slowness or connection problems with application dependencies including SQL, queues, caching, etc
- Identify slow SQL queries
- Find highest volume and slowest web pages or transactions

### Is APM expensive? It doesn’t have to be

Traditionally, application performance management tools have been an expensive luxury item that only large IT enterprises could afford. Many APM vendors still cater to the larger enterprises, still charging $2,000-$4,000 per year per server. Ouch!

Most APM solutions are very complex to configure and use. So much so that development teams don’t even use them. They end up being expensive traffic lights and dashboards. Some vendors have put a huge focus on making their products affordable and very easy to use so they can be available to development and operations teams of all sizes. That's why Prometheus is a good choice, it's open-source, easy to use and you can deploy inside your existing infrastructure. You can deploy it on bare metal or in a cloud provider. In fact, there is a lot of ready-made docs to run prometheus in a cloud like structure or already present.

### Prometheus

#### What is Prometheus

Prometheus is an open-source systems monitoring and alerting toolkit originally built at SoundCloud. Since its inception in 2012, many companies and organizations have adopted Prometheus, and the project has a very active developer and user community. It is now a standalone open source project and maintained independently of any company. To emphasize this, and to clarify the project's governance structure, Prometheus joined the Cloud Native Computing Foundation in 2016 as the second hosted project, after Kubernetes.

Prometheus's main features are:

- a multi-dimensional data model with time series data identified by metric name and key/value pairs
- a flexible query language to leverage this dimensionality
- no reliance on distributed storage; single server nodes are autonomous
- time series collection happens via a pull model over HTTP
- pushing time series is supported via an intermediary gateway
- targets are discovered via service discovery or static configuration
- multiple modes of graphing and dashboarding support

The Prometheus ecosystem consists of multiple components, many of which are optional:

- the main Prometheus server which scrapes and stores time series data
- client libraries for instrumenting application code
- a push gateway for supporting short-lived jobs
- special-purpose exporters for services like HAProxy, StatsD, Graphite, etc.
- an alertmanager to handle alerts
- various support tools

Most Prometheus components are written in Go, making them easy to build and deploy as static binaries.

This diagram illustrates the architecture of Prometheus and some of its ecosystem components:

![prometheus arch](../docs/prometheus-architecture.svg)

Prometheus scrapes metrics from instrumented jobs, either directly or via an intermediary push gateway for short-lived jobs. It stores all scraped samples locally and runs rules over this data to either aggregate and record new time series from existing data or generate alerts. Grafana or other API consumers can be used to visualize the collected data.

#### When does it fit

Prometheus works well for recording any purely numeric time series. It fits both machine-centric monitoring as well as monitoring of highly dynamic service-oriented architectures. In a world of microservices, its support for multi-dimensional data collection and querying is a particular strength.

Prometheus is designed for reliability, to be the system you go to during an outage to allow you to quickly diagnose problems. Each Prometheus server is standalone, not depending on network storage or other remote services. You can rely on it when other parts of your infrastructure are broken, and you do not need to setup extensive infrastructure to use it.

#### When does it not fit

Prometheus values reliability. You can always view what statistics are available about your system, even under failure conditions. If you need 100% accuracy, such as for per-request billing, Prometheus is not a good choice as the collected data will likely not be detailed and complete enough. In such a case you would be best off using some other system to collect and analyze the data for billing, and Prometheus for the rest of your monitoring.

### Instrumenting the Application

Ok Cool, let's get our hands dirty, we need to add some instrumentation code to our application. I will not focus on putting prometheus up and running, as there is a ton of tutorials out there explaining how to do it. Before we instrument it, let's check how much time it took to fulfill an operation before we instrument it. This way, we can check if our instrumentation added overhead to our operation.

It's easy and is a homemade solution, let's add to each method a combination of `console.time('xxxxx')` and `console.timeEnd('xxxxx')` of a timer. Just remember to keep the same name, we will use the methods name.

```javascript
public addNewCompany(req: Request, res: Response) {
  console.time('addCompany');
  let newContact = new Company(req.body);
  newContact.save((err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
  console.timeEnd('addCompany');
}
```

We teste it a bunch of times, and as you can see the first one always take a longer time to execute, due to mongoDB. Don't worry, but we will catch this later on prometheus. There is a mechanism to "ignore" this kind of higer time.

```shell
addCompany: 11.887ms
addCompany: 1.121ms
addCompany: 1.005ms
addCompany: 1.182ms
addCompany: 1.005ms
addCompany: 0.909ms
addCompany: 0.974ms
addCompany: 1.015ms
addCompany: 1.182ms
addCompany: 3.973ms
addCompany: 1.025ms
```

 We will add it to our CompanyController, because this is where the magic happens. You need to understand your application to check where you going to add your instrumentation, specially to avoid duplicates. Now we need to add a variable to controll how we gonna instrument. We will use a histogram to count, and a histogram uses a couple of buckets to count the values between, to prevent us from having an infinity variation of values. Let's have a look at our possible metrics.

#### Metric types

The Prometheus client libraries offer four core metric types. These are currently only differentiated in the client libraries (to enable APIs tailored to the usage of the specific types) and in the wire protocol. The Prometheus server does not yet make use of the type information and flattens all data into untyped time series. This may change in the future.

##### Counter

A counter is a cumulative metric that represents a single monotonically increasing counter whose value can only increase or be reset to zero on restart. For example, you can use a counter to represent the number of requests served, tasks completed, or errors. Do not use a counter to expose a value that can decrease. For example, do not use a counter for the number of currently running processes; instead use a gauge.

##### Gauge

A gauge is a metric that represents a single numerical value that can arbitrarily go up and down. Gauges are typically used for measured values like temperatures or current memory usage, but also "counts" that can go up and down, like the number of online users.

##### Histogram

A histogram samples observations (usually things like request durations or response sizes) and counts them in configurable buckets. It also provides a sum of all observed values. A histogram with a base metric name of <basename> exposes multiple time series during a scrape:

- cumulative counters for the observation buckets, exposed as <basename>_bucket{le="<upper inclusive bound>"}
- the total sum of all observed values, exposed as <basename>_sum
- the count of events that have been observed, exposed as <basename>_count (identical to <basename>_bucket{le="+Inf"} above)

##### Summary

Similar to a histogram, a summary samples observations (usually things like request durations and response sizes). While it also provides a total count of observations and a sum of all observed values, it calculates configurable quantiles over a sliding time window. A summary with a base metric name of <basename> exposes multiple time series during a scrape:

- streaming φ-quantiles (0 ≤ φ ≤ 1) of observed events, exposed as <basename>{quantile="<φ>"}
- the total sum of all observed values, exposed as <basename>_sum
- the count of events that have been observed, exposed as <basename>_count

#### Getting our hands dirty

Ok let's now implement our histogram, because as mentioned in the previous section, histogram samples observations, and we want to observe our response time for each endpoint. Let's begin by adding our dependencies to the project and to the `CompanyController.ts`. Add prometheus dependencies to our project with `npm i --save prom-client` and it we're good to go. Now import the prom-client.

```javascript
import * as Prometheus from 'prom-client'
```

After that, we can create a variable to hold our histogram values.

```javascript
const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['route'],
  buckets: [0.10,5,15,50,100,200,300,400,500,600,800,1000,1100,1200]
});
```

With this at hand, we just need to use it. We can use it in a bunch of ways, one way is by setting it on start and calling an end when finished:

```javascript
const end = httpRequestDurationMicroseconds
      .labels(req.route.path)
      .startTimer();
      //Block of code here
end();
```

But now take a loot at our manual profilling. It doubled the time of the first execution, but at general, we got higher results as well, but nothing too problematic if we managed to add some insights about our application behaviour.

```shell
addCompany: 22.373ms
addCompany: 3.001ms
addCompany: 1.553ms
addCompany: 1.199ms
addCompany: 2.253ms
addCompany: 1.180ms
addCompany: 1.227ms
addCompany: 1.194ms
addCompany: 1.063ms
addCompany: 2.101ms
addCompany: 1.702ms
addCompany: 1.218ms
```

Let's add this to our other endpoints as well.

Once we add it, let's move to Prometheus and set how prometheus will scrape the metrics from our application.

### Scrapping the Application with Prometheus

One of the things that really catches my attention is that prometheus scrape the metrics from our application, leaving ourselfs in need only to implement an endpoint to prometheus work with, so you don't need to send metrics to another place, which is awesome. Why? Follow me here.

Let's assume a scenario where you need to push yours metrics against a server, if the metric server goes down, for any reason, you will end up with an application generating a bunch of error messages on log, or even crashing due to this. With prometheus scrapping the metris, we don't need to worry about this, as prometheus is the one who is requesting the data, and for an application like ours, it will only add a request every XX seconds, so it's not a big deal.

Let's add to our `CompanyRoutes.ts`a new route pointing to `/metrics` because prometheus will look for this endpoint. You can change it on prometheus config, but, c'mon, there is no problem on exposing an endpoit with this name.... or does?

```javascript
import * as Prometheus from 'prom-client'
//Our code here
app.get('/metrics', (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType)
    res.end(Prometheus.register.metrics())
});
```

### Consolidating telemetry data

### Dashboard on Grafana

### Extracting Insights

## Continuous Integration and Deployment

According to Atlassian website, DevOps is a set of practices focused on automating processes between teams of devs and IT to create, test and release software in a faster and reliable way. The concept of DevOps is based on creating a collaboration culture between teams which historicaly operate in relative silos. The promised benefits include a bigger confidence, faster releases, the hability to solve critical issues faster and better workload management of unplanned jobs. It's an amazing explanation about DevOps, and now we`re gonna focus in one of the aspects of it, process automation.

Testing routines are prone to error, because someone will, eventually enter a value to move through the "happy path" or even skip parts of it, just to save time because they have a demand from the management. This is a well know scenario, and we try to avoid it by automating some of this steps using `Continuous Integration`, to automate all the tests in a pipeline. But we don't plan to automate just the tests, but all the manual steps required to validate, verify, test and generate releases. But let's focus first on understanding what is a CI pipeline.

### Integration of what

CI is there to help us doing some tasks that normally will be executed by someone who don't want to do it, so they will always execute it in the worst possible way. To avoid poor quality checks, we ask computers, who don't mind doing the same thing over and over, and we just automate it. But how? Some people think that creating a CI pipeline is like rocket science, where you need to do a huge effort to build it, but don't be confused with this fancy name.

To make it clear, building a pipeline is just a matter of analysing everything you have to do manually and you hate it, and put some set of `scripts` to do it for you. But scripts? Are you talking about complicated shell scripts that are prone to fail because I don't understand it? No, definitely no!!

Let's begin with a small exercice of what you need to do in order to generate a new release of your product. First.... you code, or at least we expect you to do so, and after you finish your fancy piece of code, you will probably run some tests to make sure it works as expected, be it unit tests, integrated tests or just some manual tests. At 2 AM, you don't want to test this code, because you spent the last 8 hours working in a masterpiece, and it gonna work anyway because you are a genius. So you bundle it, get the build result, and put it to run somewhere. You access the server, upload it, and overwrite the existing ones, and go to sleep.... at 4 AM. Nice....... no, not nice.

One day, you realise that you spend at least 10% of your time, testing, bundling and deploying the same thing over and over, and this took you precious amont of time that you could be spending playing with your kids, or fixing other issues or even playing Clash Royale, but you're there, repeating and repeating. That's the moment when you automate it. And how? Let's recap.

You need to test it right? Cool, make the computer test it for you everytime you submit a code to the repository. If it fails, you will get notified, and you have some free time to do other things. Next, you normally bundle it, so make the computer bundle it for you. It could also submit this new artifact to somewhere, be it a maven repo, a npm repo or anywhere else, but it will make it avaliable for you and your buddies to get that exact same version you already tested, without any change and run it, locally or on a server. Cool, now you saved more time to play Call of Duty. Easy. So if you take a look at what we did, we just got the very same steps you did by hand, and make a computer do it for you, this is automating, this is a continuous integration pipeline, and it will repeat it for every piece of code you submitted. Now you have a higher degree of confidence that a code that reaches production is tested and validated completely, that bundle was generated without interference, and you have different versions to move up or down, and you don't need to checkout a specific commit in order to generate an older version again. Now, that we saved part of our time, let's save another one, automating the deployment.

### Deploy or Delivery

One of the greatest questions of mankind, what's the difference between delivery and deploy, according to Carl Caum, PM of Puppet, `Continuous Delivery doesn't mean every change is deployed to production ASAP. It means every change is proven to be deployable at any time`. Got it? Let's make it clear.

Not all companies deploy every code change that enters the repo, they normally work in a cycle, where you wait for some time before you release it, but an agile team will work hard to fix all the issues as soon as possible, and as we already understood in the last topic, every code change will trigger a CI pipeline, and it will end up with a bundle ready to be deployed, but this doesn't mean you will deploy it on production after it's done.... or do?

If you do, congrats, you achieved a higher level of maturity, deploying to production like this means you company is aiming to a smaller time-to-market, but this doesn't mean they are the correct sollution. Some companies like to keep it controlled, rolling deploys in a controlled way, but still whant to leverage the cool things that automation brings, so they plan a cycle, and at the end of the cycle, they will have a deliverable piece of code, which is a result of the other deliverables, and once they have a GO, they will reach production. This also show a high degree of maturity of the company, they just like to play safe. Continuous deployment it's just the next step on the line, making everything automated, and it's also cool, but the minimal requirement you need to be a true automated DevOps team, is continuous delivery. Getting back to our example, after we played a lot of Candy Crush, we decided that logging into a server to download a binary, stop and restart everything is a pain and we wanna put all this in an automated task, so we jus't need to hit a button or something like this in order to deploy it. Pretty cool.

### Splitting the steps

Now that we know the meaning of CI and CD, let's build it ourselves. I've splitted this project and got only the web app insode our lab folder and put it into [another git project on GitLab](https://gitlab.com/paulushc/devops-k8s-bootcamp-web). Right now, you could be thinking why I didn't used GitHub + CircleCI, and the reason is just one, I can use gitlab with private repos for free, and it has a built in CI system, which is also free and private as well, so I can keep some of my projects aside from curious eyes, and keep working using everything I normally do, but you need to understand that those Ci systems are just ways to achieve this, they are not the only sollution. You could, if you want to, build your own, using webhooks and shell scripts, and that's fine. Don't fall into that trap that you could only be doing DevOps if you use `tool X` or `tool Y`, because DevOps is a set of things, not a set of tools. Ok, so let's split our process.

Let' begin with the top of our CI file, create a file in your project root folder called `.gitlab-ci.yml` and add some things to it. I will not enter in details, you can find the documentation on [GitLab website](https://docs.gitlab.com/ee/ci/yaml/). Let's begin by adding some information that will be used during most of our jobs.

```yaml
image: node:latest

services:
  - docker:dind

variables:
  DOCKER_DRIVER: overlay

cache:
  paths:
  - node_modules/
  - build/

stages:
  - test
  - build
  - artifact
  - deploy
```

We begin by writing some test cases to make sure our code is cool. Then, we write the test script into our package.json so we can run it using NPM easily like this, `"test": "react-scripts test --env=jsdom"` and we can use it in our CI configuration. As we built our project using `create-react-app` it already provided us some scripts, and we will use it as it is. You can apply the same things in your current application, just keeping in mind the steps you normally take in order to execute the full validation, test and release of the application.

Let's add to our file the test job.

```yaml
test:
  stage: test
  script:
   - npm install
   - npm test
```

You will see that there is nothing unexpected here, we run `npm install` to install our dependencies and execute our tests. Nothing too fancy, and it's the very same commands you would normally execute in your local machine right? Good, let's move to the next step... build it up.

```yaml
build_app:
  stage: build
  script:
    - npm run build
  only:
    - master
  artifacts:
    paths:
    - build/
    expire_in: 1 week
```

Again, everything here inside our script is know stuff, just a simple build. We ask gitlab to save the build folder as an artifact for us, so we can download it. We could also send it to somewhere else, but in our case, we won't do it. Now if you remember, we built the application as a docker image, let's do it here as well.

```yaml
build_image:
  stage: artifact
  image: docker:git
  before_script:
    - docker login -u $DOCKER_USERNAME -p "$DOCKER_TOKEN"
  script:
    - docker build -t "$DOCKER_USERNAME/$CI_PROJECT_NAME:${CI_PIPELINE_ID}" .
    - docker push "$DOCKER_USERNAME/$CI_PROJECT_NAME:${CI_PIPELINE_ID}"
  only:
    - master
```

Same know commands right? we run before we begin the login command to log into docker hub. If you have a private image registry, you could login into it, and build & push the image. We just use some variables to make this CI file easy to be reused in other projects. Even being unique to each project, it's better to be able to reuse some of the jobs in our other projects, because it's save us some time. I've used the pipeline id as a tag, but, the best approach here would be to use for example the git tag, if you use an approach where you tag every release for example. I will explain the deploy part later, so let's move to a more, sensible part, managing secrets.

### Managing Secrets

You don't want to expose your secrets like passwords, usernames and so on to the world, so you need to use secrets. Secrets are just a bunch of Key-Value things where you store your sensitive data away from the eyes of the world. On gitlab you can store your secrets on the project settings, inside Ci/CD variables. This is also good to make our CI jobs much more reusable, as we just have to change the secrets value in each of our project variables, or even in our groups if you share some common things between projects. Never keep sensitive data scattered along your project.

### Deploying

Ok, let's proceed with deployment. I will show 3 places to deploy, without any kind of integration. Some tools will come with a lot of integrations and that's great, because it save us a bunch of time, but let's work like we don't have any kind of integration at all, the same way we would do if we were doing it in our machines.

It's important to note that integrations save us a lot of time, but make debugging a little trickier, as it will hide a lot of behaviours from us and could make it impossible to reproduce if we just change vendor.

We will deploy our we app in Firebase, Heroku and Kubernetes cluster. On Firebase and Heroku, we will just use the most simple way of doing it, because.... remember, we're lazy and we have something else to do.

#### Deploying to Firebase

We wil deploy it to firebase, and it's pretty damn simple. Gitlab CI will pass on the cache with our build inside it, so we don't have to build it again. We then, use firebase tools to deploy it on firebase hosting.

```yaml
deploy_firebase:
  stage: deploy
  environment:
    name: Firebase
    url: https://devops-k8s-bootcamp.firebaseapp.com
  only:
    - master
  script:
    - npm install -g firebase-tools
    - firebase use --token $FIREBASE_TOKEN devops-k8s-bootcamp
    - firebase deploy -m "Pipeline $CI_PIPELINE_ID, build $CI_BUILD_ID" --non-interactive --token $FIREBASE_TOKEN
	when: manual
```

Not so complicated. All the steps above are the same you would normally do in your machine in order to deploy it to firebase hosting. The same way we used our secrets to build our docker image, we will use it here to pass along our firebase token and some data. Simple and easy. NEXT!!!!!!!

#### Deploying to Heroku

Heroku makes it much more simple as it only needs a git push in order to deploy it (I'm talking about the minimun effort to do so). We just have to add a remote repository and push it.

```yaml
heroku-deploy:
  stage: deploy
  script:
    - 'git remote add heroku https://$DOCKER_USERNAME:$HEROKU_TOKEN@git.heroku.com/devops-k8s-bootcamp-web.git'
    - 'git push -f heroku master'
  environment:
    name: Heroku
    url: https://devops-k8s-bootcamp-web.herokuapp.com/
  only:
    - master
  when: manual
```

#### Deploying to Kubernetes

```yaml
deploy_gkc:
  stage: deploy
  image: google/cloud-sdk:alpine
  environment:
    name: Kubernetes
  script:
    - echo $GKC_TOKEN > credential_key.json
    - gcloud auth activate-service-account --key-file=credential_key.json
    - gcloud config set project devops-k8s-bootcamp
    - gcloud components install kubectl --quiet
    - gcloud container clusters get-credentials devopsk8sbootcamp --zone us-central1-a
    - sed -i "s/paulushc\/k8s-bootcamp-web:v2/$DOCKER_USERNAME\/$CI_PROJECT_NAME:${CI_PIPELINE_ID}/g" cloud-company-deploy.yaml
    - kubectl apply -f cloud-company-deploy.yaml
  only:
    - master
	when: manual
```

```shell
kubectl get svc web -ao jsonpath={..ip}
```

## Something Missing

If you have ideas for more “How To” or fixes for some errors found in here, [let us know](https://github.com/paulushcgcj/devops-k8s-bootcamp/issues) or [contribute some!](https://github.com/paulushcgcj/devops-k8s-bootcamp/edit/master/README.md)

### Know issues

- Sometimes, npm just don't work as expected. It can be due to some network issues, or path issues (is know that windows environments contains a limitation on the amount of characters used) so try to keep the project under a directory within a small path if you, like miself intent to use it on windows environment.
- MongoDB could be a real pain to install in certain environments, so I recommend that you use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/general) as you can use it with a free instance or any other cloud provided mongodb instance, or you can use a [dockerized mongodb](https://hub.docker.com/_/mongo/).
- Minikube don't have support to LoadBalancer (yet) so we have 2 different kubernetes deployment files, changing just this. Also minikube seems to have some problems with DNS, and didn't work sometimes.
- We didn't have set any kind of DNS structure or something like this, due to the scope of this bootcamp. In a real production environment, you will have replicasets, dns and persistent disc.
