const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_DATABASE,
  MONGO_HOST,
  MONGO_PROD_HOST,
  MONGO_PORT,
  NODE_ENV,
} = process.env;

const mongo_host = NODE_ENV == "production" ? MONGO_PROD_HOST : MONGO_HOST;

export const mongoURI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${mongo_host}:${MONGO_PORT}/${MONGO_DATABASE}`;
