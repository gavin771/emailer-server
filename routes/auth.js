const passport = require('passport');

module.exports = (app) => {
  app.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }));

  app.get('/auth/google/callback', passport.authenticate('google'));

}
