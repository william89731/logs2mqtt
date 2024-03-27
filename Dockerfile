FROM node:18.20.0-alpine3.19 as build
WORKDIR /logs
COPY package.json index.js  /logs/
RUN set -ex && \ 
    npm install \
    --unsafe-perm --no-update-notifier \ 
    --no-audit --omit=dev

FROM alpine:latest as final
COPY --from=build /logs /logs
WORKDIR /logs
RUN apk add --update  npm coreutils  --no-cache
CMD node index.js