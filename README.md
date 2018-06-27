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
	- [From local to cloud](#from-local-to-cloud)
		- [Generating Dockerfile](#generating-dockerfile)
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

## From local to cloud

### Generating Dockerfile

### Grouping with compose

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