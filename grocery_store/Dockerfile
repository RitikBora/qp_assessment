FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

ENV DATABASE_URL="postgresql://hasura_role_9c4fab60-1dfc-485b-8941-691bf6bd138c:WZhudxY5N0Xj@ep-steep-smoke-78289500.us-east-2.aws.neon.tech/qp_assesment_grocery?sslmode=require"

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "dist/index.js"]
