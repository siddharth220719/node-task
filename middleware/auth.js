const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = async (req, res) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'node-task');

    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error();
    }

    return { user, value: true };
  } catch (e) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Please authenticate' }));
    return { value: false };
  }
};

module.exports = auth;
