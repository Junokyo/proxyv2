FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY vite.config.ts ./

RUN yarn install --frozen-lockfile

COPY dist ./dist

EXPOSE 80

CMD ["yarn", "preview", "--host", "0.0.0.0"]
