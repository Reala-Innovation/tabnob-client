
import './App.css'
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import { useEffect } from 'react'
import AOS from "aos";
function App() {
useEffect(()=>{
     AOS.init({
     });
},[]);
  return (
    <>
         <Router>
            <Routes>
   <Route path="*" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        </Routes>
          </Router>
    </>
  )
}

export default App
