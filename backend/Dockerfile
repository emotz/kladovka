FROM kladovka/frontend as frontend

FROM node

WORKDIR /src/backend

COPY backend/package.json .

RUN npm install

COPY --from=frontend /src/frontend/dist ../frontend/dist

COPY domain ../domain

RUN cd ../domain && npm install

COPY config ../config

COPY backend .

CMD [ "npm", "run", "start" ]
