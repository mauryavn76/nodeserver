From node:latest

# create app dirtectory

WORKDIR /program files/docker toolbox/nodeserver

#install dependencies

COPY package*.json ./

RUN npm install

#Bundle app Source

COPY . .

EXPOSE 8080

CMD ["node","server.js"]