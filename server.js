require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'https://wdxjesselare.netlify.app/' // Your frontend URL
}));

// Root route
app.get('/', (req, res) => {
  res.send('Hello! The server is up and running.'); // Simple message to show that your server is working
});

// Sendmail route
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
    from: req.body.email,
    to: process.env.GMAIL_USER,
    subject: `New message from ${req.body.name}`,
    html: `<h1>New Message From ${req.body.name}</h1><p>${req.body.message}</p>`
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
