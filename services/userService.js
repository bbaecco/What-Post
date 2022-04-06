const {user} = require('../models');

module.exports = {
  signup: async (userid, pwd, email) => {
    try {
      const result = await user.create({
        userid,
        pwd,
        email
      });
      return result;
    } catch(err) {
      console.error(err);
      throw err;
    }
  },
  signin: async (userid, pwd) => {
    try {
      const result = await user.findOne({
        where: {
          userid,
          pwd
        }
      });
      return result;
    } catch(err) {
      console.error(err);
      throw err;
    }
  }
}