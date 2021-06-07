FROM buildkite/puppeteer:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY index.js ./

COPY src ./src


COPY . .

EXPOSE 80

CMD [ "node", "index.js" ]
