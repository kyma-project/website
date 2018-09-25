FROM node:10.11.0-alpine

LABEL source git@github.com:kyma-project/website.git

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/
RUN npm install

# Copy app sources
COPY index.js /app/

CMD ["npm", "start"]