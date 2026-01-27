import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- NEW IMPORTS FOR POPUP ---
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  TextField, 
  DialogActions, 
  Button 
} from '@mui/material';

// --- IMAGES ---
import logo from './logo.png'; 
import licLogo from './lic.png';
import starLogo from './star.png';
import newIndiaLogo from './newindia.png';
import unitedLogo from './united.png';

// --- ICONS ---
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // Added WhatsApp Icon

// ==========================================
// 1. SERVICE DETAILS PAGE (UPDATED)
// ==========================================
const ServiceDetails = ({ type }) => {
  // --- STATE FOR POPUP ---
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const content = {
    vehicle: {
      title: "Vehicle Insurance",
      icon: <DirectionsCarIcon style={{ fontSize: 60, color: 'white' }} />,
      desc: "Drive with peace of mind. Comprehensive coverage for all vehicle types.",
      plans: [
        { name: "Two Wheeler Package", details: "Covers accidental damage, theft, and third-party liability." },
        { name: "Private Car Comprehensive", details: "Complete protection including own damage and passenger cover." },
        { name: "Commercial Vehicle", details: "Specialized plans for taxis, trucks, and goods carrying vehicles." }
      ]
    },
    health: {
      title: "Health Insurance",
      icon: <HealthAndSafetyIcon style={{ fontSize: 60, color: 'white' }} />,
      desc: "Protect your family's health with cashless treatment at top hospitals.",
      plans: [
        { name: "Star Health Optima", details: "The most popular family floater plan with recharge benefits." },
        { name: "Senior Citizen Red Carpet", details: "Special coverage for those aged 60+ without pre-medical screening." },
        { name: "Critical Illness Cover", details: "Lump sum payout for major illnesses like cancer or heart attack." }
      ]
    },
    life: {
      title: "Life Insurance",
      icon: <FavoriteIcon style={{ fontSize: 60, color: 'white' }} />,
      desc: "Secure your family's financial future with the trust of LIC.",
      plans: [
        { name: "LIC Jeevan Anand", details: "Double benefit of protection and savings." },
        { name: "Term Assurance", details: "High life cover at an affordable premium." },
        { name: "Pension Plans", details: "Guaranteed income for a worry-free retirement." }
      ]
    },
  };

  const data = content[type];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- HANDLERS FOR POPUP ---
  const handleInquireClick = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', phone: '' }); // Reset form on close
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phone) {
      alert("Please fill in your Name and Phone number.");
      return;
    }

    // Construct the WhatsApp Message
    const message = 
      `*New Inquiry from Website* 📋\n\n` +
      `*Service:* ${data.title}\n` +
      `*Plan Interest:* ${selectedPlan.name}\n` +
      `------------------\n` +
      `*Customer Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}`;

    // Target Number (Your Father's Number)
    const whatsappNumber = "919846086720"; 
    
    // Create Link and Open
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    handleClose();
  };

  return (
    <div className="details-page">
      <div className="details-header">
        <Link to="/" className="back-btn"><ArrowBackIcon /> Back</Link>
        {data.icon}
        <h2>{data.title}</h2>
        <p>{data.desc}</p>
      </div>
      
      <div className="plans-container">
        <br></br>
        <br></br>
        <h3>Available Plans</h3>
        <div className="plans-list">
          {data.plans.map((plan, index) => (
            <div key={index} className="plan-card">
              <h4>{plan.name}</h4>
              <p>{plan.details}</p>
              {/* UPDATED BUTTON TO OPEN POPUP */}
              <button 
                className="inquire-btn" 
                onClick={() => handleInquireClick(plan)}
                style={{ border: 'none', cursor: 'pointer', fontSize: '1rem', fontFamily: 'inherit' }}
              >
                Inquire Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- POPUP DIALOG --- */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: '#003399', color: 'white' }}>
          Inquire: {selectedPlan?.name}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: '20px !important' }}>
          <DialogContentText>
            Please enter your details. We will send this inquiry directly to our WhatsApp agent.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Your Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone Number"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="success" 
            startIcon={<WhatsAppIcon />}
          >
            Send WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// ==========================================
