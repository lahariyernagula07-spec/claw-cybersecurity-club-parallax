var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');
require('dotenv').config();

var app = express();
var port = process.env.PORT || 5000;
var clubEmail = process.env.CLUB_EMAIL || 'cyberclub@raghuenggcollege.in';

app.use(express.json({ limit: '50kb' }));
app.use(express.static(__dirname));

app.post('/api/contact', async function(req, res) {
  try {
    var name = String(req.body.name || '').trim();
    var email = String(req.body.email || '').trim();
    var message = String(req.body.message || '').trim();

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please fill in your name, email and message.' });
    }

    var emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).json({ message: 'Email service is not configured yet. Add SMTP_USER and SMTP_PASS to .env.' });
    }

    var transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || 'true') === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: clubEmail,
      replyTo: email,
      subject: 'Cyber Club Website Contact — ' + name,
      text: 'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message,
      html: '<h2>Cyber Club Contact Message</h2>' +
        '<p><strong>Name:</strong> ' + escapeHtml(name) + '</p>' +
        '<p><strong>Email:</strong> ' + escapeHtml(email) + '</p>' +
        '<p><strong>Message:</strong></p><p>' + escapeHtml(message).replace(/\\n/g, '<br>') + '</p>'
    });

    res.json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact email error:', error.message);
    res.status(500).json({ message: 'The message could not be sent right now.' });
  }
});

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

app.listen(port, function() {
  console.log('Cyber Club server running at http://localhost:' + port);
});
