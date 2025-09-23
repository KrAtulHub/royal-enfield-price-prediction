"""
Complete verification script for the Royal Enfield Price Prediction project
This script verifies that all components work together as expected
"""

import pandas as pd
import numpy as np
import joblib
import warnings
from sklearn.metrics import r2_score
import os

def verify_dataset():
    """Verify the dataset is properly formatted"""
    print("1. Verifying dataset...")
    try:
        df = pd.read_csv("royal_enfield_data.csv")
        expected_columns = ['Model', 'Year', 'Present_Price', 'Kms_Driven', 'Owner', 'Transmission', 'Selling_Price']
        
        if list(df.columns) == expected_columns:
            print(f"   ✅ Dataset has correct columns: {expected_columns}")
        else:
            print(f"   ❌ Dataset columns mismatch. Expected: {expected_columns}, Got: {list(df.columns)}")
            return False
            
        if len(df) >= 20:
            print(f"   ✅ Dataset has sufficient rows: {len(df)}")
        else:
            print(f"   ❌ Dataset has insufficient rows: {len(df)} < 20")
            return False
            
        # Check value ranges - updated for 2025 models
        if df['Year'].min() >= 2000 and df['Year'].max() <= 2025:
            print("   ✅ Year values are in expected range")
        else:
            print("   ❌ Year values are outside expected range")
            return False
            
        print("   ✅ Dataset verification passed")
        return True
    except Exception as e:
        print(f"   ❌ Dataset verification failed: {e}")
        return False

def verify_model_training():
    """Verify model training completed successfully"""
    print("2. Verifying model training...")
    try:
        # Check if model files exist
        model_files = ["royal_enfield_model.pkl", "le_model.pkl", "le_owner.pkl", "le_transmission.pkl"]
        missing_files = [f for f in model_files if not os.path.exists(f)]
        
        if missing_files:
            print(f"   ❌ Missing model files: {missing_files}")
            return False
        else:
            print("   ✅ All model files present")
            
        # Load and test model
        model = joblib.load("royal_enfield_model.pkl")
        le_model = joblib.load("le_model.pkl")
        le_owner = joblib.load("le_owner.pkl")
        le_transmission = joblib.load("le_transmission.pkl")
        
        # Test prediction
        sample_features = [[0, 3, 20000, 0, 0, 1.5]]  # [Model_encoded, Bike_Age, Kms_Driven, Owner_encoded, Transmission_encoded, Present_Price]
        prediction = model.predict(sample_features)
        
        if 0.1 <= prediction[0] <= 3.0:  # Reasonable price range
            print(f"   ✅ Model prediction is reasonable: ₹{prediction[0]:.2f} Lakhs")
        else:
            print(f"   ❌ Model prediction seems unreasonable: ₹{prediction[0]:.2f} Lakhs")
            return False
            
        print("   ✅ Model training verification passed")
        return True
    except Exception as e:
        print(f"   ❌ Model training verification failed: {e}")
        return False

def verify_streamlit_app():
    """Verify Streamlit app structure"""
    print("3. Verifying Streamlit app...")
    try:
        with open("app.py", "r", encoding="utf-8") as f:
            content = f.read()
            
        required_elements = [
            "import streamlit as st",
            "joblib.load",
            "st.sidebar",
            "st.sidebar.button",
            "predict"
        ]
        
        missing_elements = [elem for elem in required_elements if elem not in content]
        
        if missing_elements:
            print(f"   ❌ Missing required elements in app.py: {missing_elements}")
            return False
        else:
            print("   ✅ Streamlit app has required elements")
            
        # Check for pros/cons display
        if "pros" in content.lower() and "cons" in content.lower():
            print("   ✅ App includes pros and cons display")
        else:
            print("   ⚠️  App may be missing pros and cons display")
            
        print("   ✅ Streamlit app verification completed")
        return True
    except Exception as e:
        print(f"   ❌ Streamlit app verification failed: {e}")
        return False

def verify_requirements():
    """Verify all required packages are listed"""
    print("4. Verifying requirements...")
    try:
        with open("requirements.txt", "r") as f:
            content = f.read()
            
        required_packages = [
            "streamlit",
            "pandas", 
            "scikit-learn",
            "joblib",
            "matplotlib",
            "seaborn",
            "numpy",
            "tabulate"
        ]
        
        missing_packages = [pkg for pkg in required_packages if pkg not in content]
        
        if missing_packages:
            print(f"   ❌ Missing packages in requirements.txt: {missing_packages}")
            return False
        else:
            print("   ✅ All required packages listed in requirements.txt")
            
        print("   ✅ Requirements verification passed")
        return True
    except Exception as e:
        print(f"   ❌ Requirements verification failed: {e}")
        return False

def verify_documentation():
    """Verify documentation files exist"""
    print("5. Verifying documentation...")
    try:
        doc_files = ["README.md", "PROJECT_SUMMARY.md", "PROJECT_STRUCTURE.md"]
        missing_docs = [f for f in doc_files if not os.path.exists(f)]
        
        if missing_docs:
            print(f"   ❌ Missing documentation files: {missing_docs}")
            return False
        else:
            print("   ✅ All documentation files present")
            
        print("   ✅ Documentation verification passed")
        return True
    except Exception as e:
        print(f"   ❌ Documentation verification failed: {e}")
        return False

def main():
    """Run complete verification"""
    print("Royal Enfield Bike Price Prediction - Complete Project Verification")
    print("=" * 70)
    
    verifications = [
        verify_dataset,
        verify_model_training,
        verify_streamlit_app,
        verify_requirements,
        verify_documentation
    ]
    
    results = []
    for verification in verifications:
        result = verification()
        results.append(result)
        print()
    
    print("Final Verification Summary:")
    print("=" * 30)
    passed = sum(results)
    total = len(results)
    print(f"Components verified: {passed}/{total}")
    
    if passed == total:
        print("🎉 COMPLETE PROJECT VERIFICATION PASSED!")
        print("✅ Dataset is properly formatted")
        print("✅ Model training completed successfully")
        print("✅ Streamlit app is properly structured")
        print("✅ All requirements are listed")
        print("✅ Documentation is complete")
        print("\n🚀 Your Royal Enfield Price Prediction project is ready for use!")
    else:
        print("⚠️  Some verifications failed. Please check the errors above.")
        
    return passed == total

if __name__ == "__main__":
    main()