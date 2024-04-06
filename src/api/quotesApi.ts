import axios from "axios";


export const getNewQuote = async () => {
    const data = await getData();
    try {
        const response = await axios.get(`http://localhost:3000/quotes?sessionToken=${data?.session}&name=${data?.name}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const saveQuote = async (quote: string, author: string) => {
    const data = await getData();
    try {
        const response = await axios.post(`http://localhost:3000/savequote?sessionToken=${data?.session}&name=${data?.name}`, {
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
        const response = await axios.post(`http://localhost:3000/deleteSavedQuote?sessionToken=${data?.session}&name=${data?.name}`, {
            "quote": quote,
            "author": author
        });
        return response.status;
    } catch (err) {
        console.error(err);
    }
}

const getData = async () => {
    const session = localStorage.getItem("sessionId");
    const name = localStorage.getItem("name");
    if (!name || !session) {
        window.location.href = "/auth"
        localStorage.clear();
        return
    }

    return {session, name}
}