// Global variable to store model data
let modelData = null;

// Load model data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadModelData();
    setupFormDefaults();
});

// Load model data from JSON file
async function loadModelData() {
    try {
        const response = await fetch('model_data.json');
        modelData = await response.json();
        console.log('Model data loaded successfully');
        console.log('Available models:', Object.keys(bikeInfo));
        if (modelData && modelData.mappings && modelData.mappings.model_mapping) {
            console.log('Model mappings:', modelData.mappings.model_mapping);
            // Verify all models are present in mappings
            const htmlModels = [
                "Classic 350", "Bullet 350", "Himalayan", "Meteor 350", "Hunter 350",
                "Continental GT 650", "INT 650", "Scram 411", "Guerrilla 450", "Himalayan 450",
                "Super Meteor 650", "Bullet 650", "Goan Classic 350", "Bear 650", "Shotgun 650",
                "Scrambler 450", "Himalayan 750", "Flying Flea", "Interceptor 650"
            ];
            
            const missingModels = [];
            htmlModels.forEach(model => {
                if (!modelData.mappings.model_mapping.hasOwnProperty(model)) {
                    missingModels.push(model);
                }
            });
            
            if (missingModels.length > 0) {
                console.warn('Missing models in JSON mappings:', missingModels);
            } else {
                console.log('All models are present in JSON mappings');
            }
        }
    } catch (error) {
        console.error('Error loading model data:', error);
        // Fallback to simple prediction if model data can't be loaded
        modelData = null;
    }
}

// Model information with pros and cons
const bikeInfo = {
    "Classic 350": {
        pros: ["Timeless design", "Great build quality", "Comfortable for long rides", "Good resale value"],
        cons: ["Heavy weight", "Less powerful compared to newer models", "Basic features"]
    },
    "Bullet 350": {
        pros: ["Iconic design", "Very comfortable seating", "Excellent build quality", "Unique thump sound"],
        cons: ["Heavy and difficult to maneuver", "Low power output", "High maintenance cost"]
    },
    "Himalayan": {
        pros: ["Adventure touring capability", "Upright riding position", "Good ground clearance", "Affordable adventure bike"],
        cons: ["Less powerful engine", "Basic features", "Not ideal for highway cruising"]
    },
    "Meteor 350": {
        pros: ["Modern cruiser design", "Powerful engine", "Comfortable for city and highway", "Good features"],
        cons: ["Higher price point", "Less luggage space", "Not suitable for off-roading"]
    },
    "Hunter 350": {
        pros: ["Retro cafe racer design", "Lightweight and agile", "Fuel efficient", "Affordable price"],
        cons: ["Less comfortable for long rides", "Limited touring capability", "Basic instrumentation"]
    },
    "Continental GT 650": {
        pros: ["Premium cafe racer design", "Powerful 650cc engine", "Excellent performance", "High-quality components"],
        cons: ["Higher price point", "Less practical for daily commuting", "Requires more maintenance"]
    },
    "INT 650": {
        pros: ["Versatile design", "Strong 650cc engine", "Good for both city and touring", "Modern features"],
        cons: ["Higher cost than 350cc models", "More complex maintenance", "Heavier than 350cc bikes"]
    },
    "Scram 411": {
        pros: ["Adventure styling", "Good ground clearance", "Lightweight", "Fuel efficient"],
        cons: ["Less powerful engine", "Limited luggage capacity", "Basic features"]
    },
    "Guerrilla 450": {
        pros: ["Adventure touring focus", "Modern engine technology", "Good performance", "Advanced features"],
        cons: ["Higher price", "More complex maintenance", "Less proven track record"]
    },
    "Himalayan 450": {
        pros: ["Upgraded adventure bike", "More powerful engine", "Improved performance", "Modern features"],
        cons: ["Higher cost", "More maintenance requirements", "Heavier than previous model"]
    },
    "Super Meteor 650": {
        pros: ["Powerful 650cc engine", "Modern cruiser design", "Excellent performance", "Premium components"],
        cons: ["Higher price point", "Heavier weight", "More complex maintenance"]
    },
    "Bullet 650": {
        pros: ["Iconic design with modern engine", "Powerful 650cc motor", "Improved performance", "Classic aesthetics"],
        cons: ["Higher cost than 350cc Bullet", "Heavier weight", "More maintenance required"]
    },
    "Goan Classic 350": {
        pros: ["Unique styling", "Classic design with modern touches", "Good build quality", "Distinctive appearance"],
        cons: ["Limited availability", "Specialized market", "May have lower resale value"]
    },
    "Bear 650": {
        pros: ["Powerful 650cc engine", "Sturdy build", "Good for touring", "Premium components"],
        cons: ["Higher price", "Heavy weight", "More complex maintenance"]
    },
    "Shotgun 650": {
        pros: ["Unique styling", "Powerful engine", "Distinctive design", "Premium features"],
        cons: ["Niche appeal", "Higher cost", "Specialized maintenance"]
    },
    "Scrambler 450": {
        pros: ["Adventure styling", "Modern engine", "Good ground clearance", "Versatile design"],
        cons: ["Less powerful than 650cc models", "Limited luggage space", "Specialized market"]
    },
    "Himalayan 750": {
        pros: ["Most powerful Royal Enfield engine", "Excellent performance", "Advanced features", "Premium build"],
        cons: ["Highest price point", "Most complex maintenance", "Heaviest model"]
    },
    "Flying Flea": {
        pros: ["Unique compact design", "Lightweight", "Fuel efficient", "Distinctive styling"],
        cons: ["Limited power", "Very specialized use", "Niche market appeal"]
    },
    "Interceptor 650": {
        pros: ["Classic retro design", "Powerful 650cc engine", "Good performance", "Premium components"],
        cons: ["Higher price", "More maintenance", "Heavier than 350cc models"]
    }
};

