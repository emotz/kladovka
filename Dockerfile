FROM debian:jessie

RUN apt-get update && apt-get install -y locales wget sudo net-tools ca-certificates && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8

# Add NodeJS to the apt-get source list
RUN wget -q -O - https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get update
RUN apt-get install -y nodejs

# Now we do stuff for kladovka specifically

WORKDIR /usr/src/kladovka

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "dev" ]
