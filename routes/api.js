const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSK)

module.exports = app => {
  app.get('/api/me', (req, res) => {
    res.send(req.user);
  });

  app.post('/api/stripe', async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    req.user.credits += 5;
    const newUser = await req.user.save()
    res.send(newUser)
  })
}