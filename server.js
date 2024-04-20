require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/assets', express.static('/assets'));


app.post('/sendmail', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER, // Your email
          pass: 'your-password' // Your email password
        }
      });
      
      const mailOptions = {
        from: req.body.email, // sender address
        to: 'your-email@gmail.com', // list of receivers
        subject: `New message from ${req.body.name}`, // Subject line
        text: req.body.message // plain text body
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
