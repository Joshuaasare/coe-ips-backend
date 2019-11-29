const dbParams = {
  SOCKET_PATH: process.env.DB_SOCKET_PATH,
  //   HOST: "127.0.0.1",
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_NAME
};

module.exports = dbParams;
