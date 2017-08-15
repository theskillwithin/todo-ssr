'use strict';
const {hash, verifyHash} = require('scrypt-for-humans');
const {Invalidation} = require('./validation');
const {toCamelCase, toSnakeCase} = require('case-converter');  // TODO :: https://github.com/tgriesser/knex/issues/2084

module.exports = ({db, log}) => {

  const createAccount = async (email, firstName, lastName, password) => {
    const users = await db.table('users').where({ email });

    if (users.length > 0) {
      throw new Invalidation(`An account for ${email} already exists.`, 'email');
    } else {
      const hashedPassword = await hash(password);

      await db.table('users').insert(toSnakeCase({ email, firstName, hashedPassword, lastName }));
    }
  };

  const createSession = async (email, password) => {
    const users = await db.table('users').where({ email });

    if (users.length === 1) {
      const {firstName, hashedPassword, id, lastName} = toCamelCase(users[0]);

      try {
        await verifyHash(password, hashedPassword);

        return { email, firstName, id, lastName };
      } catch(error) {
        if (error.name === 'ScryptPasswordError') {
          throw new Invalidation('Incorrect password.', 'password');
        } else {
          throw error;
        }
      }
    } else if (users.length === 0) {
      throw new Invalidation(`An account for ${email} does not exist.`, 'email');
    } else {
      throw new Error(`Multiple accounts for ${email} found.`);
    }
  };

  /*const destroySession = session => {
    return new Promise((resolve, reject) => {
      request.session.destroy(error => {
        if (error != null) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };*/

  // TODO :: make this a middleware?
  const saveSession = (session, userData) => {
    return new Promise((resolve, reject) => {

      Object.assign(session, { user: userData });

      // Modern browsers do not complete a response when there's a location header, so it's safest to manually save the session
      session.save(error => {
        if (error != null) {
          reject(error);
        } else {
          resolve();
        }
      });

    });
  };

  return { createAccount, createSession, /*destroySession, */saveSession };

};
