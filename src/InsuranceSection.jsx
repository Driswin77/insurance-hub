import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Chip
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// 1. Dummy Data for Insurance Plans
const insurancePlans = [
  {
    id: 1,
    title: "Eco-Drive Protect",
    coverage: "Full Coverage + Eco Penalty Refunds",
    price: "₹1,200/year",
    description: "Ideal for daily commuters who want protection against traffic fines and accidents."
  },
  {
    id: 2,
    title: "Basic Liability",
    coverage: "Third-party Damages Only",
    price: "₹800/year",
    description: "The minimum legal requirement for riding on public roads."
  },
  {
    id: 3,
    title: "Premium Shield",
    coverage: "Zero Depreciation + 24/7 Roadside Assist",
    price: "₹2,500/year",
    description: "Complete peace of mind with engine protection and consumable cover."
  }
];

export default function InsuranceSection() {
  // State for Modal (Dialog) visibility
  const [open, setOpen] = useState(false);
  
  // State to track WHICH plan was clicked
  const [selectedPlan, setSelectedPlan] = useState(null);

  // State for user inputs
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  // --- HANDLERS ---

  // Open the modal and save the plan details
  const handleInquireClick = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  // Close the modal and reset data
  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', phone: '' }); // Optional: clear form on close
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle Form Submission -> Send to WhatsApp
  const handleSubmit = () => {
    // 1. Validation (Optional but recommended)
    if (!formData.name || !formData.phone) {
      alert("Please fill in all details.");
      return;
    }

    // 2. Construct the Message
    // \n creates a new line in the message
    const message = 
      `*New Insurance Inquiry* 📋\n\n` +
      `*Plan:* ${selectedPlan.title}\n` +
      `*Price:* ${selectedPlan.price}\n` +
      `------------------\n` +
      `*Customer Name:* ${formData.name}\n` +
      `*Phone Number:* ${formData.phone}`;

    // 3. Your Father's WhatsApp Number (Format: CountryCode + Number, no + symbol)
    // Example: 919876543210
    const fathersNumber = "919846086720"; 

    // 4. Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${fathersNumber}?text=${encodeURIComponent(message)}`;

    // 5. Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // 6. Close the modal
    handleClose();
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Available Insurance Plans
      </Typography>

      <Grid container spacing={3}>
        {insurancePlans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {plan.title}
                </Typography>
                <Chip label={plan.price} color="primary" variant="outlined" sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  {plan.description}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>
                  Coverage: {plan.coverage}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="large" 
                  variant="contained" 
                  fullWidth 
                  onClick={() => handleInquireClick(plan)}
                >
                  Inquire Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* --- INQUIRY MODAL (DIALOG) --- */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Inquire about {selectedPlan?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please enter your details below. We will send the inquiry directly to our agent via WhatsApp.
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
            type="tel"
            fullWidth
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="success"
            startIcon={<WhatsAppIcon />}
          >
            Send to WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}