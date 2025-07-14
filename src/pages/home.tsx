import React, { useEffect } from 'react'
import Presenter from '../components/presenter'
import Nav from '../components/nav'
import Benefit from '../components/benefit'
import AboutUs from '../components/aboutUs'
import Faqs from '../components/faqs'
import Footer from '../Footer'
import { usePWAInstallPrompt } from '../hooks/usePWAInstallPrompt'

const Home:React.FC = () => {
   const { deferredPrompt, promptInstall, isStandalone } = usePWAInstallPrompt();

  useEffect(() => {
    if (deferredPrompt && !isStandalone) {
      // Immediately show prompt
      promptInstall();
    }
  }, [deferredPrompt, isStandalone]);
  return (<>
  <div className='body'>
  <Nav/>
  <div style={{
    padding:10
  }}>
<Presenter/>
{!isStandalone && 
<Benefit/>
}
</div>
</div>
{!isStandalone &&
<div className='dark-content'>
  <div className='d-body'>
<div className='body '>

<AboutUs/>
<br/>
<Faqs/>
<br/>
<Footer/>
</div>
</div>
</div>}

</>
  )
}

export default Home
