const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser')
const { cookieKey, mongoURI } = require('./config/keys');

mongoose.connect(mongoURI);

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./models/User');
require('./services/passport');

//Routes
require('./routes/auth')(app);
require('./routes/api')(app);

if (process.env.NODE_ENV === 'production') {
  //look in client/build for file that match unknown requests
  app.use(express.static('client/build'));

  //for all other routes, serve the index.html file
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.res(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(process.env.PORT || 5000);