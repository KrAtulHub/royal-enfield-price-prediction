const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('.'));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the test page
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'test_models.html'));
});

// Test model endpoint
app.post('/test-model', (req, res) => {
    const { model, year, presentPrice, kmsDriven, owner, transmission } = req.body;
    
    // Validate inputs
    if (!model || !year || !presentPrice || !kmsDriven || !owner || !transmission) {
        return res.json({
            success: false,
            message: 'Missing required fields'
        });
    }
    
    // Calculate bike age
    const currentYear = new Date().getFullYear();
    const bikeAge = currentYear - parseInt(year);
    
    // Simple prediction algorithm for testing
    const ageFactor = 1 - (bikeAge * 0.08);
    const kmsFactor = 1 - (parseInt(kmsDriven) / 100000 * 0.2);
    
    // Model-specific adjustments
    const modelMultipliers = {
        "Classic 350": 1.0,
        "Bullet 350": 1.05,
        "Himalayan": 0.95,
        "Meteor 350": 0.98,
        "Hunter 350": 0.97,
        "Continental GT 650": 1.15,
        "INT 650": 1.12,
        "Scram 411": 0.96,
        "Guerrilla 450": 1.05,
        "Himalayan 450": 1.08,
        "Super Meteor 650": 1.18,
        "Bullet 650": 1.14,
        "Goan Classic 350": 0.98,
        "Bear 650": 1.16,
        "Shotgun 650": 1.13,
        "Scrambler 450": 1.02,
        "Himalayan 750": 1.25,
        "Flying Flea": 0.92,
        "Interceptor 650": 1.17
    };
    
    const multiplier = modelMultipliers[model] || 1.0;
    let predictedPrice = parseFloat(presentPrice) * ageFactor * kmsFactor * multiplier;
    predictedPrice = Math.max(predictedPrice, parseFloat(presentPrice) * 0.2);
    
    res.json({
        success: true,
        message: 'Model test successful',
        predictedPrice: predictedPrice
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Royal Enfield Price Predictor is running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});