FROM node:14-alpine as node
WORKDIR /opt/app/
ADD *.json ./
RUN npm install --only=prod
ADD . .
RUN npm run build


FROM httpd:2.4
COPY --from=node /opt/app/build /usr/local/apache2/htdocs
#COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf
#COPY ./apps/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 81/tcp
