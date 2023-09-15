import axios from "axios";
//import 'dotenv/config'

const apiKey = ''
//process.env.apiKey;

export const getNewQuote = async () => {
    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=', {
            headers: { 'X-Api-Key': apiKey },
        });
        return response.data;
    } catch (err) {
        console.error(err);
    }
}
