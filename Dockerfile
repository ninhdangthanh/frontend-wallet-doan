FROM node:20.18.0-alpine3.20

RUN apk update && \
    apk add --no-cache libc6-compat && \
    apk add git

WORKDIR /app

ENV NODE_OPTIONS=--max_old_space_size=3072

COPY . .

RUN rm -rf node_modules
RUN yarn cache clean
RUN yarn install
RUN yarn build

CMD ["yarn", "start"]
