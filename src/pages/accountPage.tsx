import { Link } from 'react-router-dom';
import './styles/index.css'
import { useEffect, useState } from 'react'


import { FaBookmark, FaUser, FaAngleRight } from 'react-icons/fa';

const AccountPage = ()  => {
    const [name, setName] = useState("");
    const [numSaved, setNumSaved] = useState("...");

    useEffect(() => {
        const name = localStorage.getItem('name');
        const session = localStorage.getItem('sessionId')

        if (!name || !session) {
            window.location.href = "/auth"
            return;
            }
        setName(name ?? "Anonymous")
    }, []);

    const logOut = () => {
        localStorage.clear();
        window.location.href = '/auth'
    }
    
    return (
        <div className="container">
            <div className="title-container">
                <h1>Account<span>TSX</span></h1>
            </div>
                <h1>Hello Obadiah, you have {numSaved } quotes saved!</h1>

            <div className="btns-container account-btns">
                <Link to={'/saved'}><button>Saved<FaBookmark className='saved'/></button></Link>
                <Link to={'/'}><button>See New Quotes <FaAngleRight className='saved'/></button></Link>
                <button onClick={logOut}>Log Out</button>
            </div>
        </div>
    )
}

export default AccountPage