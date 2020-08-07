FROM node:12.18-alpine

COPY bot/config.js /bot/
COPY bot/bot.js /bot/
COPY bot/package-lock.json /bot/
COPY bot/package.json /bot/

WORKDIR /bot
RUN npm install
CMD ["node", "bot.js"]
