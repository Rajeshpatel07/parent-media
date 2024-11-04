FROM node:lts-slim

RUN apt-get update -y && apt-get install openssl curl -y

WORKDIR /home/app

COPY package.json ./

COPY package.json yarn.lock ./

RUN yarn

COPY ./ ./

RUN yarn build

RUN curl -o wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh 

RUN chmod +x wait-for-it.sh

EXPOSE 5000

CMD ["./prisma.sh","node","./dist/index.js"]

