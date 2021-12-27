const http = require('http');

const User = require('../models/user');

const auth = require('../middleware/auth');

const signup = async (req, res) => {
  let requestBody = '';
  req.on('data', function (chunk) {
    requestBody = requestBody + chunk;
  });
  req.on('end', async (chunk) => {
    if (requestBody) {
      requestBody = JSON.parse(requestBody);
      const user = new User(requestBody);
      try {
        const token = await user.GenerateAuthToken();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ user, token }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(e));
      }
    }
  });
};
const login = async (req, res) => {
  let requestBody = '';
  req.on('data', function (chunk) {
    requestBody = requestBody + chunk;
  });
  req.on('end', async (chunk) => {
    if (requestBody) {
      requestBody = JSON.parse(requestBody);
      const user = new User(requestBody);
      try {
        const user = await User.findByCredentials(
          requestBody.email,
          requestBody.password
        );
        const token = await user.GenerateAuthToken();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ user, token }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(e));
      }
    }
  });
};

const profile = async (req, res) => {
  const { user, value } = await auth(req, res);

  if (value) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ email: user.email, createdAt: user.createdAt }));
  }
};
const update = async (req, res) => {
  const { user, value } = await auth(req, res);

  if (value) {
    let requestBody = '';
    req.on('data', function (chunk) {
      requestBody = requestBody + chunk;
    });
    req.on('end', async (chunk) => {
      if (requestBody) {
        requestBody = JSON.parse(requestBody);

        const Updates = Object.keys(requestBody);
        Updates.forEach((Update) => (user[Update] = requestBody[Update]));
        await user.save();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({ email: user.email, createdAt: user.createdAt })
        );
      }
    });
  }
};
const remove = async (req, res) => {
  const { user, value } = await auth(req, res);
  if (value) {
    await user.remove();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ messafe: 'user deleted successfully' }));
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
  }
};

module.exports = { signup, login, profile, update, remove };
