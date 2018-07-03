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
		- [Kubernetes in our app](#kubernetes-in-our-app)
		- [Porting it to vendored providers](#porting-it-to-vendored-providers)
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

No serrets here as well. You will see that we split the information with 3 dashes, and this way we can use a single file to describe our complete deployment. Very neat.

### Porting it to vendored providers

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