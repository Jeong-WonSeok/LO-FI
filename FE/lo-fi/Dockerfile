FROM node:16.16.0 as build
WORKDIR /var/jenkins_home/workspace/deploytest1/FE/lo-fi
COPY package*.json ./
RUN ["npm", "install"]
COPY . .
RUN ["npm", "run", "build"]

FROM nginx:alpine 

RUN rm /etc/nginx/conf.d/default.conf

RUN mkdir /app
WORKDIR /app
RUN mkdir ./build
COPY --from=build /var/jenkins_home/workspace/deploytest1/FE/lo-fi/build ./build
#COPY ./nginx.conf /etc/nginx/conf.d
COPY --from=build /var/jenkins_home/workspace/deploytest1/FE/lo-fi/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g","daemon off;"]
#실험1