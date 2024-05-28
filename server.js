const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
require('dotenv').config();

const API_KEY = process.env.MAILGUN_API_KEY;
const app = express();
const port = 3000;
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: API_KEY});
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/send-email', (req, res) => {
    const { Name, EmailAddress, Message } = req.body;
    mg.messages.create('sandbox2f10007b0d644325ba334db08bee4436.mailgun.org', {
        from: "mailer <mailgun@sandbox2f10007b0d644325ba334db08bee4436.mailgun.org>",
        to: "thomaschenperiod3@gmail.com",
        subject: "New contact form submission",
        text: `From ${Name}:\n\n${Message}\n\nContact: ${EmailAddress}`,
    })
    .then(msg => {
        console.log(msg); // logs response data
        res.send('Email sent successfully');
    })
    .catch(err => {
        console.log(err); // logs any error
        res.status(500).send('Failed to send email');
    });
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});