// Form submission handler
document.getElementById('predictionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    try {
        // Show loading indicator
        const predictBtn = document.querySelector('.predict-btn');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const originalBtnText = predictBtn.innerHTML;
        
        predictBtn.disabled = true;
        loadingIndicator.style.display = 'inline-block';
        
        // Get form values
        const model = document.getElementById('model').value;
        const year = parseInt(document.getElementById('year').value);
        const presentPrice = parseFloat(document.getElementById('presentPrice').value);
        const kmsDriven = parseInt(document.getElementById('kmsDriven').value);
        const owner = document.getElementById('owner').value;
        const transmission = document.getElementById('transmission').value;
        
        // Validate inputs
        if (!model || !year || !presentPrice || !kmsDriven || !owner || !transmission) {
            alert('Please fill in all fields');
            resetLoadingState(predictBtn, loadingIndicator, originalBtnText);
            return;
        }
        
        console.log('Selected model:', model);
        
        // Calculate bike age
        const currentYear = new Date().getFullYear();
        const bikeAge = currentYear - year;
        
        // Predict price using loaded model or fallback
        let predictedPrice;
        if (modelData && modelData.model && modelData.model.coef) {
            predictedPrice = predictPriceWithModel(model, bikeAge, kmsDriven, presentPrice, owner, transmission);
        } else {
            // Fallback to simple prediction algorithm
            predictedPrice = predictPriceFallback(model, bikeAge, kmsDriven, presentPrice);
        }
        
        // Display results
        displayResults(model, year, presentPrice, kmsDriven, owner, transmission, predictedPrice, bikeAge);
        
        // Display model information
        displayModelInfo(model);
        
        // Display insights
        displayInsights(bikeAge, kmsDriven);
        
        // Reset loading state
        resetLoadingState(predictBtn, loadingIndicator, originalBtnText);
    } catch (error) {
        console.error('Error in form submission:', error);
        alert('An error occurred while processing your request. Please try again.');
        
        // Reset loading state
        const predictBtn = document.querySelector('.predict-btn');
        const loadingIndicator = document.getElementById('loadingIndicator');
        resetLoadingState(predictBtn, loadingIndicator, '<i class="fas fa-calculator"></i> Predict Price');
    }
});

