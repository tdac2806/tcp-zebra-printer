FROM node:lts-alpine

WORKDIR /app

COPY package-lock.json package-lock.json
COPY package.json package.json
COPY raw.js raw.js
COPY server.js server.js
COPY startserver.sh startserver.sh

RUN npm install
RUN chmod +x startserver.sh
EXPOSE 9100

CMD ["./startserver.sh"]