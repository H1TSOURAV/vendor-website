FROM node:20-alpine as deps
WORKDIR /app
COPY package.json ./
RUN npm i --production=false

FROM node:20-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine as runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json .
RUN npm i --production
EXPOSE 3000
CMD ["npm", "run", "start"]
