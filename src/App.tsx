
import './App.css';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import { useEffect } from 'react'
import AOS from "aos";
import TabNobApp from './pages/app';
import { Toaster } from 'react-hot-toast';
import TransactionsScreen from './pages/transactionsScreen';
function App() {
useEffect(()=>{
     AOS.init({
     });
},[]);
  return (
    <>
    <Toaster/>
         <Router>
            <Routes>
   <Route path="*" element={<Home />} />
   <Route path="/app" element={<TabNobApp/>} />
   <Route path="/Transactions" element={<TransactionsScreen/>} />
        {/* <Route path="/about" element={<About />} /> */}
        </Routes>
          </Router>
    </>
  )
}

export default App
