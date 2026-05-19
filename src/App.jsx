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
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'; // Replaced FavoriteIcon
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// ==========================================
// 1. SERVICE DETAILS PAGE (LIFE INSURANCE MATCHES VEHICLE/HEALTH STYLE)
// ==========================================
const ServiceDetails = ({ type }) => {
  // --- STATE FOR POPUP ---
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  
  // --- STATE FOR LIFE INSURANCE CATEGORIES ---
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Life insurance data with categories
  const lifeCategories = {
    "Endowment": [
      { name: "New Endowment", planNo: "714", ageRange: "8–50 yrs" },
      { name: "Jeevan Anand", planNo: "715", ageRange: "18–50 yrs" },
      { name: "Single Premium Endowment", planNo: "717", ageRange: "0–65 yrs" },
      { name: "Jeevan Lakshya", planNo: "733", ageRange: "18–50 yrs" },
      { name: "Jeevan Labh", planNo: "736", ageRange: "8–59 yrs" },
      { name: "Bima Jyoti", planNo: "760", ageRange: "0–60 yrs" },
      { name: "Nav Jeevan Shree (Limited)", planNo: "912", ageRange: "0–60 yrs" }
    ],
    "Moneyback": [
      { name: "Money Back (20 Year)", planNo: "720", ageRange: "13–50 yrs" },
      { name: "Money Back (25 Year)", planNo: "721", ageRange: "13–45 yrs" },
      { name: "Bima Shree", planNo: "748", ageRange: "8–55 yrs" },
      { name: "Bima Lakshmi", planNo: "881", ageRange: "18–50 yrs" }
    ],
    "Whole Life": [
      { name: "Jeevan Umang", planNo: "745", ageRange: "0–55 yrs" },
      { name: "Jeevan Utsav", planNo: "771", ageRange: "0–65 yrs" },
      { name: "Jeevan Utsav (Single)", planNo: "883", ageRange: "0–65 yrs" }
    ],
    "Child": [
      { name: "New Children’s Money Back", planNo: "732", ageRange: "0–12 yrs" },
      { name: "Jeevan Tarun", planNo: "734", ageRange: "0–12 yrs" },
      { name: "Amrit Baal", planNo: "774", ageRange: "0–13 yrs" }
    ],
    "Term": [
      { name: "New Jeevan Amar", planNo: "955", ageRange: "18–65 yrs" },
      { name: "YUVA TERM", planNo: "875", ageRange: "18–45 yrs" },
      { name: "Yuva Credit Life", planNo: "877", ageRange: "18–45 yrs" },
      { name: "Bima Kavach", planNo: "887", ageRange: "18–65 yrs" },
      { name: "Saral Jeevan Bima", planNo: "859", ageRange: "18–65 yrs" }
    ],
    "Annuity": [
      { name: "Jeevan Akshay-VII", planNo: "857", ageRange: "25–100 yrs" },
      { name: "New Jeevan Shanti", planNo: "758", ageRange: "30–79 yrs" },
      { name: "Smart Pension", planNo: "879", ageRange: "18–100 yrs" },
      { name: "Saral Pension", planNo: "862", ageRange: "40–80 yrs" }
    ],
    "ULIP": [
      { name: "Nivesh Plus", planNo: "749", ageRange: "0–70 yrs" },
      { name: "Index Plus", planNo: "873", ageRange: "0–60 yrs" },
      { name: "SIIP", planNo: "752", ageRange: "0–65 yrs" },
      { name: "New Pension Plus", planNo: "867", ageRange: "25–75 yrs" },
      { name: "Protection Plus", planNo: "886", ageRange: "18–65 yrs" }
    ],
    "Micro": [
      { name: "Micro Bachat", planNo: "751", ageRange: "18–55 yrs" },
      { name: "Jan Suraksha", planNo: "880", ageRange: "18–55 yrs" }
    ]
  };

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
        { name: "Star Health Assure", details: "The most popular family floater plan with recharge benefits." },
        { name: "Senior Citizen Red Carpet", details: "Special coverage for those aged 60+ without pre-medical screening." },
        { name: "Critical Illness Cover", details: "Lump sum payout for major illnesses like cancer or heart attack." }
      ]
    },
    life: {
      title: "Life Insurance",
      icon: <FamilyRestroomIcon style={{ fontSize: 60, color: 'white' }} />, // Updated icon
      desc: "Secure your family's financial future with the trust of LIC. Choose from a wide range of plans categorized by your needs.",
      categories: lifeCategories
    }
  };

  const data = content[type];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (type === 'life') {
      setSelectedCategory(null);
    }
  }, [type]);

  // --- HANDLERS FOR POPUP ---
  const handleInquireClick = (plan, categoryName) => {
    setSelectedPlan({ ...plan, category: categoryName });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', phone: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phone) {
      alert("Please fill in your Name and Phone number.");
      return;
    }

    const message = 
      `*Service:* ${data.title}\n` +
      `*Category:* ${selectedPlan.category}\n` +
      `*Plan:* ${selectedPlan.name} (Plan No: ${selectedPlan.planNo})\n` +
      `*Age Range:* ${selectedPlan.ageRange}\n` +
      `------------------\n` +
      `*Customer Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}`;

    const whatsappNumber = "919846086720"; 
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    handleClose();
  };

  // Render for vehicle/health (simple list) - same style as life will use
  const renderSimplePlans = () => (
    <div className="plans-container">
      <br /><br />
      <h3>Available Plans</h3>
      <div className="plans-list">
        {data.plans.map((plan, index) => (
          <div key={index} className="plan-card">
            <h4>{plan.name}</h4>
            <p>{plan.details}</p>
            <button 
              className="inquire-btn" 
              onClick={() => handleInquireClick(plan, data.title)}
            >
              Inquire Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Render for life insurance using the same card style
  const renderLifeInsurance = () => {
    if (!selectedCategory) {
      // Show category buttons styled like service cards
      return (
        <div className="plans-container">
          <br /><br />
          <h3>Select a Category</h3>
          <div className="services-grid" style={{ marginTop: '2rem' }}>
            {Object.keys(data.categories).map(cat => (
              <div key={cat} className="service-card" style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory(cat)}>
                <div className="icon"><FamilyRestroomIcon fontSize="inherit" /></div> {/* Updated icon */}
                <h3>{cat}</h3>
                <p>Click to view plans</p>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // Show plans of selected category using same plan-card style as vehicle/health
      const plans = data.categories[selectedCategory];
      return (
        <div className="plans-container">
          <br /><br />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <button onClick={() => setSelectedCategory(null)} className="back-btn" style={{ position: 'relative', display: 'inline-flex' }}>
              <ArrowBackIcon /> Back to Categories
            </button>
          </div>
          <h3>{selectedCategory} Plans</h3>
          <div className="plans-list">
            {plans.map((plan, idx) => (
              <div key={idx} className="plan-card">
                <h4>{plan.name} <span style={{ fontSize: '0.9rem', color: '#555' }}>(Plan No: {plan.planNo})</span></h4>
                <p><strong>Age Range:</strong> {plan.ageRange}</p>
                <button className="inquire-btn" onClick={() => handleInquireClick(plan, selectedCategory)}>
                  Inquire Now
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="details-page">
      <div className="details-header">
        <Link to="/" className="back-btn"><ArrowBackIcon /> Back</Link>
        {data.icon}
        <h2>{data.title}</h2>
        <p>{data.desc}</p>
      </div>

      {type === 'life' ? renderLifeInsurance() : renderSimplePlans()}

      {/* --- POPUP DIALOG --- */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: '#003399', color: 'white' }}>
          Inquire: {selectedPlan?.name}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: '20px !important' }}>
          <DialogContentText>
            Please enter your details. We will send this inquiry directly to Insurance Advisor.
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
// 2. HOME PAGE (UPDATED WITH FamilyRestroomIcon)
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
           <Link to="/life-insurance" className="service-card-link">
            <div className="service-card">
              <div className="icon"><FamilyRestroomIcon fontSize="inherit"/></div> {/* Updated icon */}
              <h3>Life Insurance</h3>
              <p>Term Plans, Savings & Pension.</p>
              &nbsp;
              <p style={{ fontWeight: 'bold' }}>Click to view plans</p>
            </div>
          </Link>
          
          <Link to="/vehicle-insurance" className="service-card-link">
            <div className="service-card">
              <div className="icon"><DirectionsCarIcon fontSize="inherit"/></div>
              <h3>Vehicle Insurance</h3>
              <p>Car, Bike, and Commercial Vehicles.</p>
              &nbsp;
              <p style={{ fontWeight: 'bold' }}>Click to view plans</p>
            </div>
          </Link>

          <Link to="/health-insurance" className="service-card-link">
            <div className="service-card">
              <div className="icon"><HealthAndSafetyIcon fontSize="inherit"/></div>
              <h3>Health Insurance</h3>
              <p>Family Health & Critical Illness Covers.</p>
              &nbsp;
              <p style={{ fontWeight: 'bold' }}>Click to view plans</p>
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
          <p>Trusted by hundreds of families for over 20 years.</p>
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
            Edappal, Malappuram dist, Kerala</p>
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
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </section>
    </>
  );
};

// ==========================================
// 3. MAIN APP COMPONENT
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
        <p>© 2026 Insurance Hub. All rights reserved.</p>
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