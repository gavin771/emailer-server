const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const app = express();
require('dotenv').config();

const gcid = process.env.GoogleClientID;
const gcs = process.env.GoogleClientSecret;

passport.use(new GoogleStrategy({
  clientID: gcid,
  clientSecret: gcs,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  console.log(accessToken);
}))

app.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', passport.authenticate('google'));

app.listen(process.env.PORT || 5000);