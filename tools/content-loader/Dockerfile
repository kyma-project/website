FROM node:10.12.0-alpine

LABEL source git@github.com:kyma-project/website.git

RUN apk update && apk upgrade && \
    apk add --no-cache git

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY src/ /app/src/
COPY bin/ /app/bin/

CMD ["npm", "start"]