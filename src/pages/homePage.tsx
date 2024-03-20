import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import './styles/index.css'
import { getNewQuote } from '../api/quotesApi'
import { useEffect, useState } from 'react'
import axios from "axios";


import { FaBookmark, FaCheck, FaArrowRight } from 'react-icons/fa';

const HomePage = ()  => {

    type quote = {
        "quote": "",
        "author": "",
        "category": ""
    }

    const [currentQuote, setNewQuote] = useState<quote[]>([]);

    const [hasError, setHasError] = useState(false);
    const [canSave, setCanSave] = useState(true);
    const [loading, setLoadingState] = useState(true);

    const getNextQuote = async () => {
        setLoadingState(true);
        
        const newQuote = await getNewQuote();
        if (!newQuote) {
            setHasError(true);
            setLoadingState(false);
            return
        }
        setNewQuote(newQuote);
        setLoadingState(false);
        setHasError(false);
        setCanSave(true);
    
    }
    
    const getSavedQuotes = async () => {
        const response = await axios.get('http://localhost:3000/savequote');
        console.log(response);
    }
    

    const saveQuote = (quote: string, author: string) => {
        const savedQuotes = localStorage.getItem('savedQuotes');
        const quoteEntry = {
            "quote": quote,
            "author": author
        };

        if (!savedQuotes || saveQuote.length === 0) {
            localStorage.setItem('savedQuotes', JSON.stringify([quoteEntry]));
        } else {
            const currentSaved = JSON.parse(savedQuotes);
            
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
                <h1>Quotes<span>TSX</span></h1>
                
            </div>

            <div className="quotes-container">
                {!hasError && !loading && (
                    <div>
                        <h3>{currentQuote[0].quote}</h3>
                        <h4><span>-</span> {currentQuote[0].author}</h4>
                    </div>
                )}
                { hasError && (
                <div className={'warning'}>
                    <h1>Error Getting New Quote</h1>
                    <h2>Please try again later!</h2>
                </div>
                )}

                { loading && (
                    <div className="loading">
                        <TailSpin
                            height="120"
                            width="120"
                            color="#00ADB5"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                )
                }
                
            </div>

            <div className="btns-container">
                <button onClick={() => saveQuote(currentQuote[0].quote, currentQuote[0].author)} disabled={!canSave}>Save {!canSave && <FaCheck className='saved'/>}</button>
                <button onClick={getNextQuote}>Next <FaArrowRight className='saved' /></button>
                <Link to={'/saved'} className='link-styles'><button>Saved<FaBookmark className='saved' /></button></Link>
                <button>Log Out</button>
            </div>
        </div>
    )
}

export default HomePage