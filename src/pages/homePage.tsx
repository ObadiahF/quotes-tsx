import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import './styles/index.css'
import { getNewQuote, saveQuote, deleteSavedQuote } from '../api/quotesApi'
import { useEffect, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"



import { FaBookmark, FaCheck, FaArrowRight, FaUser } from 'react-icons/fa';

const HomePage = ()  => {
    const { toast } = useToast()

    type quote = {
        "quote": "",
        "author": "",
        "category": ""
    }

    const [currentQuote, setNewQuote] = useState<quote[]>([]);

    const [hasError, setHasError] = useState(false);
    const [IsSaved, setIsSaved] = useState(true);
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
        setIsSaved(true);
    }
    

    const saveCurrentQuote = async (quote: string, author: string) => {
       if (!IsSaved) {
        const status = await deleteSavedQuote(quote, author);
        if (status === 200) {
            toast({
                title: "Success!",
                description: "Quote successfully removed from saved!"
            })
        }
       } else {
        const status = await saveQuote(quote, author);
        if (status === 200) {
            toast({
                title: "Success!",
                description: "Quote successfully saved!"
            })
        }
       }
       setIsSaved((prev) =>  !prev);

    }

    useEffect(() => {
        getNextQuote();
    }, []);
    
    return (
        <div className="container text-white">
            <div className="title-container">
                <h1 className='text-8xl'>Quotes<span>TSX</span></h1>
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
                {IsSaved ?
                 <button onClick={() => saveCurrentQuote(currentQuote[0].quote, currentQuote[0].author)}>Save <FaCheck className='saved'/></button>
                 :
                 <button onClick={() => saveCurrentQuote(currentQuote[0].quote, currentQuote[0].author)}>Saved <FaBookmark className='saved'/></button>
                }
               
                <button onClick={getNextQuote}>Next <FaArrowRight className='saved' /></button>
                <Link to={'/account'}><button>Account <FaUser className='saved'/></button></Link>
            </div>
        </div>
    )
}

export default HomePage