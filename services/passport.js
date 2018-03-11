const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');

const User = mongoose.model('users');
const gcid = process.env.GoogleClientID;
const gcs = process.env.GoogleClientSecret;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: gcid,
  clientSecret: gcs,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id }).then((user) => {
    if (user) {
      done(null, user);
    } else {
      new User({ googleId: profile.id })
        .save()
        .then(user => done(null, user))
    }
  })
}));