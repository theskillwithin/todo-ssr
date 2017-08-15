'use strict';
const {Invalidation} = require('../modules/validation');

const acceptsHTML = request => request.accepts('text/html') !== false;

const redirectAfterLogin = (request, response, next) => {
  if (acceptsHTML(request)) {
    response.redirect(303, '/todos');
  } else {
    next();
  }
};

const redirectIfNotLoggedIn = (request, response, next) => {
  if (acceptsHTML(request) && request.session.user === undefined) {
    response.redirect(307, '/login');
  } else {
    next();
  }
};

const redirectIfLoggedIn = (request, response, next) => {
  if (acceptsHTML(request) && request.session.user !== undefined) {
    response.redirect(307, '/todos');
  } else {
    next();
  }
};

module.exports = state => {

  const {createAccount: _createAccount, createSession: _createSession, saveSession} = require('../modules/auth')(state);

  const createAccount = async (request, response, next) => {
    const {invalidations} = request;

    if (invalidations.length > 0) {
      next();
    } else {
      try {
        const {email, firstName, lastName, password} = request.body;

        await _createAccount(email, firstName, lastName, password);

        const userData = await _createSession(email, password);

        await saveSession(request.session, userData);

        next();
      } catch (error) {
        if (error instanceof Invalidation) {
          invalidations.push(error);
          next();
        } else {
          next(error);
        }
      }
    }
  };

  const createSession = async (request, response, next) => {
    const {email, password} = request.body;
    const {invalidations} = request;

    if (invalidations.length > 0) {
      next();
    } else {
      try {
        const userData = await _createSession(email, password);

        await saveSession(request.session, userData);

        next();
      } catch (error) {
        if (error instanceof Invalidation) {
          invalidations.push(error);
          next();
        } else {
          next(error);
        }
      }
    }
  };

  return {
    createAccount,
    createSession,
    redirectAfterLogin,
    redirectIfLoggedIn,
    redirectIfNotLoggedIn
  };

};
