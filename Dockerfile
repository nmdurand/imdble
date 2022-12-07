FROM node:18-slim

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --frozen-lockfile
COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "run", "start"]