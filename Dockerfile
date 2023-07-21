FROM node:17-alpine3.12

WORKDIR /usr/local/apps/api

COPY package.json ./

RUN npm install && npm cache clean --force
ENV PATH=/usr/local/api/node_modules/.bin:$PATH

WORKDIR /usr/local/apps/api/dev
COPY tsconfig.json ./


COPY prisma ./prisma
COPY src ./src
COPY .env ./

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]
