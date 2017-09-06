FROM node

RUN apt-get update
RUN apt-get install -y g++ build-essential

WORKDIR /src

RUN mkdir -p logs
RUN ln -sf /proc/1/fd/1 logs/frontend.log
RUN ln -sf /proc/1/fd/1 logs/backend.log

CMD [ "tail", "-f", "/dev/null" ]
