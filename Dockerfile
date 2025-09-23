FROM ghcr.io/puppeteer/puppeteer:24.22.0

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY index.js ./

COPY src ./src

COPY . .

EXPOSE 80

RUN npx puppeteer browsers install

CMD [ "node", "index.js" ]
