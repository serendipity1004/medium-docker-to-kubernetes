FROM node:10-alpine

WORKDIR /app/usr

# Copy dependencies first for effective caching
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]