FROM node:18-alpine

ENV DATABASE_URL="postgres://pelonidas:EbmU0zeqjOY7@ep-dry-lab-220179.eu-central-1.aws.neon.tech/neondb"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["node" , "dist/src/main.js"]