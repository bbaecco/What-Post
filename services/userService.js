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
  }
}