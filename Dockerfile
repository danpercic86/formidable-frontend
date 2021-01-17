FROM node:lts-alpine as builder

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm ci

COPY . /app/

RUN npm run build:ssr

# ------------------RUNTIME-----------------------
FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/dist /app/dist

# link image with github repo
LABEL org.opencontainers.image.source=https://github.com/danpercic86/formidable-frontend

CMD node dist/formidable-frontend/server/main
