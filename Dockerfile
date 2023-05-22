# Base image
FROM node:18-alpine

# Create app directory, this is in our container
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["node" , "dist/src/main.js"]