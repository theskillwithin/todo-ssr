'use strict';
const {fields, Invalidation} = require('../modules/validation');
//const {renderToStaticMarkup} = require('react-dom/server');
const Router = require('express-promise-router');
const validate = require('../middleware/validate');

const signinSchema = {
  email:    fields.string().email().required().label('Email address'),
  password: fields.string().required().label('Password')
};

module.exports = state => {

  const {createSession/*, redirectAfterLogin, redirectIfLoggedIn*/} = require('../middleware/auth')(state);
  const router = Router();

  router.route('/signin')

  /*.get(redirectIfLoggedIn, (request, response) => {
    response.format({
      'text/html': () => response.render('signin', {})
    });
  })*/

  // TODO :: https://npmjs.com/aphrodite for inline styles
  .post(validate(signinSchema), createSession, (request, response, next) => {
    const {invalidations} = request;

    response.format({
      'application/json': () => {
        if (invalidations.length > 0) {
          response.status(400).json({ invalidations });
        } else {
          response.status(201).json(request.session.user);
        }
      },

      /*'text/html': () => {
        if (invalidations.length > 0) {
          //const {email} = request.body;
          //response.render('signin', { email, invalidations });
        } else {
          next();
        }
      }*/
    }/*, redirectAfterLogin*/);

  });

  return router;

};
