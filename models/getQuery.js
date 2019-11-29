const getQuery = (req, sqlQuery, next) =>
  new Promise((resolve, reject) => {
    req.getConnection((err, conn) => {
      if (err) {
        console.error("SQL Connection error: ", err);
        reject(err);
      }
      conn.query(sqlQuery, (err, rows) => {
        if (err) {
          console.error("SQL error: ", err);
          reject(err);
        }
        resolve(rows);
      });
    });
  });

const getPreparedQuery = (req, sqlQuery, values, next) =>
  new Promise((resolve, reject) => {
    req.getConnection((err, conn) => {
      if (err) {
        console.error("SQL Connection error: ", err);
        reject(err);
      }
      conn.query(sqlQuery, values, (err, rows) => {
        if (err) {
          console.error("SQL error: ", err);
          reject(err);
        }
        resolve(rows);
      });
    });
  });

module.exports = {
  getQuery,
  getPreparedQuery
};
