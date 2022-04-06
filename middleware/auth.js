/*인증이 필요한 곳에 미들웨어로 적용하기 위함*/
const rb = require('../modules/responseBody');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
const jwt = require('../modules/jwt');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  checkToken: async (req, res, next) => {
    const token = req.header('Authorization');
    if(!token){  //토큰 없음
      return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.EMPTY_TOKEN));
    }

    const decoded = await jwt.verify(token);
    if(decoded === TOKEN_EXPIRED){  //토큰 유효기간 만료
        return res.status(sc.UNAUTHORIZED).send(rb.fail(sc.UNAUTHORIZED, rm.EXPIRED_TOKEN));
    } else if(decoded === TOKEN_INVALID){  //유효하지 않은 토큰
        return res.status(sc.UNAUTHORIZED).send(rb.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
    } else if(!decoded.id) {  //유효하지 않은 토큰
        return res.status(sc.UNAUTHORIZED).send(rb.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
    }
    req.decoded = decoded.id;
    next();
  }
}