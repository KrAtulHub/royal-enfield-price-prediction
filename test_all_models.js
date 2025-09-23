// Test script to verify all Royal Enfield models work correctly
console.log('Testing all Royal Enfield models...');

// List of all models
const allModels = [
    "Classic 350", "Bullet 350", "Himalayan", "Meteor 350", "Hunter 350",
    "Continental GT 650", "INT 650", "Scram 411", "Guerrilla 450", "Himalayan 450",
    "Super Meteor 650", "Bullet 650", "Goan Classic 350", "Bear 650", "Shotgun 650",
    "Scrambler 450", "Himalayan 750", "Flying Flea", "Interceptor 650"
];

// Model information with pros and cons (copied from script.js)
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

// Test all models
let passCount = 0;
let failCount = 0;

console.log('Testing bikeInfo object...');
allModels.forEach(model => {
    if (bikeInfo.hasOwnProperty(model)) {
        console.log(`✓ ${model}: Found in bikeInfo`);
        passCount++;
        
        // Check if pros and cons exist and are arrays
        if (bikeInfo[model].pros && Array.isArray(bikeInfo[model].pros) &&
            bikeInfo[model].cons && Array.isArray(bikeInfo[model].cons)) {
            console.log(`  ✓ ${model}: Has valid pros and cons`);
        } else {
            console.log(`  ✗ ${model}: Missing or invalid pros/cons`);
            failCount++;
        }
    } else {
        console.log(`✗ ${model}: NOT FOUND in bikeInfo`);
        failCount++;
    }
});

console.log(`\nTest Results:`);
console.log(`=============`);
console.log(`Total Models: ${allModels.length}`);
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);

if (failCount === 0) {
    console.log(`\n🎉 All models passed the test!`);
} else {
    console.log(`\n❌ ${failCount} models failed the test.`);
}

// Test model_data.json if available
console.log('\nTesting model_data.json...');
fetch('model_data.json')
    .then(response => response.json())
    .then(modelData => {
        console.log('✓ model_data.json loaded successfully');
        
        // Check if all models are in the mapping
        const missingModels = [];
        allModels.forEach(model => {
            if (!modelData.mappings.model_mapping.hasOwnProperty(model)) {
                missingModels.push(model);
            }
        });
        
        if (missingModels.length === 0) {
            console.log('✓ All models are present in model_data.json mappings');
        } else {
            console.log(`✗ Missing models in model_data.json: ${missingModels.join(', ')}`);
        }
    })
    .catch(error => {
        console.log('✗ Error loading model_data.json:', error.message);
    });