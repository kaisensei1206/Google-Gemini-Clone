const express = require('express');
const fetch = require('node-fetch');
const app = express();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

app.use(express.json());

app.post('/api/proxy', async (req, res) => {
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GOOGLE_API_KEY}` },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
