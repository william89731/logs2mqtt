FROM node:18.18.2-alpine3.18 as build
WORKDIR /logs
COPY package.json index.js  /logs/
RUN npm install

FROM alpine:latest as final
COPY --from=build /logs /logs
WORKDIR /logs
RUN apk add --update  npm coreutils  --no-cache
CMD npm start  