From node:10

# create app dirtectory

WORKDIR /program files/docker toolbox/nodeserver

#install dependencies

COPY package*.json ./

RUN npm install

#Bundle app Source

COPY . .

EXPOSE 1010 

CMD ["node","server.js"]