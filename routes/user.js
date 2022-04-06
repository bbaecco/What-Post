var express = require('express');
var User = require('../models').User;
var router = express.Router();
const logger = require('../config/logger');
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('✓통신 테스트');
  res.send({
    "result_test": "ok"
  })
});

//회원가입
router.post('/signup', userController.signup);
//로그인
router.post('/signin', userController.signin);

module.exports = router;
