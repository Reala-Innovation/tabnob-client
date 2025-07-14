import React from 'react'
import Presenter from '../components/presenter'
import Nav from '../components/nav'
import Benefit from '../components/benefit'
import AboutUs from '../components/aboutUs'
import Faqs from '../components/faqs'
import Footer from '../Footer'

const Home:React.FC = () => {
  return (<>
  <div className='body'>
  <Nav/>
  <div style={{
    padding:10
  }}>
<Presenter/>
<Benefit/>

</div>
</div>
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
</div>
</>
  )
}

export default Home
