import { useState, useEffect } from "react";
import '../App.css';


const Saved = () => {

    const [savedQuotes, setSavedQuotes] = useState([{
        "quote": "",
        "author": "",
        "category": ""
    }]);
    
    const [hasQuote, setHasQuoteState] = useState(false);
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        const quotes: string | null = localStorage.getItem('savedQuotes');

        if (quotes) {
            setHasQuoteState(true);
            setSavedQuotes(JSON.parse(quotes));
            setQuoteIndex(0);
        }
    }, []);

    const cycle = (num: number) => {
        const savedLength = savedQuotes.length;
        if (savedLength === 1) return;
        if (quoteIndex + num > savedLength - 1) {
            setQuoteIndex(0);
        } else if (quoteIndex + num < 0) {
            setQuoteIndex(savedLength - 1);
        } else {
            setQuoteIndex(quoteIndex + num);
        }
    }

    return (
        <div className="container">
            <div className="title-container">
                <h1>Saved<span>Quotes</span></h1>

            </div>

            <div className="quotes-container">
                <div className={`${hasQuote ? '' : 'dont-show'}`}>
                    <h3>{savedQuotes[quoteIndex].quote}</h3>
                    <h4>{savedQuotes[quoteIndex].author}</h4>
                </div>

                <div className={`${hasQuote ? 'dont-show' : 'warning'}`}>
                    <h1>No Saved Quotes</h1>
                    <h2>Try Saving Some!</h2>
                </div>
            </div>

            <div className="btns-container">
                <button onClick={() => cycle(-1)}>Back</button>
                <button>Home</button>
                <button onClick={() => cycle(1)}>Next</button>
            </div>
        </div>
    )
}

export default Saved;