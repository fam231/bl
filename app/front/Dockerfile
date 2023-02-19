FROM node:14-alpine as node
WORKDIR /opt/app/
ADD *.json ./
RUN npm install --only=prod
ADD . .
RUN npm run build


FROM nginx
COPY --from=node /opt/app/build /usr/share/nginx/html
#COPY --from=node /opt/app/build /usr/local/apache2/htdocs
#COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf
#COPY ./apps/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80/tcp
