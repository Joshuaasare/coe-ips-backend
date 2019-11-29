const { getPreparedQuery, postQuery } = require("../../../models");

// if returns true means phone number exist
const checkEmailAddress = async (req, sqlQuery, values, next) => {
  const rows = await getPreparedQuery(req, sqlQuery, values, next);
  return !(rows.length === 0);
};

module.exports = {
  checkEmailAddress
};
