FROM node

WORKDIR /src/frontend

COPY frontend/package.json .

RUN npm install

COPY domain ../domain

RUN cd ../domain && npm install

COPY config ../config

COPY frontend .

RUN npm run build

CMD [ "npm", "run", "start" ]
