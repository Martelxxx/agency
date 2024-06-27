import React from 'react'

function Maincontent() {
  return (
    <div>
      <div className='welcome'>
        <p><span>Welcome to Synapse Solutions</span></p>
        <p className='smallTalk'>Your partner in innovative software development.</p>
      </div>
      <div className='bodpic'></div>
      <div className='about'>
        <p><span>About Us</span></p>
        <p className='smallTalk'>At Synapse Solutions, we specialize in delivering cutting-edge software development services tailored to your business needs. With a team of experienced developers, we ensure your projects are handled with professionalism and expertise.</p>
      </div>
      <br />
      
      <div className='services'>  
        <p>Our Services</p>
      </div>
      <ul>
        <li className='first'><div className='opaque'><strong>Custom Software Development:</strong> Tailored solutions to meet your unique business requirements.</div></li>
        <li className='second'><div className='opaque'><strong>Web Development:</strong> Creating responsive and user-friendly websites.</div></li>
        <li className='third'><div className='opaque'><strong>Mobile App Development:</strong> Developing high-quality mobile applications for various platforms.</div></li>
        <li className='fourth'><div className='opaque'><strong>Data Analysis:</strong> Providing insightful data analysis to drive informed decisions.</div></li>
        <li className='fifth'><div className='opaque'><strong>Consulting:</strong> Expert advice to help you navigate the complex tech landscape.</div></li>
      </ul>
      <section id='contact' className='contact'>
<br />
      <div className='stats'>
        <div className='stat'>
          <p>100+</p>
          <p>Projects Completed</p>
        </div>
        <div className='stat'>
          <p>50+</p>
          <p>Happy Clients</p>
        </div>
        <div className='stat'>
          <p>10+</p>
          <p>Years of Experience</p>
        </div>
      </div>

        <h2>Contact Us</h2>
        <p>Have a project in mind? We'd love to hear from you.</p>
        <p>Email: info@synapsesolutions.com</p>
        <p>Phone: (123) 456-7890</p>
      </section>
    </div>
  );
}

export default Maincontent;