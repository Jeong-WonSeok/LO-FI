FROM node:16.16.0 as build-stage
WORKDIR /var/jenkins_home/workspace/deploytest1/FE/lo-fi
COPY package*.json ./
RUN ["npm", "install"]
COPY . .
RUN ["npm", "run", "build"]
FROM nginx:alpine 

RUN rm /etc/nginx/conf.d/defaul.conf

RUN mkdir /app
WORKDIR /app
COPY --from=build-stage /var/jenkins_home/workspace/deploytest1/FE/lo-fi/build ./build
COPY ./nginx.conf /etc/nginx/conf.d
#COPY --from=build-stage /var/jenkins_home/workspace/deploytest1/FE/lo-fi/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]
