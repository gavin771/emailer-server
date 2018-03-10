const express = require('express');
const app = express();
require('dotenv').config();
require('./services/passport');

//Routes
require('./routes/auth')(app);

app.listen(process.env.PORT || 5000);