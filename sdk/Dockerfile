

FROM node:18-alpine  AS build
WORKDIR /usr/app/sdk

COPY   tsconfig.json package.json  package-lock.json ./
RUN npm ci -—production
COPY src ./src
RUN npm run build

FROM node:18-alpine
EXPOSE 3000
WORKDIR /usr/app/sdk

COPY  package.json package-lock.json  ./
COPY  --from=build /usr/app/sdk/build ./build
COPY  --from=build /usr/app/sdk/node_modules ./node_modules

CMD ["node", "build/app.js"]

