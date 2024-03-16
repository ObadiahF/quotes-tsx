import axios from "axios";


export const getNewQuote = async () => {
    try {
        const response = await axios.get('http://localhost:3000/quotes');
        return response.data;
    } catch (err) {
        console.error(err);
    }
}