// 2. HOME PAGE (UNCHANGED)
// ==========================================
const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <header id="home" className="hero-section">
        <div className="hero-content">
          <h2>Welcome to Insurance Hub</h2>
          <p className="tagline">"Assurance in every step"</p>
          <div className="hero-buttons">
            <a href="tel:09846086720" className="primary-btn">📞 Call Now</a>
            <a href="#contact" className="secondary-btn">📍 Visit Office</a>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="services-section">
        <h2>Our Services</h2>
        <p className="section-sub">Comprehensive protection for what matters most</p>
        <div className="services-grid">
          <Link to="/vehicle-insurance" className="service-card-link">
            <div className="service-card">
              <div className="icon"><DirectionsCarIcon fontSize="inherit"/></div>
              <h3>Vehicle Insurance</h3>
              <p>Car, Bike, and Commercial Vehicles.</p>
            </div>
          </Link>

          <Link to="/health-insurance" className="service-card-link">
            <div className="service-card">
              <div className="icon"><HealthAndSafetyIcon fontSize="inherit"/></div>
              <h3>Health Insurance</h3>
              <p>Family Health & Critical Illness Covers.</p>
            </div>
          </Link>

          <Link to="/life-insurance" className="service-card-link">
            <div className="service-card">
              <div className="icon"><FavoriteIcon fontSize="inherit"/></div>
              <h3>Life Insurance</h3>
              <p>Term Plans, Savings & Pension.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="partners-section">
        <h2>We Work With</h2>
        <div className="partners-grid">
          <div className="partner-card">
            <img src={licLogo} alt="LIC" className="partner-logo" />
            <h3>LIC</h3>
          </div>
          <div className="partner-card">
            <img src={starLogo} alt="Star Health" className="partner-logo" />
            <h3>Star Health</h3>
          </div>
          <div className="partner-card">
            <img src={newIndiaLogo} alt="New India Assurance" className="partner-logo" />
            <h3>New India</h3>
          </div>
          <div className="partner-card">
            <img src={unitedLogo} alt="United India" className="partner-logo" />
            <h3>United India</h3>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="rating-box">
          <h3>Nandakumar TK</h3>
          <p><strong>Insurance Advisor</strong></p>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <p>Trusted by hundreds of families in Edappal for over 20 years.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-container">
          <div className="address-details">
            <h3>Get In Touch</h3>
            
            <p><LocationOnIcon style={{verticalAlign: 'middle', marginRight: '10px'}}/> 
            <strong>Address:</strong><br/>
            Near Panchayath Office<br/>
            Parappuram, Kadanchery<br/>
            Edappal, Kerala</p>
            
            <br />
            
            <p><EmailIcon style={{verticalAlign: 'middle', marginRight: '10px'}}/> 
            <strong>Email:</strong><br/>
            <a href="mailto:nandankadanchery.tk@gmail.com">nandankadanchery.tk@gmail.com</a></p>
            
            <br />
            
            <p><PhoneIcon style={{verticalAlign: 'middle', marginRight: '10px'}}/> 
            <strong>Phone:</strong><br/>
            <a href="tel:09846086720">98460 86720</a> <br/>
            <a href="tel:09400686720">94006 86720</a> <br/>
            <a href="tel:09846224761">98462 24761</a></p>
          </div>
          
          <div className="map-placeholder">
            <iframe 
              title="Insurance Hub Location"
              src="https://maps.google.com/maps?q=INSURANCE+HUB+Near+Kalady+Panchayath+office+Edappal+Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy">
            </iframe>
          </div>
        </div>
      </section>
    </>
  );
};

// ==========================================
// 3. MAIN APP COMPONENT (UNCHANGED)
// ==========================================
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">
          <img src={logo} alt="Insurance Hub Logo" className="logo-img" />
          <div>
            <h1>INSURANCE HUB</h1>
          </div>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><a href="/#services">Services</a></li>
          <li><a href="/#partners">Partners</a></li>
          <li><a href="/#contact">Contact</a></li>
          <li><a href="tel:09846086720" className="call-btn">Call Now</a></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicle-insurance" element={<ServiceDetails type="vehicle" />} />
        <Route path="/health-insurance" element={<ServiceDetails type="health" />} />
        <Route path="/life-insurance" element={<ServiceDetails type="life" />} />
      </Routes>

      <footer>
        <p>© 2026 Insurance Hub Edappal. All rights reserved.</p>
      </footer>
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;