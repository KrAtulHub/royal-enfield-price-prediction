import pandas as pd
import numpy as np
import joblib
import json
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder

# Load the trained model and encoders
print("Loading trained model and encoders...")
model = joblib.load("royal_enfield_model.pkl")
le_model = joblib.load("le_model.pkl")
le_owner = joblib.load("le_owner.pkl")
le_transmission = joblib.load("le_transmission.pkl")

# Load the dataset to get feature information
df = pd.read_csv("royal_enfield_data.csv")

# Get unique values for categorical features
models = df['Model'].unique().tolist()
owners = df['Owner'].unique().tolist()
transmissions = df['Transmission'].unique().tolist()

# Create mappings for categorical features
model_mapping = {model: idx for idx, model in enumerate(le_model.classes_)}
owner_mapping = {owner: idx for idx, owner in enumerate(le_owner.classes_)}
transmission_mapping = {transmission: idx for idx, transmission in enumerate(le_transmission.classes_)}

# Extract model coefficients and intercept
if hasattr(model, 'coef_') and hasattr(model, 'intercept_'):
    model_data = {
        'coef': model.coef_.tolist(),
        'intercept': model.intercept_,
        'feature_names': ["Model_encoded", "Bike_Age", "Kms_Driven", "Owner_encoded", "Transmission_encoded", "Present_Price"]
    }
else:
    # For models without coef_ and intercept_ attributes
    model_data = {
        'type': str(type(model)),
        'feature_names': ["Model_encoded", "Bike_Age", "Kms_Driven", "Owner_encoded", "Transmission_encoded", "Present_Price"]
    }

# Create export data
export_data = {
    'model': model_data,
    'mappings': {
        'model_mapping': model_mapping,
        'owner_mapping': owner_mapping,
        'transmission_mapping': transmission_mapping
    },
    'metadata': {
        'current_year': 2025,
        'supported_models': models,
        'supported_owners': owners,
        'supported_transmissions': transmissions
    }
}

# Save to JSON file
with open('model_data.json', 'w') as f:
    json.dump(export_data, f, indent=2)

print("Model exported successfully to model_data.json")
print(f"Supported models: {len(models)}")
print(f"Model type: {type(model).__name__}")

# Test the exported data
print("\nTesting exported data...")
test_features = [
    model_mapping.get('Classic 350', 0),  # Model_encoded
    3,  # Bike_Age
    20000,  # Kms_Driven
    owner_mapping.get('First', 0),  # Owner_encoded
    transmission_mapping.get('Manual', 0),  # Transmission_encoded
    1.5  # Present_Price
]

# For Linear Regression, we can manually calculate prediction
if isinstance(model, LinearRegression):
    prediction = model.intercept_ + np.dot(model.coef_, test_features)
    print(f"Test prediction: ₹{prediction:.2f} Lakhs")
else:
    print("Model type doesn't support manual calculation")

print("Export completed successfully!")