# Dockerizing a Full-Stack Application with React, Node.js, and MySQL

## Introduction
Docker has become a go-to tool for creating portable and scalable applications. In this blog post, we explore how to dockerize a full-stack application consisting of a React frontend, a Node.js backend, and a MySQL database. By the end, you'll understand how to use Docker Compose to orchestrate a multi-container application.

## Project Structure
The full-stack project comprises three main components:

- **Frontend**: A React application that displays phone book contacts and interacts with the backend.
- **Backend**: A Node.js Express API that communicates with the MySQL database.
- **Database**: A MySQL database that stores phone book contacts and provides data to the backend.

The following diagram provides an overview of the project's structure:
![project-structure](https://github.com/Tareq-Islam/dockerized-app/assets/19193021/93c546bc-728c-468a-bc8f-c5d1b9126db2)

## Environment Variables
Environment variables are used to configure the services. Create a `.env` file to store these values:
```bash
API_SERVER="app1"  # Container name for the backend server

# MySQL
MySql_Db_User="root"
MYSQL_ROOT_PASSWORD="Test@123"  # Change to your MySQL root password
MySql_Db="phoneDB"
Mysql_host="mysqldb"
```

# Dockerizing the MySQL Database

The MySQL service is configured using the following Dockerfile:

```dockerfile
# Use the MySQL 8.0 image
FROM mysql:8.0

# Copy initialization script to initialize the database
COPY ./init_db.sql /tmp

# Start MySQL and run the init script
CMD ["mysqld", "--init-file=/tmp/init_db.sql"]
```

This Dockerfile uses the official MySQL image. It copies an SQL initialization script (init_db.sql) to the container and configures MySQL to execute it on startup. The init_db.sql script can contain SQL commands to create databases, tables, and insert initial data.

# Dockerizing the Backend Server

The Dockerfile for the Node.js backend is designed to copy all files, install dependencies, and start the server:

```dockerfile
# Use the latest Node.js image
FROM node:latest

# Set the working directory to /app/server
WORKDIR /app/server

# Copy all project files into the working directory
COPY . .

# Install project dependencies
RUN npm install

# Expose the port where the backend listens
EXPOSE 5000

# Start the Node.js server
CMD ["node", "server.js"]
```
This Dockerfile uses the latest Node.js image and sets up the backend server. It exposes port 5000 for the backend and runs the server script (server.js) after installation of dependencies.

# Dockerizing the Frontend

The Dockerfile for the React frontend uses a multi-stage build to create the React app and then serves it using Nginx:

```dockerfile
# Stage 1: Build the React application
FROM node:latest as buildStage
WORKDIR /app/client

# Install dependencies and build the app
COPY package*.json ./
RUN npm install
COPY . ./
ARG API_SERVER  # Argument for the API server URL
ENV API_SERVER=${API_SERVER}  # Set environment variable
RUN ["npm", "run", "build"]

# Stage 2: Serve with Nginx
FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*  # Clean existing files in Nginx
COPY --from=buildStage /app/client/dist .  # Copy the build output

# Start Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```
This multi-stage Dockerfile uses Node.js to build the React application and Nginx to serve it. The build stage installs dependencies and compiles the React app, while the Nginx stage removes any default files and replaces them with the built React files.

# Docker Compose Configuration

The Docker Compose file orchestrates the services, sets environment variables, and defines dependencies between containers:

```yaml
version: '3'

services:
  client:
    container_name: 'client'
    ports:
      - '80:80'  # Expose port 80 for frontend
    build:    
      context: ./client  # Frontend directory
      dockerfile: DockerFile  # Dockerfile for frontend
      args:
        API_SERVER: ${API_SERVER}  # API server argument
    networks:
      - mynetworks
    depends_on:
      - app1  # Client depends on backend

  app1:
    container_name: 'app1'
    ports:
      - '5000:5000'  # Expose port 5000 for backend
    build:     
      context: ./server  # Backend directory
      dockerfile: DockerFile  # Dockerfile for backend
    environment:
      - DB_HOST=${Mysql_host}
      - DB_USER=${MySql_Db_User}
      - DB_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - DB_Name=${MySql_Db}
    networks:
      - mynetworks
    depends_on:
      - mysqldb  # Backend depends on database

  mysqldb:
    container_name: 'mysqldb'
    build: 
      context: ./db  # MySQL directory
      dockerfile: DockerFile  # Dockerfile for MySQL
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}  # MySQL root password
    networks:
      - mynetworks

networks:
  mynetworks:
    driver: bridge  # Network configuration
```

This Docker Compose file defines three services: client (React frontend), app1 (Node.js backend), and mysqldb (MySQL database). It uses a custom network (mynetworks) to allow communication between the services. Dependencies are defined to ensure proper startup order, and environment variables are set using the .env file.

# Conclusion

With this setup, you've created a fully dockerized full-stack application with React, Node.js, and MySQL. Using Docker Compose, you've orchestrated multiple services and established connectivity between them.

You can expand this project by adding more backend endpoints, enhancing the frontend, or deploying the entire stack to a cloud platform. Docker's flexibility makes it ideal for creating scalable applications in development and production environments.








