FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

RUN yarn build

COPY . .

EXPOSE 3000

CMD ["yarn", "start:prod"]
