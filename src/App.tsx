import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage'
import Saved from './pages/saved';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </Router>
  )
}

export default App;
