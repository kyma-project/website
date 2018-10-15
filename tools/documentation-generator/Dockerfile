# Cannot use alpine because of docker-in-docker
FROM node:10.12.0

LABEL source git@github.com:kyma-project/website.git

RUN apt-get update -qq && apt-get install -qqy \
    git \
    apt-transport-https \
    ca-certificates \
    curl \
    lxc \
    iptables

RUN curl -fsSL get.docker.com | sh

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/
RUN npm install

# Copy app sources
COPY src/ /app/src/

CMD ["npm", "start"]