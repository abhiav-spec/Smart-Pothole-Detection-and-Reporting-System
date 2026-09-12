FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules

COPY package*.json ./
COPY prisma ./prisma

RUN npx prisma generate

COPY src ./src

EXPOSE 5000

CMD ["node", "src/server.js"]
