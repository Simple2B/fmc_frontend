FROM node:16-alpine AS deps
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

# builder
FROM node:16-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .


ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn run build