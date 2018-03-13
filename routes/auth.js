const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/surveys')
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  });
}
