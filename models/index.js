const { getQuery, getPreparedQuery } = require("./getQuery");
const { postQuery, postPreparedQuery } = require("./postQuery");
const { putQuery } = require("./putQuery");
const { parallelQuery } = require("./parallelQuery");

module.exports = {
  getQuery,
  postQuery,
  postPreparedQuery,
  putQuery,
  parallelQuery,
  getPreparedQuery
};
