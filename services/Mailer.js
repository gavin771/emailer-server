const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendgrid);
    this.setFrom(new helper.Email('no-reply@emaily.com'));
    this.setSubject(subject);
    this.addContent(new helper.Content('text/html', content));
    this.recipients = this.formatAddresses(recipients);

    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses (recipients) {
    return recipients.map(({ email }) => new helper.Email(email));
  }

  addClickTracking () {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients () {
    const personalize = new helper.Personalization();
    this.recipients.forEach(r => {
      personalize.addTo(r)
    });
    this.addPersonalization(personalize);
  }

  async send () {
    try {
      const req = this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: this.toJSON()
      });

      const response = await this.sgApi.API(req);
      // console.log(response)
      return response;
    } catch (err) {
      console.log(err.response.body.errors)
    }

  }
}

module.exports = Mailer;