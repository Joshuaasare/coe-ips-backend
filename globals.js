const dbParams = {
  HOST: process.env.DB_HOST,
  //   HOST: "127.0.0.1",
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_NAME
};

module.exports = dbParams;
