import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage'
import Saved from './pages/saved';
import Auth from './pages/login';
import AccountPage from './pages/accountPage';
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/saved" element={<Saved />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/account' element={<AccountPage />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App;
