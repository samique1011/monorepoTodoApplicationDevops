FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm --filter ws-layer build

EXPOSE 5001
CMD [ "pnpm" , "--filter" , "ws-layer" , "start" ]

