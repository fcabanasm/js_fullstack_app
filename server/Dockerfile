FROM keymetrics/pm2:18-alpine
WORKDIR /app
COPY package.json /app
COPY ecosystem.config.cjs /app
RUN npm install --$NODE_ENV
CMD ["pm2-runtime", "ecosystem.config.cjs", "--env", "production"]