import React from 'react'
import "../styles/icon.css"
import { useNavigate } from 'react-router-dom'
const Icon:React.FC = () => {
  const navigate=useNavigate();
  return (
    <div onClick={()=>{
      navigate("/")
    }}>
      <div className='icon'>
        <img src='/logo2.png' />
        <span style={{padding:3}}></span>
        <span className='tap'>Tap</span><span className='nob'>nob</span></div>

    </div>
  )
}

export const AppName:React.FC = () => {
  return (
      <span className='icon'>
        <span className='tap'>Tap</span><span className='nob'>nob</span></span>
  )
}

export default Icon
