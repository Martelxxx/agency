import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Price from './Components/Pricing/price.jsx';
import SignIn from './Components/SignIn/signin.jsx';
import SignUp from './Components/SignUp/signup.jsx';
import AdminProfile from './Components/adminProfile/adminProfile.jsx';
import DevProfile from './Components/devProfile/devProfile.jsx';
import UpdateProject from './Components/UpdateForm/update.jsx';
import Inbox from './Components/Inbox/inbox.jsx';
import logo from './assets/agencyLogo.png';
import fb from './assets/fb.png';
import tw from './assets/x.png';
import ig from './assets/ig.png';
import li from './assets/lnkd.png';
import './App.css';
import Maincontent from './Components/MainContent/maincontent.jsx';

document.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollPosition / maxScroll;
  const rotationDegree = 3 * scrollFraction;

  document.documentElement.style.setProperty('--skew-deg', `${rotationDegree}deg`);
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
      // fetchProjects(storedUser.region); // Removed fetchProjects call
    }
  }, []);

  const updateProjectStatus = async (projectId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5010/api/project/update/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectStatus: newStatus }),
      });

      if (res.ok) {
        const updatedProject = await res.json();
        setProjects((prevProjects) => prevProjects.map((project) =>
          project._id === projectId ? updatedProject : project
        ));
      } else {
        console.error('Failed to update project status:', await res.json());
      }
    } catch (err) {
      console.error('Error updating project status:', err);
    }
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    // No need to fetch projects here since DevProfile will do it based on user.region
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
    setShowLogoutMessage(true);
    setTimeout(() => {
      setShowLogoutMessage(false);
      navigate('/');
    }, 3000);
  };

  return (
    <>
      <div className="nav-container">
  <nav>
    <div className="title"><Link to="/">Synapse Solutions</Link></div>
    <img src={logo} className="logo react" alt="React logo" />
    <ul>
      <li className="links">
        {isLoggedIn ? (
          <>
            <span className="msg">Welcome, {user?.username}!</span>
            <Link to="/" onClick={handleLogout}>Log Out</Link>
          </>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/pricing">Pricing</Link></li>
      <li><Link to="/">Contact</Link></li>
      {isLoggedIn && (
        <>
          <li><Link to="/inbox">Inbox</Link></li>
        </>
      )}
    </ul>
  </nav>
</div>
      {showLogoutMessage && <div>Logged out successfully!</div>}
      <Routes>
        <Route path="/" element={<Maincontent />} />
        <Route path="/pricing" element={<Price />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/adminProfile" element={<AdminProfile isLoggedIn={isLoggedIn} />} />
        <Route path="/devProfile" element={<DevProfile user={user} updateProjectStatus={updateProjectStatus} />} />
        <Route path="/updateProject" element={<UpdateProject />} />
        <Route path="/inbox" element={<Inbox user={user} />} />
      </Routes>
      <footer>
        <div className="footer-container">
          <div className="terms">
            <a href="#">Terms of Service</a>
            <a href="#"> Privacy Policy</a>
            <a href="#"> Sitemap</a>
          </div>
          <div className="footer-info">
            &copy; 2024 Synapse Solutions. All rights reserved.
          </div>
          <div className="footer-social">
            <div className="socials" style={{ width: '25px', height: '25px' }}>
              <img src={fb} style={{ width: '25px', height: '25px' }} alt="Facebook" />
            </div>
            <div className="socials" style={{ width: '25px', height: '25px' }}>
              <img src={tw} style={{ width: '25px', height: '25px' }} alt="Twitter" />
            </div>
            <div className="socials" style={{ width: '25px', height: '25px' }}>
              <img src={ig} style={{ width: '25px', height: '25px' }} alt="Instagram" />
            </div>
            <div className="socials" style={{ width: '25px', height: '25px' }}>
              <img src={li} style={{ width: '25px', height: '25px' }} alt="LinkedIn" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