// Reset loading state
function resetLoadingState(button, loadingIndicator, originalText) {
    button.disabled = false;
    loadingIndicator.style.display = 'none';
    if (originalText) {
        button.innerHTML = originalText;
    }
}

// Predict price using the trained model
function predictPriceWithModel(model, bikeAge, kmsDriven, presentPrice, owner, transmission) {
    try {
        console.log('Using model prediction for:', model);
        
        // Check if model exists in mappings
        if (!modelData.mappings.model_mapping.hasOwnProperty(model)) {
            console.warn('Model not found in mappings, using fallback:', model);
            return predictPriceFallback(model, bikeAge, kmsDriven, presentPrice);
        }
        
        // Encode categorical variables
        const modelEncoded = modelData.mappings.model_mapping[model];
        const ownerEncoded = modelData.mappings.owner_mapping[owner] || 0;
        const transmissionEncoded = modelData.mappings.transmission_mapping[transmission] || 0;
        
        console.log('Encoded values:', {modelEncoded, ownerEncoded, transmissionEncoded});
        
        // Create feature array
        const features = [
            modelEncoded,
            bikeAge,
            kmsDriven,
            ownerEncoded,
            transmissionEncoded,
            presentPrice
        ];
        
        console.log('Features:', features);
        
        // Calculate prediction using linear regression formula: y = intercept + coef * features
        let prediction = modelData.model.intercept;
        for (let i = 0; i < modelData.model.coef.length; i++) {
            prediction += modelData.model.coef[i] * features[i];
        }
        
        console.log('Model prediction result:', prediction);
        
        // Ensure prediction is reasonable
        if (prediction < 0) {
            console.warn('Negative prediction, using fallback');
            return predictPriceFallback(model, bikeAge, kmsDriven, presentPrice);
        }
        
        return prediction;
    } catch (error) {
        console.error('Error in model prediction:', error);
        // Fallback to simple prediction
        return predictPriceFallback(model, bikeAge, kmsDriven, presentPrice);
    }
}

// Simple price prediction function (fallback)
function predictPriceFallback(model, bikeAge, kmsDriven, presentPrice) {
    console.log('Using fallback prediction for:', model);
    
    // Base depreciation factors
    let ageFactor = 1 - (bikeAge * 0.08);
    let kmsFactor = 1 - (kmsDriven / 100000 * 0.2);
    
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
    
    // Calculate predicted price
    let predictedPrice = presentPrice * ageFactor * kmsFactor * multiplier;
    
    // Ensure price doesn't go below a reasonable minimum
    predictedPrice = Math.max(predictedPrice, presentPrice * 0.2);
    
    console.log('Fallback prediction result:', predictedPrice);
    
    return predictedPrice;
}

// Display prediction results
function displayResults(model, year, presentPrice, kmsDriven, owner, transmission, predictedPrice, bikeAge) {
    console.log('Displaying results for:', model);
    
    try {
        // Show result card
        const resultCard = document.getElementById('resultCard');
        if (resultCard) {
            resultCard.style.display = 'block';
            
            // Update values
            document.getElementById('predictedPrice').textContent = predictedPrice.toFixed(2);
            
            const depreciation = ((presentPrice - predictedPrice) / presentPrice) * 100;
            document.getElementById('depreciationValue').textContent = depreciation.toFixed(1) + '%';
            
            const valueLoss = presentPrice - predictedPrice;
            document.getElementById('valueLoss').textContent = '₹ ' + valueLoss.toFixed(2) + ' Lakhs';
            
            document.getElementById('resultModel').textContent = model;
            document.getElementById('resultAge').textContent = bikeAge + ' years';
            document.getElementById('resultKms').textContent = kmsDriven.toLocaleString() + ' km';
            document.getElementById('resultOwner').textContent = owner;
            
            // Scroll to results
            resultCard.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error('Result card element not found');
        }
    } catch (error) {
        console.error('Error displaying results:', error);
        alert('Error displaying results. Please try again.');
    }
}

