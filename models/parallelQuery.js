/**
 * @Author: joshuaasare
 * @Date:   2019-04-03 16:23:06
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-10-14 23:27:33
 */

const forEach = require('lodash/forEach');

const parallelQuery = (req, queries, next) => {
  // new Promise((resolve, reject) => {});
  const promises = [];

  forEach(queries, (query) => {
    const queryPromise = new Promise((resolve, reject) => {
      req.getConnection((err, conn) => {
        if (err) {
          console.log(`connection err:${err}`);
          reject(err);
        }
        const { sqlQuery } = query;
        conn.query(sqlQuery, (err, rows) => {
          if (err) {
            console.error('SQL error: ', err);
            reject(err);
          }
          resolve(rows);
        });
      });
    });
    promises.push(queryPromise);
  });
  return promises;
};

module.exports = {
  parallelQuery,
};
