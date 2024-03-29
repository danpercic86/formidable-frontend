FROM node:lts-alpine as builder

WORKDIR /app

COPY package.json /app
COPY yarn-lock.json /app

RUN npm ci

COPY . /app/

RUN npm run build:ssr

# ------------------RUNTIME-----------------------
FROM alpine

RUN apk add --update nodejs

WORKDIR /app

COPY --from=builder /app/dist /app/dist

# link image with github repo
LABEL org.opencontainers.image.source=https://github.com/danpercic86/formidable-frontend

CMD node dist/formidable-frontend/server/main
