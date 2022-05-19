FROM buildkite/puppeteer:10.0.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY index.js ./

COPY src ./src

COPY . .

EXPOSE 80

CMD [ "node", "index.js" ]
