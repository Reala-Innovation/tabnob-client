import  { AppName } from './icon'
import "../styles/benefits.css";
function Benefit() {

const cards = [
  {
    icon: "/user.png",
    name: "Instant Bank Transfers",
    text: "Confirm the Bitcoin send; recipient’s bank is notified in seconds.",
  },
  {
  icon: "/spend.png",
  name: "Spend Without Selling",
  text: " Use your Bitcoin when you need cash without liquidating your entire stack.",
},
  {
    icon: "/zero.png",
    name: "No Hidden Fees ",
    text: "What you send is what they receive. We show the exact rate up front",
  },
  {
    icon: "/map.png",
    name: "Borderless & Simple",
    text: "Pay anyone across supported African countries — no accounts, no friction.",
  },
];

  return (
    <div style={{padding:16}} className='benefits'>
      <h3 data-aos="fade-in" 
         data-aos-offset="300"
     data-aos-duration="500"
      
      className='headingFont-h3' style={{padding:"0px 10px"}}><AppName/> advantage</h3>
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
