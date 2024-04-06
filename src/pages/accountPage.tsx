import { Link } from 'react-router-dom';
import './styles/index.css'
import { useEffect, useState } from 'react'
import { getNumOfQuotes } from '@/api/quotesApi';
import { FaBookmark, FaUser, FaAngleRight } from 'react-icons/fa';
import LoadingBar from 'react-top-loading-bar'

const AccountPage = ()  => {
    const [name, setName] = useState("");
    const [numSaved, setNumSaved] = useState(0);
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const name = localStorage.getItem('name');
        const session = localStorage.getItem('sessionId')

        if (!name || !session) {
            window.location.href = "/auth"
            return;
            }
        setName(name ?? "Anonymous")

        const getNum = async () => {
            setProgress(50);
            const res = await getNumOfQuotes();
            setProgress(100);
            const numOfQuotes = res.num;
            if (numOfQuotes <= 0 || !numOfQuotes) {
                setNumSaved(0)
            } else {
                setNumSaved(numOfQuotes);
            }
            
        }
        getNum();
    }, []);

    const logOut = () => {
        localStorage.clear();
        window.location.href = '/auth'
    }
    
    return (
        <>
            <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
            <div className="container text-white">
                <div className="title-container text-8xl">
                    <h1>Account<span>TSX</span></h1>
                </div>
                    <h1 className="text-3xl">Hello {name}, you have {numSaved} quotes saved!</h1>

                <div className="btns-container account-btns">
                    <Link to={'/saved'}><button>Saved<FaBookmark className='saved'/></button></Link>
                    <Link to={'/'}><button>See New Quotes <FaAngleRight className='saved'/></button></Link>
                    <button onClick={logOut}>Log Out</button>
                </div>
            </div>
        </>
    )
}

export default AccountPage