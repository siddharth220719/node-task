const http = require('http');
const userRouter = require('./routers/user');
require('./db/mongoose');
const server = http
  .createServer((req, res) => {
    if (req.url === '/signup' && req.method == 'POST') {
      userRouter.signup(req, res);
    }
    if (req.url === '/login' && req.method == 'POST') {
      userRouter.login(req, res);
    }
    if (req.url === '/profile' && req.method == 'GET') {
      userRouter.profile(req, res);
    }
    if (req.url === '/update' && req.method == 'PUT') {
      userRouter.update(req, res);
    }
    if (req.url === '/remove' && req.method == 'DELETE') {
      userRouter.remove(req, res);
    }
  })
  .listen(3000);
