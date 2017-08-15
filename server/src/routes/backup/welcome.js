'use strict';
const {redirectIfLoggedIn} = require('../middleware/auth');
const Router = require('express-promise-router');

module.exports = ({db, log}) => {

  const router = Router();

  router.get('/', redirectIfLoggedIn, (request, response) => {
    response.render('welcome', {});
  });

  return router;

};
