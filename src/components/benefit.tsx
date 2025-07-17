import  { AppName } from './icon'
import "../styles/benefits.css";
function Benefit() {

  const cards=[
    {
      icon:"/user.png",
      name:"No account creation",
      text:"Skip the lengthy sign-up process and start sending money instantly—no registrations, no delays.",
    },
   {
    icon: "/kyc.jpeg",
    name: "No KYC Required",
    text: "Enjoy private, secure transactions without ID checks or document uploads.",
  },
  {
    icon: "/zero.png",
    name: "Zero Transaction Fees",
    text: "Send money without hidden charges — what you send is exactly what they receive.",
  },
  {
    icon: "/map.png",
    name: "No Location Limits",
    text: "Send Bitcoin to Instant Bank Transfer across supported countries, with no borders or bank restrictions.",
  }
]
  return (
    <div style={{padding:16}} className='benefits'>
      <h3 data-aos="fade-in" 
         data-aos-offset="300"
     data-aos-duration="500"
      
      className='headingFont-h3' style={{padding:"0px 10px"}}>The <AppName/> advantage</h3>
      <div className='card-container d-flex' style={{marginTop:-24}}>

{cards.map((e,i)=>(<div key={i} data-aos={`${i%2==0 ? "fade-left":"fade-right"}`} className='benefit-card'>
<img src={`${e.icon}`}/>
<br/>
<b>{e.name}</b>
<br/>
<span>{e.text}</span>
</div>))}


      </div>
    </div>
  )
}

export default Benefit
