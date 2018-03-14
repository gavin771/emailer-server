const mongoose = require('mongoose')
const isLoggedIn = require('../middlewares/isLoggedIn');
const hasCredits = require('../middlewares/hasCredits');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.post('/api/surveys', [isLoggedIn, hasCredits], (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.spllit(',').map(email => email.trim()),
      _user: req.user.id,
      dateSent: Date.now()
    })
  })
}