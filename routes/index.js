const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

router.get("/view_users", (req, resp, next) => {
  try {
    req.getConnection((err, conn) => {
      if (err) {
        console.error("SQL Connection error: ", err);
        return err;
      }
      conn.query("select * from user", (err, rows) => {
        if (err) {
          console.error("SQL error: ", err);
          return next(err);
        }
        return resp.json(rows);
      });
      return null;
    });
  } catch (ex) {
    console.error(`Internal error:${ex}`);
    return ex;
  }
  return null;
});

module.exports = router;
