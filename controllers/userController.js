const userService = require('../services/userService');
const rb = require('../modules/responseBody');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
const jwt = require('../modules/jwt');

module.exports = {
  signup: async(req, res) => {
    const { userid, pwd, email } = req.body;
    console.log(req.body);
    if(!userid || !pwd || !email){
      return res.status(sc.BAD_REQUEST).send(rb.success(sc.BAD_REQUEST, rm.NULL_VALUE));
    }
    try{
      const id = await userService.signup(userid, pwd, email);
      return res.status(sc.CREATED).send(rb.successData(sc.CREATED, rm.SIGNUP_SUCCESS, id));
    } catch (err) {
      console.log(err);
      return res.send(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.SIGNUP_FAIL));
    }
  },
  signin: async(req, res) => {
    const { userid, pwd } = req.body;
    console.log(req.body);
    if(!userid || !pwd){
      return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NO_ACCOUNT));
    }
    try{
      const user = await userService.signin(userid, pwd);
      if(!user) {  //계정 없음
        return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NO_ACCOUNT));
      }
      if( pwd != user.pwd) {  //비밀번호 불일치
        return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.MISMATCH_PWD));
      }
      const {accessToken} = await jwt.sign(user);  //토큰 생성
      return res.status(sc.OK).send(rb.successData(sc.OK, rm.SIGNIN_SUCCESS, {id: user.no, accessToken: accessToken}));
    } catch (err) {
        console.error(err);
        return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.SIGNIN_FAIL));
    }
  }
}