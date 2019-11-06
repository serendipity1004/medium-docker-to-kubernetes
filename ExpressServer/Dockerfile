FROM node:10-alpine

# work directory
WORKDIR /usr/app

# Copy dependencies first for effective caching
COPY package*.json ./

RUN npm install -g nodemon \
 && npm install

COPY . .

CMD ["npm", "run", "dev"]