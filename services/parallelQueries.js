const forEach = require('lodash/forEach');

const runParallelQueries = (conn, queries, next) => {
  // new Promise((resolve, reject) => {});
  const promises = [];
  forEach(queries, (query) => {
    const queryPromise = new Promise((resolve, reject) => {
      try {
        const { sqlQuery } = query;
        console.log('it is resolving');
        conn.query(sqlQuery, (err, rows) => {
          if (err) {
            console.error('SQL error: ', err);
            return next(err);
          }
          return resolve(rows);
        });
      } catch (error) {
        reject(error);
      }
    });
    promises.push(queryPromise);
  });
  return promises;
};

module.exports = {
  runParallelQueries,
};
