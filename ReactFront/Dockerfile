FROM node:12-alpine

# work directory
WORKDIR /usr/app

# Copy dependencies first for effective caching
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6000

CMD ["npm", "run", "start"]