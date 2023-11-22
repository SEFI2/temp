FROM --platform=linux/amd64 node:14

WORKDIR /usr/src/app

#COPY package*.json ./

#RUN npm ci --only=production

COPY . .
RUN npm install

EXPOSE 80
CMD [ "node", "index.js" ]
