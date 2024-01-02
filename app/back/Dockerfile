FROM node:14-alpine
WORKDIR /opt/app/
ADD *.json ./
RUN npm install
ADD . .
CMD ["node", "./index.js"]
#EXPOSE 3001/tcp
