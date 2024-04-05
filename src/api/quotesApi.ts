import axios from "axios";


export const getNewQuote = async () => {
    const session = localStorage.getItem("sessionId");
    const name = localStorage.getItem("name");
    if (!name || !session) {
        window.location.href = "/auth"
        localStorage.clear();
    }
    try {
        const response = await axios.get(`http://localhost:3000/quotes?sessionToken=${session}&name=${name}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}
