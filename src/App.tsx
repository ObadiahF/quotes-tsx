import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage'
import Saved from './pages/saved';
import Auth from './pages/login';
import AccountPage from './pages/accountPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/saved" element={<Saved />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/account' element={<AccountPage />} />
      </Routes>
    </Router>
  )
}

export default App;
