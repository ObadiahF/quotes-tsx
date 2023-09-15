import '../App.css'
import { getNewQuote } from '../api/quotesApi'
import { useEffect, useState } from 'react'

import { FaBookmark } from 'react-icons/fa';

const HomePage = ()  => {

    const [currentQuote, setNewQuote] = useState(
        [
            {
                "quote": "",
                "author": "",
                "category": ""
            }
        ]
    );

    const [hasQuote, setHasQuoteState] = useState(false);
    const [canSave, setCanSave] = useState(true);

    const getNextQuote = async () => {
        const newQuote = await getNewQuote();
        if (!newQuote) {
            setHasQuoteState(false);
            return
        }
        setNewQuote(newQuote);
        setHasQuoteState(true);
        setCanSave(true);
    }

    const saveQuote = (quote: string, author: string) => {
        console.log('saved');
        const savedQuotes = localStorage.getItem('savedQuotes');
        const quoteEntry = {
            "quote": quote,
            "author": author
        };

        if (!savedQuotes || saveQuote.length === 0) {
            localStorage.setItem('savedQuotes', JSON.stringify([quoteEntry]));
        } else {
            const currentSaved = JSON.parse(savedQuotes);
            console.log('2', currentSaved)
            currentSaved.push(quoteEntry);
            localStorage.setItem('savedQuotes', JSON.stringify(currentSaved));
        }
        setCanSave(false);
    }

    useEffect(() => {
        getNextQuote();
    }, []);
    
    return (
        <div className="container">
            <div className="title-container">
                <h1>Quotes <span>TSX</span></h1>
                
            </div>

            <div className="quotes-container">
                <div className={`${hasQuote ? '' : 'dont-show'}`}>
                <h3>{currentQuote[0].quote}</h3>
                <h4>{currentQuote[0].author}</h4>
                </div>
                
                <div className={`${hasQuote ? 'dont-show' : 'warning'}`}>
                    <h1>Error Getting New Quote</h1>
                    <h2>Please try again later!</h2>
                </div>
            </div>

            <div className="btns-container">
                <button onClick={() => saveQuote(currentQuote[0].quote, currentQuote[0].author)} disabled={!canSave}>{canSave ? 'Save' : 'Already Saved'}</button>
                <button onClick={getNextQuote}>Next</button>
                <button>Saved<FaBookmark className='saved' /></button>
            </div>
        </div>
    )
}

export default HomePage