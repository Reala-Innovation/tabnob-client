
import './App.css';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import { useEffect } from 'react'
import AOS from "aos";
import TabNobApp from './pages/app';
import { Toaster } from 'react-hot-toast';
import TransactionsScreen from './pages/transactionsScreen';
import Test from './pages/test';
import AboutUs from './pages/aboutUs';
import Services from './pages/services';
import ContactUs from './pages/contactUs';
import Faqs from './pages/Faqs';
import TransactionsScreenAll from './pages/AllTransactions';
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
   <Route path="/dnkjb847hn54bbbwsdre4e" element={<TransactionsScreenAll/>}/>
   
   <Route path="/AboutUs" element={<AboutUs/>} />

   <Route path="/Services" element={<Services/>} />
   
   <Route path="/Contacts" element={<ContactUs/>} />
   <Route path="/Faqs" element={<Faqs/>} />
   

   <Route path="/Test" element={<Test/>} />
        {/* <Route path="/about" element={<About />} /> */}
        </Routes>
          </Router>
    </>
  )
}

export default App
