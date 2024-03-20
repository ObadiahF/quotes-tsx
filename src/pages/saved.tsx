import { useState, useEffect } from "react";
import './styles/index.css'
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft, FaWarehouse } from 'react-icons/fa';


const Saved = () => {

    type quote = {
        "quote": "",
        "author": "",
        "category": ""
    }

    const [savedQuotes, setSavedQuotes] = useState<quote[]>([]);
    
    const [hasQuote, setHasQuoteState] = useState(false);
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        const quotes: string | null = getSavedQuotes();
        if (quotes) {
            if (JSON.parse(quotes).length === 0) {
                setHasQuoteState(false);
                return
            }
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

    const deleteSavedQuote = () => {
        const quotes: string | null = getSavedQuotes();

        if (quotes) {
            
            const quotesArr: quote[] = JSON.parse(quotes);
            quotesArr.splice(quoteIndex, 1)
            localStorage.setItem('savedQuotes', JSON.stringify(quotesArr));
            setSavedQuotes(quotesArr);

            cycle(1);
            
            if (quotesArr.length === 0) {
                setHasQuoteState(false);
            }
        }
    }

    const getSavedQuotes = () => {
        const quotes: string | null = localStorage.getItem('savedQuotes');
        return quotes;
    }

    return (
        <div className="container">
            <div className="title-container">
                <h1>Saved<span>Quotes</span></h1>
            </div>

            <div className="quotes-container">
                {hasQuote ? (
                <div className={'delete-btn-container'}>
                    <button id='delete-btn' onClick={deleteSavedQuote}>X</button>
                    <h3>{savedQuotes[quoteIndex].quote}</h3>
                    <h4>{savedQuotes[quoteIndex].author}</h4>
                </div>
                ):
                <div className={'warning'}>
                        <h1>No Saved Quotes</h1>
                    <h2>Try Saving Some!</h2>
                </div>
                }

            </div>

            <div className="btns-container">
                <button onClick={() => cycle(-1)}> <FaArrowLeft className='saved' />Back</button>
                <Link to={'/'} className="link-styles"><button>Home <FaWarehouse className='saved' /></button></Link>
                <button onClick={() => cycle(1)}>Next <FaArrowRight className='saved' /></button>
            </div>
        </div>
    )
}

export default Saved;