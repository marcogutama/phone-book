FROM node:latest as buildStage
RUN echo "client docker file run"
WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . ./

ARG API_SERVER
ENV VITE_API_URL=http://${API_SERVER}:5000

RUN ["npm", "run", "build"]

FROM nginx:latest
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=buildStage /app/client/dist .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]