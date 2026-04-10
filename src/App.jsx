import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// ✅ FIXED IMPORT
import { Analytics } from "@vercel/analytics/react"

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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


// ==========================================
// SERVICE DETAILS PAGE
// ==========================================
const ServiceDetails = ({ type }) => {
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

  const handleInquireClick = (plan) => {
    setSelectedPlan(plan);
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
      `*Plan Interest:* ${selectedPlan.name}\n` +
      `------------------\n` +
      `*Customer Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}`;

    const whatsappNumber = "919846086720"; 
    
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
        <h3>Available Plans</h3>
        <div className="plans-list">
          {data.plans.map((plan, index) => (
            <div key={index} className="plan-card">
              <h4>{plan.name}</h4>
              <p>{plan.details}</p>
              <button 
                className="inquire-btn" 
                onClick={() => handleInquireClick(plan)}
              >
                Inquire Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Inquire: {selectedPlan?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your details to send via WhatsApp.
          </DialogContentText>
          <TextField name="name" label="Your Name" fullWidth onChange={handleChange} />
          <TextField name="phone" label="Phone Number" fullWidth onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


// ==========================================
// HOME PAGE
// ==========================================
const Home = () => {
  return <h2>Home Page</h2>;
};


// ==========================================
// MAIN APP
// ==========================================
function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicle-insurance" element={<ServiceDetails type="vehicle" />} />
        <Route path="/health-insurance" element={<ServiceDetails type="health" />} />
        <Route path="/life-insurance" element={<ServiceDetails type="life" />} />
      </Routes>

      {/* ✅ ADDED ANALYTICS */}
      <Analytics />
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;