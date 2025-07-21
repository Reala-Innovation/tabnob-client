import React, { useEffect } from 'react'
import Presenter from '../components/presenter'
import Nav from '../components/nav'
import Benefit from '../components/benefit'
import AboutUs from '../components/aboutUs'
import Faqs from '../components/faqs'
import Footer from '../Footer'
import { usePWAInstallPrompt } from '../hooks/usePWAInstallPrompt'
import { useNavigate } from 'react-router-dom'
import HowItWorks from '../components/home/howItWorks'
import BitcoinMissionStatement from '../components/home/Statement'
import WhyUs from '../components/home/WhyUs'
import { useInnerWidth } from '../hooks/useInnerWidth'

const Home:React.FC = () => {
   const { deferredPrompt, promptInstall, isStandalone } = usePWAInstallPrompt();
const navigate=useNavigate();
  useEffect(() => {
    if (deferredPrompt && !isStandalone) {
      // Immediately show prompt
      promptInstall();
    }
  }, [deferredPrompt, isStandalone]);
  const width=useInnerWidth()
  return (<>
  <div className='body'>
  <Nav startedButtonText={width <  900 ?"Transactions": 'Get Started'} startedClick={()=>{
    navigate(width < 900 ? "/Transactions":"/app")
  }}/>
  <div style={{
    padding:10
  }}>
<Presenter/>
{!isStandalone && 
<Benefit/>
}
</div>
{!isStandalone && <>
<br/>
<BitcoinMissionStatement/>
<br/>
<HowItWorks/>
</>}




</div>
{!isStandalone &&
<div className='dark-content'>
  <div className='d-body'>
<div className='body '>

<AboutUs/>
<br/>
<WhyUs/>
<br/>
<Faqs/>
<br/>
{width < 900 && <Footer white/>}

</div>

</div>

</div>}
{width > 900 && <Footer/>}
</>
  )
}

export default Home
