FROM node:19

ARG port

WORKDIR /app

COPY . .


RUN npm ci

RUN npx prisma generate

RUN npm run build

RUN rm -rf ./src

EXPOSE ${port}

USER node

CMD ["node", "dist", "src", "index.js"]