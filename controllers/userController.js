const userService = require('../services/userService');
const rb = require('../modules/responseBody');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');

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
      return res. send(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.SIGNUP_FAIL));
    }
  }
}