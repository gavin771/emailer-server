const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const gcid = process.env.GoogleClientID;
const gcs = process.env.GoogleClientSecret;

passport.use(new GoogleStrategy({
  clientID: gcid,
  clientSecret: gcs,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  console.log(accessToken);
}));