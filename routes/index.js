const express = require("express");
const router = express.Router();

/* GET home page */
router
  .route("/") 
  .get((req, res, next) => res.render("index"))

module.exports = router;
