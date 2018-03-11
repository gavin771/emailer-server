const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('dotenv').config();


mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds211029.mlab.com:11029/${process.env.MONGO_DB}`)

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./models/User');
require('./services/passport');

//Routes
require('./routes/auth')(app);

app.listen(process.env.PORT || 5000);