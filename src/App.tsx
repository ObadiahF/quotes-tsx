import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage'
import Saved from './pages/saved';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path='/saved' Component={Saved}/>
      </Routes>
    </Router>
  )
}

export default App
