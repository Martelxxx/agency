import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Price from './Components/Pricing/price.jsx';
import SignIn from './Components/SignIn/signin.jsx';
import SignUp from './Components/SignUp/signup.jsx';
import logo from './assets/agencyLogo.png'
import fb from './assets/fb.png'
import tw from './assets/x.png'
import ig from './assets/ig.png'
import li from './assets/lnkd.png'
import './App.css'
import Maincontent from './Components/MainContent/maincontent.jsx';

document.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollPosition / maxScroll;
  const rotationDegree = 3 * scrollFraction; // Adjust this calculation as needed

  // Update the CSS variable on the root element
  document.documentElement.style.setProperty('--skew-deg', `${rotationDegree}deg`);
});

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className='nav-container'>
        <nav>
          <div className='title'><Link to='/'>Synapse Solutions</Link></div>
          <img src={logo} className="logo react" alt="React logo" />
          <ul>
            <li><Link to='/login'>Log In</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/pricing'>Pricing</Link></li>
            <li><Link to='/'>Contact</Link></li>
          </ul>
        </nav>
      </div>
  
      <Routes>
        <Route path="/" element={<Maincontent />} />
        <Route path="/pricing" element={<Price />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        {/* Define other routes here */}
      </Routes>
      <footer>
        <div className='footer-container'>
          <div className='terms'>
            <a href='#'>Terms of Service</a>
            <a href='#'> Privacy Policy</a>
            <a href='#'> Sitemap</a>
          </div>
          <div className='footer-info'>
            &copy; 2024 Synapse Solutions. All rights reserved.
          </div>
          <div className='footer-social'>
            <div className='socials' style={{ width: '25px', height: '25px' }}>
              <img src={fb} style={{ width: '25px', height: '25px' }} alt="Facebook" />
            </div>
            <div className='socials' style={{ width: '25px', height: '25px' }}>
              <img src={tw} style={{ width: '25px', height: '25px' }} alt="Twitter" />
            </div>
            <div className='socials' style={{ width: '25px', height: '25px' }}>
              <img src={ig} style={{ width: '25px', height: '25px' }} alt="Instagram" />
            </div>
            <div className='socials' style={{ width: '25px', height: '25px' }}>
              <img src={li} style={{ width: '25px', height: '25px' }} alt="LinkedIn" />
            </div>
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
  
    
}

export default App