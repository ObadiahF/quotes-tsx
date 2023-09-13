import './App.css'
import { getNewQuote } from './api/quotesApi'
import { useEffect, useState } from 'react'


function App() {
  

  const [currentQuote, setNewQuote] = useState(
    [
    {
      "quote": "",
      "author": "",
      "category": ""
    }
  ]
  );

  const getNextQuote = async () => {
    const newQuote = await getNewQuote();
    if (!newQuote) return

    setNewQuote(newQuote);
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
          <h3>{currentQuote[0].quote}</h3>
          <h4>{currentQuote[0].author}</h4>
        </div>

        <div className="btns-container">
          <button>Save</button>
          <button onClick={getNextQuote}>Next</button>
        </div>
    </div>
  )
}

export default App
