import React from 'react'
import Presenter from '../components/presenter'
import Nav from '../components/nav'

const Home:React.FC = () => {
  return (<>
  <Nav/>
  <div style={{
    padding:10
  }}>
<Presenter/>
</div>
</>
  )
}

export default Home
