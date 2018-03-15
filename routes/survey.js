const mongoose = require('mongoose')
const isLoggedIn = require('../middlewares/isLoggedIn');
const hasCredits = require('../middlewares/hasCredits');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');
const keys = require('../config/keys');
const Mailer = require('../services/Mailer')
const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.post('/api/surveys', [isLoggedIn, hasCredits], (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email })),
      _user: req.user.id,
      dateSent: Date.now()
    })
    
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();

  })
}
