var express = require('express');
var router = express.Router();

let incommingMessages = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/twilio', (req, res, next) => {
  console.log(req.body.Body)
  incommingMessages.push({ text: req.body.Body, time: Date.now() })
  res.send(200)
})

router.get('/delete', (req, res) => {
  incommingMessages = [];
  res.send(200)
})

router.get('/getMessages/:latestTime?', (req, res) => {
  if (!req.params.latestTime) return res.status(200).json({ message: incommingMessages, success: true })
  const returnMessages = incommingMessages.filter(message => message.time > req.params.latestTime)
  return res.status(200).json({ message: returnMessages, success: true })
})

module.exports = router;
