FROM node:20-alpine

RUN apk update && \
    apk add bash git make && \
    apk add --upgrade grep

RUN git clone https://github.com/awslabs/git-secrets /home/alpine/git-secrets
WORKDIR /home/alpine/git-secrets
RUN make && make install

WORKDIR /app

COPY package*.json ./
RUN npm ci && \
    npm i -g @nestjs/cli@9.1.2

COPY . .

CMD ["npm", "run", "start"]
