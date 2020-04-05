FROM keymetrics/pm2:12-stretch
WORKDIR /app
COPY package.json /app
COPY pm2.json /app
RUN npm install --$NODE_ENV
CMD ["pm2-runtime", "pm2.json", "--env", "production"]