// Display model information
function displayModelInfo(model) {
    console.log('Displaying model info for:', model);
    
    // Check if model info exists
    if (!bikeInfo.hasOwnProperty(model)) {
        console.warn('No info found for model:', model);
        // Hide model info card if no info available
        document.getElementById('modelInfoCard').style.display = 'none';
        return;
    }
    
    try {
        // Show model info card
        document.getElementById('modelInfoCard').style.display = 'block';
        document.getElementById('modelName').textContent = model;
        
        // Clear previous lists
        const prosList = document.getElementById('prosList');
        const consList = document.getElementById('consList');
        prosList.innerHTML = '';
        consList.innerHTML = '';
        
        // Add pros
        if (bikeInfo[model] && bikeInfo[model].pros && Array.isArray(bikeInfo[model].pros)) {
            bikeInfo[model].pros.forEach(pro => {
                const li = document.createElement('li');
                li.textContent = pro;
                prosList.appendChild(li);
            });
        }
        
        // Add cons
        if (bikeInfo[model] && bikeInfo[model].cons && Array.isArray(bikeInfo[model].cons)) {
            bikeInfo[model].cons.forEach(con => {
                const li = document.createElement('li');
                li.textContent = con;
                consList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error displaying model info for:', model, error);
        // Hide model info card if there's an error
        document.getElementById('modelInfoCard').style.display = 'none';
    }
}

// Display insights
function displayInsights(bikeAge, kmsDriven) {
    console.log('Displaying insights');
    
    try {
        // Show insights card
        document.getElementById('insightsCard').style.display = 'block';
        
        // Age insight
        let ageInsightText = '';
        if (bikeAge <= 2) {
            ageInsightText = 'New bikes generally have higher resale value and lower depreciation.';
        } else if (bikeAge <= 5) {
            ageInsightText = 'Bikes with moderate age have moderate depreciation. Consider selling soon for better value.';
        } else {
            ageInsightText = 'Older bikes have significant depreciation. You might want to consider keeping it for personal use.';
        }
        document.getElementById('ageInsightText').textContent = ageInsightText;
        
        // Kms driven insight
        let kmsInsightText = '';
        if (kmsDriven < 10000) {
            kmsInsightText = 'Bikes with low kms driven have higher resale value.';
        } else if (kmsDriven < 30000) {
            kmsInsightText = 'Bikes with moderate kms driven have average resale value.';
        } else {
            kmsInsightText = 'Bikes with high kms driven have lower resale value.';
        }
        document.getElementById('kmsInsightText').textContent = kmsInsightText;
    } catch (error) {
        console.error('Error displaying insights:', error);
        // Hide insights card if there's an error
        document.getElementById('insightsCard').style.display = 'none';
    }
}

// Set form defaults
function setupFormDefaults() {
    const yearInput = document.getElementById('year');
    const presentPriceInput = document.getElementById('presentPrice');
    const kmsDrivenInput = document.getElementById('kmsDriven');
    
    const currentYear = new Date().getFullYear();
    yearInput.max = currentYear;
    yearInput.value = currentYear - 2; // Default to 2 years old
    
    // Set default values for Present Price and Kms Driven
    presentPriceInput.value = '2.0'; // Default to 2.0 Lakhs
    kmsDrivenInput.value = '10000'; // Default to 10,000 Kms
    
    console.log('Form defaults set');
    
    // Verify all models are properly configured
    verifyAllModels();
}

// Verify all models are properly configured
function verifyAllModels() {
    const allModels = [
        "Classic 350", "Bullet 350", "Himalayan", "Meteor 350", "Hunter 350",
        "Continental GT 650", "INT 650", "Scram 411", "Guerrilla 450", "Himalayan 450",
        "Super Meteor 650", "Bullet 650", "Goan Classic 350", "Bear 650", "Shotgun 650",
        "Scrambler 450", "Himalayan 750", "Flying Flea", "Interceptor 650"
    ];
    
    const missingModels = [];
    allModels.forEach(model => {
        if (!bikeInfo.hasOwnProperty(model)) {
            missingModels.push(model);
        }
    });
    
    if (missingModels.length > 0) {
        console.warn('Missing models in bikeInfo:', missingModels);
    } else {
        console.log('✓ All 19 Royal Enfield models are properly configured');
    }
}