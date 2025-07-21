import React from 'react'
import Nav from '../components/nav'
import { useNavigate } from 'react-router-dom'
import { useInnerWidth } from '../hooks/useInnerWidth'
import Footer from '../Footer'
import { FaqsContent } from '../components/faqs'

const Faqs:React.FC = () => {
     const navigate=useNavigate()
    const width=useInnerWidth()
  return (
   <>
    <div className='body'>
        <Nav startedButtonText={width <  900 ?"Transactions": 'Get Started'} startedClick={()=>{
    navigate(width < 900 ? "/Transactions":"/app")
  }}/>
<br/>
<br/>

{width > 900 && <>

<br/>
<br/>
<br/>
</>}


<br/>
<div style={{maxWidth:1300,margin:"auto"}}>
<FaqsContent/>
</div>
<br/>

    </div>

   <Footer/>
   </>

      
  )
}

export default Faqs
