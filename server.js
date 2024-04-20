require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/assets', express.static('/assets'));



app.post('/sendmail', (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.status(400).send('Missing required fields');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).send('Invalid email format');
  }

  const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER, 
          pass: process.env.GMAIL_PASS
        }
      });
      
      const mailOptions = {
        from: req.body.email, // sender address
        to: process.env.GMAIL_USER, // email from environment variable
        subject: `New message from ${req.body.name}`, // Subject line
        html: `<h1>New Message From ${req.body.name}</h1><p>${req.body.message}</p>` // HTML body
    };
      
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.error(err);
          res.status(500).send('Error sending email');
        } else {
          res.status(200).send('Email successfully sent');
        }
      });
      
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
