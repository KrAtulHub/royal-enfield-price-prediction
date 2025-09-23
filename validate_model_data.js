// Script to validate model_data.json file
async function validateModelData() {
    try {
        // Fetch the model data
        const response = await fetch('model_data.json');
        const modelData = await response.json();
        
        console.log('Model data loaded successfully');
        
        // List of all models that should be present
        const expectedModels = [
            "Classic 350", "Bullet 350", "Himalayan", "Meteor 350", "Hunter 350",
            "Continental GT 650", "INT 650", "Scram 411", "Guerrilla 450", "Himalayan 450",
            "Super Meteor 650", "Bullet 650", "Goan Classic 350", "Bear 650", "Shotgun 650",
            "Scrambler 450", "Himalayan 750", "Flying Flea", "Interceptor 650"
        ];
        
        // Check if all expected models are in the model mapping
        const missingModels = [];
        const extraModels = [];
        
        // Check for missing models
        expectedModels.forEach(model => {
            if (!modelData.mappings.model_mapping.hasOwnProperty(model)) {
                missingModels.push(model);
            }
        });
        
        // Check for extra models
        Object.keys(modelData.mappings.model_mapping).forEach(model => {
            if (!expectedModels.includes(model)) {
                extraModels.push(model);
            }
        });
        
        console.log('Expected models:', expectedModels.length);
        console.log('Models in mapping:', Object.keys(modelData.mappings.model_mapping).length);
        
        if (missingModels.length > 0) {
            console.warn('Missing models in JSON:', missingModels);
        } else {
            console.log('✓ All expected models are present in JSON');
        }
        
        if (extraModels.length > 0) {
            console.warn('Extra models in JSON:', extraModels);
        } else {
            console.log('✓ No extra models in JSON');
        }
        
        // Check if all expected models are in the supported models list
        const missingSupportedModels = [];
        expectedModels.forEach(model => {
            if (!modelData.metadata.supported_models.includes(model)) {
                missingSupportedModels.push(model);
            }
        });
        
        if (missingSupportedModels.length > 0) {
            console.warn('Missing models in supported_models:', missingSupportedModels);
        } else {
            console.log('✓ All expected models are in supported_models');
        }
        
        // Validate model structure
        if (modelData.model && modelData.model.coef && modelData.model.intercept !== undefined) {
            console.log('✓ Model structure is valid');
        } else {
            console.error('✗ Model structure is invalid');
        }
        
        // Validate mappings structure
        if (modelData.mappings && modelData.mappings.model_mapping && 
            modelData.mappings.owner_mapping && modelData.mappings.transmission_mapping) {
            console.log('✓ Mappings structure is valid');
        } else {
            console.error('✗ Mappings structure is invalid');
        }
        
        return {
            valid: missingModels.length === 0 && missingSupportedModels.length === 0,
            missingModels,
            extraModels,
            missingSupportedModels
        };
    } catch (error) {
        console.error('Error validating model data:', error);
        return {
            valid: false,
            error: error.message
        };
    }
}

// Run validation
validateModelData().then(result => {
    console.log('Validation result:', result);
});