const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const { gcID, gcs } = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: gcID,
  clientSecret: gcs,
  callbackURL: '/auth/google/callback/',
  proxy: true
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id });

  if (existingUser) {
    done(null, existingUser);
  } else {
    const newUser = await new User({ googleId: profile.id }).save()
    done(null, newUser);
  }
})
);