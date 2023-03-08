FROM node:16-alpine
ENV NEXT_TELEMETRY_DISABLED 1
RUN apk update

RUN apk add --no-cache libc6-compat
RUN apk add yarn

RUN export PATH="$PATH:`yarn global bin`"

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

# COPY --from=deps /app/node_modules ./node_modules
COPY . .

CMD ["yarn", "run" ,"build"]