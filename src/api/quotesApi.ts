import axios from "axios";
const domain = "https://quotes-tsx.onrender.com"

export const getNewQuote = async () => {
    const data = await getData();
    try {
        const response = await axios.get(`http://${domain}/quotes?sessionToken=${data?.session}&name=${data?.name}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const saveQuote = async (quote: string, author: string) => {
    const data = await getData();
    try {
        const response = await axios.post(`http://${domain}/savequote?sessionToken=${data?.session}&name=${data?.name}`, {
            "quote": quote,
            "author": author
        });
        return response.status;
    } catch (err) {
        console.error(err);
    }
}

export const deleteSavedQuote = async (quote: string, author: string) => {
    const data = await getData();
    try {
        const response = await axios.post(`http://${domain}/deleteSavedQuote?sessionToken=${data?.session}&name=${data?.name}`, {
            "quote": quote,
            "author": author
        });
        return await response.status;
    } catch (err) {
        console.error(err);
    }
}

export const getSavedQuotes = async () => {
    const data = await getData();
    try {
        const response = await axios.get(`http://${domain}/savedquotes?sessionToken=${data?.session}&name=${data?.name}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const getNumOfQuotes = async () => {
    const data = await getData();
    try {
        const response = await axios.get(`http://${domain}/numOfQuotesSaved?sessionToken=${data?.session}&name=${data?.name}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

const getData = async () => {
    const session = localStorage.getItem("sessionId");
    const name = localStorage.getItem("name");
    if (!name || !session) {
        localStorage.clear();
        window.location.href = "/auth"
        return
    }

    return {session, name}
}