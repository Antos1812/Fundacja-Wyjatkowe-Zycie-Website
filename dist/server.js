const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));


let subscribers = [];
app.get('/', (req, res) => {
    res.send('Witaj na stronie!');
});


// Endpoint do subskrypcji
app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    if (email) {
        subscribers.push(email);
        res.json({ message: 'Subskrypcja zakończona sukcesem' });
    } else {
        res.status(400).json({ error: 'Błąd przy zapisie subskrypcji' });
    }
});

// Endpoint do wysyłania maili do subskrybentów
app.post('/send-update', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'twojemail@gmail.com',
            pass: 'twojehaslo'
        }
    });

    const mailOptions = {
        from: 'twojemail@gmail.com',
        subject: 'Aktualizacja strony',
        text: 'Strona została zaktualizowana!'
    };

    subscribers.forEach(email => {
        mailOptions.to = email;
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Błąd wysyłania maila:', error);
            } else {
                console.log('Email wysłany:', info.response);
            }
        });
    });

    res.json({ message: 'Powiadomienia zostały wysłane!' });
});

app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});
