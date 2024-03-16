import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();


const app = express();
const port = 3000;
const apiKey = process.env.apiKey;

app.use(express.json());
app.use(cors({
    origin: process.env.domain,
    methods: ["GET", "POST"]
}));

app.get('/quotes', async (req, res) => {
    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=', {
            headers: { 'X-Api-Key': apiKey },
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(port, () => {
    console.log(`Listening on port: ${port}.`);
});
