var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('✓통신 테스트');
  res.send({
    "result_test": "ok"
  })
});

module.exports = router;
