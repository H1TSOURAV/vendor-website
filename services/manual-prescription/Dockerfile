FROM node:20-alpine AS base
WORKDIR /app
COPY package.json tsconfig.json ./
COPY src ./src
RUN npm i --production && npm run build || true

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/dist ./dist
COPY package.json .
RUN npm i --production
EXPOSE 4006
CMD ["node", "dist/index.js"]
