import { FaAngleDown } from "react-icons/fa"; 
import React, { useState } from 'react'
import "../styles/faqs.css";
import { faqs } from '../faqs.data';

const Faqs:React.FC = () => {
      const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='faqs-container'>
      <h3 data-aos={"fade-up"} className='headingFont-h3'>
        Frequently Asked Questions
      </h3>
        <span data-aos={"fade-up"}>Still have questions? <a style={{color:"var(--gold)",fontWeight:"bold"}} href="#">Get In Touch</a></span>
 {faqs.map((faq, index) => (
        <div
      
          key={index}
          className={`faq-item ${activeIndex === index ? 'show' : ''} d-flex align-items-center justify-content-between`}
          onClick={() => toggle(index)}
        >
          
          <div><h4>{faq.question}</h4>
          <p className="faq-answer">{faq.answer}</p>
</div>
<FaAngleDown className={`${activeIndex === index ? "icon-up":""}`} size={30}/>
        </div>
      ))}


    </div>
  )
}

export default Faqs
