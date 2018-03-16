const mongoose = require('mongoose')
const isLoggedIn = require('../middlewares/isLoggedIn');
const hasCredits = require('../middlewares/hasCredits');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');
const keys = require('../config/keys');
const Mailer = require('../services/Mailer')
const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.post('/api/surveys', [isLoggedIn, hasCredits], async (req, res) => {
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
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  })

  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  })
}
