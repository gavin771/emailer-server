const mongoose = require('mongoose')
const isLoggedIn = require('../middlewares/isLoggedIn');
const hasCredits = require('../middlewares/hasCredits');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');
const keys = require('../config/keys');
const Mailer = require('../services/Mailer')
const Survey = mongoose.model('surveys');
const Path = require('path-parser');
const { URL } = require('url');
const _ = require('lodash');

module.exports = (app) => {

  app.get('/api/surveys', [isLoggedIn], async (req, res) => {
    const surveys = await Survey.find({
      _user: req.user.id
    }).select({recipients:false});

    res.send(surveys)
  })

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

  app.get('/api/surveys/webhooks', (req, res) => {
    req.body = [
      { event: 'click', url: "http://host.com/api/surveys/8907/yes", choice: "yes", surveyId: "7890" },
      { event: 'click', url: "http://host.com/api/surveys/8907/yes", choice: "yes", surveyId: "7890" },
      { event: 'bounce', url: "http://host.com/api/surveys/8907/yes", choice: "yes", surveyId: "7890" },
      { event: 'click', url: "http://host.com/api/surveys/", choice: "yes", surveyId: "7890" },

    ]

    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          }
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email, responded: false }
          }
        }, {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$responded': true },
            lastResponded: new Date()
          }).exec()
      })
      .value();

    res.send();
  })

  app.get('/api/surveys/:id/:choice', (req, res) => {
    res.send('Thanks for voting!');
  })
}
