FROM node:18

WORKDIR /app

COPY package.json /app

RUN yarn set version berry

RUN yarn 

COPY . .

EXPOSE 4173

CMD ["yarn", "preview", "--port", "4173"]