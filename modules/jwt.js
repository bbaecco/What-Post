const jwt = require('jsonwebtoken');
const { SECRET_KEY, options } = require('../config/secret-key.js');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    sign: async (user) => {  //토큰 생성
        const payload = {
            id: user.id,
            name: user.name
        };
        const token = {
            //sign 메소드를 통해 access토큰 발급
            accessToken: jwt.sign(payload, SECRET_KEY, options)
        };
        console.log(token);
        return token;
    },
    verify: async (token) => {  //토큰 검증
        let decode;
        try{
            //verify 통해 값 decode
            decode = jwt.verify(token, SECRET_KEY);
            return decode;
        } catch(err) {
            if(err.message === 'jwt expired'){
                console.log('expired token');
                return TOKEN_EXPIRED;
            } else if(err.message === 'invalid token') {
                console.log('invalid token');
                return TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return TOKEN_INVALID;
            }
        }
    }
}