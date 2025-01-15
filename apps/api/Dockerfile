FROM --platform=linux/amd64 node:16.19.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_OPTIONS=--max_old_space_size=2048

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
