import { useState, useEffect } from "react";
import './styles/index.css'
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft, FaWarehouse, FaTrash } from 'react-icons/fa';
import { getSavedQuotes, deleteSavedQuote } from '../api/quotesApi'
import { useToast } from "@/components/ui/use-toast"


const Saved = () => {
    const { toast } = useToast()

    type quote = {
        "quote": "",
        "quoteAuthor": "",
    }

    const [savedQuotes, setSavedQuotes] = useState<quote[]>([]);
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getSavedQuotes();
            console.log(res.quotes);
            setSavedQuotes(res.quotes);
        }

        fetchData()
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

    const deleteQuote = async () => {
        const { quote, quoteAuthor } = savedQuotes[quoteIndex];

        setSavedQuotes((prev) => prev.filter((_, index) => index !== quoteIndex));
        const status = await deleteSavedQuote(quote, quoteAuthor);
        if (status === 200) {
            toast({
                title: "Success!",
                description: "Quote successfully removed from saved!"
            })
        } else {
            toast({
                title: "Error!",
                description: "Unable to remove quote, please try again later.",
                variant: "destructive"
            })
        }
    }

    return (
        <div className="container text-white">
            <div className="title-container text-8xl">
                <h1>Saved<span>Quotes</span></h1>
            </div>

            <div className="quotes-container">
                {savedQuotes.length > 0 ? (
                <div className={'delete-btn-container'}>
                    <h3>{savedQuotes[quoteIndex].quote}</h3>
                    <h4>{savedQuotes[quoteIndex].quoteAuthor}</h4>
                </div>
                ):
                <div className={'warning'}>
                        <h1 className="text-4xl">No Saved Quotes</h1>
                    <h2 className="text-2xl">Try Saving Some!</h2>
                </div>
                }

            </div>

            <div className="btns-container">
                <button onClick={() => cycle(-1)}> <FaArrowLeft className='saved' />Back</button>
                <Link to={'/'} className="link-styles"><button>Home <FaWarehouse className='saved' /></button></Link>
                <button onClick={deleteQuote}>Delete <FaTrash className="saved"/></button>
                <button onClick={() => cycle(1)}>Next <FaArrowRight className='saved' /></button>
            </div>
        </div>
    )
}

export default Saved;