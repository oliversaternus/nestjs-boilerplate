FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime", "process.yml"]