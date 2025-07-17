import  { AppName } from './icon'
import "../styles/benefits.css";
function Benefit() {

const cards = [
  {
    icon: "/user.png",
    name: "Send Without Signing Up",
    text: "Skip the sign-up process and start sending money instantly—no accounts, no delays.",
  },
  {
  icon: "/user.png",
  name: "Real-Time Delivery",
  text: "Transfers are processed instantly — no waiting, just fast confirmation to bank accounts.",
},
  {
    icon: "/zero.png",
    name: "Zero Fees, Always",
    text: "Send money without hidden charges — what you send is exactly what they receive.",
  },
  {
    icon: "/map.png",
    name: "Borderless Bank Transfers",
    text: "Send Bitcoin to any supported country with instant bank transfers—no limits, no hassle.",
  },
];

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
