"""
Test script to verify all components of the Royal Enfield Price Prediction project
"""

import pandas as pd
import joblib
import os

def test_dataset():
    """Test if dataset exists and can be loaded"""
    print("Testing dataset...")
    try:
        df = pd.read_csv("royal_enfield_data.csv")
        print(f"✅ Dataset loaded successfully with {len(df)} rows")
        return True
    except Exception as e:
        print(f"❌ Error loading dataset: {e}")
        return False

def test_model_files():
    """Test if all model files exist"""
    print("Testing model files...")
    model_files = [
        "royal_enfield_model.pkl",
        "le_model.pkl", 
        "le_owner.pkl",
        "le_transmission.pkl"
    ]
    
    all_exist = True
    for file in model_files:
        if os.path.exists(file):
            print(f"✅ {file} exists")
        else:
            print(f"❌ {file} not found")
            all_exist = False
    
    return all_exist

def test_model_loading():
    """Test if model can be loaded and used for prediction"""
    print("Testing model loading and prediction...")
    try:
        # Load model and encoders
        model = joblib.load("royal_enfield_model.pkl")
        le_model = joblib.load("le_model.pkl")
        le_owner = joblib.load("le_owner.pkl")
        le_transmission = joblib.load("le_transmission.pkl")
        
        # Test encoding
        model_encoded = le_model.transform(["Classic 350"])[0]
        owner_encoded = le_owner.transform(["First"])[0]
        transmission_encoded = le_transmission.transform(["Manual"])[0]
        
        # Test prediction with sample data
        # Features: [Model_encoded, Bike_Age, Kms_Driven, Owner_encoded, Transmission_encoded, Present_Price]
        sample_features = [[model_encoded, 3, 20000, owner_encoded, transmission_encoded, 1.5]]
        prediction = model.predict(sample_features)[0]
        
        print(f"✅ Model prediction successful: ₹{prediction:.2f} Lakhs")
        return True
    except Exception as e:
        print(f"❌ Error in model loading/prediction: {e}")
        return False

def test_requirements():
    """Test if all required packages can be imported"""
    print("Testing required packages...")
    required_packages = [
        "pandas",
        "numpy", 
        "sklearn",
        "joblib",
        "matplotlib",
        "seaborn",
        "streamlit",
        "tabulate"
    ]
    
    all_imported = True
    for package in required_packages:
        try:
            __import__(package)
            print(f"✅ {package} imported successfully")
        except ImportError:
            print(f"❌ {package} not installed")
            all_imported = False
    
    return all_imported

def main():
    """Run all tests"""
    print("Royal Enfield Price Prediction - Project Test Suite")
    print("=" * 50)
    
    tests = [
        test_dataset,
        test_model_files,
        test_model_loading,
        test_requirements
    ]
    
    results = []
    for test in tests:
        result = test()
        results.append(result)
        print()
    
    print("Test Summary:")
    print("=" * 20)
    passed = sum(results)
    total = len(results)
    print(f"Passed: {passed}/{total}")
    
    if passed == total:
        print("🎉 All tests passed! The project is ready to use.")
    else:
        print("⚠️  Some tests failed. Please check the errors above.")

if __name__ == "__main__":
    main()