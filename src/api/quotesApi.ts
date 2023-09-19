import axios from "axios";

// your api ninjas API Key here
const apiKey = ''


export const getNewQuote = async () => {
    if (!apiKey || apiKey === "") {
        throw Error('No Api Key Found')
    }

    try {
        
        const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=', {
            headers: { 'X-Api-Key': apiKey },
        });
        return response.data;
    } catch (err) {
        console.error(err);
    }
}
